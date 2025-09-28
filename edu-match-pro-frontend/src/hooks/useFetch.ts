import { useState, useEffect } from 'react';

// 檢查是否為開發環境
const isDevelopment = import.meta.env.DEV;

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        
        if (isDevelopment) {
          // 開發環境：使用原來的 fetch 方式
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          result = await response.json();
        } else {
          // 生產環境：使用靜態數據
          const { fetchSchoolNeeds, fetchCompanyDashboardStats, fetchSchoolDashboardStats, 
                  fetchRecommendedNeeds, fetchRecentProjects, fetchImpactStories, 
                  fetchMyNeeds, fetchCompanyDonations, fetchRecentActivity } = await import('../utils/api');
          
          if (url.includes('/school_needs')) {
            result = await fetchSchoolNeeds();
          } else if (url.includes('/company_dashboard_stats')) {
            result = await fetchCompanyDashboardStats();
          } else if (url.includes('/school_dashboard_stats')) {
            result = await fetchSchoolDashboardStats();
          } else if (url.includes('/ai_recommended_needs')) {
            result = await fetchRecommendedNeeds();
          } else if (url.includes('/recent_projects')) {
            result = await fetchRecentProjects();
          } else if (url.includes('/impact_stories')) {
            result = await fetchImpactStories();
          } else if (url.includes('/my_needs')) {
            result = await fetchMyNeeds();
          } else if (url.includes('/company_donations')) {
            result = await fetchCompanyDonations();
          } else if (url.includes('/recent_activity')) {
            result = await fetchRecentActivity();
          } else {
            throw new Error(`Unknown API endpoint: ${url}`);
          }
        }
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error, setData };
}

export default useFetch;
