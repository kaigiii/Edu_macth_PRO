/**
 * 增強的 API Hook
 * 支持前後端連結，自動降級到本地數據
 */

import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';

// API 端點映射
const API_ENDPOINT_MAP: Record<string, () => Promise<any>> = {
  '/school_needs': () => apiService.getSchoolNeeds(),
  '/company_dashboard_stats': () => apiService.getCompanyDashboardStats(),
  '/school_dashboard_stats': () => apiService.getSchoolDashboardStats(),
  '/ai_recommended_needs': () => apiService.getRecommendedNeeds(),
  '/recent_projects': () => apiService.getRecentProjects(),
  '/impact_stories': () => apiService.getImpactStories(),
  '/my_needs': () => apiService.getMyNeeds(),
  '/company_donations': () => apiService.getCompanyDonations(),
  '/recent_activity': () => apiService.getRecentActivity(),
};

// 解析 URL 獲取端點
const getEndpointFromUrl = (url: string): string => {
  // 移除基礎 URL，只保留端點
  const baseUrl = 'http://localhost:3001';
  if (url.startsWith(baseUrl)) {
    return url.replace(baseUrl, '');
  }
  return url;
};

// 檢查是否為單個資源請求（包含 ID）
const isSingleResourceRequest = (url: string): boolean => {
  // 只有當 URL 包含 ID 模式（如 /school_needs/123）時才是單個資源請求
  return /\/([^\/]+)\/([^\/]+)$/.test(url) && url.includes('/school_needs/');
};

// 獲取單個資源的 ID
const getResourceId = (url: string): string | null => {
  // 對於 URL 如 http://localhost:3001/school_needs/need-001
  // 提取最後一個路徑段作為 ID
  const match = url.match(/\/([^\/]+)$/);
  console.log('getResourceId: url=', url, 'match=', match);
  return match ? match[1] : null;
};

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setIsUsingFallback(false);

      const endpoint = getEndpointFromUrl(url);
      
      // 檢查是否為單個資源請求
      if (isSingleResourceRequest(url)) {
        const resourceId = getResourceId(url);
        if (resourceId && endpoint.startsWith('/school_needs')) {
          const result = await apiService.getSchoolNeedById(resourceId);
          setData(result as T);
        } else {
          throw new Error(`Unsupported single resource endpoint: ${endpoint}`);
        }
      } else {
        // 使用端點映射獲取數據
        const apiFunction = API_ENDPOINT_MAP[endpoint];
        if (!apiFunction) {
          throw new Error(`Unknown API endpoint: ${endpoint}`);
        }
        
        const result = await apiFunction();
        setData(result);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      console.warn('API request failed:', error);
      
      // 如果使用備用數據，標記狀態
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 手動重新獲取數據
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // 更新數據（用於樂觀更新）
  const updateData = useCallback((newData: T | ((prev: T | null) => T)) => {
    setData(newData);
  }, []);

  return {
    data,
    isLoading,
    error,
    isUsingFallback,
    refetch,
    updateData,
  };
}

// 導出舊的 useFetch 以保持向後兼容
export { useApi as useFetch };
export default useApi;
