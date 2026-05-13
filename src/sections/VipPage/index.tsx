import { useState } from "react";

const VIP_FAQ = [
  { q: "How do I get VIP status?", a: "VIP status is earned through regular gameplay and accumulated wagers. Contact support or your personal manager for details on eligibility." },
  { q: "How do I transfer my VIP status from another platform?", a: "If you have VIP status elsewhere, contact our support team with proof of your status, and we'll evaluate an equivalent level for you on Betwin." },
  { q: "Why do I need a personal VIP manager, and how are they different from the support team?", a: "Your VIP manager is dedicated solely to you — they proactively assist with account management, exclusive offers, withdrawals, and any premium service needs, going beyond standard support." },
  { q: "What is the concierge service?", a: "Our concierge service handles real-world requests: hotel bookings, travel arrangements, restaurant reservations, healthcare assistance, and more — all while you focus on enjoying the game." },
];

const EXCLUSIVE_GIFTS = [
  { value: "5,000+", label: "Bookings in the world's top hotels", bg: "#1a4d8c", icon: "🏨" },
  { value: "11,000+", label: "Custom pieces of jewelry", bg: "#5d3990", icon: "💍" },
  { value: "370+", label: "World-class golf club memberships", bg: "#1e5c3a", icon: "⛳" },
  { value: "550+", label: "Premium-class cars", bg: "#2e3035", icon: "🚗" },
  { value: "480+", label: "Rolex and Audemars Piguet watches", bg: "#1a4d8c", icon: "⌚" },
  { value: "250+", label: "Hermès Birkin handbags", bg: "#8b4513", icon: "👜" },
];

