"use client";

import React, { useState } from 'react';
import HomePage from '@/pages_components/HomePage';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { motion } from 'framer-motion';

interface HomePageClientProps {
  initialProducts: Product[];
}

export default function HomePageClient({ initialProducts }: HomePageClientProps) {
  const router = useRouter();
  const [products] = useState<Product[]>(initialProducts);
  const [wakingUp, setWakingUp] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setWakingUp(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => {
    router.push('/collections');
  };

  const handleSelectProduct = (product: Product) => {
    router.push(`/product/${product.slug}`);
  };

  const handlePageChange = (page: string) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page === 'collection' ? 'collections' : page}`);
    }
  };

  // const handleAddToCart = (_product: Product) => {
  //   // Navigation handled by onSelectProduct
  // };

  return (
    <>
      {wakingUp && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: wakingUp ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-luxury-blue/30 border-t-luxury-blue rounded-full animate-spin" />
            <p className="text-luxury-blue/60 text-xs uppercase tracking-[0.3em]">Preparing experience</p>
          </div>
        </motion.div>
      )}
      <HomePage
        onExplore={handleExplore}
        onSelectProduct={handleSelectProduct}
        onPageChange={handlePageChange}
        products={products}
        loading={false}
        onAddToCart={() => { }}
      />
    </>
  );
}
