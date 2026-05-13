import { Link } from "react-router-dom";

export type SidebarMenuSectionProps = {
  variant: string;
};

export const SidebarMenuSection = (props: SidebarMenuSectionProps) => {
  if (props.variant === "secondary") {
    return (
      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] gap-x-1 flex flex-col gap-y-1">
        <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="box-border caret-transparent outline-[3px]">
            <Link
              to="/promotions"
              className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
            >
              <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                <div className="box-border caret-transparent contents outline-[3px]">
                  <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                    <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/promotions.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                  </div>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                  <span className="box-border caret-transparent outline-[3px] text-nowrap">
                    Promotions
                  </span>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                <div className="box-border caret-transparent contents outline-[3px]"></div>
              </div>
            </Link>
          </div>
        </div>
        <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="box-border caret-transparent outline-[3px]">
            <Link
              to="/blog"
              className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
            >
              <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                <div className="box-border caret-transparent contents outline-[3px]">
                  <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                    <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/blog.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                  </div>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                  <span className="box-border caret-transparent outline-[3px] text-nowrap">
                    Blog
                  </span>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                <div className="box-border caret-transparent contents outline-[3px]"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="box-border caret-transparent gap-x-1 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
        <div className="box-border caret-transparent outline-[3px]">
          <div className="box-border caret-transparent outline-[3px]">
            <div className="relative box-border caret-transparent outline-[3px]">
              <div className="box-border caret-transparent outline-[3px]">
                <a
                  href="#"
                  className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]"
                >
                  <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                    <div className="box-border caret-transparent contents outline-[3px]">
                      <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                        <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/casino-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                    <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                      Casino
                    </div>
                  </div>
                  <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                    <div className="box-border caret-transparent contents outline-[3px]">
                      <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                        <img
                          src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-6.svg"
                          alt="Icon"
                          className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]">
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden">
                <div className="border-b-gray-100 border-l-zinc-800 border-r-gray-100 border-t-gray-100 box-border caret-transparent gap-x-1 flex flex-col outline-[3px] gap-y-1 ml-[18px] mt-1 pl-[5px] border-l border-solid">
                  <div className="box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                    <div className="box-border caret-transparent outline-[3px]">
                      <div className="relative box-border caret-transparent outline-[3px]">
                        <div className="box-border caret-transparent outline-[3px]">
                          <a
                            href="#"
                            className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]"
                          >
                            <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                                  <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/casino-lobby.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                                </div>
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                                Lobby
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                                  <img
                                    src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-7.svg"
                                    alt="Icon"
                                    className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                                  />
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]"></div>
                    </div>
                  </div>
                  <div className="box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                    <div className="box-border caret-transparent outline-[3px]">
                      <div className="relative box-border caret-transparent outline-[3px]">
                        <div className="box-border caret-transparent outline-[3px]">
                          <a
                            href="#"
                            className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]"
                          >
                            <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                                  <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/casino-live.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                                </div>
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                                Live Casino
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                                  <img
                                    src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-7.svg"
                                    alt="Icon"
                                    className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                                  />
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]"></div>
                    </div>
                  </div>
                  <div className="box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                    <div className="box-border caret-transparent outline-[3px]">
                      <div className="relative box-border caret-transparent outline-[3px]">
                        <div className="box-border caret-transparent outline-[3px]">
                          <a
                            href="#"
                            className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]"
                          >
                            <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                                  <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/casino-fast.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                                </div>
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                                Fast Games
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                                  <img
                                    src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-7.svg"
                                    alt="Icon"
                                    className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                                  />
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]"></div>
                    </div>
                  </div>
                  <div className="box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                    <div className="box-border caret-transparent outline-[3px]">
                      <div className="relative box-border caret-transparent outline-[3px]">
                        <div className="box-border caret-transparent outline-[3px]">
                          <a
                            href="#"
                            className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]"
                          >
                            <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                                  <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/shield.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                                </div>
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                                Tournaments
                              </div>
                            </div>
                            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                              <div className="box-border caret-transparent contents outline-[3px]">
                                <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                                  <img
                                    src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-7.svg"
                                    alt="Icon"
                                    className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                                  />
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]"></div>
                    </div>
                  </div>
                  <div className="box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                    <div className="box-border caret-transparent outline-[3px]">
                      <div className="relative box-border caret-transparent outline-[3px]">
                        <div className="box-border caret-transparent outline-[3px]">
                          <div className="relative box-border caret-transparent outline-[3px]">
                            <div className="box-border caret-transparent outline-[3px]">
                              <a
                                href="#"
                                className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
                              >
                                <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                                  <div className="box-border caret-transparent contents outline-[3px]">
                                    <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                                      <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/casino-brand-inline.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                                  <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                                    Betwin games
                                  </div>
                                </div>
                                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                                  <div className="box-border caret-transparent contents outline-[3px]">
                                    <img
                                      src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-8.svg"
                                      alt="Icon"
                                      className="text-gray-400 box-border caret-transparent h-4 outline-[3px] align-baseline w-4 mr-1.5"
                                    />
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
            </div>
          </div>
        </div>
      </div>
      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] gap-x-1 flex flex-col gap-y-1">
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="relative box-border caret-transparent outline-[3px]">
            <div className="box-border caret-transparent outline-[3px]">
              <a
                href="#"
                className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]"
              >
                <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                  <div className="box-border caret-transparent contents outline-[3px]">
                    <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                      <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/cricket-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                    </div>
                  </div>
                </div>
                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                  <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                    Sports
                  </div>
                </div>
                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                  <div className="box-border caret-transparent contents outline-[3px]">
                    <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                      <img
                        src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-6.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                      />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]">
            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden">
              <div className="border-b-gray-100 border-l-zinc-800 border-r-gray-100 border-t-gray-100 box-border caret-transparent gap-x-1 flex flex-col outline-[3px] gap-y-1 ml-[18px] mt-1 pl-[5px] border-l border-solid">
                <div className="relative box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                  <div className="box-border caret-transparent outline-[3px]">
                    <a
                      href="#"
                      className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
                    >
                      <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                        <div className="box-border caret-transparent contents outline-[3px]">
                          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                            <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-main.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          <span className="box-border caret-transparent outline-[3px] text-nowrap">
                            Top
                          </span>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                        <div className="box-border caret-transparent contents outline-[3px]"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                  <div className="box-border caret-transparent outline-[3px]">
                    <a
                      href="#"
                      className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
                    >
                      <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                        <div className="box-border caret-transparent contents outline-[3px]">
                          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                            <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-live.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          <span className="box-border caret-transparent outline-[3px] text-nowrap">
                            Live
                          </span>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                        <div className="box-border caret-transparent contents outline-[3px]"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                  <div className="box-border caret-transparent outline-[3px]">
                    <a
                      href="#"
                      className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
                    >
                      <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                        <div className="box-border caret-transparent contents outline-[3px]">
                          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                            <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-cybersport.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          <span className="box-border caret-transparent outline-[3px] text-nowrap">
                            Esports
                          </span>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                        <div className="box-border caret-transparent contents outline-[3px]"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                  <div className="box-border caret-transparent outline-[3px]">
                    <a
                      href="#"
                      className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
                    >
                      <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                        <div className="box-border caret-transparent contents outline-[3px]">
                          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                            <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-prematch.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          <span className="box-border caret-transparent outline-[3px] text-nowrap">
                            Sports
                          </span>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                        <div className="box-border caret-transparent contents outline-[3px]"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                  <div className="box-border caret-transparent outline-[3px]">
                    <a
                      href="#"
                      className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
                    >
                      <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                        <div className="box-border caret-transparent contents outline-[3px]">
                          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                            <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-bets-history.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          <span className="box-border caret-transparent outline-[3px] text-nowrap">
                            Bet history
                          </span>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                        <div className="box-border caret-transparent contents outline-[3px]"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px]">
                  <div className="box-border caret-transparent outline-[3px]">
                    <a
                      href="#"
                      className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
                    >
                      <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                        <div className="box-border caret-transparent contents outline-[3px]">
                          <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                            <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/cricket-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          <span className="box-border caret-transparent outline-[3px] text-nowrap">
                            Virtual cricket
                          </span>
                        </div>
                      </div>
                      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                        <div className="box-border caret-transparent contents outline-[3px]"></div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="relative box-border caret-transparent outline-[3px]">
            <div className="box-border caret-transparent outline-[3px]">
              <a
                href="#"
                className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]"
              >
                <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                  <div className="box-border caret-transparent contents outline-[3px]">
                    <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                      <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betwave-logo.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                    </div>
                  </div>
                </div>
                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                  <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                    Betwave
                  </div>
                </div>
                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                  <div className="box-border caret-transparent contents outline-[3px]">
                    <div className="text-gray-400 items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-11">
                      <img
                        src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-7.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                      />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="box-border caret-transparent grid grid-rows-[0fr] outline-[3px]"></div>
        </div>
        <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="box-border caret-transparent outline-[3px]">
            <Link
              to="/bonus"
              className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
            >
              <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                <div className="box-border caret-transparent contents outline-[3px]">
                  <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                    <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/bonuses-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                  </div>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                  <span className="box-border caret-transparent outline-[3px] text-nowrap">
                    Bonuses
                  </span>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                <div className="box-border caret-transparent contents outline-[3px]"></div>
              </div>
            </Link>
          </div>
        </div>
        <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="box-border caret-transparent outline-[3px]">
            <Link
              to="/vip"
              className="relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]"
            >
              <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px]">
                <div className="box-border caret-transparent contents outline-[3px]">
                  <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] w-6 p-0.5">
                    <div className="bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/vip-landing.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]"></div>
                  </div>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                  <span className="box-border caret-transparent outline-[3px] text-nowrap">
                    VIP club
                  </span>
                </div>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] ml-auto">
                <div className="box-border caret-transparent contents outline-[3px]"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
