// Session-bound CSRF token is held in memory only, not local/sessionStorage.
// Refreshed by GET /session or POST /login. Never attached to third parties.
let token: string | null = null;

export const setCsrfToken = (value: string): void => {
  token = value;
};
export const getCsrfToken = (): string | null => token;
export const clearCsrfToken = (): void => {
  token = null;
};
