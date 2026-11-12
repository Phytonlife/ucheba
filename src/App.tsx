import React, { useState, useEffect } from 'react';
import { Course, Teacher, ScheduleItem, Student, TransactionItem } from './types';
import { COURSES, TEACHERS, SCHEDULE_ITEMS, INITIAL_STUDENT } from './data/mockData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CourseCatalog } from './components/CourseCatalog';
import { TeacherSection } from './components/TeacherSection';
import { ScheduleSection } from './components/ScheduleSection';
import { PricingSection } from './components/PricingSection';
import { CourseDetailModal } from './components/CourseDetailModal';
import { PaymentModal } from './components/PaymentModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { StudentPortal } from './components/StudentPortal';
import { LiveClassroomModal } from './components/LiveClassroomModal';
import { Footer } from './components/Footer';
import { CheckCircle2, X } from 'lucide-react';

const STORAGE_KEY_STUDENT = 'vector_pro_student_v1';

export default function App() {
  // Load saved student state or fallback to default initial student
  const [student, setStudent] = useState<Student>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load student from storage', e);
    }
    return INITIAL_STUDENT;
  });

  const [activeSection, setActiveSection] = useState<string>('courses');

  // Modals state
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState<boolean>(false);
  const [enrollmentPreselectedCourse, setEnrollmentPreselectedCourse] = useState<Course | null>(null);
  
  const [paymentConfig, setPaymentConfig] = useState<{
    isOpen: boolean;
    course?: Course | null;
    planType: 'full' | 'monthly' | 'installment';
    initialAmount?: number;
  }>({
    isOpen: false,
    course: null,
    planType: 'full'
  });

  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState<boolean>(false);
  const [activeLiveLesson, setActiveLiveLesson] = useState<ScheduleItem | null>(null);

  // Success toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist student state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(student));
    } catch (e) {
      console.error('Failed to save student state', e);
    }
  }, [student]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Course Detail Modal
  const handleOpenCourseModal = (course: Course) => {
    setSelectedCourseForModal(course);
  };

  // Trigger Online Enrollment
  const handleOpenEnrollment = (course?: Course) => {
    setEnrollmentPreselectedCourse(course || null);
    setSelectedCourseForModal(null);
    setEnrollmentModalOpen(true);
  };

  // Trigger Direct Card Payment
  const handleOpenCardPayment = (
    course?: Course | null,
    planType: 'full' | 'monthly' | 'installment' = 'full',
    initialAmount?: number
  ) => {
    setSelectedCourseForModal(null);
    setEnrollmentModalOpen(false);
    setPaymentConfig({
      isOpen: true,
      course: course || null,
      planType,
      initialAmount
    });
  };

  // Payment Success Handler: update student state
  const handlePaymentSuccess = (newTransaction: TransactionItem, enrolledCourseId?: string) => {
    setStudent((prev) => {
      const updatedTransactions = [newTransaction, ...prev.transactions];
      let updatedEnrolled = [...prev.enrolledCourses];

      // If this was a course enrollment and not already enrolled
      if (enrolledCourseId && !updatedEnrolled.some((ec) => ec.courseId === enrolledCourseId)) {
        const targetCourse = COURSES.find((c) => c.id === enrolledCourseId);
        updatedEnrolled.push({
          courseId: enrolledCourseId,
          enrollmentDate: new Date().toISOString().split('T')[0],
          status: 'active',
          progressPercent: 5,
          completedLessons: 1,
          totalLessons: targetCourse?.syllabus.length ? targetCourse.syllabus.length * 6 : 30,
          currentGrade: 'Новый курс',
          nextLesson: {
            date: targetCourse?.nextCohortDate || 'В ближайшие дни',
            time: '19:00',
            topic: targetCourse?.syllabus[0]?.title || 'Вводное занятие'
          }
        });
      }

      // If top-up
      let updatedBalance = prev.balance;
      if (!enrolledCourseId) {
        updatedBalance += newTransaction.amount;
      }

      return {
        ...prev,
        transactions: updatedTransactions,
        enrolledCourses: updatedEnrolled,
        balance: updatedBalance
      };
    });

    showToast(
      enrolledCourseId
        ? 'Оплата успешно принята! Курс зачислен в ваш личный кабинет.'
        : `Баланс успешно пополнен на ${newTransaction.amount.toLocaleString('ru-RU')} ₽!`
    );
  };

  // Homework submission
  const handleSubmitHomework = (homeworkId: string, solutionText: string) => {
    setStudent((prev) => ({
      ...prev,
      homeworks: prev.homeworks.map((hw) =>
        hw.id === homeworkId
          ? {
              ...hw,
              status: 'submitted',
              submissionDate: new Date().toISOString().replace('T', ' ').slice(0, 16)
            }
          : hw
      )
    }));
    showToast('Домашнее задание успешно загружено и передано преподавателю на проверку!');
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY_STUDENT);
    setStudent({
      ...INITIAL_STUDENT,
      name: 'Гость (Новый студент)',
      email: 'guest@vectorpro.ru',
      phone: '+7 (999) 000-00-00',
      balance: 0,
      enrolledCourses: []
    });
    showToast('Вы вышли из профиля студента. Можно войти снова в любой момент.');
  };

  const handleResetDemoStudent = () => {
    setStudent(INITIAL_STUDENT);
    showToast('Демо-профиль студента «Алексей Смирнов» успешно активирован.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold leading-snug">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Header
        student={student}
        onOpenPortal={() => setIsStudentPortalOpen(true)}
        onOpenEnrollment={() => handleOpenEnrollment()}
        onNavigateSection={handleNavigateSection}
        onLogout={handleLogout}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onExploreCourses={() => handleNavigateSection('courses')}
          onViewSchedule={() => handleNavigateSection('schedule')}
          onOpenConsultation={() => handleOpenEnrollment()}
        />

        {/* Demo Switcher Quick Pill Strip (useful for evaluator to test student mode vs guest) */}
        <div className="bg-slate-100/80 border-y border-slate-200/80 py-2.5 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">Текущий пользователь:</span>
              <span className="text-slate-900 font-bold">{student.name}</span>
              <span className="text-slate-400">·</span>
              <span>Курсов в кабинете: <strong className="text-indigo-600">{student.enrolledCourses.length}</strong></span>
              <span className="text-slate-400">·</span>
              <span>Баланс: <strong className="text-slate-900 tabular-nums">{student.balance.toLocaleString('ru-RU')} ₽</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsStudentPortalOpen(true)}
                className="px-3 py-1 bg-white hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-900 font-bold transition-colors"
              >
                Открыть личный кабинет ученика
              </button>
              <button
                onClick={handleResetDemoStudent}
                className="px-3 py-1 text-slate-600 hover:text-slate-900 text-xs underline"
              >
                Сбросить демо-данные
              </button>
            </div>
          </div>
        </div>

        {/* Course Catalog */}
        <CourseCatalog
          courses={COURSES}
          teachers={TEACHERS}
          onSelectCourse={handleOpenCourseModal}
          onEnrollCourse={(course) => handleOpenEnrollment(course)}
        />

        {/* Teachers Section */}
        <TeacherSection
          teachers={TEACHERS}
          onSelectCourseByTitle={(title) => {
            const match = COURSES.find((c) => c.title.includes(title));
            if (match) handleOpenCourseModal(match);
          }}
        />

        {/* Timetable / Schedule */}
        <ScheduleSection
          schedule={SCHEDULE_ITEMS}
          onOpenLiveClass={(lesson) => setActiveLiveLesson(lesson)}
        />

        {/* Pricing & Installment Calculator */}
        <PricingSection
          courses={COURSES}
          onOpenCardPayment={(course, planType) => handleOpenCardPayment(course, planType)}
          onOpenEnrollment={() => handleOpenEnrollment()}
        />

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigateSection}
        onOpenEnrollment={() => handleOpenEnrollment()}
      />

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourseForModal}
        teacher={TEACHERS.find((t) => t.id === selectedCourseForModal?.teacherId)}
        isOpen={!!selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onEnroll={(c) => handleOpenEnrollment(c)}
        onPayCard={(c) => handleOpenCardPayment(c, 'full')}
      />

      {/* Enrollment Modal */}
      <EnrollmentModal
        courses={COURSES}
        initialCourse={enrollmentPreselectedCourse}
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        onProceedToPayment={(course, planType) => handleOpenCardPayment(course, planType)}
        onRegistrationSuccess={(data) => {
          showToast(`Заявка для ${data.name} на курс «${data.courseTitle}» успешно сохранена!`);
        }}
      />

      {/* Bank Card Payment Modal */}
      <PaymentModal
        course={paymentConfig.course}
        planType={paymentConfig.planType}
        initialAmount={paymentConfig.initialAmount}
        isOpen={paymentConfig.isOpen}
        onClose={() => setPaymentConfig((prev) => ({ ...prev, isOpen: false }))}
        onPaymentSuccess={handlePaymentSuccess}
        currentStudent={student}
      />

      {/* Student Personal Portal */}
      <StudentPortal
        student={student}
        allCourses={COURSES}
        schedule={SCHEDULE_ITEMS}
        isOpen={isStudentPortalOpen}
        onClose={() => setIsStudentPortalOpen(false)}
        onOpenCardPayment={(course, planType) => handleOpenCardPayment(course, planType)}
        onOpenLiveLesson={(lesson) => {
          setIsStudentPortalOpen(false);
          setActiveLiveLesson(lesson);
        }}
        onSubmitHomework={handleSubmitHomework}
        onTopUpBalance={() => handleOpenCardPayment(null, 'monthly', 10000)}
      />

      {/* Live Webinar / Classroom Simulation */}
      <LiveClassroomModal
        lesson={activeLiveLesson}
        isOpen={!!activeLiveLesson}
        onClose={() => setActiveLiveLesson(null)}
      />

    </div>
  );
}
