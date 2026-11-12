import React from 'react';
import { Course, Teacher } from '../types';
import { X, CheckCircle2, Clock, Calendar, GraduationCap, Award, CreditCard, ArrowRight, BookOpen } from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  teacher?: Teacher;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (course: Course) => void;
  onPayCard: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  teacher,
  isOpen,
  onClose,
  onEnroll,
  onPayCard
}) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between gap-4 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                {course.categoryLabel} · {course.level}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white truncate max-w-lg">
                {course.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Main Info Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 block">Длительность:</span>
              <span className="font-bold text-slate-900 text-sm">{course.durationMonths} месяцев</span>
            </div>
            <div>
              <span className="text-slate-400 block">Нагрузка:</span>
              <span className="font-bold text-slate-900 text-sm">{course.hoursTotal} часов практики</span>
            </div>
            <div>
              <span className="text-slate-400 block">Формат:</span>
              <span className="font-bold text-slate-900 text-sm">{course.formatLabel.split(' ')[0]}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Старт потока:</span>
              <span className="font-bold text-indigo-600 text-sm">{course.nextCohortDate}</span>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              О курсе
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {course.fullDescription}
            </p>
          </div>

          {/* Learning Outcomes */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Чему вы научитесь:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.learningOutcomes.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-indigo-50/40 border border-indigo-100/80 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Подробный учебный план по модулям:
            </h4>
            <div className="space-y-3">
              {course.syllabus.map((item) => (
                <div
                  key={item.week}
                  className="p-4 rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-indigo-600 font-mono">
                      Модуль 0{item.week}.
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.title}
                    </h5>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6 list-disc text-xs text-slate-600">
                    {item.topics.map((t, tidx) => (
                      <li key={tidx}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Teacher Card */}
          {teacher && (
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              <img
                src={teacher.photo}
                alt={teacher.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-sm shrink-0"
              />
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  Преподаватель курса
                </span>
                <h5 className="text-base font-bold text-slate-900">{teacher.name}</h5>
                <p className="text-xs text-slate-500 mt-0.5">{teacher.role}</p>
                <p className="text-xs text-slate-600 mt-1">{teacher.bio}</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Action Deck */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Стоимость обучения:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-950 tabular-nums">
                от {course.priceMonthly.toLocaleString('ru-RU')} ₽/мес
              </span>
              <span className="text-xs text-slate-500">
                (или {Math.round(course.priceFull * 0.85).toLocaleString('ru-RU')} ₽ со скидкой)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => onEnroll(course)}
              className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors whitespace-nowrap"
            >
              Записаться на консультацию
            </button>
            <button
              onClick={() => onPayCard(course)}
              className="flex-1 sm:flex-initial py-2.5 px-5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <CreditCard className="w-4 h-4" />
              Оплатить картой
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
