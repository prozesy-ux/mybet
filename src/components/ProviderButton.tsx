export const ProviderButton = () => {
  return (
    <div className="relative box-border caret-transparent basis-6/12 grow shrink min-h-[auto] min-w-[auto] outline-[3px] md:basis-80 md:grow-0 md:shrink-0">
      <button
        type="button"
        className="relative text-sm font-semibold bg-transparent caret-transparent leading-5 outline-[3px] text-center w-full p-0 rounded-xl"
      >
        <div className="relative bg-gray-400/10 box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
          <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
            <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
              <picture className="box-border caret-transparent contents outline-[3px] text-nowrap">
                <img
                  alt="Providers"
                  src="https://1win.com/resources/v1/optimizeimages/unsafe/quality_2to1/plain/https://v3.bundlecdn.com/b02632/plain/casino/providers-btn/preferences.svg"
                  className="box-border caret-transparent brightness-0 invert-[1] h-4 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap align-baseline"
                />
              </picture>
              Providers
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
