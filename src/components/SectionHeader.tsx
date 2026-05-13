export type SectionHeaderProps = {
  imageUrl: string;
  title: string;
  alt: string;
};

export const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] mr-auto">
      <div className="items-center box-border caret-transparent gap-x-2 flex outline-[3px] gap-y-2">
        <div className="text-base font-semibold items-center box-border caret-transparent gap-x-2 flex tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 md:text-xl md:gap-x-3 md:tracking-[-0.33px] md:leading-6 md:gap-y-3">
          <img
            src={props.imageUrl}
            alt={props.alt}
            className="text-gray-300 text-base box-border caret-transparent tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-6 md:text-xl md:tracking-[-0.33px] md:leading-6 md:w-8"
          />
          <span className="text-base box-border caret-transparent block tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] md:text-xl md:tracking-[-0.33px] md:leading-6">
            {props.title}
          </span>
        </div>
      </div>
    </div>
  );
};
