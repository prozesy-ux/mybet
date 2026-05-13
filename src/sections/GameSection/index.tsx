import { useRef } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { GameCarousel } from "@/sections/GameSection/components/GameCarousel";

export type GameSectionGame = {
  href: string;
  imageSrc: string;
  alt: string;
  languageIconSrc?: string;
  languagePictureClassName?: string;
  languageWrapperVariant?: string;
  overlayVariant?: string;
};

export type GameSectionProps = {
  headerImageUrl: string;
  headerTitle: string;
  headerAlt: string;
  allGamesText: string;
  allGamesIconSrc: string;
  allGamesIconAlt: string;
  prevIconSrc: string;
  prevIconAlt: string;
  nextIconSrc: string;
  nextIconAlt: string;
  games: GameSectionGame[];
  showViewAll?: boolean;
  viewAllText?: string;
  gamesCountText?: string;
  showBottomDivider?: boolean;
};

export const GameSection = (props: GameSectionProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollNext = () => {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
      <div className="box-border caret-transparent flex flex-col outline-[3px]">
        <div className="items-center box-border caret-transparent gap-x-4 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 mb-3 md:mb-4">
          <SectionHeader
            imageUrl={props.headerImageUrl}
            title={props.headerTitle}
            alt={props.headerAlt}
          />

          <button
            type="button"
            className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center text-nowrap p-0 rounded-[999px]"
          >
            <div className="relative bg-gray-400/10 box-border caret-transparent h-8 outline-[3px] text-nowrap px-3 rounded-[999px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:p-px after:rounded-[999px] after:border-separate after:inset-0 after:font-inter">
              <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                  {props.allGamesText}
                  <img
                    src={props.allGamesIconSrc}
                    alt={props.allGamesIconAlt}
                    className="text-gray-400 box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                  />
                </div>
              </div>
            </div>
          </button>

          <div className="box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
            <button
              type="button"
              onClick={scrollPrev}
              className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-md"
            >
              <div className="relative bg-gray-400/10 box-border caret-transparent h-8 outline-[3px] w-8 rounded-md after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-md after:border-separate after:inset-0 after:font-inter">
                <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                  <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                    <img
                      src={props.prevIconSrc}
                      alt={props.prevIconAlt}
                      className="box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                    />
                  </div>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={scrollNext}
              className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-md"
            >
              <div className="relative bg-gray-400/10 box-border caret-transparent h-8 outline-[3px] w-8 rounded-md after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-md after:border-separate after:inset-0 after:font-inter">
                <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                  <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                    <img
                      src={props.nextIconSrc}
                      alt={props.nextIconAlt}
                      className="box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <GameCarousel
          games={props.games}
          showViewAll={props.showViewAll}
          viewAllText={props.viewAllText}
          gamesCountText={props.gamesCountText}
          scrollRef={carouselRef}
        />
      </div>

      {props.showBottomDivider ? (
        <div className="box-border caret-transparent outline-[3px]"></div>
      ) : null}
    </div>
  );
};
