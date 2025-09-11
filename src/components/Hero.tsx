'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const MagneticButton = ({ 
    children, 
    href, 
    className, 
    ...props 
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    target?: string;
    rel?: string;
  }) => {
    const buttonRef = useRef<HTMLAnchorElement>(null);

    return (
      <motion.a
        ref={buttonRef}
        href={href}
        className={className}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Static background orbs for visual appeal */}
      <div className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 top-20 left-20" />
      <div className="absolute w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 bottom-20 right-20" />

      <div className="text-center px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Hi, I&apos;m{' '}
            <motion.span 
              className="text-blue-600 dark:text-blue-400"
              animate={{ 
                textShadow: [
                  "0px 0px 0px rgba(59, 130, 246, 0)",
                  "0px 0px 20px rgba(59, 130, 246, 0.5)",
                  "0px 0px 0px rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Dlanor Domingo
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Full Stack Developer & Designer passionate about creating amazing web and mobileexperiences
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center space-x-6 mb-8"
          >
            <MagneticButton
              href="https://github.com/laurreev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
            >
              <FaGithub size={32} />
            </MagneticButton>
            <MagneticButton
              href="https://linkedin.com/in/dlanordev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
            >
              <FaLinkedin size={32} />
            </MagneticButton>
            <MagneticButton
              href="https://twitter.com/sinnerdlei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
            >
              <FaTwitter size={32} />
            </MagneticButton>
            <MagneticButton
              href="mailto:dlanor.dev@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
            >
              <FaEnvelope size={32} />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="space-x-4"
          >
            <Link href="/projects">
              <motion.button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
            </Link>
            <motion.button 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
