import React from 'react';
import { PlayCircle, CheckSquare, Users, DollarSign } from 'lucide-react';
import { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'ads',
      label: 'Ads',
      icon: <PlayCircle className="w-5 h-5" />,
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: <CheckSquare className="w-5 h-5" />,
    },
    {
      id: 'invite',
      label: 'Invite',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'withdraw',
      label: 'Withdraw',
      icon: <DollarSign className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white border-t border-amber-200/70 shadow-lg">
      <div className="grid grid-cols-4 px-2 py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center py-1 transition-all active:scale-95"
            >
              <div
                className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                  isActive
                    ? 'w-11 h-8 bg-amber-100/90 text-amber-700 shadow-sm border border-amber-300/50'
                    : 'w-10 h-7 text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.icon}
              </div>
              <span
                className={`text-[11px] font-semibold mt-0.5 transition-colors ${
                  isActive ? 'text-amber-800' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
