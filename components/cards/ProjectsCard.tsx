'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaExternalLinkAlt, FaGithub, FaStar, FaCodeBranch, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

export function ProjectsCard() {
  const { projects } = resumeData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedDesc, setExpandedDesc] = useState<number | null>(null);

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
        damping: 15,
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

  // Mock stats for each project (you can customize)
  const getProjectStats = (idx: number) => {
    const stats = [
      { stars: 12, forks: 5, likes: 8 },
      { stars: 8, forks: 3, likes: 6 },
      { stars: 15, forks: 7, likes: 10 },
      { stars: 5, forks: 2, likes: 4 },
      { stars: 20, forks: 10, likes: 15 },
      { stars: 10, forks: 4, likes: 7 },
    ];
    return stats[idx % stats.length];
  };

  return (
    <div className="h-full space-y-6 md:space-y-8 overflow-y-auto px-2 sm:px-4 
      scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-50
      bg-gradient-to-b from-white via-red-50/20 to-sky-50/20">
      
      {/* Header Section with Stats */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={titleVariants}
        className="relative"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-100/30 rounded-full blur-3xl" />
        
        <div className="relative text-center md:text-left">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-sky-50 
              rounded-full mb-4 border border-red-200"
            whileHover={{ scale: 1.02 }}
          >
            <FaCodeBranch className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-700">Portfolio</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gray-800">Featured </span>
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-sky-500 
              bg-clip-text text-transparent animate-gradient">
              Projects
            </span>
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto md:mx-0">
            A showcase of my recent work, side projects, and open source contributions.
            {projects.items.length}+ projects completed with modern tech stacks.
          </p>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.items.map((project, idx) => {
          const stats = getProjectStats(idx);
          const isExpanded = expandedDesc === idx;
          const descLimit = 120;
          const needExpand = project.description.length > descLimit;
          const displayDesc = isExpanded ? project.description : project.description.slice(0, descLimit);

          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden
                border border-red-100 hover:border-red-200
                shadow-md hover:shadow-xl
                transform hover:-translate-y-1.5
                transition-all duration-500 ease-out"
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-sky-50"
                animate={{
                  opacity: hoveredIndex === idx ? 1 : 0,
                  scale: hoveredIndex === idx ? 1 : 0.95,
                }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Content */}
              <div className="relative p-5 md:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <motion.div 
                      className="flex items-center gap-2 mb-2"
                      animate={{
                        x: hoveredIndex === idx ? 5 : 0,
                      }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-500 
                        rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-bold">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                        {project.title}
                      </h3>
                    </motion.div>
                    
                    {/* Project Stats */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 ml-10">
                      <span className="flex items-center gap-1">
                        <FaStar className="w-3 h-3 text-yellow-500" />
                        {stats.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCodeBranch className="w-3 h-3 text-gray-500" />
                        {stats.forks}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaHeart className="w-3 h-3 text-red-400" />
                        {stats.likes}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 self-end sm:self-auto">
                    {project.repoUrl && project.repoUrl !== '#' && (
                      <motion.a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group/btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-red-100 rounded-full blur-md opacity-0 
                          group-hover/btn:opacity-100 transition-opacity" />
                        <FaGithub className="relative w-5 h-5 text-gray-600 
                          group-hover/btn:text-red-600 transition-colors" />
                      </motion.a>
                    )}
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group/btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-sky-100 rounded-full blur-md opacity-0 
                        group-hover/btn:opacity-100 transition-opacity" />
                      <FaExternalLinkAlt className="relative w-4 h-4 text-gray-600 
                        group-hover/btn:text-sky-600 transition-colors" />
                    </motion.a>
                  </div>
                </div>

                {/* Description with Read More */}
                <motion.div 
                  className="mb-4"
                  animate={{
                    opacity: hoveredIndex === idx ? 1 : 0.9,
                  }}
                >
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {displayDesc}
                    {needExpand && (
                      <button
                        onClick={() => setExpandedDesc(isExpanded ? null : idx)}
                        className="ml-2 text-red-500 hover:text-red-600 font-medium text-xs 
                          transition-colors focus:outline-none"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </p>
                </motion.div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 6).map((tech, techIdx) => (
                    <motion.span
                      key={techIdx}
                      className="px-2.5 py-1 bg-gradient-to-r from-gray-50 to-gray-100 
                        text-gray-700 rounded-lg text-xs font-medium 
                        border border-gray-200 hover:border-red-200
                        hover:bg-gradient-to-r hover:from-red-50 hover:to-sky-50
                        transition-all duration-300 cursor-default shadow-sm"
                      whileHover={{ 
                        y: -2,
                        scale: 1.02,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs">
                      +{project.technologies.length - 6} more
                    </span>
                  )}
                </div>

                {/* Highlights as Tags */}
                <motion.div 
                  className="flex flex-wrap gap-2 pt-3 border-t border-gray-100"
                  animate={{
                    borderColor: hoveredIndex === idx ? '#fecaca' : '#f3f4f6',
                  }}
                >
                  {project.highlights.slice(0, 3).map((highlight, hIdx) => (
                    <motion.span 
                      key={hIdx} 
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 
                        bg-red-50/50 rounded-full text-xs text-red-600"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {highlight}
                    </motion.span>
                  ))}
                  {project.highlights.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{project.highlights.length - 3} more
                    </span>
                  )}
                </motion.div>

                {/* Tech Stack Summary Bar */}
                <motion.div 
                  className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden"
                  animate={{
                    backgroundColor: hoveredIndex === idx ? '#fee2e2' : '#f3f4f6',
                  }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-400 to-sky-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: hoveredIndex === idx ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>

                {/* Animated border */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 via-rose-400 to-sky-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* View More Button */}
      <motion.div
        className="text-center pt-4 pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.a
          href="https://github.com/Bijendramishra123"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r 
            from-red-500 to-rose-500 text-white rounded-xl font-medium
            shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub className="w-4 h-4" />
          View All Projects on GitHub
          <FaExternalLinkAlt className="w-3 h-3" />
        </motion.a>
      </motion.div>
    </div>
  );
}