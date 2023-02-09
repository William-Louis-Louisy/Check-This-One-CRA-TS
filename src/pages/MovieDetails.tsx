import axios from "axios";
import trad from "../lang/traduction";
import { IMovie } from "../types/Movie";
import Poster from "../assets/poster.jpg";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import { IMovieDetails } from "../types/MovieDetails";
import AddToList from "../components/Modals/AddToList";
import { IMovieProvider } from "../types/MovieProvider";
import { useContext, useEffect, useState } from "react";
import { formatDateUsToFr } from "../utils/DateFormater";
import { handleLang } from "../utils/RequestLanguageHandler";
import CreateListForm from "../components/Modals/CreateListForm";
import { ClipboardListIcon, EyeIcon } from "@heroicons/react/outline";
import PageLoader from "../components/Common/PageLoader";
import Tabs from "../components/Navigation/Tabs";
import CastCard from "../components/Cards/CastCard";

function MovieDetails() {
  // GET MOVIE ID FROM URL
  const movieId = useParams();
  // GET LANG FROM CONTEXT
  const { lang } = useContext(AppContext);
  // GET USER FROM CONTEXT
  const { user } = useContext(UserContext);
  // STATES
  const [lists, setLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [listsCount, setListsCount] = useState<Number>(0);
  const [movie, setMovie] = useState<IMovieDetails>();
  const [cast, setCast] = useState([]);
  const [contentToList, setContentToList] = useState();
  const [contentTitle, setContentTitle] = useState("");
  const [openNewList, setOpenNewList] = useState(false);
  const [watchProviders, setWatchProviders] = useState();
  const [selectedCountry, setSelectedCountry] = useState("FR");
  const [similarMovies, setSimilarMovies] = useState<IMovie[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<IMovieProvider>();
  const [loading, setLoading] = useState(true);
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

  // GET MOVIE BY ID
  const getMovie = async () => {
    if (movieId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_TMDB_MOVIE_URL}/${movieId.movieId}?api_key=${
            process.env.REACT_APP_TMDB_API_KEY
          }&language=${handleLang(lang)}`
        );
        setMovie(data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // GET ALL LISTS COUNT THAT CONTAIN A PROVIDER ID
  const getListsCount = async () => {
    if (movieId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/lists/getCountByProviderId/${movieId.movieId}`
        );
        setListsCount(data.data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // GET WATCH PROVIDERS BY MOVIE ID
  const getWatchProviders = async () => {
    if (movieId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_TMDB_MOVIE_URL}/${movieId.movieId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setWatchProviders(data.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // GET SIMILAR MOVIES BY MOVIE ID
  const getSimilarMovies = async () => {
    if (movieId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_TMDB_MOVIE_URL}/${
            movieId.movieId
          }/similar?api_key=${
            process.env.REACT_APP_TMDB_API_KEY
          }&language=${handleLang(lang)}&page=1`
        );
        setSimilarMovies(data.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // GET CAST BY MOVIE ID
  const getCasting = async () => {
    if (movieId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_TMDB_MOVIE_URL}/${
            movieId.movieId
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

  // FILTER WATCH PROVIDERS BY COUNTRY
  const filterWatchProviders = () => {
    if (watchProviders) {
      const filteredWatchProviders = watchProviders[selectedCountry];
      setFilteredProviders(filteredWatchProviders);
    }
  };

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
    setContentTitle(content.title);
  };

  useEffect(() => {
    getMovie();
    getWatchProviders();
    getSimilarMovies();
    getListsCount();
    getCasting();
  }, [movieId, lang]);

  useEffect(() => {
    filterWatchProviders();
  }, [watchProviders, selectedCountry]);

  if (loading) return <PageLoader lang={lang} />;

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-myLightGray py-16">
      {/*----- PAGE HEADING -----*/}
      <div className="my-8 w-[90%] border-b border-primary pb-3 sm:flex sm:items-center sm:justify-between sm:pb-5 lg:w-[70%]">
        {/* TITLE */}
        <h3 className="text-xl font-medium leading-6 text-primary sm:text-2xl">
          {movie?.title}
        </h3>
        <div className="mt-3 flex flex-row items-center justify-end gap-3 sm:mt-0">
          {/* LISTS COUNT */}
          {listsCount > 0 && (
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
          )}

          {/* ADD TO LIST BUTTON */}
          {user?.id && (
            <button
              className="inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary px-2 py-1 text-sm font-medium text-myWhite shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:px-4 sm:py-2 sm:text-base"
              onClick={() => handleAddToList(movie)}
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

      {/*----- MOVIE DETAILS -----*/}
      <div className="flex w-full flex-col items-center sm:flex-row sm:items-start lg:w-[70%]">
        <div className="mb-8 flex w-full flex-col items-center sm:mb-0 sm:w-2/5">
          {/* MOVIE POSTER */}
          <img
            src={
              movie?.poster_path
                ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                : Poster
            }
            className="w-64 rounded-md md:h-[480px] md:w-80"
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
        <div className="flex w-[90%] flex-col items-center gap-5 sm:ml-5 sm:w-3/5 sm:items-start">
          {/* Tabs */}
          <Tabs tabs={tabs} />
          {/* Main Informations */}
          {dataDisplayed === "informations" && (
            <>
              <div className="flex w-full flex-col items-start">
                {/* Original title */}
                <span className="flex w-full flex-row justify-between text-sm text-smokyBlack sm:text-base">
                  <span className="font-bold text-primary">
                    {trad[lang].movieDetails.originalTitle}:
                  </span>{" "}
                  {movie?.original_title}
                </span>

                {/* Release date */}
                {movie?.release_date && (
                  <span className="flex w-full flex-row justify-between text-sm text-smokyBlack sm:text-base">
                    <span className="font-bold text-primary">
                      {trad[lang].movieDetails.releaseDate}:
                    </span>{" "}
                    {lang === "fr"
                      ? formatDateUsToFr(movie?.release_date)
                      : movie?.release_date}
                  </span>
                )}

                {/* Runtime */}
                <span className="flex w-full flex-row justify-between text-sm text-smokyBlack sm:text-base">
                  <span className="font-bold text-primary">
                    {trad[lang].movieDetails.runtime}:
                  </span>{" "}
                  {movie?.runtime} min
                </span>
              </div>
              {/* Genres */}
              <div className="flex w-full flex-col items-start text-sm sm:text-base">
                <span className="font-bold text-primary">
                  {trad[lang].movieDetails.genres}:
                </span>

                <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-2">
                  {movie?.genres.map((genre) => (
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
              <div className="flex w-full flex-col items-start text-sm sm:text-base">
                <span className="font-bold text-primary">
                  {trad[lang].movieDetails.overview}:
                </span>
                <span className="italic text-smokyBlack">
                  {movie?.overview}
                </span>
              </div>
              {/* Similar Movies */}
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-primary sm:text-base">
                  {trad[lang].movieDetails.recommendations}:
                </span>
                <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-5">
                  {similarMovies?.slice(0, 12).map(
                    (movie) =>
                      movie?.poster_path && (
                        <Link
                          to={`/movieDetails/${movie.id}`}
                          key={`similar-movie-${movie.id}`}
                        >
                          <img
                            src={
                              movie?.poster_path
                                ? "https://image.tmdb.org/t/p/w500" +
                                  movie.poster_path
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
            </>
          )}

          {/* Cast */}
          {dataDisplayed === "cast" && (
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {cast.map((actor) => (
                <CastCard
                  id={actor.id}
                  name={actor.name}
                  department={actor.known_for_department}
                  role={actor.character}
                  imageUrl={actor.profile_path}
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

export default MovieDetails;
