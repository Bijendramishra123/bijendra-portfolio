'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export function ProjectsCard() {
  const { projects } = resumeData;

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="h-full space-y-8 overflow-y-auto pr-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{projects.title}</h2>
        <p className="text-gray-600">Some of my recent and featured work</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.items.map((project, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-yellow-900">{project.title}</h3>
              <div className="flex gap-3">
                {project.repoUrl && project.repoUrl !== '#' && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-700 transition-colors"
                    aria-label="View repository"
                    title="GitHub Repository"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-700 transition-colors"
                  aria-label="View project"
                  title="Live Project"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-gray-600 pt-3 border-t border-yellow-200">
              {project.highlights.map((highlight, hIdx) => (
                <span key={hIdx} className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
