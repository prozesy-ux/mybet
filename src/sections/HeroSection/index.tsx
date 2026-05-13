import { HeroCarousel } from "@/sections/HeroSection/components/HeroCarousel";
import { FeaturedGameCard } from "@/sections/HeroSection/components/FeaturedGameCard";

export const HeroSection = () => {
  return (
    <div className="box-border caret-transparent gap-x-4 grid [grid-template-areas:'a_b'] grid-cols-[67%_auto] grid-rows-[auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-4">
      <HeroCarousel />
      <FeaturedGameCard />
    </div>
  );
};
