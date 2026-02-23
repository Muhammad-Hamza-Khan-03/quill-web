import ProductPageContent from './ProductPageContent';
import type { Product, Review } from '@/types';

async function getProduct(slug: string): Promise<Product | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/products/${slug}`, { 
            cache: 'no-store' 
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

async function getReviews(productId: string): Promise<Review[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/reviews/${productId}`, { 
            cache: 'no-store' 
        });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export default async function Product({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug);
    const reviews = product?._id ? await getReviews(product._id) : [];
    
    return <ProductPageContent product={product} reviews={reviews} />;
}
