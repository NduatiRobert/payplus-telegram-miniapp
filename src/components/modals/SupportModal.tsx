import React, { useState } from 'react';
import { X, Send, MessageSquare, ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { SupportMessage } from '../../types';
import { sound } from '../../utils/audio';

interface SupportModalProps {
  onClose: () => void;
}

const FAQS = [
  {
    q: 'How much do I earn watching ads?',
    a: 'You earn $0.20 for every video ad completed. You can watch up to 15 ads per day ($3.00/day).',
  },
  {
    q: 'What is the minimum withdrawal amount?',
    a: 'The minimum payout threshold is $10.00. You can request payouts to USDT TRC20, PayPal, or Mobile Top-Up.',
  },
  {
    q: 'How fast are withdrawal requests processed?',
    a: 'Most requests are processed automatically within 15 to 30 minutes.',
  },
  {
    q: 'How does the invite referral program work?',
    a: 'Share your unique invite link. When a friend joins PayPlus, you receive a $0.50 cash bonus directly to your main balance!',
  },
];

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'm-1',
      sender: 'support',
      text: 'Hello Yoel! 👋 Welcome to PayPlus Support. How can we help you today?',
      timestamp: '14:20',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sound.playClick();

    const userMsg: SupportMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated Bot Answer
    setTimeout(() => {
      const replyMsg: SupportMessage = {
        id: `s-${Date.now()}`,
        sender: 'support',
        text: 'Thank you for your message! Our automated support agent is checking your account status. Payouts and ad rewards are running normally.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[85vh] h-[550px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#1e293b] to-[#334155] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight flex items-center gap-1">
                PayPlus Support Bot
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">
                Online • Instant Assistance
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-slate-700/60 rounded-full transition-colors text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Live Chat
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'faq'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            FAQ Help
          </button>
        </div>

        {/* Content Body */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col max-w-[80%] ${
                    m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                      m.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 rounded-br-none font-semibold'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask support a question..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400 font-medium"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2.5 bg-slate-50">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-slate-900 hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-amber-500' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
