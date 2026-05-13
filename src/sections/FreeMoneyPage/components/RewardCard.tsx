export type RewardCardAction = {
  label: string;
  href?: string;
  iconSrc?: string;
  iconAlt?: string;
  className?: string;
  buttonClassName?: string;
};

export type RewardCardProps = {
  rootVariant: string;
  title: string;
  titleClassName: string;
  description?: string;
  descriptionClassName?: string;
  topLeftWrapperClassName?: string;
  topLeftImageClassName?: string;
  topLeftImageSrc?: string;
  topLeftImageAlt?: string;
  topRightWrapperClassName?: string;
  topRightImageClassName?: string;
  topRightImageSrc?: string;
  topRightImageAlt?: string;
  standaloneImageClassName?: string;
  standaloneImageSrc?: string;
  standaloneImageAlt?: string;
  showTopLeftPlaceholder?: boolean;
  topLeftPlaceholderClassName?: string;
  badgeText?: string;
  badgeWrapperClassName?: string;
  badgeTextClassName?: string;
  badgeIconSrc?: string;
  badgeIconAlt?: string;
  badgeIconClassName?: string;
  infoButtonIconSrc?: string;
  infoButtonIconAlt?: string;
  balanceLabel?: string;
  balanceValue?: string;
  balanceIconSrc?: string;
  balanceIconAlt?: string;
  progressText?: string;
  showProgressBar?: boolean;
  countdownLabel?: string;
  countdownValues?: React.ReactNode;
  countdownUnits?: React.ReactNode;
  statusText?: string;
  statusIconSrc?: string;
  statusIconAlt?: string;
  statusIconClassName?: string;
  actions?: RewardCardAction[];
  actionsWrapperClassName?: string;
  primaryButtonText?: string;
  primaryButtonClassName?: string;
  primaryButtonVariantClassName?: string;
  contentFooter?: React.ReactNode;
};

