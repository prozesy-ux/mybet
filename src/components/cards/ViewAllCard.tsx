export type ViewAllCardProps = {
  label: string;
  gameCountText: string;
};

export const ViewAllCard = (props: ViewAllCardProps) => {
  return (
    <button
      type="button"
      className="text-stone-950/30 text-[13.3333px] items-center bg-gray-400/10 caret-transparent gap-x-1 flex flex-col shrink-0 justify-center leading-[normal] min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 snap-start text-center w-[calc(33.3333%_-_5.33333px)] scroll-m-4 rounded-xl md:w-[calc(16.6667%_-_13.3333px)] md:scroll-m-2"
    >
      <span className="text-gray-100 text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
        {props.label}
      </span>
      <span className="text-gray-400 text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px]">
        {props.gameCountText}
      </span>
    </button>
  );
};
