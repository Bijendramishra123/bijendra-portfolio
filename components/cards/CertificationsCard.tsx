'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaAward, FaGraduationCap } from 'react-icons/fa';
import { useState } from 'react';

export function CertificationsCard() {
  const { certifications } = resumeData;
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

  const isEducation = (issuer: string) => 
    issuer.toLowerCase().includes('university') || 
    issuer.toLowerCase().includes('college') ||
    issuer.toLowerCase().includes('institute') ||
    issuer.toLowerCase().includes('school');

  return (
    <div className="h-full space-y-6 md:space-y-8 overflow-y-auto px-2 sm:px-4 
      scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-50">
      
      {/* Header Section */}
      <motion.div 
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-800 mb-2">
          {certifications.title}
        </h2>
        <p className="text-sky-600/80 text-sm sm:text-base">
          Qualifications, certificates, and educational background
        </p>
      </motion.div>

      {/* Certifications List */}
      <motion.div
        className="grid grid-cols-1 gap-3 md:gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {certifications.items.map((cert, idx) => {
          const Icon = isEducation(cert.issuer) ? FaGraduationCap : FaAward;
          const isHovered = hoveredIndex === idx;
          
          return (
            <motion.div
              key={`${cert.title}-${idx}`}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden
                border border-sky-200 hover:border-sky-300
                shadow-md hover:shadow-xl
                transition-all duration-500 ease-out"
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-sky-400/5 via-transparent to-sky-600/5"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Main content */}
              <div className="relative p-4 sm:p-5 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  
                  {/* Icon section */}
                  <motion.div 
                    className="flex-shrink-0 flex justify-center sm:justify-start"
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      rotate: isHovered ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 
                        bg-gradient-to-br from-sky-100 to-sky-50 rounded-xl sm:rounded-2xl
                        border border-sky-300 shadow-inner">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                      </div>
                      
                      {/* Pulsing ring effect */}
                      <motion.div 
                        className="absolute -inset-1 bg-sky-200/50 rounded-xl sm:rounded-2xl -z-10"
                        animate={{
                          scale: isHovered ? [1, 1.2, 1] : 1,
                          opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
                        }}
                        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                      />
                    </div>
                  </motion.div>

                  {/* Content section */}
                  <div className="flex-grow space-y-2 text-center sm:text-left">
                    <motion.h3 
                      className="text-base sm:text-lg md:text-xl font-bold text-sky-900"
                      animate={{
                        x: isHovered ? 5 : 0,
                      }}
                    >
                      {cert.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-sky-700 font-semibold text-sm sm:text-base"
                      animate={{
                        opacity: isHovered ? 1 : 0.9,
                      }}
                    >
                      {cert.issuer}
                    </motion.p>
                    
                    {cert.credential && (
                      <motion.p 
                        className="text-gray-600 text-xs sm:text-sm flex items-center gap-1 justify-center sm:justify-start"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <span className="w-1 h-1 bg-sky-400 rounded-full" />
                        {cert.credential}
                      </motion.p>
                    )}
                  </div>

                  {/* Date section */}
                  <motion.div 
                    className="flex-shrink-0 text-center sm:text-right"
                    animate={{
                      y: isHovered ? -2 : 0,
                    }}
                  >
                    <div className="inline-block sm:block">
                      <span className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg 
                        text-xs sm:text-sm font-medium border border-sky-200
                        shadow-sm whitespace-nowrap">
                        {cert.date}
                      </span>
                    </div>
                    
                    {/* Animated indicator */}
                    <motion.div 
                      className="h-1 w-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full mt-2"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 1 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Commitment section */}
      <motion.div
        className="relative bg-gradient-to-br from-sky-50 via-white to-sky-50 
          p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl 
          border border-sky-300 shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-300/20 rounded-full blur-3xl" />
        
        <div className="relative">
          <motion.div 
            className="flex items-center gap-3 mb-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <FaAward className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
            <p className="text-base sm:text-lg font-semibold text-sky-800">
              Commitment to Learning
            </p>
          </motion.div>
          
          <motion.p 
            className="text-sm sm:text-base text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            I believe in continuous professional development. I actively pursue 
            certifications and stay updated with the latest industry trends and technologies.
          </motion.p>
        </div>

        {/* Animated progress bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-sky-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </div>
  );
}