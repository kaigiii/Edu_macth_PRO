export interface SchoolNeed {
  id: string;
  schoolName: string;
  title: string;
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
