import axios from "axios";
import { useState, useEffect } from "react";

function useWatchProviders(type, location, apiKey, language) {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!type || !location || !apiKey || !language) return;

    const fetchProviders = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/watch/providers/${type}`,
          {
            params: { api_key: apiKey, language, watch_region: location },
          }
        );
        setProviders(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, [type, location, apiKey, language]);

  return { providers, isLoading, error };
}

export default useWatchProviders;
