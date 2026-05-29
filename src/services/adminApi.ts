import { API_BASE } from "./apiBase";
const ADMIN_TOKEN_KEY = "admin9x5-token";

export interface AdminSummary {
  users: number;
  bets: number;
  pendingBets: number;
  totalTransactionVolume: string;
  activeUsers: number;
  blockedUsers: number;
  contentSections: number;
  contentItems: number;
}

export interface BillingOverview {
  depositTotal: string;
  withdrawalTotal: string;
  payoutTotal: string;
  pendingWithdrawals: number;
}

export interface AdminUser {
  id: number;
  username: string;
  full_name?: string;
  email: string;
  phone?: string;
  balance: string;
  status: string;
  created_at: string;
  last_activity: string;
  high_gainer?: boolean;
  suspicious?: boolean;
  profile_change_count_7d?: number;
}

export interface AdminUserInsight {
  user: {
    id: number;
    username: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    balance: string;
    status: string;
    country: string | null;
    date_of_birth: string | null;
    created_at: string;
    last_login_at: string | null;
  };
  highGainer: boolean;
  suspicious: boolean;
  stats: {
    winRate: number;
    totalBets: number;
    wonBets: number;
    lostBets: number;
    pendingBets: number;
    avgOdds: string;
    settledStakeTotal: string;
    wonStakeTotal: string;
    lostStakeTotal: string;
    totalDeposit: string;
    totalWithdrawal: string;
    pendingDeposit: string;
    pendingWithdrawal: string;
    totalTransactions: number;
    depositCount: number;
    withdrawalCount: number;
    pendingTransactions: number;
    profileChangeCount7d: number;
    loginSuccessCount: number;
    loginFailureCount: number;
    lastFailedLoginAt: string | null;
  };
  gameStats: Array<{
    game_name: string;
    plays: number;
    wins: number;
    losses: number;
    total_stake: string;
  }>;
  profileChanges: Array<{
    id: number;
    field_name: string;
    old_value: string | null;
    new_value: string | null;
    changed_at: string;
    metadata: Record<string, unknown>;
  }>;
  loginAttempts: Array<{
    id: number;
    login_field: string;
    login_value: string | null;
    success: boolean;
    failure_reason: string | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
  }>;
  recentTransactions: Array<{
    id: number;
    type: "deposit" | "withdrawal" | "payout" | "manual";
    amount: string;
    status: string;
    payment_method: string | null;
    reference_id: string | null;
    metadata?: Record<string, unknown>;
    created_at: string;
  }>;
  transactionBreakdown: {
    byStatus: Record<string, number>;
    byType: Record<string, number>;
  };
}

export interface AdminBet {
  id: number;
  user_id: number;
  username: string;
  email: string;
  amount: string;
  odds: string;
  status: "pending" | "won" | "lost" | "cancelled";
  potential_win: string;
  created_at: string;
  settled_at: string | null;
}

export interface AdminTransaction {
  id: number;
  user_id: number;
  username: string;
  email: string;
  type: "deposit" | "withdrawal" | "payout" | "manual";
  amount: string;
  status: string;
  payment_method: string | null;
  reference_id: string | null;
  created_at: string;
}

export interface AdminBonus {
  id: number;
  user_id: number;
  username: string;
  email: string;
  amount: string;
  type: string;
  expires_at: string | null;
  used: boolean;
  created_at: string;
}

export interface RiskExposureUser {
  id: number;
  username: string;
  email: string;
  exposure: string;
}

export interface AdminRisk {
  highOddsBets: number;
  blockedButBettingUsers: number;
  topPendingExposureUsers: RiskExposureUser[];
}

export interface ContentSection {
  id: number;
  slug: string;
  title: string;
  section_type: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  id: number;
  section_id: number;
  section_slug?: string;
  section_title?: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  target_url: string | null;
  payload: Record<string, unknown>;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  code: string;
  method_type: "deposit" | "withdrawal" | "both";
  provider: string | null;
  image_url: string | null;
  account_number: string | null;
  status: string;
  min_amount: string;
  max_amount: string;
  fee_percent: string;
}

