export const JackpotHeader = () => {
  return (
    <div className="relative items-center box-border caret-transparent gap-x-2 flex flex-col justify-start min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:items-start md:w-auto">
      <div className="text-white text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] md:text-2xl md:tracking-[-0.47px] md:leading-7">
        Total jackpot
      </div>
      <div className="text-white text-4xl font-extrabold items-center box-border caret-transparent flex tracking-[-1.2px] leading-[38px] min-h-[auto] min-w-[auto] outline-[3px]">
        <span className="absolute box-border caret-transparent block h-[30px] outline-[3px] -left-4 md:-left-6">
          <span className="relative box-border caret-transparent flex h-[30px] outline-[3px] overflow-hidden">
            <span className="absolute bg-[radial-gradient(50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.1)_44%,rgba(255,255,255,0)_88%),radial-gradient(50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.1)_44%,rgba(255,255,255,0)_88%)] bg-size-[auto,auto] box-border caret-transparent block h-full outline-[3px] translate-x-[-50.0%] w-[200%] bg-[position:0%,0%_0%,0%] top-0"></span>
            <img
              src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-27.svg"
              alt="Icon"
              className="box-border caret-transparent h-[30px] outline-[3px] align-baseline w-4"
            />
          </span>
        </span>
        <span className="absolute box-border caret-transparent block h-[30px] outline-[3px] -right-4 md:hidden md:transform-none">
          <span className="relative box-border caret-transparent flex h-[30px] outline-[3px] overflow-hidden">
            <span className="absolute bg-[radial-gradient(50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.1)_44%,rgba(255,255,255,0)_88%),radial-gradient(50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.1)_44%,rgba(255,255,255,0)_88%)] bg-size-[auto,auto] box-border caret-transparent block h-full outline-[3px] translate-x-[-50.0%] w-[200%] bg-[position:0%,0%_0%,0%] top-0 md:transform-none"></span>
            <img
              src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-27.svg"
              alt="Icon"
              className="box-border caret-transparent h-[30px] outline-[3px] align-baseline w-4"
            />
          </span>
        </span>
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-nowrap">
          $44,212,743
        </div>
      </div>
    </div>
  );
};
