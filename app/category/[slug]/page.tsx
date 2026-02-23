import CategoryPageContent from './CategoryPageContent';
import { Product } from '@/types';

interface Category {
    _id: string;
    name: string;
    slug: string;
}

async function getCategory(slug: string): Promise<Category | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/categories/${slug}`, { 
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

async function getProducts(categoryId: string): Promise<{ products: Product[]; total: number; pages: number }> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/products?category=${categoryId}&limit=20`, { 
            cache: 'no-store' 
        });
        if (!res.ok) return { products: [], total: 0, pages: 0 };
        return res.json();
    } catch {
        return { products: [], total: 0, pages: 0 };
    }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const category = await getCategory(params.slug);
    const { products, total, pages } = category?._id ? await getProducts(category._id) : { products: [], total: 0, pages: 0 };
    
    return <CategoryPageContent category={category} products={products} total={total} pages={pages} />;
}
