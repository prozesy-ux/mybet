export type ViewAllCardProps = {
  buttonText: string;
  iconSrc: string;
  iconAlt: string;
  indicatorClassName: string;
  indicatorSpanClassName: string;
};

export const ViewAllCard = (props: ViewAllCardProps) => {
  return (
    <div className="relative bg-white box-border caret-transparent shrink-0 h-56 min-h-[auto] min-w-[auto] order-1 outline-[3px] w-[180px] overflow-hidden p-6 rounded-2xl">
      <button className="text-sm font-semibold items-center bg-transparent caret-transparent gap-x-1 inline-flex leading-5 outline-[3px] gap-y-1 text-center p-0.5">
        {props.buttonText}{" "}
        <img
          src={props.iconSrc}
          alt={props.iconAlt}
          className="text-zinc-600 box-border caret-transparent h-5 outline-[3px] w-5"
        />
      </button>
      <div
        className={`absolute text-white items-center bottom-[-3px] box-border caret-transparent flex h-16 justify-center outline-[3px] rotate-[-8.999976735956185deg] w-16 rounded-[20px] -right-0.5 ${props.indicatorClassName}`}
      >
        <span
          className={`bg-white box-border caret-transparent block h-12 [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-12 [mask-position:50%] ${props.indicatorSpanClassName}`}
        ></span>
      </div>
    </div>
  );
};
