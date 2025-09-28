/**
 * 圖片載入和優化工具
 */

// 圖片載入狀態類型
export type ImageLoadState = 'loading' | 'loaded' | 'error';

// 圖片載入配置
export interface ImageLoadConfig {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

// 響應式圖片配置
export interface ResponsiveImageConfig {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}

/**
 * 生成影響力故事背景牆圖片路徑
 */
export const getImpactStoryImagePath = (index: number): string => {
  const paddedIndex = String(index).padStart(2, '0');
  return `/images/impact-stories/background-wall/${paddedIndex}.jpg`;
};

/**
 * 生成精選故事圖片路徑
 */
export const getFeaturedStoryImagePath = (index: number): string => {
  const paddedIndex = String(index).padStart(2, '0');
  return `/images/impact-stories/featured/featured-${paddedIndex}.jpg`;
};

/**
 * 生成響應式圖片配置
 */
export const generateResponsiveImageConfig = (
  basePath: string,
  alt: string,
  sizes: string[] = ['400w', '800w', '1200w']
): ResponsiveImageConfig => {
  const srcSet = sizes
    .map(size => `${basePath}?w=${size.replace('w', '')} ${size}`)
    .join(', ');

  return {
    src: basePath,
    srcSet,
    sizes: '(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px',
    alt,
    loading: 'lazy'
  };
};

/**
 * 預載入圖片
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * 批量預載入圖片
 */
export const preloadImages = async (srcs: string[]): Promise<void[]> => {
  const promises = srcs.map(src => preloadImage(src));
  return Promise.allSettled(promises).then(results => 
    results.map(result => 
      result.status === 'fulfilled' ? undefined : result.reason
    ).filter(Boolean)
  );
};

/**
 * 檢查圖片是否支援 WebP 格式
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * 根據瀏覽器支援選擇最佳圖片格式
 */
export const getOptimalImageFormat = async (basePath: string): Promise<string> => {
  const supportsWebPFormat = await supportsWebP();
  
  if (supportsWebPFormat) {
    // 如果支援 WebP，優先使用 WebP 格式
    const webpPath = basePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return webpPath;
  }
  
  return basePath;
};

/**
 * 生成圖片載入錯誤的備用內容
 */
export const generateImageFallback = (type: 'background-wall' | 'featured' = 'background-wall') => {
  if (type === 'background-wall') {
    return {
      background: 'linear-gradient(135deg, #2563eb, #f59e0b)',
      content: '📸'
    };
  }
  
  return {
    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
    content: '📸'
  };
};

/**
 * 圖片載入 Hook 配置
 */
export interface UseImageLoadConfig {
  src: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// 預設的影響力故事圖片配置
export const IMPACT_STORY_IMAGES = {
  BACKGROUND_WALL_COUNT: 16,
  FEATURED_COUNT: 5,
  BACKGROUND_WALL_PATH: '/images/impact-stories/background-wall',
  FEATURED_PATH: '/images/impact-stories/featured'
} as const;
