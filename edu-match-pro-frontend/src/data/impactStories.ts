import type { ImpactStory } from '../types';
import { getFeaturedStoryImagePath } from '../utils/imageUtils';

/**
 * 影響力故事示例數據
 * 這些數據展示了如何使用精選故事照片
 */
export const impactStories: ImpactStory[] = [
  {
    id: '1',
    title: '科技點亮偏鄉學子的未來',
    summary: '透過企業捐贈的電腦設備，偏鄉學生們首次接觸到數位學習，開啟了全新的學習視野。學生們從零基礎到能夠獨立完成數位作品，展現了驚人的學習潛力。',
    imageUrl: getFeaturedStoryImagePath(1),
    companyName: '科技創新公司',
    schoolName: '台東縣偏遠小學',
    storyDate: '2024年1月',
    impact: {
      studentsBenefited: 45,
      equipmentDonated: '20台筆記型電腦',
      duration: '6個月'
    }
  },
  {
    id: '2',
    title: '企業志工帶來的溫暖教學',
    summary: '企業員工每週固定到校進行志工教學，不僅教授專業技能，更帶給學生們不同的視野和夢想。學生們在志工的指導下，完成了第一個程式設計作品。',
    imageUrl: getFeaturedStoryImagePath(2),
    companyName: '軟體開發公司',
    schoolName: '花蓮縣山區小學',
    storyDate: '2024年2月',
    impact: {
      studentsBenefited: 32,
      equipmentDonated: '程式設計軟體授權',
      duration: '3個月'
    }
  },
  {
    id: '3',
    title: '體育器材讓運動更精彩',
    summary: '企業捐贈的全新體育器材，讓學生們能夠進行更豐富的體育活動。從基本的球類運動到專業的健身設備，學生們的體能素質得到顯著提升。',
    imageUrl: getFeaturedStoryImagePath(3),
    companyName: '運動用品公司',
    schoolName: '南投縣山區中學',
    storyDate: '2024年3月',
    impact: {
      studentsBenefited: 120,
      equipmentDonated: '全套體育器材',
      duration: '持續進行'
    }
  },
  {
    id: '4',
    title: '藝術教育的美麗綻放',
    summary: '透過企業贊助的藝術材料，學生們創作出了令人驚豔的藝術作品。從繪畫到雕塑，從傳統工藝到現代藝術，學生們的創造力得到了充分發揮。',
    imageUrl: getFeaturedStoryImagePath(4),
    companyName: '文化藝術基金會',
    schoolName: '屏東縣偏遠小學',
    storyDate: '2024年4月',
    impact: {
      studentsBenefited: 28,
      equipmentDonated: '藝術材料包',
      duration: '4個月'
    }
  },
  {
    id: '5',
    title: '科學實驗的探索之旅',
    summary: '企業捐贈的科學實驗器材，讓學生們能夠親手進行各種科學實驗。從化學反應到物理現象，學生們在實驗中發現了科學的奧秘和樂趣。',
    imageUrl: getFeaturedStoryImagePath(5),
    companyName: '科學技術公司',
    schoolName: '嘉義縣山區小學',
    storyDate: '2024年5月',
    impact: {
      studentsBenefited: 60,
      equipmentDonated: '科學實驗器材組',
      duration: '5個月'
    }
  }
];

/**
 * 獲取所有影響力故事
 */
export const getAllImpactStories = (): ImpactStory[] => {
  return impactStories;
};

/**
 * 根據 ID 獲取單個影響力故事
 */
export const getImpactStoryById = (id: string): ImpactStory | undefined => {
  return impactStories.find(story => story.id === id);
};

/**
 * 獲取最新的影響力故事
 */
export const getLatestImpactStories = (limit: number = 3): ImpactStory[] => {
  return impactStories.slice(0, limit);
};
