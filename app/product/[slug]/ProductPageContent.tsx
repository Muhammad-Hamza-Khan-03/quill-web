"use client";

import ProductDetailPage from '@/pages_components/ProductDetailPage';
import { Product, Review } from '@/types';
import { useCart } from '@/components/CartProvider';

interface ProductPageContentProps {
    product: Product | null;
    reviews: Review[];
}

export default function ProductPageContent({ product, reviews }: ProductPageContentProps) {
    const { addToCart } = useCart();

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
            onAddToCart={addToCart}
        />
    );
}
