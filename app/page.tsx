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

const cards = [
  { component: HomeCard, index: 0 },
  { component: SkillsCard, index: 1 },
  { component: ProjectsCard, index: 2 },
  { component: ExperienceCard, index: 3 },
  { component: CertificationsCard, index: 4 },
  { component: ContactCard, index: 5 },
];

export default function Page() {
  const { currentIndex, isRotating } = usePortfolio();
  const theme = getThemeByIndex(currentIndex);

  return (
    <main className="w-full h-screen flex flex-col overflow-hidden">
      <Navbar />
      <Footer />

      {/* Main Content Area */}
      <div className="flex-1 pt-20 pb-24 px-4 md:px-8 lg:px-16 overflow-hidden">
        <motion.div
          className="w-full h-full relative"
          animate={{
            opacity: isRotating ? 0.8 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Card Container with 3D rotation effect */}
          <div
            className="w-full h-full relative"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            {cards.map((card) => {
              const CardComponent = card.component;
              const isActive = currentIndex === card.index;
              const color = theme.bg;

              return (
                <CardWrapper key={card.index} isActive={isActive} color={color}>
                  <CardComponent />
                </CardWrapper>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <CardNavigation />
    </main>
  );
}
