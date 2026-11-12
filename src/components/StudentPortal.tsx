import React, { useState } from 'react';
import { Student, Course, ScheduleItem, TransactionItem } from '../types';
import { 
  BookOpen, Calendar, CheckSquare, Award, CreditCard, 
  ChevronRight, ExternalLink, Download, Clock, Video, 
  CheckCircle2, PlusCircle, ArrowUpRight, FileText, Send, UserCheck
} from 'lucide-react';

interface StudentPortalProps {
  student: Student;
  allCourses: Course[];
  schedule: ScheduleItem[];
  isOpen: boolean;
  onClose: () => void;
  onOpenCardPayment: (course?: Course, planType?: 'full' | 'monthly' | 'installment') => void;
  onOpenLiveLesson: (lesson: ScheduleItem) => void;
  onSubmitHomework: (homeworkId: string, solutionText: string) => void;
  onTopUpBalance: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  allCourses,
  schedule,
  isOpen,
  onClose,
  onOpenCardPayment,
  onOpenLiveLesson,
  onSubmitHomework,
  onTopUpBalance
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'courses' | 'schedule' | 'homework' | 'certificates' | 'finances'>('courses');
  const [selectedHwId, setSelectedHwId] = useState<string | null>(null);
  const [solutionInput, setSolutionInput] = useState<string>('');
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const getCourseDetails = (courseId: string) => allCourses.find((c) => c.id === courseId);

  // Student's upcoming personal lessons
  const myEnrolledCourseIds = student.enrolledCourses.map((ec) => ec.courseId);
  const mySchedule = schedule.filter((item) => myEnrolledCourseIds.includes(item.courseId));

