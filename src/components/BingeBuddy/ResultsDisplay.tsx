import { Link } from "react-router-dom";
import trad from "../../lang/traduction";
import LazyImage from "../Common/LazyImage";
import { GrFormPrevious, GrPowerReset } from "react-icons/gr";
import Poster from "../../assets/poster.jpg";
import { IBuddyForm, defaultBuddyForm } from "../../contexts/AppContext";
import { Dispatch, SetStateAction, useEffect } from "react";
import ResultsPagination from "./ResultsPagination";
import useRecommendations from "../../hooks/useRecommendations";

interface IResultsDisplayProps {
  lang: string;
  darkMode: boolean;
  results: any[];
  page: number;
  totalPages: number;
  buddyForm: IBuddyForm;
  isFinished: boolean;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setBuddyForm: Dispatch<SetStateAction<IBuddyForm>>;
  setIsFinished: Dispatch<SetStateAction<boolean>>;
  setResults: Dispatch<SetStateAction<any[]>>;
  setPage: Dispatch<SetStateAction<number>>;
}

function ResultsDisplay({
  lang,
  darkMode,
  results,
  page,
  totalPages,
  buddyForm,
  isFinished,
  setCurrentStep,
  setBuddyForm,
  setIsFinished,
  setResults,
  setPage,
}: IResultsDisplayProps) {
  // HANDLE RESET
  const handleReset = () => {
    setCurrentStep(1);
    setBuddyForm(defaultBuddyForm);
    setIsFinished(false);
    setResults([]);
    setPage(1);
  };

  const handlePreviousStep = () => {
    if (buddyForm.type === "tv") {
      setCurrentStep(7);
      setIsFinished(false);
    } else if (buddyForm.type === "movie") {
      setCurrentStep(6);
      setIsFinished(false);
    }
  };

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const { fetchRecommendations } = useRecommendations(apiKey);

  useEffect(() => {
    if (isFinished) {
      fetchRecommendations();
    }
  }, [page]);

  if (!isFinished) return null;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-row items-center justify-end gap-3 px-4 md:px-0">
        <button
          onClick={handlePreviousStep}
          className={`flex flex-row items-center gap-2 rounded-md px-4 py-2 ${
            darkMode
              ? "bg-altSecondary text-darkBg"
              : "bg-secondary text-myWhite"
          }`}
        >
          <GrFormPrevious /> {trad[lang].bingeBuddy.previous}
        </button>
        <button
          onClick={handleReset}
          className={`flex flex-row items-center gap-2 rounded-md px-4 py-2 ${
            darkMode
              ? "bg-altSecondary text-darkBg"
              : "bg-secondary text-myWhite"
          }`}
        >
          <GrPowerReset /> {trad[lang].bingeBuddy.reset}
        </button>
      </div>
      <div className="my-4 flex flex-row flex-wrap items-center justify-center gap-3">
        {results.length > 0 ? (
          results.map((result) => (
            <Link
              key={result.id}
              to={
                buddyForm.type === "movie"
                  ? `/movieDetails/${result.id}`
                  : `/tvDetails/${result.id}`
              }
            >
              <LazyImage
                src={
                  result.poster_path
                    ? "https://image.tmdb.org/t/p/w500" + result.poster_path
                    : Poster
                }
                className="h-40 w-[107px] rounded-md md:h-60 md:w-40"
                alt={result?.original_title}
              />
            </Link>
          ))
        ) : (
          <p
            className={`italic ${
              darkMode ? "text-gray-300" : "text-smokyBlack"
            }`}
          >
            {trad[lang].bingeBuddy.noResults}
          </p>
        )}
      </div>
      {/* PAGINATION */}
      <ResultsPagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        darkMode={darkMode}
        lang={lang}
      />
    </div>
  );
}

export default ResultsDisplay;
