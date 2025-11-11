import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Import Layouts and Protection
import AppLayout from "./components/Layout/Layout.tsx";
import PublicLayout from "./components/Layout/PublicLayout.tsx";
import LoadingSpinner from "./components/Common/LoadingSpinner.tsx";
import TaskDetailPage from "./pages/TaskDetailPage.tsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/Landing.tsx"));
const LoginPage = lazy(() => import("./pages/Login.tsx"));
const RegisterPage = lazy(() => import("./pages/Register.tsx"));
const LeaderboardPage = lazy(() => import("./pages/Leaderboard.tsx"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage.tsx"));
const DashboardPage = lazy(() => import("./pages/Dashboard.tsx"));
const SubmitReportPage = lazy(() => import("./pages/SubmitReport.tsx"));
const RewardsPage = lazy(() => import("./pages/Rewards.tsx"));
const MyContributionsPage = lazy(() => import("./pages/MyContributions.tsx"));
const MapPage = lazy(() => import("./pages/MapPage.tsx"));
const TaskListPage = lazy(() => import("./pages/TaskListPage.tsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.tsx"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ToastContainer position="top-right" autoClose={3000} />
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

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/submit-report" element={<SubmitReportPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/my-contributions" element={<MyContributionsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/task/:taskId" element={<TaskDetailPage />} />{" "}
          {/* Dynamic route */}
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
