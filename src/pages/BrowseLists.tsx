import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ListDisplay from "../components/Lists/ListDisplay";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import trad from "../lang/traduction";

function BrowseLists() {
  // GET USER ID FROM PARAMS
  const userId = useParams();

  // GET LANG FROM CONTEXT
  const { lang, darkMode } = useContext(AppContext);

  // GET USER FROM CONTEXT
  const { user } = useContext(UserContext);

  // LISTS
  const [lists, setLists] = useState([]);
  const [searchQuery, setSearchQuery] = useSearchParams({ query: "" });

  // HANDLE SEARCH
  const handleSearch = (event) => {
    setSearchQuery({ query: event.target.value });
  };

  // GET LISTS
  const getLists = async () => {
    try {
      if (userId.userId || searchQuery) {
        const data = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/lists/getAllListsFiltered?creator_id=${
            userId.userId || ""
          }&title=${searchQuery.get("query")}`
        );
        setLists(data.data.lists);

        return;
      }

      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/lists/getAllListsFiltered/`
      );
      setLists(data.data.lists);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLists();
  }, [userId, searchQuery]);

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } pt-16`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="my-8 w-4/5 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%]">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].navbar.browseLists}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {/* SEARCH BAR */}
          <div className="flex w-full items-center justify-center sm:px-2 md:w-[400px] lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xl">
              <label htmlFor="search" className="sr-only">
                {trad[lang].placeholders.searchLists}
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
                  placeholder={trad[lang].placeholders.searchLists}
                  type="text"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*----- PAGE CONTENT -----*/}
      <div className="mb-16 flex w-full flex-col items-center gap-8 md:my-12 md:flex-row md:flex-wrap md:justify-center md:gap-10 lg:w-3/5 lg:min-w-[900px]">
        {/* RESULTS */}
        {lists.length > 0 ? (
          lists.map((list: any) => (
            <ListDisplay
              key={`list-${list.id}`}
              list={list}
              user={user?.id}
              lang={lang}
              darkMode={darkMode}
              refetch={getLists}
            />
          ))
        ) : (
          <p className={`${darkMode ? "text-gray-300" : "text-myBlack"}`}>
            {trad[lang].global.noLists}
          </p>
        )}
      </div>
    </div>
  );
}

export default BrowseLists;
