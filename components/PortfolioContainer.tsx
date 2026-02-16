'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { ReactNode, useEffect, useState } from 'react';

interface PortfolioContainerProps {
  children: ReactNode;
  isRotating: boolean;
}

export function PortfolioContainer({ children, isRotating }: PortfolioContainerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      className="w-full h-full perspective"
      animate={{
        rotateY: isRotating ? (isMobile ? 45 : 90) : 0,
        opacity: isRotating ? (isMobile ? 0.9 : 0.8) : 1,
        scale: isRotating ? (isMobile ? 0.95 : 0.98) : 1,
      }}
      transition={{
        duration: isMobile ? 0.4 : 0.6,
        ease: 'easeInOut',
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}

interface CardWrapperProps {
  children: ReactNode;
  isActive: boolean;
  color: string;
}

export function CardWrapper({ children, isActive, color }: CardWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile ke liye different padding
  const getPadding = () => {
    if (isMobile) return 'p-4';
    return 'p-6 md:p-8 lg:p-10';
  };

  // Mobile ke liye different border radius
  const getBorderRadius = () => {
    if (isMobile) return 'rounded-xl';
    return 'rounded-2xl md:rounded-3xl';
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{
        opacity: isActive ? 1 : 0,
        rotateY: isActive ? 0 : (isMobile ? -45 : -90),
        pointerEvents: isActive ? 'auto' : 'none',
        scale: isActive ? 1 : (isMobile ? 0.95 : 0.9),
      }}
      transition={{
        duration: isMobile ? 0.4 : 0.6,
        ease: 'easeInOut',
        delay: isActive ? (isMobile ? 0.1 : 0) : 0,
      }}
      className={`absolute inset-0 ${color} ${getBorderRadius()} ${getPadding()} 
        overflow-y-auto shadow-xl md:shadow-2xl
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
        ${isMobile ? 'backdrop-blur-sm' : ''}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: isMobile ? '800px' : '1000px',
        WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
      }}
      whileHover={!isMobile ? { scale: 1.01, transition: { duration: 0.2 } } : {}}
    >
      {/* Decorative gradient overlay for depth */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Bottom fade effect for scroll indication */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
    </motion.div>
  );
}

// Optional: Add a Navigation Dots component for mobile
export function MobileNavigationDots() {
  const { currentIndex, totalCards, goToCard } = usePortfolio();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center gap-2">
      {Array.from({ length: totalCards }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => goToCard(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            currentIndex === index 
              ? 'w-8 bg-gradient-to-r from-purple-600 to-blue-600' 
              : 'w-2 bg-gray-300 hover:bg-gray-400'
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Go to card ${index + 1}`}
        />
      ))}
    </div>
  );
}

// Optional: Add Swipe Indicator for mobile
export function SwipeIndicator() {
  const [isMobile, setIsMobile] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Hide indicator after 3 seconds
    const timer = setTimeout(() => {
      setShowIndicator(false);
    }, 3000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (!isMobile || !showIndicator) return null;

  return (
    <motion.div 
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        z-50 bg-black/50 text-white px-4 py-2 rounded-full text-sm
        flex items-center gap-2 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <span>👆</span>
      <span>Swipe to navigate</span>
      <span>👉</span>
    </motion.div>
  );
}