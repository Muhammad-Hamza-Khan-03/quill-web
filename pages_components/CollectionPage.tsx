import { ArrowDown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeletons';
import { Product } from '../types';

interface CollectionPageProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
  loading: boolean;
  total: number;
  pages: number;
  fetchMore: (skip: number) => void;
  title?: string;
}

export default function CollectionPage({
  onAddToCart,
  onSelectProduct,
  products,
  loading,
  total,
  pages,
  fetchMore,
  title
}: CollectionPageProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="h-[45vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(4, 7, 11, 0.6), rgba(4, 7, 11, 0.9)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuC1xgNGeMbMMrmU-1gdWWBONvOVfOxZIlIGMHoLD-hQ1LYVrhgjKv6TtHupPTLUlFqHo90-mASps8FQYTxEyGRSwnAk5z7uUvpAIjQtTQk53fus2ZeWhT0oNQIG1jVHegU11Lg7-wmyczcSr0Ov_B2tSBsCfCikh6PDvS7BcXg08Cc0OiQbobc0sL-SZ3DFBlXrwj5FAp7STIemE4UfNLK7Vlf2rGI9hZCP80JuEC_umGveTIZRHoqZoRdikqeQnbMOIzRwbO8SwVQ)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-3xl space-y-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl text-white font-serif font-medium leading-tight"
          >
            {title || 'The Complete Collection'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-luxury-muted text-lg font-light tracking-wide max-w-xl mx-auto"
          >
            Discover the unparalleled softness of hand-woven Himalayan cashmere and silk blends, ethically sourced and masterfully crafted.
          </motion.p>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 64 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="pt-6 flex justify-center"
          >
            <span className="w-px bg-gradient-to-b from-luxury-blue to-transparent inline-block"></span>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        {loading && products.length === 0 ? (
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-luxury-muted italic">No products found in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <div key={product._id} onClick={() => onSelectProduct(product)}>
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        )}

        {/* Loading More Indicator */}
        {loading && products.length > 0 && (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-3 text-luxury-muted">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading more products...</span>
            </div>
          </div>
        )}

        {/* Pagination / Load More */}
        {products.length > 0 && products.length < total && !loading && (
          <div className="flex flex-col items-center justify-center pt-24 pb-12 gap-6">
            <p className="text-sm text-luxury-muted italic">Showing {products.length} of {total} exquisite pieces</p>
            <button
              onClick={() => fetchMore(products.length)}
              className="px-12 py-4 border border-luxury-blue text-luxury-blue text-xs font-bold uppercase tracking-[0.2em] hover:bg-luxury-blue hover:text-white transition-all duration-300"
            >
              Discover More
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="py-32 px-6 border-t border-luxury-border bg-luxury-gray/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-luxury-text">Join the Inner Circle</h2>
          <p className="text-luxury-muted text-sm mb-10 leading-relaxed">
            Be the first to explore new editorial lookbooks and receive invitations to private boutique events.
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="luxury-input flex-1"
            />
            <button className="luxury-button">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
