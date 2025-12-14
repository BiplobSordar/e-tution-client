import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


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
import T1 from "./pages/teacher/T1";
import T2 from "./pages/teacher/T2";


import AdminDashboard from "./pages/admin/AdminDashboard";
import A1 from "./pages/admin/A1";
import A2 from "./pages/admin/A2";


import StudentDashboard from "./pages/student/StudendDashboard";
import S1 from "./pages/student/S1";
import S2 from "./pages/student/S2";


import GuardianDashboard from "./pages/guardian/GuradianDashboard";
import G1 from "./pages/guardian/G1";
import G2 from "./pages/guardian/G2";
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



const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" replace />;
  return children;
};


const PublicRoute = ({ children }) => {
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
      { path: "login", element: <PublicRoute><Login /></PublicRoute> },
      { path: "register", element: <PublicRoute><Register /></PublicRoute> },
      { path: "*", element: <NotFound /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "tutions/:id", element: <SingleTuition/>},
      { path: "public/:userId", element: <PublicProfilePage/>},
      { path: "profile", element: <ProtectedRoute allowedRoles={['teacher', 'student', 'admin', 'guardian']}><ProfilePage /></ProtectedRoute> },


      {
        path: "teacher/*",
        element: (
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <TeacherDashboard /> },

        ],
      },


      {
        path: "admin/*",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "a1", element: <A1 /> },
          { path: "a2", element: <A2 /> },
        ],
      },


      {
        path: "student/*",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentLayout />
          </ProtectedRoute>
        ),
        children: [
          // Default route when /student is accessed
          { index: true, element: <StudentDashboard /> },

          // Other nested routes
          { path: "my-tution", element: <MyTutions /> },
          { path: "post-tuition", element: <PostTution /> },
          { path: "applied-tutors", element: <AppliedTutors /> },
          { path: "payments", element: <Payments /> },
        ],
      },


      {
        path: "guardian/*",
        element: (
          <ProtectedRoute allowedRoles={["guardian"]}>
            <GuardianLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <GuardianDashboard /> },
          { path: "g1", element: <G1 /> },
          { path: "g2", element: <G2 /> },
        ],
      },
    ],
  },
]);
