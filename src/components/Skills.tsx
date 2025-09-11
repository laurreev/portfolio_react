'use client';

import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaCloud } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase, SiFlutter, SiDart } from 'react-icons/si';
import { useState } from 'react';

const skills = [
  { name: 'React.js', icon: FaReact, color: 'text-blue-500', bgColor: 'bg-blue-500' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-black dark:text-white', bgColor: 'bg-gray-800' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600', bgColor: 'bg-blue-600' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-600', bgColor: 'bg-green-600' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500', bgColor: 'bg-cyan-500' },
  { name: 'Firebase', icon: SiFirebase, color: 'text-orange-500', bgColor: 'bg-orange-500' },
  { name: 'Flutter', icon: SiFlutter, color: 'text-blue-400', bgColor: 'bg-blue-400' },
  { name: 'Dart', icon: SiDart, color: 'text-blue-600', bgColor: 'bg-blue-600' },
  { name: 'Database', icon: FaDatabase, color: 'text-gray-600', bgColor: 'bg-gray-600' },
  { name: 'Cloud', icon: FaCloud, color: 'text-blue-400', bgColor: 'bg-blue-400' },
];

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are the technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 10 }
              }}
            >
              {/* Animated background */}
              <motion.div
                className={`absolute inset-0 ${skill.bgColor} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              
              {/* Floating particles around hovered skill */}
              {hoveredIndex === index && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 ${skill.bgColor} rounded-full`}
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        x: Math.cos(i * 60 * Math.PI / 180) * 40,
                        y: Math.sin(i * 60 * Math.PI / 180) * 40,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                    />
                  ))}
                </>
              )}

              <motion.div
                animate={hoveredIndex === index ? { rotateY: 360 } : { rotateY: 0 }}
                transition={{ duration: 0.6 }}
              >
                <skill.icon className={`text-5xl ${skill.color} mx-auto mb-4`} />
              </motion.div>
              
              <motion.h3 
                className="text-lg font-semibold text-gray-900 dark:text-white"
                animate={hoveredIndex === index ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill.name}
              </motion.h3>

              {/* Skill level indicator */}
              <motion.div
                className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <motion.div
                  className={`h-full ${skill.bgColor} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${85 + Math.random() * 15}%` }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 1 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
