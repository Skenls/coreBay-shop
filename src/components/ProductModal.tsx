import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check, ShoppingCart, Star, Zap } from 'lucide-react';
import { Product } from '../types/store';
import { useCart } from '../context/CartContext';

export interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  gpus: 'Видеокарты',
  laptops: 'Ноутбуки',
  cpus: 'Процессоры',
  displays: 'Мониторы',
};

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Close modal on Escape key press and manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  // Reset feedback state after 2 seconds
  useEffect(() => {
    if (!isAdded) return;
    const timer = setTimeout(() => setIsAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [isAdded]);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
  };

  const formatImagePath = (src: string) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    const clean = src.replace(/^\.?\//, '');
    return `./${clean}`;
  };

  const formattedPrice = `$${product.price.toLocaleString('en-US')}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/60 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <motion.div
        initial={{ scale: 0.2, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.2, rotate: 180, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[720px] bg-[#1E213D] border border-[#423189] rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(66,49,137,0.5)] overflow-hidden text-white my-auto max-h-[90vh] flex flex-col"
      >
        {/* Close button (X) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть модальное окно"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#25284B] hover:bg-[#353966] text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B6FF0]"
        >
          <X size={20} />
        </button>

        {/* Modal content body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Top block: High-res image and product headers */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Product image container */}
            <div className="sm:col-span-5 bg-[#171933] border border-[#2B2F55] rounded-2xl p-6 flex items-center justify-center min-h-[200px] sm:min-h-[230px]">
              <img
                src={formatImagePath(product.image)}
                alt={product.name}
                className="max-h-48 sm:max-h-56 max-w-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Badges, Title and Category */}
            <div className="sm:col-span-7 flex flex-col justify-center pr-8 sm:pr-0">
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#423189] text-white border border-[#8B6FF0]/40">
                  {CATEGORY_LABELS[product.category] || product.category}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    product.inStock
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      product.inStock ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  {product.inStock ? 'В наличии' : 'Под заказ'}
                </span>

                {product.rating && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {product.rating.toFixed(1)}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {product.name}
              </h2>
            </div>
          </div>

          {/* Full detailed description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Описание
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specs grid */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
              <Zap size={14} className="text-[#8B6FF0]" />
              Характеристики
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm bg-[#25284B] border border-[#353966] rounded-xl px-3 py-2 text-slate-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B6FF0] shrink-0" />
                  <span className="font-medium">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row: Price in USD and "Добавить в корзину" button with feedback */}
          <div className="pt-4 border-t border-[#2B2F55] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Стоимость</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {formattedPrice}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg ${
                isAdded
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-[#423189] hover:bg-[#523da8] text-white active:scale-95 shadow-[#423189]/40'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={18} className="stroke-[2.5]" />
                  <span>Добавлено!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  <span>Добавить в корзину</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
