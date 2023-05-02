import { periods, runtimes, languages, tv_runtimes } from "../utils/BingeBuddy";
import axios from "axios";
import trad from "../lang/traduction";
import { Link } from "react-router-dom";
import Poster from "../assets/poster.jpg";
import { FaFilm, FaTv } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { AppContext, defaultBuddyForm } from "../contexts/AppContext";
import LazyImage from "../components/Common/LazyImage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { scrollToTop } from "../utils/UsefullFunctions";
import { watchRegionsFr } from "../utils/WatchProviderRegions";
import { handleLang } from "../utils/RequestLanguageHandler";

interface IGenre {
  id: number;
  name: string;
}

function BingeBuddy() {
  const {
    lang,
    darkMode,
    results,
    setResults,
    currentStep,
    setCurrentStep,
    isFinished,
    setIsFinished,
    page,
    setPage,
    totalPages,
    setTotalPages,
    buddyForm,
    setBuddyForm,
  } = useContext(AppContext);
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<IGenre[]>();
  const [providers, setProviders] = useState<any[]>([]);

  const types = [
    {
      name: trad[lang].modals.movie,
      icon: FaFilm,
      type: "movie",
      link: "moviesSearch",
    },
    {
      name: trad[lang].modals.tvShow,
      icon: FaTv,
      type: "tv",
      link: "showsSearch",
    },
  ];

  // HANDLE PREVIOUS STEP
  const handlePreviousStep = () => {
    if (currentStep === 7) {
      if (buddyForm.type === "tv") {
        setCurrentStep(5);
      } else if (buddyForm.type === "movie") {
        setCurrentStep(currentStep - 1);
      }
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // HANDLE NEXT STEP
  const handleNextStep = () => {
    if (currentStep === 5) {
      if (buddyForm.type === "movie") {
        setCurrentStep(6);
      } else if (buddyForm.type === "tv") {
        setCurrentStep(7);
      }
    } else if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  // HANDLE BUTTON CLICK
  const handleButtonClick = () => {
    if (currentStep === 6 && buddyForm.type === "movie") {
      fetchRecommendations();
    } else if (currentStep === 7 && buddyForm.type === "tv") {
      fetchRecommendations();
    } else {
      handleNextStep();
    }
  };

  // GET WATCH PROVIDERS
  const getWatchProviders = async () => {
    if (currentStep === 2) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/watch/providers/${buddyForm.type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${handleLang}&watch_region=${buddyForm.userLocation}`
        );
        setProviders(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getWatchProviders();
  }, [currentStep, buddyForm.type, buddyForm.userLocation]);

  // GET GENRES
  const getGenres = async () => {
    try {
      if (buddyForm.type === "") return;

      if (currentStep === 4 && buddyForm.type === "movie") {
        const data = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
        );
        setGenres(data.data.genres);
      }

      if (currentStep === 4 && buddyForm.type === "tv") {
        const data = await axios.get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
        );
        setGenres(data.data.genres);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, [buddyForm.type, currentStep, lang]);

  // FETCH RECOMMENDATIONS
  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/${buddyForm.type}?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=${lang}&with_original_language=${
          buddyForm.language
        }&with_genres=${buddyForm.genre}&primary_release_date.gte=${
          buddyForm.period.start
        }&primary_release_date.lte=${buddyForm.period.end}&first_air_date.gte=${
          buddyForm.period.start
        }&first_air_date.lte=${buddyForm.period.end}&with_runtime.gte=${
          buddyForm.runtime.start
        }&with_runtime.lte=${
          buddyForm.runtime.end
        }&with_watch_providers=${buddyForm.watchProvider.join(
          "|"
        )}&page=${page}&watch_region=${buddyForm.userLocation}`
      );

      // Filter the results by excluding those with their ID is equal to user.seenContent.provider_id
      const filteredResults = response.data.results.filter((result) => {
        return !user.seenContent.some(
          (content) => content.provider_id === result.id
        );
      });

      setTotalPages(response.data.total_pages);
      setResults(filteredResults);
      setIsFinished(true);
      setCurrentStep(0);
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLE NEXT PAGE
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchRecommendations();
      scrollToTop();
    }
  };

  // HANDLE PREVIOUS PAGE
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchRecommendations();
      scrollToTop();
    }
  };

  // HANDLE RESET
  const handleReset = () => {
    setCurrentStep(1);
    setBuddyForm(defaultBuddyForm);
    setIsFinished(false);
    setResults([]);
    setPage(1);
  };

  return (
    <div
      className={`flex h-full min-h-screen flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } py-16`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="mt-8 w-full border-b border-primary px-4 pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%] lg:px-0">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].pageTitles.bingeBuddy}
        </h3>
      </div>

      {/*----- PAGE CONTENT -----*/}
      <div className="mt-4 flex w-full flex-col items-center pb-5 lg:mt-0 lg:w-[70%] lg:px-0">
        {/* BINGE BUDDY */}
        <div className="w-full">
          {!isFinished ? (
            <div className="flex w-full flex-row items-center justify-between px-4">
              {/* DESCRIPTION */}
              <p
                className={`${darkMode ? "text-gray-300" : "text-smokyBlack"}`}
              >
                {trad[lang].bingeBuddy.description}
              </p>

              {/* BOT */}
              <img
                id="floating-bot"
                className="aspect-square w-1/3 lg:h-40 lg:w-40"
                src="https://ucarecdn.com/8e0be7eb-743d-4b8e-8bb0-dfe9a8f7b4ba/bingeBuddy.png"
                alt=""
              />
            </div>
          ) : (
            <div className="flex w-full flex-row items-center justify-center gap-4 px-4">
              {/* BOT */}
              <img
                id="floating-bot"
                className="aspect-square w-1/3 lg:h-40 lg:w-40"
                src="https://ucarecdn.com/a68114ff-dc90-401b-aeeb-eea715503799/bingeBuddymodifi01.png"
                alt=""
              />

              {/* DESCRIPTION */}
              <p
                className={`${darkMode ? "text-gray-300" : "text-smokyBlack"}`}
              >
                {trad[lang].bingeBuddy.results}
              </p>
            </div>
          )}

          {/* Status bar */}
          <div></div>

          {/* STEPS */}
          {currentStep !== 0 && (
            <div
              className={`my-4 flex flex-col items-center gap-6 px-4 pt-9 pb-4 lg:my-0 lg:rounded-md ${
                darkMode ? "bg-darkQuar" : "bg-myWhite"
              }`}
            >
              {currentStep === 1 && (
                <>
                  {/* STEP 1 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step1}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row items-center justify-center gap-4">
                    {types.map((type) => (
                      <div
                        key={type.type}
                        onClick={() =>
                          setBuddyForm({ ...buddyForm, type: type.type })
                        }
                        className={`m-0 flex aspect-square w-24 cursor-pointer flex-col items-center justify-around gap-1 rounded-md p-4 text-sm lg:w-24 ${
                          buddyForm.type === type.type
                            ? darkMode
                              ? "bg-darkSec text-primary"
                              : "bg-myLightGray text-primary"
                            : darkMode
                            ? "bg-darkSec text-altSecondary"
                            : "bg-myLightGray text-secondary"
                        }`}
                      >
                        <type.icon className="h-5 w-5 lg:h-7 lg:w-7" />
                        <p>{type.name}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* STEP 2 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step2}
                  </h4>

                  <select
                    id="location"
                    name="location"
                    className={`mt-1 block w-full rounded-md lg:w-1/2 ${
                      darkMode
                        ? "bg-darkQuin text-gray-300"
                        : "bg-white text-smokyBlack"
                    } border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-0 sm:text-sm`}
                    defaultValue={lang === "fr" ? "FR" : "US"}
                    onChange={(e) =>
                      setBuddyForm({
                        ...buddyForm,
                        userLocation: e.target.value,
                      })
                    }
                  >
                    {watchRegionsFr.map((region) => (
                      <option key={region.iso_3166_1} value={region.iso_3166_1}>
                        {lang === "fr"
                          ? region.native_name
                          : region.english_name}
                      </option>
                    ))}
                  </select>

                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step2bis}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex w-full flex-row gap-4 overflow-x-scroll lg:max-h-80 lg:flex-wrap lg:items-center lg:justify-center">
                    {providers.map((provider) => (
                      <div
                        key={`provider-${provider.provider_id}`}
                        onClick={() => {
                          const newProviders = buddyForm.watchProvider.includes(
                            provider.provider_id
                          )
                            ? buddyForm.watchProvider.filter(
                                (p) => p !== provider.provider_id
                              )
                            : [
                                ...buddyForm.watchProvider,
                                provider.provider_id,
                              ];

                          setBuddyForm({
                            ...buddyForm,
                            watchProvider: newProviders,
                          });
                        }}
                        className={`m-0 flex aspect-square h-36 w-36 cursor-pointer flex-col items-center justify-around gap-1 rounded-md p-4 text-center text-sm ${
                          buddyForm.watchProvider.includes(provider.provider_id)
                            ? darkMode
                              ? "bg-darkSec text-primary"
                              : "bg-myLightGray text-primary"
                            : darkMode
                            ? "bg-darkSec text-altSecondary"
                            : "bg-myLightGray text-secondary"
                        }`}
                      >
                        <img
                          key={`provider-${provider.provider_id}`}
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            provider.logo_path
                          }
                          className={`h-12 rounded-md ${
                            buddyForm.watchProvider.includes(
                              provider.provider_id
                            ) && "border-2 border-primary"
                          }`}
                          alt={provider.provider_name}
                        />
                        <p>{provider.provider_name}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  {/* STEP 3 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step3}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {languages.map((language) => (
                      <div
                        key={language.value}
                        onClick={() =>
                          setBuddyForm({
                            ...buddyForm,
                            language: language.value,
                          })
                        }
                        className={`m-0 flex aspect-square w-24 cursor-pointer flex-col items-center justify-around gap-1 rounded-md p-4 text-sm lg:w-28 ${
                          buddyForm.language === language.value
                            ? darkMode
                              ? "bg-darkSec text-primary"
                              : "bg-myLightGray text-primary"
                            : darkMode
                            ? "bg-darkSec text-altSecondary"
                            : "bg-myLightGray text-secondary"
                        }`}
                      >
                        <p>{language[`name_${lang}`]}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  {/* STEP 4 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step4}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {genres?.map((genre) => (
                      <div
                        key={genre.id}
                        onClick={() =>
                          setBuddyForm({ ...buddyForm, genre: genre.id })
                        }
                        className={`flex aspect-square w-24 cursor-pointer flex-col items-center justify-center rounded-md p-3 text-center text-sm ${
                          buddyForm.genre === genre.id
                            ? darkMode
                              ? "bg-darkSec text-primary"
                              : "bg-myLightGray text-primary"
                            : darkMode
                            ? "bg-darkSec text-altSecondary"
                            : "bg-myLightGray text-secondary"
                        }`}
                      >
                        {genre.name}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 5 && (
                <>
                  {/* STEP 5 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step5}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {periods.map((period) => (
                      <div
                        key={period.start_value}
                        onClick={() =>
                          setBuddyForm({
                            ...buddyForm,
                            period: {
                              start: period.start_value,
                              end: period.end_value,
                            },
                          })
                        }
                        className={`flex aspect-square w-24 cursor-pointer flex-col items-center justify-center rounded-md p-3 text-center text-sm ${
                          buddyForm.period.start === period.start_value
                            ? darkMode
                              ? "bg-darkSec text-primary"
                              : "bg-myLightGray text-primary"
                            : darkMode
                            ? "bg-darkSec text-altSecondary"
                            : "bg-myLightGray text-secondary"
                        }`}
                      >
                        {period[`name_${lang}`]}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 6 && (
                <>
                  {/* STEP 6 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step6}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {runtimes.map((runtime) => (
                      <div
                        key={runtime.start_value}
                        onClick={() =>
                          setBuddyForm({
                            ...buddyForm,
                            runtime: {
                              start: runtime.start_value,
                              end: runtime.end_value,
                            },
                          })
                        }
                        className={`flex aspect-square w-24 cursor-pointer flex-col items-center justify-center rounded-md p-3 text-center text-sm ${
                          buddyForm.runtime.start === runtime.start_value
                            ? darkMode
                              ? "bg-darkSec text-primary"
                              : "bg-myLightGray text-primary"
                            : darkMode
                            ? "bg-darkSec text-altSecondary"
                            : "bg-myLightGray text-secondary"
                        }`}
                      >
                        {runtime[`name_${lang}`]}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 7 && (
                <>
                  {/* STEP 7 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step7}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {tv_runtimes.map((runtime) => (
                      <div
                        key={runtime.start_value}
                        onClick={() =>
                          setBuddyForm({
                            ...buddyForm,
                            runtime: {
                              start: runtime.start_value,
                              end: runtime.end_value,
                            },
                          })
                        }
                        className={`flex aspect-square w-24 cursor-pointer flex-col items-center justify-center rounded-md p-3 text-center text-sm ${
                          buddyForm.runtime.start === runtime.start_value
                            ? darkMode
                              ? "bg-darkSec text-primary"
                              : "bg-myLightGray text-primary"
                            : darkMode
                            ? "bg-darkSec text-altSecondary"
                            : "bg-myLightGray text-secondary"
                        }`}
                      >
                        {runtime[`name_${lang}`]}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex w-full flex-row items-center justify-end gap-4">
                {/* --*-- */}
                {currentStep === 2 && (
                  <p className="text-sm text-altRed">
                    {trad[lang].bingeBuddy.dontCare}
                  </p>
                )}

                {/* PREVIOUS BTN */}
                {currentStep > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className={`rounded-md px-4 py-3 ${
                      darkMode
                        ? "bg-altSecondary text-darkBg"
                        : "bg-secondary text-myWhite"
                    }`}
                  >
                    {trad[lang].bingeBuddy.previous}
                  </button>
                )}

                {/* NEXT BTN */}
                {currentStep > 0 && (
                  <button
                    onClick={handleButtonClick}
                    disabled={
                      (currentStep === 1 && buddyForm.type === "") ||
                      (currentStep === 2 && !buddyForm.watchProvider) ||
                      (currentStep === 3 && buddyForm.language === "") ||
                      (currentStep === 4 && buddyForm.genre === 0) ||
                      (currentStep === 5 && buddyForm.period.start === "") ||
                      (currentStep === 6 && buddyForm.runtime.start === 0)
                    }
                    className={`rounded-md px-4 py-3 ${
                      darkMode
                        ? "bg-altSecondary text-darkBg"
                        : "bg-secondary text-myWhite"
                    }`}
                  >
                    {currentStep === 7
                      ? trad[lang].bingeBuddy.finish
                      : currentStep === 6 && buddyForm.type === "movie"
                      ? trad[lang].bingeBuddy.finish
                      : trad[lang].bingeBuddy.next}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RESULTS */}
        {isFinished && (
          <div className="flex w-full flex-col items-center">
            {" "}
            <div className="flex w-full flex-row items-center justify-end">
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
            <div className="my-8 flex flex-row flex-wrap items-center justify-center gap-4">
              {results.length > 0 ? (
                results.map((result) => (
                  <Link
                    to={
                      buddyForm.type === "movie"
                        ? `/movieDetails/${result.id}`
                        : `/tvDetails/${result.id}`
                    }
                  >
                    <LazyImage
                      src={
                        result.poster_path
                          ? "https://image.tmdb.org/t/p/w500" +
                            result.poster_path
                          : Poster
                      }
                      className="h-40 w-[107px] rounded-md md:h-80 md:w-[214px]"
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
            {page < totalPages && (
              <div className="flex w-full flex-row items-center justify-between lg:w-3/5">
                {/* Previous button */}
                <button
                  disabled={page === 1}
                  className={`${
                    (darkMode && page === 1) || page === 1
                      ? "cursor-not-allowed text-gray-300"
                      : darkMode
                      ? "text-altSecondary hover:text-primary"
                      : "text-secondary hover:text-primary"
                  } ${
                    darkMode ? "bg-darkTert" : "bg-myWhite"
                  } rounded-l-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0`}
                  onClick={() => handlePreviousPage()}
                >
                  {trad[lang].global.previous}
                </button>

                <span
                  className={`${
                    darkMode
                      ? "bg-darkTert text-altSecondary"
                      : "bg-myWhite text-secondary"
                  } h-10 border-t border-b px-4 py-2`}
                >
                  {page}
                </span>

                {/* Next button */}
                <button
                  disabled={page === totalPages}
                  className={`${
                    (darkMode && page === totalPages) || page === totalPages
                      ? "cursor-not-allowed text-gray-300"
                      : darkMode
                      ? "text-altSecondary hover:text-primary"
                      : "text-secondary hover:text-primary"
                  } ${
                    darkMode ? "bg-darkTert" : "bg-myWhite"
                  } rounded-r-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0`}
                  onClick={() => handleNextPage()}
                >
                  {trad[lang].global.next}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BingeBuddy;
