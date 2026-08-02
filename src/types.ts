export type TabType = 'ads' | 'tasks' | 'invite' | 'withdraw';

export type PaymentMethodId = 'usdt' | 'paypal' | 'mobile';

export interface UserProfile {
  name: string;
  id: string;
  avatarUrl: string;
  balance: number;
  totalWatchedAds: number;
  totalEarnedFromAds: number;
  friendsInvited: number;
  earnedFromInvites: number;
  dailyAdsCompleted: number;
  dailyAdsLimit: number;
  adRewardRate: number; // e.g., 0.20
  inviteRewardRate: number; // e.g., 0.50
}

export interface AdVideo {
  id: string;
  title: string;
  sponsor: string;
  reward: number;
  durationSeconds: number;
  videoBgGradient: string;
  thumbnailIcon: string;
  description: string;
  actionUrl?: string;
  actionText?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  reward: number;
  iconName: string;
  category: 'telegram' | 'social' | 'daily' | 'ad';
  actionUrl: string;
  actionText: string;
  completed: boolean;
  claimed: boolean;
}

export interface InvitedFriend {
  id: string;
  name: string;
  avatar: string;
  date: string;
  earned: number;
}

export interface WithdrawalRequest {
  id: string;
  method: PaymentMethodId;
  methodName: string;
  amount: number;
  address: string;
  date: string;
  status: 'pending' | 'completed' | 'rejected';
}

export type LanguageCode = 'en' | 'es' | 'ru' | 'hi' | 'ar' | 'fr';

export interface SupportMessage {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

export interface MonetagConfig {
  enabled: boolean;
  directLinkUrl: string;
  rewardPerAd: number;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initDataUnsafe?: {
          user?: {
            id?: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
          start_param?: string;
        };
        openLink?: (url: string) => void;
        openTelegramLink?: (url: string) => void;
        showPopup?: (params: { title?: string; message: string; buttons?: Array<{ id?: string; type?: string; text?: string }> }) => void;
        HapticFeedback?: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
        };
      };
    };
    monetag?: any;
    show_11483734?: () => Promise<void>;
  }
}
