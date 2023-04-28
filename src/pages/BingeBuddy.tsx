import {
  periods,
  runtimes,
  languages,
  bingeOptions,
} from "../utils/BingeBuddy";
import axios from "axios";
import trad from "../lang/traduction";
import { Link } from "react-router-dom";
import Poster from "../assets/poster.jpg";
import { FaFilm, FaTv } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { AppContext } from "../contexts/AppContext";
import LazyImage from "../components/Common/LazyImage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

interface IBuddyForm {
  type: string;
  language: string;
  genre: number;
  period: { start: string; end: string };
  runtime: number;
  binge: boolean;
}

interface IGenre {
  id: number;
  name: string;
}

const defaultBuddyForm: IBuddyForm = {
  type: "",
  language: "",
  genre: 0,
  period: { start: "", end: "" },
  runtime: 0,
  binge: false,
};

function BingeBuddy() {
  const { lang, darkMode } = useContext(AppContext);
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [buddyForm, setBuddyForm] = useState(defaultBuddyForm);
  const [genres, setGenres] = useState<IGenre[]>();
  const [results, setResults] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

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
    if (currentStep === 6) {
      if (buddyForm.type === "tv") {
        setCurrentStep(4);
      } else if (buddyForm.type === "movie") {
        setCurrentStep(currentStep - 1);
      }
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // HANDLE NEXT STEP
  const handleNextStep = () => {
    if (currentStep === 4) {
      if (buddyForm.type === "movie") {
        setCurrentStep(5);
      } else if (buddyForm.type === "tv") {
        setCurrentStep(6);
      }
    } else if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleButtonClick = () => {
    if (currentStep === 5 && buddyForm.type === "movie") {
      fetchRecommendations();
    } else if (currentStep === 6 && buddyForm.type === "tv") {
      fetchRecommendations();
    } else {
      handleNextStep();
    }
  };

  const getGenres = async () => {
    try {
      if (buddyForm.type === "") return;

      if (currentStep === 3 && buddyForm.type === "movie") {
        const data = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr`
        );
        setGenres(data.data.genres);
      }

      if (currentStep === 3 && buddyForm.type === "tv") {
        const data = await axios.get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr`
        );
        setGenres(data.data.genres);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, [buddyForm.type, currentStep]);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/${buddyForm.type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&with_original_language=${buddyForm.language}&with_genres=${buddyForm.genre}&primary_release_date.gte=${buddyForm.period.start}&primary_release_date.lte=${buddyForm.period.end}&with_runtime.gte=${buddyForm.runtime}`
      );

      let filteredResults = response.data.results;

      if (buddyForm.type === "tv") {
        const tvDetailsPromises = filteredResults.map((result) =>
          axios.get(
            `https://api.themoviedb.org/3/tv/${result.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
          )
        );
        const tvDetailsResponses = await Promise.all(tvDetailsPromises);
        const tvDetailsResults = tvDetailsResponses.map(
          (response) => response.data
        );

        if (buddyForm.binge) {
          filteredResults = tvDetailsResults.filter(
            (result) => result.number_of_seasons >= 2
          );
        } else {
          filteredResults = tvDetailsResults.filter(
            (result) => result.number_of_seasons === 1
          );
        }
      }

      setResults(filteredResults);
      setIsFinished(true);
      setCurrentStep(0);
      setBuddyForm(defaultBuddyForm);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setBuddyForm(defaultBuddyForm);
    setIsFinished(false);
    setResults([]);
  };

  // Filter the results by excluding those with their ID is equal to user.seenContent.provider_id
  const filteredResults = results.filter((result) => {
    return !user.seenContent.some(
      (content) => content.provider_id === result.id
    );
  });

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
                className="aspect-square w-1/3 lg:h-60 lg:w-60"
                src="https://ucarecdn.com/8e0be7eb-743d-4b8e-8bb0-dfe9a8f7b4ba/bingeBuddy.png"
                alt=""
              />
            </div>
          ) : (
            <div className="flex w-full flex-row items-center justify-center gap-4 px-4">
              {/* BOT */}
              <img
                id="floating-bot"
                className="aspect-square w-1/3 lg:h-60 lg:w-60"
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
              className={`my-8 flex flex-col items-center gap-6 rounded-md p-4 ${
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
                        className={`m-0 flex aspect-square w-24 cursor-pointer flex-col items-center justify-around gap-1 rounded-md p-4 text-sm font-bold lg:w-24 lg:text-base ${
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
                        className={`m-0 flex aspect-square w-24 cursor-pointer flex-col items-center justify-around gap-1 rounded-md p-4 text-sm font-bold lg:w-28 lg:text-base ${
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

              {currentStep === 3 && (
                <>
                  {/* STEP 3 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step3}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {genres?.map((genre) => (
                      <div
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

              {currentStep === 4 && (
                <>
                  {/* STEP 4 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step4}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {periods.map((period) => (
                      <div
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

              {currentStep === 5 && (
                <>
                  {/* STEP 5 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step5}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {runtimes.map((runtime) => (
                      <div
                        onClick={() =>
                          setBuddyForm({
                            ...buddyForm,
                            runtime: runtime.value,
                          })
                        }
                        className={`flex aspect-square w-24 cursor-pointer flex-col items-center justify-center rounded-md p-3 text-center text-sm ${
                          buddyForm.runtime === runtime.value
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

              {currentStep === 6 && (
                <>
                  {/* STEP 6 */}
                  {/* Step Question */}
                  <h4 className="text-lg font-medium text-primary">
                    {trad[lang].bingeBuddy.steps.step6}
                  </h4>

                  {/* Answer choices */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {bingeOptions.map((bingeOption) => (
                      <div
                        onClick={() =>
                          setBuddyForm({
                            ...buddyForm,
                            binge: bingeOption.value,
                          })
                        }
                        className={`flex aspect-square w-24 cursor-pointer flex-col items-center justify-center rounded-md p-3 text-center text-sm ${
                          buddyForm.binge === bingeOption.value
                            ? darkMode
                              ? "bg-darkSec text-primary"
                              : "bg-myLightGray text-primary"
                            : darkMode
                            ? "bg-darkSec text-altSecondary"
                            : "bg-myLightGray text-secondary"
                        }`}
                      >
                        {bingeOption[`name_${lang}`]}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex w-full flex-row items-center justify-end gap-4">
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
                      (currentStep === 2 && buddyForm.language === "") ||
                      (currentStep === 3 && buddyForm.genre === 0) ||
                      (currentStep === 4 && buddyForm.period.start === "") ||
                      (currentStep === 5 && buddyForm.runtime === 0)
                    }
                    className={`rounded-md px-4 py-3 ${
                      darkMode
                        ? "bg-altSecondary text-darkBg"
                        : "bg-secondary text-myWhite"
                    }`}
                  >
                    {currentStep === 6
                      ? trad[lang].bingeBuddy.finish
                      : currentStep === 5 && buddyForm.type === "movie"
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
              {filteredResults.length > 0 &&
                filteredResults.map((result) => (
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
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BingeBuddy;
