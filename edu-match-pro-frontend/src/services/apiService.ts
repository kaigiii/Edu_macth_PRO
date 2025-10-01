/**
 * API 服務類
 * 支持前後端連結，自動降級到本地數據
 */

import { currentConfig, createApiUrl, checkApiHealth } from '../config/api';
import type { 
  SchoolNeed, 
  CompanyDashboardStats, 
  SchoolDashboardStats, 
  RecentProject, 
  ImpactStory, 
  CompanyDonation, 
  RecentActivity 
} from '../types';

class ApiService {
  private apiAvailable: boolean | null = null;
  private fallbackData: any = {};

  constructor() {
    this.initializeFallbackData();
  }

  // 初始化備用數據
  private async initializeFallbackData() {
    try {
      const staticData = await import('../data/staticData');
      this.fallbackData = {
        schoolNeeds: staticData.schoolNeeds,
        companyDashboardStats: staticData.companyDashboardStats,
        schoolDashboardStats: staticData.schoolDashboardStats,
        recentProjects: staticData.recentProjects,
        impactStories: staticData.impactStories,
        myNeeds: staticData.myNeeds,
        companyDonations: staticData.companyDonations,
        recentActivity: staticData.recentActivity,
      };
    } catch (error) {
      console.error('Failed to load fallback data:', error);
    }
  }

  // 檢查 API 可用性
  private async isApiAvailable(): Promise<boolean> {
    if (this.apiAvailable !== null) {
      return this.apiAvailable;
    }

    if (!currentConfig.useLocalFallback) {
      this.apiAvailable = false;
      return false;
    }

    try {
      this.apiAvailable = await checkApiHealth();
      return this.apiAvailable;
    } catch (error) {
      console.warn('API not available, using local data:', error);
      this.apiAvailable = false;
      return false;
    }
  }

  // 通用請求方法
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const isApiReady = await this.isApiAvailable();
    
    if (isApiReady) {
      try {
        const response = await fetch(createApiUrl(endpoint), {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.warn(`API request failed for ${endpoint}, using fallback:`, error);
        // 如果 API 失敗且允許降級，使用本地數據
        if (currentConfig.useLocalFallback) {
          return this.getFallbackData<T>(endpoint);
        }
        throw error;
      }
    } else {
      // 直接使用本地數據
      return this.getFallbackData<T>(endpoint);
    }
  }

  // 獲取備用數據
  private getFallbackData<T>(endpoint: string): T {
    console.log('ApiService: getFallbackData called for endpoint:', endpoint);
    console.log('ApiService: fallbackData keys:', Object.keys(this.fallbackData));
    
    const fallbackMap: Record<string, string> = {
      '/school_needs': 'schoolNeeds',
      '/company_dashboard_stats': 'companyDashboardStats',
      '/school_dashboard_stats': 'schoolDashboardStats',
      '/ai_recommended_needs': 'schoolNeeds', // 使用相同的數據
      '/recent_projects': 'recentProjects',
      '/impact_stories': 'impactStories',
      '/my_needs': 'myNeeds',
      '/company_donations': 'companyDonations',
      '/recent_activity': 'recentActivity',
    };

    const dataKey = fallbackMap[endpoint];
    console.log('ApiService: dataKey for endpoint:', dataKey);
    
    if (dataKey && this.fallbackData[dataKey]) {
      console.log('ApiService: returning fallback data for', dataKey, 'length:', this.fallbackData[dataKey]?.length);
      return this.fallbackData[dataKey];
    }

    console.error('ApiService: No fallback data available for', endpoint);
    throw new Error(`No fallback data available for ${endpoint}`);
  }

  // 學校需求相關 API
  async getSchoolNeeds(): Promise<SchoolNeed[]> {
    return this.request<SchoolNeed[]>('/school_needs');
  }

  async getSchoolNeedById(id: string): Promise<SchoolNeed> {
    return this.request<SchoolNeed>(`/school_needs/${id}`);
  }

  async createSchoolNeed(need: Omit<SchoolNeed, 'id'>): Promise<SchoolNeed> {
    return this.request<SchoolNeed>('/school_needs', {
      method: 'POST',
      body: JSON.stringify(need),
    });
  }

  async updateSchoolNeed(id: string, need: Partial<SchoolNeed>): Promise<SchoolNeed> {
    return this.request<SchoolNeed>(`/school_needs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(need),
    });
  }

  async deleteSchoolNeed(id: string): Promise<void> {
    return this.request<void>(`/school_needs/${id}`, {
      method: 'DELETE',
    });
  }

  // 儀表板統計 API
  async getCompanyDashboardStats(): Promise<CompanyDashboardStats> {
    return this.request<CompanyDashboardStats>('/company_dashboard_stats');
  }

  async getSchoolDashboardStats(): Promise<SchoolDashboardStats> {
    return this.request<SchoolDashboardStats>('/school_dashboard_stats');
  }

  // 推薦和項目 API
  async getRecommendedNeeds(): Promise<SchoolNeed[]> {
    return this.request<SchoolNeed[]>('/ai_recommended_needs');
  }

  async getRecentProjects(): Promise<RecentProject[]> {
    return this.request<RecentProject[]>('/recent_projects');
  }

  // 影響力故事 API
  async getImpactStories(): Promise<ImpactStory[]> {
    console.log('ApiService: getImpactStories called');
    const result = await this.request<ImpactStory[]>('/impact_stories');
    console.log('ApiService: getImpactStories result:', result);
    return result;
  }

  // 用戶相關 API
  async getMyNeeds(): Promise<SchoolNeed[]> {
    return this.request<SchoolNeed[]>('/my_needs');
  }

  async getCompanyDonations(): Promise<CompanyDonation[]> {
    return this.request<CompanyDonation[]>('/company_donations');
  }

  async getRecentActivity(): Promise<RecentActivity[]> {
    return this.request<RecentActivity[]>('/recent_activity');
  }

  // 認證相關 API
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any): Promise<{ token: string; user: any }> {
    return this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>('/auth/logout', {
      method: 'POST',
    });
  }

  async getProfile(): Promise<any> {
    return this.request<any>('/auth/profile');
  }
}

// 導出單例實例
export const apiService = new ApiService();
export default apiService;
