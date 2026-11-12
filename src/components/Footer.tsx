import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenEnrollment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnrollment }) => {
  return (
    <footer id="about" className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & License */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                В
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Вектор Про
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Аккредитованный центр дополнительного профессионального образования. 
              Обучаем программированию, дизайну и иностранным языкам с выдачей дипломов государственного образца.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-white block mb-0.5">Лицензия на образовательную деятельность</span>
                №041284 от 14.10.2021 Департамента образования и науки г. Москвы
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Навигация
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  Каталог курсов
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('teachers')} className="hover:text-white transition-colors">
                  Преподаватели
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('schedule')} className="hover:text-white transition-colors">
                  Расписание занятий
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
                  Стоимость и рассрочка
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Documents */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Документы
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Договор публичной оферты</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Политика обработки данных (152-ФЗ)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Положение об аттестации</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Справка для налогового вычета 13%</a></li>
            </ul>
          </div>

          {/* Col 5: Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Контакты центра
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <a href="tel:+74958204120" className="hover:underline font-mono">+7 (495) 820-41-20</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <a href="mailto:it.academy.level@gmail.com" className="hover:underline">it.academy.level@gmail.com</a>
              </div>
              <div className="flex items-start gap-2 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Москва, ул. Ленинская Слобода, 19, БЦ «Омега Плаза», этаж 4</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEnrollment}
                className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-colors"
              >
                Задать вопрос методисту
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 Образовательный центр «Вектор Про». Все права защищены.</p>
          <p>Прием платежей: МИР, Visa, MasterCard, СБП. Банк-партнер: ПАО «Т-Банк».</p>
        </div>

      </div>
    </footer>
  );
};
