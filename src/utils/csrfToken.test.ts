import { clearCsrfToken, getCsrfToken, setCsrfToken } from "./csrfToken";

describe("CTO-03b in-memory CSRF", () => {
  afterEach(clearCsrfToken);

  it("starts empty and never needs browser storage", () => {
    expect(getCsrfToken()).toBeNull();
  });

  it("holds a session token only until it is cleared", () => {
    const value = "a".repeat(64);
    setCsrfToken(value);
    expect(getCsrfToken()).toBe(value);
    clearCsrfToken();
    expect(getCsrfToken()).toBeNull();
  });
});
