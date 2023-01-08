import axios from "axios";
import trad from "../lang/traduction";
import { useContext, useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { AppContext } from "../contexts/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import YoutubeVideoCard from "../components/Cards/YoutubeVideoCard";
import YoutubeChannelCard from "../components/Cards/YoutubeChannelCard";

interface IYoutubeSearch {
  etag: string;
  items: any[];
  kind: string;
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  regionCode: string;
}

function YoutubeSearch() {
  const { lang } = useContext(AppContext);
  const [query, setQuery] = useState("tendance");
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<IYoutubeSearch>();
  const [mostPopular, setMostPopular] = useState<any>();
  const [isTrending, setIsTrending] = useState(true);
  const [pageToken, setPageToken] = useState("");

  // GET YOUTUBE DATA
  const getYoutubeData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_YTB_SEARCH_URL}&pageToken=${pageToken}&q=${query}&key=${process.env.REACT_APP_YTB_API_KEY}`
      );
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // GET MOST POPULAR
  const getMostPopular = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_YTB_SEARCH_URL}&chart=mostPopular&regionCode=FR&type=video&key=${process.env.REACT_APP_YTB_API_KEY}`
      );
      setMostPopular(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMostPopular();
  }, []);

  const handleNextPage = async () => {
    try {
      setPageToken(results?.nextPageToken);
    } catch (error) {
      console.error(error);
    } finally {
      getYoutubeData();
    }
  };
  const handlePreviousPage = async () => {
    try {
      setPageToken(results?.prevPageToken);
    } catch (error) {
      console.error(error);
    } finally {
      getYoutubeData();
    }
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-myLightGray">
      {/* TITLE */}
      <h1 className="my-10 text-center text-3xl uppercase text-primary">
        {trad[lang].pageTitles.youtubeSearch}
      </h1>
      {/* SEARCH BAR */}
      <div className="flex w-[90%] items-center justify-center px-2 md:w-[400px] lg:justify-end">
        <div className="w-full max-w-lg lg:max-w-xl">
          <label htmlFor="search" className="sr-only">
            {trad[lang].placeholders.searchYoutube}
          </label>
          <div className="relative">
            <button
              id="search-button"
              className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3"
              onClick={() => {
                getYoutubeData();
                setIsFetching(true);
                setIsTrending(false);
              }}
            >
              <SearchIcon className="h-5 w-5 text-myGray" aria-hidden="true" />
            </button>
            <input
              id="search"
              name="search"
              className="placeholder-myGtext-myborder-myGray block w-full rounded-md border border-myGray bg-myWhite py-2 pl-10 pr-3 leading-5 focus:border-myGray focus:placeholder-myGray focus:outline-none focus:ring-0 sm:text-sm"
              placeholder={trad[lang].placeholders.searchYoutube}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* RESULTS */}

      {isTrending && mostPopular && (
        <div className="flex w-full flex-col items-center py-10">
          {mostPopular?.items.map((item) => (
            <YoutubeVideoCard
              key={`${item.etag}-${item.id.kind}`}
              item={item}
              lang={lang}
            />
          ))}
        </div>
      )}

      {isFetching ? (
        loading ? (
          <div className="my-10">
            <CircularProgress sx={{ color: "#F58426" }} />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center py-10">
            {results?.items.map((item) =>
              item.id.kind === "youtube#video" ? (
                <YoutubeVideoCard
                  key={`${item.etag}-${item.id.kind}`}
                  item={item}
                  lang={lang}
                />
              ) : (
                <YoutubeChannelCard
                  key={`${item.etag}-${item.id.kind}`}
                  item={item}
                />
              )
            )}
            <div className="my-5 flex w-full flex-row justify-end gap-8 md:w-3/5">
              {results?.prevPageToken && (
                <button
                  className="flex flex-row items-center font-medium"
                  onClick={() => {
                    handlePreviousPage();
                  }}
                >
                  <ChevronLeftIcon className="h-6 w-6 text-secondary" />
                  <p className="font-semibold text-secondary">
                    {trad[lang].labels.previousPage}
                  </p>
                </button>
              )}
              <button
                className="flex flex-row items-center font-medium"
                onClick={() => {
                  handleNextPage();
                }}
              >
                <p className="font-semibold text-secondary">
                  {trad[lang].labels.nextPage}
                </p>
                <ChevronRightIcon className="h-6 w-6 text-secondary" />
              </button>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

export default YoutubeSearch;
