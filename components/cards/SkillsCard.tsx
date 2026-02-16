'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaCode, FaRocket, FaCog, FaStar } from 'react-icons/fa';
import { useState } from 'react';

export function SkillsCard() {
  const { skills } = resumeData;
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  // Category icons mapping
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('frontend') || name.includes('front')) return <FaCode className="w-5 h-5" />;
    if (name.includes('backend') || name.includes('back')) return <FaCog className="w-5 h-5" />;
    if (name.includes('tool') || name.includes('devops')) return <FaRocket className="w-5 h-5" />;
    return <FaStar className="w-5 h-5" />;
  };

  return (
    <div className="h-full space-y-6 md:space-y-8 overflow-y-auto px-2 sm:px-4 
      scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-amber-50">
      
      {/* Header Section */}
      <motion.div 
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-800 mb-2">
          {skills.title}
        </h2>
        <p className="text-amber-600/80 text-sm sm:text-base">
          Technologies and tools I work with
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.categories.map((category, idx) => {
          const isHovered = hoveredCategory === idx;
          
          return (
            <motion.div
              key={`${category.name}-${idx}`}
              variants={itemVariants}
              onHoverStart={() => setHoveredCategory(idx)}
              onHoverEnd={() => setHoveredCategory(null)}
              className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden
                border border-amber-200 hover:border-amber-300
                shadow-md hover:shadow-xl
                transition-all duration-500 ease-out"
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-orange-400/5 to-amber-600/5"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Top accent bar */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />

              {/* Content */}
              <div className="relative p-5 sm:p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 
                      rounded-lg flex items-center justify-center border border-amber-300
                      shadow-inner"
                    animate={{
                      rotate: isHovered ? [0, -5, 5, 0] : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-amber-600">
                      {getCategoryIcon(category.name)}
                    </span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-amber-900"
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
                      className="relative px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 
                        text-amber-800 rounded-lg text-xs sm:text-sm font-medium 
                        border border-amber-200 overflow-hidden cursor-default
                        hover:shadow-md transition-shadow duration-300"
                      whileHover={{ 
                        scale: 1.1,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIdx * 0.03 }}
                    >
                      {/* Hover glow effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20"
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
                  className="absolute bottom-3 right-3 text-xs text-amber-400/50 font-medium"
                  animate={{
                    opacity: isHovered ? 1 : 0.5,
                  }}
                >
                  {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Learning Philosophy Section */}
      <motion.div
        className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 
          p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl 
          border border-amber-300 shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl" />
        
        <div className="relative flex items-start gap-4">
          <div className="hidden sm:block">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-orange-200 
              rounded-xl flex items-center justify-center">
              <FaRocket className="w-6 h-6 text-amber-700" />
            </div>
          </div>
          
          <div className="flex-1">
            <motion.p 
              className="text-sm sm:text-base text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              I'm constantly learning and adapting to new technologies. My approach combines deep 
              technical knowledge with practical problem-solving skills to deliver efficient, 
              scalable solutions.
            </motion.p>
          </div>
        </div>

        {/* Animated progress bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </div>
  );
}