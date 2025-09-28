import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  MapIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  LightBulbIcon,
  UsersIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const SmartExplorationPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleStartExploration = () => {
    setIsAnalyzing(true);
    // 模擬 AI 分析過程
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const analysisResults = {
    totalSchools: 12,
    totalStudents: 2430,
    regions: ['南投縣', '花蓮縣'],
    recommendations: [
      {
        id: 'A',
        name: '集中式',
        description: '將 50 台平板全數捐給花蓮縣秀林國中',
        schools: [{ name: '花蓮縣秀林國中', students: 520, devices: 50 }],
        totalBeneficiaries: 520,
        pros: ['單一學校數位教學環境全面提升'],
        cons: ['覆蓋範圍有限']
      },
      {
        id: 'B',
        name: '分散式',
        description: '分散捐贈給 5 所學校',
        schools: [
          { name: '南投縣仁愛國小', students: 210, devices: 10 },
          { name: '南投縣信義國中', students: 185, devices: 10 },
          { name: '花蓮縣富里國小', students: 240, devices: 10 },
          { name: '花蓮縣萬榮國中', students: 190, devices: 10 },
          { name: '花蓮縣壽豐國小', students: 160, devices: 10 }
        ],
        totalBeneficiaries: 985,
        pros: ['覆蓋範圍廣', '影響更多學校'],
        cons: ['單校影響力較小']
      },
      {
        id: 'C',
        name: '混合式（推薦）',
        description: '兼顧集中影響力與分散覆蓋',
        schools: [
          { name: '花蓮縣秀林國中', students: 520, devices: 30 },
          { name: '南投縣仁愛國小', students: 210, devices: 10 },
          { name: '花蓮縣富里國小', students: 240, devices: 10 }
        ],
        totalBeneficiaries: 970,
        pros: ['兼顧集中影響力與分散覆蓋', '平衡效果最佳'],
        cons: ['需要更多協調工作']
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 頁面標題 */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <SparklesIcon className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">智慧探索</h1>
            <p className="text-gray-600">AI 驅動的捐贈策略分析</p>
          </div>
        </div>
      </div>

      {/* 輸入區域 */}
      {!showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">開始您的智慧探索</h2>
            <p className="text-gray-600 mb-8">請描述您的捐贈需求和目標，AI 將為您分析最佳策略</p>
            
            {/* 範例輸入 */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">範例輸入：</h3>
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <p className="text-gray-700 italic">
                  "我們公司想捐贈 <span className="font-semibold text-purple-600">50 台平板電腦</span>，
                  希望能優先幫助 <span className="font-semibold text-purple-600">南投與花蓮的偏鄉國中小</span>，
                  並希望影響的學生數量能最大化。"
                </p>
              </div>
            </div>

            <button
              onClick={handleStartExploration}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>AI 分析中...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="w-5 h-5" />
                  <span>開始探索</span>
                </div>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* 分析結果 */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* 分析摘要 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-2 text-blue-600" />
              分析結果
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <MapIcon className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">找到學校</p>
                    <p className="text-2xl font-bold text-blue-600">{analysisResults.totalSchools} 所</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <UsersIcon className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">總學生數</p>
                    <p className="text-2xl font-bold text-green-600">{analysisResults.totalStudents.toLocaleString()} 人</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <AcademicCapIcon className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">涵蓋區域</p>
                    <p className="text-lg font-bold text-purple-600">{analysisResults.regions.join('、')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 推薦方案 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <LightBulbIcon className="w-6 h-6 mr-2 text-yellow-600" />
              三種投放方案
            </h2>
            <div className="space-y-6">
              {analysisResults.recommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`border-2 rounded-lg p-6 ${
                    recommendation.id === 'C' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        方案 {recommendation.id}｜{recommendation.name}
                        {recommendation.id === 'C' && (
                          <span className="ml-2 bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
                            推薦
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 mt-1">{recommendation.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{recommendation.totalBeneficiaries}</p>
                      <p className="text-sm text-gray-600">受惠人數</p>
                    </div>
                  </div>

                  {/* 學校分配 */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">學校分配：</h4>
                    <div className="space-y-2">
                      {recommendation.schools.map((school, schoolIndex) => (
                        <div key={schoolIndex} className="flex items-center justify-between bg-white rounded-lg p-3 border">
                          <span className="font-medium text-gray-900">{school.name}</span>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{school.students} 人</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {school.devices} 台
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 優缺點 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-green-700 mb-2">優點：</h5>
                      <ul className="space-y-1">
                        {recommendation.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="flex items-center text-sm text-green-600">
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-2">考量：</h5>
                      <ul className="space-y-1">
                        {recommendation.cons.map((con, conIndex) => (
                          <li key={conIndex} className="flex items-center text-sm text-orange-600">
                            <div className="w-4 h-4 mr-2 rounded-full bg-orange-200 flex items-center justify-center">
                              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                            </div>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 視覺化輸出 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <DocumentTextIcon className="w-6 h-6 mr-2 text-green-600" />
              視覺化輸出
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <MapIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">地圖視覺化</h3>
                <p className="text-sm text-gray-600">顯示南投與花蓮被選定的學校位置</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <ChartBarIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">數據表格</h3>
                <p className="text-sm text-gray-600">各校分配數量、學生數、受惠人數</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <DocumentTextIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">CSR 報告</h3>
                <p className="text-sm text-gray-600">自動生成一頁 CSR 建議書 PDF</p>
              </div>
            </div>
          </div>

          {/* 重新分析按鈕 */}
          <div className="text-center">
            <button
              onClick={() => setShowResults(false)}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              重新分析
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartExplorationPage;
