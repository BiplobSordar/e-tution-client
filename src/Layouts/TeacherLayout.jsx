// src/Layouts/TeacherLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const TeacherLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r">
        <h2>Teacher Panel</h2>
        <ul>
          <li><NavLink to="/teacher">Dashboard</NavLink></li>
          <li><NavLink to="/teacher/t1">T1</NavLink></li>
          <li><NavLink to="/teacher/t2">T2</NavLink></li>
        </ul>
      </aside>

      <main className="flex-1 p-4">
        <Outlet /> {/* nested route render হবে */}
      </main>
    </div>
  );
};

export default TeacherLayout;
