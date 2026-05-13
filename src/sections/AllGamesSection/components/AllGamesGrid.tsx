import { useEffect, useState } from "react";

const API_BASE = (import.meta as { env: Record<string, string> }).env?.VITE_API_BASE_URL || "http://localhost:3001";

interface CasinoGame {
  id: number;
  title: string;
  image_url: string;
  game_url: string;
}

const cardInner =
  "absolute box-border caret-transparent outline-[3px] border overflow-hidden rounded-xl border-solid border-transparent inset-0 md:rounded-2xl after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:-inset-px after:font-inter after:md:rounded-2xl";

export const AllGamesGrid = () => {
  const [games, setGames] = useState<CasinoGame[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/casino-games`)
      .then((r) => r.json())
      .then((data: CasinoGame[]) => setGames(data))
      .catch(() => null);
  }, []);

  if (!games.length) {
    return (
      <div className="box-border caret-transparent gap-x-2 grid grid-cols-[repeat(3,1fr)] outline-[3px] gap-y-2 mb-4 md:gap-x-4 md:grid-cols-[repeat(6,1fr)] md:gap-y-4 md:mb-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
            <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-neutral-800 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="box-border caret-transparent gap-x-2 grid grid-cols-[repeat(3,1fr)] outline-[3px] gap-y-2 mb-4 md:gap-x-4 md:grid-cols-[repeat(6,1fr)] md:gap-y-4 md:mb-5">
      {games.map((g) => (
        <a
          key={g.id}
          href={g.game_url || "#"}
          className="box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-2"
        >
          <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] pb-[133.33%]">
            <div className={cardInner}>
              <picture className="items-center box-border caret-transparent flex h-full justify-center outline-[3px] w-full overflow-hidden">
                <img
                  src={g.image_url}
                  alt={`${g.title} game`}
                  className="box-border caret-transparent h-full min-h-[auto] min-w-[auto] object-cover outline-[3px] align-baseline w-full scale-[1.01]"
                />
              </picture>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
