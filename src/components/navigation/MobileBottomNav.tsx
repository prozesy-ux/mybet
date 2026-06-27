import { Gift, Grid3X3, Home, Menu, Trophy } from "lucide-react";
import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/blog", label: "Menu", Icon: Menu },
  { to: "/", label: "Home", Icon: Home, end: true },
  { to: "/casino", label: "Casino", Icon: Grid3X3 },
  { to: "/free-money", label: "Free money", Icon: Gift },
  { to: "/sports", label: "Sports", Icon: Trophy },
];

export const MobileBottomNav = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-[1200] border-t border-white/10 bg-[#0d0f14] pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="mx-auto grid h-[56px] w-full max-w-[420px] grid-cols-5">
        {tabs.map(({ to, label, Icon, end }) => (
          <NavLink
            key={`${to}-${label}`}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex h-[56px] flex-col items-center justify-center gap-0.5 px-1 text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-[#1a83ff]"
                  : "text-[#a0a7b5]"
              }`
            }
          >
            <Icon size={16} strokeWidth={2.2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
