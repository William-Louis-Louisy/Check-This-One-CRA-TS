import { ClipboardListIcon, EyeIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddToList from "../components/Modals/AddToList";
import CreateListForm from "../components/Modals/CreateListForm";
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
  const { lang } = useContext(AppContext);
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

  useEffect(() => {
    getShow();
    getWatchProviders();
    getSimilarMovies();
  }, [tvShowId]);

  useEffect(() => {
    filterWatchProviders();
  }, [watchProviders, selectedCountry]);

  // GET LISTS BY USER ID
  const getLists = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/lists/getByUserId/${user?.id}`
      );
      setLists(data.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (user?.id) getLists();
  }, [user?.id]);

  // ADD MOVIE TO LIST
  const handleAddToList = (content) => {
    setOpen(true);
    setContentToList(content);
    setContentTitle(content.name);
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-myLightGray pb-16">
      {/*----- PAGE HEADING -----*/}
      <div className="my-8 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%]">
        {/* TITLE */}
        <h3 className="text-2xl font-medium leading-6 text-primary">
          {show?.name}
        </h3>
        <div className="flex flex-row items-center gap-3">
          {/* LISTS COUNT */}
          {listsCount > 0 && (
            <Link
              to="#"
              className="rounded-md border border-secondary px-4 py-2"
            >
              <span className="flex flex-row items-center gap-2 text-sm font-medium text-secondary">
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                {trad[lang].movieDetails.thisMovieappearsIn} {listsCount}{" "}
                {listsCount > 1
                  ? trad[lang].global.lists
                  : trad[lang].global.list}
              </span>
            </Link>
          )}

          {/* ADD TO LIST BUTTON */}
          {user?.id && (
            <button
              className="inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => handleAddToList(show)}
            >
              <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
              {trad[lang].labels.addToAList}
            </button>
          )}
        </div>
      </div>

      {/*----- SHOW DETAILS -----*/}
      <div className="flex flex-row lg:w-[70%]">
        <div className="flex w-2/5 flex-col items-center">
          {/* SHOW POSTER */}
          <img
            src={
              show?.poster_path
                ? "https://image.tmdb.org/t/p/w500" + show.poster_path
                : "/src/assets/poster.jpg"
            }
            className="rounded-md md:h-[480px]"
            alt=""
          />

          {/* WATCH PROVIDERS */}
          <div className="mt-3 flex w-80 flex-col items-center rounded-md bg-[#FBFBFB] p-3">
            {/* Title */}
            <h5 className="mb-3 w-full border-b border-primary text-lg font-medium leading-6 text-primary">
              {trad[lang].movieDetails.streamingProviders}
            </h5>
            {/* Country selector */}
            <div className="flex w-full flex-col items-start gap-1">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-smokyBlack"
              >
                {trad[lang].movieDetails.selectYourLocation}
              </label>
              <select
                id="location"
                name="location"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base text-smokyBlack focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
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

        {/* MOVIE INFORMATIONS */}
        <div className="ml-5 flex w-3/5 flex-col items-start gap-5">
          {/* Main Informations */}
          <div className="flex w-full flex-col items-start">
            {/* Original title */}
            <span className="flex w-full flex-row justify-between text-smokyBlack">
              <span className="font-bold text-primary">
                {trad[lang].showDetails.originalName}:
              </span>{" "}
              {show?.original_name}
            </span>

            {/* Release date */}
            {show?.first_air_date && (
              <span className="flex w-full flex-row justify-between text-smokyBlack">
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
              <span className="flex w-full flex-row justify-between text-smokyBlack">
                <span className="font-bold text-primary">
                  {trad[lang].showDetails.episodeRunTime}:
                </span>{" "}
                {show?.episode_run_time[0]} min
              </span>
            )}

            {/* Number of episodes */}
            <span className="flex w-full flex-row justify-between text-smokyBlack">
              <span className="font-bold text-primary">
                {trad[lang].showDetails.numberOfEpisodes}:
              </span>{" "}
              {show?.number_of_episodes}
            </span>

            {/* Number of seasons */}
            <span className="flex w-full flex-row justify-between text-smokyBlack">
              <span className="font-bold text-primary">
                {trad[lang].showDetails.numberOfSeasons}:
              </span>{" "}
              {show?.number_of_seasons}
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-col items-start">
            <span className="font-bold text-primary">
              {trad[lang].movieDetails.genres}:
            </span>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              {show?.genres.map((genre) => (
                <span
                  className="rounded-full bg-[#FBFBFB] py-1 px-3 text-sm text-smokyBlack"
                  key={`genre-${genre.id}`}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Overview */}
          {show?.overview && (
            <div className="flex flex-col items-start">
              <span className="font-bold text-primary">
                {trad[lang].showDetails.overview}:
              </span>
              <span className="italic text-smokyBlack">{show?.overview}</span>
            </div>
          )}

          {/* Similar Movies */}
          <div className="flex flex-col items-start">
            <span className="font-bold text-primary">
              {trad[lang].movieDetails.recommendations}:
            </span>
            <div className="flex flex-row flex-wrap items-center gap-5">
              {similarShows?.slice(0, 12).map((show) => (
                <Link
                  to={`/tvDetails/${show.id}`}
                  key={`similar-show-${show.id}`}
                >
                  <img
                    src={
                      show?.poster_path
                        ? "https://image.tmdb.org/t/p/w500" + show.poster_path
                        : "/src/assets/poster.jpg"
                    }
                    className="w-24 rounded-md"
                    alt=""
                  />
                </Link>
              ))}
            </div>
          </div>
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
        />
      )}
    </div>
  );
}

export default TvShowDetails;
