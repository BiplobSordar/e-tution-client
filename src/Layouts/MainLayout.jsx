// components/Layout/MainLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors">
      <Navbar />
      <main className="flex-1">{<Outlet/>}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
