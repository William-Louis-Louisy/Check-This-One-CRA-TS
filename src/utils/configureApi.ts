import axios from "axios";
import { getCsrfToken } from "./csrfToken";

const apiBase = process.env.REACT_APP_API_URL?.replace(/\/+$/, "");

if (!apiBase) {
  console.warn("REACT_APP_API_URL is not configured");
}

// Requests to external providers must never receive CTO session cookies or CSRF.
axios.interceptors.request.use((config) => {
  const url = config.url ?? "";
  if (apiBase && (url === apiBase || url.startsWith(apiBase + "/"))) {
    config.withCredentials = true;
    const method = (config.method ?? "get").toUpperCase();
    const token = getCsrfToken();
    if (token && !["GET", "HEAD", "OPTIONS"].includes(method)) {
      config.headers = { ...config.headers, "X-CSRF-Token": token };
    }
  }
  return config;
});
