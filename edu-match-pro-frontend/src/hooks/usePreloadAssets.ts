import { useEffect, useState } from 'react';

interface PreloadAssetsConfig {
  images?: string[];
  videos?: string[];
  priority?: string[]; // 優先載入的資源
}

export function usePreloadAssets(config: PreloadAssetsConfig) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadAssets = async () => {
      const { images = [], videos = [], priority = [] } = config;
      const allAssets = [...images, ...videos];
      setTotalCount(allAssets.length);
      setIsLoading(true);

      // 優先載入重要資源
      const priorityAssets = allAssets.filter(asset => 
        priority.some(p => asset.includes(p))
      );
      const otherAssets = allAssets.filter(asset => 
        !priority.some(p => asset.includes(p))
      );

      // 先載入優先資源
      for (const asset of priorityAssets) {
        await preloadAsset(asset);
        setLoadedCount(prev => prev + 1);
      }

      // 然後載入其他資源
      for (const asset of otherAssets) {
        await preloadAsset(asset);
        setLoadedCount(prev => prev + 1);
      }

      setIsLoading(false);
    };

    preloadAssets();
  }, [config]);

  const preloadAsset = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (src.includes('.mp4') || src.includes('.webm')) {
        // 預載入影片
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject();
        video.src = src;
      } else {
        // 預載入圖片
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = src;
      }
    });
  };

  const progress = totalCount > 0 ? (loadedCount / totalCount) * 100 : 0;

  return {
    isLoading,
    progress,
    loadedCount,
    totalCount
  };
}
