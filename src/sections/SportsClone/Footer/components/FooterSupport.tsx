export const FooterSupport = () => {
  return (
    <div className="text-xs box-border caret-transparent gap-x-3 grid col-end-[support] col-start-[support] row-end-[support] row-start-[support] grid-cols-[1fr] tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 md:gap-x-4 md:grid-cols-[1fr_1fr] md:gap-y-4">
      <div className="relative [align-items:normal] bg-zinc-900 box-border caret-transparent gap-x-6 flex flex-col justify-normal min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 p-4 rounded-2xl md:items-center md:flex-row md:justify-between after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-xs after:not-italic after:normal-nums after:font-normal after:tracking-[0.01px] after:leading-4 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-2xl after:border-separate after:inset-0 after:font-inter">
        <div className="box-border caret-transparent gap-x-1 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 w-[190px] z-[1] md:w-[150px]">
          <div className="text-sm font-semibold box-border caret-transparent gap-x-2 flex tracking-[normal] leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
            Support{" "}
            <div className="text-white text-xs items-center bg-blue-600 box-border caret-transparent flex shrink-0 h-min tracking-[0.01px] leading-4 min-h-[auto] outline-[3px] px-2 py-0.5 rounded-[999px]">
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                24/7
              </div>
            </div>
          </div>
          <span className="text-gray-400 box-border caret-transparent block min-h-8 min-w-[auto] outline-[3px] md:min-h-[auto]">
            Contact us if you still have questions
          </span>
        </div>
        <div className="absolute box-border caret-transparent block outline-[3px] z-[1] right-0 bottom-0 md:hidden">
          <picture className="box-border caret-transparent contents outline-[3px]">
            <img className="absolute box-border caret-transparent outline-[3px] pointer-events-none align-baseline w-[243px] rounded-2xl right-0 bottom-0 md:w-[353px]" />
          </picture>
          <picture className="box-border caret-transparent contents outline-[3px]">
            <img className="absolute box-border caret-transparent outline-[3px] pointer-events-none align-baseline w-[91px] right-6 bottom-[52px]" />
          </picture>
        </div>
        <button
          type="button"
          className="relative text-white text-sm font-semibold bg-transparent caret-transparent block tracking-[normal] leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center z-[1] p-0 rounded-xl"
        >
          <div className="relative bg-blue-600 box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-white after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
            <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                Contact support
              </div>
            </div>
          </div>
        </button>
      </div>
      <div className="box-border caret-transparent gap-x-3 grid grid-cols-[1fr] min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        <div className="items-center bg-zinc-900 box-border caret-transparent flex justify-between min-h-[auto] min-w-[auto] outline-[3px] p-4 rounded-2xl">
          <div className="text-gray-400 box-border caret-transparent gap-x-0.5 flex flex-col h-full justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 overflow-hidden">
            <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-nowrap">
              Commercial offers
            </span>
            <a
              href="mailto://business@1win.social"
              className="text-gray-100 text-sm items-center box-border caret-transparent gap-x-1 flex tracking-[normal] leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 w-max"
            >
              <div className="box-border caret-transparent contents outline-[3px]">
                business@1win.social
              </div>
            </a>
          </div>
        </div>
        <div className="items-center bg-zinc-900 box-border caret-transparent flex justify-between min-h-[auto] min-w-[auto] outline-[3px] p-4 rounded-2xl">
          <div className="text-gray-400 box-border caret-transparent gap-x-0.5 flex flex-col h-full justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 overflow-hidden">
            <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-nowrap">
              Partner program
            </span>
            <a
              href="mailto://partners@1w.run"
              className="text-gray-100 text-sm items-center box-border caret-transparent gap-x-1 flex tracking-[normal] leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 w-max"
            >
              <div className="box-border caret-transparent contents outline-[3px]">
                partners@1w.run
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
