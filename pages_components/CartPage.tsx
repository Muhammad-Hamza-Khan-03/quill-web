import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import CartItem from '../components/CartItem';
import { CartItem as CartItemType, ProductPrice } from '../types';

interface CartPageProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
}

export default function CartPage({ items, onUpdateQuantity, onRemove, onBack }: CartPageProps) {
  const getNumericPrice = (price: ProductPrice | number) => {
    return typeof price === 'number' ? price : price.amount;
  };

  const subtotal = items.reduce((sum, item) => sum + getNumericPrice(item.price) * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-muted hover:text-luxury-text transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" /> Keep Shopping
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart List */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-8">
            <h1 className="text-5xl font-serif text-luxury-text">Your Selection</h1>
            <span className="text-luxury-muted text-sm uppercase tracking-widest">{items.length} items</span>
          </div>

          {items.length > 0 ? (
            <div className="border-t border-luxury-border">
              {items.map((item) => (
                <CartItem
                  key={item._id || item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-t border-luxury-border">
              <p className="text-luxury-muted italic mb-8">Your selection is currently empty.</p>
              <button onClick={onBack} className="luxury-button">Browse Collection</button>
            </div>
          )}

          <div className="mt-12 p-6 border border-dashed border-luxury-border rounded-lg flex items-center justify-between group cursor-pointer hover:border-luxury-text/30 transition-colors">
            <div className="flex items-center gap-4">
              <Gift className="w-5 h-5 text-luxury-blue" />
              <span className="text-sm font-medium text-luxury-text">Add a gift message</span>
            </div>
            <ArrowLeft className="w-4 h-4 rotate-180 text-luxury-muted group-hover:text-luxury-text transition-colors" />
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-luxury-gray/50 border border-luxury-border p-8 rounded-xl sticky top-32">
            <h2 className="text-2xl font-serif mb-8 text-luxury-text">Order Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-luxury-muted">Subtotal</span>
                <span className="text-luxury-text">PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-luxury-muted">Shipping</span>
                <span className="text-green-500 text-xs font-bold uppercase tracking-widest">Complimentary</span>
              </div>
            </div>

            <div className="pt-6 border-t border-luxury-border mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-serif text-luxury-text">Total</span>
                <span className="text-3xl font-serif text-luxury-text">PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full luxury-button py-4 shadow-[0_0_20px_rgba(29,112,209,0.3)]">
              Proceed to Checkout
            </button>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-luxury-blue shrink-0" />
                <p className="text-[11px] text-luxury-muted leading-relaxed">
                  Secure checkout with 256-bit encryption. Your data is protected.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="w-5 h-5 text-luxury-blue shrink-0" />
                <p className="text-[11px] text-luxury-muted leading-relaxed">
                  Complimentary worldwide luxury shipping on all orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
