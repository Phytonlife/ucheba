import { Course, Teacher, ScheduleItem, Student } from '../types';

export const HERO_IMAGE = '/src/assets/images/regenerated_image_1794480402130.png';

export const TEACHERS: Teacher[] = [
  {
    id: 't-alexander',
    name: 'Александр Васильев',
    role: 'Ведущий архитектор ПО, Fullstack тимлид',
    experienceYears: 11,
    bio: 'Ex-Senior Engineer в Яндексе и Tinkoff. Руководил разработкой высоконагруженных финтех-платформ. Преподает веб-разработку и системное проектирование более 6 лет.',
    education: 'МГТУ им. Н.Э. Баумана, факультет ИУ (Информатика и системы управления)',
    achievements: [
      'Автор 4 практических курсов по React и Node.js',
      'Выпустил свыше 850 разработчиков уровня Junior+/Middle',
      'Спикер конференций HighLoad++ и HolyJS'
    ],
    photo: '/src/assets/images/teacher_alexander_1794478936773.jpg',
    rating: 4.96,
    studentsCount: 920,
    coursesTaught: ['Fullstack Разработчик на Python & React', 'Frontend-разработка: JavaScript, TypeScript, Next.js'],
    quote: 'Главное в программировании — научиться декомпозировать сложные инженерные задачи и писать чистый, тестируемый код.'
  },
  {
    id: 't-elena',
    name: 'Елена Соколова',
    role: 'Lead Data Scientist & AI Researcher',
    experienceYears: 9,
    bio: 'Эксперт по машинному обучению, статистическому моделированию и LLM-архитектурам. Руководила ML-командой в международном телеком-холдинге.',
    education: 'МГУ им. М.В. Ломоносова, Механико-математический факультет (кафедра теории вероятностей)',
    achievements: [
      'Кандидат физико-математических наук',
      'Победитель 3 международных хакатонов Kaggle Grandmaster',
      'Консультант enterprise-проектов по внедрению нейросетевых пайплайнов'
    ],
    photo: '/src/assets/images/teacher_elena_1794478938295.jpg',
    rating: 4.98,
    studentsCount: 740,
    coursesTaught: ['Data Science и Машинное обучение с нуля', 'Аналитик данных: SQL, Python & BI'],
    quote: 'Данные говорят сами за себя, если вы умеете задавать математически корректные вопросы.'
  },
  {
    id: 't-dmitry',
    name: 'Дмитрий Морозов',
    role: 'Директор по продуктовому дизайну, UX/UI Lead',
    experienceYears: 8,
    bio: 'Создатель дизайн-систем для крупных мобильных банков и e-commerce экосистем. Член жюри премий Tagline Awards и Среда.',
    education: 'Британская высшая школа дизайна (UX & Product Design), СПГХПА им. Штиглица',
    achievements: [
      '3 награды Red Dot Design Award за цифровые интерфейсы',
      'Наставник в менторских программах акселераторов Сколково',
      'Курирует дипломные проекты с реальными продуктовыми заказчиками'
    ],
    photo: '/src/assets/images/teacher_dmitry_1794478937212.jpg',
    rating: 4.94,
    studentsCount: 680,
    coursesTaught: ['Продуктовый и UX/UI дизайн в Figma'],
    quote: 'Эстетика интерфейса рождается из глубокого понимания пользовательских сценариев и строгой типографики.'
  },
  {
    id: 't-anna',
    name: 'Анна Воронова',
    role: 'Старший преподаватель английского языка, экзаменатор IELTS',
    experienceYears: 7,
    bio: 'Сертифицированный преподаватель Cambridge CELTA и DELTA. Специализируется на техническом английском для разработчиков и подготовке к IELTS Academic.',
    education: 'МГЛУ (Московский государственный лингвистический университет), филологический факультет',
    achievements: [
      'Личный балл IELTS Academic: 8.5',
      'Более 320 учеников успешно сдали экзамен на 7.5+ и устроились в международные компании',
      'Разработала методику разговорного интенсива для IT-собеседований'
    ],
    photo: '/src/assets/images/teacher_anna_1794478938671.jpg',
    rating: 4.99,
    studentsCount: 1100,
    coursesTaught: ['Деловой и технический английский для IT', 'Интенсивная подготовка к IELTS 7.5+'],
    quote: 'Языковой барьер преодолевается живой разговорной практикой в контексте ваших реальных рабочих задач.'
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-fullstack',
    title: 'Fullstack Разработчик на Python & React',
    slug: 'fullstack-python-react',
    category: 'programming',
    categoryLabel: 'Программирование',
    level: 'Начальный',
    durationMonths: 8,
    hoursTotal: 280,
    format: 'hybrid',
    formatLabel: 'Гибридный (Онлайн + Очные воркшопы)',
    priceFull: 114000,
    priceMonthly: 14250,
    discountPercent: 15,
    description: 'Освойте бэкенд на Python/Django/FastAPI и современный фронтенд на React & TypeScript. 4 курсовых проекта в портфолио.',
    fullDescription: 'Комплексная программа для быстрого старта в веб-разработке. Вы начнете с фундаментального синтаксиса Python и современных стандартов JavaScript, освоите реляционные базы данных PostgreSQL, контейнеризацию в Docker и построите полноценные веб-сервисы с CI/CD.',
    learningOutcomes: [
      'Проектирование надежной RESTful и GraphQL архитектуры бэкенда',
      'Создание реактивных интерфейсов на React, TypeScript и Tailwind CSS',
      'Работа со сложными SQL-запросами, транзакциями и оптимизацией PostgreSQL',
      'Контейнеризация проектов в Docker, оркестрация и деплой на Linux-серверы',
      'Прохождение технического собеседования и составление сильного резюме'
    ],
    requirements: [
      'Базовая компьютерная грамотность',
      'Умение уделять обучению от 8 до 10 часов в неделю',
      'Ноутбук или ПК с Windows, macOS или Linux'
    ],
    nextCohortDate: '1 декабря 2026',
    teacherId: 't-alexander',
    rating: 4.95,
    reviewsCount: 148,
    syllabus: [
      {
        week: 1,
        title: 'Основы Python и алгоритмическое мышление',
        topics: ['Типы данных, функции, коллекции', 'ООП в Python: классы, наследование, инкапсуляция', 'Работа с файловой системой и модулями']
      },
      {
        week: 2,
        title: 'Реляционные базы данных и SQL',
        topics: ['PostgreSQL архитектура', 'Сложные JOIN, агрегации, индексы', 'ORM SQLAlchemy и миграции Alembic']
      },
      {
        week: 3,
        title: 'Бэкенд-разработка на FastAPI & Django',
        topics: ['Асинхронные эндпоинты в FastAPI', 'Pydantic валидация и Swagger документация', 'JWT аутентификация и безопасность']
      },
      {
        week: 4,
        title: 'Современный Frontend на React & TypeScript',
        topics: ['Компонентная модель, хуки состояния и эффектов', 'Типизация в TypeScript', 'Менеджмент состояния и интеграция с API']
      },
      {
        week: 5,
        title: 'DevOps, Docker и дипломный проект',
        topics: ['Dockerfile и multi-stage сборка', 'Docker Compose для связки backend + postgres + redis', 'Финальная защита командного проекта перед работодателями']
      }
    ]
  },
  {
    id: 'course-datascience',
    title: 'Data Science и Машинное обучение с нуля',
    slug: 'data-science-machine-learning',
    category: 'analytics',
    categoryLabel: 'Аналитика и AI',
    level: 'Средний',
    durationMonths: 6,
    hoursTotal: 220,
    format: 'online',
    formatLabel: 'Онлайн (Живые вебинары + тренажеры)',
    priceFull: 89000,
    priceMonthly: 14830,
    discountPercent: 10,
    description: 'Математическая статистика, Python для анализа данных, классическое машинное обучение и основы нейросетей.',
    fullDescription: 'Углубленный практический курс, готовящий Data Scientist специалистов. Вы научитесь собирать и очищать данные, проверять статистические гипотезы, строить предсказательные модели в scikit-learn и применять современные нейросетевые трансформеры.',
    learningOutcomes: [
      'Анализ и предобработка сырых данных с помощью Pandas, NumPy, Polars',
      'Построение дашбордов и визуализаций в Matplotlib, Seaborn и Plotly',
      'Обучение моделей регрессии, классификации и кластеризации',
      'Градиентный бустинг (XGBoost, CatBoost, LightGBM)',
      'Знакомство с PyTorch, компьютерным зрением и обработкой текстов (NLP)'
    ],
    requirements: [
      'Базовые знания школьной математики',
      'Аналитический склад ума и интерес к исследованию данных'
    ],
    nextCohortDate: '24 ноября 2026',
    teacherId: 't-elena',
    rating: 4.97,
    reviewsCount: 112,
    syllabus: [
      {
        week: 1,
        title: 'Python для Data Science и разведочный анализ (EDA)',
        topics: ['Векторные вычисления в NumPy', 'Манипуляция таблицами в Pandas', 'Очистка аномалий и пропусков']
      },
      {
        week: 2,
        title: 'Математика, линейная алгебра и статистика',
        topics: ['Теория вероятностей и распределения', 'A/B тестирование и p-value', 'Матричные операции и сингулярное разложение']
      },
      {
        week: 3,
        title: 'Классическое машинное обучение',
        topics: ['Линейные модели с регуляризацией L1/L2', 'Деревья решений и Random Forest', 'Метрики качества: ROC-AUC, F1, Precision/Recall']
      },
      {
        week: 4,
        title: 'Градиентный бустинг и валидация',
        topics: ['CatBoost на табличных данных', 'Feature Engineering и отбор признаков', 'Кросс-валидация и борьба с переобучением']
      },
      {
        week: 5,
        title: 'Введение в Deep Learning и MLOps',
        topics: ['Архитектура перцептрона в PyTorch', 'Деплой моделей через FastAPI сервис', 'Презентация и защита реального бизнес-кейса']
      }
    ]
  },
  {
    id: 'course-uiux',
    title: 'Продуктовый и UX/UI дизайн в Figma',
    slug: 'product-ui-ux-design',
    category: 'design',
    categoryLabel: 'Дизайн',
    level: 'Начальный',
    durationMonths: 5,
    hoursTotal: 170,
    format: 'hybrid',
    formatLabel: 'Гибридный (Практика в дизайн-лаборатории)',
    priceFull: 68000,
    priceMonthly: 13600,
    discountPercent: 12,
    description: 'От глубинных интервью пользователей и CJM до интерактивных прототипов и дизайн-систем мирового уровня.',
    fullDescription: 'Курс на стыке исследований, визуальной эстетики и продуктового мышления. Вы научитесь проектировать удобные цифровые продукты для мобильных и веб-платформ, аргументировать дизайн-решения перед бизнесом и передавать макеты разработчикам без стресса.',
    learningOutcomes: [
      'Проведение качественных UX-исследований, Usability-тестов и CJM',
      'Профессиональная работа в Figma: Auto Layout, компоненты, переменные, варианты',
      'Проектирование масштабируемых дизайн-систем и UI-китов',
      'Интерактивное прототипирование с микровзаимодействиями и анимациями',
      'Оформление продающего портфолио на Behance и Dprofile'
    ],
    requirements: [
      'Желание создавать удобные и красивые цифровые сервисы',
      'Компьютер с поддержкой браузера и приложения Figma'
    ],
    nextCohortDate: '15 декабря 2026',
    teacherId: 't-dmitry',
    rating: 4.93,
    reviewsCount: 96,
    syllabus: [
      {
        week: 1,
        title: 'Погружение в UX: исследования и архитектура',
        topics: ['Customer Journey Map (CJM)', 'Глубинные интервью и CustDev', 'Информационная архитектура и User Flow']
      },
      {
        week: 2,
        title: 'Мастерство UI: композиция, сетки и типографика',
        topics: ['Шрифтовые пары и вертикальный ритм', 'Колористика и контрастность по WCAG', 'Модульные сетки для Web и iOS/Android']
      },
      {
        week: 3,
        title: 'Продвинутый инструментарий Figma',
        topics: ['Глубокий Auto Layout и респонсивность', 'Дизайн-токены и Figma Variables', 'Сложные компоненты со свойствами']
      },
      {
        week: 4,
        title: 'Анимация и прототипирование',
        topics: ['Smart Animate и микровзаимодействия', 'Клиентские сценарии в мобильном приложении', 'Юзабилити-тестирование на респондентах']
      },
      {
        week: 5,
        title: 'Дизайн-система и дипломный проект',
        topics: ['Сборка готовой библиотеки компонентов', 'Подготовка спецификации для разработчиков', 'Финальная защита дизайн-концепта']
      }
    ]
  },
  {
    id: 'course-english',
    title: 'Деловой и технический английский для IT',
    slug: 'business-technical-english-it',
    category: 'languages',
    categoryLabel: 'Языки',
    level: 'Средний',
    durationMonths: 4,
    hoursTotal: 120,
    format: 'online',
    formatLabel: 'Онлайн (Мини-группы до 6 человек)',
    priceFull: 48000,
    priceMonthly: 12000,
    discountPercent: 10,
    description: 'Преодолейте языковой барьер: стендапы, переписка в Slack, техническая документация и успешные собеседования.',
    fullDescription: 'Фокусный курс для специалистов, планирующих работать в международных проектах или релокацию. 80% времени занятий посвящено разговорной практике в небольших группах под руководством сертифицированного Cambridge-преподавателя.',
    learningOutcomes: [
      'Уверенное участие в англоязычных Daily Standup, Sprint Planning и Retrospective',
      'Грамотная деловая переписка, составление Pull Request и code review заметок',
      'Понимание беглой речи носителей языка и профильных технических подкастов',
      'Прохождение всех этапов HR и технического интервью на английском',
      'Расширение словарного запаса до 1 200+ профессиональных идиом и терминов'
    ],
    requirements: [
      'Уровень общего английского от Pre-Intermediate (A2+) или выше',
      'Наличие гарнитуры/микрофона для активной разговорной практики'
    ],
    nextCohortDate: '18 ноября 2026',
    teacherId: 't-anna',
    rating: 4.98,
    reviewsCount: 135,
    syllabus: [
      {
        week: 1,
        title: 'Daily Communication in Agile Teams',
        topics: ['Standup updates and blockages reporting', 'Polite requests and clarifying questions', 'Pronunciation and accent softening']
      },
      {
        week: 2,
        title: 'Technical Documentation & Asynchronous Work',
        topics: ['Writing precise Bug Reports and PR reviews', 'Architectural Decision Records (ADR)', 'Effective async discussion in Slack/Jira']
      },
      {
        week: 3,
        title: 'Negotiations & Disagreements',
        topics: ['Constructive debate over technical trade-offs', 'Soft skills and client presentations', 'Handling pushback and scope creep']
      },
      {
        week: 4,
        title: 'International Job Interview Mastery',
        topics: ['Behavioral STAR method answers', 'Presenting your past portfolio and architecture', 'Simulated mock interview with real-time feedback']
      }
    ]
  },
  {
    id: 'course-frontend',
    title: 'Frontend-разработка: JavaScript, TypeScript, Next.js',
    slug: 'frontend-typescript-nextjs',
    category: 'programming',
    categoryLabel: 'Программирование',
    level: 'Начальный',
    durationMonths: 5,
    hoursTotal: 180,
    format: 'online',
    formatLabel: 'Онлайн (Практикум + код-ревью)',
    priceFull: 65000,
    priceMonthly: 13000,
    discountPercent: 10,
    description: 'Глубокое изучение современного веб-фронтенда. Создавайте высокопроизводительные SPA и SSR веб-приложения.',
    fullDescription: 'Курс нацелен на практическое овладение современным стеком клиентской разработки: React 19, TypeScript, Next.js App Router, Tailwind CSS и инструментами тестирования.',
    learningOutcomes: [
      'Понимание асинхронного JavaScript, Event Loop, промисов и замыканий',
      'Строгая типизация сложных данных и дженериков в TypeScript',
      'Серверный рендеринг (SSR), статическая генерация (SSG) в Next.js',
      'Написание модульных тестов с Vitest и React Testing Library',
      'Оптимизация производительности Core Web Vitals и SEO'
    ],
    requirements: [
      'Базовое представление об HTML и CSS',
      'Желание программировать и готовность писать код каждый день'
    ],
    nextCohortDate: '5 декабря 2026',
    teacherId: 't-alexander',
    rating: 4.94,
    reviewsCount: 88,
    syllabus: [
      {
        week: 1,
        title: 'Современный JavaScript (ES6+)',
        topics: ['Область видимости, замыкания, прототипы', 'Event Loop, промисы, async/await', 'Работа с DOM и браузерными API']
      },
      {
        week: 2,
        title: 'TypeScript: строгая надежность кода',
        topics: ['Интерфейсы, типы, объединения', 'Дженерики (Generics) и сужение типов', 'Конфигурация tsconfig и строгий режим']
      },
      {
        week: 3,
        title: 'React архитектура и паттерны',
        topics: ['Пользовательские хуки (Custom Hooks)', 'Управление сложным состоянием', 'Оптимизация ререндеров с useMemo и useCallback']
      },
      {
        week: 4,
        title: 'Next.js 15: Server Components и маршрутизация',
        topics: ['App Router, Layouts и Server Actions', 'Кэширование данных и инкрементальная регенерация', 'Интеграция с базой данных']
      }
    ]
  },
  {
    id: 'course-analytics',
    title: 'Аналитик данных: SQL, Python & Tableau',
    slug: 'data-analytics-sql-tableau',
    category: 'analytics',
    categoryLabel: 'Аналитика и AI',
    level: 'Начальный',
    durationMonths: 5,
    hoursTotal: 160,
    format: 'hybrid',
    formatLabel: 'Гибридный (Онлайн + Лабораторные разборы)',
    priceFull: 72000,
    priceMonthly: 14400,
    discountPercent: 10,
    description: 'Обучение бизнес-анализу и аналитике данных для принятия ключевых коммерческих решений.',
    fullDescription: 'Вы научитесь извлекать данные из реляционных баз данных с помощью продвинутого SQL, анализировать тренды и когорты на Python, а также строить интерактивные дашборды для топ-менеджмента.',
    learningOutcomes: [
      'Профессиональное владение оконными функциями и CTE в SQL',
      'Когортный анализ, расчет LTV, CAC, Retention и Churn rate',
      'Интерактивная визуализация показателей в Tableau и Power BI',
      'Автоматизация рутинных отчетов с выгрузкой в Telegram/Email'
    ],
    requirements: [
      'Умение уверенно работать с таблицами Excel или Google Sheets',
      'Любовь к логике и поиску закономерностей в числах'
    ],
    nextCohortDate: '10 декабря 2026',
    teacherId: 't-elena',
    rating: 4.92,
    reviewsCount: 74,
    syllabus: [
      {
        week: 1,
        title: 'Базы данных и продвинутый SQL',
        topics: ['Оконные функции: ROW_NUMBER, RANK, LAG/LEAD', 'Обобщенные табличные выражения (CTE)', 'Оптимизация производительности запросов']
      },
      {
        week: 2,
        title: 'Юнит-экономика и продуктовые метрики',
        topics: ['Воронки конверсий и расчет юнит-экономики', 'Когортный анализ удержания пользователей (Retention)', 'RFM-сегментация клиентов']
      },
      {
        week: 3,
        title: 'Python для автоматизации и анализа',
        topics: ['Pandas для быстрой обработки датасетов', 'Статистические критерии Стьюдента и Манна-Уитни', 'Экспорт сводок']
      },
      {
        week: 4,
        title: 'BI-системы и защита дипломного проекта',
        topics: ['Построение интерактивных дашбордов в Tableau', 'Дизайн визуализации данных для руководства', 'Презентация выводов по реальному e-commerce магазину']
      }
    ]
  }
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 'sch-1',
    courseId: 'course-fullstack',
    courseTitle: 'Fullstack Разработчик на Python & React',
    teacherName: 'Александр Васильев',
    teacherPhoto: '/src/assets/images/teacher_alexander_1794478936773.jpg',
    date: '2026-11-12',
    dayOfWeek: 'Четверг (Сегодня)',
    startTime: '19:00',
    endTime: '21:00',
    topic: 'Архитектура REST API на FastAPI: внедрение Pydantic v2 и Dependency Injection',
    lessonNumber: 14,
    totalLessons: 48,
    format: 'online',
    roomOrLink: 'Zoom-аудитория №4 (Ссылка активна за 10 мин)',
    status: 'upcoming',
    materialsUrl: 'https://materials.vectorpro.ru/fastapi-di-lecture14.pdf',
    homeworkAssigned: 'Создать эндпоинты CRUD для сервиса заказов с валидацией входных схем'
  },
  {
    id: 'sch-2',
    courseId: 'course-uiux',
    courseTitle: 'Продуктовый и UX/UI дизайн в Figma',
    teacherName: 'Дмитрий Морозов',
    teacherPhoto: '/src/assets/images/teacher_dmitry_1794478937212.jpg',
    date: '2026-11-13',
    dayOfWeek: 'Пятница (Завтра)',
    startTime: '18:30',
    endTime: '20:30',
    topic: 'Проектирование дизайн-токенов и управление темами (Dark/Light) в Figma Variables',
    lessonNumber: 9,
    totalLessons: 32,
    format: 'hybrid',
    roomOrLink: 'Очный кампус, аудитория 302 / Онлайн-трансляция',
    status: 'upcoming',
    materialsUrl: 'https://materials.vectorpro.ru/figma-tokens-kit.fig',
    homeworkAssigned: 'Собрать цветовую палитру и семантические токены для мобильного банка'
  },
  {
    id: 'sch-3',
    courseId: 'course-datascience',
    courseTitle: 'Data Science и Машинное обучение с нуля',
    teacherName: 'Елена Соколова',
    teacherPhoto: '/src/assets/images/teacher_elena_1794478938295.jpg',
    date: '2026-11-14',
    dayOfWeek: 'Суббота',
    startTime: '12:00',
    endTime: '15:00',
    topic: 'Интенсив: Оценка качества моделей классификации и тюнинг гиперпараметров в Optuna',
    lessonNumber: 18,
    totalLessons: 40,
    format: 'online',
    roomOrLink: 'Zoom-аудитория №1 + Google Colab Sandbox',
    status: 'upcoming',
    materialsUrl: 'https://materials.vectorpro.ru/colab-optuna-tuning.ipynb',
    homeworkAssigned: 'Оптимизировать модель прогнозирования оттока клиентов до ROC-AUC > 0.88'
  },
  {
    id: 'sch-4',
    courseId: 'course-english',
    courseTitle: 'Деловой и технический английский для IT',
    teacherName: 'Анна Воронова',
    teacherPhoto: '/src/assets/images/teacher_anna_1794478938671.jpg',
    date: '2026-11-15',
    dayOfWeek: 'Воскресенье',
    startTime: '16:00',
    endTime: '17:30',
    topic: 'Разговорный воркшоп: Симуляция технического собеседования (Mock System Design Interview)',
    lessonNumber: 11,
    totalLessons: 24,
    format: 'online',
    roomOrLink: 'Интерактивная языковая комната #2',
    status: 'upcoming',
    materialsUrl: 'https://materials.vectorpro.ru/interview-vocab-guide.pdf',
    homeworkAssigned: 'Записать 2-минутное видео-презентацию своего дипломного проекта на английском'
  },
  {
    id: 'sch-5',
    courseId: 'course-frontend',
    courseTitle: 'Frontend-разработка: JavaScript, TypeScript, Next.js',
    teacherName: 'Александр Васильев',
    teacherPhoto: '/src/assets/images/teacher_alexander_1794478936773.jpg',
    date: '2026-11-16',
    dayOfWeek: 'Понедельник',
    startTime: '19:30',
    endTime: '21:30',
    topic: 'Оптимизация рендера и Server Actions в Next.js 15',
    lessonNumber: 21,
    totalLessons: 36,
    format: 'online',
    roomOrLink: 'Zoom-аудитория №3',
    status: 'upcoming',
    materialsUrl: 'https://materials.vectorpro.ru/nextjs15-serveractions.pdf'
  },
  {
    id: 'sch-6',
    courseId: 'course-fullstack',
    courseTitle: 'Fullstack Разработчик на Python & React',
    teacherName: 'Александр Васильев',
    teacherPhoto: '/src/assets/images/teacher_alexander_1794478936773.jpg',
    date: '2026-11-10',
    dayOfWeek: 'Вторник',
    startTime: '19:00',
    endTime: '21:00',
    topic: 'Миграции баз данных с Alembic и сложные SQL индексы в PostgreSQL',
    lessonNumber: 13,
    totalLessons: 48,
    format: 'online',
    roomOrLink: 'Запись доступна в личном кабинете',
    status: 'completed',
    materialsUrl: 'https://materials.vectorpro.ru/lecture13-alembic-recording.mp4'
  }
];

