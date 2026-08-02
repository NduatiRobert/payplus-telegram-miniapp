/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  TabType,
  UserProfile,
  AdVideo,
  TaskItem,
  InvitedFriend,
  WithdrawalRequest,
  LanguageCode,
  MonetagConfig,
} from './types';
import {
  INITIAL_USER,
  MOCK_ADS,
  INITIAL_TASKS,
  INITIAL_FRIENDS,
  INITIAL_WITHDRAWALS,
} from './data/mockData';
import { Header } from './components/Header';
import { BalanceCard } from './components/BalanceCard';
import { Navbar } from './components/Navbar';
import { AdsTab } from './components/tabs/AdsTab';
import { TasksTab } from './components/tabs/TasksTab';
import { InviteTab } from './components/tabs/InviteTab';
import { WithdrawTab } from './components/tabs/WithdrawTab';
import { VideoAdModal } from './components/modals/VideoAdModal';
import { SupportModal } from './components/modals/SupportModal';
import { LanguageModal } from './components/modals/LanguageModal';
import { DemoSettingsModal } from './components/modals/DemoSettingsModal';
import { sound } from './utils/audio';

const DEFAULT_MONETAG_CONFIG: MonetagConfig = {
  enabled: true,
  directLinkUrl: 'https://otieuptai.com/4/8912345',
  rewardPerAd: 0.20,
};

