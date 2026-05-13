import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { userApi } from "@/services/userApi";

const WITHDRAW_PROVIDERS = [
  {
    id: "nagad",
    name: "Nagad",
    logo: "https://files.v1.distcdn.net/v1/objects/6ebd6ca3-2592-405a-8f89-198bb44ea372",
  },
  {
    id: "bkash",
    name: "BKash",
    logo: "https://files.v1.distcdn.net/v1/objects/513306c6-1563-46db-aab5-5e4e5bb4563a",
  },
];

export const WithdrawalModal = () => {
  const { closeModal, openModal, selectProvider } = useModal();
  const [providers, setProviders] = useState(WITHDRAW_PROVIDERS);

  useEffect(() => {
    let alive = true;
    userApi
      .paymentMethods("withdrawal")
      .then((rows) => {
        if (!alive || !rows.length) {
          return;
        }

        setProviders(
          rows.map((row) => ({
            id: row.code,
            name: row.name,
            logo:
              row.image_url ||
              (row.code.toLowerCase() === "nagad"
                ? "https://files.v1.distcdn.net/v1/objects/6ebd6ca3-2592-405a-8f89-198bb44ea372"
                : "https://files.v1.distcdn.net/v1/objects/513306c6-1563-46db-aab5-5e4e5bb4563a"),
            accountNumber: row.account_number || undefined,
            minAmount: Number(row.min_amount || 0),
            maxAmount: Number(row.max_amount || 0),
          })),
        );
      })
      .catch(() => {
        if (alive) {
          setProviders(WITHDRAW_PROVIDERS);
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  const handleSelect = (p: { id: string; name: string; logo: string; accountNumber?: string; minAmount?: number; maxAmount?: number }) => {
    selectProvider({ id: p.id, name: p.name, logo: p.logo, accountNumber: p.accountNumber, minAmount: p.minAmount, maxAmount: p.maxAmount });
    openModal("withdrawalProvider");
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white rounded-[24px] w-full max-w-[400px] mx-4 shadow-2xl font-inter">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h2 className="text-[22px] font-bold text-[#141415]">Withdrawal</h2>
          <button
            onClick={closeModal}
            className="text-[#71717a] hover:text-[#18181b] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f4f4f5] transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Provider Grid */}
        <div className="px-5 pb-5 grid grid-cols-2 gap-3 min-h-[160px]">
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className="flex flex-col justify-between bg-[#f4f4f5] hover:bg-[#ebebec] rounded-2xl p-4 h-[100px] transition-colors text-left"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-[13px] font-semibold text-[#18181b] mt-1">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
