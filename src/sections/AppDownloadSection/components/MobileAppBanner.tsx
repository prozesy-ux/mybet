export const MobileAppBanner = () => {
  return (
    <div className="relative box-border caret-transparent gap-x-3 grid col-end-[a] col-start-[a] row-end-[a] row-start-[a] grid-cols-[minmax(0px,156px)_auto] min-h-[94px] min-w-[auto] outline-[3px] gap-y-3 p-4 rounded-2xl md:grid-cols-[1fr] md:min-h-[190px] md:pr-[275px] md:rounded-[20px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-2xl after:border-separate after:inset-0 after:font-inter after:md:rounded-[20px]">
      <div className="absolute bg-purple-600 box-border caret-transparent outline-[3px] rounded-2xl inset-0 md:rounded-[20px]"></div>
      <div className="box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 z-[2]">
        <span className="text-white font-semibold box-border caret-transparent block tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px]">
          200 Points for installing the app
        </span>
        <span className="text-white text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="box-border caret-transparent contents outline-[3px]">
            Available for Android and iOS
          </div>
        </span>
      </div>
      <button
        type="button"
        className="relative text-black text-sm font-semibold self-end bg-transparent caret-transparent block justify-self-end leading-5 max-w-none min-h-[auto] min-w-32 outline-[3px] text-center z-[2] p-0 rounded-[10px] md:justify-self-stretch md:max-w-xs"
      >
        <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
          <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
            <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
              {" "}
              Install
            </div>
          </div>
        </div>
      </button>
      <picture className="box-border caret-transparent contents outline-[3px]">
        <img className="absolute box-border caret-transparent outline-[3px] pointer-events-none align-baseline w-40 z-[1] right-0 bottom-3 md:w-[410px] md:bottom-0" />
      </picture>
    </div>
  );
};
