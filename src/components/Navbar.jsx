
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuMenu, LuX, LuSun, LuMoon } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { clearUser } from "../features/auth/authSlice";
import { useLogoutUserMutation } from "../features/auth/authApi";


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutUser] = useLogoutUserMutation()


  const { isAuthenticated, user, loading: authLoading } = useSelector((state) => state.auth);


  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("dark");
      setDarkMode(false);
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      setDarkMode(true);
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tuitions", path: "/tuitions" },
    { name: "Tutors", path: "/tutors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    try {

      await logoutUser().unwrap();


      await signOut(auth);


      dispatch(clearUser());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };



  return (
    <nav className="bg-[var(--card-bg)] shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-[var(--primary)] text-xl"
        >
          <img src="/logo.png" alt="Logo" className="h-12 w-12" />
          e-Tuition
        </Link>


        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-[var(--primary-hover)] transition-colors"
            >
              {link.name}
            </Link>
          ))}


          <button
            onClick={toggleDarkMode}
            className="ml-4 text-lg p-2 rounded hover:bg-[var(--hover-bg)] transition-colors"
          >
            {darkMode ? <LuSun /> : <LuMoon />}
          </button>


          {authLoading ? (

            <div className="flex items-center gap-2">
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ) : !isAuthenticated ? (
            <>
              <Link to="/login" className="btn !text-white btn-sm btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn !text-white btn-sm btn-secondary">
                Register
              </Link>
            </>
          ) : (

            <div className="relative group">
              <button
                className="btn cursor-pointer btn-sm btn-primary"
                onClick={() => navigate(`/${user?.role}`)}
              >
                Dashboard
              </button>


              <div
                className="
      absolute right-0 mt-2 w-40
      bg-[var(--card-bg)] shadow-lg rounded
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
      z-50
    "
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-[var(--hover-bg)]"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="
        block w-full text-left 
        px-4 py-2 
        hover:bg-[var(--hover-bg)]
      "
                >
                  Logout
                </button>
              </div>
            </div>

          )}


        </div>


        <button className="md:hidden text-2xl" onClick={toggleMobileMenu}>
          {mobileOpen ? <LuX /> : <LuMenu />}
        </button>
      </div>


      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[var(--card-bg)] shadow-lg transform transition-transform duration-300 z-50 ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-[var(--border)]">
          <span className="font-bold text-lg text-[var(--primary)]">Menu</span>
          <button onClick={toggleMobileMenu} className="text-2xl">
            <LuX />
          </button>
        </div>

        <div className="flex flex-col px-4 py-4 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block py-2 hover:text-[var(--primary-hover)]"
            >
              {link.name}
            </Link>
          ))}


          <button
            onClick={toggleDarkMode}
            className="mt-2 text-lg p-2 rounded hover:bg-[var(--hover-bg)] transition-colors w-full text-left"
          >
            {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
          </button>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block py-2 btn btn-sm btn-primary w-full my-1"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="block py-2 btn btn-sm btn-secondary w-full my-1"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/${user?.role}`}
                onClick={() => setMobileOpen(false)}
                className="block py-2 hover:text-[var(--primary-hover)]"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="block py-2 hover:text-[var(--primary-hover)]"
              >
                Profile
              </Link>
              <Link
                to="/logout"
                onClick={async () => {
                  await handleLogout();
                  setMobileOpen(false);
                }}
                className="block py-2 hover:text-[var(--primary-hover)]"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>


      {mobileOpen && (
        <div
          onClick={toggleMobileMenu}
         className="fixed inset-0 bg-black/60 z-40"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
