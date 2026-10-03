import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ArrowUpDown,
  SlidersHorizontal,
  Zap,
  Laptop,
  Cpu,
  Monitor,
} from 'lucide-react';
import { ProductCategory, Product } from '../types/store';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

const renderCategoryIcon = (
  category: ProductCategory,
  isActive: boolean,
  size = 16
) => {
  const className = isActive ? 'text-white' : 'text-[#8B6FF0]';
  switch (category) {
    case 'gpus':
      return <Zap size={size} className={className} />;
    case 'laptops':
      return <Laptop size={size} className={className} />;
    case 'cpus':
      return <Cpu size={size} className={className} />;
    case 'displays':
      return <Monitor size={size} className={className} />;
    default:
      return <Cpu size={size} className={className} />;
  }
};

export const Catalog: React.FC = () => {
  // Default category is 'gpus' (Видеокарты)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('gpus');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Dynamic category counts from product list
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      gpus: 0,
      laptops: 0,
      cpus: 0,
      displays: 0,
    };
    PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, []);

  // Filtered and sorted products list
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      // Category filter
      if (product.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (query) {
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        const matchesSpecs = product.specs.some((spec) =>
          spec.toLowerCase().includes(query)
        );
        return matchesName || matchesDescription || matchesSpecs;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return (b.rating ?? 0) - (a.rating ?? 0);
        case 'popular':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Catalog Title and Description */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121324] tracking-tight">
          Каталог компонентов
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-1.5">
          Флагманские решения для геймеров, энтузиастов и профессионалов
        </p>
      </div>

      {/* Mobile Horizontal Scrollable Categories Chips Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar touch-pan-x overscroll-x-contain">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? cat.count;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#423189] text-white shadow-md shadow-[#423189]/30'
                  : 'bg-[#1E213D] text-slate-300 hover:bg-[#25284B] hover:text-white border border-[#2B2F55]'
              }`}
            >
              {renderCategoryIcon(cat.id, isActive, 15)}
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#25284B] text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Layout: Desktop Right Sidebar + Center Products Grid */}
      <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
        {/* Desktop Right Sidebar for Categories */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-24 bg-[#1E213D] border border-[#2B2F55] rounded-2xl p-5 shadow-lg shadow-black/10">
          <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-[#2B2F55]">
            <SlidersHorizontal size={18} className="text-[#8B6FF0]" />
            <h3 className="font-bold text-white text-base">Категории</h3>
          </div>

          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] ?? cat.count;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#423189] text-white shadow-md shadow-[#423189]/40 border border-[#8B6FF0]/40'
                      : 'bg-[#171933] text-slate-300 hover:bg-[#25284B] hover:text-white border border-[#2B2F55]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {renderCategoryIcon(cat.id, isActive, 16)}
                    <span>{cat.name}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#25284B] text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center Section: Search, Sorting, and Products Grid */}
        <div className="flex-1 min-w-0 w-full">
          {/* Toolbar: Search & Sorting */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию или характеристикам..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#423189] focus:ring-2 focus:ring-[#8B6FF0]/20 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Очистить поиск"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative inline-flex items-center">
                <ArrowUpDown
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:border-[#423189] focus:ring-2 focus:ring-[#8B6FF0]/20 cursor-pointer shadow-sm appearance-none"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="rating">По рейтингу</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results count indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
            <span>
              Показано: <strong className="text-slate-800">{filteredProducts.length}</strong>{' '}
              {filteredProducts.length === 1
                ? 'товар'
                : filteredProducts.length > 1 && filteredProducts.length < 5
                ? 'товара'
                : 'товаров'}
            </span>
          </div>

          {/* Empty state or Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#1E213D] border border-[#2B2F55] rounded-2xl p-10 sm:p-14 text-center text-white my-4">
              <div className="w-14 h-14 rounded-2xl bg-[#25284B] flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold mb-1.5">Ничего не найдено</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                По вашему запросу не найдено подходящих товаров в выбранной категории. Попробуйте изменить формулировку или сбросить фильтры.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('gpus');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#423189] hover:bg-[#523da8] text-white transition-colors shadow-md shadow-[#423189]/30"
              >
                Сбросить поиск
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [content-visibility:auto] [contain-intrinsic-size:800px]">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Product Modal with Zoom and Spin Animation */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
