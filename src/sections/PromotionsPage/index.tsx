import { PromotionsHeader } from "@/sections/PromotionsPage/components/PromotionsHeader";
import { PromotionsGrid } from "@/sections/PromotionsPage/components/PromotionsGrid";

export const PromotionsPage = () => {
  return (
    <div className="box-border caret-transparent grow min-h-[940px] min-w-[auto] outline-[3px] md:min-h-[932px]">
      <div className="fixed box-border caret-transparent outline-[3px] pointer-events-none w-full z-[102] left-0 top-auto bottom-0 md:sticky md:top-0 md:bottom-auto">
        <div className="static box-border caret-transparent gap-x-2 flex flex-col-reverse h-full justify-start outline-[3px] gap-y-2 pt-0 pb-[68px] px-2 md:absolute md:flex-col md:h-auto md:pl-6 md:pr-0 md:pt-3 md:pb-0"></div>
      </div>
      <div className="box-border caret-transparent gap-x-6 flex flex-col max-w-[1640px] outline-[3px] gap-y-6 w-full mx-auto pt-3 pb-6 px-4 md:gap-x-8 md:gap-y-8 md:pt-6 md:pb-8 md:px-12">
        <PromotionsHeader />
        <PromotionsGrid />
      </div>
    </div>
  );
};
