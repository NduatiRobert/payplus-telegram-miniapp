import React from 'react';
import { PlayCircle, CheckSquare, Users, Sparkles } from 'lucide-react';
import { UserProfile, TabType } from '../types';

interface BalanceCardProps {
  user: UserProfile;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenDemoControls?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  user,
  activeTab,
  onSelectTab,
  onOpenDemoControls,
}) => {
  return (
    <div className="w-full px-4 pt-3 pb-2 select-none">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#29200b] via-[#3b2d0d] to-[#1a1406] p-4 text-white shadow-lg border border-amber-500/40">
        {/* Subtle glowing radial background highlight */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

        {/* Header Row: Balance Left, User Info Right */}
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">
              TOTAL BALANCE
            </div>
            <div className="text-3xl font-black text-amber-300 tracking-tight mt-0.5 drop-shadow-sm flex items-baseline gap-1">
              ${user.balance.toFixed(2)}
            </div>
            <div className="text-[11px] text-amber-200/70 font-medium mt-0.5">
              Available to withdraw
            </div>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-2.5 bg-black/30 backdrop-blur-sm p-1.5 pr-3 rounded-full border border-amber-500/30">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-amber-100 leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-amber-300/80 font-mono font-medium">
                ID: {user.id}
              </span>
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="my-3 h-[1px] w-full bg-gradient-to-r from-amber-500/10 via-amber-500/40 to-amber-500/10" />

        {/* Feature quick links footer */}
        <div className="flex items-center justify-between text-[11px] text-amber-200/80 font-medium relative z-10 px-1">
          <button
            type="button"
            onClick={() => onSelectTab('ads')}
            className={`flex items-center gap-1 hover:text-amber-300 transition-colors ${
              activeTab === 'ads' ? 'text-amber-300 font-bold' : ''
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Watch Ads</span>
          </button>

          <span className="text-amber-500/40">•</span>

          <button
            type="button"
            onClick={() => onSelectTab('tasks')}
            className={`flex items-center gap-1 hover:text-amber-300 transition-colors ${
              activeTab === 'tasks' ? 'text-amber-300 font-bold' : ''
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Complete Tasks</span>
          </button>

          <span className="text-amber-500/40">•</span>

          <button
            type="button"
            onClick={() => onSelectTab('invite')}
            className={`flex items-center gap-1 hover:text-amber-300 transition-colors ${
              activeTab === 'invite' ? 'text-amber-300 font-bold' : ''
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Invite Friends</span>
          </button>

          {onOpenDemoControls && (
            <button
              type="button"
              onClick={onOpenDemoControls}
              className="p-1 text-amber-400/70 hover:text-amber-300 ml-1"
              title="Demo State Editor"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
