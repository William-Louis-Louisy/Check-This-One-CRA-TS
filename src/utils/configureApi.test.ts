import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { clearCsrfToken, setCsrfToken } from "./csrfToken";

type TestConfig = InternalAxiosRequestConfig;

const adapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => ({
  data: {},
  status: 200,
  statusText: "OK",
  headers: {},
  config,
});

describe("CTO-03b Axios API credential isolation", () => {
  beforeAll(() => {
    process.env.REACT_APP_API_URL = "https://api.check-this-one.com";
    // Configure the shared Axios interceptor after setting the API origin.
    require("./configureApi");
  });
  afterEach(clearCsrfToken);

  it("sends cookies + CSRF only to our authenticated API writes", async () => {
    setCsrfToken("a".repeat(64));
    const response = await axios.request({
      url: "https://api.check-this-one.com/list/update/42",
      method: "PUT",
      data: {},
      adapter,
    });
    const cfg = response.config as TestConfig;
    expect(cfg.withCredentials).toBe(true);
    expect(cfg.headers["X-CSRF-Token"]).toBe("a".repeat(64));
    expect(cfg.headers.Authorization).toBeUndefined();
  });

  it("does not send CSRF on an API GET", async () => {
    setCsrfToken("a".repeat(64));
    const response = await axios.get("https://api.check-this-one.com/session", { adapter });
    const cfg = response.config as TestConfig;
    expect(cfg.withCredentials).toBe(true);
    expect(cfg.headers["X-CSRF-Token"]).toBeUndefined();
  });

  it("does not send cookie credentials or CSRF to external providers", async () => {
    setCsrfToken("b".repeat(64));
    for (const url of [
      "https://api.themoviedb.org/3/search/movie",
      "https://www.googleapis.com/youtube/v3/search",
      "https://api.check-this-one.com.evil.test/list/update/42",
    ]) {
      const response = await axios.post(url, { query: "film" }, { adapter });
      const cfg = response.config as TestConfig;
      expect(cfg.withCredentials).not.toBe(true);
      expect(cfg.headers["X-CSRF-Token"]).toBeUndefined();
      expect(cfg.headers.Authorization).toBeUndefined();
    }
  });
});
