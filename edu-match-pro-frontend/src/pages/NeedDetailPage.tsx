import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import type { SchoolNeed } from '../types';

const NeedDetailPage = () => {
  const { needId } = useParams();
  const { data: need, isLoading, error, isUsingFallback } = useApi<SchoolNeed>(`http://localhost:3001/school_needs/${needId}`);

  // 調試信息
  console.log('NeedDetailPage Debug:', {
    needId,
    need,
    isLoading,
    error,
    isUsingFallback
  });

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

  if (!need) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">找不到此需求...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* 頂部標題 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {need.title}
      </h1>

      {/* 資訊標籤 */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {need.location}
        </span>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {need.category}
        </span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
          {need.studentCount} 位學生受惠
        </span>
      </div>

      {/* 主圖 */}
      <div className="mb-8">
        <img 
          src={need.imageUrl} 
          alt={need.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* 詳細描述區 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">需求詳情</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            這是一段關於此需求的詳細說明文字。學校需要這些資源來改善學生的學習環境，
            讓偏鄉的孩子們也能享有與都市學生相同的教育品質。您的支持將直接幫助到這些孩子，
            為他們的未來創造更多可能性。
          </p>
        </div>
      </div>

      {/* 側邊欄/行動區塊 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">學校資訊</h3>
          <div className="bg-white border rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">{need.schoolName}</h4>
            <p className="text-gray-600 mb-4">位於 {need.location}</p>
            <p className="text-gray-700">
              這所學校致力於為偏鄉地區的學生提供優質教育，目前有 {need.studentCount} 位學生。
              學校希望透過外界的支持，讓學生們能夠享有更好的學習資源。
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">立即行動</h3>
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p className="font-medium">學校：{need.schoolName}</p>
                <p>地點：{need.location}</p>
                <p>受惠學生：{need.studentCount} 人</p>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg">
                我要認捐
              </button>
              <p className="text-xs text-gray-500 text-center">
                點擊按鈕開始認捐流程
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedDetailPage;
