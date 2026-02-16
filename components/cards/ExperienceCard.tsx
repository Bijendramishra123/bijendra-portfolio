'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';

export function ExperienceCard() {
  const { experience } = resumeData;

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
    <div className="h-full space-y-8 overflow-y-auto pr-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{experience.title}</h2>
        <p className="text-gray-600">My professional journey and experiences</p>
      </motion.div>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experience.jobs.map((job, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="border-l-4 border-pink-400 bg-white/60 backdrop-blur-sm p-6 rounded-r-xl hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-pink-900">{job.role}</h3>
                <p className="text-pink-700 font-semibold">{job.company}</p>
              </div>
              <div className="text-sm text-gray-600 mt-2 md:mt-0 md:text-right">
                <p className="font-semibold">{job.duration}</p>
                <p className="text-gray-500">{job.location}</p>
              </div>
            </div>

            <ul className="space-y-2 mt-4">
              {job.responsibilities.map((responsibility, respIdx) => (
                <li key={respIdx} className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-pink-600 font-bold mt-1">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-700 font-semibold mb-2">Looking for new opportunities</p>
        <p className="text-gray-600 leading-relaxed">
          I'm always interested in learning and collaborating with innovative teams. Let's discuss how I can contribute to your project.
        </p>
      </motion.div>
    </div>
  );
}
