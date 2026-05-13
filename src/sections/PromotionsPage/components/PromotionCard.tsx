export type PromotionCardProps = {
  title: string;
  topIconSrc: string;
  topIconAlt: string;
  buttonCount: string;
  buttonIconSrc: string;
  buttonIconAlt: string;
  timePart1: string;
  timePart2: string;
  timePart3: string;
  timePart4: string;
};

export const PromotionCard = (props: PromotionCardProps) => {
  return (
    <div className="bg-zinc-900 box-border caret-transparent gap-x-4 flex flex-col grow justify-between min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 p-4 rounded-b-3xl">
      <div className="text-base font-semibold box-border caret-transparent gap-x-0.5 grid grid-cols-[1fr_max-content] tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 md:text-xl md:tracking-[-0.33px] md:leading-6">
        <div className="text-base box-border caret-transparent flow-root tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden md:text-xl md:tracking-[-0.33px] md:leading-6">
          {props.title}
        </div>
        <img
          src={props.topIconSrc}
          alt={props.topIconAlt}
          className="text-gray-400 text-base box-border caret-transparent h-4 tracking-[-0.12px] leading-[22px] outline-[3px] align-baseline w-4 mt-1 md:text-xl md:tracking-[-0.33px] md:leading-6"
        />
      </div>
      <div className="items-center box-border caret-transparent flex justify-between min-h-[auto] min-w-[auto] outline-[3px]">
        <button
          type="button"
          className="relative text-gray-100 text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-[999px]"
        >
          <div className="relative bg-gray-400/10 box-border caret-transparent h-8 outline-[3px] px-3 rounded-[999px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[999px] after:border-separate after:inset-0 after:font-inter">
            <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                <div className="relative box-border caret-transparent h-4 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-4 mr-1">
                  <img
                    src={props.buttonIconSrc}
                    alt={props.buttonIconAlt}
                    className="absolute box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4 left-0 top-0"
                  />
                  <div className="absolute box-border caret-transparent h-0 outline-[3px] pointer-events-none text-nowrap w-0 left-2 top-2"></div>
                </div>
                {props.buttonCount}
              </div>
            </div>
          </div>
        </button>
        <div className="text-xs tabular-nums font-semibold items-center bg-gray-400/20 box-border caret-transparent gap-x-1 flex tracking-[0.01px] leading-4 min-h-5 min-w-[auto] outline-[3px] gap-y-1 w-fit px-2 py-0.5 rounded-[999px]">
          <div className="text-gray-100 box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-center">
            {props.timePart1}
          </div>
          <div className="text-gray-400 box-border caret-transparent min-h-[auto] min-w-[5px] outline-[3px] text-center">
            :
          </div>
          <div className="text-gray-100 box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-center">
            {props.timePart2}
          </div>
          <div className="text-gray-400 box-border caret-transparent min-h-[auto] min-w-[5px] outline-[3px] text-center">
            :
          </div>
          <div className="text-gray-100 box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-center">
            {props.timePart3}
          </div>
          <div className="text-gray-400 box-border caret-transparent min-h-[auto] min-w-[5px] outline-[3px] text-center">
            :
          </div>
          <div className="text-gray-100 box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-center">
            {props.timePart4}
          </div>
        </div>
      </div>
    </div>
  );
};
