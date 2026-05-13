export type SidebarNavSectionSubItem = {
  href: string;
  label: string;
  linkClassName: string;
  iconClassName: string;
};

export type SidebarNavSectionItem = {
  href: string;
  label: string;
  linkClassName: string;
  iconClassName: string;
  trailingIconSrc?: string;
  trailingIconAlt?: string;
  badgeText?: string;
  hasDivider?: boolean;
  subItems?: SidebarNavSectionSubItem[];
};

export type SidebarNavSectionProps = {
  rootClassName: string;
  sectionClassName: string;
  items: SidebarNavSectionItem[];
};

export const SidebarNavSection = (props: SidebarNavSectionProps) => {
  return (
    <div className={props.rootClassName}>
      <div className={props.sectionClassName}>
        {props.items.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className={
              item.subItems && item.subItems.length > 0
                ? "box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] gap-x-1 flex flex-col gap-y-1"
                : "relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"
            }
          >
            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
              <div className="relative box-border caret-transparent outline-[3px]">
                <div className="box-border caret-transparent outline-[3px]">
                  <a href={item.href} className={item.linkClassName}>
                    <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                      <div className="box-border caret-transparent contents outline-[3px]">
                        <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                          <div className={item.iconClassName}></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                      <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                        {item.label}
                      </div>
                    </div>
                    {item.badgeText ? (
                      <div className="text-white text-xs font-semibold items-center bg-rose-600 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-7 outline-[3px] ml-auto p-0.5 rounded-[999px]">
                        {item.badgeText}
                      </div>
                    ) : (
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                        <div className="box-border caret-transparent contents outline-[3px]">
                          {item.trailingIconSrc ? (
                            <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                              <img
                                src={item.trailingIconSrc}
                                alt={item.trailingIconAlt || "Icon"}
                                className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </a>
                </div>
              </div>

              {item.hasDivider ? (
                <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]"></div>
              ) : null}
            </div>

            {item.subItems && item.subItems.length > 0 ? (
              <div className="box-border caret-transparent grid grid-rows-[1fr] outline-[3px]">
                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden">
                  <div className="border-b-gray-100 border-l-zinc-800 border-r-gray-100 border-t-gray-100 box-border caret-transparent gap-x-1 flex flex-col outline-[3px] gap-y-1 ml-[18px] mt-1 pl-[5px] border-l border-solid">
                    {item.subItems.map((subItem, subIndex) => (
                      <div
                        key={`${subItem.label}-${subIndex}`}
                        className="relative box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]"
                      >
                        <div className="box-border caret-transparent outline-[3px]">
                          <a
                            href={subItem.href}
                            className={subItem.linkClassName}
                          >
                            <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                                  <div className={subItem.iconClassName}></div>
                                </div>
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                                <span className="box-border caret-transparent outline-[3px] text-nowrap">
                                  {subItem.label}
                                </span>
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                              <div className="box-border caret-transparent contents outline-[3px]"></div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
