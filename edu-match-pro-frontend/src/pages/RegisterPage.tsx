import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  AcademicCapIcon, 
  BuildingOffice2Icon, 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon
} from '@heroicons/react/24/outline';

const RegisterPage = () => {
  const [userType, setUserType] = useState<'school' | 'company' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // School fields
    schoolName: '',
    contactPerson: '',
    position: '',
    email: '',
    password: '',
    // Company fields
    companyName: '',
    taxId: '',
    contactPersonCompany: '',
    positionCompany: '',
    emailCompany: '',
    passwordCompany: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { userType, formData });
  };

  const schoolOptions = [
    '台北市立建國高級中學',
    '台北市立第一女子高級中學',
    '新北市立板橋高級中學',
    '桃園市立武陵高級中學',
    '台中市立台中第一高級中學',
    '台南市立台南第一高級中學',
    '高雄市立高雄高級中學',
    '其他學校'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
          <div className="text-center text-white p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-6">🎓</div>
              <h2 className="text-3xl font-bold mb-4">每一次援手，都在改變一個未來</h2>
              <p className="text-xl opacity-90">
                加入我們，讓教育資源的分配更加公平，讓每個孩子都有機會發光發熱
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and Welcome */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-blue-600 mb-2">智匯偏鄉</div>
            <h1 className="text-2xl font-bold text-gray-900">歡迎加入智匯偏鄉</h1>
            <p className="text-gray-600 mt-2">請選擇您的身份並完成註冊</p>
          </div>

          {/* User Type Selection */}
          {!userType && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => setUserType('school')}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
              >
                <div className="flex items-center">
                  <AcademicCapIcon className="w-8 h-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">我是學校</h3>
                    <p className="text-gray-600">刊登教育資源需求，尋找企業支援</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setUserType('company')}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 text-left"
              >
                <div className="flex items-center">
                  <BuildingOffice2Icon className="w-8 h-8 text-orange-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">我是企業</h3>
                    <p className="text-gray-600">實踐 ESG 目標，支援偏鄉教育</p>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {/* Registration Form */}
          {userType && (
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setUserType(null)}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                ← 重新選擇身份
              </button>

              {userType === 'school' ? (
                <>
                  {/* School Form */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      學校名稱 *
                    </label>
                    <select
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">請選擇學校</option>
                      {schoolOptions.map((school, index) => (
                        <option key={index} value={school}>{school}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      聯絡人姓名 *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="請輸入聯絡人姓名"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      職稱 *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="例如：教務主任、校長"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      學校電子郵件 *
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="name@school.edu.tw"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      密碼 *
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="請設定密碼"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-400" /> : <EyeIcon className="w-5 h-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Company Form */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      公司名稱 *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="請輸入公司名稱"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      統一編號 *
                    </label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="請輸入統一編號"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      聯絡人姓名 *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="contactPersonCompany"
                        value={formData.contactPersonCompany}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="請輸入聯絡人姓名"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      職稱 *
                    </label>
                    <input
                      type="text"
                      name="positionCompany"
                      value={formData.positionCompany}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="例如：CSR 經理、永續長"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      公司電子郵件 *
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="emailCompany"
                        value={formData.emailCompany}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      密碼 *
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="passwordCompany"
                        value={formData.passwordCompany}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="請設定密碼"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-400" /> : <EyeIcon className="w-5 h-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 ${
                  userType === 'school' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                完成註冊
              </motion.button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  已經有帳號了？{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                    前往登入
                  </Link>
                </p>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
