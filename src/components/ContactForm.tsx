'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContactForm, ContactFormData } from '@/lib/contact';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const result = await submitContactForm(formData);
    
    if (result.success) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    },
    unfocused: {
      scale: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))",
            "linear-gradient(225deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))",
            "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10">
        <motion.h2 
          className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Contact Me
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            variants={inputVariants}
            animate={focusedField === 'name' ? 'focused' : 'unfocused'}
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
              whileFocus={{ 
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                borderColor: "#3b82f6"
              }}
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            animate={focusedField === 'email' ? 'focused' : 'unfocused'}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
              whileFocus={{ 
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                borderColor: "#3b82f6"
              }}
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            animate={focusedField === 'message' ? 'focused' : 'unfocused'}
          >
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none"
              whileFocus={{ 
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                borderColor: "#3b82f6"
              }}
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 relative overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0.3 }}
              animate={isSubmitting ? { scale: 2, opacity: 0 } : { scale: 0 }}
              transition={{ duration: 0.6 }}
              style={{ borderRadius: '50%', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            />
            
            <span className="relative z-10">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: submitStatus !== 'idle' ? 1 : 0,
              scale: submitStatus !== 'idle' ? 1 : 0.8
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {submitStatus === 'success' && (
              <p className="text-green-600 text-center font-medium">Message sent successfully! ✨</p>
            )}
            
            {submitStatus === 'error' && (
              <p className="text-red-600 text-center font-medium">Failed to send message. Please try again.</p>
            )}
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
