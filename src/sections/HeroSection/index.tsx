import { HeroCarousel } from "@/sections/HeroSection/components/HeroCarousel";
import { FeaturedGameCard } from "@/sections/HeroSection/components/FeaturedGameCard";

export const HeroSection = () => {
  return (
    <div className="box-border caret-transparent gap-x-3 grid grid-cols-1 grid-rows-[auto_auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 md:gap-x-4 md:[grid-template-areas:'a_b'] md:grid-cols-[67%_auto] md:grid-rows-[auto] md:gap-y-4">
      <HeroCarousel />
      <FeaturedGameCard />
    </div>
  );
};
