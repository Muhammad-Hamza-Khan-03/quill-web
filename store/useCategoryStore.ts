import { create } from 'zustand';
import api from '@/lib/api';
import { Category } from '@/types';

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;

    fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    loading: false,
    error: null,

    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            // We'll target a public endpoint. If it doesn't exist yet, we'll create it.
            const response = await api.get('/categories');
            set({ categories: response.data, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },
}));
