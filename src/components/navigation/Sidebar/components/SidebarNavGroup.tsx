import { Link } from "react-router-dom";

export type SidebarNavGroupItem = {
  href: string;
  label: string;
  linkClassName: string;
  iconClassName: string;
  showTrailingIcon: boolean;
  trailingIconSrc: string;
  trailingIconAlt: string;
  itemWrapperClassName: string;
  showDivider: boolean;
};

export type SidebarNavGroupProps = {
  items: SidebarNavGroupItem[];
  variant: string;
};

const SidebarNavLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) => {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

export const SidebarNavGroup = (props: SidebarNavGroupProps) => {
  if (props.variant === "full") {
    return (
      <div className="box-border caret-transparent gap-x-1 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="box-border caret-transparent outline-[3px]">
            <div className="box-border caret-transparent outline-[3px]">
              {props.items[0] && (
                <div className="relative box-border caret-transparent outline-[3px]">
                  <div className="box-border caret-transparent outline-[3px]">
                    <SidebarNavLink
                      href={props.items[0].href}
                      className={props.items[0].linkClassName}
                    >
                      <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                        <div className="box-border caret-transparent contents outline-[3px]">
                          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                            <div className={props.items[0].iconClassName}></div>
                          </div>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          {props.items[0].label}
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                        <div className="box-border caret-transparent contents outline-[3px]">
                          {props.items[0].showTrailingIcon ? (
                            <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                              <img
                                src={props.items[0].trailingIconSrc}
                                alt={props.items[0].trailingIconAlt}
                                className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                              />
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </SidebarNavLink>
                  </div>
                  {props.items[0].showDivider && (
                    <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]"></div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] gap-x-1 flex flex-col gap-y-1">
          {props.items.slice(1).map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={item.itemWrapperClassName}
            >
              <div className="box-border caret-transparent outline-[3px]">
                <SidebarNavLink href={item.href} className={item.linkClassName}>
                  <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                    <div className="box-border caret-transparent contents outline-[3px]">
                      <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                        <div className={item.iconClassName}></div>
                      </div>
                    </div>
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                    <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                      {item.linkClassName ===
                      "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]" ? (
                        <span className="box-border caret-transparent outline-[3px] text-nowrap">
                          {item.label}
                        </span>
                      ) : (
                        item.label
                      )}
                    </div>
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                    <div className="box-border caret-transparent contents outline-[3px]">
                      {item.showTrailingIcon ? (
                        <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                          <img
                            src={item.trailingIconSrc}
                            alt={item.trailingIconAlt}
                            className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </SidebarNavLink>
              </div>
              {item.showDivider && (
                <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] gap-x-1 flex flex-col gap-y-1">
      {props.items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className={item.itemWrapperClassName}
        >
          <div className="box-border caret-transparent outline-[3px]">
            <SidebarNavLink href={item.href} className={item.linkClassName}>
              <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                <div className="box-border caret-transparent contents outline-[3px]">
                  <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                    <div className={item.iconClassName}></div>
                  </div>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                  <span className="box-border caret-transparent outline-[3px] text-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                <div className="box-border caret-transparent contents outline-[3px]">
                  {item.showTrailingIcon ? (
                    <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                      <img
                        src={item.trailingIconSrc}
                        alt={item.trailingIconAlt}
                        className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </SidebarNavLink>
          </div>
          {item.showDivider && (
            <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};
