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
import api from '@/lib/api';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

export default function CategoryPage() {
    const router = useRouter();
    const params = useParams();
    const { addToCart } = useCart();
    const { categories, fetchCategories, loading: catLoading } = useCategoryStore();
    const { products, fetchProducts, loading: prodLoading, total, pages } = useProductStore();
    const [category, setCategory] = React.useState<Category | null>(null);
    const [categoryLoading, setCategoryLoading] = React.useState(true);

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
    }, [categories.length, fetchCategories]);

    useEffect(() => {
        const fetchCategoryBySlug = async () => {
            if (!params.slug) return;
            setCategoryLoading(true);
            try {
                const response = await api.get(`/categories/${params.slug}`);
                setCategory(response.data);
            } catch {
                setCategory(null);
            } finally {
                setCategoryLoading(false);
            }
        };
        fetchCategoryBySlug();
    }, [params.slug]);

    useEffect(() => {
        if (category?._id) {
            fetchProducts({ category: category._id });
        }
    }, [category?._id, fetchProducts]);

    const loading = catLoading || categoryLoading || (prodLoading && products.length === 0);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-luxury-black">
                <Loader2 className="w-12 h-12 text-luxury-blue animate-spin" />
            </div>
        );
    }

    if (!category && !categoryLoading) {
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
            fetchMore={(skip) => category && fetchProducts({ skip, category: category._id })}
            title={category?.name}
        />
    );
}
