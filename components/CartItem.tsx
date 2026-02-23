import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { formatPrice, getNumericPrice } from '@/lib/formatters';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const itemId = item._id || item.id;

  const itemImage = item.selectedImage || (item.variations && item.variations.length > 0 ? item.variations[0].image_url : '');

  return (
    <div className="flex gap-6 py-8 border-b border-luxury-border group">
      <div className="relative w-32 aspect-[3/4] bg-luxury-gray overflow-hidden rounded-lg">
        <Image
          fill
          src={itemImage}
          alt={item.name}
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-serif mb-1 text-luxury-text">{item.name}</h3>
            <p className="text-luxury-muted text-xs uppercase tracking-widest mb-2">
              {item.selectedColor || (item.variations && item.variations.length > 0 ? item.variations[0].color : 'N/A')} | {item.material || 'N/A'}
            </p>
            <button
              onClick={() => onRemove(itemId!)}
              className="text-[10px] uppercase tracking-widest text-luxury-muted/50 hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          </div>
          <p className="text-lg font-medium text-luxury-text">
            {formatPrice(getNumericPrice(item.price) * item.quantity)}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center border border-luxury-border rounded-full px-2 py-1">
            <button
              onClick={() => onUpdateQuantity(itemId!, -1)}
              className="p-1 hover:text-luxury-blue transition-colors text-luxury-text"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-luxury-text">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(itemId!, 1)}
              className="p-1 hover:text-luxury-blue transition-colors text-luxury-text"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
