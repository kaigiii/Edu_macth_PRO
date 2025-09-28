import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  MapPinIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  LightBulbIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface SmartExplorationProps {
  onClose?: () => void;
}

const SmartExploration: React.FC<SmartExplorationProps> = ({ onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'A' | 'B' | 'C' | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const mockResults = {
    analysis: {
      totalSchools: 12,
      totalStudents: 2430,
      regions: ['南投縣', '花蓮縣']
    },
    plans: {
      A: {
        title: '集中式',
        description: '將 50 台平板全數捐給花蓮縣秀林國中',
        schools: [
          { name: '花蓮縣秀林國中', students: 520, devices: 50 }
        ],
        totalBeneficiaries: 520,
        advantages: ['單一學校數位教學環境全面提升', '管理集中，效果顯著']
      },
      B: {
        title: '分散式',
        description: '分散到多所學校，擴大覆蓋範圍',
        schools: [
          { name: '南投縣仁愛國小', students: 210, devices: 10 },
          { name: '南投縣信義國中', students: 185, devices: 10 },
          { name: '花蓮縣富里國小', students: 240, devices: 10 },
          { name: '花蓮縣萬榮國中', students: 190, devices: 10 },
          { name: '花蓮縣壽豐國小', students: 160, devices: 10 }
        ],
        totalBeneficiaries: 985,
        advantages: ['覆蓋範圍廣', '多校受益']
      },
      C: {
        title: '混合式（推薦）',
        description: '兼顧集中影響力與分散覆蓋',
        schools: [
          { name: '花蓮縣秀林國中', students: 520, devices: 30 },
          { name: '南投縣仁愛國小', students: 210, devices: 10 },
          { name: '花蓮縣富里國小', students: 240, devices: 10 }
        ],
        totalBeneficiaries: 970,
        advantages: ['兼顧集中影響力與分散覆蓋', '平衡效益與管理']
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-purple-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <SparklesIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">智慧探索</h2>
            <p className="text-gray-600">AI 驅動的捐贈策略分析</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {!showResults ? (
        <div className="space-y-6">
          {/* 輸入條件 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">捐贈條件</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">捐贈物資：<strong>50 台平板電腦</strong></span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">優先地區：<strong>南投與花蓮的偏鄉國中小</strong></span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">目標：<strong>影響學生數量最大化</strong></span>
              </div>
            </div>
          </div>

          {/* 分析按鈕 */}
          <div className="text-center">
            <motion.button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>AI 分析中...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="w-5 h-5" />
                  <span>開始智慧分析</span>
                </div>
              )}
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 分析結果 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ChartBarIcon className="w-5 h-5 text-purple-600" />
              <span>分析結果</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{mockResults.analysis.totalSchools}</div>
                <div className="text-sm text-gray-600">符合條件學校</div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{mockResults.analysis.totalStudents.toLocaleString()}</div>
                <div className="text-sm text-gray-600">總學生人數</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{mockResults.analysis.regions.length}</div>
                <div className="text-sm text-gray-600">涵蓋縣市</div>
              </div>
            </div>
          </div>

          {/* 投放方案 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <LightBulbIcon className="w-5 h-5 text-purple-600" />
              <span>三種投放方案</span>
            </h3>
            
            {Object.entries(mockResults.plans).map(([key, plan]) => (
              <motion.div
                key={key}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedPlan === key
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
                onClick={() => setSelectedPlan(key as 'A' | 'B' | 'C')}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{plan.title}</h4>
                      {key === 'C' && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          推薦
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{plan.description}</p>
                    
                    <div className="space-y-2">
                      {plan.schools.map((school, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{school.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500">{school.students} 人</span>
                            <span className="text-purple-600 font-medium">{school.devices} 台</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">預估受惠人數</span>
                        <span className="text-lg font-bold text-purple-600">{plan.totalBeneficiaries}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {selectedPlan === key ? (
                      <CheckCircleIcon className="w-6 h-6 text-purple-600" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 行動按鈕 */}
          <div className="flex space-x-4">
            <motion.button
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              採用此方案
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <DocumentTextIcon className="w-5 h-5" />
              <span>生成報告</span>
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              <span>下載 PDF</span>
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SmartExploration;
