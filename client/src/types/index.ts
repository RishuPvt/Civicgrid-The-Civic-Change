export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  civicScore: number;
  rank: number;
  badges: string[];
}

export interface Report {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  issueType: string;
  status: 'pending' | 'verified' | 'rejected';
  pointsAwarded: number;
  createdAt: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
  category: string;
  claimed?: boolean;
}

export interface ScoreBreakdown {
  cleanliness: number;
  reports: number;
  participation: number;
  total: number;
}