"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, MessageCircle, Instagram, Twitter, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productUrl: string;
  productName: string;
  productImage?: string;
}

export default function ShareModal({ isOpen, onClose, productUrl, productName, productImage }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${productUrl}` : productUrl;
  const shareText = `Check out this stunning ${productName} from Pashmina Luxury! ✨`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = fullUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setIsAnimating(true);
      setTimeout(() => {
        setCopied(false);
        setIsAnimating(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366]',
      hoverColor: 'hover:bg-[#20bd5a]',
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + fullUrl)}`, '_blank');
      }
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]',
      hoverColor: 'hover:opacity-90',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: productName,
            text: shareText,
            url: fullUrl
          });
        } else {
          window.open(`https://www.instagram.com/`, '_blank');
        }
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2]',
      hoverColor: 'hover:bg-[#1a91da]',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`, '_blank');
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-[#EA4335]',
      hoverColor: 'hover:bg-[#d33a2d]',
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(`Check out ${productName}`)}&body=${encodeURIComponent(shareText + '\n\n' + fullUrl)}`;
      }
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-luxury-nav border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-luxury-blue via-purple-500 to-pink-500" />
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-luxury-blue/20">
                    <Share2 className="w-5 h-5 text-luxury-blue" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-white">Share</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {productImage && (
                <div className="mb-6 flex items-center gap-4 p-3 bg-white/5 rounded-2xl">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image fill src={productImage} alt={productName} className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{productName}</p>
                    <p className="text-xs text-slate-400">Pashmina Luxury</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 gap-3 mb-6">
                {shareOptions.map((option) => (
                  <motion.button
                    key={option.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={option.action}
                    className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl ${option.color} ${option.hoverColor} transition-all shadow-lg`}
                  >
                    <option.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    <span className="text-[10px] sm:text-xs font-medium text-white">{option.name}</span>
                  </motion.button>
                ))}
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
                  <input
                    type="text"
                    value={fullUrl}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-slate-300 outline-none truncate"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      copied 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-luxury-blue text-white hover:bg-blue-600'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copy</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Sparkles className="w-3 h-3 text-luxury-blue" />
                <span>Share the luxury experience</span>
              </div>
            </div>

            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="relative">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [1, 1, 0],
                          x: Math.cos(i * 30 * Math.PI / 180) * 100,
                          y: Math.sin(i * 30 * Math.PI / 180) * 100
                        }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        className="absolute w-2 h-2 rounded-full bg-luxury-blue"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
