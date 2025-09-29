'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
        // Track active section only on home page
        if (pathname === '/') {
          const sections = ['skills', 'projects', 'contact'];
          const scrollPosition = window.scrollY + 100; // Offset for navbar height        
          let currentSection = 'home'; // Default to home
        
        // Check if we're in any specific section
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
        
        // If we're at the very top of the page, show home as active
        if (window.scrollY < 200) {
          currentSection = 'home';
        }
        
        // Update URL hash if section changed
        if (currentSection !== activeSection) {
          const newUrl = currentSection === 'home' ? '/' : `/#${currentSection}`;
          window.history.replaceState(null, '', newUrl);
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
    { href: '#home', label: 'Home', section: 'home' },
    { href: '#skills', label: 'Skills', section: 'skills' },
    { href: '#projects', label: 'Projects', section: 'projects' },
    { href: '#contact', label: 'Contact', section: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    console.log('scrollToSection called with:', sectionId);
    console.log('Current pathname:', pathname);
    
    if (pathname !== '/') {
      console.log('Not on home page, redirecting...');
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Special case for home - scroll to top smoothly
    if (sectionId === 'home') {
      console.log('Scrolling to top...');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(sectionId);
    console.log('Found element for', sectionId, ':', element);
    
    if (element) {
      console.log('Scrolling to element...');
      // Add offset for navbar height
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({ 
        top: elementPosition, 
        behavior: 'smooth' 
      });
    } else {
      console.error('Element not found with ID:', sectionId);
      // List all elements with IDs for debugging
      const allElementsWithId = document.querySelectorAll('[id]');
      console.log('Available elements with IDs:', Array.from(allElementsWithId).map(el => el.id));
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      scrollToSection(href.substring(1));
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (item: typeof navItems[0]) => {
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
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 xs:h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3"
          >
            <Link
              href="/"
              className="flex items-center space-x-3"
            >
              {/* Profile Image in Navbar */}
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  rotate: { duration: 0.4 }
                }}
                className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10"
              >
                <Image
                  src="/profile.jpg"
                  alt="Dlanor Domingo"
                  width={40}
                  height={40}
                  quality={60}
                  sizes="(max-width: 475px) 32px, (max-width: 640px) 36px, 40px"
                  className="rounded-full object-cover ring-2 ring-blue-500/20 dark:ring-blue-400/30"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+hBOEdwAwAO6j/2Q=="
                />
              </motion.div>
              <span className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Dlanor<span className="text-blue-600 dark:text-blue-400"></span>
              </span>
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
        style={{ overflow: 'hidden' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.href.startsWith('#') ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Mobile menu item clicked:', item.href);
                    
                    // Close menu first
                    setIsMobileMenuOpen(false);
                    
                    // Add a small delay to let the menu close animation complete
                    setTimeout(() => {
                      if (item.href.startsWith('#')) {
                        const sectionId = item.href.substring(1);
                        console.log('Calling scrollToSection with:', sectionId);
                        scrollToSection(sectionId);
                      }
                    }, 10);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer touch-manipulation ${
                    isActive(item)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => {
                    console.log('Mobile menu link clicked:', item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer touch-manipulation ${
                    isActive(item)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}
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
