"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Product, CartItem } from '../types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    updateQuantity: (id: string, delta: number) => void;
    removeFromCart: (id: string) => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const toastShownRef = useRef(false);

    const addToCart = useCallback((product: Product) => {
        const productId = product._id;
        let isNewItem = false;
        
        setCart(prev => {
            const existing = prev.find(item => item._id === productId);

            if (existing) {
                toastShownRef.current = false;
                return prev.map(item =>
                    item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            isNewItem = true;
            return [...prev, { ...product, quantity: 1 } as CartItem];
        });

        setTimeout(() => {
            if (isNewItem) {
                toast.success(`${product.name} added to selection`, {
                    style: { background: '#0a0a0a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
                    iconTheme: { primary: '#1d70d1', secondary: '#fff' }
                });
            } else {
                toast.success(`Another ${product.name} added to selection`, {
                    style: { background: '#0a0a0a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
                    iconTheme: { primary: '#1d70d1', secondary: '#fff' }
                });
            }
        }, 0);
    }, []);

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item =>
            item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item._id !== id));
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, cartCount }}>
            <Toaster position="top-right" />
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
