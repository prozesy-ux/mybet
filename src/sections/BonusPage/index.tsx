import { useEffect, useState } from "react";

type BonusCard = {
  id: number;
  title: string;
  deposit: string;
  gradient: string;
  image: string;
  initialSeconds: number;
  locked?: boolean;
};

const BONUS_CARDS: BonusCard[] = [
  {
    id: 1,
    title: "100% + 70FS",
    deposit: "1st deposit",
    gradient:
      "radial-gradient(100% 100% at 50% 0%, rgb(255, 213, 153) 11.48%, rgb(246, 61, 0) 100%)",
    image:
      "https://v3.bundlecdn.com/b02632/plain/bonus/gifts.1/gift-orange.png",
    initialSeconds: 29 * 24 * 60 * 60 + 23 * 60 * 60 + 28 * 60 + 35,
  },
  {
    id: 2,
    title: "120% + 100FS",
    deposit: "2nd deposit",
    gradient:
      "radial-gradient(100% 100% at 50% 0%, rgb(177, 115, 255) 11.48%, rgb(113, 0, 255) 100%)",
    image:
      "https://v3.bundlecdn.com/b02632/plain/bonus/gifts.1/gift-purple.png",
    initialSeconds: 29 * 24 * 60 * 60 + 23 * 60 * 60 + 28 * 60 + 35,
    locked: true,
  },
  {
    id: 3,
    title: "130% + 150FS",
    deposit: "3rd deposit",
    gradient:
      "radial-gradient(100% 100% at 50% 0%, rgb(153, 200, 255) 11.48%, rgb(0, 117, 255) 100%)",
    image: "https://v3.bundlecdn.com/b02632/plain/bonus/gifts.1/gift-blue.png",
    initialSeconds: 29 * 24 * 60 * 60 + 23 * 60 * 60 + 28 * 60 + 35,
    locked: true,
  },
  {
    id: 4,
    title: "150% + 180FS",
    deposit: "4th deposit",
    gradient:
      "radial-gradient(100% 100% at 50% 0%, rgb(208, 115, 255) 11.48%, rgb(170, 0, 255) 100%)",
    image: "https://v3.bundlecdn.com/b02632/plain/bonus/gifts.1/gift-pink.png",
    initialSeconds: 29 * 24 * 60 * 60 + 23 * 60 * 60 + 28 * 60 + 35,
    locked: true,
  },
];

const formatTimeParts = (totalSeconds: number) => {
  const safe = Math.max(0, totalSeconds);
  const days = Math.floor(safe / 86400);
  const hours = Math.floor((safe % 86400) / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return [days, hours, minutes, seconds].map((value) => String(value).padStart(2, "0"));
};

export const BonusPage = () => {
  const [timers, setTimers] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    BONUS_CARDS.forEach((card) => {
      initial[card.id] = card.initialSeconds;
    });
    return initial;
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimers((prev) => {
        const next: Record<number, number> = {};
        BONUS_CARDS.forEach((card) => {
          next[card.id] = Math.max(0, (prev[card.id] ?? card.initialSeconds) - 1);
        });
        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1640px] mx-auto px-4 md:px-12 py-6 md:py-8">
      <div className="mb-8">
        <h3 className="text-[#f0f2f5] text-2xl font-semibold mb-1">Welcome Bonuses</h3>
        <p className="text-[#9aa1b1] text-xs font-normal mb-8">Get bonuses for your first 4 deposits</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {BONUS_CARDS.map((card) => (
            <div
              key={card.id}
              className="relative w-full h-[244px] rounded-2xl"
              style={{ backgroundImage: card.gradient }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute w-[228px] h-auto top-[-20px] left-1/2 -translate-x-1/2"
              />

              <div className="h-full flex flex-col justify-between items-center px-4 pt-[108px] pb-4 text-center relative z-[2]">
                <div className="w-full">
                  <p className="text-[#f0f2f5] text-2xl font-semibold leading-6">{card.title}</p>
                  <p className="text-xs font-normal text-white/70 mt-1">{card.deposit}</p>
                </div>

                <div className="flex items-center bg-white/20 rounded-[999px] px-2 py-[2px] gap-1 mb-2 text-xs font-semibold text-[#f0f2f5]">
                  {formatTimeParts(timers[card.id] ?? card.initialSeconds).map((part, index, parts) => (
                    <div key={`${card.id}-${part}-${index}`} className="flex items-center gap-1">
                      <span>{part}</span>
                      {index < parts.length - 1 ? <span className="text-[#9aa1b1]">:</span> : null}
                    </div>
                  ))}
                </div>

                {card.locked ? (
                  <button
                    type="button"
                    disabled
                    className="w-[222px] h-11 rounded-xl bg-white/10 text-white/80 text-sm font-semibold"
                  >
                    Locked
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-[222px] h-11 rounded-xl bg-white text-black text-sm font-semibold"
                  >
                    Receive
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
