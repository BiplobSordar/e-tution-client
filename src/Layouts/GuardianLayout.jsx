// src/Layouts/GuardianLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const GuardianLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r">
        <h2>Guardian Panel</h2>
        <ul>
          <li><NavLink to="/guardian">Dashboard</NavLink></li>
          <li><NavLink to="/guardian/g1">G1</NavLink></li>
          <li><NavLink to="/guardian/g2">G2</NavLink></li>
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default GuardianLayout;
