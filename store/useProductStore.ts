import { create } from 'zustand';
import api from '@/lib/api';
import { Product } from '@/types';

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

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    pages: 1,

    fetchProducts: async (params = { skip: 0, limit: 12 }) => {
        set({ loading: true, error: null });
        try {
            const apiParams: Record<string, any> = { skip: params.skip, limit: params.limit };
            if (params.category) {
                apiParams.category_id = params.category;
            }
            const response = await api.get('/products/', { params: apiParams });
            set({
                products: response.data.items,
                total: response.data.total,
                page: response.data.page,
                pages: response.data.pages,
                loading: false
            });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchProductBySlug: async (slug: string) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/products/${slug}`);
            set({ currentProduct: response.data, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    setCurrentProduct: (product) => set({ currentProduct: product }),
}));
