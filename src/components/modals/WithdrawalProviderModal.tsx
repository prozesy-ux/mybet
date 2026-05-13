import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { userApi } from "@/services/userApi";

export const WithdrawalProviderModal = () => {
  const { closeModal, openModal, selectedProvider } = useModal();
  const { isAuthenticated, refreshUser } = useAuth();
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(String(selectedProvider?.minAmount ?? 1000));
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const providerName = selectedProvider?.name ?? "Nagad";
  const minAmount = selectedProvider?.minAmount ?? 1000;
  const maxAmount = selectedProvider?.maxAmount ?? 30000;
  const recipientAccount = selectedProvider?.accountNumber || "";

  const handleWithdraw = async () => {
    setError("");
    setInfo("");

    if (!isAuthenticated) {
      setError("Please login first to request withdrawal.");
      return;
    }

    if (!accountNumber.trim()) {
      setError("Please enter your account number.");
      return;
    }

    const numericAmount = Number(String(amount).replace(/,/g, ""));
    if (!Number.isFinite(numericAmount) || numericAmount < minAmount || numericAmount > maxAmount) {
      setError(`Amount must be between ${minAmount.toLocaleString()} and ${maxAmount.toLocaleString()} BDT`);
      return;
    }

    try {
      setSubmitting(true);
      const response = await userApi.createWithdrawal({
        amount: numericAmount,
        payment_method: selectedProvider?.id || providerName.toLowerCase(),
        account_number: accountNumber.trim(),
        provider_name: providerName,
      });
      await refreshUser();
      setInfo(response.message || "Withdrawal submitted and waiting for admin approval.");
      setAmount(String(minAmount));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Withdrawal failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
    >
      <div className="bg-white rounded-2xl w-full max-w-[380px] mx-4 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-6">
          <button
            onClick={() => openModal("withdrawal")}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1"
          >
            ×
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Provider Name */}
          <div className="flex items-center gap-3 mb-6">
            {providerName === "Nagad" ? (
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">ন</span>
              </div>
            ) : (
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">B</span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-900">{providerName}</h2>
          </div>

          {/* Account Number */}
          <div className="mb-4">
            <input
              type="text"
              placeholder={`${providerName} Account Number`}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Amount */}
          <div className="mb-1">
            <div className="bg-gray-100 rounded-xl px-4 py-3">
              <label className="text-xs text-gray-400 block mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-800 outline-none"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-6 pl-1">
            from ৳{minAmount.toLocaleString()} to ৳{maxAmount.toLocaleString()}
          </p>

          {recipientAccount ? (
            <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-700">Send to official account</p>
              <p className="text-sm font-semibold text-blue-900 mt-0.5">{recipientAccount}</p>
            </div>
          ) : null}

          {error ? <p className="text-[12px] text-[#ff4000] mb-3">{error}</p> : null}
          {info ? <p className="text-[12px] text-[#00b24b] mb-3">{info}</p> : null}

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            {submitting ? "Submitting..." : "Withdraw"}
          </button>
          {info ? (
            <button
              onClick={closeModal}
              className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-xl transition-colors text-sm"
            >
              Close
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
