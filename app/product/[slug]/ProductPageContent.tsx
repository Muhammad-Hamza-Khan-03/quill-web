"use client";

import ProductDetailPage from '@/pages_components/ProductDetailPage';
import { Product, Review } from '@/types';

interface ProductPageContentProps {
    product: Product | null;
    reviews: Review[];
}

export default function ProductPageContent({ product, reviews }: ProductPageContentProps) {
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-luxury-black">
                <p className="text-white">Product not found</p>
            </div>
        );
    }

    return (
        <ProductDetailPage
            product={product}
            reviews={reviews}
            onBack={() => {}}
            onAddToCart={() => {}}
        />
    );
}
