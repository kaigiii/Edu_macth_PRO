import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import NeedCard from '../components/NeedCard';
import type { SchoolNeed } from '../types';

const AllNeedsPage = () => {
  const [needs, setNeeds] = useState<SchoolNeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // 模擬數據載入
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模擬數據
        const mockNeeds: SchoolNeed[] = [
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
          },
          {
            id: "need-004",
            schoolName: "屏東縣霧台鄉霧台國小",
            title: "藝術教室需要繪畫材料，讓孩子們的創意飛翔",
            category: "教學用品",
            location: "屏東縣霧台鄉",
            studentCount: 22,
            imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1170",
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
            imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1170",
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
            imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1170",
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
            imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1170",
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
            imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170",
            urgency: "medium",
            sdgs: [4],
            description: "我們的孩子很少離開山區，希望能有機會到城市參觀博物館、科技館。希望能有交通費補助，讓孩子們走出校園，開闊視野。"
          }
        ];
        
        setNeeds(mockNeeds);
      } catch (error) {
        console.error('載入需求資料失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNeeds();
  }, []);

  // 篩選邏輯
  const filteredNeeds = needs.filter(need => {
    const matchesSearch = need.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         need.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         need.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || need.category === selectedCategory;
    const matchesUrgency = !selectedUrgency || need.urgency === selectedUrgency;
    
    return matchesSearch && matchesCategory && matchesUrgency;
  });

  const categories = [...new Set(needs.map(need => need.category))];
  const urgencyLevels = [
    { value: 'high', label: '緊急', color: 'text-red-600' },
    { value: 'medium', label: '中等', color: 'text-yellow-600' },
    { value: 'low', label: '一般', color: 'text-green-600' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頁面標題 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>返回首頁</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">所有需求</h1>
            </div>
            <div className="text-sm text-gray-500">
              共 {filteredNeeds.length} 個需求
            </div>
          </div>
        </div>
      </div>

      {/* 搜尋和篩選區域 */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 搜尋框 */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜尋需求、學校或地點..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 篩選按鈕 */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="w-5 h-5" />
              <span>篩選</span>
            </button>
          </div>

          {/* 篩選選項 */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 類別篩選 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">類別</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">全部類別</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* 緊急程度篩選 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">緊急程度</label>
                  <select
                    value={selectedUrgency}
                    onChange={(e) => setSelectedUrgency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">全部程度</option>
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* 需求列表 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredNeeds.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">找不到符合條件的需求</h3>
            <p className="text-gray-500">請嘗試調整搜尋條件或篩選器</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNeeds.map((need, index) => (
              <motion.div
                key={need.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <NeedCard need={need} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 底部統計 */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{needs.length}</div>
              <div className="text-sm text-gray-600">總需求數</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {needs.filter(need => need.urgency === 'high').length}
              </div>
              <div className="text-sm text-gray-600">緊急需求</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {needs.reduce((sum, need) => sum + need.studentCount, 0)}
              </div>
              <div className="text-sm text-gray-600">受益學生</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600">需求類別</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNeedsPage;
