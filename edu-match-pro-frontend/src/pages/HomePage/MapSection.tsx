import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import TaiwanMap, { TaiwanMapRef } from '../../components/TaiwanMap';
import { HomePageAnimations } from './animation.config';

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 假資料：學校位置和需求
const mockSchoolData = [
  { 
    id: 1, 
    name: '台東縣太麻里國小', 
    needs: ['電腦設備', '圖書資源'],
    students: 45,
    status: 'urgent' as const
  },
  { 
    id: 2, 
    name: '花蓮縣秀林國中', 
    needs: ['體育器材', '音樂設備'],
    students: 78,
    status: 'active' as const
  },
  { 
    id: 3, 
    name: '屏東縣霧台國小', 
    needs: ['教學設備', '圖書資源'],
    students: 32,
    status: 'urgent' as const
  },
  { 
    id: 4, 
    name: '南投縣信義國中', 
    needs: ['電腦設備', '實驗器材'],
    students: 156,
    status: 'active' as const
  },
  { 
    id: 5, 
    name: '嘉義縣阿里山國小', 
    needs: ['圖書資源', '教學設備'],
    students: 28,
    status: 'urgent' as const
  },
  { 
    id: 6, 
    name: '新竹縣尖石國中', 
    needs: ['體育器材', '電腦設備'],
    students: 89,
    status: 'active' as const
  },
  { 
    id: 7, 
    name: '苗栗縣泰安國小', 
    needs: ['音樂設備', '圖書資源'],
    students: 41,
    status: 'urgent' as const
  },
  { 
    id: 8, 
    name: '宜蘭縣大同國中', 
    needs: ['實驗器材', '體育器材'],
    students: 134,
    status: 'active' as const
  },
];

// 100x100 網格系統的標記位置（基於台灣地圖的實際地理位置）
const getMarkerPosition = (id: number) => {
  // 根據台灣地圖的實際地理位置在 100x100 網格中分配位置
  const positions: { [key: number]: { x: number; y: number } } = {
    1: { x: 70, y: 30 },  // 台東縣太麻里國小 (東部偏南)
    2: { x: 80, y: 25 },  // 花蓮縣秀林國中 (東部偏北)
    3: { x: 75, y: 40 },  // 屏東縣霧台國小 (南部)
    4: { x: 90, y: 35 },  // 南投縣信義國中 (中部偏南)
    5: { x: 86, y: 38 },  // 嘉義縣阿里山國小 (中南部)
    6: { x: 67, y: 30 },  // 新竹縣尖石國中 (北部)
    7: { x: 69, y: 70 },  // 苗栗縣泰安國小 (中北部)
    8: { x: 92, y: 40 },  // 宜蘭縣大同國中 (東北部)
  };
  
  return positions[id] || { x: 50, y: 50 }; // 預設位置
};

const MapSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const taiwanMapRef = useRef<TaiwanMapRef>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [selectedSchool, setSelectedSchool] = useState<typeof mockSchoolData[0] | null>(null);

  // 處理開始配對按鈕點擊
  const handleStartMatching = () => {
    navigate('/needs');
  };

  useLayoutEffect(() => {
    if (!sectionRef.current || !titleRef.current || !descriptionRef.current || !mapRef.current || !statsRef.current) return;

    // 設置初始狀態
    gsap.set([titleRef.current, descriptionRef.current], { opacity: 0, y: 30 });
    gsap.set(mapRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(statsRef.current, { opacity: 0, y: 20 });

    // 創建滾動動畫時間軸
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    });

    // 標題和描述淡入
    tl.to([titleRef.current, descriptionRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 0);

    // 地圖淡入
    tl.to(mapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    }, 0.2);

    // 學校標記動畫
    tl.call(() => {
      // 為每個學校標記添加閃爍動畫
      mockSchoolData.forEach((school, index) => {
        const marker = document.getElementById(`school-marker-${school.id}`);
        if (marker) {
          gsap.set(marker, { opacity: 0, scale: 0 });
          tl.to(marker, {
        opacity: 1, 
        scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
          }, 0.4 + index * 0.1);
          
          // 添加閃爍效果
          tl.to(marker, {
            scale: 1.2,
            duration: 0.1,
            yoyo: true,
            repeat: 2,
            ease: "power2.inOut"
          }, `>-0.1`);
        }
      });
    }, null, 0.4);

    // 統計數據淡入
    tl.to(statsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, 0.6);

    // 清理函數
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen relative py-20"
        style={{
          backgroundImage: `url("${import.meta.env.PROD ? '/Edu_macth_PRO' : ''}/images/bg-1.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* 標題區域 */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
            連接台灣的
            <span className="text-white drop-shadow-2xl">
              每一個角落
            </span>
          </motion.h2>
          
          <motion.p
            ref={descriptionRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-3xl lg:max-w-4xl mx-auto leading-relaxed drop-shadow-lg px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            透過精準的資源配對，我們正在點亮台灣偏鄉教育的未來，
                <br />
            讓每一份善意都能到達最需要的地方。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* 左側：台灣地圖 */}
          <div ref={mapRef} className="relative w-full order-2 lg:order-1">
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] w-full flex items-start justify-center overflow-hidden pt-4 sm:pt-6 lg:pt-8">
              <div className="w-full h-full relative flex items-center justify-center">
                  <TaiwanMap 
                    ref={taiwanMapRef}
                    showAnimations={true}
                    highlightCounties={['台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市']}
                    onCountyClick={(countyId) => {
                      console.log('點擊縣市:', countyId);
                    }}
                  />
              
                {/* 學校標記 - 使用 100x100 網格系統 */}
                {mockSchoolData.map((school) => {
                  const position = getMarkerPosition(school.id);
                  return (
                    <div
                      key={school.id}
                      id={`school-marker-${school.id}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                      }}
                      onClick={() => setSelectedSchool(school)}
                    >
                    {/* 閃爍的紅點 */}
                    <div className="relative group">
                      <div className={`w-6 h-6 rounded-full shadow-xl ${
                        school.status === 'urgent' 
                          ? 'bg-red-500 animate-pulse shadow-red-500/70' 
                          : 'bg-orange-500 animate-pulse shadow-orange-500/70'
                      }`}></div>
                      <div className={`absolute inset-0 w-6 h-6 rounded-full animate-ping opacity-75 ${
                        school.status === 'urgent' ? 'bg-red-500' : 'bg-orange-500'
                      }`}></div>
                      {/* 外圈光暈 */}
                      <div className={`absolute inset-0 w-12 h-12 -translate-x-3 -translate-y-3 rounded-full animate-pulse ${
                        school.status === 'urgent' ? 'bg-red-500/30' : 'bg-orange-500/30'
                      }`}></div>
                      {/* 內圈光暈 */}
                      <div className={`absolute inset-0 w-8 h-8 -translate-x-1 -translate-y-1 rounded-full animate-pulse ${
                        school.status === 'urgent' ? 'bg-red-500/50' : 'bg-orange-500/50'
                      }`}></div>
                    </div>
                    
                    {/* 學校名稱標籤 */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          school.status === 'urgent' ? 'bg-red-500' : 'bg-orange-500'
                        }`}></div>
                        <span>{school.name}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {school.students} 位學生
                      </div>
                    </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>

          {/* 右側：統計數據和學校資訊 */}
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
            {/* 統計數據 */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/50 shadow-2xl">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">{mockSchoolData.length}</div>
                <div className="text-white text-xs sm:text-sm font-semibold drop-shadow-md">需要幫助的學校</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/50 shadow-2xl">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">15</div>
                <div className="text-white text-xs sm:text-sm font-semibold drop-shadow-md">已配對成功</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/50 shadow-2xl">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
                  {mockSchoolData.reduce((sum, school) => sum + school.students, 0)}
                </div>
                <div className="text-white text-xs sm:text-sm font-semibold drop-shadow-md">受益學生</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/50 shadow-2xl">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">98%</div>
                <div className="text-white text-xs sm:text-sm font-semibold drop-shadow-md">配對成功率</div>
              </div>
            </div>

            {/* 選中的學校資訊 */}
            {selectedSchool && (
              <motion.div 
                className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-lg">{selectedSchool.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm font-semibold drop-shadow-md">學生人數：</span>
                    <span className="text-white font-bold drop-shadow-md">{selectedSchool.students} 人</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm font-semibold drop-shadow-md">需求狀態：</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedSchool.status === 'urgent' 
                        ? 'bg-red-500/20 text-red-300' 
                        : 'bg-orange-500/20 text-orange-300'
                    }`}>
                      {selectedSchool.status === 'urgent' ? '緊急' : '一般'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-white text-sm font-semibold drop-shadow-md">需求項目：</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSchool.needs.map((need, index) => (
                        <span 
                          key={index}
                          className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  onClick={() => setSelectedSchool(null)}
                >
                  查看詳情
                </button>
            </motion.div>
            )}

            {/* 特色說明 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-lg">我們的特色</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold drop-shadow-md">精準配對</div>
                    <div className="text-white text-sm font-medium drop-shadow-md">AI 演算法確保資源與需求完美匹配</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold drop-shadow-md">即時追蹤</div>
                    <div className="text-white text-sm font-medium drop-shadow-md">全程透明化，讓您了解資源使用狀況</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold drop-shadow-md">社群支持</div>
                    <div className="text-white text-sm font-medium drop-shadow-md">建立企業與學校的長期合作關係</div>
                  </div>
                </div>
              </div>
          </div>
          
            {/* 行動呼籲 */}
            <div className="pt-6">
              <motion.button
                onClick={handleStartMatching}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                開始配對 →
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;