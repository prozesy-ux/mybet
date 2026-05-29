import { useEffect, useMemo, useState, useCallback, type ReactNode } from "react";
import {
  adminApi, adminTokenStore,
  type AdminBet, type AdminBonus, type AdminSummary,
  type AdminTransaction, type AdminUser, type AdminUserInsight, type BillingOverview,
  type CasinoGame, type ContentItem, type ContentSection, type GameProvider,
  type PaymentMethod, type SeoPage, type SiteSetting,
} from "@/services/adminApi";
import {
  Activity, AlertCircle, Bell, Check, ChevronDown, ChevronRight,
  Copy, CreditCard, Cpu, DollarSign, Eye, FileText, Gamepad2, Gift, Globe,
  LayoutDashboard, Layers, Lock, LogOut, Pencil, RefreshCw,
  Search, Settings, ShieldAlert, Trash2, TrendingDown, TrendingUp,
  UserCheck, Users, Wallet, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type MenuKey =
  | "dashboard" | "users" | "bets" | "billing" | "payments"
  | "content" | "providers" | "seo" | "settings" | "risk" | "bonuses" | "casino";

interface MenuItem { key: MenuKey; label: string; sub: string; icon: LucideIcon }

const ALL_ITEMS: MenuItem[] = [
  { key: "dashboard", label: "Dashboard",    sub: "Core KPIs",            icon: LayoutDashboard },
  { key: "users",     label: "Users",         sub: "Account control",      icon: Users           },
  { key: "bets",      label: "Bets",          sub: "Settlement desk",      icon: Activity        },
  { key: "billing",   label: "Billing",       sub: "Deposits/withdrawals", icon: CreditCard      },
  { key: "payments",  label: "Payments",      sub: "Gateways & limits",    icon: Wallet          },
  { key: "bonuses",   label: "Bonuses",       sub: "Promo controls",       icon: Gift            },
  { key: "content",   label: "Content",       sub: "Site sections",        icon: FileText        },
  { key: "casino",    label: "Casino Games",  sub: "Game catalog",         icon: Gamepad2        },
  { key: "providers", label: "Game APIs",     sub: "Third-party APIs",     icon: Cpu             },
  { key: "seo",       label: "SEO",           sub: "Meta & indexing",      icon: Globe           },
  { key: "settings",  label: "Customization", sub: "Site config",          icon: Settings        },
  { key: "risk",      label: "Risk Monitor",  sub: "Fraud & exposure",     icon: ShieldAlert     },
];

const itemByKey = (k: MenuKey) => ALL_ITEMS.find((i) => i.key === k)!;

interface SidebarGroup { label: string; icon: LucideIcon; keys: MenuKey[] }

const GROUPS: SidebarGroup[] = [
  { label: "User Management",     icon: Users,       keys: ["users"] },
  { label: "Game Management",     icon: Activity,    keys: ["bets", "casino", "providers"] },
  { label: "Financial",           icon: CreditCard,  keys: ["billing", "payments", "bonuses"] },
  { label: "Promotion & Content", icon: FileText,    keys: ["content", "seo"] },
  { label: "Site Configuration",  icon: Settings,    keys: ["settings", "risk"] },
];

const fmtDate = (v: string | null) => v ? new Date(v).toLocaleString() : "—";
const fmtMoney = (v: string | number | null | undefined) => Number(v || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const toCsvCell = (value: unknown) => {
  const raw = String(value ?? "");
  if (raw.includes(",") || raw.includes("\n") || raw.includes("\"")) {
    return `"${raw.replace(/\"/g, '""')}"`;
  }
  return raw;
};

const downloadTextFile = (name: string, content: string, mime = "text/plain;charset=utf-8") => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

// ─── Primitive UI ─────────────────────────────────────────────────────────────

const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-[22px] w-10 shrink-0 items-center rounded-full transition-colors focus:outline-none ${on ? "bg-[#1d4ed8]" : "bg-[#1e3050]"}`}
  >
    <span className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow transition-transform ${on ? "translate-x-[20px]" : "translate-x-[2px]"}`} />
  </button>
);

const Checkbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    type="button"
    onClick={onChange}
    className={`h-4 w-4 shrink-0 rounded border transition-colors focus:outline-none ${checked ? "border-[#1d4ed8] bg-[#1d4ed8]" : "border-[#2a4060] bg-[#080f1a]"}`}
  >
    {checked && <Check size={11} className="text-white" />}
  </button>
);

const Badge = ({ value }: { value: string }) => {
  const v = value.toLowerCase();
  let cls = "bg-[#1a2d50] text-[#7aadff] border-[#243f72]";
  if (v === "active" || v === "completed" || v === "won" || v === "deposit")
    cls = "bg-[#0b2d20] text-[#4ade80] border-[#134d35]";
  else if (v === "blocked" || v === "cancelled" || v === "lost")
    cls = "bg-[#321520] text-[#f87171] border-[#542030]";
  else if (v === "withdrawal") cls = "bg-[#2d1e0a] text-[#fb923c] border-[#4a3012]";
  else if (v === "pending")    cls = "bg-[#251e08] text-[#fbbf24] border-[#3f3210]";
  else if (v === "inactive" || v === "used") cls = "bg-[#151c2a] text-[#5a7090] border-[#222f42]";
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[11px] font-medium ${cls}`}>
      {value}
    </span>
  );
};

const MetricCard = ({ title, value, icon: Icon, color = "blue" }: {
  title: string; value: string | number; icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "orange" | "red" | "cyan";
}) => {
  const C = {
    blue:   { w: "bg-[#0c2145] ring-[#193870]", i: "text-[#60a5fa]" },
    green:  { w: "bg-[#092a1c] ring-[#124d33]", i: "text-[#4ade80]" },
    purple: { w: "bg-[#1a0e40] ring-[#321a78]", i: "text-[#a78bfa]" },
    orange: { w: "bg-[#251608] ring-[#4a2c10]", i: "text-[#fb923c]" },
    red:    { w: "bg-[#280a0a] ring-[#4d1515]", i: "text-[#f87171]" },
    cyan:   { w: "bg-[#071e2a] ring-[#0d3d52]", i: "text-[#22d3ee]" },
  }[color];
  return (
    <div className="rounded-xl border border-[#1c2e45] bg-[#0d1928] p-4 flex items-start gap-3">
      <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${C.w}`}>
        <Icon size={18} className={C.i} />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3d5878]">{title}</p>
        <p className="mt-1 text-2xl font-bold text-[#deeeff] tabular-nums leading-none">{value}</p>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3d5878]">{label}</label>
    {children}
  </div>
);

const inp = "w-full rounded-lg border border-[#1c2e45] bg-[#060d18] px-3 py-2 text-sm text-[#b8d0f0] placeholder-[#2a3f58] outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/20 transition-colors";
const pBtn = "rounded-lg bg-[#1d4ed8] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1a45c4] transition-colors disabled:opacity-50";
const sBtn = "rounded-lg border border-[#1c2e45] bg-[#0d1928] px-3 py-2 text-sm font-medium text-[#6a90ba] hover:bg-[#101e30] transition-colors";
const dBtn = "rounded-lg border border-[#4a1f2a] bg-[#1e0a10] px-3 py-2 text-sm font-medium text-[#f87171] hover:bg-[#2a1018] transition-colors";

// Table layout
const Panel = ({ title, filter, toolbar, children, footer }: {
  title?: string; filter?: ReactNode; toolbar?: ReactNode; children: ReactNode; footer?: ReactNode;
}) => (
  <section className="rounded-xl border border-[#1c2e45] bg-[#0d1928] overflow-hidden">
    {(title || toolbar) && (
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#1c2e45]">
        {title && <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#3d5878]">{title}</span>}
        <div className="flex items-center gap-2 ml-auto">{toolbar}</div>
      </div>
    )}
    {filter && (
      <div className="px-4 py-3 border-b border-[#1c2e45] flex flex-wrap items-end gap-3">
        {filter}
      </div>
    )}
    <div className="overflow-x-auto">
      <table className="min-w-full">{children}</table>
    </div>
    {footer && <div className="px-4 py-3 border-t border-[#1c2e45]">{footer}</div>}
  </section>
);

const Th = ({ children }: { children: ReactNode }) => (
  <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3d5878] bg-[#07101c] whitespace-nowrap">
    {children}
  </th>
);
const Td = ({ children }: { children: ReactNode }) => (
  <td className="px-4 py-2.5 text-sm text-[#a8c4e0] whitespace-nowrap">{children}</td>
);
const Tr = ({ selected, children }: { selected?: boolean; children: ReactNode }) => (
  <tr className={`border-t border-[#0f1e30] transition-colors ${selected ? "bg-[#0d2040]" : "hover:bg-[#0a1828]"}`}>
    {children}
  </tr>
);

const Pager = ({ total, page, per, onPage }: { total: number; page: number; per: number; onPage: (p: number) => void }) => {
  const pages = Math.ceil(total / per);
  return (
    <div className="flex items-center gap-3 text-xs text-[#4a6a8e]">
      <span>Total <b className="text-[#7aaad0]">{total}</b> items</span>
      <div className="flex-1" />
      <button disabled={page <= 1} onClick={() => onPage(page - 1)} className="h-7 w-7 flex items-center justify-center rounded border border-[#1c2e45] hover:bg-[#0f1e30] disabled:opacity-40 transition-colors">‹</button>
      {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
        const p = i + 1;
        return (
          <button key={p} onClick={() => onPage(p)} className={`h-7 min-w-[28px] px-1.5 flex items-center justify-center rounded border transition-colors ${page === p ? "border-[#2563eb] bg-[#1d4ed8] text-white" : "border-[#1c2e45] hover:bg-[#0f1e30]"}`}>{p}</button>
        );
      })}
      {pages > 5 && <span>… {pages}</span>}
      <button disabled={page >= pages} onClick={() => onPage(page + 1)} className="h-7 w-7 flex items-center justify-center rounded border border-[#1c2e45] hover:bg-[#0f1e30] disabled:opacity-40 transition-colors">›</button>
      <span className="text-[#3d5878]">{per}/page</span>
    </div>
  );
};

