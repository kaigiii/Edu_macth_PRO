import { useApi } from '../hooks/useApi';
import StoryCard from '../components/StoryCard';
import type { ImpactStory } from '../types';

const ImpactStoriesPage = () => {
  const { data: stories, isLoading, error, isUsingFallback } = useApi<ImpactStory[]>('http://localhost:3001/impact_stories');

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
    <div className="max-w-6xl mx-auto px-4">
      {/* 頁面標題 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        影響力故事牆
      </h1>

      {/* 故事卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories?.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default ImpactStoriesPage;
