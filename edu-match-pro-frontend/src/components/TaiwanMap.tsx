import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';

interface TaiwanMapProps {
  highlightCounties?: string[];
  onCountyClick?: (countyId: string) => void;
  showAnimations?: boolean;
  countyRefs?: React.RefObject<SVGGElement>[];
}

export interface TaiwanMapRef {
  getCountyElements: () => SVGGElement[];
  getCenterLightElement: () => SVGGElement | null;
}

export const TaiwanMap = forwardRef<TaiwanMapRef, TaiwanMapProps>(({ 
  highlightCounties = [], 
  onCountyClick,
  showAnimations = true,
  countyRefs = []
}, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 暴露方法給父組件
  useImperativeHandle(ref, () => ({
    getCountyElements: () => {
      if (!mapRef.current) return [];
      // 嘗試多種選擇器來找到縣市元素
      const countySelectors = [
        'g[id^="county-"]',
        'g[id*="county"]',
        'path[id^="county-"]',
        'path[id*="county"]',
        'g[class*="county"]',
        'path[class*="county"]'
      ];
      
      let elements: SVGGElement[] = [];
      for (const selector of countySelectors) {
        const found = Array.from(mapRef.current.querySelectorAll(selector)) as SVGGElement[];
        if (found.length > 0) {
          elements = found;
          console.log(`使用選擇器 ${selector} 找到 ${found.length} 個元素`);
          break;
        }
      }
      
      // 如果還是找不到，嘗試找所有的 path 元素
      if (elements.length === 0) {
        elements = Array.from(mapRef.current.querySelectorAll('path')) as SVGGElement[];
        console.log(`使用通用 path 選擇器找到 ${elements.length} 個元素`);
      }
      
      return elements;
    },
    getCenterLightElement: () => {
      if (!mapRef.current) return null;
      return mapRef.current.querySelector('#center-light') as SVGGElement | null;
    }
  }));

  useEffect(() => {
    const loadMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!mapRef.current) return;

        console.log('開始載入地圖...');

        // 使用 fetch 載入 SVG 內容
        const response = await fetch('/Edu_macth_PRO/taiwan-map.svg');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const svgText = await response.text();
        console.log('SVG 內容載入成功，長度:', svgText.length);
        
        // 直接設置 innerHTML
        mapRef.current.innerHTML = svgText;
        
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
          svg.style.top = '0%';  // 進一步向上移動
          svg.style.left = '95%';  // 稍微向右移動
          svg.style.transform = 'translate(-50%, -50%) scale(2.8)';
          
          // 設置透明背景
          svg.style.backgroundColor = 'transparent';
          svg.style.background = 'transparent';
          
          // 使用原始 viewBox，確保地圖完整顯示
          svg.setAttribute('viewBox', '0 0 1440 778');
          
          // 移除或修改背景元素
          const backgroundElements = svg.querySelectorAll('path[fill="#505050"], path[class*="bg"], rect[fill="#505050"]');
          backgroundElements.forEach(element => {
            const htmlElement = element as HTMLElement;
            htmlElement.style.fill = 'transparent';
            htmlElement.style.display = 'none';
          });
          
          // 增大地圖路徑的尺寸並設置初始狀態
          const paths = svg.querySelectorAll('path:not([fill="#505050"])');
          paths.forEach((path, index) => {
            const htmlElement = path as HTMLElement;
            htmlElement.style.strokeWidth = '3';
            htmlElement.style.stroke = '#ffffff';
            htmlElement.style.fill = '#ffffff';
            htmlElement.style.opacity = '0.8';
            htmlElement.style.cursor = 'pointer';
            htmlElement.style.transition = 'all 0.3s ease';
            
            // 為每個縣市元素添加 ID 以便動畫識別
            if (!htmlElement.id) {
              htmlElement.id = `county-${index}`;
            }
            
            // 設置初始動畫狀態
            htmlElement.style.opacity = '0.8';
            htmlElement.style.transform = 'scale(0.8)';
            htmlElement.style.transformOrigin = 'center center';
          });
          
          console.log('SVG 樣式設置完成，背景已設為透明，圖示已放大');
          } else {
          console.error('找不到 SVG 元素');
          }

        setIsLoading(false);

      } catch (err) {
        console.error('載入地圖時發生錯誤:', err);
        setError('地圖載入失敗，請重新整理頁面');
        setIsLoading(false);
      }
    };

    loadMap();
  }, [highlightCounties, onCountyClick]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-transparent rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <motion.div
            className="flex flex-col items-center space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-sm text-gray-600">載入地圖中...</span>
          </motion.div>
        </div>
      )}
      
      <motion.div
        ref={mapRef}
        className="w-full h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* 圖例 */}
      {highlightCounties.length > 0 && !isLoading && (
        <motion.div 
          className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
            <span className="text-sm text-gray-600">有需求的縣市</span>
          </div>
        </motion.div>
      )}
    </div>
  );
});

TaiwanMap.displayName = 'TaiwanMap';

export default TaiwanMap;