// Action buttons matching TC Gaming style
const AB = {
  copy: (label: string, onClick: () => void) => (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 rounded border border-[#1c2e45] bg-[#0a1624] px-2 py-1 text-[11px] text-[#7aaad0] hover:bg-[#0f1e32] transition-colors">
      <Copy size={10} />{label}
    </button>
  ),
  edit: (onClick: () => void) => (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 rounded border border-[#1c3a60] bg-[#0d2545] px-2 py-1 text-[11px] text-[#5aadff] hover:bg-[#112d55] transition-colors">
      <Pencil size={10} />Edit
    </button>
  ),
  view: (onClick: () => void) => (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 rounded border border-[#1c2e45] bg-[#0a1624] px-2 py-1 text-[11px] text-[#7aaad0] hover:bg-[#0f1e32] transition-colors">
      <Eye size={10} />View
    </button>
  ),
  del: (onClick: () => void) => (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 rounded border border-[#4a1f2a] bg-[#1a080e] px-2 py-1 text-[11px] text-[#f87171] hover:bg-[#250f18] transition-colors">
      <Trash2 size={10} />Delete
    </button>
  ),
};

// ─── Login ────────────────────────────────────────────────────────────────────

const AdminLogin = ({ onSuccess }: { onSuccess: () => void }) => {
  const [user, setUser] = useState("admin9x5");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!user.trim() || !pass.trim()) { setErr("Username and password required"); return; }
    try {
      setLoading(true); setErr("");
      const res = await adminApi.login(user.trim(), pass);
      adminTokenStore.set(res.token);
      onSuccess();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#050c17] flex items-center justify-center px-4"
      style={{ backgroundImage: "radial-gradient(ellipse at 20% 10%, #0d2545 0%, transparent 55%), radial-gradient(ellipse at 80% 85%, #0f1f38 0%, transparent 55%)" }}>
      <div className="w-full max-w-[400px]">
        <div className="mb-7 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0c1f3d] ring-1 ring-[#1b3a6a] mb-3 shadow-xl shadow-black/60">
            <ShieldAlert size={28} className="text-[#3b82f6]" />
          </div>
          <h1 className="text-2xl font-bold text-[#ddeeff] tracking-tight">BETWIN BACKOFFICE</h1>
          <p className="mt-1 text-xs text-[#3d5878]">Admin Console · Restricted Access</p>
        </div>

        <div className="rounded-2xl border border-[#1c2e45] bg-[#0a1624] p-7 shadow-2xl shadow-black/70">
          <div className="space-y-4">
            <Field label="Username">
              <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="admin9x5" className={inp} />
            </Field>
            <Field label="Password">
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••••" className={inp} onKeyDown={(e) => e.key === "Enter" && void submit()} />
            </Field>
            {err && (
              <div className="flex items-center gap-2 rounded-lg border border-[#4a1f2a] bg-[#1e0a10] px-3 py-2">
                <AlertCircle size={13} className="shrink-0 text-[#f87171]" />
                <p className="text-xs text-[#f87171]">{err}</p>
              </div>
            )}
            <button type="button" onClick={() => void submit()} disabled={loading}
              className={`w-full mt-1 ${pBtn} flex items-center justify-center gap-2 py-2.5`}>
              {loading ? <RefreshCw size={14} className="animate-spin" /> : <Lock size={14} />}
              {loading ? "Authenticating…" : "Sign In"}
            </button>
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-[#1e3550]">Route: /admin9x5 · Betwin Operations Platform</p>
      </div>
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [active, setActive] = useState<MenuKey>("dashboard");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(GROUPS.map((g) => g.label)));
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [now, setNow] = useState(new Date());

  // Data
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [billing, setBilling] = useState<BillingOverview | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [bets, setBets] = useState<AdminBet[]>([]);
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [bonuses, setBonuses] = useState<AdminBonus[]>([]);
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [providers, setProviders] = useState<GameProvider[]>([]);
  const [seoPages, setSeoPages] = useState<SeoPage[]>([]);
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [casinoGames, setCasinoGames] = useState<CasinoGame[]>([]);
  const [risk, setRisk] = useState<{
    highOddsBets: number; blockedButBettingUsers: number;
    topPendingExposureUsers: Array<{ id: number; username: string; email: string; exposure: string }>;
  } | null>(null);
  const [selectedUserInsight, setSelectedUserInsight] = useState<AdminUserInsight | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);
  const [insightTxTypeFilter, setInsightTxTypeFilter] = useState<"all" | "deposit" | "withdrawal" | "payout" | "manual">("all");
  const [insightTxStatusFilter, setInsightTxStatusFilter] = useState<"all" | "pending" | "completed" | "cancelled">("all");
  const [insightLoginFilter, setInsightLoginFilter] = useState<"all" | "failed" | "success">("all");
  const [insightGameQuery, setInsightGameQuery] = useState("");

  // Selection
  const [selUsers, setSelUsers] = useState<Set<number>>(new Set());
  const [selBets, setSelBets] = useState<Set<number>>(new Set());
  const [selTx, setSelTx] = useState<Set<number>>(new Set());

  // Pagination
  const [userPage, setUserPage] = useState(1);
  const [betPage, setBetPage] = useState(1);
  const [txPage, setTxPage] = useState(1);
  const [bonusPage, setBonusPage] = useState(1);
  const PER = 10;

  // Forms
  const [userForm, setUserForm] = useState({ username: "", email: "", password: "", balance: "0" });
  const [txForm, setTxForm] = useState({ user_id: "", type: "deposit", amount: "", payment_method: "" });
  const [bonusForm, setBonusForm] = useState({ user_id: "", type: "welcome", amount: "", expires_at: "" });
  const [paymentForm, setPaymentForm] = useState({ name: "", code: "", method_type: "both", provider: "", image_url: "", account_number: "", min_amount: "0", max_amount: "500000", fee_percent: "0" });
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);
  const [providerForm, setProviderForm] = useState({ name: "", api_endpoint: "", api_key: "", supported_sections: "casino,sports" });
  const [seoForm, setSeoForm] = useState({ path: "/", title: "", description: "", keywords: "" });
  const [settingForm, setSettingForm] = useState({ key: "", value: "" });
  const [sectionForm, setSectionForm] = useState({ slug: "", title: "", section_type: "home", sort_order: "0" });
  const [itemForm, setItemForm] = useState({ section_id: "", title: "", subtitle: "", target_url: "", image_url: "", sort_order: "0" });
  const [casinoForm, setCasinoForm] = useState({ title: "", provider: "", category: "slots", image_url: "", game_url: "#", sort_order: "0" });
  const [editingGame, setEditingGame] = useState<CasinoGame | null>(null);
  const [casinoPage, setCasinoPage] = useState(1);

  // Clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const refreshAll = async (silent = false) => {
    if (silent) setRefreshing(true); else setLoading(true);
    setErr("");
    try {
      const [s, b, u, bets, tx, bon, sec, it, pm, prov, seo, set, risk, cg] = await Promise.all([
        adminApi.summary(), adminApi.billingOverview(), adminApi.users(), adminApi.bets(),
        adminApi.transactions(), adminApi.bonuses(), adminApi.contentSections(),
        adminApi.contentItems(), adminApi.paymentMethods(), adminApi.gameProviders(),
        adminApi.seoPages(), adminApi.siteSettings(), adminApi.risk(), adminApi.casinoGames(),
      ]);
      setSummary(s); setBilling(b); setUsers(u); setBets(bets); setTransactions(tx);
      setBonuses(bon); setSections(sec); setItems(it); setPaymentMethods(pm);
      setProviders(prov); setSeoPages(seo); setSettings(set); setRisk(risk); setCasinoGames(cg);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
      if (e instanceof Error && e.message.toLowerCase().includes("token")) onLogout();
    } finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { void refreshAll(); }, []);

  const handle = useCallback(async (fn: () => Promise<void>) => {
    try { setErr(""); await fn(); await refreshAll(true); }
    catch (e) { setErr(e instanceof Error ? e.message : "Operation failed"); }
  }, []);

  const withdrawalsQueue = useMemo(
    () => transactions.filter((t) => t.type === "withdrawal" && t.status === "pending"), [transactions]);
  const pendingBetsCount = useMemo(() => bets.filter((b) => b.status === "pending").length, [bets]);

  const copyText = (t: string) => navigator.clipboard.writeText(t).catch(() => null);

  const filteredInsightTransactions = useMemo(() => {
    if (!selectedUserInsight) return [];
    return selectedUserInsight.recentTransactions.filter((tx) => {
      const typeOk = insightTxTypeFilter === "all" || tx.type === insightTxTypeFilter;
      const statusOk = insightTxStatusFilter === "all" || tx.status === insightTxStatusFilter;
      return typeOk && statusOk;
    });
  }, [selectedUserInsight, insightTxTypeFilter, insightTxStatusFilter]);

  const filteredInsightLogins = useMemo(() => {
    if (!selectedUserInsight) return [];
    return selectedUserInsight.loginAttempts.filter((attempt) => {
      if (insightLoginFilter === "all") return true;
      if (insightLoginFilter === "failed") return !attempt.success;
      return attempt.success;
    });
  }, [selectedUserInsight, insightLoginFilter]);

  const filteredInsightGames = useMemo(() => {
    if (!selectedUserInsight) return [];
    const q = insightGameQuery.trim().toLowerCase();
    if (!q) return selectedUserInsight.gameStats;
    return selectedUserInsight.gameStats.filter((g) => g.game_name.toLowerCase().includes(q));
  }, [selectedUserInsight, insightGameQuery]);

  const exportInsightJson = () => {
    if (!selectedUserInsight) return;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    downloadTextFile(
      `user-insight-${selectedUserInsight.user.username}-${stamp}.json`,
      JSON.stringify(selectedUserInsight, null, 2),
      "application/json;charset=utf-8",
    );
  };

  const exportInsightCsv = () => {
    if (!selectedUserInsight) return;
    const headers = ["tx_id", "type", "status", "amount", "payment_method", "reference_id", "created_at"];
    const rows = filteredInsightTransactions.map((tx) => [
      tx.id,
      tx.type,
      tx.status,
      tx.amount,
      tx.payment_method || "",
      tx.reference_id || "",
      tx.created_at,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(toCsvCell).join(",")).join("\n");
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    downloadTextFile(`user-transactions-${selectedUserInsight.user.username}-${stamp}.csv`, csv, "text/csv;charset=utf-8");
  };

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  // Paginated slices
  const pagedUsers = users.slice((userPage - 1) * PER, userPage * PER);
  const pagedBets = bets.slice((betPage - 1) * PER, betPage * PER);
  const pagedTx = transactions.slice((txPage - 1) * PER, txPage * PER);
  const pagedBonuses = bonuses.slice((bonusPage - 1) * PER, bonusPage * PER);
  const pagedCasino = casinoGames.slice((casinoPage - 1) * PER, casinoPage * PER);

  // Sidebar badges
  const sideBadges: Partial<Record<MenuKey, number>> = {
    billing: withdrawalsQueue.length,
    bets: pendingBetsCount,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050c17] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0c1f3d] ring-1 ring-[#1b3a6a] mb-3">
            <RefreshCw size={24} className="text-[#3b82f6] animate-spin" />
          </div>
          <p className="text-sm text-[#3d5878]">Loading admin workspace…</p>
        </div>
      </div>
    );
  }

  const activeItem = itemByKey(active);
  const ActiveIcon = activeItem.icon;

  return (
    <div className="min-h-screen bg-[#060d18] text-[#a8c4e0] flex flex-col">

      {/* ══ Top Header ══════════════════════════════════════════════════════════ */}
      <header className="h-12 shrink-0 border-b border-[#132030] bg-[#080f1c] flex items-center gap-3 px-4 z-20">
        {/* Brand */}
        <div className="flex items-center gap-2 pr-4 border-r border-[#132030]">
          <div className="h-7 w-7 flex items-center justify-center rounded-lg bg-[#0c1f3d] ring-1 ring-[#1b3a6a]">
            <ShieldAlert size={14} className="text-[#3b82f6]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d5fbe]">Betwin HQ</span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg border border-[#1a2d45] bg-[#07101c] px-3 py-1.5 w-56">
          <Search size={13} className="text-[#3d5878]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Customer search…"
            className="bg-transparent text-xs text-[#a0bcd8] placeholder-[#2a4060] outline-none w-full"
          />
        </div>

        <div className="flex-1" />

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {err && (
            <div className="flex items-center gap-1.5 rounded border border-[#4a1f2a] bg-[#1e0a10] px-2 py-1 text-[11px] text-[#f87171]">
              <AlertCircle size={11} />{err}
            </div>
          )}

          <button type="button" onClick={() => void refreshAll(true)} disabled={refreshing}
            className="flex items-center gap-1.5 rounded border border-[#1c2e45] bg-[#0d1928] px-2.5 py-1 text-xs text-[#6a90ba] hover:bg-[#101e30] transition-colors">
            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>

          {/* Notifications */}
          <button type="button" className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#1c2e45] bg-[#0d1928] hover:bg-[#101e30] transition-colors">
            <Bell size={14} className="text-[#6a90ba]" />
            {(withdrawalsQueue.length + pendingBetsCount) > 0 && (
              <span className="absolute -top-1 -right-1 h-4 min-w-[16px] flex items-center justify-center rounded-full bg-[#dc2626] text-[9px] font-bold text-white px-0.5">
                {withdrawalsQueue.length + pendingBetsCount}
              </span>
            )}
          </button>

          {/* Clock */}
          <div className="text-right text-[11px] leading-tight text-[#3d5878] hidden lg:block">
            <div className="text-[#5a7a9e]">{now.toLocaleTimeString()}</div>
            <div>{now.toLocaleDateString()}</div>
          </div>

          {/* Admin */}
          <div className="flex items-center gap-2 rounded-lg border border-[#1c2e45] bg-[#0d1928] px-2.5 py-1">
            <div className="h-5 w-5 rounded-full bg-[#1d4ed8] flex items-center justify-center text-[9px] font-bold text-white">A</div>
            <span className="text-xs text-[#6a90ba] hidden sm:block">admin9x5</span>
          </div>

          <button type="button" onClick={onLogout}
            className="flex items-center gap-1.5 rounded border border-[#1c2e45] bg-[#0d1928] px-2.5 py-1 text-xs text-[#6a90ba] hover:text-[#f87171] hover:border-[#4a1f2a] transition-colors">
            <LogOut size={12} />Sign Out
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">

        {/* ══ Sidebar ═════════════════════════════════════════════════════════ */}
        <aside className="w-[220px] shrink-0 border-r border-[#132030] bg-[#070f1c] flex flex-col sticky top-12 h-[calc(100vh-48px)] overflow-y-auto">

          {/* Dashboard (standalone) */}
          <div className="px-2.5 pt-3">
            <button type="button" onClick={() => setActive("dashboard")}
              className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors ${active === "dashboard" ? "bg-[#0c2040] border-l-2 border-[#2563eb] text-[#c8e0ff]" : "border-l-2 border-transparent text-[#3d5878] hover:bg-[#0a1826] hover:text-[#7a9abf]"}`}>
              <LayoutDashboard size={14} className={active === "dashboard" ? "text-[#3b82f6]" : "text-[#2d4560]"} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium leading-none">Dashboard</p>
                <p className="text-[11px] text-[#2d4560] mt-0.5">Core KPIs</p>
              </div>
            </button>
          </div>

          {/* Grouped nav */}
          <nav className="flex-1 px-2.5 py-2 space-y-1">
            {GROUPS.map((g) => {
              const open = openGroups.has(g.label);
              const GIcon = g.icon;
              const groupBadge = g.keys.reduce((sum, k) => sum + (sideBadges[k] ?? 0), 0);
              return (
                <div key={g.label}>
                  {/* Group header */}
                  <button type="button" onClick={() => toggleGroup(g.label)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#3a5472] hover:text-[#6a90ba] hover:bg-[#0a1826] transition-colors">
                    <GIcon size={13} />
                    <span className="flex-1 text-left text-[12px] font-semibold uppercase tracking-[0.1em]">{g.label}</span>
                    {groupBadge > 0 && (
                      <span className="h-4 min-w-[16px] flex items-center justify-center rounded-full bg-[#dc2626] text-[9px] font-bold text-white px-0.5">{groupBadge}</span>
                    )}
                    {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>

                  {/* Group items */}
                  {open && (
                    <div className="ml-3 pl-3 border-l border-[#132030] space-y-0.5">
                      {g.keys.map((k) => {
                        const item = itemByKey(k);
                        const IIcon = item.icon;
                        const isActive = active === k;
                        const badge = sideBadges[k];
                        return (
                          <button key={k} type="button" onClick={() => setActive(k)}
                            className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors ${isActive ? "bg-[#0c2040] border-l-2 border-[#2563eb] text-[#c8e0ff]" : "border-l-2 border-transparent text-[#3d5878] hover:bg-[#0a1826] hover:text-[#7a9abf]"}`}>
                            <IIcon size={13} className={isActive ? "text-[#3b82f6]" : "text-[#2d4560]"} />
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-medium leading-none">{item.label}</p>
                              <p className="text-[10px] text-[#2d4560] mt-0.5 truncate">{item.sub}</p>
                            </div>
                            {badge ? (
                              <span className="h-4 min-w-[16px] flex items-center justify-center rounded-full bg-[#1d4ed8] text-[9px] font-bold text-white px-0.5">{badge}</span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="px-3 pb-3 pt-2 border-t border-[#132030]">
            <div className="text-[11px] text-[#2d4560]">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                <span>12 modules · Supabase PG</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ══ Main Content ════════════════════════════════════════════════════ */}
        <div className="flex-1 min-w-0">
          {/* Section breadcrumb bar */}
          <div className="h-10 border-b border-[#132030] bg-[#07101c] flex items-center px-4 gap-1">
            <button type="button" onClick={() => setActive("dashboard")}
              className="text-xs text-[#3d5878] hover:text-[#7aaad0] px-2 py-1 transition-colors">
              Home
            </button>
            {active !== "dashboard" && (
              <>
                <ChevronRight size={12} className="text-[#2a4060]" />
                <div className="flex items-center gap-1 rounded border border-[#1c2e45] bg-[#0d1928] px-2.5 py-1">
                  <ActiveIcon size={11} className="text-[#3b82f6]" />
                  <span className="text-xs text-[#7aaad0] font-medium">{activeItem.label}</span>
                  <button type="button" onClick={() => setActive("dashboard")} className="ml-1 text-[#2a4060] hover:text-[#f87171]">
                    <X size={10} />
                  </button>
                </div>
              </>
            )}
          </div>

          <main className="p-5 space-y-5">

            {/* ── Dashboard ── */}
            {active === "dashboard" && (
              <div className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard title="Total Users"      value={summary?.users ?? 0}             icon={Users}       color="blue"   />
                  <MetricCard title="Active Users"     value={summary?.activeUsers ?? 0}       icon={UserCheck}   color="green"  />
                  <MetricCard title="Total Bets"       value={summary?.bets ?? 0}              icon={Activity}    color="purple" />
                  <MetricCard title="Pending Bets"     value={summary?.pendingBets ?? 0}       icon={AlertCircle} color="orange" />
                  <MetricCard title="Deposit Total"    value={billing?.depositTotal ?? "0"}    icon={TrendingUp}  color="green"  />
                  <MetricCard title="Withdrawals"      value={billing?.withdrawalTotal ?? "0"} icon={TrendingDown}color="red"    />
                  <MetricCard title="Content Sections" value={summary?.contentSections ?? 0}  icon={Layers}      color="cyan"   />
                  <MetricCard title="Content Items"    value={summary?.contentItems ?? 0}     icon={FileText}    color="blue"   />
                </div>

                <Panel
                  title={`Recent Transactions (${transactions.length})`}
                  footer={<Pager total={transactions.length} page={txPage} per={PER} onPage={setTxPage} />}
                >
                  <thead>
                    <tr>
                      <Th><Checkbox checked={selTx.size === pagedTx.length && pagedTx.length > 0} onChange={() => {
                        if (selTx.size === pagedTx.length) setSelTx(new Set());
                        else setSelTx(new Set(pagedTx.map((t) => t.id)));
                      }} /></Th>
                      <Th>ID</Th><Th>User</Th><Th>Type</Th><Th>Amount</Th>
                      <Th>Status</Th><Th>Method</Th><Th>Created</Th><Th>Action</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedTx.map((tx) => (
                      <Tr key={tx.id} selected={selTx.has(tx.id)}>
                        <Td><Checkbox checked={selTx.has(tx.id)} onChange={() => setSelTx((s) => { const n = new Set(s); n.has(tx.id) ? n.delete(tx.id) : n.add(tx.id); return n; })} /></Td>
                        <Td><span className="font-mono text-[#5a7a9e]">#{tx.id}</span></Td>
                        <Td><span className="font-medium text-[#c0d8f5]">{tx.username}</span></Td>
                        <Td><Badge value={tx.type} /></Td>
                        <Td><span className="font-mono">{tx.amount}</span></Td>
                        <Td><Badge value={tx.status} /></Td>
                        <Td>{tx.payment_method || "—"}</Td>
                        <Td>{fmtDate(tx.created_at)}</Td>
                        <Td>
                          <div className="flex gap-1">
                            {AB.copy(`#${tx.id}`, () => copyText(String(tx.id)))}
                            {AB.view(() => window.alert(`Tx #${tx.id}\nType: ${tx.type}\nStatus: ${tx.status}\nAmount: ${tx.amount}\nMethod: ${tx.payment_method || "—"}\nRef: ${tx.reference_id || "—"}`))}
                            {tx.status !== "completed" ? AB.del(() => {
                              if (!window.confirm(`Delete transaction #${tx.id}?`)) return;
                              void handle(async () => { await adminApi.deleteTransaction(tx.id); });
                            }) : null}
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

            {/* ── Users ── */}
            {active === "users" && (
              <div className="space-y-4">
                {/* Create form */}
                <Panel title="Create User" toolbar={
                  <button type="button" onClick={() => void handle(async () => {
                    await adminApi.createUser({ username: userForm.username, email: userForm.email, password: userForm.password || undefined, balance: Number(userForm.balance || "0") });
                    setUserForm({ username: "", email: "", password: "", balance: "0" });
                  })} className={pBtn}>+ Create User</button>
                }>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Field label="Username"><input value={userForm.username} onChange={(e) => setUserForm((p) => ({ ...p, username: e.target.value }))} placeholder="johndoe" className={inp} /></Field>
                    <Field label="Email"><input value={userForm.email} onChange={(e) => setUserForm((p) => ({ ...p, email: e.target.value }))} placeholder="john@example.com" className={inp} /></Field>
                    <Field label="Password"><input type="password" value={userForm.password} onChange={(e) => setUserForm((p) => ({ ...p, password: e.target.value }))} placeholder="••••••••" className={inp} /></Field>
                    <Field label="Balance"><input value={userForm.balance} onChange={(e) => setUserForm((p) => ({ ...p, balance: e.target.value }))} placeholder="0" className={inp} /></Field>
                  </div>
                </Panel>

                {/* User table */}
                <Panel
                  filter={
                    <>
                      <div className="flex items-center gap-2 rounded-lg border border-[#1c2e45] bg-[#060d18] px-3 py-1.5">
                        <Search size={12} className="text-[#3d5878]" />
                        <input placeholder="Search users…" className="bg-transparent text-xs text-[#a0bcd8] placeholder-[#2a4060] outline-none" />
                      </div>
                      <div className="flex-1" />
                    </>
                  }
                  toolbar={
                    selUsers.size > 0 ? (
                      <button type="button" className={dBtn}>
                        <span className="flex items-center gap-1"><Trash2 size={12} />Batch Delete ({selUsers.size})</span>
                      </button>
                    ) : (
                      <span className="text-xs text-[#3d5878]">Total {users.length} users</span>
                    )
                  }
                  footer={<Pager total={users.length} page={userPage} per={PER} onPage={setUserPage} />}
                >
                  <thead>
                    <tr>
                      <Th><Checkbox checked={selUsers.size === pagedUsers.length && pagedUsers.length > 0} onChange={() => {
                        if (selUsers.size === pagedUsers.length) setSelUsers(new Set());
                        else setSelUsers(new Set(pagedUsers.map((u) => u.id)));
                      }} /></Th>
                      <Th>ID</Th><Th>Username</Th><Th>Email</Th><Th>Balance</Th><Th>Flags</Th><Th>Status</Th><Th>Last Activity</Th><Th>Action</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedUsers.map((u) => (
                      <Tr key={u.id} selected={selUsers.has(u.id)}>
                        <Td><Checkbox checked={selUsers.has(u.id)} onChange={() => setSelUsers((s) => { const n = new Set(s); n.has(u.id) ? n.delete(u.id) : n.add(u.id); return n; })} /></Td>
                        <Td><span className="font-mono text-[#5a7a9e]">#{u.id}</span></Td>
                        <Td><span className="font-medium text-[#c0d8f5]">{u.username}</span></Td>
                        <Td>{u.email}</Td>
                        <Td><span className="font-mono">{u.balance}</span></Td>
                        <Td>
                          <div className="flex flex-wrap gap-1">
                            {u.high_gainer ? <Badge value="High Gainer" /> : null}
                            {u.suspicious ? <Badge value="Suspicious" /> : null}
                            {Number(u.profile_change_count_7d || 0) > 0 ? <Badge value={`Changes7d:${u.profile_change_count_7d}`} /> : null}
                          </div>
                        </Td>
                        <Td>
                          <div className="flex items-center gap-2">
                            <Toggle on={u.status === "active"} onChange={() => void handle(async () => {
                              await adminApi.updateUser(u.id, { status: u.status === "active" ? "blocked" : "active" });
                            })} />
                            <span className="text-[11px] text-[#4a6a8e]">{u.status === "active" ? "ON" : "OFF"}</span>
                          </div>
                        </Td>
                        <Td>{fmtDate(u.last_activity)}</Td>
                        <Td>
                          <div className="flex gap-1">
                            {AB.copy(u.username, () => copyText(u.username))}
                            {AB.edit(() => { const v = window.prompt("New balance", u.balance); if (!v) return; void handle(async () => { await adminApi.updateUser(u.id, { balance: Number(v) }); }); })}
                            {AB.view(() => {
                              setInsightLoading(true);
                              adminApi.userInsights(u.id)
                                .then((insight) => setSelectedUserInsight(insight))
                                .catch((e) => setErr(e instanceof Error ? e.message : "Failed to load insight"))
                                .finally(() => setInsightLoading(false));
                            })}
                            <button
                              type="button"
                              onClick={() => {
                                if (!window.confirm(`Delete user ${u.username}? This removes bets, transactions, bonuses and profile logs.`)) {
                                  return;
                                }
                                void handle(async () => {
                                  await adminApi.deleteUser(u.id);
                                  if (selectedUserInsight?.user.id === u.id) {
                                    setSelectedUserInsight(null);
                                  }
                                });
                              }}
                              className="inline-flex items-center gap-1 rounded border border-[#4a1f2a] bg-[#1a080e] px-2 py-1 text-[11px] text-[#f87171] hover:bg-[#250f18] transition-colors"
                            >
                              <Trash2 size={10} />Delete
                            </button>
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>

                <Panel title="User Tracking Insights">
                  {insightLoading ? (
                    <div className="px-4 py-4 text-sm text-[#6a90ba]">Loading user insights...</div>
                  ) : selectedUserInsight ? (
                    <div className="p-4 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-[#c0d8f5]">{selectedUserInsight.user.full_name || selectedUserInsight.user.username}</span>
                        <Badge value={selectedUserInsight.user.status} />
                        {selectedUserInsight.highGainer ? <Badge value="High Gainer (80%+)" /> : null}
                        {selectedUserInsight.suspicious ? <Badge value="Suspicious" /> : null}
                        <div className="ml-auto flex items-center gap-2">
                          <button type="button" onClick={exportInsightCsv} className={sBtn}>Export CSV</button>
                          <button type="button" onClick={exportInsightJson} className={sBtn}>Export JSON</button>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        <MetricCard title="Win Rate" value={`${(selectedUserInsight.stats.winRate * 100).toFixed(1)}%`} icon={TrendingUp} color="green" />
                        <MetricCard title="Total Bets" value={selectedUserInsight.stats.totalBets} icon={Activity} color="purple" />
                        <MetricCard title="Total Deposits" value={fmtMoney(selectedUserInsight.stats.totalDeposit)} icon={Wallet} color="blue" />
                        <MetricCard title="Total Withdrawals" value={fmtMoney(selectedUserInsight.stats.totalWithdrawal)} icon={TrendingDown} color="orange" />
                        <MetricCard title="Pending Tx" value={selectedUserInsight.stats.pendingTransactions} icon={CreditCard} color="cyan" />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        <MetricCard title="Deposit Count" value={selectedUserInsight.stats.depositCount} icon={TrendingUp} color="green" />
                        <MetricCard title="Withdrawal Count" value={selectedUserInsight.stats.withdrawalCount} icon={TrendingDown} color="orange" />
                        <MetricCard title="Login Success" value={selectedUserInsight.stats.loginSuccessCount} icon={UserCheck} color="blue" />
                        <MetricCard title="Login Failures" value={selectedUserInsight.stats.loginFailureCount} icon={AlertCircle} color="red" />
                        <MetricCard title="Profile Changes (7d)" value={selectedUserInsight.stats.profileChangeCount7d} icon={Pencil} color="purple" />
                      </div>

                      <div className="rounded-lg border border-[#1c2e45] bg-[#060d18] p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#3d5878] mb-2">Identity + Account Snapshot</p>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs">
                          <p>Username: <span className="text-[#c0d8f5]">{selectedUserInsight.user.username}</span></p>
                          <p>Full Name: <span className="text-[#c0d8f5]">{selectedUserInsight.user.full_name || "—"}</span></p>
                          <p>Email: <span className="text-[#c0d8f5]">{selectedUserInsight.user.email}</span></p>
                          <p>Phone: <span className="text-[#c0d8f5]">{selectedUserInsight.user.phone || "—"}</span></p>
                          <p>Country: <span className="text-[#c0d8f5]">{selectedUserInsight.user.country || "—"}</span></p>
                          <p>DOB: <span className="text-[#c0d8f5]">{selectedUserInsight.user.date_of_birth || "—"}</span></p>
                          <p>Balance: <span className="text-[#c0d8f5]">{fmtMoney(selectedUserInsight.user.balance)}</span></p>
                          <p>Registered: <span className="text-[#c0d8f5]">{fmtDate(selectedUserInsight.user.created_at)}</span></p>
                          <p>Last Login: <span className="text-[#c0d8f5]">{fmtDate(selectedUserInsight.user.last_login_at)}</span></p>
                          <p>Last Failed Login: <span className="text-[#c0d8f5]">{fmtDate(selectedUserInsight.stats.lastFailedLoginAt)}</span></p>
                        </div>
                      </div>

                      <div className="grid gap-3 lg:grid-cols-3">
                        <div className="rounded-lg border border-[#1c2e45] bg-[#060d18] p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#3d5878] mb-2">Transaction Breakdown</p>
                          <div className="space-y-1.5 text-xs">
                            <p>Completed: <span className="text-[#c0d8f5]">{selectedUserInsight.transactionBreakdown.byStatus.completed || 0}</span></p>
                            <p>Pending: <span className="text-[#c0d8f5]">{selectedUserInsight.transactionBreakdown.byStatus.pending || 0}</span></p>
                            <p>Cancelled: <span className="text-[#c0d8f5]">{selectedUserInsight.transactionBreakdown.byStatus.cancelled || 0}</span></p>
                            <p>Deposit Tx: <span className="text-[#c0d8f5]">{selectedUserInsight.transactionBreakdown.byType.deposit || 0}</span></p>
                            <p>Withdrawal Tx: <span className="text-[#c0d8f5]">{selectedUserInsight.transactionBreakdown.byType.withdrawal || 0}</span></p>
                            <p>Payout/Manual: <span className="text-[#c0d8f5]">{(selectedUserInsight.transactionBreakdown.byType.payout || 0) + (selectedUserInsight.transactionBreakdown.byType.manual || 0)}</span></p>
                            <p>Pending Deposit Amount: <span className="text-[#c0d8f5]">{fmtMoney(selectedUserInsight.stats.pendingDeposit)}</span></p>
                            <p>Pending Withdrawal Amount: <span className="text-[#c0d8f5]">{fmtMoney(selectedUserInsight.stats.pendingWithdrawal)}</span></p>
                          </div>
                        </div>

                        <div className="rounded-lg border border-[#1c2e45] bg-[#060d18] p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#3d5878] mb-2">Per-Game Play Count</p>
                          <div className="mb-2">
                            <input value={insightGameQuery} onChange={(e) => setInsightGameQuery(e.target.value)} placeholder="Filter game name..." className={inp} />
                          </div>
                          <div className="max-h-44 overflow-y-auto space-y-1.5">
                            {filteredInsightGames.map((g) => (
                              <div key={g.game_name} className="flex items-center justify-between text-xs">
                                <span className="text-[#a8c4e0]">{g.game_name}</span>
                                <span className="text-[#6a90ba]">plays {g.plays} · wins {g.wins} · losses {g.losses}</span>
                              </div>
                            ))}
                            {filteredInsightGames.length === 0 ? <p className="text-xs text-[#4a6a8e]">No game play history yet.</p> : null}
                          </div>
                        </div>

                        <div className="rounded-lg border border-[#1c2e45] bg-[#060d18] p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#3d5878] mb-2">Profile Change Audit</p>
                          <div className="max-h-44 overflow-y-auto space-y-1.5">
                            {selectedUserInsight.profileChanges.map((c) => (
                              <div key={c.id} className="text-xs text-[#a8c4e0] border-b border-[#0f1e30] pb-1">
                                <p className="text-[#6a90ba]">{new Date(c.changed_at).toLocaleString()} · {c.field_name}</p>
                                <p>{String(c.old_value ?? "(empty)")} → {String(c.new_value ?? "(empty)")}</p>
                              </div>
                            ))}
                            {selectedUserInsight.profileChanges.length === 0 ? <p className="text-xs text-[#4a6a8e]">No profile changes logged.</p> : null}
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-3 lg:grid-cols-2">
                        <div className="rounded-lg border border-[#1c2e45] bg-[#060d18] p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#3d5878] mb-2">Recent Transactions (Latest 200)</p>
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <select value={insightTxTypeFilter} onChange={(e) => setInsightTxTypeFilter(e.target.value as "all" | "deposit" | "withdrawal" | "payout" | "manual")} className={inp}>
                              <option value="all">All types</option>
                              <option value="deposit">Deposit</option>
                              <option value="withdrawal">Withdrawal</option>
                              <option value="payout">Payout</option>
                              <option value="manual">Manual</option>
                            </select>
                            <select value={insightTxStatusFilter} onChange={(e) => setInsightTxStatusFilter(e.target.value as "all" | "pending" | "completed" | "cancelled")} className={inp}>
                              <option value="all">All status</option>
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                          <div className="max-h-52 overflow-y-auto space-y-1.5">
                            {filteredInsightTransactions.map((tx) => (
                              <div key={tx.id} className="text-xs text-[#a8c4e0] border-b border-[#0f1e30] pb-1">
                                <p className="text-[#6a90ba]">#{tx.id} · {tx.type} · {tx.status} · {fmtDate(tx.created_at)}</p>
                                <p>{fmtMoney(tx.amount)} · {tx.payment_method || "—"} · {tx.reference_id || "—"}</p>
                              </div>
                            ))}
                            {filteredInsightTransactions.length === 0 ? <p className="text-xs text-[#4a6a8e]">No transactions logged.</p> : null}
                          </div>
                        </div>

                        <div className="rounded-lg border border-[#1c2e45] bg-[#060d18] p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#3d5878] mb-2">Login Attempts (Latest 120)</p>
                          <div className="mb-2">
                            <select value={insightLoginFilter} onChange={(e) => setInsightLoginFilter(e.target.value as "all" | "failed" | "success")} className={inp}>
                              <option value="all">All attempts</option>
                              <option value="failed">Failed only</option>
                              <option value="success">Success only</option>
                            </select>
                          </div>
                          <div className="max-h-52 overflow-y-auto space-y-1.5">
                            {filteredInsightLogins.map((attempt) => (
                              <div key={attempt.id} className="text-xs text-[#a8c4e0] border-b border-[#0f1e30] pb-1">
                                <p className="text-[#6a90ba]">{fmtDate(attempt.created_at)} · {attempt.login_field} · {attempt.success ? "success" : "failed"}</p>
                                <p>{attempt.login_value || "—"} · {attempt.failure_reason || "—"}</p>
                              </div>
                            ))}
                            {filteredInsightLogins.length === 0 ? <p className="text-xs text-[#4a6a8e]">No login attempts logged.</p> : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-4 text-sm text-[#6a90ba]">Select "View" on a user to see A-Z tracking details.</div>
                  )}
                </Panel>
              </div>
            )}

            {/* ── Bets ── */}
            {active === "bets" && (
              <Panel
                toolbar={
                  selBets.size > 0 ? (
                    <button type="button" className={dBtn}>
                      <span className="flex items-center gap-1"><Trash2 size={12} />Batch Delete ({selBets.size})</span>
                    </button>
                  ) : (
                    <span className="text-xs text-[#3d5878]">{bets.length} bets · {pendingBetsCount} pending</span>
                  )
                }
                footer={<Pager total={bets.length} page={betPage} per={PER} onPage={setBetPage} />}
              >
                <thead>
                  <tr>
                    <Th><Checkbox checked={selBets.size === pagedBets.length && pagedBets.length > 0} onChange={() => {
                      if (selBets.size === pagedBets.length) setSelBets(new Set());
                      else setSelBets(new Set(pagedBets.map((b) => b.id)));
                    }} /></Th>
                    <Th>ID</Th><Th>User</Th><Th>Amount</Th><Th>Odds</Th><Th>Potential</Th><Th>Status</Th><Th>Settle</Th>
                  </tr>
                </thead>
                <tbody>
                  {pagedBets.map((b) => (
                    <Tr key={b.id} selected={selBets.has(b.id)}>
                      <Td><Checkbox checked={selBets.has(b.id)} onChange={() => setSelBets((s) => { const n = new Set(s); n.has(b.id) ? n.delete(b.id) : n.add(b.id); return n; })} /></Td>
                      <Td><span className="font-mono text-[#5a7a9e]">#{b.id}</span></Td>
                      <Td>{b.username}</Td>
                      <Td><span className="font-mono">{b.amount}</span></Td>
                      <Td><span className="font-mono text-[#fbbf24]">{b.odds}</span></Td>
                      <Td><span className="font-mono text-[#4ade80]">{b.potential_win}</span></Td>
                      <Td><Badge value={b.status} /></Td>
                      <Td>
                        <div className="flex gap-1">
                          {(["pending", "won", "lost", "cancelled"] as const).map((s) => (
                            <button key={s} type="button" onClick={() => void handle(async () => { await adminApi.updateBet(b.id, s); })}
                              className={b.status === s ? "rounded px-2 py-0.5 text-[11px] font-semibold bg-[#1d4ed8] text-white" : "rounded border border-[#1c2e45] px-2 py-0.5 text-[11px] text-[#5a7a9e] hover:bg-[#0a1828]"}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Panel>
            )}

            {/* ── Billing ── */}
            {active === "billing" && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard title="Deposits"            value={billing?.depositTotal ?? "0"}     icon={TrendingUp}  color="green"  />
                  <MetricCard title="Withdrawals"         value={billing?.withdrawalTotal ?? "0"}  icon={TrendingDown}color="red"    />
                  <MetricCard title="Payouts"             value={billing?.payoutTotal ?? "0"}      icon={DollarSign}  color="purple" />
                  <MetricCard title="Pending Withdrawals" value={billing?.pendingWithdrawals ?? 0} icon={AlertCircle} color="orange" />
                </div>

                {/* Create tx */}
                <Panel title="Create Transaction" toolbar={
                  <button type="button" onClick={() => void handle(async () => {
                    await adminApi.createTransaction({ user_id: Number(txForm.user_id), type: txForm.type as "deposit" | "withdrawal" | "payout" | "manual", amount: Number(txForm.amount), payment_method: txForm.payment_method || undefined, status: txForm.type === "withdrawal" ? "pending" : "completed" });
                    setTxForm({ user_id: "", type: "deposit", amount: "", payment_method: "" });
                  })} className={pBtn}>+ Add Transaction</button>
                }>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Field label="User ID"><input value={txForm.user_id} onChange={(e) => setTxForm((p) => ({ ...p, user_id: e.target.value }))} placeholder="42" className={inp} /></Field>
                    <Field label="Type">
                      <select value={txForm.type} onChange={(e) => setTxForm((p) => ({ ...p, type: e.target.value }))} className={inp}>
                        <option value="deposit">deposit</option><option value="withdrawal">withdrawal</option><option value="payout">payout</option><option value="manual">manual</option>
                      </select>
                    </Field>
                    <Field label="Amount"><input value={txForm.amount} onChange={(e) => setTxForm((p) => ({ ...p, amount: e.target.value }))} placeholder="500.00" className={inp} /></Field>
                    <Field label="Payment Method"><input value={txForm.payment_method} onChange={(e) => setTxForm((p) => ({ ...p, payment_method: e.target.value }))} placeholder="visa, btc…" className={inp} /></Field>
                  </div>
                </Panel>

                {/* Withdrawal queue */}
                <Panel title={`Withdrawal Queue (${withdrawalsQueue.length} pending)`}>
                  <thead><tr><Th>ID</Th><Th>User</Th><Th>Amount</Th><Th>Status</Th><Th>Method</Th><Th>Action</Th></tr></thead>
                  <tbody>
                    {withdrawalsQueue.map((w) => (
                      <Tr key={w.id}>
                        <Td><span className="font-mono text-[#5a7a9e]">#{w.id}</span></Td>
                        <Td><span className="font-medium text-[#c0d8f5]">{w.username}</span></Td>
                        <Td><span className="font-mono">{w.amount}</span></Td>
                        <Td><Badge value={w.status} /></Td>
                        <Td>{w.payment_method || "—"}</Td>
                        <Td>
                          <div className="flex gap-1">
                            <button type="button" onClick={() => void handle(async () => { await adminApi.decideWithdrawal(w.id, "approve"); })}
                              className="inline-flex items-center gap-1 rounded border border-[#124d33] bg-[#092a1c] px-2 py-1 text-[11px] text-[#4ade80] hover:bg-[#0d3525] transition-colors">
                              <Check size={10} />Approve
                            </button>
                            <button type="button" onClick={() => void handle(async () => { await adminApi.decideWithdrawal(w.id, "reject"); })}
                              className="inline-flex items-center gap-1 rounded border border-[#4a1f2a] bg-[#1a080e] px-2 py-1 text-[11px] text-[#f87171] hover:bg-[#250f18] transition-colors">
                              <X size={10} />Reject
                            </button>
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

            {/* ── Payments ── */}
            {active === "payments" && (
              <div className="space-y-4">
                <Panel title={editingPaymentMethod ? `Edit Payment Method #${editingPaymentMethod.id}` : "Add Payment Method"} toolbar={
                  <button type="button" onClick={() => void handle(async () => {
                    const payload = {
                      name: paymentForm.name,
                      code: paymentForm.code,
                      method_type: paymentForm.method_type as "deposit" | "withdrawal" | "both",
                      provider: paymentForm.provider || undefined,
                      image_url: paymentForm.image_url || undefined,
                      account_number: paymentForm.account_number || undefined,
                      min_amount: Number(paymentForm.min_amount),
                      max_amount: Number(paymentForm.max_amount),
                      fee_percent: Number(paymentForm.fee_percent),
                    };
                    if (editingPaymentMethod) {
                      await adminApi.updatePaymentMethod(editingPaymentMethod.id, payload);
                    } else {
                      await adminApi.createPaymentMethod(payload);
                    }
                    setEditingPaymentMethod(null);
                    setPaymentForm({ name: "", code: "", method_type: "both", provider: "", image_url: "", account_number: "", min_amount: "0", max_amount: "500000", fee_percent: "0" });
                  })} className={pBtn}>{editingPaymentMethod ? "Save Method" : "+ Add Method"}</button>
                }>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Field label="Name"><input value={paymentForm.name} onChange={(e) => setPaymentForm((p) => ({ ...p, name: e.target.value }))} placeholder="Visa / Bitcoin" className={inp} /></Field>
                    <Field label="Code"><input value={paymentForm.code} onChange={(e) => setPaymentForm((p) => ({ ...p, code: e.target.value }))} placeholder="visa" className={inp} /></Field>
                    <Field label="Type">
                      <select value={paymentForm.method_type} onChange={(e) => setPaymentForm((p) => ({ ...p, method_type: e.target.value }))} className={inp}>
                        <option value="deposit">deposit</option><option value="withdrawal">withdrawal</option><option value="both">both</option>
                      </select>
                    </Field>
                    <Field label="Provider"><input value={paymentForm.provider} onChange={(e) => setPaymentForm((p) => ({ ...p, provider: e.target.value }))} placeholder="stripe, coinbase…" className={inp} /></Field>
                    <Field label="Image URL"><input value={paymentForm.image_url} onChange={(e) => setPaymentForm((p) => ({ ...p, image_url: e.target.value }))} placeholder="https://..." className={inp} /></Field>
                    <Field label="Account Number"><input value={paymentForm.account_number} onChange={(e) => setPaymentForm((p) => ({ ...p, account_number: e.target.value }))} placeholder="017XXXXXXXX" className={inp} /></Field>
                    <Field label="Min Amount"><input value={paymentForm.min_amount} onChange={(e) => setPaymentForm((p) => ({ ...p, min_amount: e.target.value }))} placeholder="0" className={inp} /></Field>
                    <Field label="Max Amount"><input value={paymentForm.max_amount} onChange={(e) => setPaymentForm((p) => ({ ...p, max_amount: e.target.value }))} placeholder="500000" className={inp} /></Field>
                    <Field label="Fee %"><input value={paymentForm.fee_percent} onChange={(e) => setPaymentForm((p) => ({ ...p, fee_percent: e.target.value }))} placeholder="0" className={inp} /></Field>
                  </div>
                  {editingPaymentMethod ? (
                    <div className="mt-3">
                      <button type="button" className={sBtn} onClick={() => {
                        setEditingPaymentMethod(null);
                        setPaymentForm({ name: "", code: "", method_type: "both", provider: "", image_url: "", account_number: "", min_amount: "0", max_amount: "500000", fee_percent: "0" });
                      }}>Cancel Edit</button>
                    </div>
                  ) : null}
                </Panel>

                <Panel title={`Payment Methods (${paymentMethods.length})`}>
                  <thead><tr><Th>ID</Th><Th>Logo</Th><Th>Name</Th><Th>Code</Th><Th>Type</Th><Th>Provider</Th><Th>Account</Th><Th>Limits</Th><Th>Fee</Th><Th>Status</Th><Th>Action</Th></tr></thead>
                  <tbody>
                    {paymentMethods.map((m) => (
                      <Tr key={m.id}>
                        <Td><span className="font-mono text-[#5a7a9e]">#{m.id}</span></Td>
                        <Td>
                          {m.image_url ? <img src={m.image_url} alt={m.name} className="h-8 w-8 rounded object-cover border border-[#1c2e45]" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} /> : <span className="text-xs text-[#4a6a8e]">—</span>}
                        </Td>
                        <Td><span className="font-medium text-[#c0d8f5]">{m.name}</span></Td>
                        <Td><code className="text-[#22d3ee] text-[11px] bg-[#071e2a] px-1.5 py-0.5 rounded">{m.code}</code></Td>
                        <Td>{m.method_type}</Td>
                        <Td>{m.provider || "—"}</Td>
                        <Td>{m.account_number || "—"}</Td>
                        <Td><span className="font-mono text-xs">{m.min_amount}–{m.max_amount}</span></Td>
                        <Td>{m.fee_percent}%</Td>
                        <Td>
                          <div className="flex items-center gap-2">
                            <Toggle on={m.status === "active"} onChange={() => void handle(async () => { await adminApi.updatePaymentMethod(m.id, { status: m.status === "active" ? "inactive" : "active" }); })} />
                            <span className="text-[11px] text-[#4a6a8e]">{m.status === "active" ? "ON" : "OFF"}</span>
                          </div>
                        </Td>
                        <Td>
                          <div className="flex gap-1">
                            {AB.copy(m.code, () => copyText(m.code))}
                            {AB.edit(() => {
                              setEditingPaymentMethod(m);
                              setPaymentForm({
                                name: m.name,
                                code: m.code,
                                method_type: m.method_type,
                                provider: m.provider || "",
                                image_url: m.image_url || "",
                                account_number: m.account_number || "",
                                min_amount: String(m.min_amount || "0"),
                                max_amount: String(m.max_amount || "0"),
                                fee_percent: String(m.fee_percent || "0"),
                              });
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            })}
                            {AB.view(() => window.alert(`Method: ${m.name}\nCode: ${m.code}\nType: ${m.method_type}\nProvider: ${m.provider || "—"}\nAccount: ${m.account_number || "—"}\nImage: ${m.image_url || "—"}`))}
                            {AB.del(() => {
                              if (!window.confirm(`Delete payment method ${m.name}?`)) return;
                              void handle(async () => { await adminApi.deletePaymentMethod(m.id); });
                            })}
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

            {/* ── Bonuses ── */}
            {active === "bonuses" && (
              <div className="space-y-4">
                <Panel title="Assign Bonus" toolbar={
                  <button type="button" onClick={() => void handle(async () => {
                    await adminApi.createBonus({ user_id: Number(bonusForm.user_id), type: bonusForm.type, amount: Number(bonusForm.amount), expires_at: bonusForm.expires_at || null });
                    setBonusForm({ user_id: "", type: "welcome", amount: "", expires_at: "" });
                  })} className={pBtn}>+ Assign</button>
                }>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Field label="User ID"><input value={bonusForm.user_id} onChange={(e) => setBonusForm((p) => ({ ...p, user_id: e.target.value }))} placeholder="42" className={inp} /></Field>
                    <Field label="Bonus Type"><input value={bonusForm.type} onChange={(e) => setBonusForm((p) => ({ ...p, type: e.target.value }))} placeholder="welcome, reload, vip…" className={inp} /></Field>
                    <Field label="Amount"><input value={bonusForm.amount} onChange={(e) => setBonusForm((p) => ({ ...p, amount: e.target.value }))} placeholder="100.00" className={inp} /></Field>
                    <Field label="Expires At"><input type="datetime-local" value={bonusForm.expires_at} onChange={(e) => setBonusForm((p) => ({ ...p, expires_at: e.target.value }))} className={inp} /></Field>
                  </div>
                </Panel>

                <Panel title={`Bonus Ledger (${bonuses.length})`} footer={<Pager total={bonuses.length} page={bonusPage} per={PER} onPage={setBonusPage} />}>
                  <thead><tr><Th>ID</Th><Th>User</Th><Th>Type</Th><Th>Amount</Th><Th>Used</Th><Th>Expires</Th></tr></thead>
                  <tbody>
                    {pagedBonuses.map((b) => (
                      <Tr key={b.id}>
                        <Td><span className="font-mono text-[#5a7a9e]">#{b.id}</span></Td>
                        <Td>{b.username}</Td>
                        <Td><Badge value={b.type} /></Td>
                        <Td><span className="font-mono">{b.amount}</span></Td>
                        <Td><Badge value={b.used ? "used" : "active"} /></Td>
                        <Td>{fmtDate(b.expires_at)}</Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

            {/* ── Content ── */}
            {active === "content" && (
              <div className="space-y-4">
                <Panel title="Create Section" toolbar={
                  <button type="button" onClick={() => void handle(async () => {
                    await adminApi.createContentSection({ slug: sectionForm.slug, title: sectionForm.title, section_type: sectionForm.section_type, sort_order: Number(sectionForm.sort_order || "0") });
                    setSectionForm({ slug: "", title: "", section_type: "home", sort_order: "0" });
                  })} className={pBtn}>+ Add Section</button>
                }>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Field label="Slug"><input value={sectionForm.slug} onChange={(e) => setSectionForm((p) => ({ ...p, slug: e.target.value }))} placeholder="hero-banner" className={inp} /></Field>
                    <Field label="Title"><input value={sectionForm.title} onChange={(e) => setSectionForm((p) => ({ ...p, title: e.target.value }))} placeholder="Hero Banner" className={inp} /></Field>
                    <Field label="Type">
                      <select value={sectionForm.section_type} onChange={(e) => setSectionForm((p) => ({ ...p, section_type: e.target.value }))} className={inp}>
                        <option value="home">home</option><option value="sports">sports</option><option value="casino">casino</option>
                      </select>
                    </Field>
                    <Field label="Sort Order"><input value={sectionForm.sort_order} onChange={(e) => setSectionForm((p) => ({ ...p, sort_order: e.target.value }))} placeholder="0" className={inp} /></Field>
                  </div>
                </Panel>

                <Panel title="Add Content Item" toolbar={
                  <button type="button" onClick={() => void handle(async () => {
                    await adminApi.createContentItem({ section_id: Number(itemForm.section_id), title: itemForm.title, subtitle: itemForm.subtitle || null, target_url: itemForm.target_url || null, image_url: itemForm.image_url || null, sort_order: Number(itemForm.sort_order || "0") });
                    setItemForm({ section_id: "", title: "", subtitle: "", target_url: "", image_url: "", sort_order: "0" });
                  })} className={pBtn}>+ Add Item</button>
                }>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Section ID"><input value={itemForm.section_id} onChange={(e) => setItemForm((p) => ({ ...p, section_id: e.target.value }))} placeholder="1" className={inp} /></Field>
                    <Field label="Title"><input value={itemForm.title} onChange={(e) => setItemForm((p) => ({ ...p, title: e.target.value }))} placeholder="Item title" className={inp} /></Field>
                    <Field label="Subtitle"><input value={itemForm.subtitle} onChange={(e) => setItemForm((p) => ({ ...p, subtitle: e.target.value }))} placeholder="Optional" className={inp} /></Field>
                    <Field label="Target URL"><input value={itemForm.target_url} onChange={(e) => setItemForm((p) => ({ ...p, target_url: e.target.value }))} placeholder="/casino" className={inp} /></Field>
                    <Field label="Image URL"><input value={itemForm.image_url} onChange={(e) => setItemForm((p) => ({ ...p, image_url: e.target.value }))} placeholder="https://…" className={inp} /></Field>
                    <Field label="Sort Order"><input value={itemForm.sort_order} onChange={(e) => setItemForm((p) => ({ ...p, sort_order: e.target.value }))} placeholder="0" className={inp} /></Field>
                  </div>
                </Panel>

                <Panel title={`Sections (${sections.length}) · Items (${items.length})`}>
                  <thead><tr><Th>ID</Th><Th>Slug</Th><Th>Title</Th><Th>Type</Th><Th>Active</Th></tr></thead>
                  <tbody>
                    {sections.map((s) => (
                      <Tr key={s.id}>
                        <Td><span className="font-mono text-[#5a7a9e]">#{s.id}</span></Td>
                        <Td><code className="text-[#22d3ee] text-[11px] bg-[#071e2a] px-1.5 py-0.5 rounded">{s.slug}</code></Td>
                        <Td>{s.title}</Td>
                        <Td>{s.section_type}</Td>
                        <Td><Badge value={s.is_active ? "active" : "inactive"} /></Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

            {/* ── Providers ── */}
            {active === "providers" && (
              <div className="space-y-4">
                <Panel title="Add Game Provider" toolbar={
                  <button type="button" onClick={() => void handle(async () => {
                    await adminApi.createGameProvider(providerForm);
                    setProviderForm({ name: "", api_endpoint: "", api_key: "", supported_sections: "casino,sports" });
                  })} className={pBtn}>+ Add Provider</button>
                }>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Field label="Name"><input value={providerForm.name} onChange={(e) => setProviderForm((p) => ({ ...p, name: e.target.value }))} placeholder="Evolution Gaming" className={inp} /></Field>
                    <Field label="API Endpoint"><input value={providerForm.api_endpoint} onChange={(e) => setProviderForm((p) => ({ ...p, api_endpoint: e.target.value }))} placeholder="https://api.provider.com" className={inp} /></Field>
                    <Field label="API Key"><input value={providerForm.api_key} onChange={(e) => setProviderForm((p) => ({ ...p, api_key: e.target.value }))} placeholder="sk-…" className={inp} /></Field>
                    <Field label="Sections"><input value={providerForm.supported_sections} onChange={(e) => setProviderForm((p) => ({ ...p, supported_sections: e.target.value }))} placeholder="casino,sports" className={inp} /></Field>
                  </div>
                </Panel>

                <Panel title={`Providers (${providers.length})`} toolbar={
                  <button
                    type="button"
                    onClick={() => void handle(() => adminApi.syncLiveGameProviders())}
                    className={pBtn}
                  >
                    Sync Live Providers
                  </button>
                }>
                  <thead><tr><Th>ID</Th><Th>Name</Th><Th>Endpoint</Th><Th>Sections</Th><Th>Status</Th><Th>Last Sync</Th><Th>Action</Th></tr></thead>
                  <tbody>
                    {providers.map((p) => (
                      <Tr key={p.id}>
                        <Td><span className="font-mono text-[#5a7a9e]">#{p.id}</span></Td>
                        <Td><span className="font-medium text-[#c0d8f5]">{p.name}</span></Td>
                        <Td><span className="text-xs text-[#3d5878] max-w-[180px] block truncate">{p.api_endpoint}</span></Td>
                        <Td>{p.supported_sections}</Td>
                        <Td><Badge value={p.status} /></Td>
                        <Td>{fmtDate(p.last_sync_at)}</Td>
                        <Td>
                          <div className="flex gap-1">
                            {AB.view(() => void handle(async () => { const r = await adminApi.testGameProvider(p.id); if (!r.ok) throw new Error(r.message); }))}
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

            {/* ── SEO ── */}
            {active === "seo" && (
              <div className="space-y-4">
                <Panel title="Create SEO Page" toolbar={
                  <button type="button" onClick={() => void handle(async () => {
                    await adminApi.createSeoPage(seoForm);
                    setSeoForm({ path: "/", title: "", description: "", keywords: "" });
                  })} className={pBtn}>+ Add SEO Page</button>
                }>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Path"><input value={seoForm.path} onChange={(e) => setSeoForm((p) => ({ ...p, path: e.target.value }))} placeholder="/sports" className={inp} /></Field>
                    <Field label="Title"><input value={seoForm.title} onChange={(e) => setSeoForm((p) => ({ ...p, title: e.target.value }))} placeholder="Best Sports Betting — Betwin" className={inp} /></Field>
                    <Field label="Meta Description"><input value={seoForm.description} onChange={(e) => setSeoForm((p) => ({ ...p, description: e.target.value }))} placeholder="Bet on sports…" className={inp} /></Field>
                    <Field label="Keywords"><input value={seoForm.keywords} onChange={(e) => setSeoForm((p) => ({ ...p, keywords: e.target.value }))} placeholder="sports betting, odds" className={inp} /></Field>
                  </div>
                </Panel>

                <Panel title={`SEO Pages (${seoPages.length})`}>
                  <thead><tr><Th>ID</Th><Th>Path</Th><Th>Title</Th><Th>Description</Th><Th>Updated</Th><Th>Action</Th></tr></thead>
                  <tbody>
                    {seoPages.map((s) => (
                      <Tr key={s.id}>
                        <Td><span className="font-mono text-[#5a7a9e]">#{s.id}</span></Td>
                        <Td><code className="text-[#22d3ee] text-[11px] bg-[#071e2a] px-1.5 py-0.5 rounded">{s.path}</code></Td>
                        <Td>{s.title}</Td>
                        <Td><span className="text-xs text-[#3d5878] max-w-[240px] block truncate">{s.description || "—"}</span></Td>
                        <Td>{fmtDate(s.updated_at)}</Td>
                        <Td><div className="flex gap-1">{AB.copy(s.path, () => copyText(s.path))}{AB.edit(() => null)}</div></Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

            {/* ── Settings ── */}
            {active === "settings" && (
              <div className="space-y-4">
                <Panel title="Upsert Setting" toolbar={
                  <button type="button" onClick={() => void handle(async () => {
                    await adminApi.upsertSetting(settingForm);
                    setSettingForm({ key: "", value: "" });
                  })} className={pBtn}>Save Setting</button>
                }>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Setting Key"><input value={settingForm.key} onChange={(e) => setSettingForm((p) => ({ ...p, key: e.target.value }))} placeholder="home.hero.title" className={inp} /></Field>
                    <Field label="Value"><input value={settingForm.value} onChange={(e) => setSettingForm((p) => ({ ...p, value: e.target.value }))} placeholder="Win Big Today!" className={inp} /></Field>
                  </div>
                </Panel>

                <Panel title={`Active Settings (${settings.length})`}>
                  <thead><tr><Th>Key</Th><Th>Value</Th><Th>Updated</Th><Th>Action</Th></tr></thead>
                  <tbody>
                    {settings.map((s) => (
                      <Tr key={s.key}>
                        <Td><code className="text-[#22d3ee] text-[11px] bg-[#071e2a] px-1.5 py-0.5 rounded">{s.key}</code></Td>
                        <Td>{s.value}</Td>
                        <Td>{fmtDate(s.updated_at)}</Td>
                        <Td><div className="flex gap-1">{AB.copy(s.value, () => copyText(s.value))}{AB.edit(() => { const v = window.prompt("New value", s.value); if (!v) return; void handle(async () => { await adminApi.upsertSetting({ key: s.key, value: v }); }); })}</div></Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

            {/* ── Risk ── */}
            {active === "risk" && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <MetricCard title="High Odds Bets"             value={risk?.highOddsBets ?? 0}           icon={AlertCircle} color="orange" />
                  <MetricCard title="Blocked Users Betting (7d)" value={risk?.blockedButBettingUsers ?? 0} icon={ShieldAlert}  color="red"    />
                </div>
                <Panel title="Top Pending Exposure Users">
                  <thead><tr><Th>User ID</Th><Th>Username</Th><Th>Email</Th><Th>Exposure</Th></tr></thead>
                  <tbody>
                    {(risk?.topPendingExposureUsers ?? []).map((u) => (
                      <Tr key={u.id}>
                        <Td><span className="font-mono text-[#5a7a9e]">#{u.id}</span></Td>
                        <Td><span className="font-medium text-[#c0d8f5]">{u.username}</span></Td>
                        <Td>{u.email}</Td>
                        <Td><span className="font-mono font-semibold text-[#fb923c]">{u.exposure}</span></Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

            {/* ── Casino Games ── */}
            {active === "casino" && (
              <div className="space-y-4">
                {/* Add / Edit form */}
                <Panel
                  title={editingGame ? `Edit Game #${editingGame.id}` : "Add Casino Game"}
                  toolbar={
                    <div className="flex gap-2">
                      {editingGame && (
                        <button type="button" onClick={() => { setEditingGame(null); setCasinoForm({ title: "", provider: "", category: "slots", image_url: "", game_url: "#", sort_order: "0" }); }} className={sBtn}>Cancel Edit</button>
                      )}
                      <button type="button" onClick={() => void handle(async () => {
                        if (editingGame) {
                          await adminApi.updateCasinoGame(editingGame.id, {
                            title: casinoForm.title,
                            provider: casinoForm.provider || "Unknown",
                            category: casinoForm.category,
                            image_url: casinoForm.image_url,
                            game_url: casinoForm.game_url || "#",
                            sort_order: Number(casinoForm.sort_order),
                          });
                          setEditingGame(null);
                        } else {
                          await adminApi.createCasinoGame({
                            title: casinoForm.title,
                            provider: casinoForm.provider || "Unknown",
                            category: casinoForm.category,
                            image_url: casinoForm.image_url,
                            game_url: casinoForm.game_url || "#",
                            sort_order: Number(casinoForm.sort_order),
                          });
                        }
                        setCasinoForm({ title: "", provider: "", category: "slots", image_url: "", game_url: "#", sort_order: "0" });
                      })} className={pBtn}>{editingGame ? "Save Changes" : "+ Add Game"}</button>
                    </div>
                  }
                >
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Game Title">
                      <input value={casinoForm.title} onChange={(e) => setCasinoForm((p) => ({ ...p, title: e.target.value }))} placeholder="Gates of Olympus" className={inp} />
                    </Field>
                    <Field label="Provider">
                      <input value={casinoForm.provider} onChange={(e) => setCasinoForm((p) => ({ ...p, provider: e.target.value }))} placeholder="Pragmatic Play" className={inp} />
                    </Field>
                    <Field label="Category">
                      <select value={casinoForm.category} onChange={(e) => setCasinoForm((p) => ({ ...p, category: e.target.value }))} className={inp}>
                        <option value="slots">Slots</option>
                        <option value="crash">Crash</option>
                        <option value="live">Live Casino</option>
                        <option value="table">Table Games</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>
                    <Field label="Image URL">
                      <input value={casinoForm.image_url} onChange={(e) => setCasinoForm((p) => ({ ...p, image_url: e.target.value }))} placeholder="https://..." className={inp} />
                    </Field>
                    <Field label="Game URL">
                      <input value={casinoForm.game_url} onChange={(e) => setCasinoForm((p) => ({ ...p, game_url: e.target.value }))} placeholder="https://... or #" className={inp} />
                    </Field>
                    <Field label="Sort Order">
                      <input type="number" value={casinoForm.sort_order} onChange={(e) => setCasinoForm((p) => ({ ...p, sort_order: e.target.value }))} placeholder="0" className={inp} />
                    </Field>
                  </div>
                  {casinoForm.image_url && (
                    <div className="mt-3 flex items-center gap-3 px-1">
                      <span className="text-[11px] text-[#3d5878] uppercase tracking-[0.1em]">Preview:</span>
                      <img src={casinoForm.image_url} alt="preview" className="h-16 w-12 rounded-lg object-cover border border-[#1c2e45]" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  )}
                </Panel>

                {/* Stats + re-seed */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 rounded-lg border border-[#1c2e45] bg-[#0d1928] px-4 py-2.5">
                    <Gamepad2 size={14} className="text-[#a78bfa]" />
                    <span className="text-sm text-[#7aaad0]"><b className="text-[#deeeff]">{casinoGames.length}</b> games total</span>
                    <span className="text-[#2a4060]">·</span>
                    <span className="text-sm text-[#7aaad0]"><b className="text-[#4ade80]">{casinoGames.filter((g) => g.is_active).length}</b> active</span>
                  </div>
                  <button type="button" onClick={() => {
                    if (!window.confirm("Reset all casino games to the 30 default mock titles?")) return;
                    void handle(() => adminApi.seedCasinoGames());
                  }} className={dBtn}>Re-seed 30 Mock Games</button>
                  <button
                    type="button"
                    onClick={() => void handle(() => adminApi.syncLiveCasinoGames())}
                    className={pBtn}
                  >
                    Sync Live Casino Games
                  </button>
                </div>

                {/* Games table */}
                <Panel
                  title={`Casino Games (${casinoGames.length})`}
                  footer={<Pager total={casinoGames.length} page={casinoPage} per={PER} onPage={setCasinoPage} />}
                >
                  <thead>
                    <tr>
                      <Th>Thumb</Th><Th>ID</Th><Th>Title</Th><Th>Provider</Th>
                      <Th>Category</Th><Th>Active</Th><Th>Sort</Th><Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedCasino.map((g) => (
                      <Tr key={g.id}>
                        <Td>
                          <img src={g.image_url} alt={g.title} className="h-10 w-8 rounded-lg object-cover border border-[#1c2e45]" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </Td>
                        <Td><span className="font-mono text-[#5a7a9e]">#{g.id}</span></Td>
                        <Td><span className="font-medium text-[#c0d8f5]">{g.title}</span></Td>
                        <Td>{g.provider}</Td>
                        <Td><Badge value={g.category} /></Td>
                        <Td>
                          <Toggle on={g.is_active} onChange={() => void handle(() => adminApi.updateCasinoGame(g.id, { is_active: !g.is_active }))} />
                        </Td>
                        <Td><span className="font-mono text-[#5a7a9e]">{g.sort_order}</span></Td>
                        <Td>
                          <div className="flex gap-1">
                            {AB.edit(() => {
                              setEditingGame(g);
                              setCasinoForm({ title: g.title, provider: g.provider, category: g.category, image_url: g.image_url, game_url: g.game_url, sort_order: String(g.sort_order) });
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            })}
                            {AB.del(() => {
                              if (!window.confirm(`Delete "${g.title}"?`)) return;
                              void handle(() => adminApi.deleteCasinoGame(g.id));
                            })}
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </Panel>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export const AdminPanelPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(adminTokenStore.get()));
  const handleLogout = () => { adminTokenStore.clear(); setIsLoggedIn(false); };
  if (!isLoggedIn) return <AdminLogin onSuccess={() => setIsLoggedIn(true)} />;
  return <AdminDashboard onLogout={handleLogout} />;
};
