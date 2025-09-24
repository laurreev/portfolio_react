'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase, SiFlutter, SiDart, SiNodedotjs } from 'react-icons/si';

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js, featuring interactive animations, dark mode support, and Firebase integration.',
    image: '/project-portfolio.jpg', // You can add actual images later
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    icons: [SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFirebase],
    github: 'https://github.com/laurreev/portfolio_react',
    demo: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.',
    image: '/project-ecommerce.jpg',
    tags: ['React', 'Node.js', 'TypeScript', 'Firebase'],
    icons: [SiReact, SiNodedotjs, SiTypescript, SiFirebase],
    github: '#',
    demo: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Mobile Task Manager',
    description: 'Cross-platform mobile app for task management with offline support and cloud synchronization.',
    image: '/project-mobile.jpg',
    tags: ['Flutter', 'Dart', 'Firebase'],
    icons: [SiFlutter, SiDart, SiFirebase],
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with location-based forecasts and interactive maps.',
    image: '/project-weather.jpg',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    icons: [SiReact, SiTypescript, SiTailwindcss],
    github: '#',
    demo: '#',
    featured: false,
  },
];

export default function Projects() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ y: -10 }}
    >
      {/* Project Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-blue-600/20 dark:text-blue-400/20">
            {(() => {
              const IconComponent = project.icons[0];
              return IconComponent ? <IconComponent /> : null;
            })()}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>

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
        </div>
      </div>
    </motion.div>
  );

  return (
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
            Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge 
            and an opportunity to learn something new.
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
  );
}
