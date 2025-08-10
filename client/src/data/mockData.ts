import { User, Report, Reward } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  civicScore: 2450,
  rank: 3,
  badges: ['Early Adopter', 'Clean Streets Champion', 'Community Hero'],
};

export const leaderboardData: User[] = [
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    civicScore: 3120,
    rank: 1,
    badges: ['Top Contributor', 'Green Guardian', 'Community Leader'],
  },
  {
    id: '3',
    name: 'James Wilson',
    email: 'james@example.com',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    civicScore: 2890,
    rank: 2,
    badges: ['Volunteer Champion', 'Report Master'],
  },
  currentUser,
  {
    id: '4',
    name: 'Sarah Kim',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    civicScore: 2200,
    rank: 4,
    badges: ['Rising Star', 'Clean Commuter'],
  },
];

export const reportsData: Report[] = [
  {
    id: '1',
    userId: '1',
    title: 'Overflowing garbage bin',
    description: 'Large garbage bin overflowing near the park entrance, creating unsanitary conditions.',
    imageUrl: 'https://images.pexels.com/photos/4039921/pexels-photo-4039921.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: 'Central Park, New York, NY',
    },
    issueType: 'Garbage',
    status: 'verified',
    pointsAwarded: 50,
    createdAt: '2025-01-08T10:30:00Z',
  },
  {
    id: '2',
    userId: '1',
    title: 'Large pothole on main street',
    description: 'Deep pothole causing traffic issues and potential vehicle damage.',
    imageUrl: 'https://images.pexels.com/photos/3889868/pexels-photo-3889868.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1',
    location: {
      lat: 40.7580,
      lng: -73.9855,
      address: 'Broadway, New York, NY',
    },
    issueType: 'Pothole',
    status: 'pending',
    pointsAwarded: 0,
    createdAt: '2025-01-07T14:15:00Z',
  },
];

export const rewardsData: Reward[] = [
  {
    id: '1',
    title: 'City Coffee Shop Voucher',
    description: '₹200 voucher for local coffee shops',
    pointsRequired: 500,
    imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    category: 'Food & Beverage',
    claimed: true,
  },
  {
    id: '2',
    title: 'Public Transport Monthly Pass',
    description: 'Free monthly bus pass for eco-friendly commuting',
    pointsRequired: 1000,
    imageUrl: 'https://images.pexels.com/photos/919606/pexels-photo-919606.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    category: 'Transportation',
  },
  {
    id: '3',
    title: 'Tree Planting Kit',
    description: 'Complete kit with seeds, tools, and instructions',
    pointsRequired: 750,
    imageUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    category: 'Environment',
  },
  {
    id: '4',
    title: 'City Museum Family Pass',
    description: 'Annual family pass for city museums and cultural sites',
    pointsRequired: 1500,
    imageUrl: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    category: 'Culture & Education',
  },
];