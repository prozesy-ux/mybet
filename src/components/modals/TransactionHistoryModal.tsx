import { useEffect, useMemo, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { userApi, type UserTransaction } from "@/services/userApi";

const BKASH_LOGO = "https://files.v1.distcdn.net/v1/objects/513306c6-1563-46db-aab5-5e4e5bb4563a";
const NAGAD_LOGO = "https://files.v1.distcdn.net/v1/objects/6ebd6ca3-2592-405a-8f89-198bb44ea372";

type TxType = "deposit" | "withdrawal";

const CheckIcon = () => (
  <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none">
    <path d="M2.5 7l3 3.5 5.5-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CancelIcon = () => (
  <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none">
    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

export const TransactionHistoryModal = () => {
  const { closeModal } = useModal();
  const { isAuthenticated } = useAuth();
  const [tab, setTab] = useState<"all" | "deposits" | "withdrawals">("all");
  const [transactions, setTransactions] = useState<UserTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setTransactions([]);
      return;
    }

    setLoading(true);
    setError("");

    userApi
      .transactions()
      .then((rows) => setTransactions(rows))
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Failed to load transactions");
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const normalized = useMemo(
    () =>
      transactions.map((tx) => {
        const created = new Date(tx.created_at);
        const isDeposit = tx.type === "deposit";
        const amount = Number(tx.amount || 0);
        const code = String(tx.payment_method || "wallet").toLowerCase();
        const provider = code.toUpperCase();
        const logo = code === "nagad" ? NAGAD_LOGO : BKASH_LOGO;
        const statusLabel = tx.status === "completed" ? "Successful" : tx.status === "pending" ? "Pending" : "Canceled";
        return {
          id: String(tx.id),
          provider,
          logo,
          status: statusLabel,
          amount: `${isDeposit ? "+" : "-"}৳${amount.toLocaleString()}`,
          date: created.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
          time: created.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
          type: tx.type as TxType,
        };
      }),
    [transactions],
  );

  const filtered = normalized.filter((tx) => {
    if (tab === "deposits") return tx.type === "deposit";
    if (tab === "withdrawals") return tx.type === "withdrawal";
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white rounded-[24px] w-full max-w-[400px] mx-4 shadow-2xl font-inter flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-end px-5 pt-4 pb-2 shrink-0">
          <button
            onClick={closeModal}
            className="text-[#71717a] hover:text-[#18181b] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f4f4f5] transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
        <h2 className="text-[22px] font-bold text-[#141415] px-5 pb-4 shrink-0">
          Transaction history
        </h2>

        {/* Tabs */}
        <div className="px-5 pb-4 shrink-0">
          <div className="flex bg-[#f0f2f5] rounded-xl p-1 gap-0.5">
            {(["all", "deposits", "withdrawals"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 px-2 rounded-lg text-[13px] font-semibold transition-all capitalize ${
                  tab === t
                    ? "bg-white shadow-sm text-[#141415]"
                    : "text-[#6f7480]"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction list */}
        <div className="overflow-y-auto flex-1 px-5">
          {!isAuthenticated ? (
            <p className="text-[13px] text-[#6f7480] py-6 text-center">Please login to see transaction history.</p>
          ) : null}
          {loading ? <p className="text-[13px] text-[#6f7480] py-6 text-center">Loading...</p> : null}
          {error ? <p className="text-[13px] text-[#ff4000] py-6 text-center">{error}</p> : null}
          <div className="flex flex-col divide-y divide-[rgba(0,0,0,0.06)]">
            {filtered.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 py-3.5">
                {/* Logo */}
                <div className="w-10 h-10 rounded-full bg-[#f0f2f5] flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={tx.logo}
                    alt={tx.provider}
                    className="w-7 h-7 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#141415]">{tx.provider}</p>
                  {tx.status === "Successful" ? (
                    <p className="flex items-center gap-1 text-[13px] font-semibold text-[#00b24b]">
                      <CheckIcon /> Successful
                    </p>
                  ) : tx.status === "Pending" ? (
                    <p className="flex items-center gap-1 text-[13px] font-semibold text-[#f59e0b]">
                      <CheckIcon /> Pending
                    </p>
                  ) : (
                    <p className="flex items-center gap-1 text-[13px] font-medium text-[#6f7480]">
                      <CancelIcon /> Canceled
                    </p>
                  )}
                </div>
                {/* Amount + Date */}
                <div className="text-right shrink-0">
                  <p
                    className={`text-[14px] font-semibold ${
                      tx.status === "Canceled"
                        ? "line-through text-[#141415]"
                        : "text-[#141415]"
                    }`}
                  >
                    {tx.amount}
                  </p>
                  <p className="text-[12px] text-[#6f7480]">{tx.date}</p>
                  <p className="text-[12px] text-[#6f7480]">{tx.time}</p>
                </div>
              </div>
            ))}
            {!loading && !error && isAuthenticated && filtered.length === 0 ? (
              <p className="text-[13px] text-[#6f7480] py-6 text-center">No transactions found.</p>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 text-center shrink-0">
          <p className="text-[13px] text-[#6f7480]">
            Shown operations: {filtered.length} of {filtered.length}
          </p>
          <div className="w-12 h-1 bg-[#d7dbe2] rounded-full mx-auto mt-3" />
        </div>
      </div>
    </div>
  );
};
