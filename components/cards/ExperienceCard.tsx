'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useState } from 'react';

export function ExperienceCard() {
  const { experience } = resumeData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
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

  return (
    <div className="h-full space-y-6 md:space-y-8 overflow-y-auto px-2 sm:px-4 
      scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-teal-50">
      
      {/* Header Section */}
      <motion.div 
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-800 mb-2">
          {experience.title}
        </h2>
        <p className="text-teal-600/80 text-sm sm:text-base">
          My professional journey and experiences
        </p>
      </motion.div>

      {/* Experience List */}
      <motion.div
        className="space-y-5 md:space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experience.jobs.map((job, idx) => {
          const isHovered = hoveredIndex === idx;
          
          return (
            <motion.div
              key={`${job.company}-${idx}`}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden
                border border-teal-200 hover:border-teal-300
                shadow-md hover:shadow-xl
                transition-all duration-500 ease-out"
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-teal-400/5 via-emerald-400/5 to-teal-600/5"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Decorative left border */}
              <motion.div 
                className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-teal-400 to-emerald-500"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
                style={{ originY: 0 }}
              />

              {/* Main content */}
              <div className="relative p-5 sm:p-6 md:p-7">
                
                {/* Header with role and company */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <motion.div 
                    className="flex items-start gap-3"
                    animate={{ x: isHovered ? 5 : 0 }}
                  >
                    <div className="hidden sm:block mt-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-emerald-100 
                        rounded-lg flex items-center justify-center border border-teal-300">
                        <FaBriefcase className="w-5 h-5 text-teal-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-900">
                        {job.role}
                      </h3>
                      <p className="text-emerald-600 font-semibold text-sm sm:text-base">
                        {job.company}
                      </p>
                    </div>
                  </motion.div>

                  {/* Duration and location */}
                  <motion.div 
                    className="flex flex-row md:flex-col items-start md:items-end gap-3 md:gap-1 
                      text-xs sm:text-sm ml-12 sm:ml-0"
                    animate={{
                      y: isHovered ? -2 : 0,
                    }}
                  >
                    <div className="flex items-center gap-1 text-teal-600">
                      <FaCalendarAlt className="w-3 h-3" />
                      <span className="font-medium text-gray-700">{job.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      <span className="text-gray-600">{job.location}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Responsibilities */}
                <motion.ul 
                  className="space-y-3 mt-4"
                  animate={{
                    opacity: isHovered ? 1 : 0.95,
                  }}
                >
                  {job.responsibilities.map((responsibility, respIdx) => (
                    <motion.li 
                      key={respIdx} 
                      className="flex gap-3 text-sm sm:text-base text-gray-700 leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.span 
                        className="text-teal-500 font-bold mt-1 flex-shrink-0"
                        animate={{
                          scale: isHovered ? [1, 1.2, 1] : 1,
                          rotate: isHovered ? [0, 5, 0] : 0,
                        }}
                        transition={{ duration: 0.3, delay: respIdx * 0.05 }}
                      >
                        •
                      </motion.span>
                      <span>{responsibility}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Animated bottom gradient */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Opportunities section */}
      <motion.div
        className="relative bg-gradient-to-br from-teal-50 via-white to-emerald-50 
          p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl 
          border border-teal-300 shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl" />
        
        <div className="relative flex items-start gap-4">
          <div className="hidden sm:block">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-200 to-emerald-200 
              rounded-xl flex items-center justify-center">
              <FaBriefcase className="w-6 h-6 text-teal-700" />
            </div>
          </div>
          
          <div className="flex-1">
            <motion.p 
              className="text-base sm:text-lg font-semibold text-teal-800 mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Looking for new opportunities
            </motion.p>
            
            <motion.p 
              className="text-sm sm:text-base text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              I'm always interested in learning and collaborating with innovative teams. 
              Let's discuss how I can contribute to your project.
            </motion.p>
          </div>
        </div>

        {/* Animated progress bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </div>
  );
}