import { useAuth } from "@/context/AuthContext";
import { requestLoginModal } from "@/services/casinoLaunchFlow";

export const RandomGameBanner = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
      <div className="relative box-border caret-transparent outline-[3px]">
        <div className="absolute bg-violet-700 box-border caret-transparent outline-[3px] rounded-[20px] inset-0 md:rounded-3xl after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[20px] after:border-separate after:inset-0 after:font-inter after:md:rounded-3xl"></div>
        <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none z-[2] inset-y-0">
          <picture className="box-border caret-transparent contents outline-[3px]">
            <img className="box-border caret-transparent h-full object-contain object-[0%_50%] outline-[3px] align-baseline w-full rounded-l-[20px]" />
          </picture>
        </div>
        <div className="absolute items-center box-border caret-transparent flex h-[110px] justify-start outline-[3px] right-[-15px] translate-y-[-55px] w-[75px] z-[2] scale-[0.86] top-2/4 md:block md:h-[62px] md:top-[-9px] md:transform-none md:w-[94px] md:right-[217px]">
          <picture className="box-border caret-transparent contents outline-[3px]">
            <img className="box-border caret-transparent h-[62px] min-h-[auto] min-w-[auto] object-contain outline-[3px] rotate-90 align-baseline w-[94px] md:min-h-0 md:min-w-0 md:transform-none" />
          </picture>
        </div>
        <div className="absolute box-border caret-transparent outline-[3px] pointer-events-none z-[2] overflow-hidden rounded-r-[20px] right-0 inset-y-0">
          <picture className="box-border caret-transparent contents outline-[3px]">
            <img className="box-border caret-transparent h-full object-contain object-[100%_50%] outline-[3px] align-baseline w-full" />
          </picture>
        </div>
        <div className="box-border caret-transparent gap-x-5 flex h-full justify-between min-h-60 outline-[3px] gap-y-5 overflow-hidden rounded-[20px] md:min-h-[244px] md:rounded-3xl">
          <div className="relative items-start box-border caret-transparent flex flex-col justify-between min-h-[auto] min-w-[auto] outline-[3px] w-[178px] z-[2] pl-4 pr-0 py-4 md:w-96 md:p-6">
            <div className="items-start box-border caret-transparent gap-x-2 flex flex-col justify-start max-w-none min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:gap-x-3 md:max-w-[324px] md:gap-y-3">
              <div className="text-white text-[22px] font-semibold box-border caret-transparent tracking-[-0.4px] leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] md:text-[28px] md:tracking-[-0.59px] md:leading-8">
                Don&#39;t know what to play?
              </div>
              <div className="text-white text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
                Try your luck with a random game
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!isAuthenticated) {
                  requestLoginModal();
                }
              }}
              className="relative text-black text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-[10px]"
            >
              <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                  <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                    <img
                      src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-31.svg"
                      alt="Icon"
                      className="box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                    />
                    Find a game
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div className="absolute items-center box-border caret-transparent flex justify-center max-w-[116px] outline-[3px] w-full ml-auto right-6 inset-y-0 md:max-w-[528px] md:right-0">
            <div className="absolute box-border caret-transparent hidden outline-[3px] z-[3] left-2/4 bottom-3.5 md:bottom-3">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (!isAuthenticated) {
                    requestLoginModal();
                  }
                }}
                className="relative text-black text-sm font-semibold box-border caret-transparent inline-block leading-5 outline-[3px] rounded-[10px]"
              >
                <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                  <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                    <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                      Play
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="relative items-center box-border caret-transparent flex h-full justify-center [mask-image:linear-gradient(rgba(0,0,0,0)_0px,rgb(255,255,255)_30%,rgb(255,255,255)_81%,rgba(0,0,0,0)_100%)] max-w-[336px] min-h-[auto] min-w-[auto] outline-[3px] w-full md:[mask-image:linear-gradient(90deg,rgba(0,0,0,0)_0px,rgb(255,255,255)_30%,rgb(255,255,255)_75%,rgba(0,0,0,0)_100%)] md:max-w-[400px]">
              <div className="absolute box-border caret-transparent h-[151px] outline-[3px] pointer-events-none w-[116px] z-[1] rounded-2xl border-2 border-solid border-white md:h-[196px] md:w-[150px] md:rounded-[20px]">
                <div className="relative box-border caret-transparent flex h-full justify-center outline-[3px]">
                  <div className="absolute box-border caret-transparent block outline-[3px] -top-px md:hidden">
                    <img
                      src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-32.svg"
                      alt="Icon"
                      className="box-border caret-transparent inline h-[27px] outline-[3px] align-baseline w-[50px]"
                    />
                  </div>
                  <div className="absolute bottom-[-7px] box-border caret-transparent outline-[3px]">
                    <img
                      src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-33.svg"
                      alt="Icon"
                      className="box-border caret-transparent inline h-8 outline-[3px] align-baseline w-[60px]"
                    />
                  </div>
                </div>
              </div>
              <div className="relative items-center box-border caret-transparent flex h-full justify-center min-h-[auto] min-w-[auto] outline-[3px] w-full overflow-visible md:overflow-hidden">
                <div className="absolute items-center box-border caret-transparent gap-x-0 flex flex-col outline-[3px] gap-y-4 -mx-4 md:gap-x-5 md:flex-row md:gap-y-0">
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] opacity-70 outline-[3px] pointer-events-none w-[104px] md:w-[138px]">
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        if (!isAuthenticated) {
                          requestLoginModal();
                        }
                      }}
                      className="box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2"
                    >
                      <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
                        <div className="absolute box-border caret-transparent outline-[3px] overflow-hidden rounded-xl inset-0 md:rounded-2xl">
                          <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                            <img
                              src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/67bb43f1-f233-4bef-96d1-481e2a377457_vertical.png@webp"
                              alt="Super Ace Deluxe game"
                              className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                            />
                          </picture>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] opacity-70 outline-[3px] pointer-events-none w-[104px] md:w-[138px]">
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        if (!isAuthenticated) {
                          requestLoginModal();
                        }
                      }}
                      className="box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2"
                    >
                      <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
                        <div className="absolute box-border caret-transparent outline-[3px] overflow-hidden rounded-xl inset-0 md:rounded-2xl">
                          <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                            <img
                              src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/18f9b3f7-55fe-4231-9f81-250036e9e25d_vertical.png@webp"
                              alt="Aviator game"
                              className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                            />
                          </picture>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-[104px] md:w-[138px]">
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        if (!isAuthenticated) {
                          requestLoginModal();
                        }
                      }}
                      className="box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2"
                    >
                      <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
                        <div className="absolute box-border caret-transparent outline-[3px] overflow-hidden rounded-xl inset-0 md:rounded-2xl">
                          <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                            <img
                              src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/17c8f884-c3b6-4f3d-ba7f-8e2c2fd75b84_vertical.png@webp"
                              alt="Fortune Gems 3 game"
                              className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                            />
                          </picture>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] opacity-70 outline-[3px] pointer-events-none w-[104px] md:w-[138px]">
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        if (!isAuthenticated) {
                          requestLoginModal();
                        }
                      }}
                      className="box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2"
                    >
                      <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
                        <div className="absolute box-border caret-transparent outline-[3px] overflow-hidden rounded-xl inset-0 md:rounded-2xl">
                          <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                            <img
                              src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/7ef80b5a-032e-44e1-a4e8-22f172009f06_vertical.png@webp"
                              alt="Wild Bounty Showdown game"
                              className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                            />
                          </picture>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] opacity-70 outline-[3px] pointer-events-none w-[104px] md:w-[138px]">
                    <a
                      href="#"
                      className="box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2"
                    >
                      <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
                        <div className="absolute box-border caret-transparent outline-[3px] overflow-hidden rounded-xl inset-0 md:rounded-2xl">
                          <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                            <img
                              src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/fd80b5e4-d5dc-484b-8852-921ee24266ae_vertical.png@webp"
                              alt="Tower Rush game"
                              className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                            />
                          </picture>
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
    </div>
  );
};
