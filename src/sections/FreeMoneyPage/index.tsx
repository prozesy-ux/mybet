import { PageTabs } from "@/components/navigation/PageTabs";
import { PromoHero } from "@/sections/FreeMoneyPage/components/PromoHero";
import { RewardsSection } from "@/sections/FreeMoneyPage/components/RewardsSection";

export const FreeMoneyPage = () => {
  return (
    <div className="box-border caret-transparent grow min-h-[940px] min-w-[auto] outline-[3px] md:min-h-[932px]">
      <div className="box-border caret-transparent flex flex-col max-w-[420px] outline-[3px] mx-auto pt-3 pb-6 px-3 md:max-w-[718px] md:pt-6 md:pb-8 md:px-0">
        <div className="box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 mb-1 md:gap-x-3 md:gap-y-3 md:mb-6">
          <div className="items-center box-border caret-transparent flex justify-between min-h-[auto] min-w-[auto] outline-[3px]">
            <div className="items-start box-border caret-transparent gap-x-1 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
              <h1 id="top" className="text-2xl font-semibold box-border caret-transparent tracking-[-0.47px] leading-7 min-h-[auto] min-w-[auto] outline-[3px] md:text-4xl md:tracking-[-0.79px] md:leading-10">
                Free money
              </h1>
            </div>
          </div>
        </div>
        <PageTabs />
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"></div>
        <PromoHero />
        <RewardsSection />
        <div className="box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:gap-x-6 md:gap-y-6">
          <div id="betwin-token" className="relative bg-blue-800 box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full p-4 scroll-mt-20 rounded-[20px] md:p-10 md:rounded-[32px]">
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] inset-0 md:rounded-[32px]">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent h-full object-contain object-[100%_0%] outline-[3px] align-baseline w-full" />
              </picture>
            </div>
            <div className="absolute box-border caret-transparent h-full outline-[3px] pointer-events-none z-auto overflow-hidden rounded-r-[20px] right-0 bottom-0 md:h-auto md:right-[-35px] md:z-[2] md:rounded-r-none">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent outline-[3px] align-baseline w-[220px] md:w-[490px]" />
              </picture>
            </div>
            <div className="relative box-border caret-transparent outline-[3px]">
              <h2 className="text-white text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] w-[min(300px,60%)] md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:w-[340px]">
                Betwin Token{" "}
                <br className="text-[22px] box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] md:text-[28px] md:tracking-[-0.59px] md:leading-8" />
                Earn tokens before they get listed on the exchange!
              </h2>
              <div className="box-border caret-transparent outline-[3px] mt-5 md:mt-6">
                <button
                  type="button"
                  className="relative text-black text-sm font-semibold bg-transparent caret-transparent leading-5 outline-[3px] text-center w-full p-0 rounded-xl md:w-[270px]"
                >
                  <div className="relative bg-white box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
                    <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                      <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                        Play
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div id="betwin-points" className="relative bg-[radial-gradient(199.52%_246.64%_at_119.97%_-30.86%,rgb(137,147,166)_0%,rgb(36,47,64)_100%)] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full p-4 scroll-mt-20 rounded-[20px] md:p-10 md:rounded-[32px]">
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] inset-0 md:rounded-[32px]">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent h-full object-contain object-[100%_0%] outline-[3px] align-baseline w-full" />
              </picture>
            </div>
            <div className="relative box-border caret-transparent outline-[3px]">
              <h2 className="text-white text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] w-[min(300px,80%)] md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:w-[300px]">
                Betwin Points{" "}
                <button
                  type="button"
                  className="absolute text-sm items-center bg-transparent caret-transparent gap-x-1 flex leading-5 outline-[3px] gap-y-1 text-center p-0 right-0"
                >
                  <div className="box-border caret-transparent contents outline-[3px]">
                    <img
                      src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-29.svg"
                      alt="Icon"
                      className="box-border caret-transparent h-8 outline-[3px] align-baseline w-8 p-1"
                    />
                  </div>
                </button>
              </h2>
              <div className="text-white box-border caret-transparent outline-[3px] w-[min(300px,80%)] mt-2 md:w-[300px]">
                <span className="text-sm box-border caret-transparent block leading-5 outline-[3px]">
                  Complete tasks, earn Betwin Points and exchange them for real
                  money
                </span>
              </div>
              <div className="items-center box-border caret-transparent gap-x-3 flex outline-[3px] gap-y-3 w-full mt-4 md:mt-6">
                <div className="items-center box-border caret-transparent flex justify-center min-h-[auto] min-w-[auto] outline-[3px] py-0.5">
                  <picture className="box-border caret-transparent contents outline-[3px]">
                    <img className="box-border caret-transparent shrink-0 h-9 min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-9 mr-2" />
                  </picture>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                    <div className="text-xs box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px]">
                      Balance
                    </div>
                    <div className="text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] md:text-[28px] md:tracking-[-0.59px] md:leading-8">
                      248
                    </div>
                  </div>
                </div>
                <div className="box-border caret-transparent max-w-[202px] min-h-[auto] min-w-[auto] outline-[3px] w-full md:max-w-none md:min-w-[206px] md:w-auto">
                  <div className="text-xs font-semibold box-border caret-transparent tracking-[0.01px] leading-4 max-w-none outline-[3px] text-center mb-2 md:max-w-[209px] md:mb-3">
                    248 out of 1200 before exchange is available
                  </div>
                  <div className="items-center bg-white/20 box-border caret-transparent flex h-1.5 outline-[3px] w-full my-0.5 rounded-[3px]">
                    <div className="relative bg-white box-border caret-transparent h-2.5 min-h-[auto] min-w-2.5 outline-[3px] w-[20.7425%] rounded-[5px]">
                      <div className="absolute box-border caret-transparent outline-[3px] translate-x-[50.0%] translate-y-[-2.5px] right-0.5">
                        <div className="bg-white box-border caret-transparent blur-[10px] h-[15px] opacity-85 outline-[3px] w-[15px] rounded-lg"></div>
                        <div className="absolute bg-white shadow-[rgb(255,255,255)_0px_0px_20px_2px] box-border caret-transparent blur-[3px] h-2 outline-[3px] translate-x-[-50.0%] translate-y-[-50.0%] w-2 rounded-lg left-2/4 top-2/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-[radial-gradient(168.26%_243.09%_at_113.34%_104.26%,rgb(216,182,238)_0%,rgb(117,71,192)_19%,rgb(72,8,114)_50%,rgb(8,3,12)_100%)] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full p-4 scroll-mt-20 rounded-[20px] md:p-10 md:rounded-[32px]">
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] inset-0 md:rounded-[32px]">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent h-full object-contain object-[100%_0%] outline-[3px] align-baseline w-full" />
              </picture>
            </div>
            <picture className="box-border caret-transparent contents outline-[3px]">
              <img className="absolute box-border caret-transparent outline-[3px] pointer-events-none align-baseline w-[260px] -right-2 top-[11px] bottom-auto md:w-[430px] md:right-0 md:top-auto md:bottom-0" />
            </picture>
            <div className="relative box-border caret-transparent outline-[3px]">
              <h2 className="text-white text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] w-[min(300px,60%)] md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:w-[400px]">
                100 Points bonus for verifying your phone number
              </h2>
              <div className="box-border caret-transparent outline-[3px] mt-5 md:mt-6">
                <button
                  type="button"
                  className="relative text-black text-sm font-semibold bg-transparent caret-transparent leading-5 outline-[3px] text-center w-full p-0 rounded-xl md:w-[270px]"
                >
                  <div className="relative bg-white box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
                    <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                      <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                        Verify
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="relative bg-[radial-gradient(144.24%_126.01%_at_102.21%_0%,rgb(157,188,224)_0%,rgb(92,155,230)_30%,rgb(47,127,234)_70%,rgb(26,115,232)_100%)] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full overflow-hidden p-4 scroll-mt-20 rounded-[20px] md:overflow-visible md:p-10 md:rounded-[32px]">
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] inset-0 md:rounded-[32px]">
              <div className="absolute bg-[radial-gradient(144.24%_126.01%_at_102.21%_0%,rgb(157,188,224)_0%,rgb(92,155,230)_30%,rgb(47,127,234)_70%,rgb(26,115,232)_100%)] box-border caret-transparent outline-[3px] rounded-[20px] inset-0 md:rounded-[32px]"></div>
            </div>
            <div className="absolute box-border caret-transparent outline-[3px] right-0 top-0 bottom-auto md:top-auto md:bottom-0">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent outline-[3px] align-baseline w-[190px] md:w-[400px]" />
              </picture>
            </div>
            <div className="relative box-border caret-transparent outline-[3px]">
              <h2 className="text-white text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] w-[min(300px,60%)] md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:w-[300px]">
                <div className="text-[22px] box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-0 outline-[3px] md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:min-h-[65px]">
                  Betwin Points for sport bet
                </div>
              </h2>
              <div className="text-white text-xs font-semibold items-center bg-white/20 box-border caret-transparent inline-flex tracking-[0.01px] leading-4 outline-[3px] mt-4 pl-1 pr-2 py-1 rounded-[999px]">
                <div className="box-border caret-transparent h-4 min-h-[auto] min-w-[auto] outline-[3px] w-4 mr-1">
                  <img
                    src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-30.svg"
                    alt="Icon"
                    className="bg-green-600 box-border caret-transparent h-full outline-[3px] align-baseline w-full rounded-[999px]"
                  />
                </div>
                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                  0 from 2 completed
                </div>
              </div>
              <div className="box-border caret-transparent outline-[3px] mt-5 md:mt-6">
                <button
                  type="button"
                  className="relative text-black text-sm font-semibold bg-transparent caret-transparent leading-5 outline-[3px] text-center w-full p-0 rounded-xl md:w-[270px]"
                >
                  <div className="relative bg-white box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
                    <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                      <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                        Go to betting
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="relative bg-purple-600 bg-[radial-gradient(85.75%_94.45%_at_105.64%_-12.12%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_100%),none] bg-size-[auto,auto] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full bg-[position:0%,0%_0%,0%] p-4 scroll-mt-20 rounded-[20px] md:p-10 md:rounded-[32px]">
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] -right-px top-auto bottom-0 md:rounded-[32px] md:-top-2">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent outline-[3px] align-baseline w-[220px] md:w-[480px]" />
              </picture>
            </div>
            <div className="relative box-border caret-transparent outline-[3px]">
              <h2 className="text-white text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] w-[min(300px,60%)] md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:w-[300px]">
                200 Points bonus for installing the app
              </h2>
              <div className="box-border caret-transparent outline-[3px] mt-5 md:mt-6">
                <div className="box-border caret-transparent gap-x-3 flex outline-[3px] gap-y-3 md:gap-x-4 md:gap-y-4">
                  <button
                    type="button"
                    className="relative text-black text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-xl"
                  >
                    <div className="relative bg-white box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-6 p-0.5">
                            <img
                              src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-31.svg"
                              alt="Icon"
                              className="box-border caret-transparent h-full outline-[3px] text-nowrap align-baseline w-full"
                            />
                          </div>
                          Install on iOS
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    className="relative text-black text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-xl"
                  >
                    <div className="relative bg-white box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-6 p-0.5">
                            <img
                              src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-32.svg"
                              alt="Icon"
                              className="box-border caret-transparent h-full outline-[3px] text-nowrap align-baseline w-full"
                            />
                          </div>
                          Install on Android
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-sky-500 box-border caret-transparent min-h-[170px] min-w-[auto] outline-[3px] w-full p-4 scroll-mt-20 rounded-[20px] md:min-h-[200px] md:p-10 md:rounded-[32px]">
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] inset-0 md:rounded-[32px]">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent h-full object-contain object-[100%_0%] outline-[3px] align-baseline w-full" />
              </picture>
            </div>
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] inset-0 md:rounded-[32px]">
              <img
                src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-33.svg"
                alt="Icon"
                className="absolute box-border caret-transparent h-full outline-[3px] align-baseline right-0"
              />
            </div>
            <div className="relative box-border caret-transparent outline-[3px]">
              <h2 className="text-white text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] w-[min(185px,63%)] md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:w-80">
                Install a loyalty card and receive 100 Points
              </h2>
              <div className="box-border caret-transparent outline-[3px] mt-5 md:mt-6"></div>
            </div>
          </div>
          <div id="cashback" className="relative text-white bg-lime-600 bg-[radial-gradient(115.88%_140.1%_at_92.65%_-26.33%,rgba(255,255,255,0.7),rgba(0,0,0,0)),none] bg-size-[auto,auto] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full bg-[position:0%,0%_0%,0%] p-4 scroll-mt-20 rounded-[20px] md:p-10 md:rounded-[32px]">
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] inset-0 md:rounded-[32px]">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent h-full object-contain object-[100%_0%] outline-[3px] align-baseline w-full" />
              </picture>
            </div>
            <div className="absolute box-border caret-transparent h-full outline-[3px] pointer-events-none overflow-visible rounded-r-none -right-2 -bottom-1.5 md:overflow-hidden md:rounded-r-[32px] md:right-0 md:bottom-0">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent h-full outline-[3px] align-baseline w-full" />
              </picture>
            </div>
            <div className="relative box-border caret-transparent outline-[3px]">
              <h2 className="text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] w-[min(300px,60%)] md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:w-[210px]">
                Weekly cashback up to 30% in the casino
              </h2>
              <div className="text-xs font-semibold items-center box-border caret-transparent gap-x-2 flex tracking-[0.01px] leading-4 outline-[3px] gap-y-2 mt-4 mb-3 md:text-sm md:tracking-[normal] md:leading-5">
                <div className="text-xs box-border caret-transparent h-4 tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-4 md:text-sm md:tracking-[normal] md:leading-5">
                  <img
                    src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-34.svg"
                    alt="Icon"
                    className="text-xs box-border caret-transparent h-full tracking-[0.01px] leading-4 outline-[3px] align-baseline w-full md:text-sm md:tracking-[normal] md:leading-5"
                  />
                </div>
                Get cashback in
              </div>
              <div className="box-border caret-transparent gap-x-1 grid grid-rows-[34px_max-content] outline-[3px] gap-y-1 w-[169px]">
                <div className="text-xl font-semibold items-center bg-[url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27169%27%20height=%2734%27%20fill=%27none%27%3E%3Cg%20filter=%27url%28%23a)] box-border caret-transparent gap-x-0.5 flex tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5 md:text-2xl md:tracking-[-0.47px] md:leading-7">
                  <div className="text-xl box-border caret-transparent basis-[0%] grow tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-2xl md:tracking-[-0.47px] md:leading-7">
                    3
                  </div>
                  <div className="text-xl box-border caret-transparent basis-[0%] grow tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-2xl md:tracking-[-0.47px] md:leading-7">
                    6
                  </div>
                  <div className="text-xl box-border caret-transparent basis-[0%] grow tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-2xl md:tracking-[-0.47px] md:leading-7">
                    36
                  </div>
                </div>
                <div className="text-xs font-semibold box-border caret-transparent gap-x-0.5 flex tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-0.5">
                  <div className="box-border caret-transparent basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] text-center">
                    days
                  </div>
                  <div className="box-border caret-transparent basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] text-center">
                    hours
                  </div>
                  <div className="box-border caret-transparent basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] text-center">
                    minutes
                  </div>
                </div>
              </div>
              <div className="box-border caret-transparent outline-[3px] mt-5 md:mt-6">
                <button
                  type="button"
                  className="relative text-black text-sm font-semibold bg-transparent caret-transparent leading-5 outline-[3px] overflow-x-hidden overflow-y-auto text-center text-ellipsis w-full p-0 rounded-xl md:w-60"
                >
                  <div className="relative bg-white box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
                    <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                      <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                        More info
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="relative bg-[radial-gradient(116.31%_116.2%_at_100%_100%,rgb(76,171,163)_28.71%,rgb(16,56,74)_100%)] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full overflow-hidden p-4 scroll-mt-20 rounded-[20px] md:overflow-visible md:p-10 md:rounded-[32px]">
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] inset-0 md:rounded-[32px]">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent h-full object-contain object-[100%_0%] outline-[3px] align-baseline w-full" />
              </picture>
            </div>
            <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none overflow-hidden rounded-[20px] right-0 top-0">
              <picture className="box-border caret-transparent contents outline-[3px]">
                <img className="box-border caret-transparent outline-[3px] align-baseline w-[180px] rounded-tr-none md:w-[242px] md:rounded-tr-[32px]" />
              </picture>
            </div>
            <div className="relative box-border caret-transparent outline-[3px]">
              <h2 className="text-white text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] w-3/5 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:w-[300px]">
                <span className="text-[22px] box-border caret-transparent block tracking-[-0.4px] leading-[26px] outline-[3px] md:text-[28px] md:tracking-[-0.59px] md:leading-8">
                  1win Founder’s Blog
                </span>
              </h2>
              <div className="text-white box-border caret-transparent outline-[3px] w-3/5 mt-2 md:w-[300px]">
                <div className="text-xs box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px] mt-2 mb-4 md:text-sm md:tracking-[normal] md:leading-5">
                  About the Company, Business, and More
                </div>
              </div>
              <div className="box-border caret-transparent gap-x-2 flex flex-col grid-cols-none outline-[3px] gap-y-2 mt-4 md:grid md:grid-cols-[1fr_1fr] md:mt-8">
                <div className="items-center bg-white/20 box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 p-2 rounded-2xl">
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]">
                    <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                      <img
                        src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-35.svg"
                        alt="Icon"
                        className="text-white box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-semibold box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                    Telegram
                  </div>
                  <a
                    href="https://t.me/+1gAqpW0_FhI5OTUy"
                    className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                  >
                    <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="items-center bg-white/20 box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 p-2 rounded-2xl">
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]">
                    <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                      <img
                        src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-36.svg"
                        alt="Icon"
                        className="text-white box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-semibold box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                    X
                  </div>
                  <a
                    href="https://x.com/Owner1win"
                    className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                  >
                    <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div id="bonus-code" className="relative text-white bg-violet-900 bg-[radial-gradient(131.88%_137.73%_at_133.54%_-71.43%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_100%),none] bg-size-[auto,auto] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full overflow-clip bg-[position:0%,0%_0%,0%] p-5 scroll-mt-20 rounded-[20px] md:p-10 md:rounded-[32px]">
            <picture className="box-border caret-transparent contents outline-[3px]">
              <img className="absolute box-border caret-transparent object-cover outline-[3px] pointer-events-none align-baseline w-[220px] right-0 top-0 md:w-[420px] md:right-[-60px]" />
            </picture>
            <div className="relative box-border caret-transparent outline-[3px]">
              <h2 className="text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] outline-[3px] w-3/5 md:text-[28px] md:tracking-[-0.59px] md:leading-8 md:w-[300px]">
                <span className="text-[22px] box-border caret-transparent block tracking-[-0.4px] leading-[26px] outline-[3px] md:text-[28px] md:tracking-[-0.59px] md:leading-8">
                  Daily bonus codes
                </span>
              </h2>
              <div className="box-border caret-transparent outline-[3px] w-3/5 mt-2 md:w-[300px]">
                <div className="text-xs box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px] mt-2 mb-4 md:text-sm md:tracking-[normal] md:leading-5 md:mb-8">
                  Unique social media bonus codes. More subscriptions - more
                  chances to win big!
                </div>
              </div>
              <div className="box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2">
                <div className="items-center bg-white/20 box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 p-2 rounded-2xl">
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]">
                    <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                      <img
                        src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-37.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-semibold box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                    Whatsapp
                  </div>
                  <a
                    href="https://www.whatsapp.com/channel/0029VaFXHRLElagxvCc7a62E"
                    className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                  >
                    <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="items-center bg-white/20 box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 p-2 rounded-2xl">
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]">
                    <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                      <img
                        src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-35.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-semibold box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                    Telegram
                  </div>
                  <a
                    href="https://t.me/+41MxN3wE5tVkZTgy"
                    className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                  >
                    <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="items-center bg-white/20 box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 p-2 rounded-2xl">
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]">
                    <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                      <img
                        src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-38.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-semibold box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                    Instagram
                  </div>
                  <a
                    href="https://www.instagram.com/1win"
                    className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                  >
                    <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="items-center bg-white/20 box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 p-2 rounded-2xl">
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]">
                    <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                      <img
                        src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-39.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-semibold box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                    Facebook
                  </div>
                  <a
                    href="https://www.facebook.com/1winglobal/"
                    className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                  >
                    <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="items-center bg-white/20 box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 p-2 rounded-2xl">
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]">
                    <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                      <img
                        src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-36.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-semibold box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                    X
                  </div>
                  <a
                    href="https://x.com/1winPro"
                    className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                  >
                    <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="items-center bg-white/20 box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 p-2 rounded-2xl">
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]">
                    <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                      <img
                        src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-40.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-semibold box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                    Pinterest
                  </div>
                  <a
                    href="https://ru.pinterest.com/1win_global/"
                    className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                  >
                    <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="items-center bg-white/20 box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 p-2 rounded-2xl">
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]">
                    <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                      <img
                        src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-41.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                      />
                    </div>
                  </div>
                  <div className="text-sm font-semibold box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                    Threads
                  </div>
                  <a
                    href="https://www.threads.com/@1win"
                    className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                  >
                    <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
