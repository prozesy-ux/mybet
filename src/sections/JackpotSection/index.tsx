import { JackpotHeader } from "@/sections/JackpotSection/components/JackpotHeader";
import { JackpotCarousel } from "@/sections/JackpotSection/components/JackpotCarousel";

export const JackpotSection = () => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
      <div className="box-border caret-transparent contents outline-[3px]">
        <div className="relative items-start bg-fuchsia-800 box-border caret-transparent gap-x-3 flex flex-col h-full justify-between min-h-[263px] outline-[3px] gap-y-3 overflow-hidden p-4 rounded-[20px] md:items-center md:gap-x-5 md:flex-row md:min-h-[244px] md:gap-y-5 md:pl-6 md:pr-0 md:py-6 md:rounded-3xl after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[20px] after:border-separate after:inset-0 after:font-inter after:md:rounded-3xl">
          <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none z-[2] inset-0">
            <picture className="box-border caret-transparent contents outline-[3px]">
              <img className="box-border caret-transparent h-full outline-[3px] align-baseline w-full" />
            </picture>
          </div>
          <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none z-[2] right-0 inset-y-0">
            <picture className="box-border caret-transparent contents outline-[3px]">
              <img className="box-border caret-transparent h-full outline-[3px] align-baseline w-[94px]" />
            </picture>
          </div>
          <div className="items-start self-stretch box-border caret-transparent gap-x-[normal] flex flex-col justify-between min-h-[auto] min-w-[auto] outline-[3px] gap-y-[normal] w-full z-[2] md:gap-x-4 md:gap-y-4 md:w-auto">
            <JackpotHeader />
            <div className="box-border caret-transparent hidden min-h-0 min-w-0 outline-[3px] md:flex md:min-h-[auto] md:min-w-[auto]">
              <a
                href="#"
                className="relative text-black text-sm font-semibold box-border caret-transparent inline-block leading-5 min-h-0 min-w-0 outline-[3px] rounded-[10px] md:block md:min-h-[auto] md:min-w-[200px]"
              >
                <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                  <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                    <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                      See all jackpots
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <JackpotCarousel />
          <div className="box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px] w-full md:hidden md:min-h-0 md:min-w-0">
            <a
              href="#"
              className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full rounded-[10px] md:inline-block md:min-h-0 md:min-w-0"
            >
              <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                  <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                    See all jackpots
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
