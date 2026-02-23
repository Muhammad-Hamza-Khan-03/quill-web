import { create } from 'zustand';
import api from '@/lib/api';
import { Review } from '@/types';

interface ReviewState {
    reviews: Review[];
    currentProductId: string | null;
    loading: boolean;
    error: string | null;

    fetchReviews: (productId: string) => Promise<void>;
    addReview: (reviewData: { product_id: string; user_name: string; rating: number; text: string }) => Promise<void>;
    voteHelpful: (reviewId: string) => Promise<void>;
}

const normalizeReview = (data: Record<string, unknown>): Review => ({
    _id: (data._id || data.id) as string,
    product_id: (data.product_id || data.productId) as string,
    user_name: (data.user_name || data.userName) as string,
    rating: data.rating as number,
    text: (data.text || data.review || data.comment) as string,
    helpful_votes: (data.helpful_votes || data.helpfulVotes || 0) as number,
    created_at: (data.created_at || data.createdAt || data.date || new Date().toISOString()) as string
});

export const useReviewStore = create<ReviewState>((set, get) => ({
    reviews: [],
    currentProductId: null,
    loading: false,
    error: null,

    fetchReviews: async (productId: string) => {
        set({ loading: true, error: null, reviews: [], currentProductId: productId });
        try {
            const response = await api.get(`/reviews/${productId}`);
            const data = Array.isArray(response.data) ? response.data : 
                         response.data.items ? response.data.items : 
                         response.data.reviews ? response.data.reviews : 
                         response.data.data ? response.data.data : [];
            const normalizedReviews = data.map(normalizeReview);
            set({ reviews: normalizedReviews, loading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch reviews';
            console.error('Failed to fetch reviews:', error);
            set({ error: errorMessage, loading: false, reviews: [] });
        }
    },

    addReview: async (reviewData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/reviews/', reviewData);
            const newReview = normalizeReview(response.data);
            set((state) => ({
                reviews: [newReview, ...state.reviews],
                loading: false
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to add review';
            set({ error: errorMessage, loading: false });
            throw error;
        }
    },

    voteHelpful: async (reviewId) => {
        try {
            await api.post(`/reviews/${reviewId}/vote`);
            set((state) => ({
                reviews: state.reviews.map((r) =>
                    r._id === reviewId ? { ...r, helpful_votes: (r.helpful_votes || 0) + 1 } : r
                )
            }));
        } catch (error) {
            console.error('Failed to vote helpful:', error);
        }
    }
}));
