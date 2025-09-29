'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaShieldAlt, FaMapMarkedAlt, FaTimes } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase, SiFlutter, SiDart, SiNodedotjs, SiGooglecloud } from 'react-icons/si';
import { IconType } from 'react-icons';
import { useState, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  icons: IconType[];
  github: string;
  demo: string;
  featured: boolean;
  highlights?: string[];
  isPrivate?: boolean;
}

const projects = [
  {
    id: 1,
    title: 'PhilSCA Ligtas - Campus Safety System',
    description: 'A mission-critical emergency response mobile application built for Philippine State College of Aeronautics. This comprehensive safety platform combines real-time communication, interactive mapping, and advanced admin controls to ensure campus-wide emergency preparedness and response coordination. [Private client project - code and demo unavailable for public viewing]',
    image: '/philsca.png',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Cloud', 'Real-time Database', 'Push Notifications'],
    icons: [SiFlutter, SiDart, SiFirebase, SiGooglecloud, FaShieldAlt, FaMapMarkedAlt],
    github: '#',
    demo: '#',
    featured: true,
    isPrivate: true,
    highlights: [
      'Real-time Emergency Roll Call system with automatic timeout and status tracking for 60+ users',
      'Interactive campus mapping with pinch-to-zoom, evacuation routes, and fire extinguisher locations',
      'Advanced admin dashboard with user management, bulk operations, and role-based access control',
      'Firebase Cloud Messaging for instant push notifications and background emergency alerts',
      'Automated backup system with scheduled data synchronization and recovery capabilities',
      'Comprehensive safety guides covering earthquakes, fires, typhoons, first aid, and CPR procedures'
    ]
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js, featuring interactive animations, smooth scrolling navigation, and responsive design optimized for all devices.',
    image: '/portfolio.png',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icons: [SiNextdotjs, SiReact, SiTypescript, SiTailwindcss],
    github: 'https://github.com/laurreev/portfolio_react',
    demo: 'https://dlanor.is-a.dev/',
    featured: true,
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with user authentication, payment processing, inventory management, and comprehensive admin dashboard.',
    image: '/',
    tags: ['React', 'Node.js', 'TypeScript', 'Firebase', 'Stripe API'],
    icons: [SiReact, SiNodedotjs, SiTypescript, SiFirebase],
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with location-based forecasts, interactive maps, and weather alerts using OpenWeather API.',
    image: '/',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeather API'],
    icons: [SiReact, SiTypescript, SiTailwindcss],
    github: '#',
    demo: '#',
    featured: false,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={() => setSelectedProject(project)}
    >
      {/* Project Image */}
      <div className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
        {project.image && project.image !== '/' ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain bg-white dark:bg-gray-100"
              onError={() => {
                // Image will fallback to the icon display below if it fails
                console.log(`Failed to load image: ${project.image}`);
              }}
            />
            <div className="absolute inset-0 hidden items-center justify-center">
              <div className="text-6xl text-blue-600/20 dark:text-blue-400/20">
                {(() => {
                  const IconComponent = project.icons[0];
                  return IconComponent ? <IconComponent /> : null;
                })()}
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl text-blue-600/20 dark:text-blue-400/20">
              {(() => {
                const IconComponent = project.icons[0];
                return IconComponent ? <IconComponent /> : null;
              })()}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Project Highlights */}
        {project.highlights && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Features:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {project.highlights.slice(0, project.featured && project.id === 1 ? 4 : 3).map((highlight, highlightIndex) => (
                <li key={highlightIndex} className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
              {project.highlights.length > (project.featured && project.id === 1 ? 4 : 3) && (
                <li className="flex items-start gap-2 text-blue-600 dark:text-blue-400">
                  <span className="mt-1">•</span>
                  <span className="text-xs font-medium">+{project.highlights.length - (project.featured && project.id === 1 ? 4 : 3)} more features</span>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Tech Stack Icons */}
        <div className="flex items-center gap-3 mb-4">
          {project.icons.map((Icon, iconIndex) => (
            <motion.div
              key={iconIndex}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="text-2xl text-gray-600 dark:text-gray-400" />
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {project.isPrivate ? (
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <FaShieldAlt className="text-orange-500" />
                <span className="text-sm font-medium">Private Client Project</span>
              </div>
            </div>
          ) : (
            <>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
                <span className="text-sm font-medium">Code</span>
              </motion.a>
              
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt />
                <span>Live Demo</span>
              </motion.a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Project Detail Modal
  const ProjectModal = () => (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              {selectedProject.image && selectedProject.image !== '/' ? (
                <div className="h-64 relative">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-contain bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20"
                  />
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                  <div className="text-8xl text-blue-600/30 dark:text-blue-400/30">
                    {(() => {
                      const IconComponent = selectedProject.icons[0];
                      return IconComponent ? <IconComponent /> : null;
                    })()}
                  </div>
                </div>
              )}
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[calc(90vh-16rem)] overflow-y-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedProject.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                {selectedProject.description}
              </p>

              {/* All Highlights */}
              {selectedProject.highlights && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Key Features & Highlights:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      >
                        <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Technologies Used:
                </h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  {selectedProject.icons.map((Icon, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <Icon className="text-3xl text-gray-600 dark:text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                {selectedProject.isPrivate ? (
                  <div className="flex items-center justify-center gap-3 text-gray-500 dark:text-gray-400 px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex-1">
                    <FaShieldAlt className="text-orange-500 text-xl" />
                    <span className="font-medium">Private Client Project - Code & Demo Unavailable</span>
                  </div>
                ) : (
                  <>
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 px-6 py-3 rounded-lg font-medium transition-colors flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="text-xl" />
                      <span>View Source Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="text-xl" />
                      <span>View Live Demo</span>
                    </motion.a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <ProjectModal />
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From mission-critical mobile applications to modern web platforms, here are some of the projects 
            that showcase my expertise in cross-platform development, real-time systems, and user-centered design.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Featured Projects
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Other Projects
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + featuredProjects.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
