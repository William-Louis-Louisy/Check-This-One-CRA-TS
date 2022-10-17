import axios from "axios";
import trad from "../lang/traduction";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { AppContext } from "../contexts/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";

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
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<IYoutubeSearch>();
  const [pageToken, setPageToken] = useState("");

  // GET YOUTUBE DATA
  const getYoutubeData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_YTB_SEARCH_URL}&pageToken=${pageToken}&q=${query}&key=${process.env.REACT_APP_YTB_API_KEY}`
      );
      console.log("YTB DATA", data);
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex w-[90%] items-center justify-center px-2 md:w-[400px] lg:ml-6 lg:justify-end">
        <div className="w-full max-w-lg lg:max-w-xl">
          <label htmlFor="search" className="sr-only">
            {trad[lang].placeholders.searchYoutube}
          </label>
          <div className="relative">
            <button
              className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3"
              onClick={() => {
                getYoutubeData();
                setIsFetching(true);
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
      {isFetching ? (
        loading ? (
          <div className="my-10">
            <CircularProgress sx={{ color: "#F58426" }} />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center py-10">
            {results?.items.map((item) =>
              item.id.kind === "youtube#video" ? (
                <div
                  key={item.etag}
                  className="my-5 flex w-full flex-col gap-3 bg-myWhite shadow-lg md:w-3/5 md:flex-row"
                >
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                  />
                  <div className="flex w-full flex-col items-start gap-2 px-3 pb-3 md:py-6 md:pb-0">
                    <p className="text-lg font-semibold text-myBlack">
                      {item.snippet.title}
                    </p>
                    <p className="w-full truncate text-myBlack md:w-96">
                      {item.snippet.description}
                    </p>
                    <p className="w-full text-sm italic text-myBlack md:w-60">
                      {trad[lang].labels.publishedOn}{" "}
                      {new Date(item.snippet.publishedAt).toLocaleDateString()}
                    </p>
                    <div className="my-2 flex w-full flex-row items-center justify-end gap-6">
                      <a
                        href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          sx={{ color: "#006BB6", borderColor: "#006BB6" }}
                          variant="outlined"
                          startIcon={
                            <EyeIcon className="h-6 w-6 text-secondary" />
                          }
                        >
                          {trad[lang].labels.see}
                        </Button>
                      </a>

                      <Button
                        sx={{ color: "#FAFDFF", borderColor: "#FAFDFF" }}
                        variant="contained"
                        startIcon={
                          <ClipboardListIcon className="h-6 w-6 text-myWhite" />
                        }
                      >
                        {trad[lang].labels.addToAList}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={item.etag}
                  className="my-5 flex w-full flex-col gap-3 bg-myWhite p-3 shadow-lg md:w-fit md:flex-row md:items-center md:rounded-3xl"
                >
                  <img
                    className="w-32 rounded-full"
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                  />
                  <div className="flex flex-col items-start gap-2 px-3 pb-3 md:py-6 md:pb-0">
                    <p className="text-lg font-semibold text-myBlack">
                      {item.snippet.title}
                    </p>
                    <p className="w-full truncate text-myBlack md:w-60">
                      {item.snippet.description}
                    </p>
                  </div>
                </div>
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