export const RewardCard = (props: RewardCardProps) => {
  return (
    <div
      className={`relative box-border caret-transparent min-w-[auto] outline-[3px] w-full scroll-mt-20 rounded-[20px] md:p-10 md:rounded-[32px] ${props.rootVariant}`}
    >
      {props.topLeftWrapperClassName && (
        <div
          className={`box-border caret-transparent outline-[3px] ${props.topLeftWrapperClassName}`}
        >
          {props.showTopLeftPlaceholder ? (
            <div
              className={`box-border caret-transparent outline-[3px] ${props.topLeftPlaceholderClassName || ""}`}
            ></div>
          ) : (
            <picture className="box-border caret-transparent contents outline-[3px]">
              <img
                src={props.topLeftImageSrc}
                alt={props.topLeftImageAlt || ""}
                className={`box-border caret-transparent outline-[3px] align-baseline ${props.topLeftImageClassName || ""}`}
              />
            </picture>
          )}
        </div>
      )}

      {props.topRightWrapperClassName && (
        <div
          className={`box-border caret-transparent outline-[3px] ${props.topRightWrapperClassName}`}
        >
          <picture className="box-border caret-transparent contents outline-[3px]">
            <img
              src={props.topRightImageSrc}
              alt={props.topRightImageAlt || ""}
              className={`box-border caret-transparent outline-[3px] align-baseline ${props.topRightImageClassName || ""}`}
            />
          </picture>
        </div>
      )}

      {props.standaloneImageClassName && (
        <picture className="box-border caret-transparent contents outline-[3px]">
          <img
            src={props.standaloneImageSrc}
            alt={props.standaloneImageAlt || ""}
            className={props.standaloneImageClassName}
          />
        </picture>
      )}

      <div className="relative box-border caret-transparent outline-[3px]">
        <h2 className={props.titleClassName}>
          {props.title}
          {props.infoButtonIconSrc && (
            <button
              type="button"
              className="absolute text-sm items-center bg-transparent caret-transparent gap-x-1 flex leading-5 outline-[3px] gap-y-1 text-center p-0 right-0"
            >
              <div className="box-border caret-transparent contents outline-[3px]">
                <img
                  src={props.infoButtonIconSrc}
                  alt={props.infoButtonIconAlt || "Icon"}
                  className="box-border caret-transparent h-8 outline-[3px] align-baseline w-8 p-1"
                />
              </div>
            </button>
          )}
        </h2>

        {props.description && (
          <div
            className={`box-border caret-transparent outline-[3px] ${props.descriptionClassName || ""}`}
          >
            <span className="text-sm box-border caret-transparent block leading-5 outline-[3px]">
              {props.description}
            </span>
          </div>
        )}

        {props.balanceLabel && (
          <div className="items-center box-border caret-transparent gap-x-3 flex outline-[3px] gap-y-3 w-full mt-4 md:mt-6">
            <div className="items-center box-border caret-transparent flex justify-center min-h-[auto] min-w-[auto] outline-[3px] py-0.5">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img
                  src={props.balanceIconSrc}
                  alt={props.balanceIconAlt || ""}
                  className="box-border caret-transparent shrink-0 h-9 min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-9 mr-2"
                />
              </picture>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                <div className="text-xs box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px]">
                  {props.balanceLabel}
                </div>
                <div className="text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] md:text-[28px] md:tracking-[-0.59px] md:leading-8">
                  {props.balanceValue}
                </div>
              </div>
            </div>
            <div className="box-border caret-transparent max-w-[202px] min-h-[auto] min-w-[auto] outline-[3px] w-full md:max-w-none md:min-w-[206px] md:w-auto">
              <div className="text-xs font-semibold box-border caret-transparent tracking-[0.01px] leading-4 max-w-none outline-[3px] text-center mb-2 md:max-w-[209px] md:mb-3">
                {props.progressText}
              </div>
              {props.showProgressBar && (
                <div className="items-center bg-white/20 box-border caret-transparent flex h-1.5 outline-[3px] w-full my-0.5 rounded-[3px]">
                  <div className="relative bg-white box-border caret-transparent h-2.5 min-h-[auto] min-w-2.5 outline-[3px] w-[20.7425%] rounded-[5px]">
                    <div className="absolute box-border caret-transparent outline-[3px] translate-x-[50.0%] translate-y-[-2.5px] right-0.5">
                      <div className="bg-white box-border caret-transparent blur-[10px] h-[15px] opacity-85 outline-[3px] w-[15px] rounded-lg"></div>
                      <div className="absolute bg-white shadow-[rgb(255,255,255)_0px_0px_20px_2px] box-border caret-transparent blur-[3px] h-2 outline-[3px] translate-x-[-50.0%] translate-y-[-50.0%] w-2 rounded-lg left-2/4 top-2/4"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {props.badgeText && (
          <div
            className={`box-border caret-transparent outline-[3px] ${props.badgeWrapperClassName || ""}`}
          >
            {props.badgeIconSrc && (
              <div className="box-border caret-transparent outline-[3px] h-4 min-h-[auto] min-w-[auto] w-4 mr-1">
                <img
                  src={props.badgeIconSrc}
                  alt={props.badgeIconAlt || "Icon"}
                  className={
                    props.badgeIconClassName ||
                    "box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                  }
                />
              </div>
            )}
            <div
              className={
                props.badgeTextClassName ||
                "box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"
              }
            >
              {props.badgeText}
            </div>
          </div>
        )}

        {props.countdownLabel && (
          <>
            <div className="box-border caret-transparent outline-[3px] text-xs font-semibold items-center gap-x-2 flex tracking-[0.01px] leading-4 gap-y-2 mt-4 mb-3 md:text-sm md:tracking-[normal] md:leading-5">
              <div className="box-border caret-transparent outline-[3px] text-xs h-4 tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] w-4 md:text-sm md:tracking-[normal] md:leading-5">
                <img
                  src={props.statusIconSrc}
                  alt={props.statusIconAlt || "Icon"}
                  className={
                    props.statusIconClassName ||
                    "box-border caret-transparent h-full outline-[3px] align-baseline w-full text-xs tracking-[0.01px] leading-4 md:text-sm md:tracking-[normal] md:leading-5"
                  }
                />
              </div>
              {props.countdownLabel}
            </div>
            <div className="box-border caret-transparent outline-[3px] gap-x-1 grid grid-rows-[34px_max-content] gap-y-1 w-[169px]">
              <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px] text-xl font-semibold bg-[url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27169%27%20height=%2734%27%20fill=%27none%27%3E%3Cg%20filter=%27url%28%23a)] gap-x-0.5 tracking-[-0.33px] leading-6 gap-y-0.5 md:text-2xl md:tracking-[-0.47px] md:leading-7">
                {props.countdownValues}
              </div>
              <div className="box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px] text-xs font-semibold gap-x-0.5 tracking-[0.01px] leading-4 gap-y-0.5">
                {props.countdownUnits}
              </div>
            </div>
          </>
        )}

        {props.statusText && !props.countdownLabel && (
          <div className="box-border caret-transparent outline-[3px] mt-4">
            <div className="text-xs box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px] text-black font-semibold items-center bg-white inline-flex pl-1 pr-2 py-1 rounded-[999px]">
              {props.statusIconSrc && (
                <div className="text-green-600 box-border caret-transparent outline-[3px] h-4 min-h-[auto] min-w-[auto] w-4 mr-1">
                  <img
                    src={props.statusIconSrc}
                    alt={props.statusIconAlt || "Icon"}
                    className={
                      props.statusIconClassName ||
                      "box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                    }
                  />
                </div>
              )}
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                {props.statusText}
              </div>
            </div>
          </div>
        )}

        {(props.primaryButtonText ||
          props.actions?.length ||
          props.contentFooter) && (
          <div className="box-border caret-transparent outline-[3px] mt-5 md:mt-6">
            {props.primaryButtonText && (
              <button
                type="button"
                className={
                  props.primaryButtonClassName ||
                  `relative text-black text-sm font-semibold bg-transparent caret-transparent leading-5 outline-[3px] text-center w-full p-0 rounded-xl md:w-[270px] ${props.primaryButtonVariantClassName || ""}`
                }
              >
                <div className="relative bg-white box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
                  <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                    <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                      {props.primaryButtonText}
                    </div>
                  </div>
                </div>
              </button>
            )}

            {props.actions && props.actions.length > 0 && (
              <div
                className={
                  props.actionsWrapperClassName ||
                  "box-border caret-transparent gap-x-3 flex outline-[3px] gap-y-3 md:gap-x-4 md:gap-y-4"
                }
              >
                {props.actions.map((action, index) =>
                  action.href ? (
                    <a
                      key={index}
                      href={action.href}
                      className={
                        action.className ||
                        "relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                      }
                    >
                      <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                        <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                          <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                            {action.label}
                          </div>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <button
                      key={index}
                      type="button"
                      className={
                        action.buttonClassName ||
                        "relative text-black text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-xl"
                      }
                    >
                      <div className="relative bg-white box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
                        <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                          <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                            {action.iconSrc && (
                              <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-6 p-0.5">
                                <img
                                  src={action.iconSrc}
                                  alt={action.iconAlt || "Icon"}
                                  className="box-border caret-transparent h-full outline-[3px] text-nowrap align-baseline w-full"
                                />
                              </div>
                            )}
                            {action.label}
                          </div>
                        </div>
                      </div>
                    </button>
                  ),
                )}
              </div>
            )}

            {props.contentFooter}
          </div>
        )}
      </div>
    </div>
  );
};
