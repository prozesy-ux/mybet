import { useState } from "react";

const tabs = [
  { id: "lobby", label: "Lobby", targetId: "lobby-section" },
  { id: "live-casino", label: "Live Casino", targetId: "live-casino-section" },
  { id: "quick-games", label: "Quick games", targetId: "quick-games-section" },
] as const;

export const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("lobby");

  const handleTabClick = (tabId: (typeof tabs)[number]["id"], targetId: string) => {
    setActiveTab(tabId);
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="box-border caret-transparent flex justify-center min-h-[auto] min-w-[auto] outline-[3px] md:justify-start">
      <div className="relative box-border caret-transparent grid auto-cols-[minmax(0px,max-content)] grid-flow-col isolate min-h-[auto] min-w-[auto] outline-[3px] w-max">
        {tabs.map((tab) => (
          <div key={tab.id} className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
            <button
              type="button"
              onClick={() => handleTabClick(tab.id, tab.targetId)}
              className={`text-sm font-semibold items-center caret-transparent gap-x-2 flex h-9 justify-center leading-5 outline-[3px] gap-y-2 text-center text-nowrap px-4 rounded-[999px] after:accent-auto after:box-border after:caret-transparent after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:p-px after:rounded-[999px] after:border-separate after:inset-0 after:font-inter ${
                activeTab === tab.id ? "bg-blue-600 text-white" : "bg-transparent text-gray-100"
              }`}
            >
              {tab.label}
            </button>
          </div>
        ))}
        <div className="absolute bg-gray-400/10 box-border caret-transparent col-start-1 row-start-1 outline-[3px] z-[-2] rounded-[997px] inset-0.5"></div>
      </div>
    </div>
  );
};
