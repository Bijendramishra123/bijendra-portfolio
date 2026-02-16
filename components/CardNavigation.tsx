'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export function CardNavigation() {
  const { nextCard, prevCard, currentIndex, isRotating } = usePortfolio();

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
      <motion.button
        onClick={prevCard}
        disabled={isRotating}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous card"
      >
        <FaChevronLeft className="w-5 h-5 text-gray-700" />
      </motion.button>

      {/* Card indicator dots */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-full shadow-lg border border-gray-200">
        {[0, 1, 2, 3, 4, 5].map((dot) => (
          <motion.button
            key={dot}
            onClick={() => !isRotating && currentIndex !== dot && nextCard()}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === dot ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to card ${dot + 1}`}
          />
        ))}
      </div>

      <motion.button
        onClick={nextCard}
        disabled={isRotating}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next card"
      >
        <FaChevronRight className="w-5 h-5 text-gray-700" />
      </motion.button>
    </div>
  );
}
