export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import CollectionPageContent from './CollectionPageContent';
import { Product } from '@/types';

async function getProductsByCollection(slug: string): Promise<{ products: Product[]; total: number; pages: number }> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/products?collection=${slug}&limit=20`, { 
            cache: 'no-store' 
        });
        if (!res.ok) return { products: [], total: 0, pages: 0 };
        return res.json();
    } catch {
        return { products: [], total: 0, pages: 0 };
    }
}

export default async function CollectionDetail({ params }: { params: { slug: string } }) {
    const { products, total, pages } = await getProductsByCollection(params.slug);
    
    return <CollectionPageContent products={products} total={total} pages={pages} />;
}