export const INITIAL_STUDENT: Student = {
  id: 'std-aleksey',
  name: 'Алексей Смирнов',
  email: 'alexey.smirnov.dev@mail.ru',
  phone: '+7 (926) 450-88-21',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  balance: 14500,
  enrolledCourses: [
    {
      courseId: 'course-fullstack',
      enrollmentDate: '2026-09-15',
      status: 'active',
      progressPercent: 38,
      completedLessons: 13,
      totalLessons: 48,
      currentGrade: 'Отлично (94%)',
      nextLesson: {
        date: '2026-11-12',
        time: '19:00',
        topic: 'Архитектура REST API на FastAPI'
      }
    },
    {
      courseId: 'course-english',
      enrollmentDate: '2026-10-01',
      status: 'active',
      progressPercent: 45,
      completedLessons: 10,
      totalLessons: 24,
      currentGrade: 'Хорошо (89%)',
      nextLesson: {
        date: '2026-11-15',
        time: '16:00',
        topic: 'Mock System Design Interview'
      }
    }
  ],
  homeworks: [
    {
      id: 'hw-1',
      courseId: 'course-fullstack',
      courseTitle: 'Fullstack Разработчик на Python & React',
      lessonTitle: 'Урок 14: Валидация схем в Pydantic и CRUD эндпоинты',
      dueDate: '2026-11-16',
      status: 'pending',
      maxScore: 100
    },
    {
      id: 'hw-2',
      courseId: 'course-fullstack',
      courseTitle: 'Fullstack Разработчик на Python & React',
      lessonTitle: 'Урок 13: Alembic миграции и индексы PostgreSQL',
      dueDate: '2026-11-11',
      status: 'graded',
      score: 96,
      maxScore: 100,
      teacherFeedback: 'Отличная реализация составных индексов и правильный откат миграции. Замечаний нет!',
      submissionDate: '2026-11-11 18:20'
    },
    {
      id: 'hw-3',
      courseId: 'course-english',
      courseTitle: 'Деловой и технический английский для IT',
      lessonTitle: 'Урок 10: Writing Professional Bug Reports',
      dueDate: '2026-11-08',
      status: 'graded',
      score: 92,
      maxScore: 100,
      teacherFeedback: 'Great technical vocabulary usage! Pay minor attention to prepositions in time expressions.',
      submissionDate: '2026-11-08 21:05'
    }
  ],
  certificates: [
    {
      id: 'cert-python-basic',
      courseTitle: 'Базовый курс: Алгоритмы и структуры данных на Python',
      studentName: 'Алексей Смирнов',
      issueDate: '15 августа 2026',
      hours: 72,
      credentialId: 'VCTR-2026-78419-RU',
      downloadUrl: '#'
    }
  ],
  transactions: [
    {
      id: 'tx-101',
      date: '2026-09-15 14:32',
      description: 'Оплата первого месяца обучения: Fullstack на Python & React',
      courseTitle: 'Fullstack Разработчик на Python & React',
      amount: 14250,
      type: 'payment',
      status: 'success',
      paymentMethod: 'Банковская карта (МИР/Visa/MC)',
      receiptNumber: 'REC-90821-2026'
    },
    {
      id: 'tx-102',
      date: '2026-10-01 11:15',
      description: 'Оплата первого месяца: Деловой английский для IT',
      courseTitle: 'Деловой и технический английский для IT',
      amount: 12000,
      type: 'payment',
      status: 'success',
      paymentMethod: 'Банковская карта (МИР/Visa/MC)',
      receiptNumber: 'REC-91045-2026'
    },
    {
      id: 'tx-103',
      date: '2026-10-15 16:40',
      description: 'Оплата второго месяца обучения: Fullstack на Python & React',
      courseTitle: 'Fullstack Разработчик на Python & React',
      amount: 14250,
      type: 'payment',
      status: 'success',
      paymentMethod: 'Банковская карта (МИР/Visa/MC)',
      receiptNumber: 'REC-91892-2026'
    }
  ]
};
