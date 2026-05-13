import { CategoryTabs } from "@/sections/MainContent/components/CategoryTabs";
import { HeroSection } from "@/sections/HeroSection";
import { SearchAndFilters } from "@/sections/SearchAndFilters";
import { GameSection } from "@/sections/GameSection";
import { JackpotSection } from "@/sections/JackpotSection";

import { AllGamesSection } from "@/sections/AllGamesSection";

export const MainContent = () => {
  return (
    <div id="lobby-section" className="box-border caret-transparent grow min-h-[940px] min-w-[auto] outline-[3px] md:min-h-[932px]">
      <div className="fixed box-border caret-transparent outline-[3px] pointer-events-none w-full z-[102] left-0 top-auto bottom-0 md:sticky md:top-0 md:bottom-auto">
        <div className="static box-border caret-transparent gap-x-2 flex flex-col-reverse h-full justify-start outline-[3px] gap-y-2 pt-0 pb-[68px] px-2 md:absolute md:flex-col md:h-auto md:pl-6 md:pr-0 md:pt-3 md:pb-0"></div>
      </div>
      <div className="box-border caret-transparent gap-x-6 flex flex-col max-w-[1640px] outline-[3px] gap-y-6 w-full mx-auto pt-3 pb-6 px-4 md:gap-x-8 md:gap-y-8 md:pt-6 md:pb-8 md:px-12">
        <CategoryTabs />
        <HeroSection />
        <SearchAndFilters />
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/64/e6243bf9-e55d-4481-ac84-96ad7134eb7f.svg"
          headerTitle="Betwin games"
          headerAlt="Betwin games"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/3916a405-a9e7-43be-b12c-cfd2082a5237_vertical.png@webp",
              alt: "Crash game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/7de65366-8cde-4de5-8891-6706b37716c5_vertical.png@webp",
              alt: "Coinflip game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/27c65015-b02d-4aae-831c-e7c8d49807a8_vertical.png@webp",
              alt: "Lucky Jet game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/b460e597-4f0b-42eb-96bc-33c744e3bbb3_vertical.png@webp",
              alt: "Rocket Queen game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/5c706591-f348-4a33-b2ba-b0b152ddb4a8_vertical.png@webp",
              alt: "Blackjack game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/1216b244-5acb-4737-991d-f2f3f0d48207_vertical.png@webp",
              alt: "Mines Betwin game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/68e48a5c-4992-4bc7-bfb1-51ccd8f2093a_vertical.png@webp",
              alt: "Dice game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/2d2d7dfc-a81b-4ee4-ae17-8551b4be80b8_vertical.png@webp",
              alt: "Hilo game",
            },
          ]}
        />
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/218/b0299d06-5249-4e88-a955-938ab24f64a8.svg"
          headerTitle="Fishing games"
          headerAlt="Fishing games"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/e6596978-acf8-45a2-aba3-bee43db4fa5e_vertical.png@webp",
              alt: "Ocean King Jackpot game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/7fd30a79-cce6-492f-a74e-2466e24d6eed_vertical.png@webp",
              alt: "Dinosaur Tycoon II game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/fundist/118b1e48-c80d-46e3-a6ef-3e1afa2feac7_vertical.jpg@webp",
              alt: "Fishing War game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/v_jdbcaishenfishing_caishenfishing.png@webp",
              alt: "Cai Shen Fishing game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/a206f355-e7f0-4a0c-bc7e-4fccec91ab37_vertical.jpg@webp",
              alt: "Star Hunter game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/b7a1a3e6-69c8-44b3-b312-ddc98b87d8a4_vertical.png@webp",
              alt: "Happy Fishing game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/ca789f81-8d7d-45f5-8ecc-6e2d1e2364b9_vertical.png@webp",
              alt: "Dragon Fishing game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/v_jdbdragonfishingii_dragonfishingii.png@webp",
              alt: "Dragon Fishing Ii game",
            },
          ]}
          showViewAll={true}
          viewAllText="View all"
          gamesCountText="40 games"
        />
        <JackpotSection />
        <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="items-center box-border caret-transparent gap-x-4 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 mb-3 md:mb-4">
            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] mr-auto">
              <div className="items-center box-border caret-transparent gap-x-2 flex outline-[3px] gap-y-2">
                <div className="text-base font-semibold items-center box-border caret-transparent gap-x-2 flex tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 md:text-xl md:gap-x-3 md:tracking-[-0.33px] md:leading-6 md:gap-y-3">
                  <img
                    src="https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/casino/qabs.1/history-v2.svg"
                    alt="Games history"
                    className="text-gray-300 text-base box-border caret-transparent tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-6 md:text-xl md:tracking-[-0.33px] md:leading-6 md:w-8"
                  />
                  <span className="text-base box-border caret-transparent block tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] md:text-xl md:tracking-[-0.33px] md:leading-6">
                    Games history
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center text-nowrap p-0 rounded-[999px]"
            >
              <div className="relative bg-gray-400/10 box-border caret-transparent h-8 outline-[3px] text-nowrap px-3 rounded-[999px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:p-px after:rounded-[999px] after:border-separate after:inset-0 after:font-inter">
                <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                  <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                    All games
                    <img
                      src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
                      alt="Icon"
                      className="text-gray-400 box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                    />
                  </div>
                </div>
              </div>
            </button>
            <div className="box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
              <button
                type="button"
                className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] opacity-50 outline-[3px] pointer-events-none text-center p-0 rounded-md"
              >
                <div className="relative bg-gray-400/10 box-border caret-transparent h-8 outline-[3px] w-8 rounded-md after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-md after:border-separate after:inset-0 after:font-inter">
                  <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                    <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                      <img
                        src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                      />
                    </div>
                  </div>
                </div>
              </button>
              <button
                type="button"
                className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] opacity-50 outline-[3px] pointer-events-none text-center p-0 rounded-md"
              >
                <div className="relative bg-gray-400/10 box-border caret-transparent h-8 outline-[3px] w-8 rounded-md after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-md after:border-separate after:inset-0 after:font-inter">
                  <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                    <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                      <img
                        src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
                        alt="Icon"
                        className="box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 overflow-auto -mx-4 -my-3 px-4 py-3 md:gap-x-4 md:gap-y-4 md:-mx-2 md:px-2">
            <a
              href="#"
              className="box-border caret-transparent gap-x-2 flex flex-col shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 snap-start w-[calc(33.3333%_-_5.33333px)] scroll-m-4 md:w-[calc(16.6667%_-_13.3333px)] md:scroll-m-12"
            >
              <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
                <div className="absolute box-border caret-transparent outline-[3px] border overflow-hidden rounded-xl border-solid border-transparent inset-0 md:rounded-2xl after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:-inset-px after:font-inter after:md:rounded-2xl">
                  <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                    <img
                      src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/ea44e4ce-9287-4568-8e47-4b619dbb0da1_vertical.png@webp"
                      alt="Blackjack Lobby game"
                      className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                    />
                  </picture>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="box-border caret-transparent gap-x-2 flex flex-col shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 snap-start w-[calc(33.3333%_-_5.33333px)] scroll-m-4 md:w-[calc(16.6667%_-_13.3333px)] md:scroll-m-12"
            >
              <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
                <div className="absolute box-border caret-transparent outline-[3px] border overflow-hidden rounded-xl border-solid border-transparent inset-0 md:rounded-2xl after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:-inset-px after:font-inter after:md:rounded-2xl">
                  <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                    <img
                      src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/06edfa9e-938e-4544-9bf3-57e3c431d1eb_vertical.png@webp"
                      alt="Astronaut game"
                      className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                    />
                  </picture>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="box-border caret-transparent gap-x-2 flex flex-col shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 snap-start w-[calc(33.3333%_-_5.33333px)] scroll-m-4 md:w-[calc(16.6667%_-_13.3333px)] md:scroll-m-12"
            >
              <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
                <div className="absolute box-border caret-transparent outline-[3px] border overflow-hidden rounded-xl border-solid border-transparent inset-0 md:rounded-2xl after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:-inset-px after:font-inter after:md:rounded-2xl">
                  <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                    <img
                      src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/4403f89e-ed98-458a-bf12-2fa15ee6c781_vertical.png@webp"
                      alt="Speed-n-Cash game"
                      className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                    />
                  </picture>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="box-border caret-transparent gap-x-2 flex flex-col shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 snap-start w-[calc(33.3333%_-_5.33333px)] scroll-m-4 md:w-[calc(16.6667%_-_13.3333px)] md:scroll-m-12"
            >
              <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
                <div className="absolute box-border caret-transparent outline-[3px] border overflow-hidden rounded-xl border-solid border-transparent inset-0 md:rounded-2xl after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:-inset-px after:font-inter after:md:rounded-2xl">
                  <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                    <img
                      src="https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/27c65015-b02d-4aae-831c-e7c8d49807a8_vertical.png@webp"
                      alt="Lucky Jet game"
                      className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                    />
                  </picture>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div id="quick-games-section" className="scroll-mt-24">
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/2/80fd1a92-083e-49b8-acdd-dc01fafaadcc.svg"
          headerTitle="Popular"
          headerAlt="Popular"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/b63fdb20-8233-47d6-a35b-a8bd375731b8_vertical.png@webp",
              alt: "Sweet Bonanza Super Scatter game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/07dad35c-de62-4011-972f-5bd9d25ca376_vertical.png@webp",
              alt: "Coin UP : Hot Fire game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/211906d7-1414-4fc9-839d-3d70223799e2_vertical.png@webp",
              alt: "Mega Wheel game",
              languageIconSrc:
                "https://1win.com/resources/v1/shared/images/languages/en-GB.svg",
              languagePictureClassName:
                "box-border caret-transparent contents outline-[3px]",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/48fa775e-1000-4fa5-bc34-6307183e6466_vertical.png@webp",
              alt: "Fortune Gems 2 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/4de3a0d2-d86c-49e5-a6f6-a5dc61a148a0_vertical.png@webp",
              alt: "Chicken Train game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/d43435b5-d7c7-44ca-83af-a3a1449b5be2_vertical.png@webp",
              alt: "JetX game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/758fa0fa-2b11-4d0a-8a15-1e2a7ea24916_vertical.png@webp",
              alt: "Coin UP : Lightning game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/d7fb57b7-a0cb-4729-a257-f46a8a70adcd_vertical.png@webp",
              alt: "5 Lions Megaways 2 game",
            },
          ]}
          showViewAll={true}
          viewAllText="View all"
          gamesCountText="653 games"
        />
        </div>
        <div id="live-casino-section" className="scroll-mt-24">
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/3/8420bfd8-b3b4-4359-985f-678bb5a40c41.svg"
          headerTitle="Live Casino"
          headerAlt="Live Casino"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/bac08673-5c24-435a-94c1-f4e71c6b9788_vertical.png@webp",
              alt: "EZ Dealer Roulette Bengali game",
              languageIconSrc:
                "https://1win.com/resources/v1/shared/images/flags/bn.svg",
              languageWrapperVariant:
                "box-border caret-transparent h-4 min-h-[auto] min-w-[auto] outline-[3px] w-4",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/26092fbd-24c8-4128-a039-029a73e37ecf_vertical.png@webp",
              alt: "Crazy Time game",
              languageIconSrc:
                "https://1win.com/resources/v1/shared/images/languages/en-GB.svg",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/590eba42-7195-474a-9d11-b00533f31291_vertical.png@webp",
              alt: "Betwin Auto Roulette game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/72e3cd6d-3d58-45ee-af61-8fa234946553_vertical.png@webp",
              alt: "Betwin Ice Fishing game",
              languageIconSrc:
                "https://1win.com/resources/v1/shared/images/languages/en-GB.svg",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/0d5d0988-d910-400a-8bb7-a2299b0bfc48_vertical.png@webp",
              alt: "Diwali Auto Roulette game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/83c41557-f866-4d45-a665-9f20f6b44207_vertical.png@webp",
              alt: "Money Time game",
              languageIconSrc:
                "https://1win.com/resources/v1/shared/images/languages/en-GB.svg",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/a3697ca8-b852-4923-bfb2-fb7619b2557b_vertical.png@webp",
              alt: "Super Andar Bahar game",
              languageIconSrc:
                "https://1win.com/resources/v1/shared/images/languages/en-GB.svg",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/64ae1ca4-e4f9-4a9e-93c4-a9e184780540_vertical.png@webp",
              alt: "Betwin Blackjack game",
              languageIconSrc:
                "https://1win.com/resources/v1/shared/images/languages/en-GB.svg",
            },
          ]}
          showViewAll
          viewAllText="View all"
          gamesCountText="880 games"
        />
        </div>
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/5/1b58e562-b546-49a6-a2fa-d861fe94e634.svg"
          headerTitle="Slots"
          headerAlt="Slots"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/02f4ae21-f030-4fa4-ba15-4c5507903b3a_vertical.png@webp",
              alt: "Starlight Princess 1000 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/a869a4cb-128d-4ca4-9e2e-e7b685aae3c0_vertical.png@webp",
              alt: "Super Ace game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/5705590b-ae05-46dd-a1b6-2992dca8786b_vertical.jpg@webp",
              alt: "Win Win Neko game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/a73713d8-62f0-4b83-bc34-bd9de9ca9fd8_vertical.png@webp",
              alt: "Sugar Rush Super Scatter game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/a973ec71-ef0c-46d4-9bc9-e3709425452d_vertical.png@webp",
              alt: "Crown Coins game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/4cfc1078-4f1a-46f8-b073-d45e022e8b8c_vertical.png@webp",
              alt: "Prosperity Snake game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/278bd0fc-0b29-48bf-8e51-a0bb999ea826_vertical.png@webp",
              alt: "Coin Volcano game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/64fae290-cd37-4634-88f5-7acc16f40e5f_vertical.png@webp",
              alt: "Fortune of Olympus game",
            },
          ]}
          showViewAll={true}
          viewAllText="View all"
          gamesCountText="11,433 games"
        />
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/277/f353ecc5-31cc-4221-adad-70a0ce5d23c4.svg"
          headerTitle="Jili Games"
          headerAlt="Jili Games"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/67bb43f1-f233-4bef-96d1-481e2a377457_vertical.png@webp",
              alt: "Super Ace Deluxe game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/a869a4cb-128d-4ca4-9e2e-e7b685aae3c0_vertical.png@webp",
              alt: "Super Ace game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/85ac8881-eb04-4828-ab3c-6170443fa888_vertical.png@webp",
              alt: "Boxing King game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/4ae2f1d7-9af9-4940-96e5-9893dd7c80c3_vertical.png@webp",
              alt: "Money Coming game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/48fa775e-1000-4fa5-bc34-6307183e6466_vertical.png@webp",
              alt: "Fortune Gems 2 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/eda4ef1e-e175-4170-b8d7-f2d9a3cc4f38_vertical.png@webp",
              alt: "Golden Land game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/b5fda67b-e5ca-40d0-be19-9413ecfc7a0d_vertical.png@webp",
              alt: "Night City game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/e87c999c-5e6f-455d-be0c-ed0291ac1bd4_vertical.png@webp",
              alt: "Super Rich game",
            },
          ]}
          showViewAll
          viewAllText="View all"
          gamesCountText="174 games"
        />
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/81/e57ed3e5-a6e9-4def-85cb-2ac4bb7bb3f2.svg"
          headerTitle="Only on Betwin"
          headerAlt="Only on Betwin"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/8277e56b-8ca8-40f2-a300-03b57859eca7_vertical.png@webp",
              alt: "House of Sins game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/f149c47a-ff00-4cf6-8e46-96bf7c6045b4_vertical.png@webp",
              alt: "Betwin High Flyer game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/7015ff80-18d8-4f72-8de7-b561befe28a6_vertical.png@webp",
              alt: "Gates of Betwin game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/a9543422-ad8e-4fe2-aec9-0eb1222cec4d_vertical.png@webp",
              alt: "Betwin Billion Bonanza game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/7d68e39b-1fa1-4e97-961f-c1d0838f50f4_vertical.png@webp",
              alt: "Gates of Lucky game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/d1b9c45c-65ba-4657-81b3-cbc58aa69028_vertical.png@webp",
              alt: "Golden Win: Hold&Win game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/bfgames/595e6e97-2c32-4a4a-8909-e062143c7386_vertical.png@webp",
              alt: "Heart of Betwin game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/spinomenal/63de9afb-ad0c-4c21-a035-56fecf7ea8b9_vertical.png@webp",
              alt: "Spins Queen game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/89f1297d-98e0-4d09-a7fa-bf2019774358_vertical.png@webp",
              alt: "Plinko Betwin game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/bfgames/07108453-f3aa-47ac-b183-b8dd93bed292_vertical.png@webp",
              alt: "Betwin Crown game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/5d27f48e-cf88-47ed-9cc1-3a76510ac61d_vertical.png@webp",
              alt: "Betwin Bonanza game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/66e704df-ba41-4a2c-a3b1-383f6e436629_vertical.png@webp",
              alt: "Veggie Lab game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/6bb02b82-9af8-47b5-8042-a26df3047360_vertical.png@webp",
              alt: "Lucky Scarab Claw: Wild Respins Betwin game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/mrslotty/20c95268-ecb1-46a3-a0d6-e23148072d4e_vertical.png@webp",
              alt: "Betwin Girls game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/fundist/09e02e31-421a-458e-b7fd-c927d6d4f6a7_vertical.png@webp",
              alt: "Betwin Thor’s Rage game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/974c8e37-73be-4a7d-aa21-b7763b2acbb3_vertical.png@webp",
              alt: "Betwin Fruits, Coins & Claw game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/d015d2a3-88ff-4183-acc1-324161b709fe_vertical.png@webp",
              alt: "Betwin Merge Up game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/b20f4f2c-7daf-4ed9-9752-be4cb22021d6_vertical.png@webp",
              alt: "Betwin Fortune Double game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/1fd4b880-0dc1-4f66-acd0-fb1f6fdba6d2_vertical.png@webp",
              alt: "Meta Crash Betwin game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/infingames/54d9edc3-b6a5-4995-aa7b-e61edb53fdcc_vertical.png@webp",
              alt: "Thunder Birds game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/75efb6db-f083-4493-b32d-261ea519331c_vertical.png@webp",
              alt: "Burn1win game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/infingames/3a542bbb-b03d-4632-b94b-ad1264c47a9e_vertical.jpg@webp",
              alt: "Bad Babushkas game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/06f23941-29ae-4358-9650-06a507a3ee3b_vertical.png@webp",
              alt: "Betwin Million game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/9b79c624-f877-42a0-9d34-385080bad7a9_vertical.png@webp",
              alt: "Betwin Penalty Shoot-Out game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
          ]}
          showViewAll={true}
          viewAllText="View all"
          gamesCountText="46 games"
        />
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/210094/2894a17f-688f-4ab0-85a3-d12850b67e07.svg"
          headerTitle="Cricket"
          headerAlt="Cricket"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/2a04d425-1a08-4f8d-adb4-12a680d8efb1_vertical.png@webp",
              alt: "Cricket King 18 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/fundist/996da992-09fa-4636-907f-820ca00ce223_vertical.jpg@webp",
              alt: "Cricket Star game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/softswiss/47ec828e-555f-4d6c-886f-b54dc935f45e_vertical.jpg@webp",
              alt: "Cricket X game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/d8076249-12f2-4491-84a4-858f7c3587f2_vertical.png@webp",
              alt: "Cricket Sah 75 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/fundist/754158c6-eb55-4bbf-849e-61c74f8e9f11_vertical.jpg@webp",
              alt: "Cricket Auto Roulette game",
              languageIconSrc:
                "https://1win.com/resources/v1/shared/images/languages/en-GB.svg",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/softswiss/93c5fe65-28fb-4649-ac12-076ccde5db2f_vertical.png@webp",
              alt: "Cricketer X game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/607017be-96aa-4f80-9b03-deabb8940ca5_vertical.png@webp",
              alt: "Crash Cricket game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/969fca8a-07be-4473-8940-6e2ec72395ea_vertical.jpg@webp",
              alt: "Cricket Roulette game",
            },
          ]}
        />
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/19/e7934097-f352-4b47-8268-fed7ea6f0405.svg"
          headerTitle="Bonus buy"
          headerAlt="Bonus buy"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/bc0e8a47-49ee-4f2d-88af-a879ac7a5c67_vertical.png@webp",
              alt: "Gates of Olympus 1000 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/d7fb57b7-a0cb-4729-a257-f46a8a70adcd_vertical.png@webp",
              alt: "5 Lions Megaways 2 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/d29c15ab-8ae9-4294-9a5f-a607c9896d0f_vertical.png@webp",
              alt: "Money Train 3 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/76dccb03-b1bf-40ea-9e5a-8032079eb716_vertical.png@webp",
              alt: "Tombstone R.I.P. game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/fundist/19e6c1b6-76d2-4a2e-8cbe-7fdf8aae52bf_vertical.jpg@webp",
              alt: "Temple of Paw game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/ba995b05-0d1e-4521-ac35-932fb194d158_vertical.png@webp",
              alt: "Mental game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/c6a455a5-e840-44d5-af9c-c368be870ea1_vertical.png@webp",
              alt: "Sweet Bonanza 1000 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/ecd5e5b8-d220-4d20-95bb-8a4b37da761d_vertical.png@webp",
              alt: "Madame Destiny Megaways game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/3da673ed-1ad2-46a4-b658-f1c497f961db_vertical.png@webp",
              alt: "Majestic King game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/66e704df-ba41-4a2c-a3b1-383f6e436629_vertical.png@webp",
              alt: "Veggie Lab game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/ca3142b4-3ed1-4a68-bdb3-b6ead8ab9b1a_vertical.png@webp",
              alt: "Sticky Wild: Farm 51 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/endorphina/a0c1dbb8-9627-4a45-b4e9-a0beb9aa83b9_vertical.png@webp",
              alt: "Prestige Crown game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/b2560a32-faa2-4d90-adb4-3ac3904ce104_vertical.png@webp",
              alt: "Storm VS Fire game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/f24fa49e-8613-4a07-acae-65aa1d87cecf_vertical.png@webp",
              alt: "Star Trek The Next Generation game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/f0e07d20-f6a2-4f87-a689-8c7144f5046f_vertical.png@webp",
              alt: "Magma Strike: Blazing Jackpots game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/e7ae9352-771f-4a3c-9086-c45b1dff5459_vertical.png@webp",
              alt: "Big Bass Splash 1000 game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/ebb5321a-c3bb-4a22-90d7-37f344f0c697_vertical.png@webp",
              alt: "Wild Cash game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/softswiss/582e83f5-200c-46f7-a326-80ee41e42673_vertical.jpg@webp",
              alt: "Book Of Ancients game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/ad45e38b-8f95-49fa-b77e-64e864a435fc_vertical.jpg@webp",
              alt: "Ultra Reels Fruteria game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/ff4bc1c2-d170-4520-bc93-f5d141583f9d_vertical.png@webp",
              alt: "Battle Rage game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/1bc3e245-910c-4d45-aa73-6ba4659eaddf_vertical.png@webp",
              alt: "Fruits of Horus game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/a7afbbae-e347-4416-8181-c8539b3734fc_vertical.jpg@webp",
              alt: "Mr. Null's Wicked Wares game",
              overlayVariant:
                "absolute bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 rounded-xl inset-0 md:rounded-2xl",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/40c8acbe-d463-41dc-9a1f-94b3144f9d95_vertical.jpg@webp",
              alt: "Tombstone Begins game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/c800ba9a-b908-429d-b881-f288f69cee1d_vertical.jpg@webp",
              alt: "Heartbreakers game",
            },
          ]}
          showViewAll={true}
          viewAllText="View all"
          gamesCountText="3,707 games"
        />
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/260/b7199c3a-e5f6-436e-b2be-a63b1525a0b3.svg"
          headerTitle="Bonus Wagering"
          headerAlt="Bonus Wagering"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/3152e3bf-2896-4ed7-8edb-5fa8db942622_vertical.png@webp",
              alt: "Zeus vs Hades – Gods of War game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/6196710b-ea0b-42f8-97e9-f1f236f47dea_vertical.png@webp",
              alt: "The Dog House Megaways game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/f5a15494-821b-4413-9eeb-6a51396f8387_vertical.png@webp",
              alt: "Sugar Rush 1000 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/8277e56b-8ca8-40f2-a300-03b57859eca7_vertical.png@webp",
              alt: "House of Sins game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/5df5875d-e0ed-48b7-a29d-45cd977697e1_vertical.png@webp",
              alt: "3x5 Hold The Spin game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/48fa775e-1000-4fa5-bc34-6307183e6466_vertical.png@webp",
              alt: "Fortune Gems 2 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/d2e082ed-8cd5-45a4-a1af-425ef2e9bfd8_vertical.png@webp",
              alt: "The Dog House game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/b63fdb20-8233-47d6-a35b-a8bd375731b8_vertical.png@webp",
              alt: "Sweet Bonanza Super Scatter game",
            },
          ]}
          showViewAll
          viewAllText="View all"
          gamesCountText="2,628 games"
        />
        <GameSection
          headerImageUrl="https://1win.com/resources/v1/optimizeimages/unsafe/casino_category_icon_x2/plain/https://v1.bundlecdn.com/casino-images/1/categories/4/9350d6ed-7c76-47b1-86bd-e903adb37cca.svg"
          headerTitle="New"
          headerAlt="New"
          allGamesText="All games"
          allGamesIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-26.svg"
          allGamesIconAlt="Icon"
          prevIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-24.svg"
          prevIconAlt="Icon"
          nextIconSrc="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-25.svg"
          nextIconAlt="Icon"
          games={[
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/b884eeba-0d73-463e-9463-b9282ff90614_vertical.png@webp",
              alt: "The Big Dog House game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/7d4f7d2f-5da7-4bf2-8972-47130b8778a0_vertical.jpg@webp",
              alt: "Sloth Game game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/18aac69d-8a23-4873-97bd-c39b39ae9d4f_vertical.png@webp",
              alt: "Lucky Penny Power Scatter game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/c31dd50b-f172-44bf-a3a1-6f68e8d4b8fa_vertical.jpg@webp",
              alt: "Sweet Bonanza 2500 game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/c6da2606-f368-4f31-a17c-cf3dea8368a8_vertical.png@webp",
              alt: "Thor Power: Whack & Win game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/30b67226-fa2c-4978-af86-5593a1d2d447_vertical.jpg@webp",
              alt: "Launch to Riches game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/ba380d11-5528-41e5-8d37-97e0e1c0301f_vertical.jpg@webp",
              alt: "Cash'n Spins 27 Plus game",
            },
            {
              href: "#",
              imageSrc:
                "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/40c8acbe-d463-41dc-9a1f-94b3144f9d95_vertical.jpg@webp",
              alt: "Tombstone Begins game",
            },
          ]}
          showViewAll
          viewAllText="View all"
          gamesCountText="109 games"
          showBottomDivider
        />
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"></div>
        <AllGamesSection />
      </div>
    </div>
  );
};
