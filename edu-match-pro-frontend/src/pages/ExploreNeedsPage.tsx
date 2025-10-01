import { useState } from 'react';
import NeedCard from '../components/NeedCard';
import { useApi } from '../hooks/useApi';
import type { SchoolNeed } from '../types';

const ExploreNeedsPage = () => {
  const { data: needs, isLoading, error, isUsingFallback } = useApi<SchoolNeed[]>('http://localhost:3001/school_needs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // 創建篩選後的列表
  const filteredNeeds = needs?.filter((need) => {
    // 第一層過濾 (分類)
    const categoryMatch = selectedCategory === '' || need.category === selectedCategory;
    
    // 第二層過濾 (搜尋)
    const searchMatch = searchTerm === '' || 
      need.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      need.schoolName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  }) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">讀取中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-red-600">資料載入失敗...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">探索所有需求</h1>
      
      {/* 搜尋和篩選控制區 */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="搜尋學校名稱或需求標題..."
          className="flex-grow border rounded-md px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="border rounded-md px-4 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">全部分類</option>
          <option value="硬體設備">硬體設備</option>
          <option value="師資/技能">師資/技能</option>
          <option value="體育器材">體育器材</option>
        </select>
      </div>

      {/* 結果顯示 */}
      {filteredNeeds.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-lg text-gray-600">找不到符合條件的需求。</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNeeds.map((need) => (
            <NeedCard key={need.id} need={need} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreNeedsPage;
