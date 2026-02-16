'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { cardOrder } from '@/data/colors';

interface PortfolioContextType {
  currentIndex: number;
  currentCard: string;
  nextCard: () => void;
  prevCard: () => void;
  goToCard: (index: number) => void;
  isRotating: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const nextCard = useCallback(() => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cardOrder.length);
      setIsRotating(false);
    }, 600);
  }, []);

  const prevCard = useCallback(() => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cardOrder.length) % cardOrder.length);
      setIsRotating(false);
    }, 600);
  }, []);

  const goToCard = useCallback((index: number) => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex(index % cardOrder.length);
      setIsRotating(false);
    }, 600);
  }, []);

  const currentCard = cardOrder[currentIndex];

  return (
    <PortfolioContext.Provider
      value={{
        currentIndex,
        currentCard,
        nextCard,
        prevCard,
        goToCard,
        isRotating,
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
