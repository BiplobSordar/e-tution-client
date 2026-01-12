import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import TeacherLayout from "./Layouts/TeacherLayout";
import AdminLayout from "./Layouts/AdminLayout";
import StudentLayout from "./Layouts/StudentLayout";
import GuardianLayout from "./Layouts/GuardianLayout";

import Home from "./pages/Home";
import Tuitions from "./pages/Tuitions";
import Tutors from "./pages/Tutors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudendDashboard";
import GuardianDashboard from "./pages/guardian/GuradianDashboard";
import Unauthorized from "./pages/Unauthorized";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/Profile/Profile";
import Payments from "./pages/student/Payments";
import AppliedTutors from "./pages/student/AppliedTutors";
import PostTution from "./pages/student/PostTution";
import MyTutions from "./pages/student/MyTutions";
import SingleTuition from "./pages/SingleTuition";
import PublicProfilePage from "./pages/PublicProfilePage";
import TuitionApplicationPage from "./pages/ApplyTution";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import MyApplications from "./pages/teacher/MyApplications";
import OngoingTuitions from "./pages/teacher/OngoingTuitions";
import RevenueHistory from "./pages/teacher/RevenueHistory";
import UserManagement from "./pages/admin/UserManagement";
import TuitionManagement from "./pages/admin/TuitionManagement";
import ReportsAnalytics from "./pages/admin/ReportsAnalytics";
import EditTuition from "./pages/student/EditTuition";

// Create wrapper components that will use hooks when rendered
const ProtectedRouteWrapper = ({ children, allowedRoles }) => {
  const { useSelector } = require("react-redux");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" replace />;
  return children;
};

const PublicRouteWrapper = ({ children }) => {
  const { useSelector } = require("react-redux");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (isAuthenticated) return <Navigate to={`/${user?.role}`} replace />;
  return children;
};

const RootLayout = () => <MainLayout><Outlet /></MainLayout>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "tuitions", element: <Tuitions /> },
      { path: "tutors", element: <Tutors /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { 
        path: "login", 
        element: (
          <PublicRouteWrapper>
            <Login />
          </PublicRouteWrapper>
        ) 
      },
      { 
        path: "register", 
        element: (
          <PublicRouteWrapper>
            <Register />
          </PublicRouteWrapper>
        ) 
      },
      { path: "*", element: <NotFound /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "tutions/:id", element: <SingleTuition /> },
      { path: "public/:userId", element: <PublicProfilePage /> },
      { 
        path: "profile", 
        element: (
          <ProtectedRouteWrapper allowedRoles={['teacher', 'student', 'admin', 'guardian']}>
            <ProfilePage />
          </ProtectedRouteWrapper>
        ) 
      },
      { 
        path: "apply-tution/:tuitionId", 
        element: (
          <ProtectedRouteWrapper allowedRoles={['teacher']}>
            <TuitionApplicationPage />
          </ProtectedRouteWrapper>
        ) 
      },
      { 
        path: "payment-success", 
        element: (
          <ProtectedRouteWrapper allowedRoles={['student']}>
            <PaymentSuccess />
          </ProtectedRouteWrapper>
        ) 
      },
      { 
        path: "payment-cancle", 
        element: (
          <ProtectedRouteWrapper allowedRoles={['student']}>
            <PaymentCancel />
          </ProtectedRouteWrapper>
        ) 
      },
      {
        path: "teacher/*",
        element: (
          <ProtectedRouteWrapper allowedRoles={["teacher"]}>
            <TeacherLayout />
          </ProtectedRouteWrapper>
        ),
        children: [
          { index: true, element: <TeacherDashboard /> },
          { path: 'my-applications', element: <MyApplications /> },
          { path: 'my-tuitions', element: <OngoingTuitions /> },
          { path: 'payment-history', element: <RevenueHistory /> },
        ],
      },
      {
        path: "admin/*",
        element: (
          <ProtectedRouteWrapper allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRouteWrapper>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "users", element: <UserManagement /> },
          { path: "tuitions", element: <TuitionManagement /> },
          { path: "reports", element: <ReportsAnalytics /> }
        ],
      },
      {
        path: "student/*",
        element: (
          <ProtectedRouteWrapper allowedRoles={["student"]}>
            <StudentLayout />
          </ProtectedRouteWrapper>
        ),
        children: [
          { index: true, element: <StudentDashboard /> },
          { path: "my-tutions", element: <MyTutions /> },
          { path: "post-tuition", element: <PostTution /> },
          { path: "applied-tutors", element: <AppliedTutors /> },
          { path: "payments", element: <Payments /> },
          { path: "edit-tuition/:id", element: <EditTuition/> },
        ],
      },
      {
        path: "guardian/*",
        element: (
          <ProtectedRouteWrapper allowedRoles={["guardian"]}>
            <GuardianLayout />
          </ProtectedRouteWrapper>
        ),
        children: [
          { index: true, element: <GuardianDashboard /> },
        ],
      },
    ],
  },
]);