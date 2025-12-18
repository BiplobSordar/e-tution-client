// import React, { useState, useEffect } from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSelector } from "react-redux";
// import {
//   LuLayoutDashboard,
//   LuUsers,
//   LuSettings,
//   LuBookOpen,
//   LuMenu,
//   LuX,
//   LuUserCog,
//   LuChartBar,
//   LuBell,
//   LuCircleHelp,
//   LuFileText,
//   LuShield
// } from "react-icons/lu";

// const sidebarWidth = "280px";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const location = useLocation();
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     if (isMobile) setSidebarOpen(false);
//   }, [location.pathname, isMobile]);

//   const navLinks = [
//     { path: "/admin", label: "Dashboard", icon: <LuLayoutDashboard /> },
//     { path: "/admin/users", label: "User Management", icon: <LuUsers /> },
//     { path: "/admin/tuitions", label: "Tuition Management", icon: <LuBookOpen /> },
//     { path: "/admin/reports", label: "Reports", icon: <LuFileText /> },
  
//   ];

//   return (
//     <div className="min-h-screen flex bg-bg text-text-primary">

//       <aside
//         className="hidden md:flex fixed left-0 top-0 h-screen flex-col border-r border-border bg-card-bg"
//         style={{ width: sidebarWidth }}
//       >

//         <div className="p-6 border-b border-border">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
//               <LuShield className="text-white text-lg" />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-text-primary">Admin Panel</h2>
//               <p className="text-xs text-text-secondary">Admin Dashboard</p>
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 p-4 overflow-y-auto">
//           <div className="space-y-1">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
//                   ${isActive
//                     ? "bg-primary text-white shadow-lg"
//                     : "text-text-secondary hover:bg-hover-bg hover:text-text-primary"
//                   }`
//                 }
//               >
//                 <span className="text-lg">{link.icon}</span>
//                 <span className="font-medium">{link.label}</span>
//               </NavLink>
//             ))}
//           </div>
//         </nav>


//         <div className="p-4 border-t border-border">
//           <div className="flex items-center gap-3 bg-hover-bg p-3 rounded-lg">
//             <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
//               {user?.name?.split(" ").map(n => n[0]).join("") || "AD"}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="font-medium text-text-primary truncate">{user?.name || "Admin User"}</p>
//               <p className="text-xs text-text-secondary truncate">{user?.role || "Administrator"}</p>
//             </div>
//             <button className="p-1 hover:bg-bg rounded-md transition-colors">
//               <LuSettings className="text-text-secondary hover:text-text-primary" />
//             </button>
//           </div>
//         </div>
//       </aside>


//       <AnimatePresence>
//         {sidebarOpen && isMobile && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/40 z-40"
//               onClick={() => setSidebarOpen(false)}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />

//             <motion.aside
//               className="fixed left-0 top-0 h-screen w-80 bg-card-bg z-50 flex flex-col border-r border-border shadow-xl"
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", damping: 20 }}
//             >

//               <div className="p-6 border-b border-border flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
//                     <LuShield className="text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-lg font-bold text-text-primary">Admin Panel</h2>
//                     <p className="text-xs text-text-secondary">Mobile View</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setSidebarOpen(false)}
//                   className="p-2 hover:bg-hover-bg rounded-lg transition-colors"
//                 >
//                   <LuX className="text-xl text-text-secondary" />
//                 </button>
//               </div>


//               <nav className="flex-1 p-4 overflow-y-auto">
//                 <div className="space-y-1">
//                   {navLinks.map((link) => (
//                     <NavLink
//                       key={link.path}
//                       to={link.path}
//                       onClick={() => setSidebarOpen(false)}
//                       className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
//                         ${isActive
//                           ? "bg-primary text-white"
//                           : "text-text-secondary hover:bg-hover-bg hover:text-text-primary"
//                         }`
//                       }
//                     >
//                       <span className="text-lg">{link.icon}</span>
//                       <span className="font-medium">{link.label}</span>
//                     </NavLink>
//                   ))}
//                 </div>
//               </nav>


//               <div className="p-4 border-t border-border">
//                 <div className="flex items-center gap-3 bg-hover-bg p-3 rounded-lg">
//                   <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
//                     {user?.name?.split(" ").map(n => n[0]).join("") || "AD"}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-text-primary truncate">{user?.name || "Admin User"}</p>
//                     <p className="text-xs text-text-secondary truncate">{user?.email || "admin@example.com"}</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>

//       <div
//         className="flex-1 flex flex-col transition-all duration-300"
//         style={{ marginLeft: !isMobile ? sidebarWidth : 0 }}
//       >

//         <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-card-bg border-b border-border shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               className="md:hidden p-2 hover:bg-hover-bg rounded-lg transition-colors"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <LuMenu className="text-xl text-text-primary" />
//             </button>
//             <div>
//               <h1 className="font-semibold text-lg text-text-primary">
//                 {navLinks.find((l) => l.path === location.pathname)?.label || "Dashboard"}
//               </h1>
//               <p className="text-xs text-text-secondary">
//                 {location.pathname === "/admin" ? "Welcome back, Admin" : "Manage your platform"}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="p-2 hover:bg-hover-bg rounded-lg transition-colors relative">
//               <LuBell className="text-xl text-text-secondary hover:text-text-primary" />
//               <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
//             <div className="hidden sm:flex items-center gap-2 bg-hover-bg px-3 py-1.5 rounded-lg">
//               <span className="text-xs font-medium text-text-primary">Admin</span>
//               <span className="text-xs text-text-secondary">•</span>
//               <span className="text-xs text-text-secondary">Online</span>
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 p-4 sm:p-6 overflow-auto">
//           <div className="max-w-full">
//             <Outlet />
//           </div>
//         </main>


//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


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