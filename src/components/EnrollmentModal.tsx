import React, { useState } from 'react';
import { Course } from '../types';
import { X, CheckCircle2, CreditCard, ShieldCheck, Phone, Mail, User, BookOpen } from 'lucide-react';

interface EnrollmentModalProps {
  courses: Course[];
  initialCourse?: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: (course: Course, planType: 'full' | 'monthly' | 'installment') => void;
  onRegistrationSuccess: (studentData: { name: string; email: string; phone: string; courseTitle: string }) => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  courses,
  initialCourse,
  isOpen,
  onClose,
  onProceedToPayment,
  onRegistrationSuccess
}) => {
  if (!isOpen) return null;

  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourse ? initialCourse.id : courses[0].id
  );
  const [selectedFormat, setSelectedFormat] = useState<'online' | 'hybrid'>('online');
  const [selectedPlan, setSelectedPlan] = useState<'full' | 'monthly' | 'installment'>('full');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('+7 ');
  const [wantInstantPayment, setWantInstantPayment] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || phone.length < 10) return;

    if (wantInstantPayment) {
      onProceedToPayment(selectedCourse, selectedPlan);
    } else {
      setIsSubmitted(true);
      onRegistrationSuccess({
        name,
        email,
        phone,
        courseTitle: selectedCourse.title
      });
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                Онлайн-запись на обучение
              </h3>
              <p className="text-[11px] text-slate-400">
                Забронируйте место в ближайшем потоке
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-slate-950">
              Заявка успешно принята!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Методист учебного центра свяжется с вами по номеру <strong>{phone}</strong> в течение 15 минут для подтверждения записи и предоставления вводных материалов.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
            >
              Отлично
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Course Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Выберите образовательную программу
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} — от {c.priceMonthly.toLocaleString('ru-RU')} ₽/мес
                  </option>
                ))}
              </select>
            </div>

            {/* Format Preference */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Предпочитаемый формат
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFormat('online')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    selectedFormat === 'online'
                      ? 'bg-slate-950 text-white border-slate-950'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Онлайн (с живыми вебинарами)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFormat('hybrid')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    selectedFormat === 'hybrid'
                      ? 'bg-slate-950 text-white border-slate-950'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Очно в кампусе / Гибрид
                </button>
              </div>
            </div>

            {/* Student Contact Info */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Ваше имя и фамилия
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Константин Лебедев"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email для личного кабинета
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="student@example.ru"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Телефон для связи
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Choice Toggle */}
            <div className="pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-900">
                  <input
                    type="radio"
                    name="paymentPreference"
                    checked={wantInstantPayment}
                    onChange={() => setWantInstantPayment(true)}
                    className="text-indigo-600"
                  />
                  <span>Оплатить банковской картой прямо сейчас (скидка 15%)</span>
                </label>

                {wantInstantPayment && (
                  <div className="pl-6 pt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('full')}
                      className={`px-3 py-1 text-[11px] font-bold rounded-lg ${
                        selectedPlan === 'full' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Полный курс ({Math.round(selectedCourse.priceFull * 0.85).toLocaleString('ru-RU')} ₽)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('monthly')}
                      className={`px-3 py-1 text-[11px] font-bold rounded-lg ${
                        selectedPlan === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Помесячно ({selectedCourse.priceMonthly.toLocaleString('ru-RU')} ₽)
                    </button>
                  </div>
                )}

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="radio"
                    name="paymentPreference"
                    checked={!wantInstantPayment}
                    onChange={() => setWantInstantPayment(false)}
                    className="text-indigo-600"
                  />
                  <span>Забронировать консультацию и бесплатный пробный урок</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                {wantInstantPayment ? (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Перейти к оплате картой
                  </>
                ) : (
                  'Записаться на бесплатный пробный урок'
                )}
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              Нажимая кнопку, вы соглашаетесь с условиями оферты и обработкой персональных данных по 152-ФЗ
            </p>

          </form>
        )}

      </div>
    </div>
  );
};
