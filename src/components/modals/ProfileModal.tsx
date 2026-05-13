import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { userApi, type UserProfileStats } from "@/services/userApi";

// lucide-style SVG icons inline
const GiftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M21 12v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9" />
    <path d="M12 8v13M8 8c0-2.21 1.79-4 4-4s4 1.79 4 4" />
    <path d="M8 8c-2.21 0-4 1.79-4 4h4V8z" />
    <path d="M16 8c2.21 0 4 1.79 4 4h-4V8z" />
  </svg>
);
const TagIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="7.5" cy="7.5" r="1.5" />
    <path d="M3 3h7l11 11a2 2 0 0 1 0 2.83l-4.17 4.17a2 2 0 0 1-2.83 0L3 10V3z" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);
const ArrowsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M7 16V4m0 0L3 8m4-4 4 4" />
    <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
  </svg>
);
const GearIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const HeadsetIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);
const PlusCircle = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);
const IdIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M16 10h2M16 14h2M6 10h6M6 14h4" />
  </svg>
);

const menuItems = [
  { id: "bonuses", Icon: GiftIcon, title: "Bonuses", desc: "Free spins and other offers", action: "bonuses", dot: false },
  { id: "bonus-codes", Icon: TagIcon, title: "Bonus codes", desc: "Code activation", action: "bonusCodes", dot: false },
  { id: "bet-history", Icon: ClockIcon, title: "Bet history", desc: "Open and settled bets", action: "betHistory", dot: false },
  { id: "tx-history", Icon: ArrowsIcon, title: "Transaction history", desc: "Deposit and withdrawal statuses", action: "txHistory", dot: false },
  { id: "settings", Icon: GearIcon, title: "Settings", desc: "Edit personal data", action: "settings", dot: true },
  { id: "support", Icon: HeadsetIcon, title: "24/7 support", desc: "All contact info", action: "support", dot: false },
];

