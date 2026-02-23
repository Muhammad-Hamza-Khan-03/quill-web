"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export default function AI() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
            >
                <div className="w-20 h-20 bg-luxury-blue/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Settings className="w-10 h-10 text-luxury-blue" />
                </div>
                <h1 className="text-5xl md:text-7xl font-serif text-white">AI Stylist</h1>
                <p className="text-luxury-muted text-lg max-w-md mx-auto font-light italic">
                    &quot;Our artificial intelligence concierge is currently being masterfully crafted to provide you with personalized styling recommendations.&quot;
                </p>
                <div className="pt-8">
                    <span className="px-6 py-2 border border-luxury-blue/30 rounded-full text-[10px] uppercase tracking-[0.3em] text-luxury-blue font-bold">
                        Coming Soon
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