export default function App() {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<TabType>('ads');
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [friends, setFriends] = useState<InvitedFriend[]>(INITIAL_FRIENDS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWALS);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  // Monetag configuration state
  const [monetagConfig, setMonetagConfig] = useState<MonetagConfig>(() => {
    try {
      const saved = localStorage.getItem('payplus_monetag_config');
      return saved ? JSON.parse(saved) : DEFAULT_MONETAG_CONFIG;
    } catch {
      return DEFAULT_MONETAG_CONFIG;
    }
  });

  // Modal States
  const [activeAd, setActiveAd] = useState<AdVideo | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Auto-detect Telegram WebApp User Context
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      const tgUser = tg.initDataUnsafe?.user;
      if (tgUser) {
        setUser((prev) => ({
          ...prev,
          name: tgUser.first_name || tgUser.username || prev.name,
          id: tgUser.id ? String(tgUser.id) : prev.id,
          avatarUrl: tgUser.photo_url || prev.avatarUrl,
        }));
      }
    }
  }, []);

  const triggerHaptic = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
  };

  const handleUpdateMonetagConfig = (newConfig: Partial<MonetagConfig>) => {
    setMonetagConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      try {
        localStorage.setItem('payplus_monetag_config', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleSelectTab = (tab: TabType) => {
    sound.playClick();
    triggerHaptic();
    setActiveTab(tab);
  };

  const handleStartWatchAd = () => {
    sound.playClick();
    triggerHaptic();

    // Pick ad based on current watched index
    const adIndex = user.dailyAdsCompleted % MOCK_ADS.length;
    let selectedAd = MOCK_ADS[adIndex];

    // If Monetag is enabled and custom link is present, assign it
    if (monetagConfig.enabled && monetagConfig.directLinkUrl) {
      selectedAd = {
        ...selectedAd,
        sponsor: 'Monetag Ad Network',
        actionUrl: monetagConfig.directLinkUrl,
        actionText: 'Open Monetag Sponsored Link',
      };
    }

    setActiveAd(selectedAd);
  };

  const handleAdRewardClaimed = (reward: number) => {
    triggerHaptic();
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + reward,
      totalWatchedAds: prev.totalWatchedAds + 1,
      dailyAdsCompleted: prev.dailyAdsCompleted + 1,
      totalEarnedFromAds: prev.totalEarnedFromAds + reward,
    }));
  };

  const handleClaimTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId && !task.claimed) {
          setUser((prevUser) => ({
            ...prevUser,
            balance: prevUser.balance + task.reward,
          }));
          return { ...task, completed: true, claimed: true };
        }
        return task;
      })
    );
  };

  const handleAddReferral = () => {
    const friendNames = ['Sophia Martinez', 'David Kim', 'Lucas Silva', 'Emma Watson', 'Liam Johnson'];
    const randomName = friendNames[Math.floor(Math.random() * friendNames.length)];
    const newFriend: InvitedFriend = {
      id: `f-${Date.now()}`,
      name: randomName,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 9999999)}?w=100&auto=format&fit=crop&q=80`,
      date: 'Just now',
      earned: user.inviteRewardRate,
    };

    setFriends((prev) => [newFriend, ...prev]);
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + prev.inviteRewardRate,
      friendsInvited: prev.friendsInvited + 1,
      earnedFromInvites: prev.earnedFromInvites + prev.inviteRewardRate,
    }));
  };

  const handleSubmitWithdrawal = (
    reqData: Omit<WithdrawalRequest, 'id' | 'date' | 'status'>
  ): boolean => {
    if (user.balance < reqData.amount) return false;

    // Deduct balance
    setUser((prev) => ({
      ...prev,
      balance: prev.balance - reqData.amount,
    }));

    const newRequest: WithdrawalRequest = {
      id: `w-${Date.now().toString().slice(-4)}`,
      method: reqData.method,
      methodName: reqData.methodName,
      amount: reqData.amount,
      address: reqData.address,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    setWithdrawals((prev) => [newRequest, ...prev]);
    return true;
  };

  const handleResetDailyAds = () => {
    setUser((prev) => ({
      ...prev,
      dailyAdsCompleted: 0,
    }));
  };

  const handleSetBalance = (newBalance: number) => {
    setUser((prev) => ({
      ...prev,
      balance: newBalance,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center py-0 sm:py-6 px-0 sm:px-4 font-sans text-slate-900 antialiased">
      {/* Phone frame / Telegram App Container */}
      <div className="w-full max-w-md bg-white min-h-screen sm:min-h-[780px] sm:max-h-[860px] sm:rounded-[36px] shadow-2xl flex flex-col overflow-hidden relative border border-slate-200">
        {/* Top Header */}
        <Header
          onOpenSupport={() => {
            sound.playClick();
            setShowSupportModal(true);
          }}
          onOpenLanguage={() => {
            sound.playClick();
            setShowLanguageModal(true);
          }}
          currentLanguage={currentLanguage}
        />

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
          {/* User Total Balance Card Header */}
          <BalanceCard
            user={user}
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            onOpenDemoControls={() => {
              sound.playClick();
              setShowDemoModal(true);
            }}
          />

          {/* Active Tab Views */}
          {activeTab === 'ads' && (
            <AdsTab
              user={user}
              onStartWatchAd={handleStartWatchAd}
              onResetDailyLimit={handleResetDailyAds}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksTab tasks={tasks} onClaimTask={handleClaimTask} />
          )}

          {activeTab === 'invite' && (
            <InviteTab
              user={user}
              friends={friends}
              onAddSimulatedReferral={handleAddReferral}
            />
          )}

          {activeTab === 'withdraw' && (
            <WithdrawTab
              user={user}
              withdrawals={withdrawals}
              onSubmitWithdrawal={handleSubmitWithdrawal}
              onSetDemoHighBalance={() => handleSetBalance(15.5)}
            />
          )}
        </div>

        {/* Fixed Bottom Navigation Bar */}
        <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} />
      </div>

      {/* Interactive Modals */}
      {activeAd && (
        <VideoAdModal
          ad={activeAd}
          onClose={() => setActiveAd(null)}
          onRewardClaimed={handleAdRewardClaimed}
        />
      )}

      {showSupportModal && (
        <SupportModal onClose={() => setShowSupportModal(false)} />
      )}

      {showLanguageModal && (
        <LanguageModal
          currentLanguage={currentLanguage}
          onSelectLanguage={setCurrentLanguage}
          onClose={() => setShowLanguageModal(false)}
        />
      )}

      {showDemoModal && (
        <DemoSettingsModal
          balance={user.balance}
          dailyAds={user.dailyAdsCompleted}
          monetagConfig={monetagConfig}
          onUpdateMonetagConfig={handleUpdateMonetagConfig}
          onSetBalance={handleSetBalance}
          onResetDailyAds={handleResetDailyAds}
          onAddReferral={handleAddReferral}
          onClose={() => setShowDemoModal(false)}
        />
      )}
    </div>
  );
}
