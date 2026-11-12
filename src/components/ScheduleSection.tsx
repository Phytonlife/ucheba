import React, { useState } from 'react';
import { ScheduleItem } from '../types';
import { Calendar, Clock, Video, MapPin, Download, ExternalLink, CheckCircle, Bell, Filter } from 'lucide-react';

interface ScheduleSectionProps {
  schedule: ScheduleItem[];
  onOpenLiveClass?: (item: ScheduleItem) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  schedule,
  onOpenLiveClass
}) => {
  const [formatFilter, setFormatFilter] = useState<'all' | 'online' | 'hybrid'>('all');
  const [activeDateTab, setActiveDateTab] = useState<'all' | 'today' | 'upcoming'>('all');
  const [notificationSaved, setNotificationSaved] = useState<string | null>(null);

  const filteredSchedule = schedule.filter((item) => {
    const matchesFormat = formatFilter === 'all' || item.format === formatFilter;
    const isToday = item.date === '2026-11-12';
    
    if (activeDateTab === 'today') return matchesFormat && isToday;
    if (activeDateTab === 'upcoming') return matchesFormat && item.status === 'upcoming';
    return matchesFormat;
  });

  const handleAddToCalendar = (item: ScheduleItem) => {
    // Generate .ics calendar event
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vector Pro Academy//Schedule//RU
BEGIN:VEVENT
UID:${item.id}@vectorpro.ru
DTSTAMP:20261112T100000Z
DTSTART:${item.date.replace(/-/g, '')}T${item.startTime.replace(':', '')}00
DTEND:${item.date.replace(/-/g, '')}T${item.endTime.replace(':', '')}00
SUMMARY:${item.courseTitle}: ${item.topic}
DESCRIPTION:Преподаватель: ${item.teacherName}. Локация: ${item.roomOrLink}
LOCATION:${item.roomOrLink}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `vectorpro-lesson-${item.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotificationSaved(item.id);
    setTimeout(() => setNotificationSaved(null), 3000);
  };

  return (
    <section id="schedule" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-2">
              График учебного процесса
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Расписание занятий и открытых воркшопов
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Следите за лекциями в реальном времени. Все занятия транслируются в HD качестве, 
              а видеозаписи с презентациями автоматически сохраняются в личном кабинете.
            </p>
          </div>

          {/* Quick Date Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl shrink-0">
            <button
              onClick={() => setActiveDateTab('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                activeDateTab === 'all'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Все занятия
            </button>
            <button
              onClick={() => setActiveDateTab('today')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                activeDateTab === 'today'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Сегодня
            </button>
            <button
              onClick={() => setActiveDateTab('upcoming')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                activeDateTab === 'upcoming'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Предстоящие
            </button>
          </div>
        </div>

        {/* Format Filter Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Фильтр по формату:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'Все форматы' },
                { id: 'online', label: 'Только онлайн' },
                { id: 'hybrid', label: 'Гибрид / Очно' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormatFilter(f.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                    formatFilter === f.id
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 hidden sm:block">
            Найдено уроков: <span className="font-bold text-slate-800">{filteredSchedule.length}</span>
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filteredSchedule.map((item) => {
            const isToday = item.date === '2026-11-12';
            return (
              <div
                key={item.id}
                className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                  isToday
                    ? 'bg-indigo-50/30 border-indigo-200 shadow-sm'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  
                  {/* Left: Time and Date badge */}
                  <div className="flex items-start sm:items-center gap-4 shrink-0">
                    <div className="w-16 sm:w-20 text-center py-2 px-1 rounded-2xl bg-slate-100 border border-slate-200/60">
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 block tabular-nums">
                        {item.startTime}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium block">
                        до {item.endTime}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs mb-1">
                        <span className={`font-bold ${isToday ? 'text-indigo-600' : 'text-slate-700'}`}>
                          {item.dayOfWeek}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500 tabular-nums">{item.date}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500">Урок {item.lessonNumber} из {item.totalLessons}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-950">
                        {item.topic}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 mt-0.5">
                        {item.courseTitle}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Teacher & Room/Link */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-2.5 py-1.5 px-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <img
                        src={item.teacherPhoto}
                        alt={item.teacherName}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <span className="text-[10px] text-slate-400 block">Преподаватель</span>
                        <span className="font-bold text-slate-800">{item.teacherName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      {item.format === 'online' ? (
                        <Video className="w-4 h-4 text-indigo-500 shrink-0" />
                      ) : (
                        <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      <span className="font-medium truncate max-w-[200px]" title={item.roomOrLink}>
                        {item.roomOrLink}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button
                      onClick={() => handleAddToCalendar(item)}
                      title="Скачать напоминание для Google/Apple Calendar"
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors relative"
                    >
                      <Bell className="w-4 h-4" />
                      {notificationSaved === item.id && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-0.5 px-2 rounded-md whitespace-nowrap shadow-md">
                          .ICS скачан!
                        </span>
                      )}
                    </button>

                    {item.status === 'completed' ? (
                      <span className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-slate-500" />
                        Занятие прошло
                      </span>
                    ) : (
                      <button
                        onClick={() => onOpenLiveClass && onOpenLiveClass(item)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap ${
                          isToday
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        {isToday ? 'Войти в вебинар' : 'Подключиться к уроку'}
                      </button>
                    )}
                  </div>

                </div>

                {/* Additional homework / materials note */}
                {item.homeworkAssigned && (
                  <div className="mt-3 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      <strong className="text-slate-700">Домашнее задание:</strong> {item.homeworkAssigned}
                    </span>
                    {item.materialsUrl && (
                      <a
                        href={item.materialsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Материалы
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
