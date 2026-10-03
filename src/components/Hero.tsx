import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigateCatalog?: () => void;
  onNavigateAbout?: () => void;
}

const getAssetUrl = (path: string) => {
  const env = (import.meta as unknown as { env?: { BASE_URL?: string } }).env;
  const base = env?.BASE_URL || '';
  const cleanBase = base ? (base.endsWith('/') ? base : `${base}/`) : '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const Hero: React.FC<HeroProps> = ({ onNavigateCatalog, onNavigateAbout }) => {
  const { scrollY } = useScroll();

  // Graceful parallax translation upwards on scroll (active on desktop, disabled on mobile for 120fps)
  const [isMobile, setIsMobile] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    const checkMotionPreference = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkMobile();
    checkMotionPreference();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldDisableParallax = isMobile || prefersReducedMotion;
  
  const parallaxLeftY = useTransform(scrollY, [0, 800], [0, -180]);
  const parallaxRightY = useTransform(scrollY, [0, 800], [0, -135]);
  const titleY = useTransform(scrollY, [0, 600], [0, -75]);
  const titleOpacity = useTransform(scrollY, [0, 450], [1, 0.2]);

  const handleCatalogClick = () => {
    if (onNavigateCatalog) {
      onNavigateCatalog();
    } else {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAboutClick = () => {
    if (onNavigateAbout) {
      onNavigateAbout();
    } else {
      const aboutEl = document.getElementById('about-project');
      if (aboutEl) {
        aboutEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const titleLines = [
    { text: 'Лучшее', gradient: false },
    { text: 'Железо.', gradient: false },
    { text: 'Больше мечты.', gradient: true },
  ];

  return (
    <section className="relative w-full h-[100svh] min-h-[38rem] sm:min-h-[42rem] overflow-hidden flex flex-col items-center justify-center bg-white select-none">
      {/* Ambient background glow & subtle dot matrix (optimized for mobile 60/120fps) */}
      <div className="absolute inset-0 bg-[radial-gradient(#E4E0F2_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#8B6FF0]/10 via-[#423189]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* LEFT HANGING ITEM: Flagship GPU on main plane, intersecting headline */}
      <motion.div
        style={{ y: shouldDisableParallax ? 0 : parallaxLeftY }}
        className="absolute -left-14 xs:-left-16 sm:left-[-2%] md:left-[0%] lg:left-[3%] xl:left-[6%] top-20 sm:top-0 z-10 pointer-events-none opacity-95 sm:opacity-100 transition-opacity duration-300"
      >
        <div className="animate-sway-left transform-gpu">
          {/* Proportional container: 3 wires extend from ceiling (y=0) directly to GPU top edge; hidden on mobile */}
          <div className="relative w-60 xs:w-64 sm:w-80 md:w-96 lg:w-[32rem] xl:w-[38rem] aspect-[800/850]">
            {/* Wire 1 (left): directly touches left fan heatsink top edge */}
            <div
              aria-hidden="true"
              style={{ left: '28%', height: '52.47%' }}
              className="hidden sm:block absolute top-0 w-[1.5px] bg-gradient-to-b from-[#8B6FF0] via-[#7B52D6] to-[#5A3AAE] shadow-[0_0_3px_rgba(139,111,240,0.4)]"
            />
            {/* Wire 2 (center): directly touches center fan top edge */}
            <div
              aria-hidden="true"
              style={{ left: '45%', height: '44.82%' }}
              className="hidden sm:block absolute top-0 w-[1.5px] bg-gradient-to-b from-[#8B6FF0] via-[#7B52D6] to-[#5A3AAE] shadow-[0_0_3px_rgba(139,111,240,0.4)]"
            />
            {/* Wire 3 (right): directly touches right fan backplate top edge */}
            <div
              aria-hidden="true"
              style={{ left: '68%', height: '36.00%' }}
              className="hidden sm:block absolute top-0 w-[1.5px] bg-gradient-to-b from-[#8B6FF0] via-[#7B52D6] to-[#5A3AAE] shadow-[0_0_3px_rgba(139,111,240,0.4)]"
            />

            {/* GPU Image: placed at y=250/850 (29.41%) matching wire drop endpoints */}
            <img
              src={getAssetUrl('assets/hero-gpu.webp')}
              alt="CoreBay Flagship GPU"
              className="absolute top-[29.41%] left-0 w-full h-auto object-contain drop-shadow-[0_16px_36px_rgba(30,33,61,0.28)]"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </motion.div>

      {/* RIGHT HANGING ITEM: MacBook on main plane, intersecting headline */}
      <motion.div
        style={{ y: shouldDisableParallax ? 0 : parallaxRightY }}
        className="absolute -right-16 xs:-right-20 sm:right-[-2%] md:right-[0%] lg:right-[3%] xl:right-[6%] top-28 sm:top-0 z-10 pointer-events-none opacity-95 sm:opacity-100 transition-opacity duration-300"
      >
        <div className="animate-sway-right transform-gpu">
          {/* Proportional container: 3 wires extend from ceiling (y=0) directly to laptop lid top edge; hidden on mobile */}
          <div className="relative w-64 xs:w-72 sm:w-88 md:w-[26rem] lg:w-[34rem] xl:w-[40rem] aspect-[814/700]">
            {/* Wire 1 (left): directly touches top-left screen edge */}
            <div
              aria-hidden="true"
              style={{ left: '28.01%', height: '47.14%' }}
              className="hidden sm:block absolute top-0 w-[1.5px] bg-gradient-to-b from-[#8B6FF0] via-[#7B52D6] to-[#5A3AAE] shadow-[0_0_3px_rgba(139,111,240,0.4)]"
            />
            {/* Wire 2 (center): directly touches top-center notch/lid */}
            <div
              aria-hidden="true"
              style={{ left: '38.08%', height: '45.00%' }}
              className="hidden sm:block absolute top-0 w-[1.5px] bg-gradient-to-b from-[#8B6FF0] via-[#7B52D6] to-[#5A3AAE] shadow-[0_0_3px_rgba(139,111,240,0.4)]"
            />
            {/* Wire 3 (right): directly touches top-right screen lid */}
            <div
              aria-hidden="true"
              style={{ left: '48.03%', height: '43.00%' }}
              className="hidden sm:block absolute top-0 w-[1.5px] bg-gradient-to-b from-[#8B6FF0] via-[#7B52D6] to-[#5A3AAE] shadow-[0_0_3px_rgba(139,111,240,0.4)]"
            />

            {/* Laptop Image: placed at y=242/700 (34.57%) matching wire drop endpoints */}
            <img
              src={getAssetUrl('assets/hero-laptop.webp')}
              alt="CoreBay Flagship Laptop"
              className="absolute top-[34.57%] left-0 w-full h-auto object-contain drop-shadow-[0_16px_36px_rgba(30,33,61,0.28)]"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </motion.div>

      {/* CENTER HEADLINE & CTA */}
      <motion.div
        style={{ y: shouldDisableParallax ? 0 : titleY, opacity: shouldDisableParallax ? 1 : titleOpacity }}
        className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center pt-8 sm:pt-0"
      >

        {/* Staggered headline reveal with crisp contrast halo for legibility over 3D hardware */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1E213D] tracking-tight leading-[1.06] flex flex-col items-center">
          {titleLines.map((line, index) => (
            <motion.span
              key={line.text}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.15 + index * 0.14,
                duration: prefersReducedMotion ? 0 : 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                line.gradient
                  ? 'bg-gradient-to-r from-[#423189] via-[#6D54CD] to-[#8B6FF0] bg-clip-text text-transparent pb-1 drop-shadow-[0_2px_18px_rgba(255,255,255,0.92)] drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]'
                  : 'text-[#1E213D] drop-shadow-[0_2px_18px_rgba(255,255,255,0.92)] drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]'
              }
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.68, duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-7 max-w-xl text-sm sm:text-lg md:text-xl text-slate-700 font-medium leading-relaxed px-3 py-1 bg-white/75 sm:bg-white/40 backdrop-blur-[3px] sm:backdrop-blur-none rounded-xl"
        >
          Флагманские видеокарты, ультрабуки и компоненты для тех, кто строит будущее.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.86, duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <button
            onClick={handleCatalogClick}
            className="w-full sm:w-auto justify-center px-7 py-3.5 rounded-xl bg-[#423189] text-white font-semibold text-base shadow-lg shadow-purple-900/25 hover:bg-[#342470] hover:shadow-xl hover:shadow-purple-900/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
          >
            <span>В каталог</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <button
            onClick={handleAboutClick}
            className="w-full sm:w-auto justify-center px-7 py-3.5 rounded-xl bg-white/90 text-[#1E213D] font-semibold text-base border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm cursor-pointer"
          >
            О проекте
          </button>
        </motion.div>
      </motion.div>

      {/* BOTTOM SCROLL CUE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.1, duration: prefersReducedMotion ? 0 : 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group select-none transition-transform hover:translate-y-0.5"
        role="button"
        tabIndex={0}
        onClick={handleAboutClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAboutClick();
          }
        }}
        aria-label="Прокрутить к описанию проекта"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 group-hover:text-[#423189] font-semibold transition-colors duration-200">
          Листайте вниз
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-slate-300 group-hover:border-[#423189] flex justify-center pt-1.5 transition-colors duration-200 bg-white/70 backdrop-blur-[2px] shadow-sm">
          <div className="w-1 h-2 rounded-full bg-[#423189] animate-wheel" />
        </div>
      </motion.div>
    </section>
  );
};
