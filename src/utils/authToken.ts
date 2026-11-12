// Temporary bearer-token transport for CTO-01.
// CTO-03 will replace this with a hardened first-party session design.
const TOKEN_KEY = "cto.accessToken";

export const getAccessToken = (): string | null =>
  sessionStorage.getItem(TOKEN_KEY);

export const setAccessToken = (token: string): void =>
  sessionStorage.setItem(TOKEN_KEY, token);

export const clearAccessToken = (): void =>
  sessionStorage.removeItem(TOKEN_KEY);
