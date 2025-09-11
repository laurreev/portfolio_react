'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Track active section only on home page
      if (pathname === '/') {
        const sections = ['skills', 'contact'];
        const scrollPosition = window.scrollY + 100; // Offset for navbar height
        
        let currentSection = '';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              currentSection = section;
              break;
            }
          }
        }
        
        // If we're at the top of the page, set to home
        if (window.scrollY < 300) {
          currentSection = 'home';
        }
        
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Set initial active section
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navItems = [
    { href: '/', label: 'Home', section: 'home' },
    { href: '/projects', label: 'Projects', section: null },
    { href: '#skills', label: 'Skills', section: 'skills' },
    { href: '#contact', label: 'Contact', section: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      scrollToSection(href.substring(1));
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (item: typeof navItems[0]) => {
    // For route-based navigation (Projects page)
    if (item.href.startsWith('/')) {
      return pathname === item.href;
    }
    
    // For section-based navigation on home page
    if (pathname === '/' && item.section) {
      return activeSection === item.section;
    }
    
    return false;
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Dlanor<span className="text-blue-600 dark:text-blue-400">.</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <motion.div key={item.href} whileHover={{ scale: 1.05 }}>
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item)
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item)
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.href.startsWith('#') ? (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
