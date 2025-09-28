/**
 * 圖片載入和優化工具
 */



/**
 * 生成影響力故事背景牆圖片路徑
 */
export const getImpactStoryImagePath = (index: number): string => {
  const paddedIndex = String(index).padStart(2, '0');
  return `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall/${paddedIndex}.jpg`;
};

/**
 * 生成精選故事圖片路徑
 */
export const getFeaturedStoryImagePath = (index: number): string => {
  const paddedIndex = String(index).padStart(2, '0');
  return `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/featured/featured-${paddedIndex}.jpg`;
};



// 預設的影響力故事圖片配置
export const IMPACT_STORY_IMAGES = {
  BACKGROUND_WALL_COUNT: 16,
  FEATURED_COUNT: 5,
  BACKGROUND_WALL_PATH: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall`,
  FEATURED_PATH: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/featured`
} as const;
