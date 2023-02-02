import axios from "axios";
import trad from "../lang/traduction";
import { SearchIcon } from "@heroicons/react/solid";
import { AppContext } from "../contexts/AppContext";
import { useContext, useState, useEffect } from "react";
import TvShowCard from "../components/Cards/TvShowCard";
import AddToList from "../components/Modals/AddToList";
import { UserContext } from "../contexts/UserContext";
import CreateListForm from "../components/Modals/CreateListForm";
import { useSearchParams } from "react-router-dom";

function TvShowsSearch() {
  const { lang } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [showsData, setShowsData] = useState([]);
  const [search, setSearch] = useSearchParams({ query: "a" });
  const [open, setOpen] = useState(false);
  const [openNewList, setOpenNewList] = useState(false);
  const [contentToList, setContentToList] = useState();
  const [contentTitle, setContentTitle] = useState("");
  const [lists, setLists] = useState([]);

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
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_TMDB_SHOWS_SEARCH_URL}?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&query=${search.get("query")}&language=${handleLang(lang)}`
      )
      .then((res) => setShowsData(res.data.results));
  }, [search, lang]);

  const handleAddToList = (content) => {
    setOpen(true);
    setContentToList(content);
    setContentTitle(content.name);
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

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-myLightGray">
      <div className="my-8 w-4/5 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%]">
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
                  className="placeholder-myGtext-myborder-myGray block w-full rounded-md border border-myGray bg-myWhite py-2 pl-10 pr-3 leading-5 focus:border-myGray focus:placeholder-myGray focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder={trad[lang].placeholders.searchTvShows}
                  type="text"
                  onChange={handleSearch}
                />
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
            handleAddToList={handleAddToList}
          />
        ))}
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

export default TvShowsSearch;
