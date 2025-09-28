import { useState } from 'react';
import type { ImageLoadState, UseImageLoadConfig } from '../utils/imageUtils';

/**
 * 圖片載入狀態管理 Hook
 */
export const useImageLoad = (config: UseImageLoadConfig) => {
  const [state, setState] = useState<ImageLoadState>('loading');
  const [currentSrc, setCurrentSrc] = useState(config.src);

  const handleLoad = () => {
    setState('loaded');
    config.onLoad?.();
  };

  const handleError = () => {
    if (config.fallbackSrc && currentSrc === config.src) {
      setCurrentSrc(config.fallbackSrc);
      setState('loading');
    } else {
      setState('error');
      config.onError?.();
    }
  };

  return {
    state,
    currentSrc,
    handleLoad,
    handleError
  };
};
