import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, FileText, Folder, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Loader/Loader";
import PageTransition from "../Transition/PageTransition";
import SpaceDevCursor from "../CosmicDevCursor/CosmicDevCursor";


const Layout = () => {
  const [activePage, setActivePage] = useState("/");
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/Resume", label: "Resume", icon: FileText },
    { path: "/projects", label: "Projects", icon: Folder },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <PageTransition>
      < SpaceDevCursor/>

      <div className="min-h-screen bg-black flex flex-col">
        <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
        {/* Top Navbar */}
        <motion.nav
          className="fixed top-0 w-full z-40 hidden md:block"
          initial={{ y: 0 }}
          animate={{ y: visible ? 0 : -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-center relative">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-violet-600/10 blur-3xl opacity-50" />

              {/* Main navigation container */}
              <div className="relative flex space-x-8 backdrop-blur-xl bg-gradient-to-r from-gray-900/90 via-violet-950/90 to-gray-900/90 px-8 py-3 rounded-2xl border border-violet-500/10 shadow-2xl shadow-violet-500/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-4 py-2 group"
                    onMouseEnter={() => {
                      setActivePage(link.path);
                      setHoveredPath(link.path);
                    }}
                    onMouseLeave={() => {
                      setActivePage(location.pathname);
                      setHoveredPath(null);
                    }}
                  >
                    {/* Hover effect background */}
                    <motion.div
                      className="absolute inset-0 bg-violet-600/20 rounded-lg -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredPath === link.path ? 1 : 0,
                        scale: hoveredPath === link.path ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Link text */}
                    <span
                      className={`text-sm font-medium transition-all duration-200 ${
                        location.pathname === link.path
                          ? "text-violet-300"
                          : "text-gray-300 hover:text-violet-200"
                      }`}
                    >
                      {link.label}
                    </span>

                    {/* Active indicator */}
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400"
                      animate={{
                        opacity: activePage === link.path ? 1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />

                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg ring-2 ring-violet-400/20"
                      animate={{
                        opacity: hoveredPath === link.path ? 1 : 0,
                        scale: hoveredPath === link.path ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Bottom Navbar */}
        <nav className="fixed bottom-0 w-full z-40 md:hidden">
          <div className="backdrop-blur-md bg-gradient-to-t from-[#0f0f1a]/80 to-[#1a0b2e]/80 px-4 py-3">
            <div className="flex justify-around items-center">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.path} to={link.path} className="p-2">
                    <Icon
                      size={24}
                      className={`${
                        location.pathname === link.path
                          ? "text-violet-400"
                          : "text-gray-300"
                      } transition-colors duration-200`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow pb-16 pt-16 md:pb-0 "
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        {/* Footer */}
        <footer
          className="bg-gradient-to-r from-[#0a0f24] via-[#0d1638] to-[#0a0f24] text-white text-center py-4 w-full fixed bottom-16 md:bottom-0 md:relative hidden sm:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #1c2b54, #0a0f24)",
          }}
        >
          <p className="text-mm font-light" style={{ fontWeight: "600" }}>
            &copy; {new Date().getFullYear()} -- Hassan Amagroud' -- Built with ❤️
            and React - tailwind - three js .
          </p>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Layout;
