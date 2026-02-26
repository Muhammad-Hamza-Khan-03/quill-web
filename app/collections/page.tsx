"use client";

import React, { useEffect } from 'react';
import CollectionPage from '@/pages_components/CollectionPage';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { Product } from '@/types';
import { useProductStore } from '@/store/useProductStore';

export default function Collections() {
    const router = useRouter();
    const { addToCart } = useCart();
    const { products, fetchProducts, loading, total, pages } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSelectProduct = (product: Product) => {
        router.push(`/product/${product.slug}`);
    };

    return (
        <CollectionPage
            onAddToCart={addToCart}
            onSelectProduct={handleSelectProduct}
            products={products}
            loading={loading}
            total={total}
            pages={pages}
            fetchMore={(skip) => fetchProducts({ skip, append: true })}
        />
    );
}
