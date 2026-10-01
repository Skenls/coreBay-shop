import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { NavTab } from './types/store';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Hero } from './components/Hero';
import { AboutProject } from './components/AboutProject';
import { Catalog } from './components/Catalog';
import { AboutTab } from './components/AboutTab';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Initialize Lenis smooth scroll for desktop wheel scrolling only
  useEffect(() => {
    // On mobile touch devices, native momentum scrolling is hardware-accelerated at 120Hz
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
    if (isTouch) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.12,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#16122B] selection:bg-[#423189] selection:text-white">
      {/* Fixed Header */}
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Tab Content */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <div>
            <Hero
              onNavigateCatalog={() => handleTabChange('catalog')}
              onNavigateAbout={() => handleTabChange('about')}
            />
            <AboutProject onNavigateCatalog={() => handleTabChange('catalog')} />
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="pt-20">
            <Catalog />
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <AboutTab onNavigateCatalog={() => handleTabChange('catalog')} />
          </div>
        )}
      </main>

      {/* Common Bottom Footer on #1E213D on every page */}
      <Footer onTabChange={handleTabChange} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
