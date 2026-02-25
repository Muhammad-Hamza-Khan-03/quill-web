import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  PenTool,
} from 'lucide-react';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/formatters';
import Image from 'next/image';


interface HomePageProps {
  onExplore: () => void;
  onSelectProduct: (product: Product) => void;
  onPageChange: (page: any) => void;
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
}

export default function HomePage({ onExplore, onSelectProduct, onPageChange, products, loading, onAddToCart }: HomePageProps) {
  const newArrivals = Array.isArray(products) ? products.slice(0, 4) : [];

  const getProductImage = (product: Product) => {
    return product.variations && product.variations.length > 0
      ? product.variations[0].image_url
      : 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=400&auto=format&fit=crop';
  };

  return (
    <div className="snap-container">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden snap-section">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/20 via-transparent to-luxury-black z-10"></div>
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgW-5Y4Wjl4fzPTEpVIMazV6KIrDNsnB9yPsudBiJJy7EWQd4Bh0YWtuaqyHXKVdyuXoBesnG1w24NRESa_uaNAlr6zE-Zu30MOVmdH6uKScCFYlD4Y_qnU2aoGfvxQQnzqsVWROrVxN3r71s8T2Ku8VXG_HODegjLFGfUdN_aDutNXHCWVT98Wmd_H6hagKhZPc69i524h7x6oODOWlAVZvdu6hXN9cyM23-e-vHxjec4F4daTotLXbsx6poJgxLIKuMTYQxYavc"
            alt="Cinematic Pashmina Texture"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.4em] mb-6 text-luxury-blue font-bold"
          >
            Est. 18th Century Craftsmanship
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-tight text-white"
          >
            The Art of <br />
            <span className="italic font-normal">Elegance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-light text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the pinnacle of Himalayan craftsmanship with our hand-woven pashmina collection, where tradition meets timeless luxury.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={onExplore}
              className="bg-luxury-blue hover:bg-blue-600 text-white px-10 py-4 rounded-lg font-bold tracking-wider uppercase text-xs transition-all hover:scale-105 active:scale-95"
            >
              Explore Collection
            </button>
            <button
              onClick={() => onPageChange('about')}
              className="border border-white/20 hover:bg-white/10 text-white px-10 py-4 rounded-lg font-bold tracking-wider uppercase text-xs transition-all"
            >
              Our Story
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-slate-500">
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-32 px-6 snap-section bg-luxury-black">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-luxury-blue/10 rounded-xl blur-2xl group-hover:bg-luxury-blue/20 transition-all"></div>
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPX2R8W56HAMazZAbv0KxbCLKaTnbyvOMkkkGF_C1RXoXF7xLVjCcwPRcdb5C6GHL0xESs46lQTmIGGy_JMcspw0ZhtEc4zT7TZ345URXtxP-km1I43muI_AvLlEsPj7y92kg9fO8KAUGDs5B2HP0tk-AaFuXXqdNCi7lYRV5_FI9dPdCDRBBmk95RPM1HTQi82KPegyrlfcKNKFAGduJcx_DxnNz8DqVi-KuroL78BvfoJa-s_jOic80XJHj2Ee3Vicjs5c0cv3M"
              alt="The Weaver"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="relative rounded-xl object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight text-white">
              A Legacy Spun <br /><span className="italic text-luxury-blue">in Gold</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Born in the high altitudes of the Himalayas, each Pashmina Luxury piece tells a story of centuries-old weaving traditions passed through generations. We source only the finest undercoat fibers from the Changthangi goat, ensuring a softness that is incomparable to any other textile.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-luxury-blue shrink-0" />
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1 text-white">Authentic Origin</h4>
                  <p className="text-slate-500 text-sm">Certified hand-combed wool from the Ladakh region.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PenTool className="w-6 h-6 text-luxury-blue shrink-0" />
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1 text-white">Master Artistry</h4>
                  <p className="text-slate-500 text-sm">Each shawl requires over 200 hours of meticulous hand-weaving.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-32 bg-luxury-black/50 snap-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-luxury-blue font-bold text-xs uppercase tracking-[0.3em] mb-4">Curated Selection</p>
              <h2 className="font-serif text-5xl text-white">New Arrivals</h2>
            </div>
            <button
              onClick={onExplore}
              className="group flex items-center gap-2 text-sm uppercase tracking-widest font-bold border-b border-luxury-blue pb-1 text-white"
            >
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/5 aspect-[3/4] rounded-lg mb-6"></div>
                  <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-white/5 rounded w-full mb-4"></div>
                  <div className="h-6 bg-white/10 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newArrivals.map((product) => (
                <div
                  key={product._id}
                  className="group cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-6">
                    <Image
                      src={getProductImage(product)}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="bg-white text-luxury-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-tighter transform translate-y-4 group-hover:translate-y-0 transition-transform"
                      >
                        Quick Shop
                      </button>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl mb-1 text-white">{product.name}</h3>
                  <p className="text-slate-500 text-sm mb-2 font-light italic line-clamp-2">{product.description}</p>
                  <p className="text-luxury-blue font-bold">{formatPrice(product.price)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full-Width Lookbook */}
      <section className="relative h-[80vh] flex items-center overflow-hidden snap-section">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtofBaRc4w09bZSY4agL2FajDcbM4-C0YYzWplnmisdYBPwHDYO89r0wc7pwqcHS5XGd-lpRPL736xCGmI2ZfaKAIHo0O1vIXTIXFDDeSvRtAP0HbYEjvAY8DU2uJVUAvI2zhlqU_OD8ufQUwlqU5A4CIPtGP5qJfLGNShWMkSyRd3XpD_6kg-cQ8Qxl8IaitOKx0e11DCbHRjCQUPRlYq9CReoWrNj7funeLZ7K4kx9Jvp5ckhayuWEEe_UcgEA7IBzOj7YLjGu4"
          alt="Lookbook 2024"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="absolute inset-0 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-luxury-black/40"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
          <div className="max-w-md">
            <h2 className="font-serif text-5xl md:text-7xl mb-6 leading-tight text-white">Winter <br /><span className="italic font-normal">Serenity</span></h2>
            <p className="text-white/80 mb-8 text-lg">Our Autumn/Winter collection captures the quiet beauty of the peaks.</p>
            <button
              onClick={onExplore}
              className="bg-white text-luxury-black px-10 py-4 rounded-lg font-bold tracking-widest uppercase text-xs hover:bg-slate-200 transition-colors"
            >
              Discover Series
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
