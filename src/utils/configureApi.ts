import axios from "axios";
import { getAccessToken } from "./authToken";

const apiBase = process.env.REACT_APP_API_URL?.replace(/\/+$/, "");

// Never send the CTO JWT to TMDB, YouTube or any other external origin.
axios.interceptors.request.use((config) => {
  const token = getAccessToken();
  const url = config.url ?? "";
  if (token && apiBase && (url === apiBase || url.startsWith(apiBase + "/"))) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});
