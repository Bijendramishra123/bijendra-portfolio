'use client';

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { cardOrder } from '@/data/colors';

interface PortfolioContextType {
  currentIndex: number;
  currentCard: string;
  nextCard: () => void;
  prevCard: () => void;
  goToCard: (index: number) => void;
  isRotating: boolean;
  totalCards: number;
  isMobile: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation duration based on device
  const getAnimationDuration = useCallback(() => {
    return isMobile ? 400 : 600;
  }, [isMobile]);

  const nextCard = useCallback(() => {
    if (isRotating) return;
    
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cardOrder.length);
      setIsRotating(false);
    }, getAnimationDuration());
  }, [isRotating, getAnimationDuration]);

  const prevCard = useCallback(() => {
    if (isRotating) return;
    
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cardOrder.length) % cardOrder.length);
      setIsRotating(false);
    }, getAnimationDuration());
  }, [isRotating, getAnimationDuration]);

  const goToCard = useCallback((index: number) => {
    if (isRotating || index === currentIndex) return;
    
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex(index % cardOrder.length);
      setIsRotating(false);
    }, getAnimationDuration());
  }, [isRotating, currentIndex, getAnimationDuration]);

  const currentCard = cardOrder[currentIndex];
  const totalCards = cardOrder.length;

  return (
    <PortfolioContext.Provider
      value={{
        currentIndex,
        currentCard,
        nextCard,
        prevCard,
        goToCard,
        isRotating,
        totalCards,
        isMobile,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = React.useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}