import { create } from 'zustand';
import api from '@/lib/api';
import { Product } from '../types';

interface ProductCache {
    data: { items: Product[]; total: number; page: number; pages: number } | null;
    timestamp: number;
}

const CACHE_DURATION = 60 * 1000;

const productCache: Record<string, ProductCache> = {};

interface ProductState {
    products: Product[];
    currentProduct: Product | null;
    loading: boolean;
    error: string | null;
    total: number;
    page: number;
    pages: number;

    fetchProducts: (params?: { skip?: number; limit?: number; category?: string }) => Promise<void>;
    fetchProductBySlug: (slug: string) => Promise<void>;
    setCurrentProduct: (product: Product | null) => void;
}

const getCacheKey = (params: { skip?: number; limit?: number; category?: string }) => 
    `${params.category || 'all'}-${params.skip}-${params.limit}`;

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    pages: 1,

    fetchProducts: async (params = { skip: 0, limit: 12 }) => {
        const cacheKey = getCacheKey(params);
        const cached = productCache[cacheKey];
        
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            set({
                products: cached.data!.items,
                total: cached.data!.total,
                page: cached.data!.page,
                pages: cached.data!.pages,
                loading: false
            });
            return;
        }

        set({ loading: true, error: null });
        try {
            const apiParams: Record<string, any> = { skip: params.skip, limit: params.limit };
            if (params.category) {
                apiParams.category_id = params.category;
            }
            const response = await api.get('/products/', { params: apiParams });
            const data = {
                items: response.data.items,
                total: response.data.total,
                page: response.data.page,
                pages: response.data.pages
            };
            
            productCache[cacheKey] = { data, timestamp: Date.now() };
            
            set({
                products: data.items,
                total: data.total,
                page: data.page,
                pages: data.pages,
                loading: false
            });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchProductBySlug: async (slug: string) => {
        const cacheKey = `slug-${slug}`;
        const cached = productCache[cacheKey];
        
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            set({ currentProduct: cached.data as unknown as Product, loading: false });
            return;
        }

        set({ loading: true, error: null });
        try {
            const response = await api.get(`/products/${slug}`);
            productCache[cacheKey] = { data: response.data, timestamp: Date.now() };
            set({ currentProduct: response.data, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    setCurrentProduct: (product) => set({ currentProduct: product }),
}));
