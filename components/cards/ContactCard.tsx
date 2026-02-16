'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { useState } from 'react';
import { FaCheck, FaExclamationCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactCard() {
  const { contact, personal } = resumeData;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '714191bb-2229-49c9-82d7-a61acc2a70f3',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
    <div className="h-full space-y-6 md:space-y-8 overflow-y-auto px-2 sm:px-4 
      scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-50">
      
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-800 mb-2">
          {contact.title}
        </h2>
        <p className="text-orange-600/80 text-sm sm:text-base">{contact.description}</p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/70 border border-orange-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300
              text-sm sm:text-base"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/70 border border-orange-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300
              text-sm sm:text-base"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/70 border border-orange-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300
              text-sm sm:text-base"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-white/70 border border-orange-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 
              resize-none text-sm sm:text-base"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 
              rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
              shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-100 text-green-800 rounded-lg text-sm sm:text-base"
          >
            <FaCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Message sent successfully! I'll get back to you soon.</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-red-100 text-red-800 rounded-lg text-sm sm:text-base"
          >
            <FaExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Failed to send message. Please try again.</span>
          </motion.div>
        )}
      </motion.form>

      {/* Contact Info - FIXED VERSION */}
      <motion.div
        className="flex flex-col sm:grid sm:grid-cols-2 gap-4 pt-4 border-t border-orange-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Email */}
        <div className="flex items-center gap-3 p-3 bg-orange-50/50 rounded-lg hover:bg-orange-100/50 transition-colors duration-300">
          <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <FaEnvelope className="w-4 h-4 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <a 
              href={`mailto:${personal.email}`} 
              className="text-orange-600 hover:text-orange-700 font-medium text-sm break-all"
            >
              {personal.email}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 p-3 bg-orange-50/50 rounded-lg hover:bg-orange-100/50 transition-colors duration-300">
          <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <FaPhone className="w-4 h-4 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-1">Phone</p>
            <a 
              href={`tel:${personal.phone}`} 
              className="text-orange-600 hover:text-orange-700 font-medium text-sm"
            >
              {personal.phone}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}