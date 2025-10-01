import { useApi } from '../hooks/useApi';
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
  const { data: needs, isUsingFallback } = useApi<SchoolNeed[]>('http://localhost:3001/school_needs');

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