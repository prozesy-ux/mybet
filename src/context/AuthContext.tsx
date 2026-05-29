import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { userApi, userTokenStore, type AuthResult, type AuthUser } from "@/services/userApi";

interface LoginInput {
  email?: string;
  phone?: string;
  password: string;
}

interface RegisterInput {
  email: string;
  phone: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<AuthResult>;
  register: (input: RegisterInput) => Promise<AuthResult>;
  updateProfile: (input: {
    name: string;
    email: string;
    phone: string;
    country: string;
    dateOfBirth: string;
  }) => Promise<AuthResult>;
  changePassword: (input: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<AuthResult>;
  requestPasswordReset: (input: {
    email?: string;
    phone?: string;
    newPassword: string;
  }) => Promise<AuthResult>;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const SESSION_KEY = "user-auth-session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readSession = (): AuthUser | null => {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

const saveSession = (user: AuthUser | null) => {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => readSession());

  const refreshUser = async () => {
    if (!userTokenStore.get()) {
      setUser(null);
      saveSession(null);
      return;
    }

    try {
      const response = await userApi.me();
      setUser(response.user);
      saveSession(response.user);
    } catch {
      userTokenStore.clear();
      setUser(null);
      saveSession(null);
    }
  };

  useEffect(() => {
    const token = userTokenStore.get();
    if (!token) {
      return;
    }
    void refreshUser();
  }, []);

  useEffect(() => {
    const token = userTokenStore.get();
    if (!token) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const depositRef = params.get("deposit_ref");
    if (!depositRef) {
      return;
    }

    let cancelled = false;
    userApi
      .confirmDeposit(depositRef)
      .catch(() => null)
      .finally(() => {
        if (cancelled) {
          return;
        }
        void refreshUser();
        params.delete("deposit_ref");
        const next = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}${window.location.hash}`;
        window.history.replaceState({}, "", next);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  useEffect(() => {
    if (!userTokenStore.get()) {
      return;
    }

    const id = window.setInterval(() => {
      void refreshUser();
    }, 10000);

    return () => {
      window.clearInterval(id);
    };
  }, [user?.id]);

  const login = async (input: LoginInput): Promise<AuthResult> => {
    try {
      const response = await userApi.login(input);
      userTokenStore.set(response.token);
      setUser(response.user);
      saveSession(response.user);
      return { ok: true, message: response.message || "Login successful", user: response.user };
    } catch (error) {
      return { ok: false, message: error instanceof Error ? error.message : "Login failed" };
    }
  };

  const register = async (input: RegisterInput): Promise<AuthResult> => {
    try {
      const response = await userApi.register(input);
      userTokenStore.set(response.token);
      setUser(response.user);
      saveSession(response.user);
      return { ok: true, message: response.message || "Registration successful", user: response.user };
    } catch (error) {
      return { ok: false, message: error instanceof Error ? error.message : "Registration failed" };
    }
  };

  const logout = () => {
    userTokenStore.clear();
    setUser(null);
    saveSession(null);
  };

  const updateProfile = async (input: {
    name: string;
    email: string;
    phone: string;
    country: string;
    dateOfBirth: string;
  }): Promise<AuthResult> => {
    if (!input.name || !input.email || !input.phone || !input.country || !input.dateOfBirth) {
      return Promise.resolve({ ok: false, message: "All fields are required" });
    }

    return userApi
      .updateProfile(input)
      .then((response) => {
        setUser(response.user);
        saveSession(response.user);
        return { ok: true, message: response.message || "Profile updated" };
      })
      .catch((error) => ({
        ok: false,
        message: error instanceof Error ? error.message : "Profile update failed",
      }));
  };

  const changePassword = async (input: {
    currentPassword: string;
    newPassword: string;
  }): Promise<AuthResult> => {
    if (!input.currentPassword || !input.newPassword) {
      return { ok: false, message: "Both password fields are required" };
    }

    if (input.newPassword.length < 8) {
      return { ok: false, message: "New password must be at least 8 characters" };
    }

    try {
      const response = await userApi.changePassword(input);
      return { ok: true, message: response.message || "Password updated" };
    } catch (error) {
      return { ok: false, message: error instanceof Error ? error.message : "Password update failed" };
    }
  };

  const requestPasswordReset = async (input: {
    email?: string;
    phone?: string;
    newPassword: string;
  }): Promise<AuthResult> => {
    try {
      const response = await userApi.resetPassword(input);
      return { ok: true, message: response.message || "Password reset successful" };
    } catch (error) {
      return { ok: false, message: error instanceof Error ? error.message : "Password reset failed" };
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      register,
      updateProfile,
      changePassword,
      requestPasswordReset,
      refreshUser,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
