import { useState } from "react";

const tabs = ["Top", "Live", "Esports", "Sports", "Markets"] as const;

export const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Top");

  return (
    <div className="relative box-border caret-transparent grid min-h-[auto] min-w-[auto] outline-[3px] text-nowrap overflow-hidden">
      <nav className="box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px] text-nowrap overflow-auto">
        {tabs.map((tab) => (
          <div
            key={tab}
            className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-nowrap"
          >
            <button
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-semibold items-center box-border caret-transparent gap-x-2 flex leading-5 outline-[3px] gap-y-2 text-nowrap px-3 py-1.5 rounded-[999px] ${
                activeTab === tab ? "bg-white" : "bg-transparent"
              }`}
            >
              {tab}
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
};
