export const WheelGame = () => {
  return (
    <div className="bg-gray-100 box-border caret-transparent flex flex-col outline-[3px] rounded-2xl">
      <div className="items-center box-border caret-transparent flex justify-between min-h-[auto] min-w-[auto] outline-[3px] p-3">
        <div className="text-sm font-semibold box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
          Wheel of fortune
        </div>
      </div>
      <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] pb-3 px-3">
        <div className="text-zinc-600 text-xs box-border caret-transparent tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] mb-4">
          Spin and try your luck!
        </div>
        <div className="box-border caret-transparent flex justify-center min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="relative items-center box-border caret-transparent flex h-[168px] justify-center min-h-[auto] min-w-[auto] outline-[3px] w-[168px] p-2">
            <img
              src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-28.svg"
              alt="Icon"
              className="absolute box-border caret-transparent h-[168px] outline-[3px] w-[168px] inset-0"
            />
            <img
              src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-29.svg"
              alt="Icon"
              className="absolute box-border caret-transparent h-[22px] outline-[3px] w-[22px] top-3"
            />
            <div className="items-center box-border caret-transparent flex flex-col max-w-[150px] min-h-[auto] min-w-[auto] outline-[3px]">
              <span className="text-zinc-600 text-xs box-border caret-transparent block leading-[13px] min-h-[auto] min-w-[auto] outline-[3px]">
                Win
              </span>
              <span className="text-xl font-semibold box-border caret-transparent block leading-[30px] min-h-[auto] min-w-[auto] outline-[3px]">
                Tk 0.00
              </span>
            </div>
          </div>
        </div>
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full mt-4">
          <div className="items-center bg-gray-400/20 box-border caret-transparent gap-x-3 flex h-11 outline-transparent outline outline-1 gap-y-3 px-4 rounded-xl">
            <input
              placeholder="Bet amount"
              value=""
              className="text-sm bg-transparent box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] outline-[3px] pointer-events-none bg-[position:0px_0px] p-0"
            />
            <button className="text-blue-600 text-sm font-semibold items-center bg-transparent caret-transparent gap-x-1 flex leading-5 max-w-[120px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 text-center p-0.5">
              Bet all
            </button>
          </div>
        </div>
        <div className="items-start box-border caret-transparent gap-x-1 flex justify-between min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 mt-1">
          <div className="text-zinc-600 text-xs box-border caret-transparent tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px]">
            Bet amount per spin
          </div>
          <div className="text-green-600 text-xs font-semibold box-border caret-transparent tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-end invisible">
            from Tk 0.00 to Tk 0.00
          </div>
        </div>
        <div className="box-border caret-transparent gap-x-2 grid grid-cols-[1fr_auto] min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 mt-3">
          <div className="items-center bg-gray-400/20 box-border caret-transparent gap-x-0.5 grid auto-cols-[1fr] grid-flow-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 w-full p-0.5 rounded-xl">
            <button
              type="button"
              className="relative text-sm font-semibold items-center bg-transparent caret-transparent gap-x-2 flex h-10 justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full overflow-hidden px-2 py-0 rounded-[10px]"
            >
              <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                x1.5
              </span>
            </button>
            <button
              type="button"
              className="relative text-sm font-semibold items-center bg-white caret-transparent gap-x-2 flex h-10 justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full overflow-hidden px-2 py-0 rounded-[10px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-900 before:block before:text-sm before:not-italic before:normal-nums before:font-semibold before:h-6 before:tracking-[normal] before:leading-5 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:visible before:w-px before:border-separate before:left-0 before:font-inter"
            >
              <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                x2
              </span>
            </button>
            <button
              type="button"
              className="relative text-sm font-semibold items-center bg-transparent caret-transparent gap-x-2 flex h-10 justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full overflow-hidden px-2 py-0 rounded-[10px] before:accent-auto before:box-border before:caret-transparent before:text-neutral-900 before:block before:text-sm before:not-italic before:normal-nums before:font-semibold before:h-6 before:tracking-[normal] before:leading-5 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:visible before:w-px before:border-separate before:left-0 before:font-inter"
            >
              <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                x3
              </span>
            </button>
          </div>
          <button
            type="button"
            className="relative appearance-none text-white items-center bg-blue-600 caret-transparent flex h-11 min-h-[auto] opacity-50 outline-[3px] px-5 py-0 rounded-xl"
          >
            <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
              <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                Spin
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
