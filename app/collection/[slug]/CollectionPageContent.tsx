"use client";

import CollectionPage from '@/pages_components/CollectionPage';
import { Product } from '@/types';

interface CollectionPageContentProps {
    products: Product[];
    total: number;
    pages: number;
}

export default function CollectionPageContent({ products, total, pages }: CollectionPageContentProps) {
    return (
        <CollectionPage
            onAddToCart={() => {}}
            onSelectProduct={() => {}}
            products={products}
            loading={false}
            total={total}
            pages={pages}
            fetchMore={async () => ({ products: [], total: 0, pages: 0 })}
        />
    );
}
