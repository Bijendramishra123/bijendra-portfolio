'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaCode, FaRocket, FaCog, FaStar, FaDatabase, FaCloud, FaBrain } from 'react-icons/fa';
import { useState } from 'react';

export function SkillsCard() {
  const { skills } = resumeData;
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Category icons mapping - Professional icons
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('frontend') || name.includes('front')) 
      return <FaCode className="w-5 h-5" />;
    if (name.includes('backend') || name.includes('back')) 
      return <FaCog className="w-5 h-5" />;
    if (name.includes('database')) 
      return <FaDatabase className="w-5 h-5" />;
    if (name.includes('tool') || name.includes('platform')) 
      return <FaRocket className="w-5 h-5" />;
    if (name.includes('ai') || name.includes('machine')) 
      return <FaBrain className="w-5 h-5" />;
    if (name.includes('cloud')) 
      return <FaCloud className="w-5 h-5" />;
    return <FaStar className="w-5 h-5" />;
  };

  // Get gradient colors based on category
  const getCategoryGradient = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('frontend')) 
      return 'from-red-400 to-rose-500';
    if (name.includes('backend')) 
      return 'from-sky-400 to-blue-500';
    if (name.includes('database')) 
      return 'from-red-500 to-rose-600';
    if (name.includes('ai') || name.includes('machine')) 
      return 'from-sky-500 to-blue-600';
    if (name.includes('architecture')) 
      return 'from-red-400 to-rose-400';
    return 'from-red-500 to-sky-500';
  };

  return (
    <div className="h-full space-y-6 md:space-y-8 overflow-y-auto px-2 sm:px-4 
      scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-50
      bg-gradient-to-b from-white via-red-50/10 to-sky-50/10">
      
      {/* Header Section */}
      <motion.div 
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="relative text-center md:text-left"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-100/20 rounded-full blur-2xl" />
        
        <div className="relative">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-sky-50 
              rounded-full mb-4 border border-red-200"
            whileHover={{ scale: 1.02 }}
          >
            <FaStar className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-700">Expertise</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gray-800">Technical </span>
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-sky-500 
              bg-clip-text text-transparent animate-gradient">
              Skills
            </span>
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto md:mx-0">
            Technologies, frameworks, and tools I specialize in for building modern applications.
          </p>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.categories.map((category, idx) => {
          const isHovered = hoveredCategory === idx;
          const gradient = getCategoryGradient(category.name);
          
          return (
            <motion.div
              key={`${category.name}-${idx}`}
              variants={itemVariants}
              onHoverStart={() => setHoveredCategory(idx)}
              onHoverEnd={() => setHoveredCategory(null)}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden
                border border-red-100 hover:border-red-200
                shadow-md hover:shadow-xl
                transition-all duration-500 ease-out"
            >
              {/* Animated gradient background */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${gradient.replace('from', 'to').replace('to', 'from')}/5`}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Top accent bar */}
              <motion.div 
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />

              {/* Content */}
              <div className="relative p-5 sm:p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <motion.div 
                    className={`w-11 h-11 bg-gradient-to-br ${gradient} 
                      rounded-xl flex items-center justify-center shadow-md`}
                    animate={{
                      rotate: isHovered ? [0, -5, 5, 0] : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white">
                      {getCategoryIcon(category.name)}
                    </span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-gray-800"
                    animate={{
                      x: isHovered ? 5 : 0,
                    }}
                  >
                    {category.name}
                  </motion.h3>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={`${skill}-${skillIdx}`}
                      className="relative px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 
                        text-gray-700 rounded-lg text-xs sm:text-sm font-medium 
                        border border-gray-200 overflow-hidden cursor-default
                        hover:shadow-md transition-all duration-300"
                      whileHover={{ 
                        scale: 1.08,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIdx * 0.02 }}
                    >
                      {/* Hover gradient effect */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-r ${gradient.replace('from', 'to')}/10`}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="relative z-10">{skill}</span>
                    </motion.span>
                  ))}
                </div>

                {/* Skill count badge */}
                <motion.div 
                  className="absolute bottom-3 right-3 text-xs font-mono"
                  animate={{
                    opacity: isHovered ? 1 : 0.5,
                    color: isHovered ? '#ef4444' : '#9ca3af',
                  }}
                >
                  {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Learning Philosophy Section - Professional */}
      <motion.div
        className="relative bg-gradient-to-br from-red-50/80 via-white to-sky-50/80 
          p-5 sm:p-6 md:p-8 rounded-2xl 
          border border-red-100 shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-100/20 rounded-full blur-3xl" />
        
        <div className="relative flex flex-col sm:flex-row items-start gap-4">
          <div className="hidden sm:block">
            <motion.div 
              className="w-14 h-14 bg-gradient-to-br from-red-500 to-sky-500 
                rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 10, scale: 1.05 }}
            >
              <FaRocket className="w-7 h-7 text-white" />
            </motion.div>
          </div>
          
          <div className="flex-1">
            <motion.h4 
              className="text-lg font-semibold text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Continuous Learning & Growth
            </motion.h4>
            <motion.p 
              className="text-sm sm:text-base text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              I stay current with emerging technologies and industry best practices. 
              My approach combines strong theoretical foundations with practical 
              problem-solving to deliver scalable, maintainable solutions.
            </motion.p>
          </div>
        </div>

        {/* Animated progress bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 via-rose-400 to-sky-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </motion.div>

      {/* Total Skills Summary */}
      <motion.div
        className="text-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-gray-500">
          {skills.categories.reduce((acc, cat) => acc + cat.skills.length, 0)}+ 
          {' '}technologies across {skills.categories.length} domains
        </p>
      </motion.div>
    </div>
  );
}