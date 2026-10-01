import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Cpu,
  Fan,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface AboutProjectProps {
  onNavigateCatalog?: () => void;
  className?: string;
}

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  prefix = '',
  suffix = '',
  duration = 2000,
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let frameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const updateCounter = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = easeOutExpo(progress);
      setCurrentValue(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCounter);
      }
    };

    frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, duration]);

  return (
    <span ref={containerRef} className="tabular-nums">
      {prefix}
      {currentValue.toLocaleString('ru-RU')}
      {suffix}
    </span>
  );
};

interface FeatureCardProps {
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    badge: string;
    description: string;
  };
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative bg-[#1E213D] text-white p-7 sm:p-9 rounded-2xl border border-white/10 shadow-xl hover:border-[#8B6FF0]/60 hover:shadow-2xl hover:shadow-purple-900/30 transition-[border-color,box-shadow] duration-300 group overflow-hidden flex flex-col justify-between"
    >
      {/* Ambient hover glow inside card */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#8B6FF0]/10 rounded-full blur-2xl group-hover:bg-[#8B6FF0]/25 transition-colors duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/25 to-purple-900/50 border border-[#8B6FF0]/40 flex items-center justify-center text-[#8B6FF0] group-hover:scale-110 group-hover:text-purple-200 transition-transform duration-300 shadow-sm">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-200">
            {feature.badge}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
          {feature.title}
        </h3>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-purple-300/80 font-medium">
        <Zap className="w-3.5 h-3.5 text-[#8B6FF0]" />
        <span>Стандарт сборки CoreBay Ultra-Tier</span>
      </div>
    </motion.div>
  );
};

export const AboutProject: React.FC<AboutProjectProps> = ({
  onNavigateCatalog,
  className = '',
}) => {
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

  const features = [
    {
      icon: Cpu,
      title: 'Экстремальная селекция',
      badge: 'Топ 1% ревизий',
      description:
        'Отбираем только проверенные чипы и топовые ревизии. Исключаем кремниевую лотерею: каждый графический процессор и кристалл CPU тестируется на стабильность частот под предельной нагрузкой.',
    },
    {
      icon: Fan,
      title: 'Инженерия охлаждения',
      badge: 'ΔT < 62°C · 0 dB Idle',
      description:
        'Тишина и низкие температуры. Индивидуальный подбор фазовых термопрокладок, зеркальная полировка медных теплораспределителей и ручная настройка акустических кривых под 4K-рендерингом.',
    },
    {
      icon: ShieldCheck,
      title: 'Честная гарантия',
      badge: '5 лет безоговорочно',
      description:
        '5 лет безоговорочной поддержки. Мгновенная прямая замена вышедшего из строя компонента со склада в день обращения без бюрократических экспертиз и многонедельного ожидания.',
    },
    {
      icon: Truck,
      title: 'Быстрая логистика',
      badge: 'Бронебоксы с датчиками',
      description:
        'Бережная доставка в усиленных бронебоксах с демпферами вибраций, контрольными пломбами удара и антистатической герметизацией прямо до вашего рабочего места.',
    },
  ];

  const stats = [
    {
      value: 120,
      suffix: 'k+',
      label: 'Довольных клиентов',
      detail: 'Геймеры, 3D-артисты и ИИ-инженеры по всему миру',
    },
    {
      value: 24,
      suffix: '/7',
      label: 'Инженерная поддержка',
      detail: 'Прямой контакт со специалистами без ботов и скриптов',
    },
    {
      value: 5,
      suffix: ' лет',
      label: 'Честной гарантии',
      detail: 'Полная замена узлов без условий и мелкого шрифта',
    },
  ];

  const highlights = [
    '72-часовой стресс-тест',
    'Нулевой брак кремния',
    'Phase-Change термоинтерфейсы',
    'Прямой Swap без экспертиз',
  ];

  return (
    <section
      id="about-project"
      className={`relative py-20 sm:py-28 md:py-36 bg-gradient-to-b from-white via-slate-50/80 to-white overflow-hidden ${className}`}
    >
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* STORY & MANIFESTO HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-50 border border-purple-200/70 text-[#423189] mb-5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B6FF0]" />
            <span>Манифест CoreBay</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E213D] tracking-tight leading-[1.12] mb-8"
          >
            Архитектура бескомпромиссной мощи
          </motion.h2>

          {/* Manifesto box with styled highlights */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-7 sm:p-10 rounded-3xl bg-white border border-[#E4E0F2] shadow-xl shadow-purple-950/5 text-left md:text-center"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 font-normal leading-relaxed">
              «Мы создали CoreBay, потому что устали от компромиссов и кремниевой рулетки. 
              В мире, где вычислительная мощность определяет будущее, мы отбираем{' '}
              <span className="px-2.5 py-1 rounded-lg bg-purple-100/90 text-[#423189] font-semibold border border-purple-200/70 inline-block transition-transform hover:scale-105">
                проверенные кристаллы
              </span>
              , применяем{' '}
              <span className="px-2.5 py-1 rounded-lg bg-purple-100/90 text-[#423189] font-semibold border border-purple-200/70 inline-block transition-transform hover:scale-105">
                лабораторную калибровку
              </span>{' '}
              и гарантируем абсолютную стабильность без звёздочек и мелкого шрифта. Ваше железо должно расширять границы возможного.»
            </p>

            {/* Quick highlight pills */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200/80 hover:border-purple-300 hover:text-[#423189] hover:bg-purple-50/50 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6FF0]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4 FEATURE CARDS IN #1E213D */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* STATS SECTION WITH ANIMATED COUNT-UP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-[#1E213D] via-[#222547] to-[#1E213D] border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8B6FF0]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? 'pt-8 md:pt-0 md:pl-8 lg:pl-12' : ''
                }`}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2 flex items-baseline justify-center">
                  <span className="bg-gradient-to-r from-white via-purple-100 to-[#8B6FF0] bg-clip-text text-transparent">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-purple-200 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* BOTTOM CTA LINK TO CATALOG */}
        <div className="mt-16 text-center">
          <button
            onClick={handleCatalogClick}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#423189] text-white font-semibold text-base shadow-lg shadow-purple-900/25 hover:bg-[#342470] hover:shadow-xl hover:shadow-purple-900/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span>Перейти к выбору железа</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};
