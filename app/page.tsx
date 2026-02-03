'use client';

import Navbar from '../components/Navbar';
import ScrollyCanvas from '../components/ScrollyCanvas';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Home() {
  return (
    <main className="bg-[#04070B] min-h-screen">
      <Navbar />

      <ScrollyCanvas>

        {/* HERO / INTRO (0-15%) */}
        <section className="absolute top-0 w-full h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-serif text-white/92 tracking-tight mb-6">
              Pure Cashmere Pashmina
            </h1>
            <p className="text-xl md:text-2xl text-white/65 font-light tracking-wide max-w-2xl mx-auto">
              Crafted by hand. Designed to be felt.<br />
              <span className="text-sm uppercase tracking-[0.2em] mt-4 block opacity-60">From the highlands of Pakistan</span>
            </p>
          </motion.div>
        </section>

        {/* HERITAGE (25%) */}
        <section className="absolute top-[25%] w-full h-screen flex items-center px-8 md:px-24 pointer-events-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-20%" }}
            variants={fadeInUp}
            className="max-w-xl text-left"
          >
            <span className="text-blue-400/80 uppercase tracking-widest text-xs font-bold mb-4 block">Heritage</span>
            <h2 className="text-5xl md:text-6xl font-serif text-white/90 mb-6 leading-tight">
              Rooted in centuries <br />of craftsmanship.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed space-y-4">
              <span className="block">Handwoven in Pakistan using time-honored techniques passed down through generations.</span>
              <span className="block">Every shawl tells a story of patience, skill, and an enduring legacy that refuses to compromise on quality.</span>
            </p>
          </motion.div>
        </section>

        {/* MATERIAL (50%) */}
        <section className="absolute top-[50%] w-full h-screen flex items-center justify-end px-8 md:px-24 pointer-events-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-20%" }}
            variants={fadeInUp}
            className="max-w-xl text-right"
          >
            <span className="text-cyan-400/80 uppercase tracking-widest text-xs font-bold mb-4 block">Material</span>
            <h2 className="text-5xl md:text-6xl font-serif text-white/90 mb-6 leading-tight">
              Pure Cashmere. <br />Nothing else.
            </h2>
            <ul className="text-lg text-white/60 leading-relaxed space-y-2 inline-block text-right">
              <li className="flex items-center justify-end gap-3">
                <span>Ultra-fine natural fibers</span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <span>Breathable, lightweight warmth</span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <span>Exceptionally soft hand feel</span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              </li>
            </ul>
          </motion.div>
        </section>

        {/* COLOR (75%) */}
        <section className="absolute top-[75%] w-full h-screen flex items-center justify-center px-6 pointer-events-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-20%" }}
            variants={fadeInUp}
            className="max-w-3xl text-center bg-black/20 backdrop-blur-sm p-12 rounded-2xl border border-white/5"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 uppercase tracking-widest text-xs font-bold mb-4 block">Aesthetic</span>
            <h2 className="text-5xl md:text-6xl font-serif text-white/90 mb-6">
              Designed in blues that captivate.
            </h2>
            <p className="text-xl text-white/60 leading-normal">
              Contrastive, modern palettes inspired by night skies and winter light.
              Elegant, bold, and unmistakably refined.
            </p>
          </motion.div>
        </section>

        {/* FINAL DRAPE (90-95%) */}
        <section className="absolute top-[92%] w-full h-[80vh] flex flex-col items-center justify-center text-center px-6 pointer-events-auto pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-10%" }}
            variants={fadeInUp}
            className="max-w-2xl"
          >
            <h2 className="text-6xl font-serif text-white mb-6">Luxury you can feel.</h2>
            <p className="text-xl text-white/70 mb-10">Pure Cashmere Pashmina — timeless, effortless, enduring.</p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="px-10 py-4 bg-white text-black text-sm uppercase tracking-widest font-semibold hover:bg-gray-200 transition-colors duration-300">
                Explore The Collection
              </button>
              <button className="px-10 py-4 border border-white/20 text-white text-sm uppercase tracking-widest font-semibold hover:bg-white/5 transition-colors duration-300">
                View Details
              </button>
            </div>
          </motion.div>
        </section>

      </ScrollyCanvas>

      {/* Footer / Contact (Below the scroll canvas to finish the page) */}
      <footer className="bg-[#020305] text-white/40 py-12 text-center text-xs tracking-widest border-t border-white/5">
        <p>&copy; 2024 PASHMINA LUXURY. CRAFTED IN PAKISTAN.</p>
      </footer>
    </main>
  );
}
