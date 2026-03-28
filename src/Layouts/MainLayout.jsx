
// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Outlet } from "react-router-dom";

// const MainLayout = ({ children }) => {
//   return (
//     <div className="flex w-full flex-col min-h-screen  bg-[var(--bg)] text-[var(--text-primary)] transition-colors">
//       <Navbar />
//       <main className="flex-1 w-full">
//         <Outlet />
//       </main>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default MainLayout;



import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  // Paths where footer should NOT show
  const excludedPaths = ["/admin", "/student", "/teacher", "/guardian"];

  // Check if current path starts with any excluded path
  const hideFooter = excludedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col min-h-screen w-full bg-[var(--bg)] text-[var(--text-primary)] transition-colors">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;