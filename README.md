# ⚡ CoreBay — Hardware Store & Interactive Showcase

<div align="center">

[![Deploy to GitHub Pages](https://github.com/Skenls/coreBay-shop/actions/workflows/deploy.yml/badge.svg)](https://github.com/Skenls/coreBay-shop/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-423189?style=flat-square&logo=github)](https://skenls.github.io/coreBay-shop/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.11-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

<br />

### 🌐 **[Попробовать интерактивное демо онлайн →](https://skenls.github.io/coreBay-shop/)**

*Премиальный интернет-магазин флагманского аппаратного обеспечения и компонентов для энтузиастов, геймеров и создателей контента.*

</div>

---

## 📌 О проекте

**CoreBay** — современная витрина высокопроизводительного железа с кинематографичными физическими анимациями, продуманным UX и бескомпромиссной производительностью 120 FPS на любых устройствах.

> [!NOTE]
> **Демонстрационный режим:** Проект является интерактивной демонстрацией интерфейса (UI/UX showcase). Корзина покупок работает в сессионном режиме без сохранения на сервере.

---

## ✨ Ключевые особенности

- 🎯 **Физический Hero-экран:** Флагманская видеокарта и ультрабук на основном плане, подвешенные на тонких прецизионных нитях с физическим раскачиванием (pendulum sway) и скролл-параллаксом.
- 📱 **Плавность 120 FPS на мобильных:** Аппаратное ускорение на GPU-композиторе (`translate3d`, `will-change: transform`), отключение микрофризов при тач-скролле, адаптивная компоновка элементов.
- 🛒 **Интерактивный каталог:** Фильтрация по категориям (видеокарты, ноутбуки, процессоры, мониторы) с активной вкладкой «Видеокарты» по умолчанию, живой поиск и чипы фильтров.
- 🔍 **3D Quick View:** Модальное окно быстрого просмотра с эффектным увеличением и вращением (`scale: 0.2, rotate: -180deg` → `scale: 1, rotate: 0deg`), замыливанием фона (`backdrop-blur`) и подробными спецификациями.
- 🛍️ **Слайд-панель корзины:** Выезжающая корзина со счётчиком товаров в хедере, управлением количеством и автоматическим пересчётом итоговой стоимости.
- 📖 **Вкладка «О нас»:** Минималистичная презентация философии CoreBay, ключевых метрик и архитектуры без перегрузки скроллом.
- 🌐 **Сквозной футер:** Полнофункциональный нижний блок в цвете `#1E213D` со ссылками, контактами и правовой информацией на всех вкладках.
- 🚀 **Автодеплой в GitHub Pages:** Настроенный CI/CD пайплайн в GitHub Actions с автоматической сборкой и загрузкой артефактов дистрибутива.

---

## 🎨 Фирменная палитра

| Цвет | HEX | Назначение |
| :--- | :--- | :--- |
| **Чистый белый** | `#FFFFFF` | Основной фон страниц |
| **Глубокий индиго / пурпур** | `#423189` | Фирменный хедер, акцентные кнопки, свечение нитей |
| **Тёмный полуночный** | `#1E213D` | Карточки товаров, модальные окна, глобальный футер |
| **Неоновый ультрафиолет** | `#8B6FF0` | Градиенты слогана, акценты, hover-эффекты |

---

## 🛠️ Стек технологий

- **Фреймворк:** React 18, TypeScript
- **Сборщик:** Vite 5.4
- **Стилизация:** Tailwind CSS 3.4, PostCSS, Autoprefixer
- **Анимации:** Framer Motion 11
- **Плавный скролл:** Lenis Smooth Scroll
- **Иконки:** Lucide React
- **Изображения:** Оптимизированные WebP нового поколения
- **CI/CD:** GitHub Actions (автоматический деплой в GitHub Pages + downloadable workflow artifacts)

---

## 🚀 Быстрый старт локально

### Требования
- **Node.js** версии 18+ (рекомендуется 20 LTS)
- **npm** версии 9+

### Установка и запуск

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/Skenls/coreBay-shop.git
cd coreBay-shop

# 2. Установите зависимости
npm install

# 3. Запустите dev-сервер
npm run dev
```

Сайт откроется по адресу `http://localhost:5173`.

### Сборка для продакшена

```bash
npm run build
```

Скомпилированные статические файлы будут сохранены в директории `dist/`.

---

## 📂 Структура проекта

```
coreBay-shop/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions автодеплой в Pages + сборка
├── public/
│   └── assets/                 # Оптимизированные WebP ассеты
│       ├── catalog/            # Изображения товаров (GPU, CPU, Laptops, Displays)
│       ├── hero-gpu.webp       # 3D модель видеокарты
│       └── hero-laptop.webp    # 3D модель ультрабука
├── src/
│   ├── components/             # React-компоненты
│   │   ├── AboutProject.tsx    # Блок «О проекте» на главной
│   │   ├── AboutTab.tsx        # Отдельная страница «О нас»
│   │   ├── CartDrawer.tsx      # Выдвижная корзина
│   │   ├── Catalog.tsx         # Каталог с фильтрами и категориями
│   │   ├── Footer.tsx          # Сквозной футер #1E213D
│   │   ├── Header.tsx          # Фиксированная навигационная панель #423189
│   │   ├── Hero.tsx            # Главный экран с подвешенным оборудованием
│   │   ├── ProductCard.tsx     # Карточка товара с предпросмотром
│   │   └── ProductModal.tsx    # 3D модальное окно быстрого просмотра
│   ├── context/
│   │   └── CartContext.tsx     # Контекст корзины покупок
│   ├── data/
│   │   └── products.ts         # База товаров CoreBay
│   ├── types/
│   │   └── store.ts            # TypeScript типы и интерфейсы
│   ├── App.tsx                 # Корневой компонент с вкладками и Lenis
│   ├── index.css               # Tailwind и аппаратные GPU-анимации
│   └── main.tsx                # Точка входа Vite
├── index.html                  # HTML-шаблон с метатегами
├── LICENSE                     # Лицензия MIT
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 Лицензия

Проект распространяется под открытой лицензией [MIT](LICENSE).

<div align="center">
  <sub>Разработано для CoreBay. 2026.</sub>
</div>
