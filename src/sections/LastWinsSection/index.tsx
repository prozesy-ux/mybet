import { LastWinsHeader } from "@/sections/LastWinsSection/components/LastWinsHeader";
import { LastWinsTicker } from "@/sections/LastWinsSection/components/LastWinsTicker";

export const LastWinsSection = () => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
      <div className="box-border caret-transparent flex flex-col outline-[3px]">
        <LastWinsHeader />
        <LastWinsTicker />
      </div>
    </div>
  );
};
