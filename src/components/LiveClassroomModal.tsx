import React, { useState } from 'react';
import { ScheduleItem } from '../types';
import { X, Mic, MicOff, Video, VideoOff, MessageSquare, Send, Users, Hand, Download, Share2, Sparkles } from 'lucide-react';

interface LiveClassroomModalProps {
  lesson: ScheduleItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveClassroomModal: React.FC<LiveClassroomModalProps> = ({
  lesson,
  isOpen,
  onClose
}) => {
  if (!isOpen || !lesson) return null;

  const [micActive, setMicActive] = useState<boolean>(false);
  const [videoActive, setVideoActive] = useState<boolean>(false);
  const [handRaised, setHandRaised] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; time: string; text: string; isTeacher?: boolean }[]>([
    { sender: lesson.teacherName, time: '19:00', text: 'Всем добрый вечер! Начинаем занятие по архитектуре. Поставьте +, если слышно и видно слайды.', isTeacher: true },
    { sender: 'Михаил Ковалев', time: '19:01', text: '+ все отлично слышно!' },
    { sender: 'Ольга Васильева', time: '19:01', text: '+ звук и видео идеальные' },
    { sender: 'Алексей Смирнов (Вы)', time: '19:02', text: '+ готов к разбору практического задания' }
  ]);
  const [newMsg, setNewMsg] = useState<string>('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setChatMessages((prev) => [
      ...prev,
      { sender: 'Алексей Смирнов (Вы)', time: timeStr, text: newMsg.trim() }
    ]);
    setNewMsg('');

    // Simulated quick teacher response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: lesson.teacherName,
          time: timeStr,
          text: 'Отличный вопрос! Как раз сейчас разберем этот паттерн на слайде.',
          isTeacher: true
        }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 rounded-3xl max-w-6xl w-full border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Top Bar */}
        <div className="px-6 py-3.5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-red-500">
              ПРЯМОЙ ЭФИР
            </span>
            <span className="text-slate-600">|</span>
            <h3 className="text-sm font-bold truncate max-w-md">
              {lesson.courseTitle}: {lesson.topic}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              24 участника онлайн
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Workspace (Stage + Live Chat) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Main Video Stage */}
          <div className="flex-1 bg-black relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
            
            {/* Slide / Presentation Simulation */}
            <div className="w-full h-full rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Урок {lesson.lessonNumber} из {lesson.totalLessons}
                </span>
                <span>Вектор Про · Интерактивная среда</span>
              </div>

              {/* Slide Content */}
              <div className="max-w-xl mx-auto text-center space-y-4 my-auto">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                  Тема текущего воркшопа
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {lesson.topic}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Разбор типовых ошибок на код-ревью, написание интеграционных тестов и запуск микросервисов.
                </p>
              </div>

              {/* Teacher Webcam Overlay Picture-in-Picture */}
              <div className="absolute bottom-4 right-4 w-36 h-28 sm:w-44 sm:h-32 rounded-xl overflow-hidden border-2 border-indigo-500 shadow-2xl bg-slate-900">
                <img
                  src={lesson.teacherPhoto}
                  alt={lesson.teacherName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white font-semibold">
                  {lesson.teacherName}
                </div>
              </div>
            </div>

            {/* Bottom Floating Control Bar */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setMicActive(!micActive)}
                className={`p-3 rounded-2xl transition-colors ${
                  micActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title={micActive ? 'Выключить микрофон' : 'Включить микрофон'}
              >
                {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-red-400" />}
              </button>

              <button
                onClick={() => setVideoActive(!videoActive)}
                className={`p-3 rounded-2xl transition-colors ${
                  videoActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title={videoActive ? 'Выключить камеру' : 'Включить камеру'}
              >
                {videoActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5 text-red-400" />}
              </button>

              <button
                onClick={() => setHandRaised(!handRaised)}
                className={`p-3 rounded-2xl transition-colors ${
                  handRaised ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Поднять руку для вопроса"
              >
                <Hand className="w-5 h-5" />
              </button>

              {lesson.materialsUrl && (
                <a
                  href={lesson.materialsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  title="Скачать презентацию и код"
                >
                  <Download className="w-5 h-5" />
                </a>
              )}

              <button
                onClick={onClose}
                className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors ml-4"
              >
                Выйти из аудитории
              </button>
            </div>

          </div>

          {/* Right: Live Chat Box */}
          <div className="w-full lg:w-80 bg-slate-950 border-l border-slate-800 flex flex-col justify-between shrink-0 h-64 lg:h-auto">
            
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 font-bold">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                Чат вебинара
              </span>
              <span className="text-[10px] text-slate-500">Живое общение</span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl ${
                    msg.isTeacher
                      ? 'bg-indigo-950/70 border border-indigo-800/80 text-indigo-100'
                      : 'bg-slate-900 border border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold text-[11px] ${msg.isTeacher ? 'text-indigo-400' : 'text-slate-400'}`}>
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-slate-500 tabular-nums">{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Задать вопрос..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
