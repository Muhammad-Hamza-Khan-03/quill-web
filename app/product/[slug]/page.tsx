"use client";

export const dynamic = 'force-static';

import React, { useEffect } from 'react';
import ProductDetailPage from '@/pages_components/ProductDetailPage';
import NotFoundPage from '@/pages_components/NotFoundPage';
import { useRouter, useParams } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { useProductStore } from '@/store/useProductStore';
import { useReviewStore } from '@/store/useReviewStore';
import { Loader2 } from 'lucide-react';

export default function Product() {
    const router = useRouter();
    const params = useParams();
    const { addToCart } = useCart();
    const { currentProduct, fetchProductBySlug, loading } = useProductStore();
    const { reviews, fetchReviews } = useReviewStore();

    useEffect(() => {
        if (params.slug) {
            fetchProductBySlug(params.slug as string);
        }
    }, [params.slug, fetchProductBySlug]);

    useEffect(() => {
        if (currentProduct?._id) {
            fetchReviews(currentProduct._id);
        }
    }, [currentProduct?._id, fetchReviews]);

    if (loading && !currentProduct) {
        return (
            <div className="h-screen flex items-center justify-center bg-luxury-black">
                <Loader2 className="w-12 h-12 text-luxury-blue animate-spin" />
            </div>
        );
    }

    if (!currentProduct && !loading) {
        return <NotFoundPage onReturn={() => router.push('/collections')} />;
    }

    return (
        <ProductDetailPage
            product={currentProduct!}
            reviews={reviews}
            onBack={() => router.push('/collections')}
            onAddToCart={addToCart}
        />
    );
}
