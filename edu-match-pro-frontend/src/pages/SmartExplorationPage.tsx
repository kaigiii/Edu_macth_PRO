import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  MapIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface ExplorationResult {
  id: string;
  title: string;
  description: string;
  studentsBenefited: number;
  schools: string[];
  allocation: { school: string; devices: number; students: number }[];
  mapData: { name: string; value: number; coordinates: [number, number] }[];
}

const SmartExplorationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  // 模擬 AI 分析結果
  const mockResults: ExplorationResult = {
    id: 'exploration-001',
    title: '50台平板電腦智慧投放方案',
    description: '基於南投與花蓮偏鄉學校分析，提供三種投放策略',
    studentsBenefited: 970,
    schools: ['花蓮縣秀林國中', '南投縣仁愛國小', '花蓮縣富里國小'],
    allocation: [
      { school: '花蓮縣秀林國中', devices: 30, students: 520 },
      { school: '南投縣仁愛國小', devices: 10, students: 210 },
      { school: '花蓮縣富里國小', devices: 10, students: 240 }
    ],
    mapData: [
      { name: '花蓮縣秀林國中', value: 30, coordinates: [121.5, 24.0] },
      { name: '南投縣仁愛國小', value: 10, coordinates: [121.0, 23.9] },
      { name: '花蓮縣富里國小', value: 10, coordinates: [121.3, 23.2] }
    ]
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2">
                  <SparklesIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">AI 智慧探索</h1>
                  <p className="text-sm text-gray-600">基於您的需求條件，智能分析最佳投放方案</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 需求輸入區域 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">📝 需求條件</h2>
                <p className="text-lg text-gray-600">請輸入您的捐贈條件，AI 將為您分析最佳投放方案</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <MagnifyingGlassIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">範例需求</h3>
                    <p className="text-gray-700 leading-relaxed">
                      我們公司想捐贈 <span className="font-semibold text-blue-600">50 台平板電腦</span>，
                      希望能優先幫助 <span className="font-semibold text-green-600">南投與花蓮的偏鄉國中小</span>，
                      並希望影響的學生數量能最大化。
                    </p>
                  </div>
                </div>
              </div>

              {/* 分析按鈕 */}
              <div className="text-center mt-8">
                <motion.button
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>AI 正在分析中...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <SparklesIcon className="w-6 h-6" />
                      <span>開始智慧分析</span>
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 分析結果標題 */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🤖 AI 分析結果</h2>
              <p className="text-lg text-gray-600">根據偏遠地區國中小名錄與學生人數分析</p>
            </div>

            {/* 統計概覽 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                <div className="text-sm text-blue-800">符合條件學校</div>
              </motion.div>
              <motion.div 
                className="bg-green-50 rounded-xl p-6 text-center border border-green-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl font-bold text-green-600 mb-2">2,430</div>
                <div className="text-sm text-green-800">總學生人數</div>
              </motion.div>
              <motion.div 
                className="bg-purple-50 rounded-xl p-6 text-center border border-purple-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">970</div>
                <div className="text-sm text-purple-800">預估受惠人數</div>
              </motion.div>
            </div>

            {/* 三種投放方案 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 三種投放方案</h3>
              
              <div className="space-y-6">
                {/* 方案 A - 集中式 */}
                <motion.div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedOption === 'A' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleSelectOption('A')}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">方案 A｜集中式</h4>
                      <p className="text-gray-600 mb-2">將 50 台平板全數捐給花蓮縣秀林國中</p>
                      <p className="text-blue-600 font-medium">預估受惠人數：520</p>
                    </div>
                    {selectedOption === 'A' && (
                      <CheckCircleIcon className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                </motion.div>

                {/* 方案 B - 分散式 */}
                <motion.div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedOption === 'B' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => handleSelectOption('B')}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">方案 B｜分散式</h4>
                      <p className="text-gray-600 mb-2">分散到 5 所學校，每校 10 台</p>
                      <p className="text-green-600 font-medium">預估受惠人數：985</p>
                    </div>
                    {selectedOption === 'B' && (
                      <CheckCircleIcon className="w-8 h-8 text-green-600" />
                    )}
                  </div>
                </motion.div>

                {/* 方案 C - 混合式（推薦） */}
                <motion.div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedOption === 'C' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-purple-300 bg-purple-25'
                  }`}
                  onClick={() => handleSelectOption('C')}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">方案 C｜混合式（推薦）</h4>
                      <p className="text-gray-600 mb-2">兼顧集中影響力與分散覆蓋</p>
                      <p className="text-purple-600 font-medium">預估受惠人數：970</p>
                      <div className="mt-3 text-sm text-purple-700">
                        • 花蓮縣秀林國中（30台，520人）<br/>
                        • 南投縣仁愛國小（10台，210人）<br/>
                        • 花蓮縣富里國小（10台，240人）
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        推薦
                      </span>
                      {selectedOption === 'C' && (
                        <CheckCircleIcon className="w-8 h-8 text-purple-600" />
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 視覺化輸出 */}
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 視覺化輸出</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 地圖區域 */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <MapIcon className="w-6 h-6 text-blue-600" />
                      <span className="text-lg font-semibold text-gray-900">學校位置分佈</span>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <MapIcon className="w-16 h-16 mx-auto mb-3" />
                        <p className="text-lg font-medium">地圖視覺化</p>
                        <p className="text-sm">顯示選定學校位置</p>
                      </div>
                    </div>
                  </div>

                  {/* 數據表格 */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <ChartBarIcon className="w-6 h-6 text-green-600" />
                      <span className="text-lg font-semibold text-gray-900">分配明細</span>
                    </div>
                    <div className="space-y-3">
                      {mockResults.allocation.map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="flex justify-between items-center py-3 px-4 bg-white rounded-lg border border-gray-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="font-medium text-gray-700">{item.school}</span>
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">{item.devices}台</span>
                            <span className="text-sm text-gray-500 ml-2">({item.students}人)</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 生成報告按鈕 */}
                <div className="mt-8 text-center">
                  <motion.button
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-3">
                      <DocumentTextIcon className="w-6 h-6" />
                      <span>生成 CSR 建議書 PDF</span>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SmartExplorationPage;
