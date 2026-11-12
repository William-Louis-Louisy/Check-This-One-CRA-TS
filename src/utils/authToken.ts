// CTO-03b: legacy CTO-01/03a Bearer tokens must not survive the switch
// to server-managed HttpOnly cookies.
export const clearLegacyAuth = (): void => {
  sessionStorage.removeItem("cto.accessToken");
  localStorage.removeItem("user");
};
