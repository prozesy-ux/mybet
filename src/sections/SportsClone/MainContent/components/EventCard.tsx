export type EventCardProps = {
  topBadgeClass?: string;
  showTopLeftBadge?: boolean;
  firstIconClass: string;
  secondIconClass: string;
  league: string;
  sport: string;

  statusPrimary?: string;
  statusDotText?: string;
  statusDateText?: string;
  showSecondaryStatusIcon?: boolean;

  team1Name: string;
  team1LogoUrl?: string;
  team1LogoAlt?: string;
  team1LogoSpanClass?: string;
  team1ExtraIndicatorClass?: string;

  team2Name: string;
  team2LogoUrl?: string;
  team2LogoAlt?: string;
  team2LogoSpanClass?: string;
  team2ExtraIndicatorClass?: string;

  scoreContent?: React.ReactNode;

  marketTitle: string;

  option1Label?: string;
  option1Value?: string;
  option1ButtonClass: string;
  option1InnerClass: string;
  option1IndicatorClass: string;
  option1ValueClass: string;

  option2Label?: string;
  option2Value?: string;
  option2ButtonClass?: string;
  option2InnerClass?: string;
  option2IndicatorClass?: string;
  option2ValueClass?: string;
  showOption2?: boolean;

  option3Label?: string;
  option3Value?: string;
  option3ButtonClass?: string;
  option3InnerClass?: string;
  option3IndicatorClass?: string;
  option3ValueClass?: string;
  showOption3?: boolean;

  moreText?: string;
  moreInnerContent?: React.ReactNode;
};

