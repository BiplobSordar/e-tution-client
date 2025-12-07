// src/Layouts/StudentLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r">
        <h2>Student Panel</h2>
        <ul>
          <li><NavLink to="/student">Dashboard</NavLink></li>
          <li><NavLink to="/student/s1">S1</NavLink></li>
          <li><NavLink to="/student/s2">S2</NavLink></li>
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
