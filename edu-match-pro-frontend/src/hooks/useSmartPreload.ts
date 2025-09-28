import { useEffect, useState, useCallback } from 'react';

interface SmartPreloadConfig {
  criticalAssets: string[];
  lazyAssets: string[];
  preloadThreshold?: number; // 預載入閾值 (ms)
}

export function useSmartPreload(config: SmartPreloadConfig) {
  const [loadedAssets, setLoadedAssets] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { criticalAssets, lazyAssets, preloadThreshold = 2000 } = config;

  // 智能預載入函數
  const preloadAsset = useCallback(async (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      if (src.includes('.mp4') || src.includes('.webm')) {
        // 影片預載入
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        
        const timeout = setTimeout(() => {
          console.log(`影片預載入超時: ${src}`);
          resolve(false);
        }, 10000);
        
        video.onloadedmetadata = () => {
          clearTimeout(timeout);
          console.log(`影片預載入成功: ${src} (${Date.now() - startTime}ms)`);
          resolve(true);
        };
        
        video.onerror = () => {
          clearTimeout(timeout);
          console.log(`影片預載入失敗: ${src}`);
          resolve(false);
        };
        
        video.src = src;
      } else {
        // 圖片預載入
        const img = new Image();
        
        const timeout = setTimeout(() => {
          console.log(`圖片預載入超時: ${src}`);
          resolve(false);
        }, 5000);
        
        img.onload = () => {
          clearTimeout(timeout);
          console.log(`圖片預載入成功: ${src} (${Date.now() - startTime}ms)`);
          resolve(true);
        };
        
        img.onerror = () => {
          clearTimeout(timeout);
          console.log(`圖片預載入失敗: ${src}`);
          resolve(false);
        };
        
        img.src = src;
      }
    });
  }, []);

  // 分批載入資源
  const loadAssetsBatch = useCallback(async (assets: string[], priority: 'critical' | 'lazy') => {
    const batchSize = priority === 'critical' ? 2 : 1; // 關鍵資源並行載入，懶載入串行
    const results: boolean[] = [];
    
    for (let i = 0; i < assets.length; i += batchSize) {
      const batch = assets.slice(i, i + batchSize);
      const batchPromises = batch.map(asset => preloadAsset(asset));
      
      const batchResults = await Promise.allSettled(batchPromises);
      const batchSuccesses = batchResults.map(result => 
        result.status === 'fulfilled' && result.value
      );
      
      results.push(...batchSuccesses);
      
      // 更新進度
      const currentProgress = Math.round(((i + batchSize) / assets.length) * 100);
      setLoadingProgress(currentProgress);
      
      // 更新已載入資源
      const successfulAssets = batch.filter((_, index) => batchSuccesses[index]);
      setLoadedAssets(prev => new Set([...prev, ...successfulAssets]));
      
      // 懶載入時添加延遲
      if (priority === 'lazy' && i + batchSize < assets.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return results;
  }, [preloadAsset]);

  // 主要載入邏輯
  useEffect(() => {
    const loadAssets = async () => {
      setIsLoading(true);
      setLoadingProgress(0);
      
      try {
        // 1. 載入關鍵資源
        console.log('🚀 開始載入關鍵資源...');
        await loadAssetsBatch(criticalAssets, 'critical');
        
        // 2. 延遲載入其他資源
        if (lazyAssets.length > 0) {
          console.log('⏳ 延遲載入其他資源...');
          setTimeout(async () => {
            await loadAssetsBatch(lazyAssets, 'lazy');
            setIsLoading(false);
          }, preloadThreshold);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('資源載入失敗:', error);
        setIsLoading(false);
      }
    };
    
    loadAssets();
  }, [criticalAssets, lazyAssets, preloadThreshold, loadAssetsBatch]);

  return {
    isLoading,
    loadingProgress,
    loadedAssets,
    isAssetLoaded: (src: string) => loadedAssets.has(src)
  };
}
