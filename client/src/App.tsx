import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts and Protection
import AppLayout from './components/Layout/Layout.tsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.tsx';
import PublicLayout from './components/Layout/PublicLayout.tsx';
import LoadingSpinner from './components/Common/LoadingSpinner.tsx';
import TaskDetailPage from './pages/TaskDetailPage.tsx';

// Lazy-loaded pages
const LandingPage = lazy(() => import('./pages/Landing.tsx'));
const LoginPage = lazy(() => import('./pages/Login.tsx'));
const RegisterPage = lazy(() => import('./pages/Register.tsx'));
const LeaderboardPage = lazy(() => import('./pages/Leaderboard.tsx'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage.tsx'));
const DashboardPage = lazy(() => import('./pages/Dashboard.tsx'));
const SubmitReportPage = lazy(() => import('./pages/SubmitReport.tsx'));
const RewardsPage = lazy(() => import('./pages/Rewards.tsx'));
const MyContributionsPage = lazy(() => import('./pages/MyContributions.tsx'));
const MapPage = lazy(() => import('./pages/MapPage.tsx'));
const TaskListPage = lazy(() => import('./pages/TaskListPage.tsx'));
const CreateEventPage = lazy(() => import('./pages/CreateEventPage.tsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage.tsx'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Route>

        {/* Standalone Login/Register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/submit-report" element={<SubmitReportPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/my-contributions" element={<MyContributionsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/tasks" element={<TaskListPage />} />
            <Route path="/task/:taskId" element={<TaskDetailPage />} /> {/* Dynamic route */}
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;