export const BetslipHeader = () => {
  return (
    <div className="items-center box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
      <p className="font-semibold box-border caret-transparent tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] mr-auto">
        Betslip
      </p>
      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] mx-auto"></div>
      <div className="items-center box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
        <div className="text-slate-500 box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <span className="bg-slate-500 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/wallet.svg')] [mask-repeat:no-repeat] outline-[3px] w-4 [mask-position:50%]"></span>
        </div>
        <div className="text-sm font-semibold box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
          Tk 0.00
        </div>
      </div>
    </div>
  );
};
