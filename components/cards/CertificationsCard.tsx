'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { FaAward, FaGraduationCap } from 'react-icons/fa';

export function CertificationsCard() {
  const { certifications } = resumeData;

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

  const isEducation = (issuer: string) => issuer.toLowerCase().includes('university');

  return (
    <div className="h-full space-y-8 overflow-y-auto pr-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{certifications.title}</h2>
        <p className="text-gray-600">Qualifications, certificates, and educational background</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {certifications.items.map((cert, idx) => {
          const Icon = isEducation(cert.issuer) ? FaGraduationCap : FaAward;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-purple-900">{cert.title}</h3>
                <p className="text-purple-700 font-semibold text-sm">{cert.issuer}</p>
                <p className="text-gray-600 text-sm mt-1">{cert.credential}</p>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="text-sm font-semibold text-gray-700">{cert.date}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-700 font-semibold mb-2">Commitment to Learning</p>
        <p className="text-gray-600 leading-relaxed">
          I believe in continuous professional development. I actively pursue certifications and stay updated with the latest industry trends and technologies.
        </p>
      </motion.div>
    </div>
  );
}
