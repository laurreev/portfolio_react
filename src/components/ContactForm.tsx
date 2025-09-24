'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTiktok, FaTelegram } from 'react-icons/fa';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const form = formRef.current;
    if (!form) return;
    
    const data = new FormData(form);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: data,
    });
    
    setSubmitting(false);
    
    if (res.ok) {
      setDialogOpen(true);
      form.reset();
    } else {
      alert("There was an error submitting the form. Please try again.");
    }
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

        {/* Display your email */}
        <motion.div
          className="text-center mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Get in touch with me directly:</p>
          <a 
            href="mailto:dlanor.dev@gmail.com"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            dlanor.dev@gmail.com
          </a>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
            Have a project in mind? Let's work together!
          </p>
          <div className="flex justify-center space-x-4">
            <motion.a
              href="https://facebook.com/sinnerdlei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FaFacebook size={24} />
            </motion.a>
            <motion.a
              href="https://instagram.com/sinnerdlei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors p-2 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FaInstagram size={24} />
            </motion.a>
            <motion.a
              href="https://tiktok.com/@sinnerdlei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FaTiktok size={24} />
            </motion.a>
            <motion.a
              href="https://t.me/sinnerdlei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors p-2 rounded-full hover:bg-sky-100 dark:hover:bg-sky-900/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FaTelegram size={24} />
            </motion.a>
          </div>
        </motion.div>
        
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
              name="Name"
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={submitting}
              placeholder="Your Full Name"
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
              Your Email Address
            </label>
            <motion.input
              type="email"
              id="email"
              name="Email"
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={submitting}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
              whileFocus={{ 
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                borderColor: "#3b82f6"
              }}
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            animate={focusedField === 'subject' ? 'focused' : 'unfocused'}
          >
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <motion.input
              type="text"
              id="subject"
              name="Subject"
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={submitting}
              placeholder="Subject of your message"
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
              name="Message"
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={submitting}
              rows={5}
              placeholder="Please enter your message here..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none"
              whileFocus={{ 
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                borderColor: "#3b82f6"
              }}
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={submitting}
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
              animate={submitting ? { scale: 2, opacity: 0 } : { scale: 0 }}
              transition={{ duration: 0.6 }}
              style={{ borderRadius: '50%', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            />
            
            <span className="relative z-10">
              {submitting ? 'Sending...' : 'Send Message'}
            </span>
          </motion.button>
        </form>

        {/* Success Dialog */}
        {dialogOpen && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 border border-blue-500 rounded-xl p-8 shadow-2xl flex flex-col items-center max-w-md mx-4"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.span 
                className="text-4xl mb-4 text-blue-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
              >
                ✅
              </motion.span>
              <motion.p 
                className="text-gray-900 dark:text-gray-100 mb-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your message has been submitted successfully.<br />
                Thank you for reaching out!<br />
                <span className="block mt-2 text-sm text-blue-600 dark:text-blue-400">
                  You will receive an automatic confirmation email shortly. Please check your inbox (and spam folder).
                </span>
              </motion.p>
              <motion.button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
                onClick={() => setDialogOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
