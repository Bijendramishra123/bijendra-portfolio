'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaArrowRight, FaRocket, FaCode, FaHeart } from 'react-icons/fa';
import { usePortfolio } from '@/context/PortfolioContext';
import { useState, useEffect } from 'react';

export function HomeCard() {
  const { personal } = resumeData;
  const { goToCard } = usePortfolio();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Dynamic stats based on your data (update these values as needed)
  const stats = [
    { value: "4+", label: "Years Experience", icon: FaRocket },
    { value: "30+", label: "Projects Completed", icon: FaCode },
    { value: "100%", label: "Client Satisfaction", icon: FaHeart },
  ];

  return (
    <div className="h-full flex flex-col justify-center space-y-6 md:space-y-8 
      overflow-y-auto px-2 sm:px-4 relative">
      
      {/* Animated background glow effects */}
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: "spring", damping: 50 }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-300/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -0.02,
          y: mousePosition.y * -0.02,
        }}
        transition={{ type: "spring", damping: 50 }}
      />

      {/* Main Content */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        className="relative z-10"
      >
        {/* Welcome Badge */}
        <motion.div 
          variants={itemVariants}
          className="inline-block mb-4"
        >
          <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-violet-100 
            text-purple-700 rounded-full text-sm font-medium border border-purple-200
            shadow-sm">
            👋 Welcome to my portfolio
          </span>
        </motion.div>

        {/* Name and Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="text-gray-900">Hello, I'm </span>
          <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 
            bg-clip-text text-transparent animate-gradient">
            Bijendra Mishra
          </span>
        </motion.h1>

        {/* Animated role indicator */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div 
            className="w-2 h-2 bg-purple-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-lg sm:text-xl md:text-2xl text-purple-700 font-medium">
            {personal.title}
          </p>
        </motion.div>

        {/* Summary */}
        <motion.p 
          variants={itemVariants} 
          className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed mb-8"
        >
          {personal.summary}
        </motion.p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-4 pt-2"
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <motion.button
          onClick={() => goToCard(5)}
          className="group relative inline-flex items-center gap-2 bg-gradient-to-r 
            from-purple-600 to-violet-600 text-white px-6 py-3 sm:px-8 sm:py-4 
            rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-xl
            transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative">Get in Touch</span>
          <FaArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          onClick={() => goToCard(2)}
          className="relative inline-flex items-center gap-2 bg-white text-purple-600 
            px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold border-2 
            border-purple-600 hover:bg-purple-50 transition-all duration-300 
            cursor-pointer overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-violet-100"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative">View My Work</span>
          <FaRocket className="w-4 h-4 relative" />
        </motion.button>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 
          border-t border-purple-200"
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            className="text-center group relative"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br 
                from-purple-100 to-violet-100 rounded-xl flex items-center 
                justify-center border border-purple-200 group-hover:border-purple-300
                transition-colors duration-300">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold 
              bg-gradient-to-r from-purple-700 to-violet-700 bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</p>
            
            {/* Glow effect on hover */}
            <motion.div 
              className="absolute inset-0 -z-10 bg-purple-200/20 rounded-lg blur-xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}