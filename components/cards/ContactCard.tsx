'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { useState } from 'react';
import { FaCheck, FaExclamationCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';

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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="h-full space-y-6 md:space-y-8 overflow-y-auto px-2 sm:px-4 
      scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-50
      bg-gradient-to-b from-white via-red-50/10 to-sky-50/10">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center md:text-left"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-100/20 rounded-full blur-2xl" />
        
        <div className="relative">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-sky-50 
              rounded-full mb-4 border border-red-200"
            whileHover={{ scale: 1.02 }}
          >
            <FaPaperPlane className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-700">Get in Touch</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gray-800">Let's </span>
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-sky-500 
              bg-clip-text text-transparent animate-gradient">
              Connect
            </span>
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto md:mx-0">
            {contact.description}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name & Email Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                <FaUser className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm 
                  border border-red-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent
                  transition-all duration-300 text-sm sm:text-base
                  shadow-sm hover:shadow-md"
              />
            </div>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm 
                  border border-red-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent
                  transition-all duration-300 text-sm sm:text-base
                  shadow-sm hover:shadow-md"
              />
            </div>
          </motion.div>

          {/* Subject Field */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
              <FaComment className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm 
                border border-red-200 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent
                transition-all duration-300 text-sm sm:text-base
                shadow-sm hover:shadow-md"
            />
          </motion.div>

          {/* Message Field */}
          <motion.div variants={itemVariants} className="relative group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm 
                border border-red-200 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent
                transition-all duration-300 resize-none text-sm sm:text-base
                shadow-sm hover:shadow-md"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-500 via-rose-500 to-sky-500 
                text-white py-3.5 rounded-xl font-semibold 
                shadow-md hover:shadow-xl transition-all duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed
                text-sm sm:text-base relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-sky-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 
                border border-green-200 text-green-800 rounded-xl text-sm sm:text-base"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheck className="w-4 h-4 text-green-600" />
              </div>
              <span>Message sent successfully! I'll get back to you soon.</span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-rose-50 
                border border-red-200 text-red-800 rounded-xl text-sm sm:text-base"
            >
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationCircle className="w-4 h-4 text-red-600" />
              </div>
              <span>Failed to send message. Please try again.</span>
            </motion.div>
          )}
        </motion.form>

        {/* Contact Info Sidebar */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Info Cards */}
          <div className="space-y-3">
            {/* Email */}
            <motion.div 
              className="group relative bg-white/60 backdrop-blur-sm p-5 rounded-xl 
                border border-red-100 hover:border-red-200 shadow-sm hover:shadow-md
                transition-all duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-100 
                  rounded-xl flex items-center justify-center group-hover:scale-110 
                  transition-transform duration-300">
                  <FaEnvelope className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                  <a 
                    href={`mailto:${personal.email}`} 
                    className="text-gray-700 hover:text-red-600 font-medium text-sm break-all transition-colors"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div 
              className="group relative bg-white/60 backdrop-blur-sm p-5 rounded-xl 
                border border-red-100 hover:border-red-200 shadow-sm hover:shadow-md
                transition-all duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-100 
                  rounded-xl flex items-center justify-center group-hover:scale-110 
                  transition-transform duration-300">
                  <FaPhone className="w-5 h-5 text-sky-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                  <a 
                    href={`tel:${personal.phone}`} 
                    className="text-gray-700 hover:text-sky-600 font-medium text-sm transition-colors"
                  >
                    {personal.phone}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div 
              className="group relative bg-white/60 backdrop-blur-sm p-5 rounded-xl 
                border border-red-100 hover:border-red-200 shadow-sm hover:shadow-md
                transition-all duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-100 
                  rounded-xl flex items-center justify-center group-hover:scale-110 
                  transition-transform duration-300">
                  <FaMapMarkerAlt className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                  <p className="text-gray-700 font-medium text-sm">{personal.location}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Links Card */}
          <motion.div 
            className="bg-gradient-to-br from-red-50/50 to-sky-50/50 
              backdrop-blur-sm p-5 rounded-xl border border-red-100"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-sky-500 rounded-full" />
              Connect with me
            </h3>
            <div className="flex gap-3">
              {contact.social.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center
                    text-gray-600 hover:text-white shadow-sm
                    hover:bg-gradient-to-r hover:from-red-500 hover:to-sky-500
                    transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.name === 'GitHub' && <FaEnvelope className="w-4 h-4" />}
                  {social.name === 'LinkedIn' && <FaEnvelope className="w-4 h-4" />}
                  {social.name === 'Email' && <FaEnvelope className="w-4 h-4" />}
                  <span className="text-xs font-medium">{social.name[0]}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Availability Note */}
          <motion.div 
            className="text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-gray-400">
              Typically responds within 24 hours
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}