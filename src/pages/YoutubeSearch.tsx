import axios from "axios";
import trad from "../lang/traduction";
import { useContext, useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { AppContext } from "../contexts/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import YoutubeVideoCard from "../components/Cards/YoutubeVideoCard";
import { UserContext } from "../contexts/UserContext";
import AddToList from "../components/Modals/AddToList";
import CreateListForm from "../components/Modals/CreateListForm";
import PageLoader from "../components/Common/PageLoader";
import { scrollToTop } from "../utils/UsefullFunctions";

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

interface IContentToList {
  etag: string;
  id: string;
  poster_path: string;
  title: string;
}

function YoutubeSearch() {
  const { lang, darkMode } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [results, setResults] = useState<IYoutubeSearch>();
  const [mostPopular, setMostPopular] = useState<any>();
  const [isTrending, setIsTrending] = useState(true);
  const [pageToken, setPageToken] = useState("");
  const [lists, setLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [contentToList, setContentToList] = useState<IContentToList>();
  const [contentTitle, setContentTitle] = useState("");
  const [openNewList, setOpenNewList] = useState(false);

  // GET YOUTUBE DATA
  const getYoutubeData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_YTB_SEARCH_URL}&pageToken=${pageToken}&q=${query}&key=${process.env.REACT_APP_YTB_API_KEY}`
      );
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  // SET REGION CODE ACCORDING TO LANG
  const regionCode = lang === "fr" ? "FR" : "US";

  // GET MOST POPULAR
  const getMostPopular = async () => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=25&key=${process.env.REACT_APP_YTB_API_KEY}`
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
  }, [regionCode]);

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
    setContentToList({
      etag: content.etag,
      id: content.id.videoId,
      title: content.snippet.title,
      poster_path: content.snippet.thumbnails.high.url,
    });
    setContentTitle(content.snippet.title);
  };

  // HANDLE NEXT PAGE
  const handleNextPage = async () => {
    try {
      setPageToken(results?.nextPageToken);
    } catch (error) {
      console.error(error);
    } finally {
      getYoutubeData();
      scrollToTop();
    }
  };

  // HANDLE PREVIOUS PAGE
  const handlePreviousPage = async () => {
    try {
      setPageToken(results?.prevPageToken);
    } catch (error) {
      console.error(error);
    } finally {
      getYoutubeData();
    }
  };

  if (loading) {
    return <PageLoader lang={lang} darkMode={darkMode} />;
  }

  return (
    <div
      className={`flex h-full min-h-screen flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } py-16`}
    >
      <div className="my-8 w-full border-b border-primary px-4 pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%] lg:px-0">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].pageTitles.youtubeSearch}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {/* SEARCH BAR */}
          <div className="flex w-full items-center justify-center sm:px-2 md:w-[400px] lg:justify-end">
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
                  <SearchIcon
                    className="h-5 w-5 text-myGray"
                    aria-hidden="true"
                  />
                </button>
                <input
                  id="search"
                  name="search"
                  className={`placeholder-myGtext-myborder-myGray block w-full rounded-md border border-myGray ${
                    darkMode
                      ? "bg-darkQuin text-gray-300 focus:border-darkTert"
                      : "bg-myWhite focus:border-myGray"
                  } py-2 pl-10 pr-3 leading-5 placeholder-myGray focus:outline-none focus:ring-0 sm:text-sm`}
                  placeholder={trad[lang].placeholders.searchYoutube}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      getYoutubeData();
                      setIsFetching(true);
                      setIsTrending(false);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* RESULTS */}

      {isTrending && mostPopular && (
        <div className="flex w-full flex-col items-center">
          <h4 className={`mb-4 text-xl font-semibold text-primary`}>
            {trad[lang].labels.trendingVideos}
          </h4>

          <div className="flex flex-wrap justify-center gap-4 md:gap-2 lg:w-[70%]">
            {mostPopular?.items.map((item) => (
              <YoutubeVideoCard
                key={`${item.etag}-${item.id.kind}`}
                addToList={handleAddToList}
                item={item}
                lang={lang}
                darkMode={darkMode}
                user={user}
              />
            ))}
          </div>
        </div>
      )}

      {isFetching ? (
        loading ? (
          <div className="my-10">
            <CircularProgress sx={{ color: "#F58426" }} />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center">
            <div className="flex flex-wrap justify-center gap-4 md:gap-2 lg:w-[70%]">
              {results?.items.map((item) =>
                item.id.kind === "youtube#video" ? (
                  <YoutubeVideoCard
                    key={`${item.etag}-${item.id.kind}`}
                    addToList={handleAddToList}
                    item={item}
                    lang={lang}
                    darkMode={darkMode}
                    user={user}
                  />
                ) : null
              )}
            </div>

            <div className="my-5 flex w-full flex-row justify-between gap-8 md:w-3/5">
              <button
                className={`${
                  darkMode
                    ? "bg-darkTert text-altSecondary hover:text-primary"
                    : "bg-myWhite text-secondary hover:text-primary"
                } rounded-l-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0`}
                onClick={() => {
                  handlePreviousPage();
                }}
              >
                {trad[lang].global.previous}
              </button>

              <button
                className={`${
                  darkMode
                    ? "bg-darkTert text-altSecondary hover:text-primary"
                    : "bg-myWhite text-secondary hover:text-primary"
                } rounded-r-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0`}
                onClick={handleNextPage}
              >
                {trad[lang].global.next}
              </button>
            </div>
          </div>
        )
      ) : null}

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

export default YoutubeSearch;
