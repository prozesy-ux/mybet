import { AllGamesGrid } from "@/sections/AllGamesSection/components/AllGamesGrid";

export const AllGamesSection = () => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
      <div className="box-border caret-transparent flex flex-col outline-[3px]">
        <div className="items-center box-border caret-transparent gap-x-4 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 mb-3 md:mb-4">
          <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] mr-auto">
            <div className="text-base font-semibold items-center box-border caret-transparent gap-x-2 flex tracking-[-0.12px] leading-[22px] outline-[3px] gap-y-2 md:text-xl md:gap-x-3 md:tracking-[-0.33px] md:leading-6 md:gap-y-3">
              <img
                src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/1/c0e41135-6be0-4d71-befc-2962fae77fdc.svg"
                alt="All games"
                className="text-gray-300 text-base box-border caret-transparent tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-6 md:text-xl md:tracking-[-0.33px] md:leading-6 md:w-8"
              />
              <span className="text-base box-border caret-transparent block tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] md:text-xl md:tracking-[-0.33px] md:leading-6">
                All games
              </span>
            </div>
          </div>
        </div>
        <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <AllGamesGrid />
        </div>
      </div>
    </div>
  );
};
