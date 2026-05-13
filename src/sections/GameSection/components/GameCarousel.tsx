import { RefObject } from "react";

export type GameCarouselProps = {
  games: {
    href: string;
    imageSrc: string;
    alt: string;
    overlayVariant?: string;
    badgeVariant?: string;
    indicatorVariant?: string;
    languageIconSrc?: string;
    languageIconClassName?: string;
    languagePictureClassName?: string;
    languageWrapperVariant?: string;
  }[];
  showViewAll?: boolean;
  viewAllText?: string;
  gamesCountText?: string;
  scrollRef?: RefObject<HTMLDivElement>;
};

export const GameCarousel = (props: GameCarouselProps) => {
  return (
    <div ref={props.scrollRef} className="box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 overflow-auto -mx-4 -my-3 px-4 py-3 md:gap-x-4 md:gap-y-4 md:-mx-2 md:px-2">
      {props.games.map((game, index) => (
        <a
          href={game.href}
          className="box-border caret-transparent gap-x-2 flex flex-col shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 snap-start w-[calc(33.3333%_-_5.33333px)] scroll-m-4 md:w-[calc(16.6667%_-_13.3333px)] md:scroll-m-2"
          key={index}
        >
          <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
            {game.overlayVariant ? (
              <div className={game.overlayVariant}>
                <div
                  className={
                    game.indicatorVariant ||
                    "relative bg-size-[200%_100%] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%] rounded-xl md:rounded-2xl"
                  }
                ></div>
              </div>
            ) : null}

            <div className="absolute box-border caret-transparent outline-[3px] border overflow-hidden rounded-xl border-solid border-transparent inset-0 md:rounded-2xl after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:-inset-px after:font-inter after:md:rounded-2xl">
              <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                <img
                  src={game.imageSrc}
                  alt={game.alt}
                  className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                />
              </picture>
            </div>

            {game.languageIconSrc ? (
              <div className="absolute items-end box-border caret-transparent flex h-4 outline-[3px] w-4 left-1 top-1 md:left-2 md:top-2">
                <div className="absolute bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MyIgaGVpZ2h0PSI0MyIgZmlsbD0ibm9uZSI+CiAgPG1hc2sgaWQ9ImIiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiPgogICAgPHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTAgMGg0M3Y0M0gweiIgb3BhY2l0eT0iLjMiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDQzIDApIi8+CiAgPC9tYXNrPgogIDxnIG1hc2s9InVybCgjYikiPgogICAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTAgNDNoNDNWMEgwdjQzWiIvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjI5LjQ0NiIgeDI9IjUxLjA0MyIgeTE9IjEzLjM3OCIgeTI9IjM0Ljk0NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBzdG9wLW9wYWNpdHk9IjAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+Cg==)] box-border caret-transparent h-full outline-[3px] w-full rounded-l-xl left-0 top-0 md:rounded-l-2xl"></div>
                <div className="relative items-center box-border caret-transparent flex h-4 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-4 border border-gray-400/10 overflow-hidden rounded-[999px] border-solid">
                  {game.languageWrapperVariant ? (
                    <div className={game.languageWrapperVariant}>
                      <picture
                        className={
                          game.languagePictureClassName ||
                          "box-border caret-transparent contents fill-gray-100 h-full outline-[3px] w-full"
                        }
                      >
                        <img
                          src={game.languageIconSrc}
                          className={
                            game.languageIconClassName ||
                            "box-border caret-transparent fill-gray-100 h-full outline-[3px] align-baseline w-full overflow-hidden rounded-[50%]"
                          }
                        />
                      </picture>
                    </div>
                  ) : (
                    <picture
                      className={
                        game.languagePictureClassName ||
                        "box-border caret-transparent contents outline-[3px]"
                      }
                    >
                      <img
                        src={game.languageIconSrc}
                        className={
                          game.languageIconClassName ||
                          "caret-transparent h-4 min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-4"
                        }
                      />
                    </picture>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </a>
      ))}

      {props.showViewAll ? (
        <button
          type="button"
          className="text-stone-950/30 text-[13.3333px] items-center bg-gray-400/10 caret-transparent gap-x-1 flex flex-col shrink-0 justify-center leading-[normal] min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 snap-start text-center w-[calc(33.3333%_-_5.33333px)] scroll-m-4 rounded-xl md:w-[calc(16.6667%_-_13.3333px)] md:scroll-m-2"
        >
          <span className="text-gray-100 text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
            {props.viewAllText}
          </span>
          <span className="text-gray-400 text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px]">
            {props.gamesCountText}
          </span>
        </button>
      ) : null}
    </div>
  );
};
