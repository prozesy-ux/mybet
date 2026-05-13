import { useState } from "react";

const tabs = [
  { id: "top", label: "Free Money" },
  { id: "betwin-token", label: "Betwin Token" },
  { id: "betwin-points", label: "Betwin Points" },
  { id: "cashback", label: "Cashback" },
  { id: "bonus-code", label: "How to get the bonus code" },
];

export const PageTabs = () => {
  const [activeTab, setActiveTab] = useState("top");

  return (
    <div className="sticky box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-auto z-10 bg-left-top mb-3 top-0 md:static md:top-[-100px] md:w-full md:bg-[position:0px_0px] md:mb-8">
      <div className="relative items-center box-border caret-transparent flex outline-[3px] overflow-visible rounded-none md:overflow-hidden md:rounded-[26px]">
        <div className="box-border caret-transparent max-w-full min-h-[auto] min-w-[auto] outline-[3px] w-full z-0 overflow-hidden">
          <div className="bg-neutral-900 box-border caret-transparent gap-x-2 flex outline-[3px] overflow-x-auto overflow-y-hidden gap-y-2 -mx-4 px-4 py-3 scroll-p-[50px] rounded-none md:overflow-x-hidden md:mx-0 md:p-2 md:rounded-[26px]">
            {tabs.map((tab) => (
              <div key={tab.id} className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                <a
                  href={`#${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm font-semibold items-center caret-transparent gap-x-2 flex h-10 justify-center leading-5 outline-[3px] gap-y-2 text-center text-nowrap px-4 rounded-[999px] after:accent-auto after:box-border after:caret-transparent after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:p-px after:rounded-[999px] after:border-separate after:inset-0 after:font-inter ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-400/10 text-gray-100"
                  }`}
                >
                  {tab.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
