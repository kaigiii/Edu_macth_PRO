import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ProfilePage = () => {
  const { userRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userRole === 'school' ? '王老師' : '陳經理',
    email: userRole === 'school' ? 'wang.teacher@school.edu.tw' : 'chen.manager@company.com',
    phone: userRole === 'school' ? '0912-345-678' : '02-2345-6789',
    organization: userRole === 'school' ? '花蓮縣希望國小' : '台積電股份有限公司',
    position: userRole === 'school' ? '資訊組長' : '企業社會責任部經理',
    address: userRole === 'school' ? '花蓮縣花蓮市中山路123號' : '新竹市東區力行六路8號',
    bio: userRole === 'school' 
      ? '致力於推動偏鄉教育數位化，希望透過科技讓每個孩子都能享有優質的教育資源。'
      : '專注於企業社會責任與永續發展，致力於創造企業與社會的雙贏局面。'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // 這裡可以添加保存到後端的邏輯
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // 重置表單數據
    setFormData({
      name: userRole === 'school' ? '王老師' : '陳經理',
      email: userRole === 'school' ? 'wang.teacher@school.edu.tw' : 'chen.manager@company.com',
      phone: userRole === 'school' ? '0912-345-678' : '02-2345-6789',
      organization: userRole === 'school' ? '花蓮縣希望國小' : '台積電股份有限公司',
      position: userRole === 'school' ? '資訊組長' : '企業社會責任部經理',
      address: userRole === 'school' ? '花蓮縣花蓮市中山路123號' : '新竹市東區力行六路8號',
      bio: userRole === 'school' 
        ? '致力於推動偏鄉教育數位化，希望透過科技讓每個孩子都能享有優質的教育資源。'
        : '專注於企業社會責任與永續發展，致力於創造企業與社會的雙贏局面。'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* 頭部區域 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <UserIcon className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{formData.name}</h1>
                <p className="text-blue-100 text-lg">{formData.position}</p>
                <p className="text-blue-200">{formData.organization}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
            >
              <PencilIcon className="w-5 h-5" />
              <span>{isEditing ? '取消編輯' : '編輯資料'}</span>
            </button>
          </div>
        </div>

        {/* 內容區域 */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 基本資訊 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">基本資訊</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                      <p className="text-gray-900">{formData.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">電話</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="w-5 h-5 text-gray-400" />
                      <p className="text-gray-900">{formData.phone}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">地址</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="w-5 h-5 text-gray-400" />
                      <p className="text-gray-900">{formData.address}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* 組織資訊 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">組織資訊</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">組織名稱</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      {userRole === 'school' ? (
                        <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                      ) : (
                        <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
                      )}
                      <p className="text-gray-900">{formData.organization}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">職位</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg">{formData.position}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">個人簡介</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* 編輯按鈕 */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex justify-end space-x-4"
            >
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
                <span>取消</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CheckIcon className="w-5 h-5" />
                <span>儲存</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
