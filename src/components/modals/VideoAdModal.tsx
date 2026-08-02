import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, X, ExternalLink, Sparkles, Volume2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdVideo } from '../../types';
import { sound } from '../../utils/audio';

interface VideoAdModalProps {
  ad: AdVideo;
  onClose: () => void;
  onRewardClaimed: (reward: number) => void;
}

export const VideoAdModal: React.FC<VideoAdModalProps> = ({
  ad,
  onClose,
  onRewardClaimed,
}) => {
  const [timeLeft, setTimeLeft] = useState(ad.durationSeconds);
  const [isCompleted, setIsCompleted] = useState(false);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    // Check if Monetag Rewarded Interstitial script function is available
    if (typeof (window as any).show_11483734 === 'function') {
      (window as any).show_11483734().then(() => {
        setIsCompleted(true);
        setTimeLeft(0);
        sound.playAdReward();
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      }).catch((err: any) => {
        console.warn('Monetag ad dismissed or failed:', err);
      });
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsCompleted(true);
      sound.playAdReward();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleClaim = () => {
    if (claimed) return;
    setClaimed(true);
    sound.playClick();
    onRewardClaimed(ad.reward);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const progressPercent = Math.min(
    100,
    ((ad.durationSeconds - timeLeft) / ad.durationSeconds) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-300">
              {isCompleted ? 'Ad Finished' : `Ad Playing (${timeLeft}s)`}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div
          className={`relative w-full h-52 bg-gradient-to-br ${ad.videoBgGradient} flex flex-col items-center justify-center p-6 text-center overflow-hidden`}
        >
          {/* Decorative Background Particles */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-3 shadow-lg animate-bounce">
              <Sparkles className="w-8 h-8 text-amber-300" />
            </div>

            <h3 className="text-lg font-black text-white drop-shadow-md">
              {ad.title}
            </h3>
            <p className="text-xs text-white/80 font-medium max-w-xs mt-1">
              {ad.description}
            </p>
          </div>

          {/* Sound & Shield Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white/80 border border-white/10 font-medium">
            <Volume2 className="w-3 h-3 text-amber-400" />
            <span>Sponsored Ad</span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-amber-300 font-mono">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified</span>
          </div>

          {/* Bottom Progress Bar inside Video */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Footer Controls & Claim Area */}
        <div className="p-4 flex flex-col gap-3 bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Sponsor: <strong className="text-slate-200">{ad.sponsor}</strong></span>
            <span className="font-bold text-amber-400">+${ad.reward.toFixed(2)} Reward</span>
          </div>

          {ad.actionUrl && (
            <a
              href={ad.actionUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
            >
              <span>{ad.actionText || 'Visit Sponsor'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Claim Reward Button */}
          <button
            type="button"
            onClick={handleClaim}
            disabled={!isCompleted || claimed}
            className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              !isCompleted
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : claimed
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:from-amber-300 hover:to-amber-500 active:scale-95 shadow-amber-500/20'
            }`}
          >
            {claimed ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Reward Claimed! (+$0.20)</span>
              </>
            ) : isCompleted ? (
              <>
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Claim +$0.20 Now</span>
              </>
            ) : (
              <span>Watching... ({timeLeft}s remaining)</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
