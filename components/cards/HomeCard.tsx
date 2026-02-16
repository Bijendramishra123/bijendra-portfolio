'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaArrowRight } from 'react-icons/fa';
import { usePortfolio } from '@/context/PortfolioContext';

export function HomeCard() {
  const { personal } = resumeData;
  const { goToCard } = usePortfolio();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="h-full flex flex-col justify-center space-y-8">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
        >
          Hello, I'm{' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Bijendra
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-700 mb-6">
          {personal.title}
        </motion.p>

        <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          {personal.summary}
        </motion.p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-4 pt-4"
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={() => goToCard(5)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch <FaArrowRight className="w-4 h-4" />
        </motion.button>

        <motion.button
          onClick={() => goToCard(2)}
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 gap-4 pt-8 border-t border-blue-200"
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">0-1</p>
          <p className="text-sm text-gray-600">Years Experience</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">20+</p>
          <p className="text-sm text-gray-600">Projects Completed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">100%</p>
          <p className="text-sm text-gray-600">Satisfaction</p>
        </div>
      </motion.div>
    </div>
  );
}
