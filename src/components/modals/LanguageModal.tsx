import React from 'react';
import { X, Check } from 'lucide-react';
import { LanguageCode } from '../../types';
import { sound } from '../../utils/audio';

interface LanguageModalProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onClose: () => void;
}

const LANGUAGES: { code: LanguageCode; name: string; nativeName: string; flag: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export const LanguageModal: React.FC<LanguageModalProps> = ({
  currentLanguage,
  onSelectLanguage,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 select-none">
      <div className="w-full max-w-xs bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
          <span className="text-sm font-bold">Select Language</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-2 flex flex-col gap-1 max-h-80 overflow-y-auto">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                  isSelected
                    ? 'bg-amber-100/90 text-amber-950 font-extrabold border border-amber-300'
                    : 'hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs">{lang.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {lang.nativeName}
                    </span>
                  </div>
                </div>

                {isSelected && <Check className="w-4 h-4 text-amber-700" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
