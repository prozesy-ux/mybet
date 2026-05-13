import { useRef } from "react";

export const PromoCarousel = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollByStep = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const step = Math.max(280, Math.round(container.clientWidth * 0.9));
    container.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative box-border caret-transparent outline-[3px] overflow-hidden rounded-3xl">
      <div
        ref={scrollRef}
        className="box-border caret-transparent gap-x-4 flex outline-[3px] overflow-x-auto overflow-y-hidden overscroll-x-contain gap-y-4"
      >
        <div className="box-border caret-transparent flex shrink-0 min-h-[auto] min-w-[auto] outline-[3px] snap-center w-full">
          <div className="relative bg-neutral-300 bg-[url('https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://bstatic.live/promo/1.fdb0c582-853e-4e16-8d3c-1d9ac7c100ef.jpeg')] bg-size-[480px_100%,cover] box-border caret-transparent flex basis-[0%] flex-col grow h-80 min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden bg-[position:0px,50%_0px,50%] p-10 rounded-3xl">
            <div className="box-border caret-transparent flex flex-col h-full justify-between min-h-[auto] min-w-[auto] outline-[3px]">
              <div className="box-border caret-transparent flex flex-col grow max-w-[400px] min-h-[auto] min-w-[auto] outline-[3px]">
                <div className="text-white text-[40px] font-semibold box-border caret-transparent tracking-[-0.47px] leading-[42px] min-h-[auto] min-w-[auto] outline-[3px] mb-4">
                  x6 for 1win Points
                </div>
                <div className="text-white box-border caret-transparent leading-[22px] min-h-[auto] min-w-[auto] outline-[3px]">
                  Place sports bets and earn even more 1win Points
                </div>
              </div>
            </div>
            <div
              role="button"
              className="absolute box-border caret-transparent outline-[3px] right-10 top-10"
            >
              <span className="text-white/80 bg-white/80 box-border caret-transparent block h-6 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/question-circle.svg')] [mask-repeat:no-repeat] outline-[3px] w-6 [mask-position:50%]"></span>
            </div>
          </div>
        </div>
        <div className="box-border caret-transparent flex shrink-0 min-h-[auto] min-w-[auto] outline-[3px] snap-center w-full">
          <div className="relative bg-neutral-300 bg-[url('https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://bstatic.live/promo/1.1d6057e7-fc1b-4860-ab31-c829c34b3cfc.jpeg')] bg-size-[480px_100%,cover] box-border caret-transparent flex basis-[0%] flex-col grow h-80 min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden bg-[position:0px,50%_0px,50%] p-10 rounded-3xl">
            <div className="box-border caret-transparent flex flex-col h-full justify-between min-h-[auto] min-w-[auto] outline-[3px]">
              <div className="box-border caret-transparent flex flex-col grow max-w-[400px] min-h-[auto] min-w-[auto] outline-[3px]">
                <div className="text-white text-[40px] font-semibold box-border caret-transparent tracking-[-0.47px] leading-[42px] min-h-[auto] min-w-[auto] outline-[3px] mb-4">
                  Multiple bet bonus
                </div>
                <div className="text-white box-border caret-transparent leading-[22px] min-h-[auto] min-w-[auto] outline-[3px]">
                  Get +15% on winnings for multiple bets with 5+ events
                </div>
              </div>
            </div>
            <div
              role="button"
              className="absolute box-border caret-transparent outline-[3px] right-10 top-10"
            >
              <span className="text-white/80 bg-white/80 box-border caret-transparent block h-6 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/question-circle.svg')] [mask-repeat:no-repeat] outline-[3px] w-6 [mask-position:50%]"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute box-border caret-transparent gap-x-1 flex outline-[3px] gap-y-1 right-10 bottom-10">
        <button
          type="button"
          onClick={() => scrollByStep("left")}
          className="relative appearance-none text-white items-center bg-gray-400/10 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
        >
          <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
            <span className="text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
              <img
                src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-18.svg"
                alt="Icon"
                className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
              />
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => scrollByStep("right")}
          className="relative appearance-none text-white items-center bg-gray-400/10 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
        >
          <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
            <span className="text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
              <img
                src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-19.svg"
                alt="Icon"
                className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
              />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};
