'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CardNavigation } from '@/components/CardNavigation';
import { CardWrapper } from '@/components/PortfolioContainer';
import { HomeCard } from '@/components/cards/HomeCard';
import { SkillsCard } from '@/components/cards/SkillsCard';
import { ProjectsCard } from '@/components/cards/ProjectsCard';
import { ExperienceCard } from '@/components/cards/ExperienceCard';
import { CertificationsCard } from '@/components/cards/CertificationsCard';
import { ContactCard } from '@/components/cards/ContactCard';
import { getThemeByIndex } from '@/data/colors';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const cards = [
  { component: HomeCard, index: 0, name: 'Home' },
  { component: SkillsCard, index: 1, name: 'Skills' },
  { component: ProjectsCard, index: 2, name: 'Projects' },
  { component: ExperienceCard, index: 3, name: 'Experience' },
  { component: CertificationsCard, index: 4, name: 'Certifications' },
  { component: ContactCard, index: 5, name: 'Contact' },
];

export default function Page() {
  const { currentIndex, isRotating, nextCard, prevCard } = usePortfolio();
  const theme = getThemeByIndex(currentIndex);
  
  // Touch navigation states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Hide swipe hint after 5 seconds
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && !isRotating) {
      nextCard();
    } else if (isRightSwipe && !isRotating) {
      prevCard();
    }
  };

  return (
    <main 
      className="w-full h-screen flex flex-col overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Navbar />
      <Footer />

      {/* Swipe Hint Overlay - Mobile Only */}
      {isMobile && showSwipeHint && (
        <motion.div 
          className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-black/60 text-white px-6 py-3 rounded-full text-sm backdrop-blur-sm
            flex items-center gap-4 shadow-xl">
            <span className="text-2xl">👈</span>
            <span>Swipe to navigate</span>
            <span className="text-2xl">👉</span>
          </div>
        </motion.div>
      )}

      {/* Current Card Indicator - Mobile */}
      {isMobile && (
        <motion.div 
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30
            bg-gradient-to-r from-purple-600 to-blue-600 text-white 
            px-4 py-1.5 rounded-full text-xs font-medium shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          key={currentIndex}
        >
          {cards[currentIndex].name}
        </motion.div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 pt-16 sm:pt-20 pb-20 sm:pb-24 px-2 sm:px-4 md:px-8 lg:px-16 overflow-hidden">
        <motion.div
          className="w-full h-full relative"
          animate={{
            opacity: isRotating ? 0.8 : 1,
            scale: isRotating ? 0.98 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="w-full h-full relative"
            style={{
              perspective: isMobile ? '800px' : '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            {cards.map((card) => {
              const CardComponent = card.component;
              const isActive = currentIndex === card.index;
              const color = theme.bg;

              return (
                <CardWrapper 
                  key={card.index} 
                  isActive={isActive} 
                  color={color}
                >
                  <CardComponent />
                </CardWrapper>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Progress Bar - Shows current position */}
      <div className="fixed top-14 left-0 right-0 h-1 bg-gray-200 z-40">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <CardNavigation />
    </main>
  );
}