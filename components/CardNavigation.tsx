'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { FaChevronLeft, FaChevronRight, FaHome, FaCode, FaProjectDiagram, FaBriefcase, FaCertificate, FaEnvelope } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export function CardNavigation() {
  const { nextCard, prevCard, currentIndex, goToCard, isRotating } = usePortfolio();
  const [touchStart, setTouchStart] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Hide swipe hint after 3 seconds
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRotating) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard, isRotating]);

  // Touch navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isRotating) return;
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isRotating) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextCard(); // Left swipe
      } else {
        prevCard(); // Right swipe
      }
    }
  };

  // Card icons for each section
  const cardIcons = [
    { icon: FaHome, label: 'Home', color: 'from-purple-500 to-pink-500' },
    { icon: FaCode, label: 'Skills', color: 'from-amber-500 to-orange-500' },
    { icon: FaProjectDiagram, label: 'Projects', color: 'from-red-500 to-pink-500' },
    { icon: FaBriefcase, label: 'Experience', color: 'from-teal-500 to-emerald-500' },
    { icon: FaCertificate, label: 'Certifications', color: 'from-sky-500 to-blue-500' },
    { icon: FaEnvelope, label: 'Contact', color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div 
      className="fixed inset-0 z-20 pointer-events-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe Hint - Mobile Only */}
      <AnimatePresence>
        {isMobile && showSwipeHint && (
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-sm
              flex items-center gap-4 shadow-xl pointer-events-none z-30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span 
              className="text-xl"
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👈
            </motion.span>
            <span className="font-medium">Swipe to navigate</span>
            <motion.span 
              className="text-xl"
              animate={{ x: [5, -5, 5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👉
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center px-4 pointer-events-auto">
        <motion.div 
          className="bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-gray-200/50 
            p-2 flex items-center gap-2 sm:gap-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Previous Button */}
          <motion.button
            onClick={prevCard}
            disabled={isRotating}
            className={`p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-all duration-300
              ${isRotating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous card"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </motion.button>

          {/* Dots with Icons - Desktop */}
          <div className="hidden md:flex items-center gap-2 px-2">
            {cardIcons.map((card, index) => {
              const Icon = card.icon;
              const isActive = currentIndex === index;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => !isRotating && goToCard(index)}
                  className={`relative group transition-all duration-300
                    ${isRotating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isRotating}
                  aria-label={card.label}
                >
                  <div className={`p-2 rounded-xl transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${card.color} text-white shadow-lg` 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  {/* Tooltip */}
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                    bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 
                    group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap
                    pointer-events-none">
                    {card.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Simple Dots - Mobile */}
          <div className="flex md:hidden items-center gap-2 px-1">
            {[0, 1, 2, 3, 4, 5].map((dot) => (
              <motion.button
                key={dot}
                onClick={() => !isRotating && goToCard(dot)}
                className={`relative transition-all duration-300
                  ${isRotating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                disabled={isRotating}
                aria-label={`Go to card ${dot + 1}`}
              >
                <div className={`h-2 rounded-full transition-all duration-300
                  ${currentIndex === dot 
                    ? 'w-6 bg-gradient-to-r from-purple-600 to-blue-600' 
                    : 'w-2 bg-gray-300'}`}
                />
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={nextCard}
            disabled={isRotating}
            className={`p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-all duration-300
              ${isRotating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next card"
          >
            <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </motion.button>
        </motion.div>
      </div>

      {/* YEH POORA HATAYA - Current Card Label wala section */}
      {/* {isMobile && (
        <motion.div 
          className="absolute top-20 left-1/2 transform -translate-x-1/2 
            bg-gradient-to-r from-purple-600 to-blue-600 text-white 
            px-4 py-1.5 rounded-full text-xs font-medium shadow-lg
            pointer-events-none z-30"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={currentIndex}
        >
          {cardIcons[currentIndex]?.label}
        </motion.div>
      )} */}

      {/* Keyboard Navigation Hint - Desktop Only */}
      {!isMobile && (
        <motion.div 
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 
            bg-gray-800/50 text-white text-xs px-3 py-1 rounded-full
            backdrop-blur-sm pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
        >
          ←  →  Arrow keys
        </motion.div>
      )}
    </div>
  );
}