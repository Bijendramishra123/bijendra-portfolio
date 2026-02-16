'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

export function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const socialLinks = [
    { 
      icon: FaGithub, 
      url: 'https://github.com', 
      label: 'GitHub',
      color: 'text-gray-800',
      hoverColor: 'hover:text-gray-900',
      bgColor: 'bg-gray-100',
      hoverBg: 'hover:bg-gray-200'
    },
    { 
      icon: FaLinkedin, 
      url: 'https://linkedin.com', 
      label: 'LinkedIn',
      color: 'text-blue-600',
      hoverColor: 'hover:text-blue-700',
      bgColor: 'bg-blue-100',
      hoverBg: 'hover:bg-blue-200'
    },
    { 
      icon: FaTwitter, 
      url: 'https://twitter.com', 
      label: 'Twitter',
      color: 'text-sky-500',
      hoverColor: 'hover:text-sky-600',
      bgColor: 'bg-sky-100',
      hoverBg: 'hover:bg-sky-200'
    },
    { 
      icon: FaEnvelope, 
      url: 'mailto:bijendra@example.com', 
      label: 'Email',
      color: 'text-red-500',
      hoverColor: 'hover:text-red-600',
      bgColor: 'bg-red-100',
      hoverBg: 'hover:bg-red-200'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-white/90 shadow-lg border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 sm:py-5">
          
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-600 order-2 sm:order-1"
          >
            <span>© 2024 Bijendra Mishra.</span>
            <span className="hidden sm:inline">All rights reserved.</span>
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="inline-block text-red-500"
            >
              <FaHeart className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 sm:gap-4 md:gap-5 order-1 sm:order-2"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const isHovered = hoveredIcon === social.label;
              
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.2,
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => setHoveredIcon(social.label)}
                  onHoverEnd={() => setHoveredIcon(null)}
                  aria-label={social.label}
                >
                  {/* Background circle with glow effect */}
                  <motion.div 
                    className={`absolute -inset-2 ${social.bgColor} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md`}
                    animate={{
                      scale: isHovered ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon container */}
                  <div className={`relative p-2 sm:p-2.5 md:p-3 rounded-xl bg-white shadow-md 
                    group-hover:shadow-xl transition-all duration-300 border border-gray-100
                    group-hover:border-transparent`}
                  >
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${social.color} 
                      group-hover:scale-110 transition-all duration-300`} />
                  </div>

                  {/* Tooltip */}
                  <motion.span 
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                      px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ 
                      y: isHovered ? 0 : 5,
                      opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {social.label}
                  </motion.span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Decorative bottom gradient line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </div>
    </footer>
  );
}