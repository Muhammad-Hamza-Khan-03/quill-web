"use client";

import React, { useEffect } from 'react';
import HomePage from '@/pages_components/HomePage';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useProductStore } from '@/store/useProductStore';

export default function Home() {
  const router = useRouter();
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts({ skip: 0, limit: 8 });
  }, [fetchProducts]);

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

  return (
    <HomePage
      onExplore={handleExplore}
      onSelectProduct={handleSelectProduct}
      onPageChange={handlePageChange}
      products={products}
      loading={loading}
    />
  );
}
