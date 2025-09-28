export interface SchoolNeed {
  id: string;
  schoolName: string;
  title: string;
  description: string;
  category: string;
  location: string;
  studentCount: number;
  imageUrl: string;
  urgency: 'high' | 'medium' | 'low';
  sdgs: number[];
}

export interface ImpactStory {
  id: string;
  title: string;
  schoolName: string;
  companyName: string;
  imageUrl: string;
  summary: string;
  storyDate: string;
  impact?: {
    studentsBenefited: number;
    equipmentDonated: string;
    duration: string;
  };
}

export interface CompanyDashboardStats {
  completedProjects: number;
  studentsHelped: number;
  volunteerHours: number;
  totalDonation: number;
  avgProjectDuration: number;
  successRate: number;
  sdgContributions: {
    [key: string]: number;
  };
}

export interface SchoolDashboardStats {
  totalNeeds: number;
  activeNeeds: number;
  completedNeeds: number;
  studentsBenefited: number;
  avgResponseTime: number;
  successRate: number;
}

export interface RecentProject {
  id: string;
  title: string;
  school: string;
  status: 'completed' | 'in_progress' | 'pending';
  progress: number;
  studentsBenefited: number;
  completionDate?: string;
}

export interface CompanyDonation {
  id: string;
  needId: string;
  needTitle: string;
  schoolName: string;
  donationDate: string;
  status: string;
  type: string;
  description: string;
}

export interface RecentActivity {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}
