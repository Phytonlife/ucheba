export type CourseCategory = 'all' | 'programming' | 'analytics' | 'design' | 'languages';
export type CourseFormat = 'online' | 'offline' | 'hybrid';

export interface SyllabusItem {
  week: number;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  categoryLabel: string;
  level: 'Начальный' | 'Средний' | 'Продвинутый';
  durationMonths: number;
  hoursTotal: number;
  format: CourseFormat;
  formatLabel: string;
  priceFull: number;
  priceMonthly: number;
  discountPercent?: number;
  description: string;
  fullDescription: string;
  learningOutcomes: string[];
  requirements: string[];
  nextCohortDate: string;
  teacherId: string;
  rating: number;
  reviewsCount: number;
  syllabus: SyllabusItem[];
  colorTheme?: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  bio: string;
  education: string;
  achievements: string[];
  photo: string;
  rating: number;
  studentsCount: number;
  coursesTaught: string[];
  quote: string;
}

export interface ScheduleItem {
  id: string;
  courseId: string;
  courseTitle: string;
  teacherName: string;
  teacherPhoto: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  topic: string;
  lessonNumber: number;
  totalLessons: number;
  format: CourseFormat;
  roomOrLink: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  materialsUrl?: string;
  homeworkAssigned?: string;
}

export interface EnrolledCourse {
  courseId: string;
  enrollmentDate: string;
  status: 'active' | 'completed';
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  currentGrade: string;
  nextLesson?: {
    date: string;
    time: string;
    topic: string;
  };
}

export interface HomeworkItem {
  id: string;
  courseId: string;
  courseTitle: string;
  lessonTitle: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  maxScore: number;
  teacherFeedback?: string;
  submissionDate?: string;
}

export interface CertificateItem {
  id: string;
  courseTitle: string;
  studentName: string;
  issueDate: string;
  hours: number;
  credentialId: string;
  downloadUrl?: string;
}

export interface TransactionItem {
  id: string;
  date: string;
  description: string;
  courseTitle?: string;
  amount: number;
  type: 'payment' | 'topup' | 'installment';
  status: 'success' | 'processing';
  paymentMethod: 'Банковская карта (МИР/Visa/MC)' | 'СБП' | 'Т-Банк Сплит';
  receiptNumber: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  balance: number;
  enrolledCourses: EnrolledCourse[];
  homeworks: HomeworkItem[];
  certificates: CertificateItem[];
  transactions: TransactionItem[];
}
