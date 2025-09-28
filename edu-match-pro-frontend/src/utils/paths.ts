/**
 * 路徑工具函數
 * 根據環境自動處理靜態資源路徑
 */

// 獲取基礎路徑
export const getBasePath = (): string => {
  return import.meta.env.PROD ? '/Edu_macth_PRO' : '';
};

// 獲取圖片路徑
export const getImagePath = (path: string): string => {
  return `${getBasePath()}${path}`;
};

// 獲取影片路徑
export const getVideoPath = (path: string): string => {
  return `${getBasePath()}${path}`;
};

// 獲取 SVG 路徑
export const getSvgPath = (path: string): string => {
  return `${getBasePath()}${path}`;
};
