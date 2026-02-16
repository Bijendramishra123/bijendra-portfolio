'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { cardOrder } from '@/data/colors';
import { motion } from 'framer-motion';

export function Navbar() {
  const { goToCard, currentIndex } = usePortfolio();

  const navItems = [
    { name: 'Home', index: 0 },
    { name: 'Skills', index: 1 },
    { name: 'Projects', index: 2 },
    { name: 'Experience', index: 3 },
    { name: 'Certifications', index: 4 },
    { name: 'Contact', index: 5 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/80 shadow-sm border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-gray-900"
          >
            BM
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {navItems.map((item) => (
              <motion.button
                key={item.index}
                onClick={() => goToCard(item.index)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentIndex === item.index
                    ? 'bg-blue-100 text-blue-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
