import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import { userApi } from "@/services/userApi";
import { useAuth } from "@/context/AuthContext";
import { consumePendingCasinoGame, requestCasinoLaunch } from "@/services/casinoLaunchFlow";

const QUICK_AMOUNTS = ["৳500", "৳1,000", "৳2,000", "৳5,000"];

export const DepositProviderModal = () => {
  const { closeModal, openModal, selectedProvider } = useModal();
  const { isAuthenticated, refreshUser } = useAuth();
  const [tab, setTab] = useState<"fiat" | "crypto">("fiat");
  const [amount, setAmount] = useState("200");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const provider = selectedProvider ?? {
    id: "bkash",
    name: "BKash",
    logo: "https://files.v1.distcdn.net/v1/objects/513306c6-1563-46db-aab5-5e4e5bb4563a",
  };
  const minAmount = provider.minAmount ?? 200;
  const maxAmount = provider.maxAmount ?? 20000;

  const handleQuickAmount = (val: string) => {
    setAmount(val.replace("৳", "").replace(",", ""));
  };

  const handleDeposit = async () => {
    setError("");
    setInfo("");

    if (!isAuthenticated) {
      setError("Please login first to deposit.");
      return;
    }

    const numericAmount = Number(String(amount).replace(/,/g, ""));
    if (!Number.isFinite(numericAmount) || numericAmount < minAmount || numericAmount > maxAmount) {
      setError(`Amount must be between ${minAmount.toLocaleString()} and ${maxAmount.toLocaleString()} BDT`);
      return;
    }

    try {
      setSubmitting(true);
      const response = await userApi.createDeposit({
        amount: numericAmount,
        payment_method: provider.id,
        provider_name: provider.name,
      });

      const dynamicResponse = response as unknown as Record<string, unknown>;
      const paymentUrl =
        response.payUrl ||
        (typeof dynamicResponse.PayUrl === "string" ? dynamicResponse.PayUrl : undefined) ||
        (typeof dynamicResponse.payment_url === "string" ? dynamicResponse.payment_url : undefined);

      if (paymentUrl) {
        window.location.assign(paymentUrl);
        return;
      }

      await refreshUser();
      const pendingGame = consumePendingCasinoGame();
      if (pendingGame) {
        closeModal();
        requestCasinoLaunch(pendingGame);
        return;
      }

      setInfo(response.message || "Deposit request submitted for admin approval.");
      setAmount(String(minAmount));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Deposit failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white rounded-2xl w-full max-w-[400px] mx-4 shadow-2xl font-inter">
        {/* Header row: Back + × */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <button
            onClick={() => openModal("deposit")}
            className="flex items-center gap-1 text-[#3b82f6] hover:text-[#2563eb] text-sm font-semibold transition-colors"
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
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <button
            onClick={closeModal}
            className="text-[#71717a] hover:text-[#18181b] w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Provider logo + name */}
        <div className="flex items-center gap-3 px-5 pb-5">
          <img
            src={provider.logo}
            alt={provider.name}
            className="h-9 w-auto object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <h2 className="text-[22px] font-bold text-[#18181b]">
            {provider.name}
          </h2>
        </div>

        {/* Tabs */}
        <div className="px-5 pb-4">
          <div className="flex bg-[#f4f4f5] rounded-xl p-1 gap-1">
            <button
              onClick={() => setTab("fiat")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                tab === "fiat"
                  ? "bg-white shadow-sm text-[#18181b]"
                  : "text-[#71717a]"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 16 16" className="w-3 h-3 fill-white">
                  <text x="3" y="12" fontSize="11" fontWeight="bold" fill="white">$</text>
                </svg>
              </span>
              Fiat
            </button>
            <button
              onClick={() => setTab("crypto")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                tab === "crypto"
                  ? "bg-white shadow-sm text-[#18181b]"
                  : "text-[#71717a]"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#f59e0b] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 16 16" className="w-3 h-3 fill-white">
                  <text x="2.5" y="12" fontSize="10" fontWeight="bold" fill="white">₿</text>
                </svg>
              </span>
              Crypto
            </button>
          </div>
        </div>

        {/* Amount input */}
        <div className="px-5 pb-1">
          <div className="bg-[#f4f4f5] rounded-xl px-4 pt-2.5 pb-3">
            <label className="text-[11px] text-[#71717a] block mb-0.5 font-medium">
              Amount
            </label>
            <div className="flex items-center">
              <span className="text-[#18181b] text-sm mr-0.5">৳</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent text-[#18181b] text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        </div>
        <p className="text-[12px] text-[#71717a] px-5 pb-4 pt-1.5">
          from ৳{minAmount.toLocaleString()} to ৳{maxAmount.toLocaleString()}
        </p>

        {/* Quick amount chips */}
        <div className="px-5 pb-5 flex gap-2 flex-wrap">
          {QUICK_AMOUNTS.map((q) => (
            <button
              key={q}
              onClick={() => handleQuickAmount(q)}
              className="px-4 py-2 rounded-full border border-[#e4e4e7] text-[13px] font-semibold text-[#18181b] bg-white hover:bg-[#f4f4f5] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Deposit button */}
        <div className="px-5 pb-5">
          {error ? <p className="text-[12px] text-[#ff4000] mb-2">{error}</p> : null}
          {info ? <p className="text-[12px] text-[#00b24b] mb-2">{info}</p> : null}
          <button
            onClick={handleDeposit}
            disabled={submitting}
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm tracking-wide"
          >
            {submitting ? "Submitting..." : "Deposit"}
          </button>
          {info ? (
            <button
              onClick={closeModal}
              className="w-full mt-2 bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#18181b] font-semibold py-2.5 rounded-xl transition-colors text-sm"
            >
              Close
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
