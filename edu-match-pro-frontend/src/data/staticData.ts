/**
 * 靜態數據文件
 * 用於生產環境，替代 API 調用
 */

import type { SchoolNeed, CompanyDashboardStats, SchoolDashboardStats, RecentProject, ImpactStory, CompanyDonation, RecentActivity } from '../types';

// 學校需求數據
export const schoolNeeds: SchoolNeed[] = [
  {
    id: "need-001",
    schoolName: "花蓮縣秀林鄉銅門國小",
    title: "孩子們渴望學習程式設計，需要 15 台筆記型電腦",
    category: "硬體設備",
    location: "花蓮縣秀林鄉",
    studentCount: 28,
    imageUrl: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall/01.jpg`,
    urgency: "high",
    sdgs: [4],
    description: "我們是花蓮山區的小學，孩子們對電腦課充滿期待，但學校只有 3 台 10 年前的舊電腦。希望能有 15 台筆記型電腦，讓每個孩子都能親手操作，體驗數位學習的樂趣。"
  },
  {
    id: "need-002",
    schoolName: "南投縣信義鄉羅娜國小",
    title: "尋找程式設計志工，為孩子們開啟數位世界的大門",
    category: "師資/技能",
    location: "南投縣信義鄉",
    studentCount: 35,
    imageUrl: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall/05.jpg`,
    urgency: "medium",
    sdgs: [4],
    description: "我們是南投山區的小學，孩子們對程式設計充滿好奇，但缺乏專業師資。希望能有熱心的工程師志工，每週 2 小時遠距教學，帶領孩子們探索程式設計的奧秘。"
  },
  {
    id: "need-003",
    schoolName: "台東縣長濱鄉長濱國小",
    title: "足球隊夢想參加全國比賽，需要專業體育器材",
    category: "體育器材",
    location: "台東縣長濱鄉",
    studentCount: 45,
    imageUrl: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall/09.jpg`,
    urgency: "low",
    sdgs: [3],
    description: "我們的孩子熱愛足球，夢想參加全國比賽，但學校的足球已經破舊不堪。希望能有 20 顆新足球和 2 個球門，讓孩子們在陽光下快樂奔跑。"
  },
  {
    id: "need-004",
    schoolName: "屏東縣霧台鄉霧台國小",
    title: "藝術教室需要繪畫材料，讓孩子們的創意飛翔",
    category: "教學用品",
    location: "屏東縣霧台鄉",
    studentCount: 22,
    imageUrl: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall/02.jpg`,
    urgency: "medium",
    sdgs: [4],
    description: "我們的孩子有豐富的藝術天賦，但缺乏繪畫材料。希望能有水彩、畫筆、畫紙等藝術用品，讓孩子們的創意能夠自由飛翔。"
  },
  {
    id: "need-005",
    schoolName: "嘉義縣阿里山鄉達邦國小",
    title: "圖書館需要新書，讓孩子們在書海中遨遊",
    category: "圖書資源",
    location: "嘉義縣阿里山鄉",
    studentCount: 18,
    imageUrl: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall/03.jpg`,
    urgency: "low",
    sdgs: [4],
    description: "我們的小圖書館書籍老舊，孩子們渴望閱讀新書。希望能有適合小學生閱讀的課外讀物，讓孩子們在書海中遨遊，培養閱讀習慣。"
  },
  {
    id: "need-006",
    schoolName: "新竹縣尖石鄉新光國小",
    title: "音樂教室需要樂器，讓孩子們的音樂夢想成真",
    category: "音樂器材",
    location: "新竹縣尖石鄉",
    studentCount: 32,
    imageUrl: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall/04.jpg`,
    urgency: "medium",
    sdgs: [4],
    description: "我們的孩子熱愛音樂，但學校缺乏樂器。希望能有烏克麗麗、口琴等樂器，讓孩子們能夠學習音樂，培養藝術素養。"
  },
  {
    id: "need-007",
    schoolName: "苗栗縣泰安鄉象鼻國小",
    title: "科學實驗器材，讓孩子們探索科學的奧秘",
    category: "科學器材",
    location: "苗栗縣泰安鄉",
    studentCount: 25,
    imageUrl: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall/06.jpg`,
    urgency: "high",
    sdgs: [4],
    description: "我們的孩子對科學充滿好奇，但缺乏實驗器材。希望能有顯微鏡、實驗器材等，讓孩子們能夠親手做實驗，探索科學的奧秘。"
  },
  {
    id: "need-008",
    schoolName: "宜蘭縣大同鄉南山國小",
    title: "戶外教學需要交通費，讓孩子們走出校園看世界",
    category: "經費需求",
    location: "宜蘭縣大同鄉",
    studentCount: 20,
    imageUrl: `${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/impact-stories/background-wall/07.jpg`,
    urgency: "medium",
    sdgs: [4],
    description: "我們的孩子很少離開山區，希望能有機會到城市參觀博物館、科技館。希望能有交通費補助，讓孩子們走出校園，開闊視野。"
  }
];

// 公司儀表板統計數據
export const companyDashboardStats: CompanyDashboardStats = {
  completedProjects: 12,
  studentsHelped: 456,
  volunteerHours: 320,
  totalDonation: 1250000,
  avgProjectDuration: 42,
  successRate: 92,
  sdgContributions: {
    "4": 7,
    "10": 3,
    "3": 2
  }
};

// 學校儀表板統計數據
export const schoolDashboardStats: SchoolDashboardStats = {
  totalNeeds: 18,
  activeNeeds: 6,
  completedNeeds: 9,
  studentsBenefited: 603,
  avgResponseTime: 5,
  successRate: 88
};

// 推薦需求
export const recommendedNeeds: SchoolNeed[] = [
  {
    id: "need-001",
    schoolName: "花蓮縣希望國小",
    title: "需要 10 台二手筆電進行數位教學",
    category: "硬體設備",
    location: "花蓮縣",
    studentCount: 25,
    imageUrl: "https://images.unsplash.com/photo-1517420532572-4b6a6c57f2f4?q=80&w=1287",
    urgency: "high",
    sdgs: [4],
    description: "AI 推薦：基於您的捐贈歷史和地理位置，這個需求非常適合您的企業。"
  },
  {
    id: "need-002",
    schoolName: "南投縣深山國中",
    title: "誠徵一位程式設計志工老師 (遠距可)",
    category: "師資/技能",
    location: "南投縣",
    studentCount: 30,
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170",
    urgency: "medium",
    sdgs: [4],
    description: "AI 推薦：您的技術背景非常適合這個志工需求。"
  }
];

// 最近項目
export const recentProjects: RecentProject[] = [
  {
    id: "proj-001",
    title: "筆電捐贈與數位課程",
    school: "花蓮縣秀林鄉銅門國小",
    status: "completed",
    progress: 100,
    studentsBenefited: 28,
    completionDate: "2024-12-15"
  },
  {
    id: "proj-002",
    title: "遠距程式設計志工",
    school: "南投縣信義鄉羅娜國小",
    status: "in_progress",
    progress: 65,
    studentsBenefited: 35
  }
];

// 影響力故事
export const impactStories: ImpactStory[] = [
  {
    id: "story-001",
    title: "孩子們眼中的星星：台積電志工帶來的程式設計課",
    schoolName: "花蓮縣秀林鄉銅門國小",
    companyName: "台積電",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170",
    summary: "『老師，我長大也要當工程師！』這是小明第一次寫出『Hello World』時興奮地對我們說的話。感謝台積電的志工們，不僅捐贈了 15 台筆記型電腦，更每週親自到校教學，讓山區的孩子們也能接觸到最先進的程式設計知識。",
    storyDate: "2024-12-15",
    impact: {
      studentsBenefited: 28,
      equipmentDonated: "15台筆記型電腦",
      duration: "6個月"
    }
  },
  {
    id: "story-002",
    title: "從山區到雲端：鴻海工程師的遠距程式課",
    schoolName: "南投縣信義鄉羅娜國小",
    companyName: "鴻海科技",
    imageUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1170",
    summary: "『我們雖然在山區，但心可以飛到全世界！』這是孩子們學會使用 Scratch 創作動畫後的心聲。鴻海的工程師們利用週末時間，為我們帶來了 12 週的線上程式設計課程，讓孩子們的創意得以在數位世界中綻放。",
    storyDate: "2024-11-20",
    impact: {
      studentsBenefited: 35,
      equipmentDonated: "程式設計軟體授權",
      duration: "3個月"
    }
  },
  {
    id: "story-003",
    title: "陽光下的夢想：統一企業讓足球隊重燃希望",
    schoolName: "台東縣長濱鄉長濱國小",
    companyName: "統一企業",
    imageUrl: "https://images.unsplash.com/photo-1521464307224-48e137f6b93a?q=80&w=1170",
    summary: "『我們終於可以參加全國比賽了！』足球隊隊長小華抱著新足球，眼中閃爍著希望的光芒。統一企業不僅捐贈了 20 顆新足球和 2 個球門，更贊助了球隊的訓練經費，讓孩子們的足球夢想得以實現。",
    storyDate: "2024-10-30",
    impact: {
      studentsBenefited: 45,
      equipmentDonated: "20顆足球 + 2個球門",
      duration: "持續進行"
    }
  }
];

// 我的需求
export const myNeeds: SchoolNeed[] = [
  {
    id: "need-009",
    schoolName: "花蓮縣希望國小",
    title: "教室投影機汰舊換新",
    category: "硬體設備",
    location: "花蓮縣",
    studentCount: 120,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1287",
    urgency: "medium",
    sdgs: [4],
    description: "現有投影設備老舊，影響教學品質，期望汰換 4 台投影機。"
  },
  {
    id: "need-010",
    schoolName: "花蓮縣希望國小",
    title: "圖書館閱讀角改造",
    category: "圖書資源",
    location: "花蓮縣",
    studentCount: 120,
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1287",
    urgency: "low",
    sdgs: [4],
    description: "新增繪本與閱讀座位，營造溫暖閱讀空間。"
  }
];

// 公司捐贈記錄
export const companyDonations: CompanyDonation[] = [
  {
    id: "don-001",
    needId: "need-001",
    needTitle: "孩子們渴望學習程式設計，需要 15 台筆記型電腦",
    schoolName: "花蓮縣秀林鄉銅門國小",
    donationDate: "2024-12-15",
    status: "已完成",
    type: "物資",
    description: "台積電捐贈 15 台全新筆記型電腦，並派遣志工每週到校教學程式設計"
  },
  {
    id: "don-002",
    needId: "need-003",
    needTitle: "足球隊夢想參加全國比賽，需要專業體育器材",
    schoolName: "台東縣長濱鄉長濱國小",
    donationDate: "2024-10-30",
    status: "已完成",
    type: "物資",
    description: "統一企業捐贈 20 顆新足球、2 個球門，並贊助球隊訓練經費"
  }
];

// 最近活動
export const recentActivity: RecentActivity[] = [
  {
    id: "act-001",
    type: "created",
    title: "刊登新需求：教室投影機汰舊換新",
    timestamp: "2025-09-26 10:20",
    status: "info"
  },
  {
    id: "act-002",
    type: "matched",
    title: "企業A 表達意願：提供 2 台投影機",
    timestamp: "2025-09-27 14:05",
    status: "success"
  },
  {
    id: "act-003",
    type: "completed",
    title: "完成需求：音樂教室樂器到位",
    timestamp: "2025-09-20 09:30",
    status: "success"
  }
];
