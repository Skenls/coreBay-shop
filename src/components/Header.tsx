import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { NavTab } from '../types/store';
import { useCart } from '../context/CartContext';

export interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

/**
 * Stylized CPU Logo (Die with perimeter contacts and gold central core)
 */
export const CpuLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="headerCpuGold" x1="12" y1="12" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.45" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="headerCpuDie" x1="8" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F2168" />
          <stop offset="1" stopColor="#1E1645" />
        </linearGradient>
      </defs>

      {/* Substrate chip package */}
      <rect x="4" y="4" width="28" height="28" rx="4" fill="url(#headerCpuDie)" stroke="#8B6FF0" strokeWidth="1.2" />

      {/* Contact pins around package */}
      {/* Top pins */}
      <path d="M10 1.5v2.5M14 1.5v2.5M18 1.5v2.5M22 1.5v2.5M26 1.5v2.5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
      {/* Bottom pins */}
      <path d="M10 32v2.5M14 32v2.5M18 32v2.5M22 32v2.5M26 32v2.5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
      {/* Left pins */}
      <path d="M1.5 10h2.5M1.5 14h2.5M1.5 18h2.5M1.5 22h2.5M1.5 26h2.5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
      {/* Right pins */}
      <path d="M32 10h2.5M32 14h2.5M32 18h2.5M32 22h2.5M32 26h2.5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />

      {/* Corner marker (Pin 1 indicator) */}
      <circle cx="7.5" cy="7.5" r="1" fill="#F59E0B" />

      {/* Circuit traces */}
      <path d="M9 18h2.5M24.5 18H27M18 9v2.5M18 24.5V27" stroke="#8B6FF0" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

      {/* Silicon Die */}
      <rect x="11.5" y="11.5" width="13" height="13" rx="2" fill="#131026" stroke="#F59E0B" strokeWidth="0.9" />

      {/* Gold Core */}
      <rect x="14" y="14" width="8" height="8" rx="1.2" fill="url(#headerCpuGold)" />

      {/* Core microarchitecture cross */}
      <path d="M14 18h8M18 14v8" stroke="#92400E" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
};

const navTabs: { id: NavTab; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'about', label: 'О нас' },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { totalCount, setIsOpen } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 120) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down past threshold -> hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> show
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-40 bg-[#423189] text-white shadow-lg transform-gpu select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: CPU Logo + CoreBay Brand */}
        <button
          type="button"
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
          aria-label="CoreBay - На главную"
        >
          <div className="transition-transform duration-300 md:group-hover:scale-110 md:group-hover:rotate-6">
            <CpuLogo className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white md:group-hover:text-amber-300 transition-colors">
            CoreBay
          </span>
        </button>

        {/* Center: Tabs navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`relative px-3 sm:px-5 py-2 text-xs sm:text-sm md:text-base font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="header-active-tab-line"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Cart Button with count badge and bounce animation */}
        <div className="flex items-center">
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 sm:p-3 rounded-xl hover:bg-white/10 active:scale-95 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Открыть корзину, товаров: ${totalCount}`}
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />

            <AnimatePresence>
              {totalCount > 0 && (
                <motion.span
                  key="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-amber-400 text-[#1E213D] text-[11px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-[#423189]"
                >
                  {totalCount > 99 ? '99+' : totalCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
