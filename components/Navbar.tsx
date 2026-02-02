'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b border-white/5"
          style={{
            backgroundColor: 'rgba(4, 7, 11, 0.75)',
          }}
        >
          {/* Brand */}
          <div className="flex-1">
            <Link href="/" className="text-xl font-light tracking-widest text-white/90 font-serif uppercase">
              Pashmina
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-10 text-sm font-light tracking-wide text-white/70">
            {['Heritage', 'Craft', 'Material', 'Designs', 'Details'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white disabled:transition-all group-hover:w-full duration-300" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex-1 flex justify-end">
            <button className="px-5 py-2 text-xs uppercase tracking-widest font-medium text-white/90 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:scale-105 duration-300 backdrop-blur-sm">
              Explore Collection
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
