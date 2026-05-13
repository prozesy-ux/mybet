import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { userApi, type UserBet } from "@/services/userApi";

export const BetHistoryModal = () => {
  const { closeModal, openModal } = useModal();
  const { isAuthenticated } = useAuth();
  const [tab, setTab] = useState<"open" | "settled">("open");
  const [bets, setBets] = useState<UserBet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setBets([]);
      return;
    }

    setLoading(true);
    setError("");
    userApi
      .bets(tab)
      .then((rows) => setBets(rows))
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Failed to load bets"))
      .finally(() => setLoading(false));
  }, [tab, isAuthenticated]);

  const filtered = bets;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="bg-white rounded-[24px] w-full max-w-[400px] mx-4 shadow-2xl font-inter max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 sticky top-0 bg-white z-10">
          <button
            onClick={() => openModal("profile")}
            className="flex items-center gap-1 text-[#3b82f6] hover:text-[#2563eb] text-[14px] font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={closeModal}
            className="text-[#71717a] hover:text-[#18181b] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f4f4f5] transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-5 pb-5">
          <h2 className="text-[22px] font-bold text-[#141415] mb-1">Bet history</h2>
          <p className="text-[13px] text-[#6f7480] mb-4">Open and settled bets</p>

          <div className="flex bg-[#f0f2f5] rounded-xl p-1 gap-1 mb-3">
            <button
              onClick={() => setTab("open")}
              className={`flex-1 py-2 rounded-lg text-[13px] font-semibold ${tab === "open" ? "bg-white shadow-sm text-[#141415]" : "text-[#6f7480]"}`}
            >
              Open
            </button>
            <button
              onClick={() => setTab("settled")}
              className={`flex-1 py-2 rounded-lg text-[13px] font-semibold ${tab === "settled" ? "bg-white shadow-sm text-[#141415]" : "text-[#6f7480]"}`}
            >
              Settled
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {!isAuthenticated ? <p className="text-[13px] text-[#6f7480]">Please login to view your bets.</p> : null}
            {loading ? <p className="text-[13px] text-[#6f7480]">Loading...</p> : null}
            {error ? <p className="text-[13px] text-[#ff4000]">{error}</p> : null}
            {filtered.map((bet) => (
              <div key={bet.id} className="bg-[#f0f2f5] rounded-[14px] p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-semibold text-[#141415]">{bet.game_name || "Unknown"}</p>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${bet.status === "pending" ? "bg-[#dbeafe] text-[#1d4ed8]" : bet.status === "won" ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#fee2e2] text-[#b91c1c]"}`}>
                    {bet.status === "pending" ? "Open" : bet.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[13px]">
                  <p className="text-[#6f7480]">Stake: <span className="text-[#141415] font-semibold">৳{Number(bet.amount).toLocaleString()}</span></p>
                  <p className="text-[#6f7480]">Return: <span className="text-[#141415] font-semibold">৳{Number(bet.potential_win || 0).toLocaleString()}</span></p>
                </div>
                <p className="text-[12px] text-[#6f7480] mt-1">{new Date(bet.created_at).toLocaleString()}</p>
              </div>
            ))}
            {!loading && !error && isAuthenticated && filtered.length === 0 ? <p className="text-[13px] text-[#6f7480]">No bets found.</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
