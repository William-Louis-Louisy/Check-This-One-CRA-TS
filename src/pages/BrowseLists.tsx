import { SearchIcon } from "@heroicons/react/outline";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ListDisplay from "../components/Lists/ListDisplay";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import trad from "../lang/traduction";
import { tagsList } from "../utils/TagsList";

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
  const [filters, setFilters] = useState(false);
  const [tags, setTags] = useState([]);

  // HANDLE SEARCH
  const handleSearch = (event) => {
    setSearchQuery({ query: event.target.value });
  };

  // GET LISTS
  const getLists = async () => {
    try {
      if (userId.userId || searchQuery.get("query")) {
        const data = await axios.post(
          `${
            process.env.REACT_APP_API_URL
          }/lists/getAllListsFiltered?creator_id=${
            userId.userId || ""
          }&title=${searchQuery.get("query")}`,
          { tags: tags.map((tag) => tag.name) }
        );
        setLists(data.data.lists);

        return;
      }

      if (tags.length > 0) {
        const data = await axios.post(
          `${process.env.REACT_APP_API_URL}/lists/getAllListsFiltered/`,
          { tags: tags.map((tag) => tag.name) }
        );
        setLists(data.data.lists);

        return;
      }

      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/lists/getAllListsFiltered/`
      );
      setLists(data.data.lists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagSelect = (e) => {
    const selectedTag = tagsList.find((tag) => tag.name === e.target.value);

    setTags([...tags, selectedTag]);
  };

  useEffect(() => {
    getLists();
  }, [userId, searchQuery, tags]);

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } pt-16`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="mt-8 w-4/5 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%]">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].navbar.browseLists}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {/* SEARCH BAR */}
          <div className="flex w-full flex-col items-center justify-center sm:px-2 md:w-[400px] lg:justify-end">
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

      {/* FILTER BY TAGS */}
      <div
        className={`my-5 flex w-4/5 flex-col items-end lg:my-2 lg:w-[70%] lg:px-2 ${
          darkMode ? "text-altSecondary" : "text-secondary"
        }`}
      >
        <button
          id="add-filters-button"
          className="flex flex-row items-center gap-2 text-sm"
          onClick={() => setFilters(!filters)}
        >
          <PlusIcon className="h-4 w-4" />
          <p>{trad[lang].global.addFilters}</p>
        </button>

        {filters && (
          <div className="w-full md:w-96">
            <label
              htmlFor="select"
              className={`w-full text-left text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {trad[lang].global.tags}:
            </label>
            <div className="mt-1">
              <select
                name="select"
                id="select"
                className={`block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary focus:ring-0 ${
                  darkMode
                    ? "bg-darkQuin text-gray-300"
                    : "bg-myWhite text-smokyBlack"
                }`}
                defaultValue={""}
                onChange={(e) => handleTagSelect(e)}
              >
                <option>{trad[lang].placeholders.chooseATag}</option>
                {tagsList.map((tag) => {
                  return (
                    <option key={tag.name} value={tag.name}>
                      {lang === "en" ? tag.name : tag.name_fr}
                    </option>
                  );
                })}
              </select>

              {tags && tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    return (
                      <div
                        key={tag.name}
                        className={`flex items-center gap-2 rounded-md px-2 py-1 ${
                          darkMode
                            ? "bg-darkQuin text-gray-300"
                            : "bg-myWhite text-smokyBlack"
                        }`}
                      >
                        <span className="text-sm">
                          {lang === "en" ? tag.name : tag.name_fr}
                        </span>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => {
                            setTags(tags.filter((item) => item !== tag));
                          }}
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
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
