import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import trad from "../lang/traduction";
import AddToList from "../components/Modals/AddToList";
import CreateListForm from "../components/Modals/CreateListForm";
import PodcastCard from "../components/Cards/PodcastCard";
import SearchInput from "../components/Common/SearchInput";
import PageLoader from "../components/Common/PageLoader";

interface IContentToList {
  podcast: boolean;
  id: string;
  title: string;
  poster_path: string;
}

function PodcastsSearch() {
  const { lang, darkMode } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
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
  const getTrendingPodcasts = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://itunes.apple.com/${lang === "fr" ? "fr" : "us"}/rss/toppodcasts/limit=50/json`
      );
      setTrendingPodcasts(data.feed.entry);
    } catch (error) {
      console.error(`Error occured: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  // GET LISTS BY USER ID
  const getLists = useCallback(async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/lists/getByUserId/${user?.id}`
      );
      setUserLists(data.data.results);
    } catch (error) {
      console.error(error);
    }
  }, [user?.id]);
  useEffect(() => {
    if (user?.id) getLists();
  }, [getLists]);

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
  }, [getTrendingPodcasts]);

  if (loading) {
    return <PageLoader lang={lang} darkMode={darkMode} />;
  }

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
          <SearchInput
            darkMode={darkMode}
            searchFunction={searchPodcasts}
            searchValue={keyword}
            setSearchValue={setKeyword}
            placeholder={trad[lang].placeholders.searchPodcasts}
          />
        </div>
      </div>

      {searchResults.length > 0 && keyword !== "" ? (
        <>
          {/* SEARCH RESULTS */}
          {keyword && (
            <h4 className={`mb-8 text-xl font-semibold text-primary`}>
              {trad[lang].podcasts.resultsFor} "{keyword}"
            </h4>
          )}

          <div className="flex flex-row flex-wrap justify-center gap-6 md:w-[70%]">
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
                user={user}
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
          <div className="flex flex-row flex-wrap justify-center gap-6 md:w-[70%]">
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
                user={user}
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
