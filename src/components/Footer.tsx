import React from 'react';
import { Mail, Send, ShieldCheck, Zap, Award, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { NavTab } from '../types/store';
import { CpuLogo } from './Header';

export interface FooterProps {
  onTabChange?: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  const handleCatalogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#1E213D] text-white rounded-t-3xl sm:rounded-t-[40px] pt-14 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 shadow-2xl relative overflow-hidden">
      {/* Decorative background glow elements */}
      <div className="hidden sm:block absolute -top-24 left-1/4 w-96 h-96 bg-[#423189]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute -bottom-24 right-1/4 w-96 h-96 bg-[#8B6FF0]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Prominent Demo Disclaimer Banner */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left shadow-inner">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="text-sm sm:text-base leading-relaxed">
            <span className="font-semibold text-amber-300">Внимание: </span>
            ⚠️ Проект является демонстрационным. Все заказы и корзина тестовые и не сохраняются на сервере.
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <a
              href="#home"
              onClick={handleHomeClick}
              className="inline-flex items-center gap-3 group focus:outline-none"
            >
              <CpuLogo className="w-9 h-9 transition-transform group-hover:scale-105" />
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                CoreBay
              </span>
            </a>

            <p className="text-white/70 text-sm leading-relaxed">
              Премиальное аппаратное обеспечение для геймеров, энтузиастов и специалистов. Прямые поставки от ведущих технологических лидеров.
            </p>

            <div className="pt-2 space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Официальная гарантия до 5 лет</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Экспресс-доставка заказов</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>100% оригинальная продукция</span>
              </div>
            </div>
          </div>

          {/* Column 2: Catalog Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide uppercase text-xs text-amber-400/90">
              Каталог товаров
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href="#catalog"
                  onClick={handleCatalogClick}
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Видеокарты (GPU)
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={handleCatalogClick}
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Ноутбуки и ультрабуки
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={handleCatalogClick}
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Процессоры (CPUs)
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={handleCatalogClick}
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Профессиональные мониторы
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={handleCatalogClick}
                  className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium transition-colors"
                >
                  Все товары <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service & Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide uppercase text-xs text-amber-400/90">
              Сервис и помощь
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href="#about"
                  onClick={handleAboutClick}
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  О компании CoreBay
                </a>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Условия доставки и оплаты
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Гарантийное обслуживание
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Возврат и обмен компонентов
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  База знаний и FAQ
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contacts */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide uppercase text-xs text-amber-400/90">
              Контакты
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <div>
                <a
                  href="mailto:hello@corebay.example"
                  className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>hello@corebay.example</span>
                </a>
              </div>

              <div>
                <a
                  href="https://t.me/corebay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Send className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Telegram: @corebay_support</span>
                </a>
              </div>

              <div className="pt-1 text-xs text-white/60 space-y-1">
                <p>Время работы: Пн-Вс: 09:00 — 21:00 (МСК)</p>
                <p>Горячая линия: +7 (800) 555-35-35 (Демо)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright and demo note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 CoreBay Hardware. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white/70 transition-colors">Политика конфиденциальности (Демо)</span>
            <span className="hover:text-white/70 transition-colors">Пользовательское соглашение</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
