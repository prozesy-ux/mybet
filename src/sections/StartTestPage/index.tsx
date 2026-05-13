import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { userApi, type UserBet, type UserProfileStats, type UserTransaction } from "@/services/userApi";

export const StartTestPage = () => {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [health, setHealth] = useState<string>("checking...");
  const [stats, setStats] = useState<UserProfileStats | null>(null);
  const [tx, setTx] = useState<UserTransaction[]>([]);
  const [bets, setBets] = useState<UserBet[]>([]);
  const [log, setLog] = useState<string>("");
  const [betAmount, setBetAmount] = useState("50");
  const [betOdds, setBetOdds] = useState("2.0");
  const [gameName, setGameName] = useState("Aviator");

  const loadAll = async () => {
    try {
      const h = await userApi.health();
      setHealth(`${h.status} @ ${new Date(h.timestamp).toLocaleString()}`);
    } catch (e) {
      setHealth(`error: ${e instanceof Error ? e.message : "failed"}`);
    }

    if (!isAuthenticated) {
      setStats(null);
      setTx([]);
      setBets([]);
      return;
    }

    try {
      const [s, t, b] = await Promise.all([
        userApi.profileStats(),
        userApi.transactions(),
        userApi.bets(),
      ]);
      setStats(s);
      setTx(t.slice(0, 10));
      setBets(b.slice(0, 10));
    } catch (e) {
      setLog(e instanceof Error ? e.message : "load failed");
    }
  };

  useEffect(() => {
    void loadAll();
  }, [isAuthenticated]);

  const placeBet = async () => {
    setLog("");
    try {
      const result = await userApi.placeBet({
        amount: Number(betAmount),
        odds: Number(betOdds),
        game_name: gameName,
        metadata: { source: "start-test-page" },
      });
      await refreshUser();
      await loadAll();
      setLog(`${result.message} | bet #${result.bet.id} | balance ${result.balance}`);
    } catch (e) {
      setLog(e instanceof Error ? e.message : "bet failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#07101c] text-[#dbeafe] p-6 font-inter">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Start Test Page (Real Database)</h1>
        <p className="text-sm text-[#93c5fd]">Live checks for API connection, real balance, transactions and betting.</p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-[#1e3a5f] bg-[#0b1730] p-4">
            <p className="text-xs text-[#93c5fd] uppercase">API Health</p>
            <p className="mt-2 text-sm">{health}</p>
          </div>
          <div className="rounded-xl border border-[#1e3a5f] bg-[#0b1730] p-4">
            <p className="text-xs text-[#93c5fd] uppercase">Auth User</p>
            <p className="mt-2 text-sm">{isAuthenticated ? `${user?.email} (id ${user?.id})` : "Not logged in"}</p>
          </div>
          <div className="rounded-xl border border-[#1e3a5f] bg-[#0b1730] p-4">
            <p className="text-xs text-[#93c5fd] uppercase">Real Balance</p>
            <p className="mt-2 text-2xl font-bold">BDT {Number(user?.balance || 0).toFixed(2)}</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#1e3a5f] bg-[#0b1730] p-4 space-y-3">
          <h2 className="font-semibold text-lg">Live Bet Test</h2>
          <div className="grid md:grid-cols-4 gap-3">
            <input value={gameName} onChange={(e) => setGameName(e.target.value)} className="rounded border border-[#1e3a5f] bg-[#061126] px-3 py-2" placeholder="Game name" />
            <input value={betAmount} onChange={(e) => setBetAmount(e.target.value)} className="rounded border border-[#1e3a5f] bg-[#061126] px-3 py-2" placeholder="Amount" />
            <input value={betOdds} onChange={(e) => setBetOdds(e.target.value)} className="rounded border border-[#1e3a5f] bg-[#061126] px-3 py-2" placeholder="Odds" />
            <button onClick={() => void placeBet()} className="rounded bg-[#2563eb] hover:bg-[#1d4ed8] px-3 py-2 font-semibold">Place Real Bet</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void refreshUser()} className="rounded border border-[#1e3a5f] px-3 py-2">Refresh Balance</button>
            <button onClick={() => void loadAll()} className="rounded border border-[#1e3a5f] px-3 py-2">Reload All Data</button>
          </div>
          {log ? <p className="text-sm text-[#fbbf24]">{log}</p> : null}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#1e3a5f] bg-[#0b1730] p-4">
            <h3 className="font-semibold mb-2">Profile Stats</h3>
            {!stats ? <p className="text-sm text-[#93c5fd]">No stats (login required)</p> : (
              <div className="text-sm space-y-1">
                <p>Total Deposits: {stats.stats.totalDeposit}</p>
                <p>Total Withdrawals: {stats.stats.totalWithdrawal}</p>
                <p>Total Transactions: {stats.stats.totalTransactions}</p>
                <p>Total Bets: {stats.stats.totalBets}</p>
                <p>Win Rate: {(stats.stats.winRate * 100).toFixed(2)}%</p>
                <p>High Gainer: {String(stats.highGainer)}</p>
                <p>Suspicious: {String(stats.suspicious)}</p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-[#1e3a5f] bg-[#0b1730] p-4">
            <h3 className="font-semibold mb-2">Recent Transactions</h3>
            <div className="text-sm space-y-1 max-h-64 overflow-auto">
              {tx.map((t) => (
                <p key={t.id}>#{t.id} {t.type} {t.amount} {t.status}</p>
              ))}
              {tx.length === 0 ? <p className="text-[#93c5fd]">No transactions</p> : null}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#1e3a5f] bg-[#0b1730] p-4">
          <h3 className="font-semibold mb-2">Recent Bets</h3>
          <div className="text-sm space-y-1 max-h-64 overflow-auto">
            {bets.map((b) => (
              <p key={b.id}>#{b.id} {b.game_name || "Unknown"} stake {b.amount} odds {b.odds} status {b.status}</p>
            ))}
            {bets.length === 0 ? <p className="text-[#93c5fd]">No bets</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
