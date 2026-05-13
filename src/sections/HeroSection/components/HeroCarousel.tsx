import { useMemo, useState } from "react";

type Slide = {
  title: string;
  cta: string;
  href: string;
  imageSrc: string;
};

const slides: Slide[] = [
  {
    title: "EUR 15,000 in Endorphina tournament",
    cta: "Participate",
    href: "#",
    imageSrc:
      "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/3916a405-a9e7-43be-b12c-cfd2082a5237_vertical.png@webp",
  },
  {
    title: "EUR 12,000,000 in Spinoleague",
    cta: "Participate",
    href: "#",
    imageSrc:
      "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/27c65015-b02d-4aae-831c-e7c8d49807a8_vertical.png@webp",
  },
  {
    title: "EUR 25,000,000 in Drops and Wins",
    cta: "Participate",
    href: "#",
    imageSrc:
      "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/b460e597-4f0b-42eb-96bc-33c744e3bbb3_vertical.png@webp",
  },
  {
    title: "EUR 4,000,000 in Aviatrix tournament",
    cta: "Claim",
    href: "#",
    imageSrc:
      "https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/5c706591-f348-4a33-b2ba-b0b152ddb4a8_vertical.png@webp",
  },
];

export const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative aspect-[2.625_/_1] shadow-[rgba(179,182,189,0.12)_0px_0px_0px_1px] box-border caret-transparent flex flex-col col-end-[a] col-start-[a] row-end-[a] row-start-[a] max-w-full min-h-[auto] outline-[3px] overflow-hidden rounded-[20px] md:rounded-3xl">
      <img
        src={activeSlide.imageSrc}
        alt={activeSlide.title}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/15" />

      <div className="absolute inset-0 p-5 md:p-[35px] flex flex-col justify-between">
        <h2 className="text-white text-base font-extrabold tracking-[0.33px] leading-5 max-w-[420px] md:text-[33px] md:leading-[38px]">
          {activeSlide.title}
        </h2>

        <a
          href={activeSlide.href}
          className="relative text-black text-sm font-semibold block w-fit rounded-xl"
        >
          <div className="relative bg-white h-11 px-5 rounded-xl">
            <div className="items-center gap-x-2 flex h-full justify-center text-nowrap">
              <div>{activeSlide.cta}</div>
            </div>
          </div>
        </a>
      </div>

      <div className="absolute bg-[radial-gradient(100%_100%_at_100%_100%,rgb(0,0,0)_21.54%,rgba(0,0,0,0)_100%)] box-border caret-transparent flex h-[88px] opacity-100 outline-[3px] pointer-events-none w-[150px] z-[1] overflow-hidden p-4 rounded-br-3xl right-0 bottom-0">
        <div className="bg-white/20 box-border caret-transparent gap-x-[5px] flex min-h-[auto] min-w-[auto] outline-[3px] pointer-events-auto gap-y-[5px] ml-auto mt-auto p-[5px] rounded-xl">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="text-white/60 items-center bg-white/30 flex h-[35px] justify-center min-h-[auto] min-w-[auto] text-center w-[35px] rounded-lg"
          >
            <img
              src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-20.svg"
              alt="Previous"
              className="h-4 opacity-90 w-4"
            />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="text-white/60 items-center bg-white/30 flex h-[35px] justify-center min-h-[auto] min-w-[auto] text-center w-[35px] rounded-lg"
          >
            <img
              src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-21.svg"
              alt="Next"
              className="h-4 opacity-90 w-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
