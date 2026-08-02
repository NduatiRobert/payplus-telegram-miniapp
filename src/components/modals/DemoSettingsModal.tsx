import React from 'react';
import { X, Sliders, RefreshCw, Users, Plus, Link, Check, ExternalLink } from 'lucide-react';
import { MonetagConfig } from '../../types';
import { sound } from '../../utils/audio';

interface DemoSettingsModalProps {
  balance: number;
  dailyAds: number;
  monetagConfig: MonetagConfig;
  onUpdateMonetagConfig: (newConfig: Partial<MonetagConfig>) => void;
  onSetBalance: (newBalance: number) => void;
  onResetDailyAds: () => void;
  onAddReferral: () => void;
  onClose: () => void;
}

export const DemoSettingsModal: React.FC<DemoSettingsModalProps> = ({
  balance,
  dailyAds,
  monetagConfig,
  onUpdateMonetagConfig,
  onSetBalance,
  onResetDailyAds,
  onAddReferral,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 select-none">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold">App & Monetag Ad Settings</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 flex flex-col gap-4 text-xs overflow-y-auto">
          {/* Monetag Ad Link Integration Section */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-300 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-950 flex items-center gap-1.5 text-xs">
                <Link className="w-4 h-4 text-amber-700" />
                Monetag Ad Link Integration
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={monetagConfig.enabled}
                  onChange={(e) => {
                    sound.playClick();
                    onUpdateMonetagConfig({ enabled: e.target.checked });
                  }}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>

            <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">
              Paste your <strong>Monetag Direct Link URL</strong> below. When users watch ads, they will view your Monetag ad link and automatically earn $0.20 per completed view.
            </p>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-amber-900 uppercase">
                Monetag Direct Link URL
              </label>
              <input
                type="text"
                value={monetagConfig.directLinkUrl}
                onChange={(e) =>
                  onUpdateMonetagConfig({ directLinkUrl: e.target.value })
                }
                placeholder="https://otieuptai.com/... (your Monetag ad link)"
                className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
              />
            </div>
          </div>

          {/* Quick Balance Presets */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-slate-700">Set Account Balance</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSetBalance(2.10);
                }}
                className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
                  balance === 2.10
                    ? 'bg-amber-100 border-amber-400 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                $2.10 (Screenshot)
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSetBalance(15.50);
                }}
                className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
                  balance === 15.50
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                $15.50 (Test Withdraw)
              </button>
            </div>
          </div>

          {/* Add $5 */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSetBalance(balance + 5.0);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Add +$5.00 to Balance</span>
          </button>

          {/* Reset Daily Ads */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onResetDailyAds();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
            <span>Reset Daily Ads Count ({dailyAds}/15)</span>
          </button>

          {/* Add Simulated Referral */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onAddReferral();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center gap-1.5 hover:bg-amber-400 transition-colors shadow-sm"
          >
            <Users className="w-4 h-4" />
            <span>Simulate New Referral (+ $0.50)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
