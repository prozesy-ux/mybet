import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { userApi } from "@/services/userApi";

const FIAT_PROVIDERS = [
  {
    id: "bkash",
    name: "BKash",
    logo: "https://files.v1.distcdn.net/v1/objects/513306c6-1563-46db-aab5-5e4e5bb4563a",
  },
  {
    id: "nagad",
    name: "Nagad",
    logo: "https://files.v1.distcdn.net/v1/objects/6ebd6ca3-2592-405a-8f89-198bb44ea372",
  },
  {
    id: "upay",
    name: "Upay",
    logo: "https://files.v1.distcdn.net/v1/objects/87a930bd-c0ca-4c7e-a08c-d6122d51cf55",
  },
];

type ProviderOption = {
  id: string;
  name: string;
  logo: string;
  accountNumber?: string;
  minAmount?: number;
  maxAmount?: number;
};

const logoByCode: Record<string, string> = {
  bkash: "https://files.v1.distcdn.net/v1/objects/513306c6-1563-46db-aab5-5e4e5bb4563a",
  nagad: "https://files.v1.distcdn.net/v1/objects/6ebd6ca3-2592-405a-8f89-198bb44ea372",
  upay: "https://files.v1.distcdn.net/v1/objects/87a930bd-c0ca-4c7e-a08c-d6122d51cf55",
};

export const DepositModal = () => {
  const { closeModal, openModal, selectProvider } = useModal();
  const [tab, setTab] = useState<"fiat" | "crypto">("fiat");
  const [providers, setProviders] = useState<ProviderOption[]>(FIAT_PROVIDERS);

  useEffect(() => {
    let alive = true;
    userApi
      .paymentMethods("deposit")
      .then((rows) => {
        if (!alive) {
          return;
        }

        if (!rows.length) {
          setProviders(FIAT_PROVIDERS);
          return;
        }

        setProviders(
          rows.map((method) => ({
            id: method.code,
            name: method.name,
            logo: method.image_url || logoByCode[method.code.toLowerCase()] || logoByCode.bkash,
            accountNumber: method.account_number || undefined,
            minAmount: Number(method.min_amount || 0),
            maxAmount: Number(method.max_amount || 0),
          })),
        );
      })
      .catch(() => {
        if (alive) {
          setProviders(FIAT_PROVIDERS);
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  const handleProviderClick = (p: ProviderOption) => {
    selectProvider(p);
    openModal("depositProvider");
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white rounded-2xl w-full max-w-[400px] mx-4 shadow-2xl font-inter">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h2 className="text-[22px] font-bold text-[#18181b]">Deposit</h2>
          <button
            onClick={closeModal}
            className="text-[#71717a] hover:text-[#18181b] w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-xl leading-none"
          >
            ×
          </button>
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

        {/* Currency Selector */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between bg-[#f4f4f5] rounded-xl px-4 py-3 cursor-pointer select-none">
            <div className="flex items-center gap-2">
              <span className="text-base">🇧🇩</span>
              <span className="text-sm font-medium text-[#18181b]">
                Bangladeshi taka
              </span>
            </div>
            <svg
              className="w-4 h-4 text-[#71717a]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Payment Methods Grid */}
        {tab === "fiat" ? (
          <div className="px-5 pb-5 grid grid-cols-2 gap-3">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => handleProviderClick(provider)}
                className="flex flex-col justify-between bg-[#f4f4f5] hover:bg-[#ebebec] rounded-2xl p-4 h-[100px] transition-colors text-left"
              >
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="text-[13px] font-semibold text-[#18181b] mt-1">
                  {provider.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="px-5 pb-5 text-center text-[#71717a] py-8">
            <p className="text-sm">Crypto payment methods coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};
