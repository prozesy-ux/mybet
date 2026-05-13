import { useRef, type RefObject } from "react";
import { CategoryTabs } from "@/sections/SportsClone/MainContent/components/CategoryTabs";
import { PromoCarousel } from "@/sections/SportsClone/MainContent/components/PromoCarousel";
import { TagScroller } from "@/sections/SportsClone/MainContent/components/TagScroller";
import { ContentSection } from "@/sections/SportsClone/MainContent/components/ContentSection";
import { EventCard } from "@/sections/SportsClone/MainContent/components/EventCard";
import { ViewAllCard } from "@/sections/SportsClone/MainContent/components/ViewAllCard";

export const MainContent = () => {
  const topLiveRef = useRef<HTMLDivElement | null>(null);
  const topSportsRef = useRef<HTMLDivElement | null>(null);
  const topEsportsRef = useRef<HTMLDivElement | null>(null);

  const scrollSection = (
    sectionRef: RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
  ) => {
    const container = sectionRef.current;
    if (!container) return;

    const step = Math.max(280, Math.round(container.clientWidth * 0.8));
    container.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div className="box-border caret-transparent grow min-h-[940px] min-w-[auto] outline-[3px] md:min-h-[932px]">
      <div className="fixed box-border caret-transparent outline-[3px] pointer-events-none w-full z-[102] left-0 top-auto bottom-0 md:sticky md:top-0 md:bottom-auto">
        <div className="static box-border caret-transparent gap-x-2 flex flex-col-reverse h-full justify-start outline-[3px] gap-y-2 pt-0 pb-[68px] px-2 md:absolute md:flex-col md:h-auto md:pl-6 md:pr-0 md:pt-3 md:pb-0"></div>
      </div>
      <div className="box-border caret-transparent gap-x-6 flex flex-col max-w-[1640px] outline-[3px] gap-y-6 w-full mx-auto pt-3 pb-6 md:gap-x-8 md:gap-y-8 md:pt-6 md:pb-8">
        <div className="box-border caret-transparent contents outline-[3px]">
          <div className="bg-gray-100 box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] border-gray-100 px-0 py-4 border-0 border-solid md:border md:px-12 md:py-6 md:border-transparent">
            <div className="box-border caret-transparent outline-[3px]">
              <div className="box-border caret-transparent outline-[3px]">
                <div className="box-border caret-transparent contents outline-[3px]">
                  <div className="text-neutral-900 bg-gray-100 box-border caret-transparent outline-[3px]">
                    <div className="box-border caret-transparent outline-[3px]"></div>
                    <div className="box-border caret-transparent gap-x-6 grid flex-col grid-cols-[minmax(0px,1fr)] grid-rows-[auto_1fr] min-h-[1000px] outline-[3px]">
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] mb-4">
                        <div className="box-border caret-transparent flex justify-between outline-[3px]">
                          <CategoryTabs />
                          <button
                            type="button"
                            className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
                          >
                            <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                              <span className="text-slate-500 text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
                                <span className="bg-slate-500 box-border caret-transparent block h-full [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/search.svg')] [mask-repeat:no-repeat] outline-[3px] text-nowrap w-full [mask-position:50%]"></span>
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                        <div className="box-border caret-transparent outline-[3px]">
                          <div className="box-border caret-transparent gap-x-6 flex flex-col outline-[3px] gap-y-6">
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <PromoCarousel />
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                              <div className="box-border caret-transparent outline-[3px]">
                                <TagScroller />
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                              <header className="items-center box-border caret-transparent gap-x-4 flex justify-between outline-[3px] gap-y-4">
                                <div className="text-xl font-semibold items-center box-border caret-transparent gap-x-2 flex grow tracking-[-0.33px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
                                  <div className="text-white items-center bg-rose-600 box-border caret-transparent flex h-6 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-6 rounded-lg">
                                    <span className="bg-white box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/live.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"></span>
                                  </div>
                                  Top Live
                                </div>
                                <button
                                  type="button"
                                  className="relative appearance-none text-white items-center bg-blue-600 caret-transparent flex h-8 min-h-[auto] opacity-50 outline-[3px] px-3 py-0 rounded-lg"
                                >
                                  <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                                    <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                      View all
                                    </span>
                                  </span>
                                </button>
                                <div className="box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
                                  <button
                                    type="button"
                                    onClick={() => scrollSection(topLiveRef, "left")}
                                    className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
                                  >
                                    <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                                      <span className="text-slate-500 text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
                                        <img
                                          src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-22.svg"
                                          alt="Icon"
                                          className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
                                        />
                                      </span>
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => scrollSection(topLiveRef, "right")}
                                    className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
                                  >
                                    <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                                      <span className="text-slate-500 text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
                                        <img
                                          src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-23.svg"
                                          alt="Icon"
                                          className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
                                        />
                                      </span>
                                    </span>
                                  </button>
                                </div>
                              </header>
                              <div ref={topLiveRef}>
                              <ContentSection>
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/spain.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/a4e4d3e9154611fa96fa578d426aa48791c20b79.png')]"
                                  league="Spain. LaLiga"
                                  sport="Soccer"
                                  statusPrimary="2nd Half 48'"
                                  showSecondaryStatusIcon
                                  team1Name="Real Betis"
                                  team1LogoUrl="https://bstatic.live/team-icons/10-756.webp"
                                  team2Name="Elche"
                                  team2LogoUrl="https://bstatic.live/team-icons/10-1683.webp"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                    </>
                                  }
                                  marketTitle="Full time result"
                                  option1Label="1"
                                  option1Value="2.3"
                                  option1ButtonClass="bg-green-600/10"
                                  option1InnerClass="text-green-600 flex top-0"
                                  option1IndicatorClass="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-green-600 text-sm font-semibold"
                                  showOption2
                                  option2Label="x"
                                  option2Value="2.6"
                                  option2ButtonClass="bg-gray-400/20 rounded-br rounded-tr"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold"
                                  showOption3
                                  option3Label="2"
                                  option3Value="4.0"
                                  option3ButtonClass="bg-red-500/10"
                                  option3InnerClass="text-red-500 flex -scale-y-100 bottom-0"
                                  option3IndicatorClass="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-red-500 text-sm font-semibold"
                                  moreInnerContent="+99"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/saudi_arabia.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/3983930c02edfe11d7d87560b6ff3046b83ceb2d.png')]"
                                  league="Saudi Arabia. Professional League"
                                  sport="Soccer"
                                  statusPrimary="2nd Half 48`"
                                  showSecondaryStatusIcon
                                  team1Name="Al-Nassr"
                                  team1LogoUrl="https://bstatic.live/team-icons/10-53817255.webp"
                                  team2Name="Al Hilal Riyadh"
                                  team2LogoUrl="https://bstatic.live/team-icons/10-175876.webp"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </>
                                  }
                                  marketTitle="Full time result"
                                  option1Label="1"
                                  option1Value="1.44"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold"
                                  option2Label="x"
                                  option2Value="3.99"
                                  option2ButtonClass="bg-gray-400/20 rounded-br rounded-tr"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold"
                                  showOption2
                                  option3Label="2"
                                  option3Value="7.98"
                                  option3ButtonClass="bg-gray-400/20"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold"
                                  showOption3
                                  moreText="+99"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/england.webp')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/672b9f88ac2c7ebd417e5f97dc1838eb015b55cb.webp')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  league="England. Championship"
                                  sport="Soccer"
                                  statusPrimary="1st Half 12'"
                                  showSecondaryStatusIcon={true}
                                  team1Name="Southampton"
                                  team1LogoUrl="https://bstatic.live/team-icons/10-15.webp"
                                  team2Name="Middlesbrough"
                                  team2LogoUrl="https://bstatic.live/team-icons/10-7.webp"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                    </>
                                  }
                                  marketTitle="Full time result"
                                  option1Label=" 1"
                                  option1Value="5.56"
                                  option1ButtonClass="bg-green-600/10"
                                  option1InnerClass="text-green-600 flex top-0"
                                  option1IndicatorClass="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-green-600 text-sm font-semibold"
                                  option2Label=" x"
                                  option2Value="3.54"
                                  option2ButtonClass="bg-red-500/10"
                                  option2InnerClass="text-red-500 flex -scale-y-100 bottom-0"
                                  option2IndicatorClass="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-red-500 text-sm font-semibold"
                                  showOption2={true}
                                  option3Label=" 2"
                                  option3Value="1.69"
                                  option3ButtonClass="bg-green-600/10"
                                  option3InnerClass="text-green-600 flex top-0"
                                  option3IndicatorClass="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-green-600 text-sm font-semibold"
                                  showOption3={true}
                                  moreText="+99"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/italy.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/69ad9bda730d7ebe602b614e159b56461ff78f6f.png')]"
                                  league="Italy. Serie B"
                                  sport="Soccer"
                                  statusPrimary="1st Half 9`"
                                  showSecondaryStatusIcon={true}
                                  team1Name="Catanzaro"
                                  team1LogoUrl="https://bstatic.live/team-icons/10-92829.webp"
                                  team2Name="Avellino"
                                  team2LogoUrl="https://bstatic.live/team-icons/10-81399.webp"
                                  scoreContent={
                                    <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                                      <div className="items-center box-border caret-transparent gap-x-2 grid grid-flow-col grid-cols-[1fr] grid-rows-[repeat(2,1fr)] justify-items-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5">
                                        <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                          S
                                        </span>
                                        <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                          0
                                        </div>
                                        <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                          0
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  marketTitle="Full time result"
                                  option1Label=" 1"
                                  option1Value="1.99"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5"
                                  showOption2={true}
                                  option2Label=" x"
                                  option2Value="2.98"
                                  option2ButtonClass="bg-gray-400/20 rounded-br rounded-tr"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold leading-5"
                                  showOption3={true}
                                  option3Label=" 2"
                                  option3Value="4.31"
                                  option3ButtonClass="bg-gray-400/20"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold leading-5"
                                  moreText="+99"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/ee6651d44e4fbcfb0eb2b5240662112d1f198b85.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/7291a6a078fbff2c41811fccfa1ad15bf1d89256.png')]"
                                  league="West Indies. West Indies Championship"
                                  sport="Cricket"
                                  statusPrimary="Innings 2"
                                  team1Name="Trinidad and Tobago Red Force"
                                  team1ExtraIndicatorClass="bg-slate-500 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/indicator/cricket.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%] ml-2"
                                  team2Name="Barbados Pride"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        333/10
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        296/10
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        2
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        112/3(37.3)
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0/0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        445
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        296
                                      </div>
                                    </>
                                  }
                                  marketTitle="Winner"
                                  option1Label=" 1"
                                  option1Value="1.47"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5 min-h-[auto] min-w-[auto]"
                                  showOption2={true}
                                  option2Label=" 2"
                                  option2Value="2.53"
                                  option2ButtonClass="bg-gray-400/20 rounded-r-[10px]"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold leading-5 min-h-[auto] min-w-[auto]"
                                  moreText=" +20"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/india.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/25046facf5604989e3784a8f4d9f111a73c9f316.png')]"
                                  league="India. Indoor Series T10"
                                  sport="Cricket"
                                  team1Name="Bestballers"
                                  team1LogoSpanClass="bg-[url('https://1win.com/sf/v1/sports/static/prod/icons/sport-colored/cricket.webp')] bg-no-repeat bg-size-[100%] flex h-full object-cover w-full bg-center"
                                  team2Name="Indoorheroes"
                                  team2LogoUrl="https://bstatic.live/team-icons/1-9625559.webp"
                                  team2ExtraIndicatorClass="bg-slate-500 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/indicator/cricket.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%] ml-2"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        120
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        117/1(8.5)
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        120
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        117
                                      </div>
                                    </>
                                  }
                                  marketTitle=" "
                                  option1ButtonClass="bg-gray-400/20 opacity-50"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-zinc-600 bg-zinc-600 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/lock.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"
                                  option2ButtonClass="bg-gray-400/20 opacity-50 rounded-br rounded-tr"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-zinc-600 bg-zinc-600 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/lock.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"
                                  showOption2
                                  option3ButtonClass="bg-gray-400/20 opacity-50"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-zinc-600 bg-zinc-600 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/lock.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"
                                  showOption3
                                  moreInnerContent={
                                    <span className="text-zinc-600 bg-zinc-600 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/lock.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]" />
                                  }
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/india.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/25046facf5604989e3784a8f4d9f111a73c9f316.png')]"
                                  league="India. Indoor Series T10"
                                  sport="Cricket"
                                  team1Name="Fortner Boys"
                                  team1LogoUrl="https://bstatic.live/team-icons/1-8983961.webp"
                                  team1ExtraIndicatorClass="bg-slate-500 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/indicator/cricket.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%] ml-2"
                                  team2Name="Smashers"
                                  team2LogoUrl="https://bstatic.live/team-icons/1-5409983.webp"
                                  scoreContent={
                                    <div className="items-center box-border caret-transparent gap-x-2 grid grid-flow-col grid-cols-[1fr] grid-rows-[repeat(2,1fr)] justify-items-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5">
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        84/2(5.4)
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        84
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </div>
                                  }
                                  marketTitle="Result"
                                  option1Label="1"
                                  option1Value="1.63"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  option2Label="x"
                                  option2Value="24.14"
                                  showOption2
                                  option2ButtonClass="bg-gray-400/20 rounded-br rounded-tr"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  option3Label="2"
                                  option3Value="2.15"
                                  showOption3
                                  option3ButtonClass="bg-gray-400/20"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  moreText="+23"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/india.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/a19616498d40b8d26186aa8ddd9c5f6a407e43ad.png')]"
                                  league="India. T20 Chandigarh"
                                  sport="Cricket"
                                  showSecondaryStatusIcon={true}
                                  team1Name="Rewari Racers"
                                  team1LogoSpanClass="bg-[url('https://1win.com/sf/v1/sports/static/prod/icons/sport-colored/cricket.webp')] bg-no-repeat bg-size-[100%] flex h-full object-cover w-full bg-center"
                                  team1ExtraIndicatorClass="bg-slate-500 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/indicator/cricket.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%] ml-2"
                                  team2Name="Khimsar Raj Club"
                                  team2LogoUrl="https://bstatic.live/team-icons/1-7453739.webp"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        166/4(16.5)
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        166
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </>
                                  }
                                  marketTitle="Winner"
                                  option1Label=" 1"
                                  option1Value="1.73"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  showOption2={true}
                                  option2Label=" 2"
                                  option2Value="1.95"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  moreText="+22"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/india.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/698028af2ad676f4c3e8e67a1b146273b9359cbb.png')]"
                                  league="India. Chennai Daily Cricket"
                                  sport="Cricket"
                                  team1Name="Fast Runners"
                                  team1LogoSpanClass="bg-[url('https://1win.com/sf/v1/sports/static/prod/icons/sport-colored/cricket.webp')] bg-no-repeat bg-size-[100%] flex h-full object-cover w-full bg-center"
                                  team1ExtraIndicatorClass="bg-slate-500 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/indicator/cricket.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%] ml-2"
                                  team2Name="Military"
                                  team2LogoUrl="https://bstatic.live/team-icons/1-5316677.webp"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        54/1(4.5)
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        54
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </>
                                  }
                                  marketTitle="Result"
                                  option1Label=" 1"
                                  option1Value="1.91"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold"
                                  showOption2
                                  option2Label=" x"
                                  option2Value="24.32"
                                  option2ButtonClass="bg-gray-400/20 rounded-br rounded-tr"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold"
                                  showOption3
                                  option3Label=" 2"
                                  option3Value="1.83"
                                  option3ButtonClass="bg-gray-400/20"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold"
                                  moreText=" +53"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/pakistan.webp')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/f041ed698c033de330a0320d55775cb3d9fd3cce.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  league="Pakistan. Gujrat District Cup T10"
                                  sport="Cricket"
                                  team1Name="Islamabad Fighters"
                                  team1LogoUrl="https://bstatic.live/team-icons/1-9413293.webp"
                                  team1ExtraIndicatorClass="bg-slate-500 box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/indicator/cricket.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%] ml-2"
                                  team2Name="Rajanpur Strikers"
                                  team2LogoUrl="https://bstatic.live/team-icons/1-9413303.webp"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        70/1(5.3)
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        70
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </>
                                  }
                                  marketTitle="Result"
                                  option1Label="1"
                                  option1Value="2.13"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden"
                                  showOption2={true}
                                  option2Label="x"
                                  option2Value="24.53"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden"
                                  showOption3={true}
                                  option3Label="2"
                                  option3Value="1.67"
                                  option3ButtonClass="bg-gray-400/20"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold box-border caretaker-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden"
                                  moreText="+21"
                                />
                                <ViewAllCard
                                  buttonText="View all"
                                  iconSrc="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-27.svg"
                                  iconAlt="Icon"
                                  indicatorClassName="bg-rose-600"
                                  indicatorSpanClassName="[mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/live.svg')]"
                                />
                              </ContentSection>
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                              <header className="items-center box-border caret-transparent gap-x-4 flex justify-between outline-[3px] gap-y-4">
                                <div className="text-xl font-semibold items-center box-border caret-transparent gap-x-2 flex grow tracking-[-0.33px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
                                  <div className="text-white items-center bg-green-600 box-border caret-transparent flex h-6 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-6 rounded-lg">
                                    <span className="bg-white box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/calendar.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"></span>
                                  </div>
                                  Top Sports
                                </div>
                                <button
                                  type="button"
                                  className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex h-8 min-h-[auto] opacity-50 outline-[3px] text-nowrap overflow-hidden px-3 py-0 rounded-[999px]"
                                >
                                  <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center text-nowrap w-full">
                                    <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                      All{" "}
                                    </span>
                                    <span className="text-slate-500 box-border caret-transparent block shrink-0 h-4 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-4">
                                      <img
                                        src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-21.svg"
                                        alt="Icon"
                                        className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
                                      />
                                    </span>
                                  </span>
                                </button>
                                <div className="box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
                                  <button
                                    type="button"
                                    onClick={() => scrollSection(topSportsRef, "left")}
                                    className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
                                  >
                                    <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                                      <span className="text-slate-500 text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
                                        <img
                                          src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-22.svg"
                                          alt="Icon"
                                          className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
                                        />
                                      </span>
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => scrollSection(topSportsRef, "right")}
                                    className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
                                  >
                                    <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                                      <span className="text-slate-500 text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
                                        <img
                                          src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-23.svg"
                                          alt="Icon"
                                          className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
                                        />
                                      </span>
                                    </span>
                                  </button>
                                </div>
                              </header>
                              <div ref={topSportsRef}>
                              <ContentSection>
                                <EventCard
                                  showTopLeftBadge
                                  firstIconClass="bg-[url('https://bstatic.live/icons/4491ed952ad3537af65c11a45fd5abbe5191afc2.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/698028af2ad676f4c3e8e67a1b146273b9359cbb.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  league="National teams. Women. ODI. 2nd ODI"
                                  sport="Cricket"
                                  statusPrimary="17:30"
                                  statusDotText="•"
                                  statusDateText="13/05/2026"
                                  team1Name="England (w)"
                                  team1LogoSpanClass="bg-[url('https://1win.com/sf/v1/sports/static/prod/icons/sport-colored/cricket.webp')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-full object-cover outline-[3px] w-full bg-center"
                                  team2Name="New Zealand (w)"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-132778.webp"
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="1.33"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold"
                                  option3Label="2"
                                  option3Value="3.3"
                                  option3ButtonClass="bg-gray-400/20"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold"
                                  showOption3
                                  moreText="+99"
                                />
                                <EventCard
                                  topBadgeClass="text-white items-center bg-orange-600 box-border caret-transparent flex h-6 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-6 mr-1 rounded-[100%]"
                                  showTopLeftBadge
                                  firstIconClass="bg-[url('https://bstatic.live/icons/566141782121c8920f9641a4e4631966f0f79015.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/5b543866a745fd6e0fcedc4cc97efd9d1095cb86.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  league="IPL. Indian Premier League"
                                  sport="Cricket"
                                  statusPrimary="19:30"
                                  statusDotText="•"
                                  statusDateText="13/05/2026"
                                  team1Name="Royal Challengers Bengaluru"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-132885.webp"
                                  team2Name="Kolkata Knight Riders"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-132886.webp"
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="1.7"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5"
                                  showOption2
                                  option2Label="2"
                                  option2Value="2.15"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold leading-5"
                                  moreText="+99"
                                />
                                <EventCard
                                  showTopLeftBadge
                                  firstIconClass="bg-[url('https://bstatic.live/icons/566141782121c8920f9641a4e4631966f0f79015.png')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/5b543866a745fd6e0fcedc4cc97efd9d1095cb86.png')]"
                                  league="IPL. Indian Premier League"
                                  sport="Cricket"
                                  statusPrimary="19:30"
                                  statusDotText="•"
                                  statusDateText="14/05/2026"
                                  team1Name="Punjab Kings"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-132889.webp"
                                  team2Name="Mumbai Indians"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-132890.webp"
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="1.72"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5"
                                  showOption2
                                  option2Label="2"
                                  option2Value="2.12"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold leading-5"
                                  moreText="+99"
                                />
                                <EventCard
                                  showTopLeftBadge={true}
                                  firstIconClass="bg-[url('https://bstatic.live/icons/566141782121c8920f9641a4e4631966f0f79015.png')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/5b543866a745fd6e0fcedc4cc97efd9d1095cb86.png')]"
                                  league="IPL. Indian Premier League"
                                  sport="Cricket"
                                  statusPrimary="19:30"
                                  statusDotText="•"
                                  statusDateText="15/05/2026"
                                  team1Name="Lucknow Super Giants"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-318989.webp"
                                  team2Name="Chennai Super Kings"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-132884.webp"
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="2.1"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5"
                                  option2Label="2"
                                  option2Value="1.72"
                                  option2ButtonClass="bg-gray-400/20 rounded-r-[10px]"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold leading-5"
                                  showOption2={true}
                                  moreText="+99"
                                />
                                <EventCard
                                  showTopLeftBadge
                                  firstIconClass="bg-[url('https://bstatic.live/icons/566141782121c8920f9641a4e4631966f0f79015.png')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/5b543866a745fd6e0fcedc4cc97efd9d1095cb86.png')]"
                                  league="IPL. Indian Premier League"
                                  sport="Cricket"
                                  statusPrimary="19:30"
                                  statusDotText="•"
                                  statusDateText="16/05/2026"
                                  team1Name="Kolkata Knight Riders"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-132886.webp"
                                  team2Name="Gujarat Titans"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-318981.webp"
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="2.01"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  option2Label="2"
                                  option2Value="1.8"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  showOption2
                                  moreText="+58"
                                />
                                <EventCard
                                  showTopLeftBadge
                                  firstIconClass="bg-[url('https://bstatic.live/icons/566141782121c8920f9641a4e4631966f0f79015.png')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/5b543866a745fd6e0fcedc4cc97efd9d1095cb86.png')]"
                                  league="IPL. Indian Premier League"
                                  sport="Cricket"
                                  statusPrimary="15:30"
                                  statusDotText="•"
                                  statusDateText="17/05/2026"
                                  team1Name="Punjab Kings"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-132889.webp"
                                  team2Name="Royal Challengers Bengaluru"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-132885.webp"
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="2.01"
                                  option1ButtonClass="relative appearance-none text-xs bg-gray-400/20 box-content caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full p-0 rounded-l-[10px] rounded-br rounded-tr"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px]"
                                  option3Label="2"
                                  option3Value="1.8"
                                  option3ButtonClass="relative appearance-none text-xs bg-gray-400/20 box-content caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full p-0 rounded-r-[10px] rounded-bl rounded-tl"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px]"
                                  showOption3
                                  moreText="+58"
                                />
                                <EventCard
                                  showTopLeftBadge={true}
                                  firstIconClass="bg-[url('https://bstatic.live/icons/566141782121c8920f9641a4e4631966f0f79015.png')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/5b543866a745fd6e0fcedc4cc97efd9d1095cb86.png')]"
                                  league="IPL. Indian Premier League"
                                  sport="Cricket"
                                  statusPrimary="19:30"
                                  statusDotText="•"
                                  statusDateText="17/05/2026"
                                  team1Name="Delhi Capitals"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-132891.webp"
                                  team2Name="Rajasthan Royals"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-132888.webp"
                                  marketTitle="Winner"
                                  option1Label=" 1"
                                  option1Value="2.1"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold"
                                  option2Label=" 2"
                                  option2Value="1.72"
                                  option2ButtonClass="bg-gray-400/20 rounded-r-[10px]"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold"
                                  showOption2={true}
                                  moreText="+99"
                                />
                                <EventCard
                                  showTopLeftBadge={true}
                                  firstIconClass="bg-[url('https://bstatic.live/icons/566141782121c8920f9641a4e4631966f0f79015.png')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/5b543866a745fd6e0fcedc4cc97efd9d1095cb86.png')]"
                                  league="IPL. Indian Premier League"
                                  sport="Cricket"
                                  statusPrimary="19:30"
                                  statusDotText="•"
                                  statusDateText="18/05/2026"
                                  team1Name="Chennai Super Kings"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-132884.webp"
                                  team2Name="Sunrisers Hyderabad"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-132887.webp"
                                  marketTitle="Winner"
                                  option1Label=" 1"
                                  option1Value="1.88"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5 text-ellipsis text-nowrap overflow-hidden"
                                  showOption2={true}
                                  option2Label=" 2"
                                  option2Value="1.92"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold leading-5 text-ellipsis text-nowrap overflow-hidden"
                                  moreText=" +58"
                                />
                                <div className="box-border caret-transparent gap-x-px flex flex-col min-h-[auto] min-w-[328px] outline-[3px] gap-y-px overflow-hidden rounded-2xl">
                                  <div className="items-center bg-white box-border caret-transparent flex min-h-12 min-w-[auto] outline-[3px] px-3 py-[5px]">
                                    <div className="box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px] mr-2">
                                      <div className="text-white items-center bg-orange-600 box-border caret-transparent flex h-6 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-6 mr-1 rounded-[100%]">
                                        <span className="bg-white box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/fire.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"></span>
                                      </div>
                                      <div className="bg-white box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                                        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                                          <div className="box-border caret-transparent outline-[3px] rounded-[100%]">
                                            <span className="bg-[url('https://bstatic.live/icons/566141782121c8920f9641a4e4631966f0f79015.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"></span>
                                          </div>
                                        </div>
                                        <div className="relative bg-white box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] -ml-1 pl-0.5 rounded-[100%]">
                                          <div className="box-border caret-transparent outline-[3px] rounded-[100%]">
                                            <span className="bg-[url('https://bstatic.live/icons/5b543866a745fd6e0fcedc4cc97efd9d1095cb86.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden mr-auto">
                                    <div className="text-sm font-semibold box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                      IPL. Indian Premier League
                                    </div>
                                    <div className="text-zinc-600 text-xs font-semibold box-border caret-transparent leading-[15px] min-h-[auto] min-w-[auto] outline-[3px] text-nowrap">
                                      Cricket
                                    </div>
                                  </div>
                                  <div
                                    role="button"
                                    className="bg-white box-border caret-transparent gap-x-[15px] flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-[15px] p-3"
                                  >
                                    <div className="box-border caret-transparent basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px]">
                                      <div className="items-center box-border caret-transparent gap-x-1 flex outline-[3px] gap-y-1">
                                        <div className="text-xs font-semibold items-center box-border caret-transparent gap-x-1 flex h-6 tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 border border-gray-400/20 overflow-hidden px-2 rounded-[999px] border-solid">
                                          <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                                            19:30
                                          </span>
                                          <span className="text-zinc-600 box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                                            •
                                          </span>
                                          <span className="text-zinc-600 box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                                            19/05/2026
                                          </span>
                                        </div>
                                      </div>
                                      <div className="box-border caret-transparent flex h-[42px] outline-[3px] mt-3">
                                        <div className="box-border caret-transparent gap-x-0.5 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 w-full mr-2">
                                          <div className="items-center box-border caret-transparent flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px]">
                                            <div className="box-border caret-transparent h-5 min-h-[auto] min-w-[auto] outline-[3px] w-5 mr-1">
                                              <img
                                                src="https://bstatic.live/team-icons/12-132888.webp"
                                                alt="Team Logo"
                                                className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full"
                                              />
                                            </div>
                                            <div className="text-sm font-semibold items-center box-border caret-transparent grid leading-5 min-h-[auto] outline-[3px]">
                                              <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                                Rajasthan Royals
                                              </span>
                                            </div>
                                          </div>
                                          <div className="items-center box-border caret-transparent flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px]">
                                            <div className="box-border caret-transparent h-5 min-h-[auto] min-w-[auto] outline-[3px] w-5 mr-1">
                                              <img
                                                src="https://bstatic.live/team-icons/12-318989.webp"
                                                alt="Team Logo"
                                                className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full"
                                              />
                                            </div>
                                            <div className="text-sm font-semibold items-center box-border caret-transparent grid leading-5 min-h-[auto] outline-[3px]">
                                              <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                                Lucknow Super Giants
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                                          <div className="items-center box-border caret-transparent gap-x-2 grid grid-flow-col grid-cols-[1fr] grid-rows-[repeat(2,1fr)] justify-items-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5"></div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                                      <div className="box-border caret-transparent gap-x-1.5 flex flex-col h-full outline-[3px] gap-y-1.5">
                                        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                                          <div className="text-zinc-600 text-xs box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                            Winner
                                          </div>
                                        </div>
                                        <div className="items-end box-border caret-transparent gap-x-2 flex h-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
                                          <div className="box-border caret-transparent gap-x-1.5 flex flex-col h-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 w-full">
                                            <div className="box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 mt-auto">
                                              <button
                                                type="button"
                                                className="relative appearance-none text-xs bg-gray-400/20 box-content caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full p-0 rounded-l-[10px] rounded-br rounded-tr"
                                              >
                                                <div className="absolute box-border caret-transparent hidden outline-[3px] right-0">
                                                  <span className="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"></span>
                                                  <img
                                                    src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-25.svg"
                                                    alt="Icon"
                                                    className="absolute box-border caret-transparent h-[7px] outline-[3px] w-[7px] right-0 top-0"
                                                  />
                                                </div>
                                                <span className="items-center box-border caret-transparent gap-x-0.5 grid grid-cols-[1fr_auto] h-9 outline-[3px] gap-y-0.5 w-full px-2">
                                                  <span className="items-center box-border caret-transparent gap-x-2 flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap overflow-hidden">
                                                    1
                                                  </span>
                                                  <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                                                    1.7
                                                  </span>
                                                </span>
                                              </button>
                                              <button
                                                type="button"
                                                className="relative appearance-none text-xs bg-gray-400/20 box-content caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full p-0 rounded-r-[10px] rounded-bl rounded-tl"
                                              >
                                                <div className="absolute box-border caret-transparent hidden outline-[3px] right-0">
                                                  <span className="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"></span>
                                                  <img
                                                    src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-25.svg"
                                                    alt="Icon"
                                                    className="absolute box-border caret-transparent h-[7px] outline-[3px] w-[7px] right-0 top-0"
                                                  />
                                                </div>
                                                <span className="items-center box-border caret-transparent gap-x-0.5 grid grid-cols-[1fr_auto] h-9 outline-[3px] gap-y-0.5 w-full px-2">
                                                  <span className="items-center box-border caret-transparent gap-x-2 flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap overflow-hidden">
                                                    2
                                                  </span>
                                                  <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                                                    2.15
                                                  </span>
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                          <button
                                            type="button"
                                            className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex h-9 min-h-[auto] min-w-[39px] opacity-50 outline-[3px] px-1 py-0 rounded-[10px]"
                                          >
                                            <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                                              <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                                +58
                                              </span>
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="box-border caret-transparent gap-x-px flex flex-col min-h-[auto] min-w-[328px] outline-[3px] gap-y-px overflow-hidden rounded-2xl">
                                  <div className="items-center bg-white box-border caret-transparent flex min-h-12 min-w-[auto] outline-[3px] px-3 py-[5px]">
                                    <div className="box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px] mr-2">
                                      <div className="text-white items-center bg-orange-600 box-border caret-transparent flex h-6 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-6 mr-1 rounded-[100%]">
                                        <span className="bg-white box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/fire.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"></span>
                                      </div>
                                      <div className="bg-white box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                                        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                                          <div className="box-border caret-transparent outline-[3px] rounded-[100%]">
                                            <span className="bg-[url('https://bstatic.live/icons/566141782121c8920f9641a4e4631966f0f79015.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"></span>
                                          </div>
                                        </div>
                                        <div className="relative bg-white box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] -ml-1 pl-0.5 rounded-[100%]">
                                          <div className="box-border caret-transparent outline-[3px] rounded-[100%]">
                                            <span className="bg-[url('https://bstatic.live/icons/5b543866a745fd6e0fcedc4cc97efd9d1095cb86.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden mr-auto">
                                    <div className="text-sm font-semibold box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                      IPL. Indian Premier League
                                    </div>
                                    <div className="text-zinc-600 text-xs font-semibold box-border caret-transparent leading-[15px] min-h-[auto] min-w-[auto] outline-[3px] text-nowrap">
                                      Cricket
                                    </div>
                                  </div>
                                  <div
                                    role="button"
                                    className="bg-white box-border caret-transparent gap-x-[15px] flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-[15px] p-3"
                                  >
                                    <div className="box-border caret-transparent basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px]">
                                      <div className="items-center box-border caret-transparent gap-x-1 flex outline-[3px] gap-y-1">
                                        <div className="text-xs font-semibold items-center box-border caret-transparent gap-x-1 flex h-6 tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 border border-gray-400/20 overflow-hidden px-2 rounded-[999px] border-solid">
                                          <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                                            19:30
                                          </span>
                                          <span className="text-zinc-600 box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                                            •
                                          </span>
                                          <span className="text-zinc-600 box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                                            20/05/2026
                                          </span>
                                        </div>
                                      </div>
                                      <div className="box-border caret-transparent flex h-[42px] outline-[3px] mt-3">
                                        <div className="box-border caret-transparent gap-x-0.5 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 w-full mr-2">
                                          <div className="items-center box-border caret-transparent flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px]">
                                            <div className="box-border caret-transparent h-5 min-h-[auto] min-w-[auto] outline-[3px] w-5 mr-1">
                                              <img
                                                src="https://bstatic.live/team-icons/12-132886.webp"
                                                alt="Team Logo"
                                                className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full"
                                              />
                                            </div>
                                            <div className="text-sm font-semibold items-center box-border caret-transparent grid leading-5 min-h-[auto] outline-[3px]">
                                              <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                                Kolkata Knight Riders
                                              </span>
                                            </div>
                                          </div>
                                          <div className="items-center box-border caret-transparent flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px]">
                                            <div className="box-border caret-transparent h-5 min-h-[auto] min-w-[auto] outline-[3px] w-5 mr-1">
                                              <img
                                                src="https://bstatic.live/team-icons/12-132890.webp"
                                                alt="Team Logo"
                                                className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full"
                                              />
                                            </div>
                                            <div className="text-sm font-semibold items-center box-border caret-transparent grid leading-5 min-h-[auto] outline-[3px]">
                                              <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                                Mumbai Indians
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                                          <div className="items-center box-border caret-transparent gap-x-2 grid grid-flow-col grid-cols-[1fr] grid-rows-[repeat(2,1fr)] justify-items-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5"></div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                                      <div className="box-border caret-transparent gap-x-1.5 flex flex-col h-full outline-[3px] gap-y-1.5">
                                        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                                          <div className="text-zinc-600 text-xs box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                            Winner
                                          </div>
                                        </div>
                                        <div className="items-end box-border caret-transparent gap-x-2 flex h-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
                                          <div className="box-border caret-transparent gap-x-1.5 flex flex-col h-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 w-full">
                                            <div className="box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 mt-auto">
                                              <button
                                                type="button"
                                                className="relative appearance-none text-xs bg-gray-400/20 box-content caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full p-0 rounded-l-[10px] rounded-br rounded-tr"
                                              >
                                                <div className="absolute box-border caret-transparent hidden outline-[3px] right-0">
                                                  <span className="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"></span>
                                                  <img
                                                    src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-25.svg"
                                                    alt="Icon"
                                                    className="absolute box-border caret-transparent h-[7px] outline-[3px] w-[7px] right-0 top-0"
                                                  />
                                                </div>
                                                <span className="items-center box-border caret-transparent gap-x-0.5 grid grid-cols-[1fr_auto] h-9 outline-[3px] gap-y-0.5 w-full px-2">
                                                  <span className="items-center box-border caret-transparent gap-x-2 flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap overflow-hidden">
                                                    1
                                                  </span>
                                                  <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                                                    2.45
                                                  </span>
                                                </span>
                                              </button>
                                              <button
                                                type="button"
                                                className="relative appearance-none text-xs bg-gray-400/20 box-content caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full p-0 rounded-r-[10px] rounded-bl rounded-tl"
                                              >
                                                <div className="absolute box-border caret-transparent hidden outline-[3px] right-0">
                                                  <span className="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"></span>
                                                  <img
                                                    src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-25.svg"
                                                    alt="Icon"
                                                    className="absolute box-border caret-transparent h-[7px] outline-[3px] w-[7px] right-0 top-0"
                                                  />
                                                </div>
                                                <span className="items-center box-border caret-transparent gap-x-0.5 grid grid-cols-[1fr_auto] h-9 outline-[3px] gap-y-0.5 w-full px-2">
                                                  <span className="items-center box-border caret-transparent gap-x-2 flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap overflow-hidden">
                                                    2
                                                  </span>
                                                  <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                                                    1.55
                                                  </span>
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                          <button
                                            type="button"
                                            className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex h-9 min-h-[auto] min-w-[39px] opacity-50 outline-[3px] px-1 py-0 rounded-[10px]"
                                          >
                                            <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                                              <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                                +58
                                              </span>
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <ViewAllCard
                                  buttonText="View all"
                                  iconSrc="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-27.svg"
                                  iconAlt="Icon"
                                  indicatorClassName="bg-green-600"
                                  indicatorSpanClassName="bg-white box-border caret-transparent block h-12 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/calendar.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-12 [mask-position:50%]"
                                />
                              </ContentSection>
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                              <header className="items-center box-border caret-transparent gap-x-4 flex justify-between outline-[3px] gap-y-4">
                                <div className="text-xl font-semibold items-center box-border caret-transparent gap-x-2 flex grow tracking-[-0.33px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
                                  <div className="text-white items-center bg-fuchsia-500 box-border caret-transparent flex h-6 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-6 rounded-lg">
                                    <span className="bg-white box-border caret-transparent block h-4 [mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/esport.svg')] [mask-repeat:no-repeat] min-h-[auto] min-w-[auto] outline-[3px] w-4 [mask-position:50%]"></span>
                                  </div>
                                  Top Esports
                                </div>
                                <button
                                  type="button"
                                  className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex h-8 min-h-[auto] opacity-50 outline-[3px] text-nowrap overflow-hidden px-3 py-0 rounded-[999px]"
                                >
                                  <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center text-nowrap w-full">
                                    <span className="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                      All{" "}
                                    </span>
                                    <span className="text-slate-500 box-border caret-transparent block shrink-0 h-4 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-4">
                                      <img
                                        src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-21.svg"
                                        alt="Icon"
                                        className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
                                      />
                                    </span>
                                  </span>
                                </button>
                                <div className="box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
                                  <button
                                    type="button"
                                    onClick={() => scrollSection(topEsportsRef, "left")}
                                    className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
                                  >
                                    <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                                      <span className="text-slate-500 text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
                                        <img
                                          src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-22.svg"
                                          alt="Icon"
                                          className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
                                        />
                                      </span>
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => scrollSection(topEsportsRef, "right")}
                                    className="relative appearance-none items-center bg-gray-400/20 caret-transparent flex shrink-0 h-8 min-h-[auto] opacity-50 outline-[3px] w-8 p-0 rounded-lg"
                                  >
                                    <span className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center w-full">
                                      <span className="text-slate-500 text-sm font-semibold box-border caret-transparent block shrink-0 h-4 leading-5 min-h-[auto] outline-[3px] text-ellipsis text-nowrap w-4 overflow-hidden">
                                        <img
                                          src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-23.svg"
                                          alt="Icon"
                                          className="box-border caret-transparent h-full outline-[3px] text-nowrap w-full"
                                        />
                                      </span>
                                    </span>
                                  </button>
                                </div>
                              </header>
                              <div ref={topEsportsRef}>
                              <ContentSection>
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/cs2.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/e91e5a9cab43a8afc28e03aac63414a0ed976ce2.png')]"
                                  league="IEM Atlanta"
                                  sport="CS2"
                                  statusPrimary="Map 2"
                                  showSecondaryStatusIcon
                                  team1Name="BB"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-1327864.webp"
                                  team2Name="Vitality"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-65477.webp"
                                  scoreContent={
                                    <div className="items-center box-border caret-transparent gap-x-2 grid grid-flow-col grid-cols-[1fr] grid-rows-[repeat(2,1fr)] justify-items-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5">
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max outline-[3px]">
                                        3
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </div>
                                  }
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="4.13"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold"
                                  showOption2
                                  option2Label="2"
                                  option2Value="1.23"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold"
                                  moreText="+99"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/cs2.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/e91e5a9cab43a8afc28e03aac63414a0ed976ce2.png')]"
                                  league="IEM Atlanta"
                                  sport="CS2"
                                  statusPrimary="Map 2"
                                  showSecondaryStatusIcon
                                  team1Name="paiN"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-49639.webp"
                                  team2Name="FUT"
                                  team2LogoSpanClass="bg-[url('https://1win.com/sf/v1/sports/static/prod/icons/sport-colored/counter_strike2.webp')] bg-no-repeat bg-size-[100%] flex h-full object-cover w-full bg-center"
                                  scoreContent={
                                    <div className="items-center box-border caret-transparent gap-x-2 grid grid-flow-col grid-cols-[1fr] grid-rows-[repeat(2,1fr)] justify-items-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5">
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </div>
                                  }
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="1.97"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold"
                                  showOption3
                                  option3Label="2"
                                  option3Value="1.81"
                                  option3ButtonClass="bg-gray-400/20"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold"
                                  moreText="+99"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/ea5c66fd70c156bb947ce86c4af9118f17493a37.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/615969f67e06fcf879a82015c4f0dcb92ff8f7a3.png')]"
                                  league="NODWIN Clutch Series"
                                  sport="CS2"
                                  statusPrimary="3 map"
                                  showSecondaryStatusIcon
                                  team1Name="mouz NXT"
                                  team1LogoUrl="https://bstatic.live/team-icons/1-5354869.webp"
                                  team1ExtraIndicatorClass="bg-green-600 box-border caret-transparent flex shrink-0 h-2 min-h-[auto] min-w-[auto] outline-[3px] w-2 ml-2 rounded-[100%]"
                                  team2Name="Lavked"
                                  team2LogoSpanClass="bg-[url('https://1win.com/sf/v1/sports/static/prod/icons/sport-colored/counter_strike2.webp')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-full object-cover outline-[3px] w-full bg-center"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                    </>
                                  }
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="2.22"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5"
                                  showOption3
                                  option3Label="2"
                                  option3Value="1.59"
                                  option3ButtonClass="bg-gray-400/20"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold leading-5"
                                  moreText="+26"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/1caf565c8003d38467e66ac8892560ffe5f346f1.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/1fe59d00f6a9b609b7b97c26d96ca8637138dc88.png')]"
                                  league="Mad Dogs League"
                                  sport="Dota 2"
                                  statusPrimary="1 map"
                                  showSecondaryStatusIcon
                                  team1Name="Freedom Fighters"
                                  team2Name="Prime Legion"
                                  scoreContent={
                                    <div className="items-center box-border caret-transparent gap-x-2 grid grid-flow-col grid-cols-[1fr] grid-rows-[repeat(2,1fr)] justify-items-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5">
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </div>
                                  }
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="1.83"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold"
                                  showOption2
                                  option2Label="2"
                                  option2Value="1.83"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold"
                                  moreText="+24"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/ea5c66fd70c156bb947ce86c4af9118f17493a37.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/0c759bb3185330b0b77495f8f3d2c46eb18fc054.png')]"
                                  league="CCT Europe Series"
                                  sport="CS2"
                                  statusPrimary="Map 2"
                                  showSecondaryStatusIcon={true}
                                  team1Name="HOTU"
                                  team2Name="INOX Division"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        15
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        15
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                    </>
                                  }
                                  marketTitle="Map 3. Winner"
                                  option1Label="1"
                                  option1Value="1.67"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5 text-ellipsis text-nowrap overflow-hidden"
                                  option2Label="2"
                                  option2Value="2.02"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold leading-5 text-ellipsis text-nowrap overflow-hidden"
                                  showOption2={true}
                                  moreText="+2"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/ea5c66fd70c156bb947ce86c4af9118f17493a37.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/685816dd695f5c252785d2d60148acfe60ec082f.png')]"
                                  league="CCT South America"
                                  sport="CS2"
                                  statusPrimary="Map 1"
                                  showSecondaryStatusIcon
                                  team1Name="BESTIA Academy"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-1510626.webp"
                                  team2Name="HereWeGoAgain"
                                  team2LogoSpanClass="bg-[url('https://1win.com/sf/v1/sports/static/prod/icons/sport-colored/counter_strike2.webp')] bg-no-repeat bg-size-[100%] flex h-full object-cover w-full bg-center"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max outline-[3px]">
                                        4
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </>
                                  }
                                  marketTitle="Winner"
                                  option1Label="1"
                                  option1Value="1.11"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold"
                                  showOption2
                                  option2Label="2"
                                  option2Value="5.22"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold"
                                  moreText="+8"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/cs2.webp')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/e91e5a9cab43a8afc28e03aac63414a0ed976ce2.png')] bg-no-repeat bg-size-[100%] box-border caret-transparent flex h-6 object-cover outline-[3px] w-6 bg-center rounded-[100%]"
                                  league="IEM Atlanta. Players Duel. Kills"
                                  sport="CS2"
                                  statusPrimary="Map 2"
                                  showSecondaryStatusIcon
                                  team1Name="Magnojez"
                                  team2Name="ZywOo"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max outline-[3px]">
                                        2
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caretaker-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caretaker-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </>
                                  }
                                  marketTitle="Map 3. Total "
                                  option1Label="31.5 Under"
                                  option1Value="1.78"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5"
                                  option2Label="31.5 Over"
                                  option2Value="1.88"
                                  option2ButtonClass="bg-gray-400/20"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold leading-5"
                                  showOption2
                                  moreText="+8"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/cs2.webp')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/e91e5a9cab43a8afc28e03aac63414a0ed976ce2.png')]"
                                  league="IEM Atlanta. Players Duel. Kills"
                                  sport="CS2"
                                  statusPrimary="Break"
                                  showSecondaryStatusIcon
                                  team1Name="vsm"
                                  team1LogoSpanClass="bg-[url('https://1win.com/sf/v1/sports/static/prod/icons/sport-colored/counter_strike2.webp')] bg-no-repeat bg-size-[100%] flex h-full object-cover w-full bg-center"
                                  team2Name="lauNX"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-1337134.webp"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        10
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max outline-[3px]">
                                        13
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </>
                                  }
                                  marketTitle="Map 3. Total "
                                  option1Label="29.5 Under"
                                  option1Value="1.83"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  showOption2
                                  option2Label="29.5 Over"
                                  option2Value="1.83"
                                  option2ButtonClass="bg-gray-400/20 rounded-r-[10px]"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  moreText="+8"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/49c8bb9fede9e5abffa198d892fd4d6ef590ee2a.png')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/16c276cc9f77d4f5d5dc45ec08ded21f6de25998.png')]"
                                  league="BLAST Major Salt Lake City"
                                  sport="Rainbow Six"
                                  statusPrimary="Map 2"
                                  showSecondaryStatusIcon
                                  team1Name="G2"
                                  team1LogoUrl="https://bstatic.live/team-icons/12-63678.webp"
                                  team2Name="Virtus.pro"
                                  team2LogoUrl="https://bstatic.live/team-icons/12-61459.webp"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max outline-[3px]">
                                        4
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        2
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                    </>
                                  }
                                  marketTitle="Winner"
                                  option1Label=" 1"
                                  option1Value="1.78"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  showOption2
                                  option2ButtonClass="bg-gray-400/20 rounded-r-[10px]"
                                  option2InnerClass="hidden"
                                  option2IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option2Label=" 2"
                                  option2Value="1.88"
                                  option2ValueClass="text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]"
                                  moreText="+14"
                                />
                                <EventCard
                                  firstIconClass="bg-[url('https://bstatic.live/icons/49c8bb9fede9e5abffa198d892fd4d6ef590ee2a.png')]"
                                  secondIconClass="bg-[url('https://bstatic.live/icons/16c276cc9f77d4f5d5dc45ec08ded21f6de25998.png')]"
                                  league="BLAST Major Salt Lake City"
                                  sport="Rainbow Six"
                                  statusPrimary="Map 2"
                                  showSecondaryStatusIcon
                                  team1Name="Weibo"
                                  team2Name="LOS"
                                  scoreContent={
                                    <>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max opacity-50 outline-[3px]">
                                        0
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-max outline-[3px]">
                                        1
                                      </span>
                                      <span className="text-xs font-semibold box-border caret-transparent hidden tracking-[0.01px] leading-4 min-w-max outline-[3px]">
                                        S
                                      </span>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        1
                                      </div>
                                      <div className="relative text-xs font-semibold items-center bg-gray-400/20 box-border caret-transparent flex justify-center tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-1 py-px rounded-md">
                                        0
                                      </div>
                                    </>
                                  }
                                  marketTitle="Map 3. Winner"
                                  option1Label=" 1"
                                  option1Value="1.68"
                                  option1ButtonClass="bg-gray-400/20"
                                  option1InnerClass="hidden"
                                  option1IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option1ValueClass="text-sm font-semibold leading-5"
                                  option3Label=" 2"
                                  option3Value="2.01"
                                  option3ButtonClass="bg-gray-400/20"
                                  option3InnerClass="hidden"
                                  option3IndicatorClass="box-border caret-transparent outline-[3px] border-l-transparent border-r-white border-t-white border-b-transparent border-[5px] border-solid"
                                  option3ValueClass="text-sm font-semibold leading-5"
                                  showOption3
                                  moreText="+8"
                                />
                                <ViewAllCard
                                  buttonText="View all"
                                  iconSrc="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-27.svg"
                                  iconAlt="Icon"
                                  indicatorClassName="bg-fuchsia-500"
                                  indicatorSpanClassName="[mask-image:url('https://1win.com/resources/v1/app/static/betting/ui/esport.svg')] [mask-repeat:no-repeat] [mask-position:50%]"
                                />
                              </ContentSection>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fixed box-border caret-transparent outline-[3px] z-[141] bottom-0 inset-x-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] px-4 md:px-12">
          <div className="box-border caret-transparent outline-[3px]">
            <div className="box-border caret-transparent outline-[3px]">
              <div className="relative text-gray-400 text-xs items-start box-border caret-transparent gap-x-3 flex flex-col h-20 tracking-[0.01px] leading-4 [mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0px,rgb(0,0,0)_48px)] max-w-full outline-[3px] gap-y-3 w-full overflow-hidden md:gap-x-4 md:h-[88px] md:gap-y-4 md:w-9/12">
                <div className="items-start box-border caret-transparent gap-x-3 flex flex-col max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-3">
                  <h1 className="text-gray-100 text-2xl font-semibold box-border caret-transparent tracking-[-0.47px] leading-7 min-h-[auto] min-w-[auto] outline-[3px] mb-0 md:text-4xl md:tracking-[-0.79px] md:leading-10 md:mb-1">
                    Sports Betting at 1win — Bet Online with the Best Odds on
                    All Major Sports
                  </h1>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    Why Bet on Sports with 1win?
                  </h2>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    At 1win, we’ve built a modern sportsbook designed for every
                    kind of bettor — from first-timers to seasoned pros. Here’s
                    what makes us stand out in the world of online sports
                    betting:
                  </p>
                  <ul className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pl-4">
                    <li className="box-border caret-transparent outline-[3px]">
                      Over 2,000 betting markets daily — from pre-match to live
                      bets.
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      Bet on 40+ sports including{" "}
                      <a
                        href="https://1win.com/betting/prematch/soccer-18"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        football
                      </a>
                      ,{" "}
                      <a
                        href="https://1win.com/betting/prematch/tennis-33"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        tennis
                      </a>
                      ,{" "}
                      <a
                        href="https://1win.com/betting/prematch/basketball-23"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        basketball
                      </a>
                      , and{" "}
                      <a
                        href="https://1win.com/betting/esport/cs2-142"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        eSports
                      </a>
                      .
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <strong className="font-bold box-border caret-transparent outline-[3px]">
                        1win Sportsbook
                      </strong>
                      offers some of the highest odds on the market.
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      Fast payouts via bank cards, crypto wallets, and local
                      payment systems.
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      Trusted by over 30 million users around the world.
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      Licensed, secure, and optimized for both desktop and
                      mobile betting.
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      Enjoy generous{" "}
                      <a
                        href="https://1win.com/bonus"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        sports betting bonuses and free bets
                      </a>
                      every week.
                    </li>
                  </ul>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    Bet on Popular Sports &amp; Major Sporting Events
                  </h2>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    At 1win, you can bet on a wide range of sporting disciplines
                    — from elite global competitions to local and regional
                    leagues. Here’s a closer look at what we offer:
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Football
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    <a
                      href="https://1win.com/betting/prematch/soccer-18"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Bet on football
                    </a>
                    leagues like the English Premier League, La Liga, Serie A,
                    Bundesliga, Ligue 1, and regional leagues such as the Indian
                    Super League, Brazilian Série A, Argentine Primera División,
                    Russian Premier League, and Liga MX. Wager on international
                    tournaments including the FIFA World Cup, UEFA European
                    Championship, Copa América, AFC Asian Cup, CAF Africa Cup of
                    Nations, CONCACAF Gold Cup, and the UEFA Champions League.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Cricket
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    <a
                      href="https://1win.com/betting/prematch/cricket-25"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Bet on cricket
                    </a>
                    formats including Test Matches, One Day Internationals, and
                    T20 leagues. Place wagers on tournaments like the Indian
                    Premier League (IPL), Big Bash League, Caribbean Premier
                    League, and international series featuring teams like India,
                    England, Australia, and Pakistan.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Tennis
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    <a
                      href="https://1win.com/betting/prematch/tennis-33"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Bet on tennis
                    </a>
                    including Grand Slam tournaments — the Australian Open,
                    Roland Garros, Wimbledon, and US Open — along with ATP and
                    WTA circuits all year round.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Basketball
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    <a
                      href="https://1win.com/betting/prematch/basketball-23"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Bet on basketball
                    </a>
                    from NBA, EuroLeague, Liga ACB (Spain), Basketball
                    Bundesliga (Germany), and international championships like
                    FIBA World Cup and the Olympics.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Ice Hockey
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    <a
                      href="https://1win.com/betting/prematch/ice-hockey-35"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Ice hockey betting
                    </a>
                    covers NHL, KHL, and international events including the IIHF
                    World Championship and World Cup of Hockey.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Boxing &amp; MMA
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Bet on major boxing bouts via{" "}
                    <a
                      href="https://1win.com/betting/prematch/boxing-43"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Boxing
                    </a>
                    and{" "}
                    <a
                      href="https://1win.com/betting/prematch/ufc-137"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      UFC
                    </a>
                    events. Wager on global fights across organizations like
                    Matchroom, Top Rank, Bellator, and more.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Table Tennis
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    <a
                      href="https://1win.com/betting/prematch/table-tennis-24"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Table tennis betting
                    </a>
                    includes the WTT Series, World Championships, and top
                    European &amp; Asian leagues.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Kabaddi
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    <a
                      href="https://1win.com/betting/prematch/kabaddi-64"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Bet on kabaddi
                    </a>
                    , one of South Asia’s fastest-growing sports. We cover the
                    Pro Kabaddi League (PKL) and other domestic &amp;
                    international competitions featuring top teams like Patna
                    Pirates and Jaipur Pink Panthers.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Other Sports
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Wager on{" "}
                    <a
                      href="https://1win.com/betting/prematch/volleyball-27"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Volleyball
                    </a>
                    , Baseball, Handball, Badminton, Cycling, Snooker, Field
                    Hockey, Athletics, and Motorsports including Formula 1,
                    MotoGP, and WRC.
                  </p>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    eSports Betting at 1win
                  </h2>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    The world of competitive gaming is bigger than ever, and
                    1win gives you full access to top-tier eSports betting.
                    Wager on global tournaments and daily matchups across the
                    most popular games — all with competitive odds, live
                    markets, and fast payouts.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Top eSports Games to Bet On
                  </h3>
                  <ul className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pl-4">
                    <li className="box-border caret-transparent outline-[3px]">
                      <a
                        href="https://1win.com/betting/esport/cs2-142"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        Counter-Strike 2 (CS2)
                      </a>
                      — ESL Pro League, BLAST Premier, and regional cups
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <a
                        href="https://1win.com/betting/esport/dota-2-47"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        Dota 2
                      </a>
                      — The International, DPC, and major leagues
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <a
                        href="https://1win.com/betting/esport/lol-37"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        League of Legends (LoL)
                      </a>
                      — LEC, LCS, LCK, MSI, and Worlds
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <a
                        href="https://1win.com/betting/esport/valorant-99"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        Valorant
                      </a>
                      — VCT Challengers, VCT Masters, and Valorant Champions
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <a
                        href="https://1win.com/betting/esport/overwatch-2-59"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        Overwatch 2
                      </a>
                      — Overwatch League and Contenders
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      Free Fire, Rocket League, Rainbow Six, Call of Duty,
                      StarCraft II, and more
                    </li>
                  </ul>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Follow your favorite teams, watch matches live, and place
                    in-play bets across hundreds of eSports events happening
                    every week. Whether you&#39;re a fan of shooters, MOBAs, or
                    strategy games, 1win has everything you need to elevate your
                    eSports betting experience.
                  </p>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    Watch Matches Live and Bet in Real Time
                  </h2>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Enjoy the thrill of real-time betting with{" "}
                    <strong className="font-bold box-border caret-transparent outline-[3px]">
                      live streaming
                    </strong>
                    on 1win. We offer high-quality broadcasts for thousands of
                    sporting events — including football, tennis, basketball,
                    and eSports. Watch the match directly on our platform and
                    place your bets as the action unfolds, all from one screen.
                  </p>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    1win’s Live Betting interface includes:
                  </p>
                  <ul className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pl-4">
                    <li className="box-border caret-transparent outline-[3px]">
                      <strong className="font-bold box-border caret-transparent outline-[3px]">
                        Live match streaming
                      </strong>
                      for select games and tournaments
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      Real-time stats: possession, shots, corners, cards, and
                      more
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      Dynamic pitch visualizations for football and tennis
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      Instant odds updates based on in-game events
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <strong className="font-bold box-border caret-transparent outline-[3px]">
                        Cash Out
                      </strong>
                      feature to secure your profits at the right moment
                    </li>
                  </ul>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    No need to switch between tabs or apps — just watch, react,
                    and bet, all in one place. Whether it&#39;s the Champions
                    League, IPL, NBA, or eSports finals, 1win keeps you
                    connected to the game.
                  </p>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    Popular Types of Bets at 1win
                  </h2>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Whether you&#39;re new to sports betting or a seasoned pro,
                    1win offers a wide variety of bet types to suit every
                    strategy. From single bets to advanced Asian markets, you’ll
                    find all the tools you need to build your perfect slip.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Pre-Match Bets
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Place your bets before the action starts. Choose from
                    full-time result, over/under, total goals, handicaps, and
                    more.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Live (In-Play) Bets
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Wager on games as they happen. Odds change in real time,
                    giving you the chance to take advantage of match momentum.
                    Includes features like Cash Out and dynamic stats.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Single Bets
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    The most straightforward type of wager — pick an outcome,
                    place your stake, and wait for the result.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Multiple (Accumulator) Bets
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Combine several selections into a single bet to increase
                    your potential winnings. At 1win, this is called a{" "}
                    <strong className="font-bold box-border caret-transparent outline-[3px]">
                      Multiple
                    </strong>
                    . All selections must win for the bet to succeed.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Asian Handicap &amp; Over/Under
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Popular with experienced bettors, Asian Handicap removes the
                    draw and balances match odds. Over/Under markets are ideal
                    for totals-based betting.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    System Bets
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Minimize risk while maintaining winning potential. With
                    system bets like 2/3 or 3/4, not all selections must win for
                    a payout.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Special Markets
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Explore player-based and team prop bets — first goalscorer,
                    corner count, bookings, and more.
                  </p>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    How to Start Betting on 1win
                  </h2>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Getting started with 1win is fast and simple. Follow these
                    steps:
                  </p>
                  <ol className="box-border caret-transparent list-decimal min-h-[auto] min-w-[auto] outline-[3px] pl-4">
                    <li className="box-border caret-transparent outline-[3px]">
                      <strong className="font-bold box-border caret-transparent outline-[3px]">
                        Register
                      </strong>
                      on the{" "}
                      <a
                        href="https://1win.com/"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        1win website
                      </a>
                      or download the{" "}
                      <a
                        href="https://1win.com/mobile"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        official mobile app
                      </a>
                      .
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <strong className="font-bold box-border caret-transparent outline-[3px]">
                        Deposit funds
                      </strong>
                      using bank cards, local wallets, or{" "}
                      <a
                        href="https://1win.com/crypto"
                        className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                      >
                        cryptocurrency
                      </a>
                      .
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <strong className="font-bold box-border caret-transparent outline-[3px]">
                        Navigate to Sports
                      </strong>
                      from the top menu or homepage.
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <strong className="font-bold box-border caret-transparent outline-[3px]">
                        Select your event
                      </strong>
                      and browse available betting markets.
                    </li>
                    <li className="box-border caret-transparent outline-[3px]">
                      <strong className="font-bold box-border caret-transparent outline-[3px]">
                        Click the odds
                      </strong>
                      to add them to your betslip. Set your stake and confirm
                      the bet.
                    </li>
                  </ol>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    That’s it — you&#39;re now ready to experience online sports
                    betting with one of the most trusted brands in the industry.
                  </p>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    Crypto Sports Betting at 1win
                  </h2>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    We are a crypto sportsbook. This means that we support
                    deposits, withdrawals, and bets made using cryptocurrency on
                    our platform. You can bet on{" "}
                    <a
                      href="https://1win.com/betting/prematch/soccer-18"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      soccer
                    </a>
                    ,{" "}
                    <a
                      href="https://1win.com/betting/prematch/cricket-25"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      cricket
                    </a>
                    ,{" "}
                    <a
                      href="https://1win.com/betting/esport/cs2-142"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      eSports
                    </a>
                    , or any of the 40+ other sporting options available on 1win
                    using crypto.
                  </p>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Transacting in cryptocurrency on our platform is fast and
                    convenient, allowing you to cash out your winnings directly
                    to your crypto wallet in 15 minutes or less.
                  </p>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    Responsible Sports Betting
                  </h2>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    At 1win, we’re committed to promoting safe betting on our
                    platform. Our Responsible Gaming Policy is a detailed
                    resource that we’ve designed to help users bet safely. You
                    can use it to identify whether you might be developing a
                    gambling problem, so you can take proactive steps to protect
                    yourself. You can find this policy in the “Rules” section of
                    our platform.
                  </p>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    We believe that betting on sports at 1win is a fun pastime
                    and should be treated as such, just like any other leisurely
                    activity.
                  </p>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    Join the 1win Betting Community
                  </h2>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Want to share your betting tips, predictions, or discuss
                    upcoming matches? Join thousands of sports fans inside the
                    official{" "}
                    <a
                      href="https://forum.1win.com/"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      1win Forum
                    </a>
                    . Inside the{" "}
                    <a
                      href="https://forum.1win.com/10-sportbook-discussion/"
                      className="text-blue-600 font-semibold box-border caret-transparent outline-[3px]"
                    >
                      Sportsbook Discussion
                    </a>
                    section, you can post match previews, ask questions,
                    celebrate wins, and follow expert discussions. It’s your
                    space to connect with other bettors and stay updated on
                    what’s hot in the sports betting world.
                  </p>
                  <h2 className="text-gray-100 text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:mb-1">
                    FAQ — 1win Sports Betting
                  </h2>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    How to place a bet at 1win?
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    First, you’ll need to register on our main website or 1win
                    app. Then, top up your 1win wallet using the supported
                    payment methods and navigate to the “Sports” section of our
                    platform. Select an event to view the respective betting
                    markets, choose your desired odds to add them to your
                    Betslip, enter your bet amount, and hit “Place a bet.”
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Can I bet using crypto?
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Yes, as a crypto-ready platform, we support 1win deposits,
                    withdrawals, and bets made using Bitcoin, ETH, USDT, or any
                    of the other 10+ cryptocurrencies we support.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Are there live betting options?
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Yes, we offer live betting on popular tournaments. Click on
                    the “Broadcast” tab of the live event to watch the match
                    directly on our platform.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    How fast are withdrawals?
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    The time it takes to receive a payout varies depending on
                    the selected payment method. Crypto withdrawals, for
                    instance, only take 15 minutes or less.
                  </p>
                  <h3 className="text-gray-100 text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] mt-5 mb-0 md:text-2xl md:tracking-[-0.47px] md:leading-7 md:mb-1">
                    Is the 1win sportsbook available on mobile?
                  </h3>
                  <p className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    Yes, all our sports betting options, markets, and odds that
                    we host on the desktop platform are also available on the
                    1win app and mobile site.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="relative text-sm font-semibold bg-transparent caret-transparent leading-5 outline-[3px] text-center w-full mt-2 p-0 rounded-xl md:w-auto"
              >
                <div className="relative bg-gray-400/10 box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
                  <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                    <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                      Read more{" "}
                      <img
                        src="https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-30.svg"
                        alt="Icon"
                        className="text-gray-400 box-border caret-transparent h-6 outline-[3px] text-nowrap align-baseline w-6 p-0.5"
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

