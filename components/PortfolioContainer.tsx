'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { ReactNode } from 'react';

interface PortfolioContainerProps {
  children: ReactNode;
  isRotating: boolean;
}

export function PortfolioContainer({ children, isRotating }: PortfolioContainerProps) {
  return (
    <motion.div
      className="w-full h-full perspective"
      animate={{
        rotateY: isRotating ? 90 : 0,
        opacity: isRotating ? 0.8 : 1,
      }}
      transition={{
        duration: 0.6,
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
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{
        opacity: isActive ? 1 : 0,
        rotateY: isActive ? 0 : -90,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
      }}
      className={`absolute inset-0 ${color} rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 overflow-y-auto`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {children}
    </motion.div>
  );
}
