export const ContactCard = () => {
  return (
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
  );
};
