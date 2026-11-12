import React, { useState } from 'react';
import { Check, CreditCard, ShieldCheck, Calculator, Tag, Percent, ArrowRight } from 'lucide-react';
import { Course } from '../types';

interface PricingSectionProps {
  courses: Course[];
  onOpenCardPayment: (course?: Course, planType?: 'full' | 'monthly' | 'installment') => void;
  onOpenEnrollment: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  courses,
  onOpenCardPayment,
  onOpenEnrollment
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0].id);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string>('');

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'VECTOR10' || code === 'START2026') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Неверный промокод. Попробуйте VECTOR10');
    }
  };

  const discountMultiplier = promoApplied ? 0.9 : 1;
  const fullPriceFinal = Math.round(selectedCourse.priceFull * 0.85 * discountMultiplier);
  const monthlyPriceFinal = Math.round(selectedCourse.priceMonthly * discountMultiplier);
  const taxDeductionAmount = Math.round(fullPriceFinal * 0.13);

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-2">
            Прозрачная стоимость обучения
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Инвестируйте в востребованную профессию без скрытых платежей
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Выберите удобный вариант оплаты: единовременно со скидкой 15%, помесячно 
            или в беспроцентную рассрочку от банков-партнеров без первого взноса.
          </p>
        </div>

        {/* Course Selector for Pricing Calculator */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Выберите курс для расчета стоимости:
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourseId(course.id)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      selectedCourseId === course.id
                        ? 'bg-slate-950 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {course.title.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="w-full md:w-80">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Промокод (тест: VECTOR10)
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="VECTOR10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs uppercase font-mono rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-indigo-600 rounded-xl transition-colors shrink-0"
                >
                  Применить
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  ✓ Промокод применен! Дополнительная скидка -10%
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-500 font-medium mt-1">
                  {promoError}
                </p>
              )}
            </div>
          </div>

          {/* Pricing Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            {/* Plan 1: Monthly */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Тариф «Помесячный»
                </span>
                <p className="text-sm text-slate-600 mt-1">
                  Оплата каждого месяца обучения отдельно. Вы можете остановить обучение в любой момент.
                </p>

                <div className="mt-6 mb-6">
                  <span className="text-3xl font-extrabold text-slate-950 tabular-nums">
                    {monthlyPriceFinal.toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">в месяц (платеж каждые 30 дней)</span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Доступ ко всем онлайн-вебинарам и чату</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Персональная проверка домашних заданий</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Личный кабинет и записи лекций</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200">
                <button
                  onClick={() => onOpenCardPayment(selectedCourse, 'monthly')}
                  className="w-full py-3 px-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors shadow-sm text-center flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-slate-600" />
                  Оплатить картой 1-й месяц
                </button>
              </div>
            </div>

            {/* Plan 2: Full Course (-15% Discount Marquee) */}
            <div className="p-6 rounded-2xl bg-white border-2 border-indigo-600 shadow-md relative flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-sm tracking-wider">
                Выгода до {promoApplied ? '25%' : '15%'}
              </div>

              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                  Тариф «Единовременный»
                </span>
                <p className="text-sm text-slate-600 mt-1">
                  Полная оплата за весь курс с максимальной скидкой. Фиксация цены на весь период.
                </p>

                <div className="mt-6 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-950 tabular-nums">
                      {fullPriceFinal.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {selectedCourse.priceFull.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold block mt-0.5">
                    Экономия {(selectedCourse.priceFull - fullPriceFinal).toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Все опции помесячного тарифа</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Пожизненный доступ к обновлениям материалов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>2 индивидуальные сессии с HR-экспертом</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Официальный диплом установленного образца</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenCardPayment(selectedCourse, 'full')}
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/20 text-center flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Оплатить картой со скидкой
                </button>
              </div>
            </div>

            {/* Plan 3: Bank Installment 0-0-12 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Беспроцентная рассрочка
                </span>
                <p className="text-sm text-slate-600 mt-1">
                  От партнеров (Т-Банк, Сбер, Яндекс Сплит). Проценты банку оплачивает учебный центр.
                </p>

                <div className="mt-6 mb-6">
                  <span className="text-3xl font-extrabold text-slate-950 tabular-nums">
                    {Math.round(fullPriceFinal / 12).toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">в месяц на 12 месяцев (0% переплат)</span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Без первого взноса в день оформления</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Одобрение онлайн за 2 минуты по паспорту</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Первый платеж только через 30 дней</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200">
                <button
                  onClick={() => onOpenCardPayment(selectedCourse, 'installment')}
                  className="w-full py-3 px-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors shadow-sm text-center flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-slate-600" />
                  Оформить онлайн-рассрочку
                </button>
              </div>
            </div>

          </div>

          {/* Tax Deduction Callout */}
          <div className="mt-8 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">
                  Налоговый вычет 13%: верните до {taxDeductionAmount.toLocaleString('ru-RU')} ₽
                </span>
                <p className="text-slate-600 mt-0.5">
                  Так как у учебного центра «Вектор Про» есть государственная образовательная лицензия, вы можете оформить социальный вычет.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenEnrollment}
              className="text-indigo-600 hover:text-indigo-800 font-bold whitespace-nowrap shrink-0 hover:underline"
            >
              Консультация по вычету →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
