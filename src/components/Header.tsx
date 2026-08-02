import React from 'react';
import { MessageSquare, Globe, MoreVertical, X } from 'lucide-react';
import { LanguageCode } from '../types';

interface HeaderProps {
  onOpenSupport: () => void;
  onOpenLanguage: () => void;
  currentLanguage: LanguageCode;
}

const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  en: 'English',
  es: 'Español',
  ru: 'Русский',
  hi: 'हिन्दी',
  ar: 'العربية',
  fr: 'Français',
};

export const Header: React.FC<HeaderProps> = ({
  onOpenSupport,
  onOpenLanguage,
  currentLanguage,
}) => {
  return (
    <div className="w-full select-none bg-white">
      {/* Telegram Mini App System Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-100 bg-gray-50/80 text-gray-700 text-xs font-medium">
        <div className="flex items-center gap-1.5 truncate">
          <span className="font-semibold text-gray-800 text-sm">Earn Money With PayPlus</span>
          <span className="text-sm">💰</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <button
            type="button"
            className="p-1 hover:bg-gray-200/60 rounded-full transition-colors"
            title="Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200/60 rounded-full transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main PayPlus Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100/60">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-black tracking-tight text-[#1e293b]">
            PayPlu
          </span>
          <span className="text-2xl font-black text-[#eab308] drop-shadow-sm">
            $
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Customer Support */}
          <button
            type="button"
            onClick={onOpenSupport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300/80 bg-amber-50/60 hover:bg-amber-100/80 active:scale-95 transition-all text-amber-900"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-700 fill-amber-100" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] text-amber-700/80 font-medium">Customer</span>
              <span className="text-xs font-bold text-amber-900">Support</span>
            </div>
          </button>

          {/* Language Selector */}
          <button
            type="button"
            onClick={onOpenLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300/80 bg-amber-50/60 hover:bg-amber-100/80 active:scale-95 transition-all text-amber-900"
          >
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] text-amber-700/80 font-medium">Language</span>
              <span className="text-xs font-bold text-amber-900">{LANGUAGE_LABELS[currentLanguage]}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
