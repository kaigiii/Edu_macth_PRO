import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { SchoolNeed } from '../types';

interface FormData {
  title: string;
  category: string;
  studentCount: number;
  location: string;
  description: string;
}

const CreateNeedPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const navigate = useNavigate();
  const [isShaking, setIsShaking] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // 構造請求資料
      const newNeed: SchoolNeed = {
        id: `need-${Date.now()}`, // 生成唯一 ID
        schoolName: "測試學校", // 模擬學校名稱
        title: data.title,
        description: data.description || "",
        category: data.category,
        location: data.location,
        studentCount: data.studentCount,
        imageUrl: "https://images.unsplash.com/photo-1517420532572-4b6a6c57f2f4?q=80&w=1287", // 預設圖片
        urgency: "medium", // 預設緊急程度
        sdgs: [4] // 預設 SDG 目標
      };

      // 發送 POST 請求到 Mock API
      const response = await fetch('http://localhost:3001/school_needs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNeed),
      });

      if (response.ok) {
        toast.success('需求已成功提交！');
        navigate('/dashboard/school'); // 跳轉回儀表板
      } else {
        throw new Error('提交失敗');
      }
    } catch (error) {
      console.error('提交需求時發生錯誤:', error);
      toast.error('提交失敗，請稍後再試');
    }
  };

  // 表單驗證失敗時的搖動動畫
  const handleFormError = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.h1 
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        刊登新的資源需求
      </motion.h1>
      
      <motion.form 
        onSubmit={handleSubmit(onSubmit, handleFormError)} 
        className="space-y-6"
        animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* 需求標題 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            需求標題 *
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "標題為必填項" })}
            className={`w-full p-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue ${
              errors.title 
                ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-brand-blue'
            }`}
            placeholder="請輸入需求標題"
          />
          {errors.title && (
            <motion.span 
              className="text-red-500 text-sm flex items-center mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.title.message}
            </motion.span>
          )}
        </motion.div>

        {/* 需求分類 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            需求分類 *
          </label>
          <select
            id="category"
            {...register("category", { required: "請選擇需求分類" })}
            className={`w-full p-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue ${
              errors.category 
                ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-brand-blue'
            }`}
          >
            <option value="">請選擇分類</option>
            <option value="硬體設備">硬體設備</option>
            <option value="師資/技能">師資/技能</option>
            <option value="體育器材">體育器材</option>
            <option value="書籍教材">書籍教材</option>
            <option value="其他">其他</option>
          </select>
          {errors.category && (
            <motion.span 
              className="text-red-500 text-sm flex items-center mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.category.message}
            </motion.span>
          )}
        </motion.div>

        {/* 受惠學生數 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="studentCount" className="block text-sm font-medium text-gray-700 mb-2">
            受惠學生數 *
          </label>
          <input
            type="number"
            id="studentCount"
            {...register("studentCount", { 
              required: "受惠學生數為必填項",
              min: { value: 1, message: "受惠學生數至少為1人" }
            })}
            className={`w-full p-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue ${
              errors.studentCount 
                ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-brand-blue'
            }`}
            placeholder="請輸入受惠學生數"
          />
          {errors.studentCount && (
            <motion.span 
              className="text-red-500 text-sm flex items-center mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.studentCount.message}
            </motion.span>
          )}
        </motion.div>

        {/* 學校地點 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            學校地點 *
          </label>
          <input
            type="text"
            id="location"
            {...register("location", { required: "學校地點為必填項" })}
            className={`w-full p-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue ${
              errors.location 
                ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-brand-blue'
            }`}
            placeholder="例如：花蓮縣、南投縣、台東縣"
          />
          {errors.location && (
            <motion.span 
              className="text-red-500 text-sm flex items-center mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.location.message}
            </motion.span>
          )}
        </motion.div>

        {/* 詳細說明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            詳細說明
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all duration-200 resize-none"
            placeholder="請詳細描述您的需求，包括具體用途、期望效果等..."
          />
        </motion.div>

        {/* 提交按鈕 */}
        <motion.div 
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-all duration-200 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-brand-blue text-white hover:bg-brand-blue-dark hover:shadow-lg'
            }`}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>提交中...</span>
              </div>
            ) : (
              '提交需求'
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default CreateNeedPage;
