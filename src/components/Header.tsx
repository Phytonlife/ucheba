import React, { useState } from 'react';
import { BookOpen, User, Calendar, Award, Phone, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { Student } from '../types';

interface HeaderProps {
  student: Student | null;
  onOpenPortal: () => void;
  onOpenEnrollment: () => void;
  onNavigateSection: (sectionId: string) => void;
  onLogout: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  onOpenPortal,
  onOpenEnrollment,
  onNavigateSection,
  onLogout,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'courses', label: 'Курсы' },
    { id: 'teachers', label: 'Преподаватели' },
    { id: 'schedule', label: 'Расписание' },
    { id: 'pricing', label: 'Стоимость' },
    { id: 'about', label: 'О центре' }
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-8">
          
          {/* Zone 1: Single text wordmark with subtle emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-indigo-600 transition-colors">
                В
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-950 block">
                  Вектор Про
                </span>
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                  Учебный центр
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap py-1 hover:text-slate-950 ${
                  activeSection === link.id
                    ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                    : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Student Portal or Action button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {student ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-left"
                >
                  <img
                    src={student.avatar}
                    alt={student.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-900 block truncate max-w-[130px]">
                      {student.name}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block">
                      Кабинет ученика
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">Баланс обучения</p>
                      <p className="text-base font-bold text-slate-900 tabular-nums">
                        {student.balance.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenPortal();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Мои курсы и домашки
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('schedule');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-slate-400" />
                      Расписание занятий
                    </button>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Выйти из профиля
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenPortal}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap"
              >
                Вход для учеников
              </button>
            )}

            <button
              onClick={onOpenEnrollment}
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-indigo-600 rounded-xl transition-colors shadow-sm whitespace-nowrap"
            >
              Записаться на курс
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            {student && (
              <button
                onClick={onOpenPortal}
                className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-slate-300"
              >
                <img src={student.avatar} alt="Profile" className="w-full h-full object-cover" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left py-2 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-bold bg-slate-100 text-slate-900 rounded-xl"
            >
              {student ? 'Личный кабинет ученика' : 'Войти в личный кабинет'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnrollment();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-bold bg-indigo-600 text-white rounded-xl shadow-sm"
            >
              Записаться на курс
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
