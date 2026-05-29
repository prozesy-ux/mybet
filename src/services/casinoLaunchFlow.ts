export const AUTH_OPEN_LOGIN_EVENT = "auth:open-login";
export const CASINO_LAUNCH_REQUEST_EVENT = "casino:launch-requested";

const PENDING_CASINO_GAME_KEY = "pending-casino-game";

export interface PendingCasinoGame {
  id: number;
  title: string;
}

export const savePendingCasinoGame = (game: PendingCasinoGame) => {
  sessionStorage.setItem(PENDING_CASINO_GAME_KEY, JSON.stringify(game));
};

export const readPendingCasinoGame = (): PendingCasinoGame | null => {
  const raw = sessionStorage.getItem(PENDING_CASINO_GAME_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PendingCasinoGame;
    if (!parsed || typeof parsed.id !== "number" || typeof parsed.title !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const clearPendingCasinoGame = () => {
  sessionStorage.removeItem(PENDING_CASINO_GAME_KEY);
};

export const hasPendingCasinoGame = () => readPendingCasinoGame() !== null;

export const consumePendingCasinoGame = (): PendingCasinoGame | null => {
  const pending = readPendingCasinoGame();
  if (!pending) {
    return null;
  }

  clearPendingCasinoGame();
  return pending;
};

export const requestLoginModal = () => {
  window.dispatchEvent(new CustomEvent(AUTH_OPEN_LOGIN_EVENT));
};

export const requestCasinoLaunch = (game: PendingCasinoGame) => {
  window.dispatchEvent(
    new CustomEvent<PendingCasinoGame>(CASINO_LAUNCH_REQUEST_EVENT, {
      detail: game,
    }),
  );
};