export interface GameProvider {
  id: number;
  name: string;
  api_endpoint: string;
  api_key: string | null;
  supported_sections: string;
  status: string;
  last_sync_at: string | null;
  created_at: string;
}

export interface SeoPage {
  id: number;
  path: string;
  title: string;
  description: string | null;
  keywords: string | null;
  og_image: string | null;
  no_index: boolean;
  updated_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  updated_at: string;
}

export interface CasinoGame {
  id: number;
  title: string;
  provider: string;
  category: string;
  image_url: string;
  game_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const adminTokenStore = {
  get() {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  },
  set(token: string) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  },
  clear() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  },
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const token = adminTokenStore.get();
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {}),
      },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Failed to fetch. Admin API server is unreachable.");
    }
    throw error;
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data as T;
};

export const adminApi = {
  login: (username: string, password: string) =>
    request<{ ok: boolean; token: string; admin: { username: string; role: string } }>(
      "/api/admin/login",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
      },
    ),
  summary: () => request<AdminSummary>("/api/admin/summary"),
  billingOverview: () => request<BillingOverview>("/api/admin/billing/overview"),

  users: () => request<AdminUser[]>("/api/admin/users"),
  createUser: (payload: {
    username: string;
    email: string;
    password?: string;
    status?: string;
    balance?: number;
  }) =>
    request<AdminUser>("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateUser: (id: number, payload: { status?: string; balance?: number }) =>
    request<AdminUser>(`/api/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteUser: (id: number) =>
    request<{ ok: boolean }>(`/api/admin/users/${id}`, {
      method: "DELETE",
    }),
  userInsights: (id: number) => request<AdminUserInsight>(`/api/admin/users/${id}/insights`),

  bets: () => request<AdminBet[]>("/api/admin/bets"),
  updateBet: (id: number, status: "pending" | "won" | "lost" | "cancelled") =>
    request<AdminBet>(`/api/admin/bets/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  transactions: () => request<AdminTransaction[]>("/api/admin/transactions"),
  createTransaction: (payload: {
    user_id: number;
    type: "deposit" | "withdrawal" | "payout" | "manual";
    amount: number;
    status?: string;
    reference_id?: string;
    payment_method?: string;
  }) =>
    request<AdminTransaction>("/api/admin/transactions", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  deleteTransaction: (id: number) =>
    request<{ ok: boolean }>(`/api/admin/transactions/${id}`, {
      method: "DELETE",
    }),
  decideWithdrawal: (id: number, decision: "approve" | "reject") =>
    request<{ ok: boolean; transactionId: number; status: string }>(`/api/admin/withdrawals/${id}/decision`, {
      method: "PATCH",
      body: JSON.stringify({ decision }),
    }),

  bonuses: () => request<AdminBonus[]>("/api/admin/bonuses"),
  createBonus: (payload: {
    user_id: number;
    amount: number;
    type: string;
    expires_at?: string | null;
  }) =>
    request<AdminBonus>("/api/admin/bonuses", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  risk: () => request<AdminRisk>("/api/admin/risk"),

  contentSections: () => request<ContentSection[]>("/api/admin/content-sections"),
  createContentSection: (payload: {
    slug: string;
    title: string;
    section_type?: string;
    sort_order?: number;
    is_active?: boolean;
  }) =>
    request<ContentSection>("/api/admin/content-sections", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateContentSection: (id: number, payload: Partial<ContentSection>) =>
    request<ContentSection>(`/api/admin/content-sections/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteContentSection: (id: number) =>
    request<{ ok: boolean }>(`/api/admin/content-sections/${id}`, {
      method: "DELETE",
    }),

  contentItems: (sectionId?: number) =>
    request<ContentItem[]>(`/api/admin/content-items${sectionId ? `?section_id=${sectionId}` : ""}`),
  createContentItem: (payload: {
    section_id: number;
    title: string;
    subtitle?: string | null;
    image_url?: string | null;
    target_url?: string | null;
    payload?: Record<string, unknown>;
    sort_order?: number;
    is_active?: boolean;
  }) =>
    request<ContentItem>("/api/admin/content-items", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateContentItem: (id: number, payload: Partial<ContentItem>) =>
    request<ContentItem>(`/api/admin/content-items/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteContentItem: (id: number) =>
    request<{ ok: boolean }>(`/api/admin/content-items/${id}`, {
      method: "DELETE",
    }),

  paymentMethods: () => request<PaymentMethod[]>("/api/admin/payment-methods"),
  createPaymentMethod: (payload: {
    name: string;
    code: string;
    method_type?: "deposit" | "withdrawal" | "both";
    provider?: string;
    image_url?: string;
    account_number?: string;
    status?: string;
    min_amount?: number;
    max_amount?: number;
    fee_percent?: number;
  }) =>
    request<PaymentMethod>("/api/admin/payment-methods", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updatePaymentMethod: (id: number, payload: Partial<PaymentMethod>) =>
    request<PaymentMethod>(`/api/admin/payment-methods/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deletePaymentMethod: (id: number) =>
    request<{ ok: boolean }>(`/api/admin/payment-methods/${id}`, {
      method: "DELETE",
    }),

  gameProviders: () => request<GameProvider[]>("/api/admin/game-providers"),
  createGameProvider: (payload: {
    name: string;
    api_endpoint: string;
    api_key?: string;
    supported_sections?: string;
    status?: string;
  }) =>
    request<GameProvider>("/api/admin/game-providers", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateGameProvider: (id: number, payload: Partial<GameProvider>) =>
    request<GameProvider>(`/api/admin/game-providers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteGameProvider: (id: number) =>
    request<{ ok: boolean }>(`/api/admin/game-providers/${id}`, {
      method: "DELETE",
    }),
  testGameProvider: (id: number) =>
    request<{ ok: boolean; provider: string; message: string }>(`/api/admin/game-providers/${id}/test`, {
      method: "POST",
    }),
  syncLiveGameProviders: () =>
    request<{ ok: boolean; synced: number; total: number; serverId: string }>("/api/admin/game-providers/sync-live", {
      method: "POST",
    }),

  seoPages: () => request<SeoPage[]>("/api/admin/seo-pages"),
  createSeoPage: (payload: {
    path: string;
    title: string;
    description?: string;
    keywords?: string;
    og_image?: string;
    no_index?: boolean;
  }) =>
    request<SeoPage>("/api/admin/seo-pages", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateSeoPage: (id: number, payload: Partial<SeoPage>) =>
    request<SeoPage>(`/api/admin/seo-pages/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteSeoPage: (id: number) =>
    request<{ ok: boolean }>(`/api/admin/seo-pages/${id}`, {
      method: "DELETE",
    }),

  siteSettings: () => request<SiteSetting[]>("/api/admin/site-settings"),
  upsertSetting: (payload: { key: string; value: string }) =>
    request<SiteSetting>("/api/admin/site-settings", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  bulkSettings: (items: Array<{ key: string; value: string }>) =>
    request<{ ok: boolean; count: number }>("/api/admin/site-settings/bulk", {
      method: "POST",
      body: JSON.stringify({ items }),
    }),

  casinoGames: () => request<CasinoGame[]>("/api/admin/casino-games"),
  createCasinoGame: (payload: {
    title: string;
    provider?: string;
    category?: string;
    image_url: string;
    game_url?: string;
    sort_order?: number;
    is_active?: boolean;
  }) =>
    request<CasinoGame>("/api/admin/casino-games", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateCasinoGame: (id: number, payload: Partial<CasinoGame>) =>
    request<CasinoGame>(`/api/admin/casino-games/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteCasinoGame: (id: number) =>
    request<{ ok: boolean }>(`/api/admin/casino-games/${id}`, {
      method: "DELETE",
    }),
  seedCasinoGames: () =>
    request<{ ok: boolean; count: number }>("/api/admin/casino-games/seed", {
      method: "POST",
    }),
  syncLiveCasinoGames: () =>
    request<{ ok: boolean; synced: number; sourceCount: number; serverId: string }>("/api/admin/casino-games/sync-live", {
      method: "POST",
    }),
};
