import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ZoomIn,
  ShoppingCart,
  Star,
  ThumbsUp,
  Eye,
  Share2,
  Instagram,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Variation, Review, ProductPrice } from '../types';
import { useProductStore } from '@/store/useProductStore';
import { useReviewStore } from '@/store/useReviewStore';
import { formatPrice, getNumericPrice } from '@/lib/formatters';
import Image from 'next/image';
import ShareModal from '@/components/ShareModal';
import ReviewModal from '@/components/ReviewModal';

interface ProductDetailPageProps {
  product: Product;
  reviews: Review[];
  onBack: () => void;
  onAddToCart: (product: any) => void;
}

export default function ProductDetailPage({ product, reviews, onBack, onAddToCart }: ProductDetailPageProps) {
  const router = useRouter();
  const getInitialImage = () => {
    return product.variations && product.variations.length > 0
      ? product.variations[0].image_url
      : 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=400&auto=format&fit=crop';
  };

  const [selectedImage, setSelectedImage] = useState(getInitialImage());
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(product.variations[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { products: allProducts } = useProductStore();
  const { voteHelpful, addReview } = useReviewStore();

  // SEO: Dynamic Page Title
  useEffect(() => {
    if (product?.name) {
      const originalTitle = document.title;
      document.title = `${product.name} | Pashmina Luxury`;
      return () => { document.title = originalTitle; };
    }
  }, [product?.name]);

  // Sticky Bar Observer
  useEffect(() => {
    const handleScroll = () => {
      const buyButton = document.getElementById('main-buy-button');
      if (buyButton) {
        const rect = buyButton.getBoundingClientRect();
        setIsStickyVisible(rect.top < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVariationSelect = (v: Variation) => {
    setSelectedVariation(v);
    if (v.image_url) {
      setSelectedImage(v.image_url);
    }
  };

  const pkrPrice = formatPrice(product.price);

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto relative">
      {/* Breadcrumb / Back Link */}
      <div className="mb-10 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-blue transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </button>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-muted">
          <span>{product.gender}</span>
          <span>/</span>
          <span>{product.type}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Product Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="aspect-[4/5] w-full bg-luxury-gray rounded-3xl overflow-hidden relative group">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 right-6">
              <button className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white border border-white/20 hover:bg-white/20 transition-all">
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.variations.map((v, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(v.image_url)}
                className={`relative aspect-square rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${selectedImage === v.image_url ? 'border-luxury-blue' : 'border-transparent hover:border-luxury-muted'
                  }`}
              >
                <Image fill src={v.image_url} alt={`Thumbnail ${i}`} className="object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-luxury-blue text-xs font-bold tracking-[0.2em] uppercase">Hand-Woven Heritage</span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-bold text-luxury-text">{product.rating.average}</span>
                <span className="text-xs text-luxury-muted">({product.rating.count} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-black text-luxury-text leading-tight">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <p className="text-3xl font-light text-luxury-text">PKR {formatPrice(product.price)}</p>
            </div>
            <p className="text-xs text-luxury-muted uppercase tracking-widest">SKU: {product.item_number}</p>
          </div>

          <div className="space-y-6">
            {/* Variation Picker */}
            {product.variations.length > 0 && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-luxury-text">Select Color: {selectedVariation?.color}</span>
                <div className="flex flex-wrap gap-3">
                  {product.variations.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVariationSelect(v)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all overflow-hidden ${selectedVariation === v ? 'border-luxury-blue' : 'border-transparent'
                        }`}
                    >
                      <Image
                        fill
                        src={v.image_url}
                        className="object-cover"
                        title={v.color}
                        alt={v.color}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-luxury-text">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-luxury-border rounded-lg bg-luxury-gray/30">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:text-luxury-blue transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:text-luxury-blue transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-luxury-muted uppercase tracking-tighter">In Stock & Ready to Ship</p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4 space-y-4" id="main-buy-button">
              <button
                onClick={() => onAddToCart({
                  ...product,
                  id: product._id,
                  selectedColor: selectedVariation?.color,
                  selectedImage: selectedVariation?.image_url
                })}
                className="w-full py-5 rounded-2xl text-white font-bold tracking-widest uppercase text-sm shadow-xl shadow-luxury-blue/20 transition-all hover:scale-[1.02] hover:shadow-luxury-blue/30 active:scale-95 bg-luxury-blue flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Selection
              </button>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="w-full py-4 rounded-2xl border border-luxury-border font-bold uppercase text-[10px] tracking-widest text-luxury-text hover:bg-luxury-gray transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share this Product
              </button>
            </div>
          </div>

          {/* Detailed Specs */}
          <div className="grid grid-cols-2 gap-8 py-10 border-y border-luxury-border">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Material</p>
              <p className="text-sm font-medium text-luxury-text">{product.material || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Weight</p>
              <p className="text-sm font-medium text-luxury-text">{product.weight || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Dimensions</p>
              <p className="text-sm font-medium text-luxury-text">{product.sizing || product.dimensions || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Craftsmanship</p>
              <p className="text-sm font-medium text-luxury-text">Hand-woven</p>
            </div>
          </div>

          {/* Description & Story */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-bold text-luxury-text">The Story</h3>
            <p className="text-luxury-muted leading-relaxed font-light">
              {product.description}
            </p>
            <div className="bg-luxury-blue/5 border border-luxury-blue/10 p-6 rounded-2xl flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-luxury-blue shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-luxury-text mb-1">Authenticity Guaranteed</h4>
                <p className="text-xs text-luxury-muted leading-relaxed">Each piece comes with a certificate of authenticity and a unique serial number, ensuring its Himalayan origin.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-32 border-t border-luxury-border pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="md:w-1/3 space-y-6 md:sticky md:top-32">
            <h2 className="text-3xl font-serif font-bold text-luxury-text">Client Reviews</h2>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-serif font-black text-luxury-blue">{product.rating.average}</div>
              <div>
                <div className="flex text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating.average) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <p className="text-xs text-luxury-muted uppercase tracking-widest">Based on {product.rating.count} reviews</p>
              </div>
            </div>
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="w-full py-4 rounded-xl border border-luxury-border text-xs font-bold uppercase tracking-widest text-luxury-text hover:bg-luxury-gray hover:border-luxury-blue transition-colors"
            >
              Write a Review
            </button>
          </div>

          <div className="md:w-2/3 space-y-12">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="space-y-4 pb-12 border-b border-luxury-border last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-luxury-text">{review.user_name}</h4>
                      <div className="flex text-yellow-500 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-luxury-muted">{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-luxury-muted leading-relaxed italic">"{review.text}"</p>
                  <button
                    onClick={() => voteHelpful(review._id)}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-muted hover:text-luxury-blue transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    Helpful ({review.helpful_votes || 0})
                  </button>
                </div>
              ))
            ) : (
              <p className="text-luxury-muted italic">No reviews yet. Be the first to share your experience.</p>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-32 pb-20">
        <div className="flex justify-between items-end mb-12">
          <h3 className="text-2xl font-serif font-black text-luxury-text uppercase tracking-wider">You May Also Like</h3>
          <button className="text-xs font-bold uppercase tracking-widest text-luxury-blue hover:underline" onClick={onBack}>View Collection</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {allProducts.filter(p => p._id !== product._id).slice(0, 4).map((p) => (
            <div key={p._id} className="space-y-4 group cursor-pointer" onClick={() => { window.scrollTo(0, 0); router.push(`/product/${p.slug}`); }}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-luxury-gray">
                <Image
                  fill
                  src={p.variations?.[0]?.image_url || ''}
                  alt={p.name}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide text-luxury-text group-hover:text-luxury-blue transition-colors line-clamp-1">{p.name}</h4>
                <p className="text-luxury-muted text-sm">PKR {formatPrice(p.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Action Bar */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed left-0 right-0 bottom-24 md:bottom-8 z-40 flex justify-center px-4"
          >
            <div className="w-full max-w-xl bg-luxury-nav/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <div className="relative w-12 h-12 overflow-hidden rounded-xl">
                  <Image fill src={selectedImage} className="object-cover" alt="" />
                </div>
                <div className="max-w-[120px]">
                  <h4 className="text-xs font-bold text-white truncate">{product.name}</h4>
                  <p className="text-xs text-luxury-blue font-bold">PKR {formatPrice(product.price)}</p>
                </div>
              </div>
              <button
                onClick={() => onAddToCart({ ...product, id: product._id, selectedColor: selectedVariation?.color, selectedImage: selectedImage })}
                className="flex-1 bg-luxury-blue text-white py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to selection
              </button>
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-3.5 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors shrink-0"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        productUrl={`/product/${product.slug}`}
        productName={product.name}
        productImage={selectedImage}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productId={product._id}
        productName={product.name}
        onSubmit={addReview}
      />
    </div>
  );
}
