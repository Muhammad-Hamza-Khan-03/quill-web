"use client";
import React from 'react';
import CartPage from '@/pages_components/CartPage';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';

export default function Cart() {
    const router = useRouter();
    const { cart, updateQuantity, removeFromCart } = useCart();

    return (
        <CartPage
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onBack={() => router.push('/collections')}
        />
    );
}