export const VipPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative bg-black overflow-hidden">
        <div className="max-w-[1640px] mx-auto px-4 md:px-12 pt-12 pb-0 flex flex-col items-center">
          <p className="text-[#9aa1b1] text-sm font-semibold tracking-widest uppercase mb-2">WHAT MAKES THE BETWIN</p>
          <h1
            className="text-white text-4xl md:text-6xl font-black text-center uppercase leading-tight mb-2"
            style={{ fontFamily: "'Halvar Breit', 'Inter', sans-serif" }}
          >
            VIP CLUB
          </h1>
          <p className="text-[#9aa1b1] text-base font-semibold tracking-widest uppercase mb-6">THE BEST CHOICE OUT THERE?</p>
          <div className="w-full max-w-2xl">
            <img
              src="https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/vip/landing/car.png"
              alt="Lamborghini"
              className="w-full object-contain"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.background = "linear-gradient(135deg, #cc0000 0%, #330000 100%)";
                el.style.height = "200px";
                el.style.borderRadius = "12px";
              }}
            />
          </div>
        </div>
      </div>

      {/* Awards Bar */}
      <div className="bg-[#1d1e20] border-t border-white/5">
        <div className="max-w-[1640px] mx-auto px-4 md:px-12 py-4">
          <div className="flex items-center gap-6 overflow-x-auto pb-1 justify-center flex-wrap">
            {[
              { title: "CBRIMSON CLUB", sub: "ONLINE CASINO OPERATOR", year: "2023" },
              { title: "Responsible Summit Awards", sub: "RECOGNITION AWARD", year: "2024" },
              { title: "Betwin", sub: "TOP BRAND", year: "2024" },
              { title: "ME Esports", sub: "PARTNER CHOICE", year: "2024" },
              { title: "SIGMA Africa", sub: "BEST CASINO BRAND", year: "2024" },
            ].map((award, i) => (
              <div key={i} className="flex flex-col items-center text-center min-w-[100px]">
                <div className="w-10 h-10 mb-1 opacity-70">
                  <svg viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="#9aa1b1" strokeWidth="1.5" />
                    <path d="M20 8 L23 16 L32 16 L25 22 L27 30 L20 25 L13 30 L15 22 L8 16 L17 16 Z" fill="#9aa1b1" opacity="0.5" />
                  </svg>
                </div>
                <p className="text-[#9aa1b1] text-[9px] font-bold uppercase leading-tight">{award.title}</p>
                <p className="text-[#757a85] text-[8px] uppercase">{award.sub}</p>
                <p className="text-[#9aa1b1] text-[9px]">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1640px] mx-auto px-4 md:px-12 py-8 flex flex-col gap-4">
        {/* VIP Manager Card */}
        <div
          className="rounded-2xl p-6 flex items-center justify-between gap-4 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a4d8c 0%, #0f2d5a 100%)" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-lg font-bold">VIP manager</span>
              <span className="bg-[#00b24b] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">LIVE</span>
            </div>
            <p className="text-white/70 text-sm">Will reward you for your gaming activities and help out as you play</p>
          </div>
          <div className="flex -space-x-3 shrink-0">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="w-12 h-12 rounded-full border-2 border-[#1a4d8c] bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] overflow-hidden"
              >
                <img
                  src={`https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/vip/landing/manager-${n}.jpg`}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Concierge Service Card */}
        <div className="rounded-2xl overflow-hidden bg-white text-black">
          <div className="relative h-40 bg-gray-100 overflow-hidden">
            <img
              src="https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/vip/landing/jet.jpg"
              alt="Private jet"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <p className="text-white text-xl font-black tracking-widest uppercase">CONCIERGE</p>
              <p className="text-white text-xl font-black tracking-widest uppercase">SERVICE</p>
              <p className="text-white/70 text-sm mt-1">Have a blast</p>
              <p className="text-white/70 text-sm">while we take care of your business</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {["Child coverage", "Pleasant chats", "Travel arrangements", "Healthcare", "Roadside assistance", "Home assistance"].map((service) => (
                <div key={service} className="flex flex-col items-center gap-1 min-w-[80px]">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">🛎️</div>
                  <span className="text-[10px] font-semibold text-gray-700 text-center leading-tight">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Approach */}
        <div>
          <p className="text-[#9aa1b1] text-xs font-bold tracking-widest uppercase text-center mb-4">A PERSONAL APPROACH</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl overflow-hidden relative min-h-[180px]" style={{ background: "linear-gradient(135deg, #0f766e 0%, #134e4a 100%)" }}>
              <div className="p-6">
                <h3 className="text-white text-base font-bold mb-6">Personal bonuses</h3>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 h-8 rounded-lg transition-colors">More info</button>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-60 flex items-end justify-end p-2 text-4xl">💰</div>
            </div>
            <div className="rounded-2xl overflow-hidden relative min-h-[180px]" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)" }}>
              <div className="p-6">
                <h3 className="text-white text-base font-bold mb-6">Private VIP tournaments</h3>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 h-8 rounded-lg transition-colors">More info</button>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-70 flex items-end justify-end p-2 text-4xl">🏆</div>
            </div>
            <div className="rounded-2xl overflow-hidden relative min-h-[180px]" style={{ background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)" }}>
              <div className="p-6">
                <h3 className="text-white text-base font-bold mb-6">Epic parties</h3>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 h-8 rounded-lg transition-colors">More info</button>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-70 flex items-end justify-end p-2 text-4xl">🥂</div>
            </div>
          </div>
        </div>

        {/* Exclusive Gifts */}
        <div>
          <p className="text-[#9aa1b1] text-xs font-bold tracking-widest uppercase text-center mb-4">EXCLUSIVE GIFTS</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXCLUSIVE_GIFTS.map((gift, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${gift.bg} 0%, ${gift.bg}88 100%)` }}
              >
                <span className="text-4xl shrink-0">{gift.icon}</span>
                <div>
                  <p className="text-white text-2xl font-black leading-none">{gift.value}</p>
                  <p className="text-white/70 text-xs leading-tight mt-1">{gift.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Exchange Banner */}
        <div
          className="rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)" }}
        >
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M1 4v6h6" /><path d="M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-black uppercase mb-2">DO YOU HAVE VIP STATUS ON ANOTHER PLATFORM?</h2>
            <p className="text-white/70 text-sm mb-6">Exchange your VIP status on your platform for VIP privileges on here</p>
            <button className="bg-white text-[#1d1e20] text-sm font-bold px-8 h-10 rounded-[10px] hover:bg-white/90 transition-colors">
              Move to Betwin VIP
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-[#f0f2f5] text-lg font-bold mb-4">FAQ</h2>
          <div className="flex flex-col gap-2">
            {VIP_FAQ.map((item, i) => (
              <div key={i} className="bg-[#1d1e20] rounded-xl overflow-hidden">
                <button
                  className="w-full text-left flex items-center justify-between px-5 py-4 text-[#f0f2f5] text-sm font-medium hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`shrink-0 text-[#9aa1b1] transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-[#9aa1b1] text-sm leading-5">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl overflow-hidden relative min-h-[280px]">
          <img
            src="https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/vip/landing/yacht.jpg"
            alt="Yacht"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              const el = e.target as HTMLElement;
              el.style.background = "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)";
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[280px] text-center px-8">
            <p className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-2">TRY THE</p>
            <h2
              className="text-white text-5xl font-black uppercase mb-2"
              style={{ fontFamily: "'Halvar Breit', 'Inter', sans-serif" }}
            >
              VIP CLUB
            </h2>
            <p className="text-white/60 text-sm">Just play and upgrade your level</p>
          </div>
        </div>
      </div>
    </div>
  );
};
