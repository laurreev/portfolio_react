'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
      <div className="absolute w-48 h-48 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 xs:opacity-20 top-10 xs:top-20 left-5 xs:left-20" />
      <div className="absolute w-40 h-40 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 xs:opacity-20 bottom-10 xs:bottom-20 right-5 xs:right-20" />

      <div className="text-center px-4 sm:px-6 lg:px-8 z-10 relative max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
            className="mb-6 xs:mb-8"
          >
            <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto">
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  rotate: { duration: 0.6 }
                }}
                className="w-full h-full"
              >
                <Image
                  src="/profile.jpg"
                  alt="Dlanor Domingo"
                  width={160}
                  height={160}
                  priority
                  quality={60}
                  sizes="(max-width: 475px) 96px, (max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
                  className="w-full h-full rounded-full object-cover shadow-2xl ring-4 ring-blue-500/20 dark:ring-blue-400/30"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAcEAABBAMBAAAAAAAAAAAAAAABAAIDBAUREiH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABwRAAEEAwEAAAAAAAAAAAAAAAEAAgMEERIhQf/aAAwDAQACEQMRAD8Aqw5usV+fh7mOdHXhzQZnbPx2u8+THq8rQVyMKNBJSR0YlYSm6N2HIRHjG5DX4L82Py/AAu8+THqNZPAQ9ZTaB2HIRHjL//2Q=="
                  loading="eager"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 cursor-pointer px-2"
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
            className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            Full Stack Developer & Mobile App Developer passionate about creating amazing web and mobile experiences with modern technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center space-x-3 xs:space-x-4 sm:space-x-6 mb-6 sm:mb-8"
          >
            <MagneticButton
              href="https://github.com/laurreev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 xs:p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
            >
              <FaGithub size={24} className="xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
            </MagneticButton>
            <MagneticButton
              href="https://linkedin.com/in/dlanordev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 xs:p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
            >
              <FaLinkedin size={24} className="xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
            </MagneticButton>
            <MagneticButton
              href="https://twitter.com/sinnerdlei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 xs:p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
            >
              <FaTwitter size={24} className="xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
            </MagneticButton>
            <MagneticButton
              href="mailto:dlanor.dev@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 xs:p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
            >
              <FaEnvelope size={24} className="xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col xs:flex-row gap-3 xs:gap-4 items-center justify-center px-4"
          >
            <Link href="#projects" className="w-full xs:w-auto">
              <motion.button 
                className="w-full xs:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 xs:py-3 px-6 xs:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base"
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
              className="w-full xs:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2.5 xs:py-3 px-6 xs:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base"
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
