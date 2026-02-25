"use client";

import React from 'react';
import { Search, ShoppingBag, Layers, Home, Grid, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';
import Image from 'next/image';

interface NavbarProps {
  logoUrl?: string | null;
}

export default function Navbar({ logoUrl }: NavbarProps) {
  const { cartCount } = useCart();
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', id: '', icon: Home },
    { label: 'Collections', id: 'collections', icon: Grid },
    // { label: 'Heritage', id: 'heritage', icon: Award },
    // { label: 'About', id: 'about', icon: Info },
    { label: 'AI Stylist', id: 'ai', icon: Sparkles }
  ];

  const getIsActive = (id: string) => {
    if (id === '') return pathname === '/';
    return pathname.startsWith(`/${id}`);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-luxury-nav backdrop-blur-md border-b border-white/5 px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            {logoUrl ? (
              <Image fill sizes="(max-width: 768px) 100vw, 50vw" width={40} height={40} src={logoUrl} alt="Pashmina Luxury" className="object-contain rounded-lg" />
            ) : (
              <Layers className="w-8 h-8 text-luxury-blue transition-transform group-hover:scale-110" />
            )}
            <h2 className="font-serif italic text-2xl tracking-tight text-white">
              Pashmina <span className="font-bold not-italic">Luxury</span>
            </h2>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = getIsActive(item.id);
              return (
                <Link
                  key={item.label}
                  href={`/${item.id}`}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${isActive ? 'text-luxury-blue' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-white/5 rounded-full px-4 py-1.5 border border-white/10">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search collection..."
              className="bg-transparent border-none focus:ring-0 text-sm w-40 placeholder:text-slate-500 text-white"
            />
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 hover:bg-white/5 rounded-full transition-colors text-white"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-luxury-blue rounded-full"></span>
            )}
          </Link>
        </div>
      </header>

      {/* Floating Bottom Navbar for Mobile */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
        <div className="bg-luxury-nav/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = getIsActive(item.id);
            return (
              <Link
                key={item.label}
                href={`/${item.id}`}
                className={`flex flex-col items-center gap-1 p-2 transition-all ${isActive ? 'text-luxury-blue scale-110' : 'text-slate-400'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tighter font-bold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
