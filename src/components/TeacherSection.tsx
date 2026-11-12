import React, { useState } from 'react';
import { Teacher } from '../types';
import { Award, BookOpen, Star, GraduationCap, Users, Quote } from 'lucide-react';

interface TeacherSectionProps {
  teachers: Teacher[];
  onSelectCourseByTitle?: (courseTitle: string) => void;
}

export const TeacherSection: React.FC<TeacherSectionProps> = ({
  teachers,
  onSelectCourseByTitle
}) => {
  const [activeTeacherId, setActiveTeacherId] = useState<string>(teachers[0].id);
  const activeTeacher = teachers.find((t) => t.id === activeTeacherId) || teachers[0];

  return (
    <section id="teachers" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-2">
            Эксперты и наставники
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Преподаватели из ведущих технологических компаний
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Никаких теоретиков. Наши преподаватели — действующие тимлиды, ведущие архитекторы, 
            Data Science исследователи и сертифицированные экзаменаторы с многолетним стажем.
          </p>
        </div>

        {/* Teachers Horizontal Selector / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {teachers.map((teacher) => {
            const isSelected = teacher.id === activeTeacherId;
            return (
              <button
                key={teacher.id}
                onClick={() => setActiveTeacherId(teacher.id)}
                className={`flex flex-col items-center p-4 rounded-3xl transition-all text-center relative border ${
                  isSelected
                    ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-3 shadow-inner">
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-950 leading-tight">
                  {teacher.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {teacher.role}
                </p>
                <div className="mt-2 text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span className="tabular-nums">{teacher.rating}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{teacher.experienceYears} лет</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight Card for the Selected Teacher */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Portrait & Key Stats */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              <div className="w-full max-w-[280px] aspect-square rounded-3xl overflow-hidden shadow-lg border border-slate-100 mb-5">
                <img
                  src={activeTeacher.photo}
                  alt={activeTeacher.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full max-w-[280px] space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Практический стаж:</span>
                  <span className="font-bold text-slate-900 tabular-nums">{activeTeacher.experienceYears} лет</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Выпущено студентов:</span>
                  <span className="font-bold text-slate-900 tabular-nums">{activeTeacher.studentsCount}+</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Рейтинг курсанта:</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1 tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    {activeTeacher.rating} / 5.0
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: In-depth Dossier */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                  Преподаватель центра
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
                  {activeTeacher.name}
                </h3>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {activeTeacher.role}
                </p>
              </div>

              {/* Quote */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs sm:text-sm italic flex gap-3">
                <Quote className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>«{activeTeacher.quote}»</span>
              </div>

              {/* Bio & Education */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>{activeTeacher.bio}</p>
                <div className="flex items-start gap-2 pt-1 text-xs text-slate-700">
                  <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Образование:</strong> {activeTeacher.education}</span>
                </div>
              </div>

              {/* Key Achievements */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Ключевые достижения и экспертиза:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTeacher.achievements.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5"
                    >
                      <Award className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courses Taught by this mentor */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Курсы под руководством преподавателя:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeTeacher.coursesTaught.map((cTitle, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800"
                    >
                      {cTitle}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
