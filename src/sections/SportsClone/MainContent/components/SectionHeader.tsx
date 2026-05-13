export type SectionHeaderProps = {
  title: string;
  indicatorClassName: string;
  indicatorInnerClassName: string;
  actionButtonClassName: string;
  actionContentClassName: string;
  actionText: string;
  actionIconUrl: string;
  actionIconAlt: string;
  showActionIcon: boolean;
  leftNavIconUrl: string;
  leftNavIconAlt: string;
  rightNavIconUrl: string;
  rightNavIconAlt: string;
};

export const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <header className="items-center box-border caret-transparent gap-x-4 flex justify-between outline-[3px] gap-y-4">
      <div className="text-xl font-semibold items-center box-border caret-transparent gap-x-2 flex grow tracking-[-0.33px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
        <div
          className={`text-white items-center box-border caret-transparent flex h-6 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-6 rounded-lg ${props.indicatorClassName}`}
        >
          <span
            className={`bg-white box-border caret-transparent block h-4 [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%] ${props.indicatorInnerClassName}`}
          ></span>
        </div>
        {props.title}
      </div>

      <button
        type="button"
        className={`relative appearance-none items-center caret-transparent flex h-8 min-h-[auto] opacity-50 outline-[3px] px-3 py-0 ${props.actionButtonClassName}`}
      >
        <span
          className={
            props.actionContentClassName
              ? `items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full ${props.actionContentClassName}`
              : "items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full"
          }
        >
          <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
            {props.actionText}
          </span>
          {props.showActionIcon && (
            <span className="text-slate-500 box-border caret-transparent block shrink-0 h-4 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-4">
              <img
                src={props.actionIconUrl}
                alt={props.actionIconAlt}
                className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
              />
            </span>
          )}
        </span>
      </button>

      <div className="box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
        <button
          type="button"
          className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
        >
          <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
            <span className="text-slate-500 text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
              <img
                src={props.leftNavIconUrl}
                alt={props.leftNavIconAlt}
                className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
              />
            </span>
          </span>
        </button>

        <button
          type="button"
          className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
        >
          <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
            <span className="text-slate-500 text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
              <img
                src={props.rightNavIconUrl}
                alt={props.rightNavIconAlt}
                className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
              />
            </span>
          </span>
        </button>
      </div>
    </header>
  );
};
