import React, { useState } from 'react';
import {
  Wallet,
  Send,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  History,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { UserProfile, PaymentMethodId, WithdrawalRequest } from '../../types';
import { sound } from '../../utils/audio';

interface WithdrawTabProps {
  user: UserProfile;
  withdrawals: WithdrawalRequest[];
  onSubmitWithdrawal: (req: Omit<WithdrawalRequest, 'id' | 'date' | 'status'>) => boolean;
  onSetDemoHighBalance?: () => void;
}

export const WithdrawTab: React.FC<WithdrawTabProps> = ({
  user,
  withdrawals,
  onSubmitWithdrawal,
  onSetDemoHighBalance,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('usdt');
  const [amountInput, setAmountInput] = useState<string>('');
  const [addressInput, setAddressInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const minWithdrawal = 10.0;

  const handleSelectMethod = (method: PaymentMethodId) => {
    sound.playClick();
    setSelectedMethod(method);
    setErrorMessage(null);
  };

  const getAddressLabel = () => {
    switch (selectedMethod) {
      case 'usdt':
        return 'WALLET ADDRESS';
      case 'paypal':
        return 'PAYPAL EMAIL ADDRESS';
      case 'mobile':
        return 'PHONE NUMBER (WITH COUNTRY CODE)';
    }
  };

  const getAddressPlaceholder = () => {
    switch (selectedMethod) {
      case 'usdt':
        return 'e.g. TXyz...abc';
      case 'paypal':
        return 'e.g. user@example.com';
      case 'mobile':
        return 'e.g. +1234567890';
    }
  };

  const getAddressSubtext = () => {
    switch (selectedMethod) {
      case 'usdt':
        return 'Enter your USDT TRC20 wallet address';
      case 'paypal':
        return 'Enter your registered PayPal email';
      case 'mobile':
        return 'Enter mobile number for instant airtime top-up';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const val = parseFloat(amountInput);
    if (isNaN(val) || val <= 0) {
      setErrorMessage('Please enter a valid withdrawal amount.');
      return;
    }

    if (val < minWithdrawal) {
      setErrorMessage(`Minimum withdrawal amount is $${minWithdrawal.toFixed(2)}.`);
      return;
    }

    if (val > user.balance) {
      setErrorMessage(
        `Insufficient balance. You have $${user.balance.toFixed(2)} available.`
      );
      return;
    }

    if (!addressInput.trim()) {
      setErrorMessage(`Please enter a valid ${getAddressLabel().toLowerCase()}.`);
      return;
    }

    const methodNameMap: Record<PaymentMethodId, string> = {
      usdt: 'USDT TRC20',
      paypal: 'PayPal',
      mobile: 'Mobile Top-Up',
    };

    const success = onSubmitWithdrawal({
      method: selectedMethod,
      methodName: methodNameMap[selectedMethod],
      amount: val,
      address: addressInput.trim(),
    });

    if (success) {
      sound.playWithdrawSuccess();
      setSuccessMessage(
        `Withdrawal request of $${val.toFixed(2)} submitted successfully!`
      );
      setAmountInput('');
      setAddressInput('');
    } else {
      setErrorMessage('Withdrawal request failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-20 px-4 pt-1 select-none">
      {/* Outer Card Container styled like Screenshot 4 */}
      <div className="rounded-3xl border border-gray-200/90 bg-slate-50/60 p-4 shadow-sm flex flex-col gap-4">
        {/* Title Header with Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <Wallet className="w-4 h-4" />
            </div>
            <h2 className="text-base font-black text-gray-900 tracking-tight">
              Payment Method
            </h2>
          </div>

          {user.balance < minWithdrawal && onSetDemoHighBalance && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onSetDemoHighBalance();
              }}
              className="text-[11px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2.5 py-1 rounded-xl hover:bg-amber-200 transition-colors flex items-center gap-1 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-amber-700" /> Test $15.00 Balance
            </button>
          )}
        </div>

        {/* Payment Method Selector Grid (3 items matching Screenshot 4) */}
        <div className="grid grid-cols-3 gap-2">
          {/* USDT TRC20 */}
          <button
            type="button"
            onClick={() => handleSelectMethod('usdt')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all ${
              selectedMethod === 'usdt'
                ? 'bg-amber-100/90 border-2 border-amber-400 shadow-sm text-gray-900 font-extrabold'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center mb-1.5 shadow-sm">
              ₮
            </div>
            <span className="text-[11px] leading-tight text-center font-bold">
              USDT TRC20
            </span>
          </button>

          {/* PayPal */}
          <button
            type="button"
            onClick={() => handleSelectMethod('paypal')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all ${
              selectedMethod === 'paypal'
                ? 'bg-amber-100/90 border-2 border-amber-400 shadow-sm text-gray-900 font-extrabold'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-black text-sm flex items-center justify-center mb-1.5 shadow-sm">
              P
            </div>
            <span className="text-[11px] leading-tight text-center font-bold">
              PayPal
            </span>
          </button>

          {/* Mobile Top-Up */}
          <button
            type="button"
            onClick={() => handleSelectMethod('mobile')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all ${
              selectedMethod === 'mobile'
                ? 'bg-amber-100/90 border-2 border-amber-400 shadow-sm text-gray-900 font-extrabold'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center mb-1.5 shadow-sm">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-[11px] leading-tight text-center font-bold">
              Mobile Top-Up
            </span>
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1">
          {/* AMOUNT Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider">
              AMOUNT
            </label>
            <input
              type="number"
              step="0.01"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="Enter amount (e.g. 10.00)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all font-medium"
            />
            <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium px-0.5">
              <span>
                Available balance:{' '}
                <strong className="text-gray-900">${user.balance.toFixed(2)}</strong>
              </span>
              <span>Min ${minWithdrawal.toFixed(2)}</span>
            </div>
          </div>

          {/* WALLET ADDRESS / PAYPAL EMAIL / PHONE NUMBER Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider">
              {getAddressLabel()}
            </label>
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder={getAddressPlaceholder()}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all font-mono"
            />
            <span className="text-[11px] text-gray-400 font-medium px-0.5">
              {getAddressSubtext()}
            </span>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-[#20293a] hover:bg-[#151c28] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-slate-900/10"
          >
            <Send className="w-4 h-4 fill-white text-white" />
            <span>Submit Withdrawal Request</span>
          </button>
        </form>
      </div>

      {/* Withdrawal History Section */}
      <div className="flex flex-col gap-2 mt-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-gray-400" />
          Recent Withdrawal Requests
        </h3>

        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-sm">
          {withdrawals.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-400 font-medium">
              No withdrawal requests yet.
            </div>
          ) : (
            withdrawals.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-3 text-xs"
              >
                <div className="flex flex-col">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                    <span>${req.amount.toFixed(2)}</span>
                    <span className="text-[10px] text-gray-500 font-normal">
                      via {req.methodName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 truncate max-w-[180px]">
                    {req.address}
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      req.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {req.status}
                  </span>
                  <span className="text-[9px] text-gray-400 mt-0.5">{req.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
