import { useState } from "react";
import { useModal } from "@/context/ModalContext";

type BonusItem = {
  id: string;
  title: string;
  subtitle: string;
  reward: string;
  tag: string;
};

const BONUS_ITEMS: BonusItem[] = [
  {
    id: "1",
    title: "Welcome Bonus",
    subtitle: "First deposit bonus for new players",
    reward: "100% up to ৳10,000",
    tag: "Popular",
  },
  {
    id: "2",
    title: "Free Spins Pack",
    subtitle: "Spin selected slots for free",
    reward: "50 Free Spins",
    tag: "Slots",
  },
  {
    id: "3",
    title: "Weekend Cashback",
    subtitle: "Get cashback on total losses",
    reward: "10% Cashback",
    tag: "Weekly",
  },
];

export const BonusesModal = () => {
  const { closeModal, openModal } = useModal();
  const [activated, setActivated] = useState<Record<string, boolean>>({});

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
          <h2 className="text-[22px] font-bold text-[#141415] mb-1">Bonuses</h2>
          <p className="text-[13px] text-[#6f7480] mb-4">Free spins and other offers</p>

          <div className="flex flex-col gap-3">
            {BONUS_ITEMS.map((item) => {
              const isOn = !!activated[item.id];
              return (
                <div key={item.id} className="bg-[#f0f2f5] rounded-[16px] p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[14px] font-semibold text-[#141415]">{item.title}</p>
                      <p className="text-[12px] text-[#6f7480] mt-0.5">{item.subtitle}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#3b82f6] bg-[#dbeafe] px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-[13px] font-semibold text-[#141415]">{item.reward}</p>
                    <button
                      onClick={() => setActivated((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className={`text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors ${
                        isOn
                          ? "bg-[#dcfce7] text-[#15803d]"
                          : "bg-[#00b24b] hover:bg-[#008c3b] text-white"
                      }`}
                    >
                      {isOn ? "Activated" : "Activate"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
