export const LoadMore = () => {
  return (
    <div className="box-border caret-transparent outline-[3px]">
      <div className="items-center box-border caret-transparent flex flex-col outline-[3px]">
        <div className="text-gray-400 text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] mb-3.5">
          Games shown: 21 of 14,583
        </div>
        <div className="items-center bg-gray-400/10 box-border caret-transparent flex h-1 max-w-[130px] min-h-[auto] min-w-[auto] outline-[3px] w-full mb-[22px] rounded-sm">
          <div className="bg-gray-100 box-border caret-transparent h-1.5 min-h-[auto] min-w-1.5 outline-[3px] w-[0.144003%] rounded-[3px]"></div>
        </div>
        <button
          type="button"
          className="relative text-white text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-xl"
        >
          <div className="relative bg-blue-600 box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-white after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
            <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                Show more
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
