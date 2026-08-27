import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Terminal, User } from "lucide-react";
import { useUserAuth } from "../contexts/UserAuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { user, isAuthLoading, signIn, logOut } = useUserAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    await logOut();
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (window.location.pathname !== '/') {
      return; // Let normal navigation happen if not on home page
    }
    
    e.preventDefault();
    const targetId = href.replace('/#', '#').replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const loggedOutNavLinks = [
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#work" },
    { name: "Process", href: "/#process" },
    { name: "Contact", href: "/#contact" },
  ];

  const loggedInNavLinks = [
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#work" },
    { name: "Process", href: "/#process" },
  ];

  const currentNavLinks = user ? loggedInNavLinks : loggedOutNavLinks;

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "backdrop-blur-xl bg-brand-black/75 border-b border-brand-white/[0.06] py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={(e) => {
              if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-8 h-8 rounded-lg bg-brand-white flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:rotate-12">
              <Terminal className="w-4 h-4 text-brand-black" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-gray-300/10 to-transparent pointer-events-none" />
            </div>
            <span className="font-display font-bold tracking-widest text-lg text-brand-white group-hover:text-brand-gray-300 transition-colors">
              HARIKOS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {currentNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-sm text-brand-gray-400 hover:text-brand-white transition-colors duration-200 font-medium relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthLoading && (
              user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-brand-white/5 px-2 py-1.5 rounded-full transition-colors"
                  >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-brand-white/10" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-white/10 flex items-center justify-center border border-brand-white/10">
                        <User className="w-4 h-4 text-brand-white" />
                      </div>
                    )}
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-brand-black/90 backdrop-blur-xl border border-brand-white/10 rounded-2xl shadow-xl overflow-hidden py-1 z-50"
                      >
                        <div className="px-4 py-3 border-b border-brand-white/10">
                          <p className="text-sm font-medium text-brand-white truncate">{user.displayName}</p>
                          <p className="text-xs text-brand-gray-400 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-brand-gray-300 hover:bg-brand-white/5 hover:text-brand-white transition-colors">
                            View Profile
                          </Link>
                          <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-brand-gray-300 hover:bg-brand-white/5 hover:text-brand-white transition-colors">
                            Settings
                          </Link>
                        </div>
                        <div className="border-t border-brand-white/10 py-1">
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              handleSignOut();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="text-sm text-brand-gray-300 hover:text-brand-white font-medium transition-colors flex items-center gap-1.5"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-brand-gray-400 hover:text-brand-white transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[60px] z-40 bg-brand-black/95 backdrop-blur-lg md:hidden border-t border-brand-white/[0.05]"
          >
            <div className="flex flex-col p-8 gap-6 h-full">
              <div className="flex flex-col gap-6">
                {currentNavLinks.map((link, idx) => (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-display text-2xl font-light text-brand-gray-300 hover:text-brand-white transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="h-[1px] bg-brand-white/[0.08] my-4" />

              <div className="flex flex-col gap-4 mt-auto pb-12">
                {!isAuthLoading && (
                  user ? (
                    <div className="flex flex-col gap-2 mb-2 p-4 border border-brand-white/[0.1] rounded-2xl bg-brand-white/[0.02]">
                      <div className="flex items-center gap-3 mb-2 pb-3 border-b border-brand-white/10">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-brand-white/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-brand-white" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-brand-white">{user.displayName}</div>
                          <div className="text-xs text-brand-gray-400">{user.email}</div>
                        </div>
                      </div>
                      <Link to="/profile" onClick={() => setIsOpen(false)} className="block w-full py-2 px-3 text-left text-sm text-brand-gray-300 hover:text-brand-white hover:bg-brand-white/5 rounded-lg transition-colors">
                        View Profile
                      </Link>
                      <Link to="/profile" onClick={() => setIsOpen(false)} className="block w-full py-2 px-3 text-left text-sm text-brand-gray-300 hover:text-brand-white hover:bg-brand-white/5 rounded-lg transition-colors">
                        Settings
                      </Link>
                      <div className="h-[1px] bg-brand-white/10 my-1" />
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          handleSignOut();
                        }}
                        className="w-full py-2 px-3 text-left text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleSignIn();
                      }}
                      className="w-full py-3.5 px-5 flex items-center justify-center gap-2 text-center font-medium text-brand-white bg-brand-white/10 border border-brand-white/[0.1] rounded-full hover:bg-brand-white/[0.15] transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Sign In
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
