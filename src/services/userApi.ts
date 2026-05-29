import { API_BASE } from "./apiBase";
const USER_TOKEN_KEY = "user-auth-token";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth: string;
  balance: string;
  status: string;
  createdAt?: string;
}

export interface AuthResult {
  ok: boolean;
  message: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  code: string;
  method_type: "deposit" | "withdrawal" | "both";
  provider: string | null;
  image_url: string | null;
  account_number: string | null;
  min_amount: string;
  max_amount: string;
  fee_percent: string;
}

export interface UserTransaction {
  id: number;
  type: "deposit" | "withdrawal" | "payout" | "manual";
  amount: string;
  status: "pending" | "completed" | "cancelled";
  payment_method: string | null;
  reference_id: string | null;
  created_at: string;
}

export interface UserBet {
  id: number;
  game_name: string | null;
  amount: string;
  odds: string;
  potential_win: string;
  status: "pending" | "won" | "lost" | "cancelled";
  created_at: string;
  settled_at?: string | null;
}

export interface UserProfileStats {
  highGainer: boolean;
  suspicious: boolean;
  stats: {
    totalTransactions: number;
    depositCount: number;
    withdrawalCount: number;
    pendingTransactions: number;
    totalDeposit: string;
    totalWithdrawal: string;
    pendingDeposit: string;
    pendingWithdrawal: string;
    totalBets: number;
    wonBets: number;
    lostBets: number;
    openBets: number;
    winRate: number;
    profileChanges7d: number;
    identityChanges30d: number;
  };
  gamePlays: Array<{ game_name: string; plays: number }>;
}

export interface PlaceBetResult {
  ok: boolean;
  message: string;
  bet: UserBet;
  balance: string;
}

export interface CasinoLaunchResult {
  ok: boolean;
  fallback?: boolean;
  game: { id: number; title: string; provider: string };
  url: string;
}

export interface SportsLaunchResult {
  ok: boolean;
  portfolio: 'SportsBook' | '568WinSportsbook';
  url: string;
}

export const userTokenStore = {
  get() {
    return localStorage.getItem(USER_TOKEN_KEY);
  },
  set(token: string) {
    localStorage.setItem(USER_TOKEN_KEY, token);
  },
  clear() {
    localStorage.removeItem(USER_TOKEN_KEY);
  },
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const token = userTokenStore.get();
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
      throw new Error("Failed to fetch. API server is unreachable.");
    }
    throw error;
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data as T;
};

export const userApi = {
  health: () => request<{ status: string; timestamp: string }>("/api/health"),
  register: (payload: { email: string; phone: string; password: string }) =>
    request<{ ok: boolean; message: string; token: string; user: AuthUser }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload: { email?: string; phone?: string; password: string }) =>
    request<{ ok: boolean; message: string; token: string; user: AuthUser }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  me: () => request<{ user: AuthUser }>("/api/auth/me"),
  updateProfile: (payload: {
    name?: string;
    email?: string;
    phone?: string;
    country?: string;
    dateOfBirth?: string;
  }) =>
    request<{ ok: boolean; message: string; user: AuthUser }>("/api/auth/profile", {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  changePassword: (payload: { currentPassword: string; newPassword: string }) =>
    request<AuthResult>("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  resetPassword: (payload: { email?: string; phone?: string; newPassword: string }) =>
    request<AuthResult>("/api/auth/password-reset", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  paymentMethods: (methodType: "deposit" | "withdrawal") =>
    request<PaymentMethod[]>(`/api/payment-methods?type=${methodType}`),
  createDeposit: (payload: { amount: number; payment_method: string; provider_name?: string }) =>
    request<{ ok: boolean; message: string; transaction: UserTransaction; payUrl?: string; trackingNumber?: string | null }>("/api/auth/deposits", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  confirmDeposit: (referenceId: string) =>
    request<{ ok: boolean; status: "pending" | "completed" | "cancelled"; transactionId: number; credited: boolean }>(`/api/auth/deposits/${encodeURIComponent(referenceId)}/confirm`, {
      method: "POST",
    }),
  createWithdrawal: (payload: { amount: number; payment_method: string; account_number: string; provider_name?: string }) =>
    request<{ ok: boolean; message: string; transaction: UserTransaction }>("/api/auth/withdrawals", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  transactions: (type?: "deposit" | "withdrawal") =>
    request<UserTransaction[]>(`/api/auth/transactions${type ? `?type=${type}` : ""}`),
  bets: (status?: "open" | "settled") =>
    request<UserBet[]>(`/api/auth/bets${status ? `?status=${status}` : ""}`),
  placeBet: (payload: { amount: number; odds: number; game_name: string; metadata?: Record<string, unknown> }) =>
    request<PlaceBetResult>("/api/auth/bets/place", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  launchCasinoGame: (id: number) =>
    request<CasinoLaunchResult>(`/api/auth/casino/launch/${id}`, {
      method: "POST",
    }),
  launchSportsbook: (payload?: { portfolio?: 'SportsBook' | '568WinSportsbook' }) =>
    request<SportsLaunchResult>("/api/auth/sports/launch", {
      method: "POST",
      body: JSON.stringify(payload || {}),
    }),
  launchSportsbookPublic: (payload?: { portfolio?: 'SportsBook' | '568WinSportsbook' }) =>
    request<SportsLaunchResult>("/api/sports/launch", {
      method: "POST",
      body: JSON.stringify(payload || {}),
    }),
  profileStats: () => request<UserProfileStats>("/api/auth/profile-stats"),
};
