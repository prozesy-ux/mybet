export type SidebarNavItemProps = {
  href: string;
  linkVariant: string;
  iconVariant: string;
  label: string;
  labelClassName: string;
  useLabelSpan: boolean;
  showTrailingIcon: boolean;
  trailingIconSrc: string;
  trailingIconAlt: string;
};

export const SidebarNavItem = (props: SidebarNavItemProps) => {
  return (
    <a
      href={props.href}
      className={`relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full rounded-[10px] ${props.linkVariant}`}
    >
      <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
        <div className="box-border caret-transparent contents outline-[3px]">
          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
            <div
              className={`bg-gray-400 box-border caret-transparent h-full [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%] ${props.iconVariant}`}
            ></div>
          </div>
        </div>
      </div>

      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
          {props.useLabelSpan ? (
            <span className={props.labelClassName}>{props.label}</span>
          ) : (
            props.label
          )}
        </div>
      </div>

      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
        <div className="box-border caret-transparent contents outline-[3px]">
          {props.showTrailingIcon ? (
            <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
              <img
                src={props.trailingIconSrc}
                alt={props.trailingIconAlt}
                className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
              />
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
};
