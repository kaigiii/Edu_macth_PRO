import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

interface TaiwanMapProps {
  highlightCounties?: string[];
  onCountyClick?: (county: string) => void;
  className?: string;
}

export interface TaiwanMapRef {
  highlightCounty: (county: string) => void;
  resetHighlights: () => void;
}

const TaiwanMap = forwardRef<TaiwanMapRef, TaiwanMapProps>(({
  highlightCounties = [],
  onCountyClick,
  className = ''
}, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setupMapStyles = () => {
    if (!mapRef.current) return;
    
    // 設置 SVG 樣式
    const svg = mapRef.current.querySelector('svg');
    if (svg) {
      // 設置 SVG 容器樣式，調整位置和縮放
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.maxWidth = '100%';
      svg.style.maxHeight = '100%';
      svg.style.transform = 'scale(2.2)';
      svg.style.transformOrigin = 'center center';
      svg.style.display = 'block';
      svg.style.margin = '0 auto';
      svg.style.position = 'relative';
      svg.style.top = '0%';
      svg.style.left = '95%';
      svg.style.transform = 'translate(-50%, -50%) scale(2.8)';
      
      // 設置透明背景
      svg.style.backgroundColor = 'transparent';
      
      // 設置 SVG 內部元素的樣式
      const paths = svg.querySelectorAll('path');
      paths.forEach((path: SVGPathElement) => {
        path.style.strokeWidth = '3';
        path.style.stroke = '#ffffff';
        path.style.fill = '#ffffff';
        path.style.opacity = '0.8';
        path.style.transform = 'scale(0.8)';
        path.style.transformOrigin = 'center center';
      });
      
      console.log('SVG 樣式設置完成，背景已設為透明，圖示已放大');
    } else {
      console.error('找不到 SVG 元素');
    }
  };

  const loadMap = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!mapRef.current) return;

      console.log('開始載入地圖...');

      // 檢查緩存
      const cacheKey = 'taiwan-map-svg';
      const cachedSvg = sessionStorage.getItem(cacheKey);
      
      if (cachedSvg) {
        console.log('使用緩存的地圖數據');
        mapRef.current.innerHTML = cachedSvg;
        setupMapStyles();
        setIsLoading(false);
        return;
      }

      // 使用 fetch 載入 SVG 內容，添加緩存控制
      const response = await fetch('/Edu_macth_PRO/taiwan-map.svg', {
        cache: 'force-cache',
        headers: {
          'Cache-Control': 'max-age=31536000'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const svgText = await response.text();
      console.log('SVG 內容載入成功，長度:', svgText.length);
      
      // 緩存 SVG 內容
      sessionStorage.setItem(cacheKey, svgText);
      
      // 直接設置 innerHTML
      mapRef.current.innerHTML = svgText;
      
      setupMapStyles();
      setIsLoading(false);
    } catch (error) {
      console.error('載入地圖失敗:', error);
      setError('載入地圖失敗，請重新整理頁面');
      setIsLoading(false);
    }
  };

  // 暴露給父組件的方法
  useImperativeHandle(ref, () => ({
    highlightCounty: (county: string) => {
      if (!mapRef.current) return;
      const paths = mapRef.current.querySelectorAll('path');
      paths.forEach((path: SVGPathElement) => {
        if (path.getAttribute('data-county') === county) {
          path.style.fill = '#3b82f6';
          path.style.opacity = '1';
        }
      });
    },
    resetHighlights: () => {
      if (!mapRef.current) return;
      const paths = mapRef.current.querySelectorAll('path');
      paths.forEach((path: SVGPathElement) => {
        path.style.fill = '#ffffff';
        path.style.opacity = '0.8';
      });
    }
  }));

  useEffect(() => {
    loadMap();
  }, []);

  useEffect(() => {
    if (!mapRef.current || isLoading) return;

    const paths = mapRef.current.querySelectorAll('path');
    paths.forEach((path: SVGPathElement) => {
      // 重置樣式
      path.style.fill = '#ffffff';
      path.style.opacity = '0.8';
      
      // 高亮指定的縣市
      const countyName = path.getAttribute('data-county');
      if (countyName && highlightCounties.includes(countyName)) {
        path.style.fill = '#3b82f6';
        path.style.opacity = '1';
      }
      
      // 添加點擊事件
      if (onCountyClick) {
        path.style.cursor = 'pointer';
        path.addEventListener('click', () => {
          if (countyName) {
            onCountyClick(countyName);
          }
        });
      }
    });
  }, [highlightCounties, onCountyClick, isLoading]);

  if (error) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <p className="text-red-600 mb-2">地圖載入失敗</p>
          <button 
            onClick={loadMap}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">載入地圖中...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className={`relative ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: '300px'
      }}
    />
  );
});

TaiwanMap.displayName = 'TaiwanMap';

export default TaiwanMap;