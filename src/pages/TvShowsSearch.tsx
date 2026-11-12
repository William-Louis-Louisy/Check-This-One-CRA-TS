import axios from "axios";
import trad from "../lang/traduction";
import { SearchIcon } from "@heroicons/react/solid";
import { AppContext } from "../contexts/AppContext";
import { useCallback, useContext, useState, useEffect } from "react";
import TvShowCard from "../components/Cards/TvShowCard";
import AddToList from "../components/Modals/AddToList";
import { UserContext } from "../contexts/UserContext";
import CreateListForm from "../components/Modals/CreateListForm";
import { useSearchParams } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import PageLoader from "../components/Common/PageLoader";
import { scrollToTop } from "../utils/UsefullFunctions";

function TvShowsSearch() {
  const { lang, darkMode } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showsData, setShowsData] = useState([]);
  const [search, setSearch] = useSearchParams({ query: "a" });
  const [open, setOpen] = useState(false);
  const [openNewList, setOpenNewList] = useState(false);
  const [contentToList, setContentToList] = useState();
  const [contentTitle, setContentTitle] = useState("");
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1);

  // LANGUAGE HANDLER
  const handleLang = (lang) => {
    switch (lang) {
      case "fr":
        return "fr-FR";
      case "en":
        return "en-US";
      default:
        return "en-US";
    }
  };

  // HANDLE SEARCH
  const handleSearch = (event) => {
    setSearch({ query: event.target.value });
    setPage(1);
  };

  // HANDLE CLEAR SEARCH
  const handleClearSearch = () => {
    let input = document.getElementById("search") as HTMLInputElement;
    input.value = "";
    setSearch({ query: "a" });
    setPage(1);
  };

  useEffect(() => {
    const getShows = async () => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_TMDB_SHOWS_SEARCH_URL}?api_key=${
            process.env.REACT_APP_TMDB_API_KEY
          }&query=${search.get("query")}&language=${handleLang(
            lang
          )}&page=${page}`
        );
        setShowsData(data.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getShows();
  }, [search, lang, page]);

  const handleAddToList = (content) => {
    setOpen(true);
    setContentToList(content);
    setContentTitle(content.name);
  };

  // GET LISTS BY USER ID
  const getLists = useCallback(async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/lists/getByUserId/${user?.id}?paginate=false`
      );
      setLists(data.data.results);
    } catch (error) {
      console.error(error);
    }
  }, [user?.id]);
  useEffect(() => {
    if (user?.id) getLists();
  }, [getLists, user?.id]);

  if (loading) {
    return <PageLoader lang={lang} darkMode={darkMode} />;
  }

  return (
    <div
      className={`flex h-full min-h-screen flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } py-16`}
    >
      <div className="mt-8 w-full border-b border-primary px-4 pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%] lg:px-0">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].pageTitles.tvShowsSearch}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {/* SEARCH BAR */}
          <div className="flex w-full items-center justify-center sm:px-2 md:w-[400px] lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xl">
              <label htmlFor="search" className="sr-only">
                {trad[lang].placeholders.searchTvShows}
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
                  className={`placeholder-myGtext-myborder-myGray block w-full rounded-md border border-myGray ${
                    darkMode
                      ? "bg-darkQuin text-gray-300 focus:border-darkTert"
                      : "bg-myWhite focus:border-myGray"
                  } py-2 pl-10 pr-3 leading-5 placeholder-myGray focus:outline-none focus:ring-0 sm:text-sm`}
                  placeholder={trad[lang].placeholders.searchTvShows}
                  type="text"
                  onChange={handleSearch}
                />
                <button
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  onClick={() => handleClearSearch()}
                >
                  <XIcon className="h-5 w-5 text-myGray" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="flex w-full flex-col items-center gap-8 sm:my-12 md:flex-row md:flex-wrap md:justify-center md:gap-10 lg:w-3/5 lg:min-w-[900px]">
        {showsData?.map((show) => (
          <TvShowCard
            key={show.id}
            serie={show}
            lang={lang}
            user={user}
            handleAddToList={handleAddToList}
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* PAGINATION */}
      {showsData.length === 20 && (
        <div className="flex w-full flex-row items-center justify-between lg:w-3/5">
          {/* Previous button */}
          <button
            disabled={page === 1}
            className={`${
              (darkMode && page === 1) || page === 1
                ? "cursor-not-allowed text-gray-300"
                : darkMode
                ? "text-altSecondary hover:text-primary"
                : "text-secondary hover:text-primary"
            } ${
              darkMode ? "bg-darkTert" : "bg-myWhite"
            } rounded-l-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0`}
            onClick={() => setPage(page - 1)}
          >
            {trad[lang].global.previous}
          </button>

          <span
            className={`${
              darkMode
                ? "bg-darkTert text-altSecondary"
                : "bg-myWhite text-secondary"
            } h-10 border-t border-b px-4 py-2`}
          >
            {page}
          </span>

          {/* Next button */}
          <button
            disabled={showsData.length < 20}
            className={`${
              (darkMode && showsData.length < 20) || showsData.length < 20
                ? "cursor-not-allowed text-gray-300"
                : darkMode
                ? "text-altSecondary hover:text-primary"
                : "text-secondary hover:text-primary"
            } ${
              darkMode ? "bg-darkTert" : "bg-myWhite"
            } rounded-r-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0`}
            onClick={() => {
              setPage(page + 1);
              scrollToTop();
            }}
          >
            {trad[lang].global.next}
          </button>
        </div>
      )}

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

export default TvShowsSearch;
