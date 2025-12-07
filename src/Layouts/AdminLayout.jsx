// src/Layouts/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r">
        <h2>Admin Panel</h2>
        <ul>
          <li><NavLink to="/admin">Dashboard</NavLink></li>
          <li><NavLink to="/admin/a1">A1</NavLink></li>
          <li><NavLink to="/admin/a2">A2</NavLink></li>
        </ul>
      </aside>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
