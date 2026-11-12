import axios from "axios";
import { useCallback, useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function useRecommendations(apiKey) {
  const {
    lang,
    setResults,
    setTotalPages,
    buddyForm,
    setIsFinished,
    setCurrentStep,
    page,
    setTotalResults,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = useCallback(async () => {
    if (!buddyForm.type) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/${buddyForm.type}`,
        {
          params: {
            api_key: apiKey,
            language: lang,
            with_genres: buddyForm.genre.join("|"),
            with_original_language: buddyForm.language,
            with_watch_providers: buddyForm.watchProvider.join("|"),
            [`primary_release_date.gte`]: buddyForm.period.start,
            [`primary_release_date.lte`]: buddyForm.period.end,
            [`with_runtime.gte`]: buddyForm.runtime.start,
            [`with_runtime.lte`]: buddyForm.runtime.end,
            [`first_air_date.gte`]: buddyForm.period.start,
            [`first_air_date.lte`]: buddyForm.period.end,
            page: page,
            watch_region: buddyForm.userLocation,
            sort_by: "popularity.desc",
            include_null_first_air_dates: false,
          },
        }
      );
      setResults(response.data.results);
      setTotalPages(response.data.total_pages);
      setTotalResults(response.data.total_results);
      setIsFinished(true);
      setCurrentStep(0);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [buddyForm, lang, page, apiKey, setResults, setTotalPages, setTotalResults, setIsFinished, setCurrentStep]);

  return { fetchRecommendations, isLoading, error };
}

export default useRecommendations;
