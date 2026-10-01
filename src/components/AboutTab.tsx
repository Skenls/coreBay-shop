import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, ArrowRight, Send, Mail } from 'lucide-react';
import { CpuLogo } from './Header';

interface AboutTabProps {
  onNavigateCatalog?: () => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({ onNavigateCatalog }) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center">
      {/* Title & Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#423189]/10 text-[#423189] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#423189]/20">
          <CpuLogo className="w-4 h-4" />
          <span>Манифест CoreBay</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#16122B] mb-4">
          Инженерия чистого кремния.
        </h1>
        <p className="text-base sm:text-lg text-[#7B7890] leading-relaxed">
          Мы создали CoreBay как альтернативу безликим ритейлерам. Здесь каждый процессор,
          видеокарта и ноутбук проходят строгий отбор инженерами перед отправкой в ваши руки.
        </p>
      </motion.div>

      {/* 3 Compact Principles Cards in #1E213D */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#1E213D] border border-[#2B2F55] rounded-2xl p-6 text-white shadow-xl hover:-translate-y-1 transition-transform"
        >
          <div className="w-12 h-12 rounded-xl bg-[#423189] flex items-center justify-center mb-5 text-[#8B6FF0]">
            <Cpu className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-[#8B6FF0] uppercase tracking-wider block mb-1">01 / Селекция</span>
          <h2 className="text-lg font-bold mb-2">Только лучший кремний</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Отбираем партии с высоким разгонным потенциалом и стабильными фазами питания. Никаких дефектных ревизий.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#1E213D] border border-[#2B2F55] rounded-2xl p-6 text-white shadow-xl hover:-translate-y-1 transition-transform"
        >
          <div className="w-12 h-12 rounded-xl bg-[#423189] flex items-center justify-center mb-5 text-[#8B6FF0]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-[#8B6FF0] uppercase tracking-wider block mb-1">02 / Гарантия</span>
          <h2 className="text-lg font-bold mb-2">5 лет мгновенной замены</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Если что-то пойдет не так, мы меняем устройство на новое в день обращения, не заставляя ждать недели экспертиз.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#1E213D] border border-[#2B2F55] rounded-2xl p-6 text-white shadow-xl hover:-translate-y-1 transition-transform"
        >
          <div className="w-12 h-12 rounded-xl bg-[#423189] flex items-center justify-center mb-5 text-[#8B6FF0]">
            <Zap className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-[#8B6FF0] uppercase tracking-wider block mb-1">03 / Доставка</span>
          <h2 className="text-lg font-bold mb-2">Бронированная упаковка</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Комплектующие перевозятся в кейсах с амортизирующим наполнителем и датчиками удара. Доставка от 24 часов.
          </p>
        </motion.div>
      </div>

      {/* Quick Action Footer inside About */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-[#FAF9FF] border border-[#E4E0F2] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-bold text-[#16122B] mb-1">Готовы собрать сетап мечты?</h2>
          <p className="text-sm text-[#7B7890]">Инженеры CoreBay на связи и готовы помочь с подбором железа.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:hello@corebay.example"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#423189]/30 text-[#423189] hover:bg-[#423189]/5 text-sm font-medium transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>hello@corebay.example</span>
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#423189]/30 text-[#423189] hover:bg-[#423189]/5 text-sm font-medium transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </a>
          {onNavigateCatalog && (
            <button
              onClick={onNavigateCatalog}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#423189] hover:bg-[#342470] text-white text-sm font-semibold transition-all shadow-md shadow-[#423189]/20"
            >
              <span>В каталог</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
