"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PulseGuardLogo } from "./Icons";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-slate-700 ${
        scrolled
          ? "backdrop-blur-3xl bg-slate-900/40"
          : "backdrop-blur-sm bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <div className="max-w-7xl mx-auto px-6 border-x border-slate-700">
        <div className="flex justify-between items-center py-2">
          <Link href={"/"}>
            <PulseGuardLogo />
          </Link>

          <nav className="hidden md:flex space-x-8">
            {["Features", "How it works", "Documentation"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-slate-300 text-sm hover:text-white transition-colors duration-300 relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4 text-sm">
            <motion.button
              className="py-2 text-slate-300 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-500/25"
              whileTap={{ scale: 0.95 }}
            >
              Get started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
