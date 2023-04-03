import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import { SearchIcon } from "@heroicons/react/outline";
import trad from "../lang/traduction";
import AddToList from "../components/Modals/AddToList";
import CreateListForm from "../components/Modals/CreateListForm";
import PodcastCard from "../components/Cards/PodcastCard";

interface IContentToList {
  podcast: boolean;
  id: string;
  title: string;
  poster_path: string;
}

function PodcastsSearch() {
  const { lang, darkMode } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [keyword, setKeyword] = useState<string>();
  const [searchResults, setSearchResults] = useState([]);
  const [trendingPodcasts, setTrendingPodcasts] = useState([]);
  const [openAddToList, setOpenAddToList] = useState(false);
  const [contentToList, setContentToList] = useState<IContentToList>();
  const [openNewList, setOpenNewList] = useState(false);
  const [userLists, setUserLists] = useState([]);

  // SEARCH PODCASTS
  const searchPodcasts = async () => {
    try {
      const { data } = await axios.get(
        `https://itunes.apple.com/search?term=${keyword}&entity=podcast`
      );
      if (data) {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error(`Error occured: ${error.message}`);
    }
    return null;
  };

  // GET TRENDING PODCASTS
  const getTrendingPodcasts = async () => {
    try {
      const { data } = await axios.get(
        `https://itunes.apple.com/fr/rss/toppodcasts/limit=50/json`
      );
      setTrendingPodcasts(data.feed.entry);
    } catch (error) {
      console.error(`Error occured: ${error.message}`);
    }
  };

  // GET LISTS BY USER ID
  const getLists = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/lists/getByUserId/${user?.id}`
      );
      setUserLists(data.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (user?.id) getLists();
  }, [user?.id]);

  // HANDLE ADD PODCAST TO LIST
  const handleAddPodcastToList = (content) => {
    setOpenAddToList(true);
    setContentToList({
      podcast: true,
      id: content.trackId.toString(),
      title: content.trackName,
      poster_path: content.artworkUrl600,
    });
  };

  // HANDLE ADD TO LIST
  const handleAddTrendToList = (content) => {
    setOpenAddToList(true);
    setContentToList({
      podcast: true,
      id: content.id.attributes["im:id"],
      title: content["im:name"].label,
      poster_path: content["im:image"][2].label,
    });
  };

  useEffect(() => {
    getTrendingPodcasts();
  }, []);

  return (
    <div
      className={`flex h-full min-h-screen flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } py-16`}
    >
      {/* PAGE HEADING */}
      <div className="my-8 w-full border-b border-primary px-4 pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%] lg:px-0">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].pageTitles.podcastsSearch}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {/* SEARCH BAR */}
          <div className="flex w-full items-center justify-center sm:px-2 md:w-[400px] lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xl">
              <label htmlFor="search" className="sr-only">
                {trad[lang].placeholders.searchPodcasts}
              </label>
              <div className="relative">
                <button
                  id="search-button"
                  className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3"
                  onClick={() => {
                    searchPodcasts();
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
                  placeholder={trad[lang].placeholders.searchPodcasts}
                  type="search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchPodcasts();
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <>
          {/* SEARCH RESULTS */}
          {keyword && (
            <h4 className={`mb-8 text-xl font-semibold text-primary`}>
              {trad[lang].podcasts.resultsFor} "{keyword}"
            </h4>
          )}

          <div className="flex w-[70%] flex-row flex-wrap justify-center gap-6">
            {searchResults.map((item) => (
              <PodcastCard
                key={item.trackId}
                item={item}
                darkMode={darkMode}
                handleAddToList={handleAddPodcastToList}
                lang={lang}
                id={item.trackId}
                href={item.trackViewUrl}
                img={item.artworkUrl600}
                title={item.trackName}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* TRENDING */}
          <h4 className={`mb-8 text-xl font-semibold text-primary`}>
            {trad[lang].podcasts.trendingPodcasts}
          </h4>
          <div className="flex w-[70%] flex-row flex-wrap justify-center gap-6">
            {trendingPodcasts.map((item) => (
              <PodcastCard
                key={item.id.attributes["im:id"]}
                item={item}
                darkMode={darkMode}
                handleAddToList={handleAddTrendToList}
                lang={lang}
                id={item.id.attributes["im:id"]}
                href={item.link.attributes.href}
                img={item["im:image"][2].label}
                title={item["im:name"].label}
              />
            ))}
          </div>
        </>
      )}

      {/* ADD TO LIST MODAL */}
      {user?.id && (
        <AddToList
          open={openAddToList}
          setOpen={setOpenAddToList}
          contentToList={contentToList}
          contentTitle={contentToList?.title}
          lang={lang}
          user={user}
          openNewList={openNewList}
          setOpenNewList={setOpenNewList}
          lists={userLists}
          darkMode={darkMode}
        />
      )}

      {/* CREATE NEW LIST */}
      {user?.id && (
        <CreateListForm
          open={openAddToList}
          setOpen={setOpenAddToList}
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

export default PodcastsSearch;
