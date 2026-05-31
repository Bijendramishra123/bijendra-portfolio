'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaArrowRight, FaRocket, FaCode, FaHeart, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { usePortfolio } from '@/context/PortfolioContext';
import { useState, useEffect } from 'react';

export function HomeCard() {
  const { personal } = resumeData;
  const { goToCard } = usePortfolio();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only add mousemove on desktop to reduce re-renders
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const stats = [
    { value: "0-1", label: "Years Experience", icon: FaRocket, color: "from-red-400 to-rose-400" },
    { value: "30+", label: "Projects Completed", icon: FaCode, color: "from-sky-400 to-blue-400" },
    { value: "100%", label: "Client Satisfaction", icon: FaHeart, color: "from-red-400 to-pink-400" },
  ];

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/Bijendramishra123", label: "GitHub", color: "bg-gray-800" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/bijendra-mishraa-176744279", label: "LinkedIn", color: "bg-blue-600" },
    { icon: FaEnvelope, url: "mailto:bijendramishra2002@gmail.com", label: "Email", color: "bg-red-500" },
  ];

  return (
    <div className="h-full flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8 
      overflow-y-auto px-3 sm:px-4 relative 
      bg-gradient-to-br from-white via-red-50/20 to-sky-50/20">
      
      {/* Animated background glow effects - Only on desktop */}
      {!isMobile && (
        <>
          <motion.div 
            className="absolute -top-20 -right-20 w-72 h-72 bg-red-200/30 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
            }}
            transition={{ type: "spring", damping: 50 }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x * -0.02,
              y: mousePosition.y * -0.02,
            }}
            transition={{ type: "spring", damping: 50 }}
          />
        </>
      )}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-rose-100/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
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
          className="inline-block mb-3 sm:mb-4"
        >
          <span className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 
            bg-gradient-to-r from-red-50 to-sky-50 
            text-red-600 rounded-full text-xs sm:text-sm font-medium 
            border border-red-200 shadow-sm">
            ✨ Welcome
          </span>
        </motion.div>

        {/* Name - Responsive font sizes */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4"
        >
          <span className="text-gray-800">Hello, I'm </span>
          <span className="bg-gradient-to-r from-red-500 via-rose-500 to-sky-500 
            bg-clip-text text-transparent animate-gradient block sm:inline">
            Bijendra Mishra
          </span>
        </motion.h1>

        {/* Animated role indicator */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
        >
          <motion.div 
            className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.5, 1], backgroundColor: ['#ef4444', '#0ea5e9', '#ef4444'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-600 font-semibold">
            {personal.title}
          </p>
        </motion.div>

        {/* Summary */}
        <motion.div 
          variants={itemVariants}
          className="relative max-w-2xl mb-6 sm:mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-sky-100 rounded-xl sm:rounded-2xl blur-xl opacity-40" />
          <p className="relative text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed 
            bg-white/60 backdrop-blur-sm p-4 sm:p-5 rounded-xl sm:rounded-2xl 
            border border-red-100 shadow-sm">
            {personal.summary}
          </p>
        </motion.div>
      </motion.div>

      {/* CTA Buttons - Stack on mobile */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <motion.button
          onClick={() => goToCard(5)}
          className="group relative inline-flex items-center justify-center gap-2 
            bg-gradient-to-r from-red-500 to-rose-500 text-white 
            px-5 sm:px-7 md:px-9 py-3 sm:py-3.5 md:py-4 
            rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-xl
            transition-all duration-300 cursor-pointer w-full sm:w-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative flex items-center gap-2">
            Let's Connect
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>

        <motion.button
          onClick={() => goToCard(2)}
          className="relative inline-flex items-center justify-center gap-2 
            bg-white text-red-600 
            px-5 sm:px-7 md:px-9 py-3 sm:py-3.5 md:py-4 
            rounded-xl font-semibold border-2 border-red-300 
            hover:border-red-500 hover:bg-red-50 
            transition-all duration-300 cursor-pointer w-full sm:w-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-red-50 to-sky-50"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative flex items-center gap-2">
            Explore Projects
            <FaRocket className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
        </motion.button>
      </motion.div>

      {/* Stats Section - Responsive grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pt-4 sm:pt-6 md:pt-8 
          border-t border-red-100"
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            className="text-center group relative"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-center mb-1 sm:mb-2">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 
                bg-gradient-to-br ${stat.color} 
                rounded-lg sm:rounded-xl flex items-center justify-center 
                shadow-md group-hover:shadow-lg transition-all duration-300 
                group-hover:scale-105`}>
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold 
              bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 font-medium">
              {stat.label}
            </p>
            
            {/* Glow effect - only on desktop hover */}
            <motion.div 
              className="absolute inset-0 -z-10 bg-gradient-to-r from-red-200/40 to-sky-200/40 
                rounded-lg blur-xl hidden sm:block"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Social Links Section - Responsive */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 pb-2"
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      >
        {socialLinks.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.color} text-white p-2.5 sm:p-3 rounded-full shadow-md
              hover:shadow-lg transition-all duration-300 cursor-pointer`}
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            aria-label={social.label}
          >
            <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.a>
        ))}
      </motion.div>

      {/* Decorative floating element - hidden on mobile to reduce rendering */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-5 right-5 w-16 h-16 opacity-20 hidden md:block"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 8, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-red-200 to-sky-200 rounded-full blur-2xl" />
        </motion.div>
      )}
    </div>
  );
}