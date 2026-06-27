import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { userApi } from "@/services/userApi";

export const SportsPage = () => {
  const { isAuthenticated } = useAuth();
  const [portfolio, setPortfolio] = useState<"SportsBook" | "568WinSportsbook">("SportsBook");
  const [launchUrl, setLaunchUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const launchSports = async () => {
    setLoading(true);
    setError("");
    try {
      const result = isAuthenticated
        ? await userApi.launchSportsbook({ portfolio })
        : await userApi.launchSportsbookPublic({ portfolio });
      setLaunchUrl(result.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to launch sportsbook.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || launchUrl || loading) {
      return;
    }
    void launchSports();
  }, [isAuthenticated]);

  return (
    <div className="h-full w-full bg-[#141415]">
      <div className="mx-auto flex h-full w-full max-w-[420px] md:max-w-[1640px] flex-col gap-3 px-3 py-2 md:px-4 md:py-3">
        <div className="flex flex-col gap-2 rounded-xl border border-[#2b2d30] bg-[#1b1c1f] px-3 py-2 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-[#a7abb3] md:text-sm">
            {loading
                ? "Loading live sports provider..."
                : error
                  ? error
                  : isAuthenticated
                    ? "Live sports provider loaded with user wallet"
                    : "Live sports provider loaded in guest mode"}
          </div>
          <div className="flex w-full gap-2 md:w-auto">
            <select
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value as "SportsBook" | "568WinSportsbook")}
              className="w-full rounded-md border border-[#32353a] bg-[#101113] px-2 py-1 text-xs text-[#d0d5dd] outline-none md:w-auto"
            >
              <option value="SportsBook">SportsBook</option>
              <option value="568WinSportsbook">568WinSportsbook</option>
            </select>
            <button
              onClick={launchSports}
              disabled={loading}
              className="rounded-md border border-[#32353a] bg-[#202228] px-3 py-1 text-xs font-medium text-[#e5e7eb] hover:bg-[#2a2c32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reload Live
            </button>
          </div>
        </div>

        <section className="min-h-0 flex-1 overflow-hidden rounded-xl border border-[#2b2d30] bg-[#0f1013]">
        {launchUrl ? (
          <iframe
            src={launchUrl}
            title="Live Sportsbook"
            className="h-full min-h-[70vh] w-full"
            allow="clipboard-read; clipboard-write; fullscreen"
          />
        ) : (
          <div className="flex h-full min-h-[70vh] items-center justify-center px-6 text-center text-[#8f96a3]">
            Launching live sports provider...
          </div>
        )}
        </section>
      </div>
    </div>
  );
};
