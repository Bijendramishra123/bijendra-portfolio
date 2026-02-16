'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useState } from 'react';

export function ProjectsCard() {
  const { projects } = resumeData;
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="h-full space-y-6 md:space-y-8 overflow-y-auto px-2 sm:px-4 scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-50">
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={titleVariants}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-800 mb-2">
          {projects.title}
        </h2>
        <p className="text-red-600/80 text-sm sm:text-base">
          Some of my recent and featured work
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.items.map((project, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden
              border border-red-200 hover:border-red-300
              shadow-lg hover:shadow-2xl
              transform hover:-translate-y-1
              transition-all duration-500 ease-out"
          >
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-red-400/5 via-transparent to-red-600/5"
              animate={{
                opacity: hoveredIndex === idx ? 0.15 : 0,
                scale: hoveredIndex === idx ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Content container */}
            <div className="relative p-4 sm:p-5 md:p-6">
              {/* Header section */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <motion.h3 
                  className="text-lg sm:text-xl md:text-2xl font-bold text-red-900"
                  animate={{
                    x: hoveredIndex === idx ? 5 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                
                <div className="flex gap-3 self-end sm:self-auto">
                  {project.repoUrl && project.repoUrl !== '#' && (
                    <motion.a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-700 transition-colors relative"
                      aria-label="View repository"
                      title="GitHub Repository"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                      <motion.span 
                        className="absolute -inset-2 bg-red-100 rounded-full -z-10"
                        initial={false}
                        animate={{ scale: hoveredIndex === idx ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.a>
                  )}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-700 transition-colors relative"
                    aria-label="View project"
                    title="Live Project"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <motion.span 
                      className="absolute -inset-2 bg-red-100 rounded-full -z-10"
                      initial={false}
                      animate={{ scale: hoveredIndex === idx ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                </div>
              </div>

              {/* Description */}
              <motion.p 
                className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed"
                animate={{
                  opacity: hoveredIndex === idx ? 1 : 0.9,
                }}
              >
                {project.description}
              </motion.p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                {project.technologies.map((tech, techIdx) => (
                  <motion.span
                    key={techIdx}
                    className="px-2 sm:px-3 py-1 bg-red-50 text-red-700 rounded-full 
                      text-xs sm:text-sm font-medium border border-red-200
                      hover:bg-red-100 hover:border-red-300 hover:scale-105
                      transition-all duration-300 cursor-default"
                    whileHover={{ 
                      y: -2,
                      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Highlights */}
              <motion.div 
                className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 pt-3 
                  border-t border-red-200"
                animate={{
                  borderColor: hoveredIndex === idx ? '#fecaca' : '#fee2e2',
                }}
              >
                {project.highlights.map((highlight, hIdx) => (
                  <motion.span 
                    key={hIdx} 
                    className="flex items-center gap-1"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.02 }}
                  >
                    <motion.span 
                      className="w-1.5 h-1.5 bg-red-500 rounded-full"
                      animate={{
                        scale: hoveredIndex === idx ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.3, delay: hIdx * 0.1 }}
                    />
                    {highlight}
                  </motion.span>
                ))}
              </motion.div>

              {/* Animated bottom border */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === idx ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Custom scrollbar styles - add to your global CSS */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #fee2e2;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #fca5a5;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #f87171;
        }
      `}</style>
    </div>
  );
}