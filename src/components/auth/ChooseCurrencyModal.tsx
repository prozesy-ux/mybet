import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

export type CurrencyItem = {
  code: string;
  name: string;
};

interface ChooseCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (currency: CurrencyItem) => void;
}

const CURRENCIES: CurrencyItem[] = [
  { code: "BCH", name: "Bitcoin Cash" },
  { code: "BNB", name: "Binance coin" },
  { code: "BTC", name: "Bitcoin" },
  { code: "DASH", name: "Dash" },
  { code: "DOGE", name: "Dogecoin" },
  { code: "ETH", name: "Ethereum" },
  { code: "LTC", name: "Litecoin" },
  { code: "TON", name: "Toncoin" },
  { code: "TRX", name: "TRON" },
  { code: "USDC", name: "USD Coin" },
  { code: "USDT", name: "Tether USD" },
  { code: "XLM", name: "Stellar Lumens" },
  { code: "XMR", name: "Monero" },
];

export const ChooseCurrencyModal = ({ isOpen, onClose, onSelect }: ChooseCurrencyModalProps) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (item) =>
        item.code.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q),
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2200] flex items-center justify-center bg-black/60 p-1" onClick={onClose}>
      <div
        className="relative w-full max-w-[398px] rounded-[22px] bg-[#f2f3f5] px-5 pt-4 pb-3 shadow-2xl font-inter max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 text-[#6f7480] transition-colors hover:text-[#18181b]"
          aria-label="Close choose currency modal"
        >
          <X size={26} strokeWidth={2} />
        </button>

        <h2 className="font-inter text-[22px] leading-none font-semibold text-[#141415] mb-4">Choose currency</h2>

        <div className="mb-3 flex items-center gap-2 rounded-[12px] border border-[#4186ff] bg-[#f2f3f5] px-3 py-2.5">
          <Search size={18} strokeWidth={2.2} className="text-[#8c919c]" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#9ba0ab]"
          />
        </div>

        <div className="overflow-y-auto max-h-[72vh] pr-1">
          {filtered.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => onSelect(item)}
              className="w-full text-left py-2.5 border-b border-[#d7dbe2] hover:bg-[#eceff3] transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-[72px] text-[18px] leading-none font-semibold text-[#445a7a]">{item.code}</span>
                <span className="text-[18px] leading-none text-[#141415]">{item.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
