import { useEffect, useState } from "react";
import { userApi } from "@/services/userApi";
import { API_BASE } from "@/services/apiBase";

interface CasinoGame {
  id: number;
  title: string;
  image_url: string;
  game_url: string;
  provider?: string | null;
  gp_id?: number | null;
  upstream_game_id?: number | null;
}

const cardInner =
  "absolute box-border caret-transparent outline-[3px] border overflow-hidden rounded-xl border-solid border-transparent inset-0 md:rounded-2xl after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:-inset-px after:font-inter after:md:rounded-2xl";

export const AllGamesGrid = () => {
  const [games, setGames] = useState<CasinoGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [launchingId, setLaunchingId] = useState<number | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("all");
  const [embeddedGameUrl, setEmbeddedGameUrl] = useState<string>("");
  const [embeddedGameTitle, setEmbeddedGameTitle] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_BASE}/api/casino-games`)
      .then((r) => r.json())
      .then((data: CasinoGame[]) => {
        setGames(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError("Failed to load live games.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
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

  if (error) {
    return (
      <div className="rounded-xl border border-[#4e1f26] bg-[#2a0f14] px-4 py-6 text-center text-sm text-[#ffc8d0]">
        {error}
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="rounded-xl border border-[#1f3045] bg-[#0d1a2a] px-4 py-6 text-center text-sm text-[#7aaad0]">
        No live provider games are available yet.
      </div>
    );
  }

  const launchGame = async (gameId: number, gameTitle: string) => {
    if (launchingId === gameId) {
      return;
    }
    try {
      setLaunchingId(gameId);
      const result = await userApi.launchCasinoGame(gameId);
      if (result?.url) {
        setEmbeddedGameUrl(result.url);
        setEmbeddedGameTitle(gameTitle);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to open this game right now.";
      window.alert(message);
    } finally {
      setLaunchingId(null);
    }
  };

  const providers = Array.from(
    new Set(games.map((g) => String(g.provider || "Unknown").trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const visibleGames =
    selectedProvider === "all"
      ? games
      : games.filter((g) => String(g.provider || "Unknown").trim() === selectedProvider);

  return (
    <div className="space-y-3">
      {providers.length > 1 ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedProvider("all")}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              selectedProvider === "all"
                ? "border-[#29b6f6] bg-[#10344a] text-[#c6ecff]"
                : "border-[#1f3045] bg-[#0d1a2a] text-[#7aaad0] hover:border-[#2d4a67]"
            }`}
          >
            All Providers ({games.length})
          </button>
          {providers.map((provider) => {
            const count = games.filter((g) => String(g.provider || "Unknown").trim() === provider).length;
            const active = selectedProvider === provider;
            return (
              <button
                key={provider}
                type="button"
                onClick={() => setSelectedProvider(provider)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? "border-[#29b6f6] bg-[#10344a] text-[#c6ecff]"
                    : "border-[#1f3045] bg-[#0d1a2a] text-[#7aaad0] hover:border-[#2d4a67]"
                }`}
              >
                {provider} ({count})
              </button>
            );
          })}
        </div>
      ) : null}

      {visibleGames.length === 0 ? (
        <div className="rounded-xl border border-[#1f3045] bg-[#0d1a2a] px-4 py-6 text-center text-sm text-[#7aaad0]">
          No games found for this provider.
        </div>
      ) : null}

      <div className="box-border caret-transparent gap-x-2 grid grid-cols-[repeat(3,1fr)] outline-[3px] gap-y-2 mb-4 md:gap-x-4 md:grid-cols-[repeat(6,1fr)] md:gap-y-4 md:mb-5">
        {visibleGames.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => void launchGame(g.id, g.title)}
            disabled={launchingId === g.id}
            className="box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-2"
            title={g.title}
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
          </button>
        ))}
      </div>

      {embeddedGameUrl ? (
        <div className="fixed inset-0 z-[1200] bg-black/90 p-2 md:p-4">
          <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#2b2d30] bg-[#0b0c10]">
            <div className="flex items-center justify-between border-b border-[#22252c] px-3 py-2 md:px-4">
              <div className="truncate text-sm font-semibold text-[#e5e7eb] md:text-base">{embeddedGameTitle || "Live Casino Game"}</div>
              <button
                type="button"
                onClick={() => {
                  setEmbeddedGameUrl("");
                  setEmbeddedGameTitle("");
                }}
                className="rounded-md border border-[#31353d] bg-[#171a21] px-3 py-1 text-xs font-semibold text-[#e5e7eb] hover:bg-[#202631]"
              >
                Close
              </button>
            </div>
            <iframe
              src={embeddedGameUrl}
              title={embeddedGameTitle || "Casino Game"}
              className="h-full w-full"
              allow="clipboard-read; clipboard-write; fullscreen"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
