import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  onLoad,
  onError 
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setImageError(true);
      onError?.();
    };
    img.src = src;
  }, [src, onLoad, onError]);

  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-500">圖片載入失敗</span>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      {!imageLoaded && placeholder && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400">載入中...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
