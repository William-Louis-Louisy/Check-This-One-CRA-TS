import axios from "axios";
import trad from "../lang/traduction";
import { Link } from "react-router-dom";
import Poster from "../assets/poster.jpg";
import Slider from "../components/Common/Slider";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { handleCountry, handleLang } from "../utils/RequestLanguageHandler";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import PageLoader from "../components/Common/PageLoader";
import TopRatedUserCard from "../components/Cards/TopRatedUserCard";
import { toast } from "react-toastify";

const topUsers = [
  {
    img: "https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "John Doe",
    lists_nb: 5,
    likes_nb: 100,
  },
  {
    img: "https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "John Doe",
    lists_nb: 12,
    likes_nb: 240,
  },
  {
    img: "https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "John Doe",
    lists_nb: 24,
    likes_nb: 256,
  },
  {
    img: "https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "John Doe",
    lists_nb: 8,
    likes_nb: 187,
  },
  {
    img: "https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "John Doe",
    lists_nb: 17,
    likes_nb: 972,
  },
  {
    img: "https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "John Doe",
    lists_nb: 15,
    likes_nb: 98,
  },
];

function Home() {
  const { lang } = useContext(AppContext);
  const { user } = useContext(UserContext);

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);

  // GET UPOCOMING MOVIES
  const getUpcomingMovies = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_TMDB_MOVIE_URL}/upcoming?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=${handleLang(lang)}&page=1&region=${handleCountry(lang)}`
      );
      setUpcomingMovies(data.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  // GET TOP RATED SHOWS
  const getTopRatedShows = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_TMDB_SHOWS_URL}/top_rated?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=${handleLang(lang)}&page=1`
      );
      setTopRatedShows(data.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpcomingMovies();
    getTopRatedShows();
  }, [lang]);

  if (!upcomingMovies || !topRatedShows) {
    <PageLoader lang={lang} />;
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-myLightGray py-16">
      {/* Hero section */}
      <div className="relative w-full md:my-16">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0 shadow-2xl">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Cinema theater"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-myWhite">
                  {trad[lang].home.title1}
                </span>
                <span className="block text-primary">
                  {trad[lang].home.title2}
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-myWhite sm:max-w-3xl">
                {trad[lang].home.subtitle}
              </p>
              {!user?.user_name && (
                <div className="mt-8 flex w-full flex-col items-center">
                  <Link
                    to="/signup"
                    className="rounded-md bg-secondary px-4 py-3 text-myWhite"
                  >
                    {trad[lang].home.signUpNow}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* UPCOMING MOVIES */}
      {upcomingMovies && (
        <div className="mt-8 flex w-full flex-col items-center justify-start px-3 sm:mt-0 sm:w-4/5 sm:px-0">
          <h2 className="mb-3 w-full text-left text-lg font-bold text-primary sm:pl-3 md:text-3xl">
            {trad[lang].home.upcomingMovies}
          </h2>
          <Slider
            content={upcomingMovies?.map((movie) => (
              <a key={`movie-${movie.id}`} href={`/movieDetails/${movie.id}`}>
                <div className="h-40 w-[106px] md:h-80 md:w-[213px]">
                  <img
                    src={
                      movie.poster_path
                        ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        : Poster
                    }
                    className="h-40 rounded-md md:h-80"
                    alt={movie?.original_title}
                  />
                </div>
              </a>
            ))}
            sliderId="upcomingMovies"
            leftButton={<ChevronLeftIcon className="h-8" />}
            rightButton={<ChevronRightIcon className="h-8" />}
            leftStepValue={213}
            rightStepValue={213}
          />
        </div>
      )}

      {/* TOP RATED TV SHOWS */}
      {topRatedShows && (
        <div className="mt-8 flex w-full flex-col items-center justify-start px-3 sm:mt-16 sm:w-4/5 sm:px-0">
          <h2 className="mb-3 w-full text-left text-lg font-bold text-primary sm:pl-3 md:text-3xl">
            {trad[lang].home.topRatedShows}
          </h2>
          <Slider
            content={topRatedShows?.map((show) => (
              <a key={`show-${show.id}`} href={`/tvDetails/${show.id}`}>
                <div className="h-40 w-[106px] md:h-80 md:w-[213px]">
                  <img
                    src={
                      show.poster_path
                        ? "https://image.tmdb.org/t/p/w500" + show.poster_path
                        : Poster
                    }
                    className="h-40 rounded-md md:h-80"
                    alt={show?.original_name}
                  />
                </div>
              </a>
            ))}
            sliderId="topRatedShows"
            leftButton={<ChevronLeftIcon className="h-8" />}
            rightButton={<ChevronRightIcon className="h-8" />}
            leftStepValue={213}
            rightStepValue={213}
          />
        </div>
      )}

      {/* TOP RATED USERS */}
      {/* <div className="mt-8 flex w-full flex-col items-center justify-start px-3 sm:mt-16 sm:w-4/5 sm:px-0">
        <h2 className="mb-3 w-full text-left text-lg font-bold text-primary sm:pl-3 md:text-3xl">
          {trad[lang].home.usersTop}
        </h2>
        <Slider
          content={topUsers?.map((user, index) => (
            <TopRatedUserCard
              key={`user-${index}`}
              img={user.img}
              name={user.name}
              lists_nb={user.lists_nb}
              likes_nb={user.likes_nb}
              lang={lang}
            />
          ))}
          sliderId="usersTop"
          leftButton={<ChevronLeftIcon className="h-8" />}
          rightButton={<ChevronRightIcon className="h-8" />}
          leftStepValue={240}
          rightStepValue={240}
        />
      </div> */}
    </div>
  );
}

export default Home;
