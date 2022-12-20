import axios from "axios";
import trad from "../lang/traduction";
import { SearchIcon } from "@heroicons/react/solid";
import { AppContext } from "../contexts/AppContext";
import { useContext, useState, useEffect } from "react";
import TvShowCard from "../components/Cards/TvShowCard";

function TvShowsSearch() {
  const { lang } = useContext(AppContext);
  const [showsData, setShowsData] = useState([]);
  const [search, setSearch] = useState("a");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_TMDB_SHOWS_SEARCH_URL}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${search}&language=en-US`
      )
      .then((res) => setShowsData(res.data.results));
  }, [search]);

  console.log(showsData);

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-myLightGray">
      {/* TITLE */}
      <h1 className="my-10 text-center text-3xl uppercase text-primary">
        {trad[lang].pageTitles.tvShowsSearch}
      </h1>
      {/* SEARCH BAR */}
      <div className="flex w-[90%] items-center justify-center px-2 md:w-[400px] lg:justify-end">
        <div className="w-full max-w-lg lg:max-w-xl">
          <label htmlFor="search" className="sr-only">
            {trad[lang].placeholders.searchTvShows}
          </label>
          <div className="relative">
            <button
              id="search-button"
              className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3"
            >
              <SearchIcon className="h-5 w-5 text-myGray" aria-hidden="true" />
            </button>
            <input
              id="search"
              name="search"
              className="placeholder-myGtext-myborder-myGray block w-full rounded-md border border-myGray bg-myWhite py-2 pl-10 pr-3 leading-5 focus:border-myGray focus:placeholder-myGray focus:outline-none focus:ring-0 sm:text-sm"
              placeholder={trad[lang].placeholders.searchTvShows}
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* RESULTS */}
      <div className="my-12 flex flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center md:gap-10 lg:w-3/5 lg:min-w-[900px]">
        {showsData?.map((show) => (
          <TvShowCard key={show.id} serie={show} lang={lang} />
        ))}
      </div>
    </div>
  );
}

export default TvShowsSearch;
