import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TransparentTaiwanMapProps {
  highlightCounties?: string[];
  onCountyClick?: (countyId: string) => void;
  showAnimations?: boolean;
  countyRefs?: React.RefObject<SVGGElement>[];
}

export interface TransparentTaiwanMapRef {
  getCountyElements: () => SVGGElement[];
  getCenterLightElement: () => SVGGElement | null;
}

export const TransparentTaiwanMap = forwardRef<TransparentTaiwanMapRef, TransparentTaiwanMapProps>(({ 
  highlightCounties = [], 
  onCountyClick,
  showAnimations = true,
  countyRefs = []
}, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 優化的縣市元素獲取 - 現在返回圖片元素
  const getCountyElements = useCallback(() => {
    if (!mapRef.current) return [];
    
    const img = mapRef.current.querySelector('img');
    if (img) {
      console.log('找到地圖圖片元素');
      return [img as unknown as SVGGElement];
    }
    
    console.log('未找到地圖圖片元素');
    return [];
  }, []);

  const getCenterLightElement = useCallback(() => {
    if (!mapRef.current) return null;
    return mapRef.current.querySelector('#center-light') as SVGGElement | null;
  }, []);

  // 暴露方法給父組件
  useImperativeHandle(ref, () => ({
    getCountyElements,
    getCenterLightElement
  }), [getCountyElements, getCenterLightElement]);

  // 優化的地圖載入邏輯 - 使用 JPG 圖片並應用去背效果
  const loadMap = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!mapRef.current) return;

      console.log('開始載入地圖...');

      // 創建圖片元素
      const img = new Image();
      
      img.onload = () => {
        if (mapRef.current) {
          mapRef.current.innerHTML = '';
          mapRef.current.appendChild(img);
          setupMapStyles();
          console.log('地圖圖片載入成功');
        }
        setIsLoading(false);
      };
      
      img.onerror = () => {
        console.error('地圖圖片載入失敗');
        setError('地圖載入失敗，請重新整理頁面');
        setIsLoading(false);
      };
      
      // 設置圖片屬性
      img.src = `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/taiwan-map.jpg`;
      img.alt = '台灣地圖';
      img.className = 'w-full h-full object-contain';
      img.style.cursor = 'pointer';

    } catch (err) {
      console.error('載入地圖時發生錯誤:', err);
      setError('地圖載入失敗，請重新整理頁面');
      setIsLoading(false);
    }
  }, []);

  // 進階去背樣式設置
  const setupMapStyles = useCallback(() => {
    if (!mapRef.current) return;
    
    const img = mapRef.current.querySelector('img');
    if (!img) {
      console.error('找不到圖片元素');
      return;
    }

    // 設置圖片樣式
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    img.style.objectPosition = 'center';
    img.style.display = 'block';
    img.style.margin = '0 auto';
    img.style.position = 'relative';
    img.style.cursor = 'pointer';
    img.style.transition = 'all 0.3s ease';
    
    // 進階去背效果
    img.style.filter = `
      brightness(1.1) 
      contrast(1.2) 
      saturate(1.1) 
      hue-rotate(5deg)
      drop-shadow(0 4px 8px rgba(0,0,0,0.1))
    `;
    
    // 使用混合模式去除白色背景
    img.style.mixBlendMode = 'multiply';
    
    // 設置容器背景
    if (mapRef.current) {
      mapRef.current.style.background = `
        linear-gradient(135deg, 
          rgba(59, 130, 246, 0.05) 0%, 
          rgba(147, 197, 253, 0.1) 50%, 
          rgba(59, 130, 246, 0.05) 100%
        )
      `;
    }
    
    console.log('進階去背地圖樣式設置完成');
  }, []);

  useEffect(() => {
    loadMap();
  }, [loadMap]);

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
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 z-20"
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