export const EventCard = (props: EventCardProps) => {
  return (
    <div className="box-border caret-transparent gap-x-px flex flex-col min-h-[auto] min-w-[328px] outline-[3px] gap-y-px overflow-hidden rounded-2xl">
      <div className="items-center bg-white box-border caret-transparent flex min-h-12 min-w-[auto] outline-[3px] px-3 py-[5px]">
        <div className="box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px] mr-2">
          {props.showTopLeftBadge ? (
            <div
              className={`box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px] ${props.topBadgeClass || "text-white items-center bg-orange-600 h-6 justify-center w-6 mr-1 rounded-[100%]"}`}
            >
              <span className="bg-white box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/fire.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"></span>
            </div>
          ) : null}

          <div className="bg-white box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
              <div className="box-border caret-transparent outline-[3px] rounded-[100%]">
                <span
                  className={`bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%] ${props.firstIconClass}`}
                ></span>
              </div>
            </div>
            <div className="relative bg-white box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] -ml-1 pl-0.5 rounded-[100%]">
              <div className="box-border caret-transparent outline-[3px] rounded-[100%]">
                <span
                  className={`bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%] ${props.secondIconClass}`}
                ></span>
              </div>
            </div>
          </div>
        </div>

        <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden mr-auto">
          <div className="text-sm font-semibold box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
            {props.league}
          </div>
          <div className="text-zinc-600 text-xs font-semibold box-border caret-transparent leading-[15px] min-h-[auto] min-w-[auto] outline-[3px] text-nowrap">
            {props.sport}
          </div>
        </div>
      </div>

      <div
        role="button"
        className="bg-white box-border caret-transparent gap-x-[15px] flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-[15px] p-3"
      >
        <div className="box-border caret-transparent basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="items-center box-border caret-transparent gap-x-1 flex outline-[3px] gap-y-1">
            <div className="text-xs font-semibold items-center box-border caret-transparent gap-x-1 flex h-6 tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 border border-gray-400/20 overflow-hidden px-2 rounded-[999px] border-solid">
              {props.statusDotText || props.statusDateText ? (
                <>
                  <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                    {props.statusPrimary}
                  </span>
                  {props.statusDotText ? (
                    <span className="text-zinc-600 box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                      {props.statusDotText}
                    </span>
                  ) : null}
                  {props.statusDateText ? (
                    <span className="text-zinc-600 box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                      {props.statusDateText}
                    </span>
                  ) : null}
                </>
              ) : (
                <>
                  <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-rose-600 bg-rose-600 shrink-0 h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/live.svg')] [mask-repeat:no-repeat] w-4 [mask-position:50%]"></span>
                  {props.statusPrimary ? (
                    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                      {props.statusPrimary}
                    </div>
                  ) : null}
                </>
              )}
            </div>

            {props.showSecondaryStatusIcon ? (
              <div className="text-slate-500 text-xs font-semibold items-center box-border caret-transparent gap-x-1 flex h-6 tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 border border-gray-400/20 overflow-hidden px-2 rounded-[999px] border-solid">
                <span className="bg-slate-500 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/tv.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"></span>
              </div>
            ) : null}
          </div>

          <div className="box-border caret-transparent flex h-[42px] outline-[3px] mt-3">
            <div className="box-border caret-transparent gap-x-0.5 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 w-full mr-2">
              <div className="items-center box-border caret-transparent flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px]">
                {props.team1LogoUrl ? (
                  <div className="box-border caret-transparent min-h-[auto] outline-[3px] h-5 min-w-[auto] w-5 mr-1">
                    <img
                      src={props.team1LogoUrl}
                      alt={props.team1LogoAlt || "Team Logo"}
                      className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full"
                    />
                  </div>
                ) : props.team1LogoSpanClass ? (
                  <div className="box-border caret-transparent min-h-[auto] outline-[3px] h-5 min-w-[auto] w-5 mr-1">
                    <span
                      className={`box-border caret-transparent outline-[3px] ${props.team1LogoSpanClass}`}
                    ></span>
                  </div>
                ) : null}

                <div className="text-sm font-semibold items-center box-border caret-transparent grid leading-5 min-h-[auto] outline-[3px]">
                  <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                    {props.team1Name}
                  </span>
                </div>

                {props.team1ExtraIndicatorClass ? (
                  <span className={props.team1ExtraIndicatorClass}></span>
                ) : null}
              </div>

              <div className="items-center box-border caret-transparent flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px]">
                {props.team2LogoUrl ? (
                  <div className="box-border caret-transparent min-h-[auto] outline-[3px] h-5 min-w-[auto] w-5 mr-1">
                    <img
                      src={props.team2LogoUrl}
                      alt={props.team2LogoAlt || "Team Logo"}
                      className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full"
                    />
                  </div>
                ) : props.team2LogoSpanClass ? (
                  <div className="box-border caret-transparent min-h-[auto] outline-[3px] h-5 min-w-[auto] w-5 mr-1">
                    <span
                      className={`box-border caret-transparent outline-[3px] ${props.team2LogoSpanClass}`}
                    ></span>
                  </div>
                ) : null}

                <div className="text-sm font-semibold items-center box-border caret-transparent grid leading-5 min-h-[auto] outline-[3px]">
                  <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                    {props.team2Name}
                  </span>
                </div>

                {props.team2ExtraIndicatorClass ? (
                  <span className={props.team2ExtraIndicatorClass}></span>
                ) : null}
              </div>
            </div>

            <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
              <div className="items-center box-border caret-transparent gap-x-2 grid grid-flow-col grid-cols-[1fr] grid-rows-[repeat(2,1fr)] justify-items-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5">
                {props.scoreContent}
              </div>
            </div>
          </div>
        </div>

        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="box-border caret-transparent gap-x-1.5 flex flex-col h-full outline-[3px] gap-y-1.5">
            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
              <div className="text-zinc-600 text-xs box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                {props.marketTitle}
              </div>
            </div>

            <div className="items-end box-border caret-transparent gap-x-2 flex h-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
              <div className="box-border caret-transparent gap-x-1.5 flex flex-col h-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 w-full">
                <div className="box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 mt-auto">
                  <button
                    type="button"
                    className={`relative appearance-none text-xs box-content caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full p-0 rounded-l-[10px] rounded-br rounded-tr ${props.option1ButtonClass}`}
                  >
                    <div
                      className={`absolute box-border caret-transparent outline-[3px] right-0 ${props.option1InnerClass}`}
                    >
                      <span className={props.option1IndicatorClass}></span>
                      <img
                        src={
                          props.option1InnerClass ===
                          "text-green-600 flex top-0"
                            ? "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-24.svg"
                            : props.option1InnerClass ===
                                "text-red-500 flex -scale-y-100 bottom-0"
                              ? "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-26.svg"
                              : "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-25.svg"
                        }
                        alt="Icon"
                        className="absolute box-border caret-transparent h-[7px] outline-[3px] w-[7px] right-0 top-0"
                      />
                    </div>
                    <span className="items-center box-border caret-transparent gap-x-0.5 grid grid-cols-[1fr_auto] h-9 outline-[3px] gap-y-0.5 w-full px-2">
                      <span className="items-center box-border caret-transparent gap-x-2 flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap overflow-hidden">
                        {props.option1Label}
                      </span>
                      <span
                        className={`box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] ${props.option1ValueClass}`}
                      >
                        {props.option1Value}
                      </span>
                    </span>
                  </button>

                  {props.showOption2 ? (
                    <button
                      type="button"
                      className={`relative appearance-none text-xs box-content caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full p-0 rounded-bl rounded-tl ${props.option2ButtonClass || ""}`}
                    >
                      <div
                        className={`absolute box-border caret-transparent outline-[3px] right-0 ${props.option2InnerClass || ""}`}
                      >
                        <span
                          className={props.option2IndicatorClass || ""}
                        ></span>
                        <img
                          src={
                            props.option2InnerClass ===
                            "text-green-600 flex top-0"
                              ? "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-24.svg"
                              : props.option2InnerClass ===
                                  "text-red-500 flex -scale-y-100 bottom-0"
                                ? "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-26.svg"
                                : "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-25.svg"
                          }
                          alt="Icon"
                          className="absolute box-border caret-transparent h-[7px] outline-[3px] w-[7px] right-0 top-0"
                        />
                      </div>
                      <span className="items-center box-border caret-transparent gap-x-0.5 grid grid-cols-[1fr_auto] h-9 outline-[3px] gap-y-0.5 w-full px-2">
                        <span className="items-center box-border caret-transparent gap-x-2 flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap overflow-hidden">
                          {props.option2Label}
                        </span>
                        <span
                          className={`box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] ${props.option2ValueClass || ""}`}
                        >
                          {props.option2Value}
                        </span>
                      </span>
                    </button>
                  ) : null}

                  {props.showOption3 ? (
                    <button
                      type="button"
                      className={`relative appearance-none text-xs box-content caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full p-0 rounded-r-[10px] rounded-bl rounded-tl ${props.option3ButtonClass || ""}`}
                    >
                      <div
                        className={`absolute box-border caret-transparent outline-[3px] right-0 ${props.option3InnerClass || ""}`}
                      >
                        <span
                          className={props.option3IndicatorClass || ""}
                        ></span>
                        <img
                          src={
                            props.option3InnerClass ===
                            "text-green-600 flex top-0"
                              ? "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-24.svg"
                              : props.option3InnerClass ===
                                  "text-red-500 flex -scale-y-100 bottom-0"
                                ? "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-26.svg"
                                : "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-25.svg"
                          }
                          alt="Icon"
                          className="absolute box-border caret-transparent h-[7px] outline-[3px] w-[7px] right-0 top-0"
                        />
                      </div>
                      <span className="items-center box-border caret-transparent gap-x-0.5 grid grid-cols-[1fr_auto] h-9 outline-[3px] gap-y-0.5 w-full px-2">
                        <span className="items-center box-border caret-transparent gap-x-2 flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap overflow-hidden">
                          {props.option3Label}
                        </span>
                        <span
                          className={`box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] ${props.option3ValueClass || ""}`}
                        >
                          {props.option3Value}
                        </span>
                      </span>
                    </button>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex h-9 min-h-[auto] min-w-[39px] opacity-50 outline-[3px] px-1 py-0 rounded-[10px]"
              >
                <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                  <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                    {props.moreInnerContent
                      ? props.moreInnerContent
                      : props.moreText}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
