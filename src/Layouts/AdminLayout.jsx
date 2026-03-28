


import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
 import {
  LuLayoutDashboard,
  LuUsers,
  LuSettings,
  LuBookOpen,
  LuMenu,
  LuX,
  LuUserCog,
  LuChartBar,
  LuBell,
  LuCircleHelp,
  LuFileText,
  LuShield
} from "react-icons/lu";

const sidebarWidth = "280px";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const {user}=useSelector((state)=>state.auth)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

const navLinks = [
    { path: "/admin", label: "Dashboard", icon: <LuLayoutDashboard /> },
    { path: "/admin/users", label: "User Management", icon: <LuUsers /> },
    { path: "/admin/tuitions", label: "Tuition Management", icon: <LuBookOpen /> },
    { path: "/admin/reports", label: "Reports", icon: <LuFileText /> },]

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text-primary)]">


      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen flex-col border-r border-[var(--border)] bg-[var(--card-bg)]"
        style={{ width: sidebarWidth }}
      >
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold">Student Dashboard</h2>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
                    ${
                      isActive
                        ? "bg-[var(--primary)] text-white shadow"
                        : "hover:bg-[var(--hover-bg)]"
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 bg-[var(--bg)] p-3 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
              JD
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-[var(--text-secondary)]">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>

   
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed left-0 top-0 h-screen w-[85%] bg-[var(--card-bg)] z-50 flex flex-col border-r border-[var(--border)]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
            >
              <div className="p-6 border-b border-[var(--border)] flex justify-between">
                <h2 className="text-lg font-bold">Student Dashboard</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <LuX className="text-2xl" />
                </button>
              </div>

              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-lg ${
                            isActive
                              ? "bg-[var(--primary)] text-white"
                              : "hover:bg-[var(--hover-bg)]"
                          }`
                        }
                      >
                        {link.icon}
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    
      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: !isMobile ? sidebarWidth : 0 }}
      >

        <header className="sticky top-0 z-20 flex items-center gap-4 p-4 bg-[var(--bg)] border-b border-[var(--border)]">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <LuMenu className="text-2xl" />
          </button>
          <h1 className="font-semibold text-lg">
            {navLinks.find(l => l.path === location.pathname)?.label || "Dashboard"}
          </h1>
        </header>

    
        <main className="flex-1 p-6">
          <Outlet />
        </main>

     
      </div>
    </div>
  );
};







export default AdminLayout