  const handleHomeworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHwId || !solutionInput.trim()) return;
    onSubmitHomework(selectedHwId, solutionInput);
    setSubmissionSuccess(true);
    setSolutionInput('');
    setTimeout(() => {
      setSelectedHwId(null);
      setSubmissionSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Portal Header / Student Bar */}
        <div className="px-6 py-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold tracking-tight text-white">
                  {student.name}
                </h2>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                  Активный ученик
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {student.email} · {student.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-left sm:text-right bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                Баланс обучения
              </span>
              <span className="text-sm font-bold text-white tabular-nums">
                {student.balance.toLocaleString('ru-RU')} ₽
              </span>
            </div>

            <button
              onClick={onTopUpBalance}
              className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Пополнить
            </button>

            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 bg-slate-50 flex items-center gap-2 overflow-x-auto shrink-0 py-2.5">
          {[
            { id: 'courses', label: 'Мои курсы', count: student.enrolledCourses.length, icon: BookOpen },
            { id: 'schedule', label: 'Расписание', count: mySchedule.length, icon: Calendar },
            { id: 'homework', label: 'Домашние задания', count: student.homeworks.filter(h => h.status === 'pending').length, icon: CheckSquare },
            { id: 'certificates', label: 'Сертификаты', count: student.certificates.length, icon: Award },
            { id: 'finances', label: 'Оплата и чеки', count: student.transactions.length, icon: CreditCard }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          
          {/* TAB 1: Enrolled Courses */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-950">
                    Активные обучающие программы
                  </h3>
                  <p className="text-xs text-slate-500">
                    Отслеживайте прогресс прохождения уроков и готовьтесь к следующим лекциям
                  </p>
                </div>
              </div>

              {student.enrolledCourses.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-3xl">
                  <p className="text-xs text-slate-500">Вы пока не записаны на курсы.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {student.enrolledCourses.map((enrolled) => {
                    const course = getCourseDetails(enrolled.courseId);
                    if (!course) return null;
                    return (
                      <div
                        key={enrolled.courseId}
                        className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span className="font-semibold text-indigo-600">{course.categoryLabel}</span>
                            <span className="font-bold text-slate-700">{enrolled.currentGrade}</span>
                          </div>

                          <h4 className="text-base font-bold text-slate-950">
                            {course.title}
                          </h4>

                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {course.description}
                          </p>

                          {/* Progress bar */}
                          <div className="mt-4">
                            <div className="flex justify-between text-xs font-semibold mb-1">
                              <span className="text-slate-600">Прогресс программы</span>
                              <span className="text-indigo-600 tabular-nums">{enrolled.progressPercent}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                style={{ width: `${enrolled.progressPercent}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                              <span>Пройдено {enrolled.completedLessons} из {enrolled.totalLessons} уроков</span>
                              <span>Формат: {course.formatLabel.split(' ')[0]}</span>
                            </div>
                          </div>

                          {/* Next Lesson Box */}
                          {enrolled.nextLesson && (
                            <div className="mt-4 p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs">
                              <span className="text-[10px] uppercase font-bold text-indigo-600 block">
                                Следующее занятие:
                              </span>
                              <p className="font-bold text-slate-900 mt-0.5">
                                {enrolled.nextLesson.topic}
                              </p>
                              <span className="text-slate-500 text-[11px] block mt-0.5">
                                {enrolled.nextLesson.date} в {enrolled.nextLesson.time} (МСК)
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                          <button
                            onClick={() => {
                              const item = mySchedule.find(s => s.courseId === enrolled.courseId && s.status === 'upcoming');
                              if (item) onOpenLiveLesson(item);
                            }}
                            className="flex-1 py-2 px-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors text-center"
                          >
                            Войти в аудиторию
                          </button>
                          <button
                            onClick={() => setActiveTab('schedule')}
                            className="py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                          >
                            Расписание
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Student Schedule */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-950">
                  Индивидуальный график моих занятий
                </h3>
                <p className="text-xs text-slate-500">
                  Только уроки по направлениям, на которые вы зачислены
                </p>
              </div>

              {mySchedule.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-slate-200 rounded-3xl">
                  <p className="text-xs text-slate-500">Нет предстоящих уроков.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mySchedule.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 text-center py-1.5 px-1 bg-white rounded-xl border border-slate-200 text-xs font-bold">
                          <span className="block text-slate-900 tabular-nums">{item.startTime}</span>
                          <span className="text-[10px] text-slate-400">{item.date.slice(5)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-indigo-600 uppercase block">
                            {item.dayOfWeek} · Урок {item.lessonNumber}
                          </span>
                          <h4 className="text-sm font-bold text-slate-950">{item.topic}</h4>
                          <span className="text-xs text-slate-500">{item.courseTitle}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onOpenLiveLesson(item)}
                          className="py-2 px-3.5 text-xs font-bold text-white bg-slate-900 hover:bg-indigo-600 rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5" />
                          Подключиться
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Homework Submissions */}
          {activeTab === 'homework' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-950">
                    Домашние задания и код-ревью
                  </h3>
                  <p className="text-xs text-slate-500">
                    Сдавайте решения на проверку наставникам и получайте развернутые комментарии
                  </p>
                </div>
              </div>

              {/* Homework Form Drawer if Open */}
              {selectedHwId && (
                <div className="p-5 rounded-3xl bg-indigo-50/50 border border-indigo-200 mb-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Отправка задания на проверку
                  </h4>
                  <form onSubmit={handleHomeworkSubmit} className="space-y-3">
                    <textarea
                      rows={4}
                      value={solutionInput}
                      onChange={(e) => setSolutionInput(e.target.value)}
                      placeholder="Вставьте ссылку на ваш GitHub репозиторий, Figma макет или опишите выполненное задание..."
                      className="w-full p-3 rounded-2xl border border-slate-200 bg-white text-xs focus:outline-none focus:border-indigo-600"
                      required
                    />
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedHwId(null)}
                        className="py-2 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Отмена
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Отправить наставнику
                      </button>
                    </div>
                  </form>
                  {submissionSuccess && (
                    <p className="text-xs text-emerald-600 font-bold mt-2">
                      ✓ Домашняя работа отправлена на проверку! Статус обновлен.
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                {student.homeworks.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs mb-1">
                          <span className="font-semibold text-indigo-600">{hw.courseTitle}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500">Срок: {hw.dueDate}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{hw.lessonTitle}</h4>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {hw.status === 'graded' ? (
                          <div className="text-right">
                            <span className="text-xs font-bold text-emerald-600 block">
                              Проверено: {hw.score} / {hw.maxScore} баллов
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Сдано: {hw.submissionDate}
                            </span>
                          </div>
                        ) : hw.status === 'submitted' ? (
                          <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200">
                            На проверке у ментора
                          </span>
                        ) : (
                          <button
                            onClick={() => setSelectedHwId(hw.id)}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-sm"
                          >
                            Сдать работу
                          </button>
                        )}
                      </div>
                    </div>

                    {hw.teacherFeedback && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                        <strong className="text-indigo-600">Комментарий преподавателя:</strong> {hw.teacherFeedback}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Certificates & Diplomas */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-950">
                  Официальные дипломы и сертификаты
                </h3>
                <p className="text-xs text-slate-500">
                  Документы подтверждают прохождение практики и выдаются на основании лицензии №041284
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-6 rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 shadow-sm relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                          <Award className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 uppercase">
                          ID: {cert.credentialId}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                        Сертификат об окончании курса
                      </span>
                      <h4 className="text-base font-extrabold text-slate-950 mt-1">
                        {cert.courseTitle}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2">
                        Выдан: <strong>{cert.studentName}</strong> ({cert.hours} академических часов)
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Дата выдачи: {cert.issueDate}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-indigo-100/80 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Подлинность подтверждена
                      </span>
                      <button
                        onClick={() => window.print()}
                        className="py-1.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Скачать PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Finances & Receipts */}
          {activeTab === 'finances' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Текущий баланс студента:</span>
                  <span className="text-2xl font-extrabold text-slate-950 tabular-nums">
                    {student.balance.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onTopUpBalance}
                    className="py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Оплатить картой
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-950 mb-3">
                  История транзакций и кассовых чеков
                </h4>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="py-3 px-4">Дата</th>
                        <th className="py-3 px-4">Описание платежа</th>
                        <th className="py-3 px-4">Способ</th>
                        <th className="py-3 px-4 text-right">Сумма</th>
                        <th className="py-3 px-4 text-center">Чек</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {student.transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 text-slate-500 font-mono tabular-nums">{tx.date}</td>
                          <td className="py-3 px-4 font-medium text-slate-900">{tx.description}</td>
                          <td className="py-3 px-4 text-slate-600">{tx.paymentMethod}</td>
                          <td className="py-3 px-4 text-right font-bold text-slate-950 tabular-nums">
                            {tx.amount.toLocaleString('ru-RU')} ₽
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => window.print()}
                              className="text-indigo-600 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              {tx.receiptNumber}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
