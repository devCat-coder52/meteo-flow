# MeteoFlow

Погодное приложение, предоставляющее актуальные сведения о прогнозе погоды из [OpenWeatherMap](https://openweathermap.org).

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?logo=vue.js&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/vite-5.0.0-9135FF?logo=vite)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-007ACC?logo=typescript)
![Pinia](https://img.shields.io/badge/pinia-4.0.3-FFD859?logo=pinia)
![PrimeVue](https://img.shields.io/badge/primevue-3.53.1-10B981?logo=primevue)

## Особенности

- **Геолокация**: Автоматическое определение местоположения пользователя
- **Текущая погода**: Температура, влажность, давление, скорость ветра
- **Прогноз**: Детальный прогноз на несколько дней
- **Анимированный фон**: Динамическая смена фона в зависимости от погодных условий
- **Мультиязычность**: Поддержка нескольких языков (RU/EN)

## Быстрый старт

### Требования

- Node.js >= 18.x
- npm >= 9.x

### Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/meteo-flow.git
cd meteo-flow

# Установите зависимости
npm install

# Запустите проект в режиме разработки
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

## Сборка для продакшена

```bash
# Создайте оптимизированную сборку
npm run build

# Предварительный просмотр собранной версии
npm run preview
```

Собранные файлы будут находиться в папке `dist/`.

## Структура проекта

```
meteo-flow/
├── src/
│   ├── assets/            # Ассеты (изображения, стили)
│   │   └── videos/            # Фоновые видео для разных погодных условий
│   ├── components/        # Переиспользуемые Vue-компоненты
│   ├── composables/       # Композируемые функции (Composition API)
│   ├── layouts/           # Макеты страниц
│   ├── services/          # API-сервисы и бизнес-логика
│   ├── stores/            # Pinia хранилища состояния
│   ├── types/             # TypeScript типы и интерфейсы
│   ├── utils/             # Вспомогательные функции
│   ├── views/             # Страницы приложения
│   ├── App.vue            # Корневой компонент
│   └── main.ts            # Точка входа
├── index.html             # HTML-шаблон
├── vite.config.ts         # Конфигурация Vite
├── tsconfig.json          # Конфигурация TypeScript
└── package.json           # Зависимости проекта
```

## Технологии

- **Frontend**: Vue 3 (Composition API), TypeScript
- **Сборка**: Vite
- **Управление состоянием**: Pinia
- **UI-библиотека**: PrimeVue
- **Стилизация**: TailwindCSS, CSS Variables
- **Работа с датой**: Day.js
- **HTTP-клиент**: Axios

## Настройка окружения

Создайте файл `.env` в корне проекта для хранения переменных окружения:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Получить API ключ можно на [OpenWeatherMap](https://openweathermap.org/api).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск сервера разработки |
| `npm run build` | Проверка типов TypeScript и сборка для продакшена |
| `npm run preview` | Предпросмотр собранной версии |

## Лицензия

Этот проект распространяется под лицензией MIT. Подробнее см. в файле [LICENSE](LICENSE).
