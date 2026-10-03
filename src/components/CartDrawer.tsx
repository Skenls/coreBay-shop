import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export interface CartDrawerProps {
  onNavigateCatalog?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateCatalog }) => {
  const {
    items,
    totalCount,
    totalPrice,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [completedOrderTotal, setCompletedOrderTotal] = useState(0);
  const [completedOrderCount, setCompletedOrderCount] = useState(0);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setShowCheckoutModal(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close drawer or modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showCheckoutModal) {
          setShowCheckoutModal(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showCheckoutModal, setIsOpen]);

  const handleCheckoutClick = () => {
    setCompletedOrderTotal(totalPrice);
    setCompletedOrderCount(totalCount);
    setShowCheckoutModal(true);
  };

  const handleFinishCheckout = () => {
    clearCart();
    setShowCheckoutModal(false);
    setIsOpen(false);
  };

  const handleCatalogNavigation = () => {
    setIsOpen(false);
    if (onNavigateCatalog) {
      onNavigateCatalog();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 md:bg-black/60 md:backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide-over panel container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#1E213D] text-white shadow-2xl flex flex-col border-l border-white/10 transform-gpu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#423189] text-white">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 id="cart-title" className="font-bold text-lg sm:text-xl text-white">
                      Корзина
                    </h2>
                    <p className="text-xs text-white/60">
                      {totalCount === 0
                        ? 'Нет выбранных товаров'
                        : `${totalCount} ${totalCount === 1 ? 'товар' : totalCount < 5 ? 'товара' : 'товаров'}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-white/50 hover:text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                      title="Очистить всю корзину"
                    >
                      Очистить
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    aria-label="Закрыть корзину"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {items.length === 0 ? (
                  /* Empty state */
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-[#25284B] border border-white/10 flex items-center justify-center text-white/40 mb-2">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h3 className="font-bold text-lg text-white">Ваша корзина пуста</h3>
                    <p className="text-sm text-white/60 max-w-xs leading-relaxed">
                      Добавьте топовые комплектующие или ноутбуки из каталога CoreBay, чтобы протестировать оформление заказа.
                    </p>
                    <button
                      type="button"
                      onClick={handleCatalogNavigation}
                      className="mt-4 px-6 py-3 rounded-xl bg-[#423189] hover:bg-[#4E3A9F] active:scale-95 text-white font-medium text-sm inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/20"
                    >
                      <span>Перейти в каталог</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                ) : (
                  /* Items list */
                  <ul className="space-y-4 divide-y divide-white/10">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.li
                          key={item.product.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pt-4 first:pt-0 flex gap-3 sm:gap-4 items-start"
                        >
                          {/* Item Thumbnail */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#25284B] p-2 flex items-center justify-center shrink-0 border border-white/10 overflow-hidden relative group">
                            {item.product.image ? (
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  // Fallback placeholder if image load fails
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <ShoppingBag className="w-6 h-6 text-white/30" />
                            )}
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium text-sm sm:text-base text-white truncate" title={item.product.name}>
                                {item.product.name}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeItem(item.product.id)}
                                className="text-white/40 hover:text-red-400 p-1 rounded-md hover:bg-white/5 transition-colors shrink-0"
                                aria-label={`Удалить ${item.product.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Short specs */}
                            {item.product.specs && item.product.specs.length > 0 && (
                              <p className="text-xs text-white/50 truncate mt-0.5">
                                {item.product.specs.slice(0, 2).join(' • ')}
                              </p>
                            )}

                            {/* Price & Quantity Controls */}
                            <div className="mt-3 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-amber-400 text-sm sm:text-base">
                                  ${(item.product.price * item.quantity).toLocaleString('en-US')}
                                </span>
                                {item.quantity > 1 && (
                                  <span className="text-xs text-white/50 block">
                                    ${item.product.price.toLocaleString('en-US')} / шт.
                                  </span>
                                )}
                              </div>

                              {/* Quantity buttons */}
                              <div className="flex items-center gap-1 bg-[#25284B] rounded-lg p-1 border border-white/10">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.product.id, -1)}
                                  className="w-6 h-6 rounded-md hover:bg-white/10 active:scale-90 flex items-center justify-center transition-colors text-white/80 hover:text-white"
                                  aria-label="Уменьшить количество"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-semibold px-2 min-w-[24px] text-center select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.product.id, 1)}
                                  className="w-6 h-6 rounded-md hover:bg-white/10 active:scale-90 flex items-center justify-center transition-colors text-white/80 hover:text-white"
                                  aria-label="Увеличить количество"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-white/10 bg-[#1A1D36] sm:bg-[#1A1D36]/90 sm:backdrop-blur space-y-4">
                  {/* Total price row */}
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-white/70">Итого к оплате:</span>
                    <div className="text-right">
                      <span className="font-extrabold text-2xl text-white tracking-tight">
                        ${totalPrice.toLocaleString('en-US')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    onClick={handleCheckoutClick}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#423189] to-[#6348C9] hover:from-[#4E3A9F] hover:to-[#7458DE] active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-indigo-500/25 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <span>Оформить заказ (Демо)</span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </button>

                  {/* Demo Notice */}
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs text-center flex items-center justify-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>Демо-режим: корзина хранится в рамках текущей сессии и не сохраняется на сервере.</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Modal Confirmation Dialog */}
          <AnimatePresence>
            {showCheckoutModal && (
              <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCheckoutModal(false)}
                  className="fixed inset-0 bg-black/85 md:bg-black/70 md:backdrop-blur-md"
                />

                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="relative z-10 w-full max-w-md bg-[#25284B] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl text-center space-y-5 transform-gpu"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="checkout-modal-title"
                >
                  {/* Success Icon */}
                  <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h3 id="checkout-modal-title" className="font-extrabold text-xl sm:text-2xl text-white">
                      Заказ успешно сформирован!
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Спасибо за тестирование магазина <span className="font-semibold text-white">CoreBay</span>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-[#1E213D] border border-white/10 text-left space-y-2 text-sm">
                    <div className="flex justify-between items-center text-white/70">
                      <span>Количество товаров:</span>
                      <span className="font-semibold text-white">{completedOrderCount} шт.</span>
                    </div>
                    <div className="flex justify-between items-center text-white/70">
                      <span>Сумма заказа:</span>
                      <span className="font-bold text-amber-400 text-base">
                        ${completedOrderTotal.toLocaleString('en-US')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-white/70">
                      <span>Статус:</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                        ● Демо-подтверждение
                      </span>
                    </div>
                  </div>

                  {/* Clarification info */}
                  <div className="text-xs text-white/60 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                    ℹ️ Это демонстрационный проект. Реальное списание денежных средств и доставка товаров не производятся.
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleFinishCheckout}
                      className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-[#1E213D] font-bold text-sm sm:text-base transition-all shadow-lg"
                    >
                      Отлично, завершить и очистить корзину
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCheckoutModal(false)}
                      className="w-full py-2.5 px-4 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-sm transition-colors"
                    >
                      Вернуться к корзине
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
