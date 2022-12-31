import axios from "axios";
import trad from "../lang/traduction";
import { SearchIcon } from "@heroicons/react/solid";
import { AppContext } from "../contexts/AppContext";
import MovieCard from "../components/Cards/MovieCard";
import { useContext, useState, useEffect } from "react";
import AddToList from "../components/Modals/AddToList";

function MoviesSearch() {
  const { lang } = useContext(AppContext);
  const [moviesData, setMoviesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("a");
  const [contentToList, setContentToList] = useState();
  const [contentTitle, setContentTitle] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_TMDB_SEARCH_URL}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${search}&language=en-US`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]);

  const handleAddToList = (content) => {
    setOpen(true);
    setContentToList(content);
    setContentTitle(content.title);
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-myLightGray">
      <div className="my-8 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%]">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].pageTitles.moviesSearch}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {/* SEARCH BAR */}
          <div className="flex w-[90%] items-center justify-center px-2 md:w-[400px] lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xl">
              <label htmlFor="search" className="sr-only">
                {trad[lang].placeholders.searchMovies}
              </label>
              <div className="relative">
                <button
                  id="search-button"
                  className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3"
                >
                  <SearchIcon
                    className="h-5 w-5 text-myGray"
                    aria-hidden="true"
                  />
                </button>
                <input
                  id="search"
                  name="search"
                  className="placeholder-myGtext-myborder-myGray block w-full rounded-md border border-myGray bg-myWhite py-2 pl-10 pr-3 leading-5 focus:border-myGray focus:placeholder-myGray focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder={trad[lang].placeholders.searchMovies}
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="my-12 flex flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center md:gap-10 lg:w-3/5 lg:min-w-[900px]">
        {moviesData?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            lang={lang}
            handleAddToList={handleAddToList}
          />
        ))}
      </div>

      {/* ADD TO LIST MODAL */}
      <AddToList
        open={open}
        setOpen={setOpen}
        contentToList={contentToList}
        contentTitle={contentTitle}
        lang={lang}
      />
    </div>
  );
}

export default MoviesSearch;
