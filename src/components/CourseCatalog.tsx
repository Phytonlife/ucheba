import React, { useState } from 'react';
import { Course, CourseCategory, Teacher } from '../types';
import { Search, Clock, Calendar, Check, ArrowUpRight, GraduationCap, Sparkles } from 'lucide-react';

interface CourseCatalogProps {
  courses: Course[];
  teachers: Teacher[];
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  teachers,
  onSelectCourse,
  onEnrollCourse
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: CourseCategory; label: string }[] = [
    { id: 'all', label: 'Все программы' },
    { id: 'programming', label: 'Программирование' },
    { id: 'analytics', label: 'Аналитика и AI' },
    { id: 'design', label: 'Дизайн' },
    { id: 'languages', label: 'Английский' }
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || course.format === selectedFormat;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesFormat && matchesSearch;
  });

  const getTeacher = (teacherId: string) => teachers.find((t) => t.id === teacherId);

  return (
    <section id="courses" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-2">
            Каталог образовательных программ
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Курсы с фокусом на практику и трудоустройство
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Каждая программа разработана с учетом актуальных требований работодателей в 2026 году. 
            Обучение ведется на реальных кейсах с персональной проверкой заданий.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Segmented Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск по курсам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

          </div>

          {/* Secondary filter: Format tabs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <span className="font-medium">Формат занятий:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'Все форматы' },
                { id: 'online', label: 'Онлайн' },
                { id: 'hybrid', label: 'Гибридный / Очный' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFormat(f.id)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                    selectedFormat === f.id
                      ? 'bg-slate-200 text-slate-900 font-semibold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border border-dashed border-slate-200 bg-slate-50">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">Курсы не найдены</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Попробуйте изменить поисковый запрос или сбросить фильтры направлений
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFormat('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const teacher = getTeacher(course.teacherId);
              return (
                <div
                  key={course.id}
                  className="group flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-200 p-6 relative overflow-hidden"
                >
                  <div>
                    {/* Unboxed metadata line with middot separators (constitution rule 1.A) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-indigo-600">{course.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.level}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.durationMonths} мес.</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 group-hover:text-indigo-600 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {course.description}
                    </p>

                    {/* Format and cohort date info */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Формат:</span>
                        <span className="font-medium text-slate-800">{course.formatLabel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Старт группы:</span>
                        <span className="font-semibold text-slate-900">{course.nextCohortDate}</span>
                      </div>
                    </div>

                    {/* Lead Teacher Snippet */}
                    {teacher && (
                      <div className="mt-4 p-3 rounded-2xl bg-slate-50 flex items-center gap-3">
                        <img
                          src={teacher.photo}
                          alt={teacher.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{teacher.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{teacher.role}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Рассрочка 0%</span>
                        <span className="text-xl font-extrabold text-slate-950 tabular-nums">
                          от {course.priceMonthly.toLocaleString('ru-RU')} ₽<span className="text-xs font-normal text-slate-500">/мес</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Полный курс</span>
                        <span className="text-xs font-bold text-slate-700 tabular-nums">
                          {course.priceFull.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="w-full py-2.5 px-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
                      >
                        Программа
                      </button>
                      <button
                        onClick={() => onEnrollCourse(course)}
                        className="w-full py-2.5 px-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm text-center flex items-center justify-center gap-1"
                      >
                        Записаться
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
