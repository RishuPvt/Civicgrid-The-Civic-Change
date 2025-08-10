// FILE: src/App.tsx
import { Routes, Route } from 'react-router-dom';

// Layouts & Route Guards
import PublicLayout from './components/Layout/PublicLayout.tsx';
import AppLayout from './components/Layout/Layout.tsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.tsx';

// Public Pages
import LandingPage from './pages/Landing.tsx';
import LoginPage from './pages/Login.tsx'; // Keep consistent path
import RegisterPage from './pages/Register.tsx';
import LeaderboardPage from './pages/Leaderboard.tsx';
import AboutUsPage from './pages/AboutUsPage.tsx';

// Protected Pages
import DashboardPage from './pages/Dashboard.tsx';
import SubmitReportPage from './pages/SubmitReport.tsx';
import RewardsPage from './pages/Rewards.tsx';
import MyContributionsPage from './pages/MyContributions.tsx';
import MapPage from './pages/MapPage.tsx';
import TaskListPage from './pages/TaskListPage.tsx';
import CreateEventPage from './pages/CreateEventPage.tsx';

function App() {
  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes with Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/submit-report" element={<SubmitReportPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/my-contributions" element={<MyContributionsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
