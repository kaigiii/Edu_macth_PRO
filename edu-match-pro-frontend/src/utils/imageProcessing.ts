/**
 * 圖片去背處理工具
 */

export interface ImageProcessingOptions {
  threshold?: number; // 白色背景閾值 (0-255)
  tolerance?: number; // 容差值
  feather?: number;   // 羽化邊緣
}

/**
 * 使用 Canvas 進行圖片去背
 */
export const removeBackground = (
  imageSrc: string, 
  options: ImageProcessingOptions = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const {
      threshold = 240,  // 白色背景閾值
      tolerance = 20,   // 容差值
      feather = 2       // 羽化邊緣
    } = options;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('無法創建 Canvas 上下文'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        // 繪製原圖
        ctx.drawImage(img, 0, 0);

        // 獲取圖像數據
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // 處理每個像素
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // 計算亮度
          const brightness = (r + g + b) / 3;
          
          // 檢查是否為白色背景
          const isWhite = brightness > threshold && 
                         Math.abs(r - g) < tolerance && 
                         Math.abs(g - b) < tolerance && 
                         Math.abs(r - b) < tolerance;

          if (isWhite) {
            // 設置為透明
            data[i + 3] = 0;
          } else {
            // 保持原色，但調整透明度以創建羽化效果
            const alpha = Math.min(255, a);
            data[i + 3] = alpha;
          }
        }

        // 將處理後的數據放回 Canvas
        ctx.putImageData(imageData, 0, 0);

        // 轉換為 Data URL
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('圖片載入失敗'));
    };

    img.src = imageSrc;
  });
};

/**
 * 使用 CSS 濾鏡進行快速去背
 */
export const applyTransparentFilter = (element: HTMLElement): void => {
  // 設置混合模式
  element.style.mixBlendMode = 'multiply';
  
  // 應用濾鏡
  element.style.filter = `
    brightness(1.1) 
    contrast(1.4) 
    saturate(1.2) 
    hue-rotate(5deg)
    drop-shadow(0 4px 12px rgba(0,0,0,0.15))
  `;
  
  // 設置背景
  element.style.background = `
    linear-gradient(135deg, 
      rgba(59, 130, 246, 0.1) 0%, 
      rgba(147, 197, 253, 0.15) 50%, 
      rgba(59, 130, 246, 0.1) 100%
    )
  `;
};

/**
 * 創建去背遮罩
 */
export const createTransparentMask = (element: HTMLElement): void => {
  const mask = document.createElement('div');
  mask.className = 'transparent-mask';
  mask.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.1) 0%, 
      rgba(147, 197, 253, 0.15) 50%, 
      rgba(59, 130, 246, 0.1) 100%
    );
    mix-blend-mode: multiply;
    pointer-events: none;
    border-radius: 12px;
    z-index: 1;
  `;
  
  element.style.position = 'relative';
  element.appendChild(mask);
};
