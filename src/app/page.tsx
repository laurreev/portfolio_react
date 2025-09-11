'use client';

import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import ContactForm from '@/components/ContactForm';
import CustomCursor from '@/components/CustomCursor';
import ParticleSystem from '@/components/ParticleSystem';
import FloatingActions from '@/components/FloatingActions';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <CustomCursor />
      <ParticleSystem mousePosition={mousePosition} />
      <FloatingActions />
      <main className="min-h-screen">
        <Hero />
        <Skills />
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Have a project in mind? Let&apos;s work together!
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
