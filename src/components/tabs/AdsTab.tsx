import React from 'react';
import { Play, Info, CheckCircle2, Flame, RefreshCw } from 'lucide-react';
import { UserProfile } from '../../types';

interface AdsTabProps {
  user: UserProfile;
  onStartWatchAd: () => void;
  onResetDailyLimit?: () => void;
}

export const AdsTab: React.FC<AdsTabProps> = ({
  user,
  onStartWatchAd,
  onResetDailyLimit,
}) => {
  const isLimitReached = user.dailyAdsCompleted >= user.dailyAdsLimit;
  const progressPercent = Math.min(
    100,
    (user.dailyAdsCompleted / user.dailyAdsLimit) * 100
  );

  return (
    <div className="flex flex-col gap-4 pb-20 px-4 pt-1">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
          Watch Ads & Earn
        </h2>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Complete and watch a short video ads and earn{' '}
          <span className="font-bold text-gray-800">${user.adRewardRate.toFixed(2)}</span>
        </p>
      </div>

      {/* Main Watch Ad Card Container */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-amber-300/90 bg-gradient-to-b from-slate-50 via-white to-amber-50/50 p-4 shadow-md">
        {/* Soft Gold Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between gap-3 relative z-10 mb-4">
          {/* Play Button & Info */}
          <button
            type="button"
            onClick={onStartWatchAd}
            disabled={isLimitReached}
            className={`flex items-center gap-3.5 flex-1 text-left transition-all ${
              isLimitReached ? 'opacity-70 cursor-not-allowed' : 'group cursor-pointer'
            }`}
          >
            {/* Dark Navy Play Circle */}
            <div className="w-14 h-14 rounded-full bg-[#1b1c31] flex items-center justify-center text-white shadow-md group-hover:scale-105 group-active:scale-95 transition-transform flex-shrink-0 border-2 border-amber-400/40">
              <Play className="w-6 h-6 fill-white ml-1" />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-black text-gray-900 leading-tight">
                Watch Ad
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {isLimitReached
                  ? 'Daily limit reached! Check back tomorrow'
                  : 'Complete video to earn instantly'}
              </span>
            </div>
          </button>

          {/* Reward Badge */}
          <div className="flex items-center justify-center px-4 py-2.5 rounded-2xl bg-[#373a56] text-white font-black text-base shadow-sm border border-amber-400/30 flex-shrink-0">
            +${user.adRewardRate.toFixed(2)}
          </div>
        </div>

        {/* Progress Bar & Counter */}
        <div className="mt-2 relative z-10">
          <div className="w-full h-3 bg-amber-100/80 rounded-full overflow-hidden p-0.5 border border-amber-300/60 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-1.5 text-[11px] font-bold text-amber-900/80">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              Progress
            </span>
            <span>
              {user.dailyAdsCompleted} / {user.dailyAdsLimit} today
            </span>
          </div>
        </div>

        {/* Action Button inside card */}
        <div className="mt-4 pt-2">
          <button
            type="button"
            onClick={onStartWatchAd}
            disabled={isLimitReached}
            className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] ${
              isLimitReached
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 font-black shadow-amber-500/20'
            }`}
          >
            <Play className="w-4 h-4 fill-slate-950" />
            {isLimitReached ? 'Limit Reached Today' : 'Watch Ad Now & Collect $0.20'}
          </button>
        </div>
      </div>

      {/* Status Notice */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-medium">
        {isLimitReached ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="flex-1">Daily cap reached (15/15). Reset demo to watch more!</span>
            {onResetDailyLimit && (
              <button
                type="button"
                onClick={onResetDailyLimit}
                className="text-amber-700 underline text-xs font-bold hover:text-amber-900 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </>
        ) : (
          <>
            <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Ready to earn</span>
          </>
        )}
      </div>

      {/* Stats Cards (2 Columns - Matching Screenshot 1 & 2 bottom cards) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Watched Box */}
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200/80 p-3.5 shadow-sm">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800/80">
            TOTAL WATCHED
          </div>
          <div className="text-2xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
            {user.totalWatchedAds}{' '}
            <span className="text-xs font-medium text-gray-500">ads</span>
          </div>
        </div>

        {/* Total Earned Box */}
        <div className="rounded-2xl bg-gray-50/80 border border-gray-200/80 p-3.5 shadow-sm">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            TOTAL EARNED
          </div>
          <div className="text-2xl font-black text-gray-900 mt-1">
            ${user.totalEarnedFromAds.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
