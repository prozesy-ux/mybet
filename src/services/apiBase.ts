const normalizeBase = (value: string) => String(value || "").trim().replace(/\/+$/, "");

const envBase = normalizeBase(import.meta.env.VITE_API_BASE_URL || "");

const detectDefaultBase = () => {
  if (typeof window === "undefined") {
    return "";
  }

  const host = window.location.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:3001";
  }

  // Cloudflare Pages preview domains need an explicit API host when the backend is separate.
  if (host.endsWith(".pages.dev")) {
    return "https://mybet-backend-xypv.onrender.com";
  }

  return window.location.origin;
};

export const API_BASE = envBase || detectDefaultBase();