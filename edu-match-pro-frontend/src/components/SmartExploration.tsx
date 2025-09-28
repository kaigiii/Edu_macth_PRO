import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  MapIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface SmartExplorationProps {
  onClose?: () => void;
}

interface ExplorationResult {
  id: string;
  title: string;
  description: string;
  studentsBenefited: number;
  schools: string[];
  allocation: { school: string; devices: number; students: number }[];
  mapData: { name: string; value: number; coordinates: [number, number] }[];
}

const SmartExploration: React.FC<SmartExplorationProps> = ({ onClose }) => {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SparklesIcon className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">AI 智慧探索</h2>
                <p className="text-blue-100">基於您的需求條件，智能分析最佳投放方案</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {!showResults ? (
            <div className="space-y-6">
              {/* 需求輸入區域 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 需求條件</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700">
                    我們公司想捐贈 <span className="font-semibold text-blue-600">50 台平板電腦</span>，
                    希望能優先幫助 <span className="font-semibold text-green-600">南投與花蓮的偏鄉國中小</span>，
                    並希望影響的學生數量能最大化。
                  </p>
                </div>
              </div>

              {/* 分析按鈕 */}
              <div className="text-center">
                <motion.button
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>AI 正在分析中...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <MagnifyingGlassIcon className="w-6 h-6" />
                      <span>開始智慧分析</span>
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* 分析結果標題 */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🤖 AI 分析結果</h3>
                <p className="text-gray-600">根據偏遠地區國中小名錄與學生人數分析</p>
              </div>

              {/* 統計概覽 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-blue-800">符合條件學校</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">2,430</div>
                  <div className="text-sm text-green-800">總學生人數</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">970</div>
                  <div className="text-sm text-purple-800">預估受惠人數</div>
                </div>
              </div>

              {/* 三種投放方案 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">🎯 三種投放方案</h4>
                
                {/* 方案 A - 集中式 */}
                <motion.div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedOption === 'A' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleSelectOption('A')}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-gray-900">方案 A｜集中式</h5>
                      <p className="text-sm text-gray-600">將 50 台平板全數捐給花蓮縣秀林國中</p>
                      <p className="text-sm text-blue-600 font-medium">預估受惠人數：520</p>
                    </div>
                    {selectedOption === 'A' && (
                      <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </motion.div>

                {/* 方案 B - 分散式 */}
                <motion.div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedOption === 'B' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => handleSelectOption('B')}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-gray-900">方案 B｜分散式</h5>
                      <p className="text-sm text-gray-600">分散到 5 所學校，每校 10 台</p>
                      <p className="text-sm text-green-600 font-medium">預估受惠人數：985</p>
                    </div>
                    {selectedOption === 'B' && (
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </motion.div>

                {/* 方案 C - 混合式（推薦） */}
                <motion.div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedOption === 'C' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-purple-300 bg-purple-25'
                  }`}
                  onClick={() => handleSelectOption('C')}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-gray-900">方案 C｜混合式（推薦）</h5>
                      <p className="text-sm text-gray-600">兼顧集中影響力與分散覆蓋</p>
                      <p className="text-sm text-purple-600 font-medium">預估受惠人數：970</p>
                      <div className="mt-2 text-xs text-purple-700">
                        • 花蓮縣秀林國中（30台，520人）<br/>
                        • 南投縣仁愛國小（10台，210人）<br/>
                        • 花蓮縣富里國小（10台，240人）
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                        推薦
                      </span>
                      {selectedOption === 'C' && (
                        <CheckCircleIcon className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* 視覺化輸出 */}
              {selectedOption && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 視覺化輸出</h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 地圖區域 */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <MapIcon className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">學校位置分佈</span>
                      </div>
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-600">
                          <MapIcon className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">地圖視覺化</p>
                          <p className="text-xs">顯示選定學校位置</p>
                        </div>
                      </div>
                    </div>

                    {/* 數據表格 */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <ChartBarIcon className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">分配明細</span>
                      </div>
                      <div className="space-y-2">
                        {mockResults.allocation.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-700">{item.school}</span>
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-900">{item.devices}台</span>
                              <span className="text-xs text-gray-500 ml-2">({item.students}人)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 生成報告按鈕 */}
                  <div className="mt-6 text-center">
                    <motion.button
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center space-x-2">
                        <DocumentTextIcon className="w-5 h-5" />
                        <span>生成 CSR 建議書 PDF</span>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SmartExploration;
