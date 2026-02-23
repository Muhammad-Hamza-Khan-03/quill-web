import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { formatPrice } from '@/lib/formatters';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getProductImage = (product: Product) => {
    return product.variations && product.variations.length > 0
      ? product.variations[0].image_url
      : 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=400&auto=format&fit=crop';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer h-full flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-luxury-gray mb-4 rounded-lg">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-luxury-gray animate-pulse" />
        )}
        <Image
          fill
          src={getProductImage(product)}
          alt={product.name}
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full bg-white text-luxury-black py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-luxury-blue hover:text-white transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>

      <div className="space-y-1 flex-1">
        <h3 className="font-serif text-lg font-medium text-luxury-text group-hover:text-luxury-blue transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-luxury-muted text-xs uppercase tracking-widest line-clamp-1">{product.description}</p>
        <p className="text-sm font-light pt-1 text-luxury-text">{formatPrice(product.price)}</p>
      </div>
    </motion.div>
  );
}
