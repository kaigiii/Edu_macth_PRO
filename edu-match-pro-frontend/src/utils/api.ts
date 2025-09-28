/**
 * API 工具函數
 * 在開發環境使用 localhost:3001，在生產環境使用靜態數據
 */

// 檢查是否為開發環境
const isDevelopment = import.meta.env.DEV;

// API 基礎 URL
const API_BASE_URL = isDevelopment ? 'http://localhost:3001' : '';

/**
 * 獲取學校需求數據
 */
export const fetchSchoolNeeds = async () => {
  if (isDevelopment) {
    // 開發環境：從 API 獲取數據
    const response = await fetch(`${API_BASE_URL}/school_needs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    // 生產環境：使用靜態數據
    return import('../data/staticData').then(module => module.schoolNeeds);
  }
};

/**
 * 獲取公司儀表板統計數據
 */
export const fetchCompanyDashboardStats = async () => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/company_dashboard_stats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    return import('../data/staticData').then(module => module.companyDashboardStats);
  }
};

/**
 * 獲取學校儀表板統計數據
 */
export const fetchSchoolDashboardStats = async () => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/school_dashboard_stats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    return import('../data/staticData').then(module => module.schoolDashboardStats);
  }
};

/**
 * 獲取推薦需求
 */
export const fetchRecommendedNeeds = async () => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/ai_recommended_needs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    return import('../data/staticData').then(module => module.recommendedNeeds);
  }
};

/**
 * 獲取最近項目
 */
export const fetchRecentProjects = async () => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/recent_projects`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    return import('../data/staticData').then(module => module.recentProjects);
  }
};

/**
 * 獲取影響力故事
 */
export const fetchImpactStories = async () => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/impact_stories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    return import('../data/staticData').then(module => module.impactStories);
  }
};

/**
 * 獲取我的需求
 */
export const fetchMyNeeds = async () => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/my_needs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    return import('../data/staticData').then(module => module.myNeeds);
  }
};

/**
 * 獲取公司捐贈記錄
 */
export const fetchCompanyDonations = async () => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/company_donations`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    return import('../data/staticData').then(module => module.companyDonations);
  }
};

/**
 * 獲取最近活動
 */
export const fetchRecentActivity = async () => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/recent_activity`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    return import('../data/staticData').then(module => module.recentActivity);
  }
};

/**
 * 創建新需求
 */
export const createNeed = async (needData: any) => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/school_needs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(needData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    // 生產環境：模擬成功響應
    return Promise.resolve({ id: `need-${Date.now()}`, ...needData });
  }
};

/**
 * 更新需求
 */
export const updateNeed = async (needId: string, needData: any) => {
  if (isDevelopment) {
    const response = await fetch(`${API_BASE_URL}/school_needs/${needId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(needData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } else {
    // 生產環境：模擬成功響應
    return Promise.resolve({ id: needId, ...needData });
  }
};
