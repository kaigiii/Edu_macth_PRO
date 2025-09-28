import type { SchoolNeed } from '../types';

// 匯入我們剛剛創建的所有區塊元件
import HeroSection from './HomePage/HeroSection';
import MapSection from './HomePage/MapSection';
import ValueSection from './HomePage/ValueSection';
import SolutionSection from './HomePage/SolutionSection';
import NeedsCarousel from './HomePage/NeedsCarousel';
import CtaSection from './HomePage/CtaSection';

const HomePage = () => {
  // 數據獲取邏輯保留在父元件中
  // 在生產環境中使用靜態數據，避免 API 依賴
  const needs: SchoolNeed[] = [
    {
      id: "need-001",
      schoolName: "花蓮縣秀林鄉銅門國小",
      title: "孩子們渴望學習程式設計，需要 15 台筆記型電腦",
      category: "硬體設備",
      location: "花蓮縣秀林鄉",
      studentCount: 28,
      imageUrl: "https://images.unsplash.com/photo-1517420532572-4b6a6c57f2f4?q=80&w=1287",
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
      imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170",
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
      imageUrl: "https://images.unsplash.com/photo-1551951239-1f4175b5a79a?q=80&w=1170",
      urgency: "low",
      sdgs: [3],
      description: "我們的孩子熱愛足球，夢想參加全國比賽，但學校的足球已經破舊不堪。希望能有 20 顆新足球和 2 個球門，讓孩子們在陽光下快樂奔跑。"
    }
  ];

  return (
    <div className="relative">
      <HeroSection />
      <MapSection />
      <ValueSection />
      <SolutionSection />
      <NeedsCarousel needs={needs} />
      <CtaSection />
    </div>
  );
};

export default HomePage;