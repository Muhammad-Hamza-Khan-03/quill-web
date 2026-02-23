"use client";

import CollectionPage from '@/pages_components/CollectionPage';
import { Product } from '@/types';

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface CategoryPageContentProps {
    category: Category | null;
    products: Product[];
    total: number;
    pages: number;
}

export default function CategoryPageContent({ category, products, total, pages }: CategoryPageContentProps) {
    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-luxury-black">
                <p className="text-white">Category not found</p>
            </div>
        );
    }

    return (
        <CollectionPage
            onAddToCart={() => {}}
            onSelectProduct={() => {}}
            products={products}
            loading={false}
            total={total}
            pages={pages}
            fetchMore={async () => ({ products: [], total: 0, pages: 0 })}
            title={category.name}
        />
    );
}