export const ProfileModal = () => {
  const { closeModal, openModal } = useModal();
  const { user, isAuthenticated } = useAuth();
  const [profileStats, setProfileStats] = useState<UserProfileStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  const displayName = user?.name ?? "PROZESY LTD";
  const displayId = user?.id ?? 327183038;
  const displayBalance = Number(user?.balance || 0).toFixed(2);

  useEffect(() => {
    if (!isAuthenticated) {
      setProfileStats(null);
      return;
    }

    setStatsLoading(true);
    userApi
      .profileStats()
      .then((stats) => setProfileStats(stats))
      .catch(() => setProfileStats(null))
      .finally(() => setStatsLoading(false));
  }, [isAuthenticated]);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white rounded-[24px] w-full max-w-[400px] mx-4 shadow-2xl font-inter overflow-hidden">
        {/* Header row */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h2 className="text-[22px] font-bold text-[#141415]">Profile</h2>
          <button
            onClick={closeModal}
            className="text-[#71717a] hover:text-[#18181b] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f4f4f5] transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* User info */}
        <div className="px-5 pb-4 text-center">
          <p className="text-[15px] font-bold text-[#141415] tracking-wide">{displayName}</p>
          <p className="text-[13px] text-[#6f7480] flex items-center justify-center gap-1 mt-0.5">
            <IdIcon /> ID {displayId}
          </p>
          {profileStats?.highGainer ? (
            <p className="text-[11px] text-[#15803d] font-semibold mt-1">HIGH GAINER (80%+ WIN RATE)</p>
          ) : null}
          {profileStats?.suspicious ? (
            <p className="text-[11px] text-[#b91c1c] font-semibold mt-1">ACCOUNT UNDER ADDITIONAL VERIFICATION</p>
          ) : null}
        </div>

        {/* Balance card */}
        <div className="px-5 pb-4">
          <div className="bg-[#f0f2f5] rounded-[16px] px-4 pt-3 pb-4">
            <p className="text-[12px] text-[#6f7480] mb-1 font-medium">Account</p>
            <p className="text-[26px] font-bold text-[#141415] leading-none">৳{displayBalance}</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-3 text-[11px] text-[#6f7480]">
              <p>Deposits: <span className="font-semibold text-[#141415]">{profileStats?.stats.depositCount ?? 0}</span></p>
              <p>Withdrawals: <span className="font-semibold text-[#141415]">{profileStats?.stats.withdrawalCount ?? 0}</span></p>
              <p>Transactions: <span className="font-semibold text-[#141415]">{profileStats?.stats.totalTransactions ?? 0}</span></p>
              <p>Bets: <span className="font-semibold text-[#141415]">{profileStats?.stats.totalBets ?? 0}</span></p>
              <p>Total In: <span className="font-semibold text-[#141415]">৳{Number(profileStats?.stats.totalDeposit || 0).toLocaleString()}</span></p>
              <p>Total Out: <span className="font-semibold text-[#141415]">৳{Number(profileStats?.stats.totalWithdrawal || 0).toLocaleString()}</span></p>
            </div>
            {statsLoading ? <p className="text-[11px] text-[#6f7480] mt-2">Loading tracking data...</p> : null}
          </div>
          {/* Action buttons */}
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => openModal("deposit")}
              className="flex-1 bg-[#00b24b] hover:bg-[#008c3b] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-1.5 text-[14px] transition-colors"
            >
              <PlusCircle /> Deposit
            </button>
            <button
              onClick={() => openModal("withdrawal")}
              className="flex-1 bg-[#f0f2f5] hover:bg-[#d7dbe2] text-[#141415] font-semibold py-3 rounded-xl text-[14px] transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Menu items — grouped in two cards */}
        <div className="px-5 pb-5 flex flex-col gap-2">
          {/* Group 1: Bonuses + Bonus codes */}
          <div className="bg-[#f0f2f5] rounded-[16px] overflow-hidden">
            {menuItems.slice(0, 2).map((item, i) => (
              <button
                key={item.id}
                onClick={() => item.action ? openModal(item.action as never) : undefined}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-[#e8eaed] transition-colors ${i < 1 ? "border-b border-[rgba(0,0,0,0.06)]" : ""}`}
              >
                <span className="w-8 h-8 rounded-full bg-[#d7dbe2] flex items-center justify-center text-[#53575f] shrink-0">
                  <item.Icon />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#141415]">{item.title}</p>
                  <p className="text-[12px] text-[#6f7480]">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Group 2: Bet history + Transaction history */}
          <div className="bg-[#f0f2f5] rounded-[16px] overflow-hidden">
            {menuItems.slice(2, 4).map((item, i) => (
              <button
                key={item.id}
                onClick={() => item.action ? openModal(item.action as never) : undefined}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-[#e8eaed] transition-colors ${i < 1 ? "border-b border-[rgba(0,0,0,0.06)]" : ""}`}
              >
                <span className="w-8 h-8 rounded-full bg-[#d7dbe2] flex items-center justify-center text-[#53575f] shrink-0">
                  <item.Icon />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#141415]">{item.title}</p>
                  <p className="text-[12px] text-[#6f7480]">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Group 3: Settings + Support */}
          <div className="bg-[#f0f2f5] rounded-[16px] overflow-hidden">
            {menuItems.slice(4, 6).map((item, i) => (
              <button
                key={item.id}
                onClick={() => item.action ? openModal(item.action as never) : undefined}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-[#e8eaed] transition-colors ${i < 1 ? "border-b border-[rgba(0,0,0,0.06)]" : ""}`}
              >
                <div className="relative shrink-0">
                  <span className="w-8 h-8 rounded-full bg-[#d7dbe2] flex items-center justify-center text-[#53575f]">
                    <item.Icon />
                  </span>
                  {item.dot && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#ff4000] border-2 border-[#f0f2f5]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#141415]">{item.title}</p>
                  <p className="text-[12px] text-[#6f7480]">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
