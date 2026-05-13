export const LastWinsHeader = () => {
  return (
    <div className="items-center box-border caret-transparent gap-x-4 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 mb-3 md:mb-4">
      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] mr-auto">
        <div className="text-base font-semibold items-center box-border caret-transparent gap-x-2 flex tracking-[-0.12px] leading-[22px] outline-[3px] gap-y-2 md:text-xl md:gap-x-3 md:tracking-[-0.33px] md:leading-6 md:gap-y-3">
          <div className="text-white text-base bg-green-500 box-border caret-transparent h-8 tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] w-8 p-1 rounded-lg md:text-xl md:tracking-[-0.33px] md:leading-6">
            <img
              src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-30.svg"
              alt="Icon"
              className="text-base box-border caret-transparent h-full tracking-[-0.12px] leading-[22px] outline-[3px] align-baseline w-full p-0.5 md:text-xl md:tracking-[-0.33px] md:leading-6"
            />
          </div>
          <span className="text-base box-border caret-transparent block tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] md:text-xl md:tracking-[-0.33px] md:leading-6">
            Last wins
          </span>
        </div>
      </div>
      <div className="items-end box-border caret-transparent gap-x-0.5 flex flex-col justify-normal max-w-[40%] min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 md:items-center md:gap-x-2 md:flex-row md:justify-end md:max-w-none md:gap-y-2">
        <div className="items-center box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
          <div className="relative items-center box-border caret-transparent flex shrink-0 h-4 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-4">
            <div className="bg-green-600 box-border caret-transparent h-2 min-h-[auto] min-w-[auto] outline-[3px] w-2 rounded-[50%] before:accent-auto before:bg-green-600 before:box-border before:caret-transparent before:text-gray-100 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-4 before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:opacity-30 before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-4 before:rounded-[50%] before:border-separate before:left-0 before:top-0 before:font-inter"></div>
          </div>
          <div className="text-white text-sm font-semibold box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-end">
            129,515
          </div>
        </div>
        <div className="text-gray-400 text-xs box-border caret-transparent tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-end md:text-sm md:tracking-[normal] md:leading-5">
          Players online
        </div>
      </div>
    </div>
  );
};
