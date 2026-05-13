import { TournamentHeader } from "@/sections/TournamentSection/components/TournamentHeader";
import { TournamentCarousel } from "@/sections/TournamentSection/components/TournamentCarousel";

export const TournamentSection = () => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
      <div className="box-border caret-transparent flex flex-col outline-[3px]">
        <TournamentHeader />
        <TournamentCarousel />
      </div>
    </div>
  );
};
