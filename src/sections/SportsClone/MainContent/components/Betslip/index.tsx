import { BetslipHeader } from "@/sections/SportsClone/MainContent/components/Betslip/components/BetslipHeader";
import { BetslipControls } from "@/sections/SportsClone/MainContent/components/Betslip/components/BetslipControls";

export const Betslip = () => {
  return (
    <aside className="relative box-border caret-transparent col-start-2 row-end-[-1] row-start-1 min-h-[auto] min-w-[auto] outline-[3px] w-[360px]">
      <aside className="sticky self-start bg-white box-border caret-transparent flex max-h-[740px] outline-[3px] border border-gray-300/80 overflow-hidden rounded-3xl border-solid top-2">
        <div className="relative box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 scroll-smooth w-full overflow-auto px-4">
          <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"></div>
          <BetslipHeader />
          <BetslipControls />
          <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"></div>
        </div>
      </aside>
    </aside>
  );
};

