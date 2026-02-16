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

// Card colors mapping
const cardColors = [
  'from-purple-600 to-pink-600', // Home
  'from-amber-600 to-orange-600', // Skills
  'from-red-600 to-pink-600', // Projects
  'from-teal-600 to-emerald-600', // Experience
  'from-sky-600 to-blue-600', // Certifications
  'from-indigo-600 to-purple-600', // Contact
];

export default function Page() {
  const { currentIndex, isRotating, nextCard, prevCard } = usePortfolio();
  const theme = getThemeByIndex(currentIndex);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
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

      {/* Main Content Area */}
      <div className="flex-1 pt-16 sm:pt-20 pb-20 sm:pb-24 px-2 sm:px-4 md:px-8 lg:px-16 overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={{
            opacity: isRotating ? 0.8 : 1,
            scale: isRotating ? 0.98 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="w-full h-full"
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

      {/* Progress Bar with Card Colors */}
      <div className="fixed top-14 left-0 right-0 h-1 bg-gray-200 z-40">
        <motion.div 
          className={`h-full bg-gradient-to-r ${cardColors[currentIndex]}`}
          initial={{ width: '0%' }}
          animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <CardNavigation />
    </main>
  );
}