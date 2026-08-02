import React, { useState } from 'react';
import { Users, Copy, Send, Check, DollarSign, UserCheck, Sparkles } from 'lucide-react';
import { UserProfile, InvitedFriend } from '../../types';
import { sound } from '../../utils/audio';

interface InviteTabProps {
  user: UserProfile;
  friends: InvitedFriend[];
  onAddSimulatedReferral?: () => void;
}

export const InviteTab: React.FC<InviteTabProps> = ({
  user,
  friends,
  onAddSimulatedReferral,
}) => {
  const [copied, setCopied] = useState(false);
  const inviteLink = `https://t.me/Pay_Plus_Bot/app?startapp=${user.id}`;

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    sound.playClick();
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent(
      '🎁 Join PayPlus Mini App on Telegram and earn money watching video ads! Instant payouts to USDT or PayPal.'
    )}`;
    window.open(telegramShareUrl, '_blank');
  };

  return (
    <div className="flex flex-col gap-4 pb-20 px-4 pt-1 select-none">
      {/* Invite Card Box (Outer container styled like Screenshot 3) */}
      <div className="rounded-3xl border border-gray-200/90 bg-slate-50/60 p-4 shadow-sm flex flex-col gap-4">
        {/* Header with Icon Box */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100/90 border border-amber-300/60 flex items-center justify-center text-amber-700 flex-shrink-0 shadow-sm">
            <Users className="w-6 h-6" />
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-black text-gray-900 leading-tight">
              Invite & Earn
            </h2>
            <div className="text-xs text-gray-700 font-bold mt-0.5">
              Earn <span className="text-amber-600 font-black">${user.inviteRewardRate.toFixed(2)}</span> for each invite
            </div>
            <p className="text-[11px] text-gray-500 font-medium leading-normal mt-0.5">
              Copy and share your invite link with friends to earn more.
            </p>
          </div>
        </div>

        {/* Your Invite Link Label & Box */}
        <div className="flex flex-col gap-1.5 mt-1">
          <label className="text-xs font-bold text-gray-900">
            Your Invite Link
          </label>

          {/* Link + Copy Button Row */}
          <div className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-white border border-gray-200 shadow-inner">
            <span className="text-xs text-blue-600 underline font-medium truncate flex-1 select-all">
              {inviteLink}
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[#293241] text-white hover:bg-[#1d2430]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Share with Friends Button */}
          <button
            type="button"
            onClick={handleShare}
            className="w-full mt-2 py-3 px-4 rounded-2xl bg-white border border-gray-200/90 text-gray-800 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[0.98] transition-all shadow-sm"
          >
            <Send className="w-4 h-4 text-blue-500 fill-blue-50" />
            <span>Share with Friends</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid (Matching Screenshot 3 bottom grid) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Friends Invited Box */}
        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-3.5 shadow-sm">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800/80">
            FRIENDS INVITED
          </div>
          <div className="text-2xl font-black text-gray-900 mt-1 flex items-center gap-1.5">
            {user.friendsInvited}
            <Users className="w-4 h-4 text-amber-700" />
          </div>
        </div>

        {/* Earned From Invites Box */}
        <div className="rounded-2xl bg-gray-50/80 border border-gray-200/80 p-3.5 shadow-sm">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            EARNED FROM INVITES
          </div>
          <div className="text-2xl font-black text-gray-900 mt-1 flex items-center gap-1">
            ${user.earnedFromInvites.toFixed(2)}
            <DollarSign className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Referrals List Section */}
      <div className="mt-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-gray-400" />
            Recent Referral Activity
          </h3>
          {onAddSimulatedReferral && (
            <button
              type="button"
              onClick={onAddSimulatedReferral}
              className="text-[11px] text-amber-700 font-bold hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Test Invite (+ $0.50)
            </button>
          )}
        </div>

        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-sm">
          {friends.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-400 font-medium">
              No friends invited yet. Share your referral link above!
            </div>
          ) : (
            friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-8 h-8 rounded-full object-cover border border-amber-300"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-800">
                      {friend.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {friend.date}
                    </span>
                  </div>
                </div>
                <div className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/60">
                  +${friend.earned.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
