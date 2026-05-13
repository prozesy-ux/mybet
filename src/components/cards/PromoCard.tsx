export type PromoCardProps = {
  href: string;
  rootVariant: string;
  contentVariant: string;
  title: string;
  titleClassName: string;
  description?: string;
  imageSrc?: string;
  imageClassName: string;
};

export const PromoCard = (props: PromoCardProps) => {
  return (
    <a
      href={props.href}
      className={`relative shadow-[rgba(255,255,255,0.08)_0px_0px_0px_1px] box-border caret-transparent flex min-h-[92px] min-w-[auto] outline-[3px] w-full p-3 rounded-[20px] md:min-h-[auto] ${props.rootVariant}`}
    >
      <div
        className={`box-border caret-transparent outline-[3px] w-full ${props.contentVariant}`}
      >
        {props.description ? (
          <>
            <div className="text-sm font-semibold box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:block">
              <span className={props.titleClassName}>{props.title}</span>
            </div>
            <p className="text-white text-xs box-border caret-transparent tracking-[0.01px] leading-4 max-w-[108px] min-h-8 min-w-[auto] outline-[3px]">
              {props.description}
            </p>
          </>
        ) : null}
      </div>

      <picture className="box-border caret-transparent contents outline-[3px]">
        <img
          src={props.imageSrc}
          className={`absolute box-border caret-transparent object-contain outline-[3px] align-baseline ${props.imageClassName}`}
          alt={props.title}
        />
      </picture>

      {!props.description ? (
        <div className="relative self-center box-border caret-transparent gap-x-2 flex flex-col h-full justify-between min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 md:self-start md:justify-start">
          <div className={props.titleClassName}>{props.title}</div>
        </div>
      ) : null}
    </a>
  );
};
