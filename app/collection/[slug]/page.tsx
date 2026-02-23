"use client";

export const dynamic = 'force-static';

import React, { useEffect } from 'react';
import CollectionPage from '@/pages_components/CollectionPage';
import NotFoundPage from '@/pages_components/NotFoundPage';
import { useRouter, useParams } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { Product } from '@/types';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useProductStore } from '@/store/useProductStore';
import { Loader2 } from 'lucide-react';

export default function CollectionDetail() {
    const router = useRouter();
    const params = useParams();
    const { addToCart } = useCart();
    const { categories, fetchCategories, loading: catLoading } = useCategoryStore();
    const { products, fetchProducts, loading: prodLoading, total, pages } = useProductStore();

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
    }, [categories.length, fetchCategories]);

    useEffect(() => {
        if (params.slug) {
            fetchProducts({ category: params.slug as string });
        }
    }, [params.slug, fetchProducts]);

    const category = categories.find(c => c.slug === params.slug);

    if (catLoading || prodLoading && products.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center bg-luxury-black">
                <Loader2 className="w-12 h-12 text-luxury-blue animate-spin" />
            </div>
        );
    }

    if (!category && !catLoading) {
        return <NotFoundPage onReturn={() => router.push('/collections')} />;
    }

    const handleSelectProduct = (product: Product) => {
        router.push(`/product/${product.slug}`);
    };

    return (
        <CollectionPage
            onAddToCart={addToCart}
            onSelectProduct={handleSelectProduct}
            products={products}
            loading={prodLoading}
            total={total}
            pages={pages}
            fetchMore={(skip) => fetchProducts({ skip, category: params.slug as string })}
        />
    );
}
