'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navbar() {
  const { goToCard, currentIndex, isMobile } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', index: 0, color: 'from-purple-600 to-pink-600' },
    { name: 'Skills', index: 1, color: 'from-amber-600 to-orange-600' },
    { name: 'Projects', index: 2, color: 'from-red-600 to-pink-600' },
    { name: 'Experience', index: 3, color: 'from-teal-600 to-emerald-600' },
    { name: 'Certifications', index: 4, color: 'from-sky-600 to-blue-600' },
    { name: 'Contact', index: 5, color: 'from-indigo-600 to-purple-600' },
  ];

  // Current card name and color based on index
  const currentCard = navItems[currentIndex] || navItems[0];

  const handleNavClick = (index: number) => {
    goToCard(index);
    setIsMenuOpen(false);
  };

  // Mobile menu variants for animation
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/80 shadow-sm border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Left Section: Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => handleNavClick(0)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BM
          </motion.div>

          {/* Center Section: Current Card Name - Mobile Only */}
          {isMobile && (
            <motion.div
              key={currentCard.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-base font-medium px-4 py-1.5 rounded-full backdrop-blur-sm
                bg-gradient-to-r ${currentCard.color} text-white shadow-md`}
            >
              {currentCard.name}
            </motion.div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.index}
                onClick={() => handleNavClick(item.index)}
                className={`px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                  currentIndex === item.index
                    ? `bg-gradient-to-r ${item.color} text-white shadow-sm`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Right Section: Mobile Menu Button */}
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden absolute left-0 right-0 top-[57px] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg rounded-b-2xl overflow-hidden"
            >
              <div className="flex flex-col p-3 space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.index}
                    variants={itemVariants}
                    onClick={() => handleNavClick(item.index)}
                    className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                      currentIndex === item.index
                        ? `bg-gradient-to-r ${item.color} text-white border-l-4 border-white`
                        : 'text-gray-700 hover:bg-gray-100 hover:pl-6'
                    }`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${
                        currentIndex === item.index ? 'bg-white' : 'bg-gray-300'
                      }`} />
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-200/20 rounded-full blur-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}