import { ClipboardListIcon, EyeIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CastCard from "../components/Cards/CastCard";
import PageLoader from "../components/Common/PageLoader";
import AddToList from "../components/Modals/AddToList";
import CreateListForm from "../components/Modals/CreateListForm";
import Tabs from "../components/Navigation/Tabs";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import trad from "../lang/traduction";
import { IMovieProvider } from "../types/MovieProvider";
import { IShowDetails } from "../types/ShowDetails";
import { ISuggestedShow } from "../types/SuggestedShow";
import { formatDateUsToFr } from "../utils/DateFormater";
import { handleLang } from "../utils/RequestLanguageHandler";

function TvShowDetails() {
  // GET MOVIE ID FROM URL
  const tvShowId = useParams();
  // GET LANG FROM CONTEXT
  const { lang, darkMode } = useContext(AppContext);
  // GET USER FROM CONTEXT
  const { user } = useContext(UserContext);
  // STATES
  const [lists, setLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [listsCount, setListsCount] = useState<Number>(0);
  const [show, setShow] = useState<IShowDetails>();
  const [contentToList, setContentToList] = useState();
  const [contentTitle, setContentTitle] = useState("");
  const [openNewList, setOpenNewList] = useState(false);
  const [watchProviders, setWatchProviders] = useState();
  const [selectedCountry, setSelectedCountry] = useState("FR");
  const [similarShows, setSimilarShows] = useState<ISuggestedShow[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<IMovieProvider>();
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [dataDisplayed, setDataDisplayed] = useState("informations");

  // TABS
  const tabs = [
    {
      name: trad[lang].movieDetails.informations,
      action: () => setDataDisplayed("informations"),
      current: dataDisplayed === "informations",
    },
    {
      name: trad[lang].movieDetails.cast,
      action: () => setDataDisplayed("cast"),
      current: dataDisplayed === "cast",
    },
  ];

  // GET SHOW BY ID
  const getShow = async () => {
    if (tvShowId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_TMDB_SHOWS_URL}/${
            tvShowId.tvShowId
          }?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${handleLang(
            lang
          )}`
        );
        setShow(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // GET ALL LISTS COUNT THAT CONTAIN A PROVIDER ID
  const getListsCount = async () => {
    if (tvShowId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/lists/getCountByProviderId/${tvShowId.tvShowId}`
        );
        setListsCount(data.data.count);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // GET WATCH PROVIDERS BY SHOW ID
  const getWatchProviders = async () => {
    if (tvShowId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_TMDB_SHOWS_URL}/${tvShowId.tvShowId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setWatchProviders(data.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // FILTER WATCH PROVIDERS BY COUNTRY
  const filterWatchProviders = () => {
    if (watchProviders) {
      const filteredWatchProviders = watchProviders[selectedCountry];
      setFilteredProviders(filteredWatchProviders);
    }
  };

  // GET SIMILAR SHOWS BY SHOW ID
  const getSimilarMovies = async () => {
    if (tvShowId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_TMDB_SHOWS_URL}/${
            tvShowId.tvShowId
          }/similar?api_key=${
            process.env.REACT_APP_TMDB_API_KEY
          }&language=${handleLang(lang)}&page=1`
        );
        setSimilarShows(data.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // GET CAST BY SHOW ID
  const getCast = async () => {
    if (tvShowId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_TMDB_SHOWS_URL}/${
            tvShowId.tvShowId
          }/credits?api_key=${
            process.env.REACT_APP_TMDB_API_KEY
          }&language=${handleLang(lang)}`
        );
        setCast(data.data.cast);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getShow();
    getWatchProviders();
    getSimilarMovies();
    getListsCount();
    getCast();
  }, [tvShowId, lang]);

  useEffect(() => {
    filterWatchProviders();
  }, [watchProviders, selectedCountry]);

  // GET LISTS BY USER ID
  const getLists = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/lists/getByUserId/${user?.id}?paginate=false`
      );
      setLists(data.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (user?.id) getLists();
  }, [user?.id]);

  // ADD SHOW TO LIST
  const handleAddToList = (content) => {
    setOpen(true);
    setContentToList(content);
    setContentTitle(content.name);
  };

  if (loading) return <PageLoader lang={lang} darkMode={darkMode} />;

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center py-16 ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      }`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="my-8 w-[90%] border-b border-primary pb-3 sm:flex sm:items-center sm:justify-between sm:pb-5 lg:w-[70%]">
        {/* TITLE */}
        <h3 className="text-xl font-medium leading-6 text-primary sm:text-2xl">
          {show?.name}
        </h3>
        <div className="mt-3 flex flex-row items-center justify-end gap-3 sm:mt-0">
          {/* LISTS COUNT */}
          {/* {listsCount > 0 && (
            <Link
              to="#"
              className="rounded-md border border-secondary px-2 py-1 sm:px-4 sm:py-2"
            >
              <span className="flex flex-row items-center gap-2 text-sm font-medium text-secondary">
                <EyeIcon
                  className="hidden h-5 w-5 sm:flex"
                  aria-hidden="true"
                />
                {trad[lang].movieDetails.thisMovieappearsIn} {listsCount}{" "}
                {listsCount > 1
                  ? trad[lang].global.lists
                  : trad[lang].global.list}
              </span>
            </Link>
          )} */}

          {/* ADD TO LIST BUTTON */}
          {user?.id && (
            <button
              className={`inline-flex items-center gap-2 rounded-md border border-transparent px-2 py-1 text-sm font-medium shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-0  focus:ring-offset-0 sm:px-4 sm:py-2 sm:text-base ${
                darkMode
                  ? "bg-altSecondary text-darkBg"
                  : "bg-secondary text-myWhite"
              }`}
              onClick={() => handleAddToList(show)}
            >
              <ClipboardListIcon
                className="hidden h-5 w-5 sm:flex"
                aria-hidden="true"
              />
              {trad[lang].labels.addToAList}
            </button>
          )}
        </div>
      </div>

      {/*----- SHOW DETAILS -----*/}
      <div className="flex w-full flex-col items-center sm:flex-row sm:items-start lg:w-[70%]">
        <div className="mb-8 flex w-full flex-col items-center sm:mb-0 sm:w-2/5">
          {/* SHOW POSTER */}
          <img
            src={
              show?.poster_path
                ? "https://image.tmdb.org/t/p/w500" + show.poster_path
                : "/src/assets/poster.jpg"
            }
            className="w-64 rounded-md md:h-[480px] md:w-80"
            alt=""
          />

          {/* WATCH PROVIDERS */}
          <div
            className={`mt-3 flex w-80 flex-col items-center rounded-md ${
              darkMode ? "bg-darkTert text-gray-300" : "bg-[#FBFBFB]"
            }  p-3`}
          >
            {/* Title */}
            <h5 className="mb-3 w-full border-b border-primary text-lg font-medium leading-6 text-primary">
              {trad[lang].movieDetails.streamingProviders}
            </h5>
            {/* Country selector */}
            <div className="flex w-full flex-col items-start gap-1">
              <label htmlFor="location" className="block text-sm font-medium">
                {trad[lang].movieDetails.selectYourLocation}
              </label>
              <select
                id="location"
                name="location"
                className={`mt-1 block w-full rounded-md ${
                  darkMode ? "bg-darkQuin" : "bg-white"
                } border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-0 sm:text-sm`}
                defaultValue="FR"
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value={"FR"}>France</option>
                <option value={"GB"}>United Kingdom</option>
                <option value={"US"}>United States</option>
              </select>
            </div>
            {/* Divider */}
            <div className="my-3 h-[1px] w-full bg-gray-300"></div>

            {/* Providers */}
            <div className="flex flex-row items-center gap-2">
              {filteredProviders?.flatrate?.length > 0 ? (
                filteredProviders?.flatrate?.map((provider) => (
                  <img
                    key={`provider-${provider.provider_id}`}
                    src={"https://image.tmdb.org/t/p/w500" + provider.logo_path}
                    className="h-12 rounded-md"
                    alt=""
                  />
                ))
              ) : (
                <span>{trad[lang].movieDetails.noProvider}</span>
              )}
            </div>
          </div>
        </div>

        {/* SHOW INFORMATIONS */}
        <div
          className={`flex w-[90%] flex-col items-center gap-5 ${
            darkMode ? "text-gray-300" : "text-smokyBlack"
          } sm:ml-5 sm:w-3/5 sm:items-start`}
        >
          {/* Tabs */}
          <Tabs tabs={tabs} darkMode={darkMode} />
          {/* Main Informations */}
          {dataDisplayed === "informations" && (
            <>
              <div className="flex w-full flex-col items-start">
                {/* Original title */}
                <span className="flex w-full flex-row justify-between text-sm sm:text-base">
                  <span className="font-bold text-primary">
                    {trad[lang].showDetails.originalName}:
                  </span>{" "}
                  {show?.original_name}
                </span>

                {/* Release date */}
                {show?.first_air_date && (
                  <span className="flex w-full flex-row justify-between text-sm sm:text-base">
                    <span className="font-bold text-primary">
                      {trad[lang].showDetails.firstAirDate}:
                    </span>{" "}
                    {lang === "fr"
                      ? formatDateUsToFr(show?.first_air_date)
                      : show?.first_air_date}
                  </span>
                )}
              </div>

              <div className="flex w-full flex-col items-start">
                {/* Runtime */}
                {show?.episode_run_time?.length > 0 && show?.episode_run_time && (
                  <span className="flex w-full flex-row justify-between text-sm sm:text-base">
                    <span className="font-bold text-primary">
                      {trad[lang].showDetails.episodeRunTime}:
                    </span>{" "}
                    {show?.episode_run_time[0]} min
                  </span>
                )}

                {/* Number of episodes */}
                {show?.number_of_episodes && (
                  <span className="flex w-full flex-row justify-between text-sm sm:text-base">
                    <span className="font-bold text-primary">
                      {trad[lang].showDetails.numberOfEpisodes}:
                    </span>{" "}
                    {show?.number_of_episodes}
                  </span>
                )}

                {/* Number of seasons */}
                {show?.number_of_seasons && (
                  <span className="flex w-full flex-row justify-between text-sm sm:text-base">
                    <span className="font-bold text-primary">
                      {trad[lang].showDetails.numberOfSeasons}:
                    </span>{" "}
                    {show?.number_of_seasons}
                  </span>
                )}
              </div>

              {/* Genres */}
              {show?.genres && (
                <div className="flex w-full flex-col items-start text-sm sm:text-base">
                  <span className="font-bold text-primary">
                    {trad[lang].movieDetails.genres}:
                  </span>

                  <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-2">
                    {show?.genres.map((genre) => (
                      <span
                        className={`rounded-full ${
                          darkMode ? "bg-darkTert" : "bg-[#FBFBFB]"
                        } py-1 px-3 text-sm`}
                        key={`genre-${genre.id}`}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              {show?.overview && (
                <div className="flex w-full flex-col items-start text-sm sm:text-base">
                  <span className="font-bold text-primary">
                    {trad[lang].showDetails.overview}:
                  </span>
                  <span className="italic">{show?.overview}</span>
                </div>
              )}

              {/* Similar Shows */}
              {similarShows && similarShows.length > 0 && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-primary sm:text-base">
                    {trad[lang].movieDetails.recommendations}:
                  </span>
                  <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-5">
                    {similarShows?.slice(0, 12).map(
                      (show) =>
                        show?.backdrop_path && (
                          <Link
                            to={`/tvDetails/${show.id}`}
                            key={`similar-show-${show.id}`}
                          >
                            <img
                              src={
                                show?.poster_path
                                  ? "https://image.tmdb.org/t/p/w500" +
                                    show.poster_path
                                  : "/src/assets/poster.jpg"
                              }
                              className="w-24 rounded-md"
                              alt=""
                            />
                          </Link>
                        )
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Cast */}
          {dataDisplayed === "cast" && (
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {cast.map((actor) => (
                <CastCard
                  key={`actor-${actor.id}`}
                  id={actor.id}
                  name={actor.name}
                  department={actor.known_for_department}
                  role={actor.character}
                  imageUrl={actor.profile_path}
                  darkMode={darkMode}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* ADD TO LIST MODAL */}
      {user?.id && (
        <AddToList
          open={open}
          setOpen={setOpen}
          contentToList={contentToList}
          contentTitle={contentTitle}
          lang={lang}
          user={user}
          openNewList={openNewList}
          setOpenNewList={setOpenNewList}
          lists={lists}
          darkMode={darkMode}
        />
      )}

      {/* CREATE NEW LIST */}
      {user?.id && (
        <CreateListForm
          open={open}
          setOpen={setOpen}
          openNewList={openNewList}
          setOpenNewList={setOpenNewList}
          lang={lang}
          user={user}
          refetch={getLists}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default TvShowDetails;
