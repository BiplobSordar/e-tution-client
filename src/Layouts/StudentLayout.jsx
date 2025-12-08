import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuMenu, LuX, LuLayoutDashboard, LuBookOpen, LuUser } from "react-icons/lu";

const navLinks = [
  { path: "/student", label: "Dashboard", icon: <LuLayoutDashboard /> },
  { path: "/student/s1", label: "Semester 1", icon: <LuBookOpen /> },
  { path: "/student/s2", label: "Semester 2", icon: <LuBookOpen /> },
  { path: "/student/profile", label: "Profile", icon: <LuUser /> },
];

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const sidebarWidth = "280px";


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);


  useEffect(() => {
    document.body.style.overflow = isMobile && sidebarOpen ? "hidden" : "unset";
  }, [sidebarOpen, isMobile]);

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
     
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen border-r border-[var(--border)] bg-[var(--card-bg)] shadow-xl z-30"
        style={{ width: sidebarWidth }}
      >
      
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold">Student Panel</h2>
        </div>

    
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--primary)] text-white shadow-lg"
                        : "hover:bg-[var(--hover-bg)]"
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>


        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg)]">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-[var(--text-secondary)]">Student</p>
            </div>
          </div>
        </div>
      </aside>

    
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-screen flex flex-col border-r border-[var(--border)] bg-[var(--card-bg)] shadow-2xl z-50"
              style={{ width: "85%", maxWidth: sidebarWidth }}
            >
             
              <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
                <h2 className="text-xl font-bold">Student Panel</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <LuX className="text-2xl text-[var(--text-primary)]" />
                </button>
              </div>

             
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                            isActive
                              ? "bg-[var(--primary)] text-white shadow-lg"
                              : "hover:bg-[var(--hover-bg)]"
                          }`
                        }
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span>{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

     
              <div className="p-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-[var(--text-secondary)]">Student</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>


      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: !isMobile ? sidebarWidth : 0 }}
      >
      
        <header className="sticky top-0 z-20 p-4 bg-[var(--bg)] border-b border-[var(--border)] flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-[var(--text-primary)] text-2xl"
          >
            <LuMenu />
          </button>
          <h1 className="text-lg font-semibold">
            {navLinks.find((link) => link.path === location.pathname)?.label ||
              "Dashboard"}
          </h1>
        </header>

       
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>

       
        <footer className="p-4 border-t border-[var(--border)] bg-[var(--card-bg)]">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2024 Student Portal. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StudentLayout;
