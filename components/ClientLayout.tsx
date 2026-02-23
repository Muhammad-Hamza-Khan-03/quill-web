"use client";

import React, { useState } from 'react';
import { CartProvider } from './CartProvider';
import Navbar from './Navbar';
import Footer from './Footer';
import { CustomCursor, AtmosphericBackground } from './Effects';
import { AnimatePresence } from 'framer-motion';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [logoUrl] = useState<string | null>(null);

    return (
        <CartProvider>
            <div className="min-h-screen flex flex-col bg-luxury-black selection:bg-luxury-blue/30">
                <CustomCursor />
                <AtmosphericBackground />

                <Navbar logoUrl={logoUrl} />

                <main className="flex-1">
                    <AnimatePresence mode="wait">
                        {children}
                    </AnimatePresence>
                </main>

                <Footer />
            </div>
        </CartProvider>
    );
}
