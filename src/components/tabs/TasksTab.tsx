import React from 'react';
import {
  CheckSquare,
  Send,
  Youtube,
  Twitter,
  CalendarCheck,
  PlayCircle,
  Users,
  CheckCircle2,
  ExternalLink,
  Gift,
} from 'lucide-react';
import { TaskItem } from '../../types';
import { sound } from '../../utils/audio';

interface TasksTabProps {
  tasks: TaskItem[];
  onClaimTask: (taskId: string) => void;
}

export const TasksTab: React.FC<TasksTabProps> = ({ tasks, onClaimTask }) => {
  const getTaskIcon = (iconName: string) => {
    switch (iconName) {
      case 'Send':
        return <Send className="w-5 h-5 text-blue-500" />;
      case 'Youtube':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'Twitter':
        return <Twitter className="w-5 h-5 text-sky-400" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-5 h-5 text-emerald-500" />;
      case 'PlayCircle':
        return <PlayCircle className="w-5 h-5 text-amber-500" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-500" />;
      default:
        return <Gift className="w-5 h-5 text-amber-500" />;
    }
  };

  const handleTaskClick = (task: TaskItem) => {
    sound.playClick();
    if (task.actionUrl && task.actionUrl.startsWith('http')) {
      window.open(task.actionUrl, '_blank');
    }
    // Perform claim
    onClaimTask(task.id);
  };

  return (
    <div className="flex flex-col gap-4 pb-20 px-4 pt-1 select-none">
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
          Complete Tasks & Earn
        </h2>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Join channels, follow sponsors & claim cash rewards instantly.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
              task.claimed
                ? 'bg-gray-50/80 border-gray-200/60 opacity-80'
                : 'bg-white border-gray-200 shadow-sm hover:border-amber-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                {getTaskIcon(task.iconName)}
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  {task.title}
                </span>
                <span className="text-[11px] font-black text-amber-600 mt-0.5">
                  +${task.reward.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleTaskClick(task)}
              disabled={task.claimed}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95 ${
                task.claimed
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-sm'
              }`}
            >
              {task.claimed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Claimed</span>
                </>
              ) : (
                <>
                  <span>{task.actionText}</span>
                  {task.actionUrl.startsWith('http') && (
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  )}
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
