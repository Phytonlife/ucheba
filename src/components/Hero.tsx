import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, BookOpen, Calendar, CreditCard } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onExploreCourses: () => void;
  onViewSchedule: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCourses,
  onViewSchedule,
  onOpenConsultation
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Value Prop & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Государственная образовательная лицензия №041284</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Практическое IT и языковое образование для успешной карьеры
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Обучаем программированию, продуктовому дизайну, аналитике данных и техническому английскому. 
              Живые вебинары, код-ревью от практикующих тимлидов, личный кабинет ученика и рассрочка 0%.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCourses}
                className="px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 whitespace-nowrap"
              >
                Выбрать направление
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onViewSchedule}
                className="px-6 py-3.5 text-sm font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                Расписание занятий
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-5 py-3.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                Бесплатная консультация
              </button>
            </div>

            {/* Quick check benefits */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-600 border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Оплата картой, СБП или беспроцентная рассрочка</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Налоговый вычет 13% с официальным договором</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Портфолио из 4+ реальных боевых проектов</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Персональный кабинет с домашними заданиями</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 aspect-[4/3] lg:aspect-auto lg:h-[460px]">
              <img
                src={HERO_IMAGE}
                alt="Учебный кампус Вектор Про"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              {/* Overlay card for quick trust */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                      Ближайший набор
                    </span>
                    <p className="text-sm font-bold text-slate-950">
                      Старт групп: ноябрь – декабрь 2026
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Скидка до</span>
                    <span className="text-base font-extrabold text-emerald-600 tabular-nums">
                      -15%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof & Metric Strip */}
        <div className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 block tabular-nums">
              4 500+
            </span>
            <span className="text-xs font-semibold text-slate-700 block mt-1">
              Выпускников центра
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              С 2019 года на рынке EdTech
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 block tabular-nums">
              94%
            </span>
            <span className="text-xs font-semibold text-slate-700 block mt-1">
              Трудоустройство
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              В течение 3 месяцев после выпуска
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 block tabular-nums">
              4.96 ★
            </span>
            <span className="text-xs font-semibold text-slate-700 block mt-1">
              Средняя оценка менторов
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Более 1 200 честных отзывов
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block tabular-nums">
              0-0-12
            </span>
            <span className="text-xs font-semibold text-slate-700 block mt-1">
              Честная рассрочка
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Без первого взноса и переплат
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
