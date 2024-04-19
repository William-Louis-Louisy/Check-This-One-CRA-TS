import axios from "axios";
import { useState, useEffect } from "react";
interface IGenre {
  id: number;
  name: string;
}

function useGenres(type, apiKey, language) {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!type || !apiKey || !language) return;

    const fetchGenres = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list`,
          {
            params: { api_key: apiKey, language },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, [type, apiKey, language]);

  return { genres, isLoading, error };
}

export default useGenres;
