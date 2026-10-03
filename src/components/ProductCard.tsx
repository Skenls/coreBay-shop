import React from 'react';
import { Product } from '../types/store';
import { Sparkles, Eye } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  // Format asset path safely for relative base URL
  const formatImagePath = (src: string) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    const clean = src.replace(/^\.?\//, '');
    return `./${clean}`;
  };

  const formattedPrice = `$${product.price.toLocaleString('en-US')}`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      className="group relative flex flex-col justify-between bg-[#1E213D] border border-[#2B2F55] rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:border-[#423189] hover:shadow-[0_16px_36px_-10px_rgba(66,49,137,0.45)] select-none text-left focus:outline-none focus:ring-2 focus:ring-[#8B6FF0]/60 transform-gpu md:hover:-translate-y-1.5"
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {product.featured ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#423189]/70 text-purple-200 border border-[#8B6FF0]/30">
            <Sparkles size={11} className="text-[#8B6FF0]" />
            Хит
          </span>
        ) : (
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {product.category}
          </span>
        )}

        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
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
      </div>

      {/* Top Image Container with smooth hover zoom */}
      <div className="relative w-full h-48 sm:h-52 bg-[#171933] border border-[#25284B] rounded-xl flex items-center justify-center p-4 overflow-hidden mb-4 group-hover:border-[#353966] transition-colors">
        <img
          src={formatImagePath(product.image)}
          alt={product.name}
          loading="eager"
          decoding="async"
          width="600"
          height="450"
          className="max-h-full max-w-full object-contain transform-gpu transition-transform duration-200 ease-out md:group-hover:scale-105 drop-shadow-lg"
        />
        {/* Quick View hover badge (desktop only to prevent mobile backdrop blur repaint) */}
        <div className="hidden md:flex absolute inset-0 bg-[#1E213D]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#423189] text-white shadow-lg shadow-black/40">
            <Eye size={14} />
            Быстрый просмотр
          </span>
        </div>
      </div>

      {/* Product Title in white font */}
      <h3 className="text-white font-semibold text-base sm:text-lg mb-2.5 leading-snug line-clamp-2 md:group-hover:text-purple-200 transition-colors">
        {product.name}
      </h3>

      {/* Key spec chips */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {product.specs.slice(0, 3).map((spec, idx) => (
          <span
            key={idx}
            className="text-xs px-2.5 py-1 rounded-md bg-[#25284B] text-slate-300 border border-[#353966] font-medium"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Bottom row: Price prominently displayed in USD and "Подробнее" button */}
      <div className="mt-auto pt-3.5 border-t border-[#2B2F55]/80 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Цена
          </span>
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {formattedPrice}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#423189] text-white hover:bg-[#523da8] active:scale-95 transition-all shadow-md shadow-[#423189]/30"
        >
          <span>Подробнее</span>
        </button>
      </div>
    </div>
  );
};
