'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';

export function SkillsCard() {
  const { skills } = resumeData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="h-full space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{skills.title}</h2>
        <p className="text-gray-600">Technologies and tools I work with</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.categories.map((category, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-green-200 hover:border-green-400 transition-colors duration-300"
          >
            <h3 className="text-lg font-bold text-green-900 mb-4">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIdx) => (
                <motion.span
                  key={skillIdx}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-700 leading-relaxed">
          I'm constantly learning and adapting to new technologies. My approach combines deep technical knowledge with practical problem-solving skills to deliver efficient, scalable solutions.
        </p>
      </motion.div>
    </div>
  );
}
