import { SearchIcon } from "@heroicons/react/outline";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ListViewBtnGroup from "../components/Common/ListViewBtnGroup";
import Pagination from "../components/Common/Pagination";
import ListDisplay from "../components/Lists/ListDisplay";
import TableListDisplay from "../components/Lists/TableListDisplay";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import trad from "../lang/traduction";
import { tagsList } from "../utils/TagsList";
import { typesList } from "../utils/TypesList";
import PageLoader from "../components/Common/PageLoader";

function BrowseLists() {
  // GET USER ID FROM PARAMS
  const userId = useParams();

  // GET LANG FROM CONTEXT
  const { lang, darkMode } = useContext(AppContext);

  // GET USER FROM CONTEXT
  const { user } = useContext(UserContext);

  // STATES
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [searchQuery, setSearchQuery] = useSearchParams({ query: "" });
  const [filters, setFilters] = useState(false);
  const [tags, setTags] = useState([]);
  const [type, setType] = useState("");
  const [tableView, setTableView] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pagesToDisplay, setPagesToDisplay] = useState([]);

  // HANDLE SEARCH
  const handleSearch = (event) => {
    setSearchQuery({ query: event.target.value });
  };

  // GET LISTS
  const getLists = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/lists/getAllListsFiltered/?page=${page}&limit=10&paginate=true`;
      if (userId.userId) {
        url += `&creator_id=${userId.userId}`;
      }
      if (searchQuery.get("query")) {
        url += `&title=${searchQuery.get("query")}`;
      }
      if (type) {
        url += `&type=${type}`;
      }

      const requestBody =
        tags.length > 0 ? { tags: tags.map((tag) => tag.name) } : {};

      const data = await axios.post(url, requestBody);
      setTotal(data.data.totalPages);
      setLists(data.data.lists);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageToDisplay = () => {
    if (total < 10)
      setPagesToDisplay(Array.from({ length: total }, (_, i) => i + 1));
    else if (page < 7)
      setPagesToDisplay(Array.from({ length: 10 }, (_, i) => i + 1));
    else if (total > page + 4)
      setPagesToDisplay(Array.from({ length: 10 }, (_, i) => page - 5 + i));
    else setPagesToDisplay(Array.from({ length: 10 }, (_, i) => total - 9 + i));
  };

  const handleNextPage = () => {
    if (page < total) setPage(page + 1);
    handlePageToDisplay();
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
    handlePageToDisplay();
  };

  const handleTagSelect = (e) => {
    const selectedTag = tagsList.find((tag) => tag.name === e.target.value);

    setTags([...tags, selectedTag]);
  };

  const handleTypeSelect = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    getLists();
    handlePageToDisplay();
  }, [userId, searchQuery, tags, page, total, type]);

  if (loading) return <PageLoader lang={lang} darkMode={darkMode} />;

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } pt-16`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="mt-8 w-full border-b border-primary px-4 pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%] lg:px-0">
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
        className={`my-5 flex w-full flex-col items-end px-4 lg:my-2 lg:w-[70%] lg:px-0 lg:pr-2 ${
          darkMode ? "text-altSecondary" : "text-secondary"
        }`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          {/* List view buttons */}
          <ListViewBtnGroup
            state={tableView}
            setState={setTableView}
            lang={lang}
            darkMode={darkMode}
          />

          {/* Add filters button */}
          <button
            id="add-filters-button"
            className="flex flex-row items-center gap-2 text-sm duration-150 hover:text-primary"
            onClick={() => setFilters(!filters)}
          >
            <PlusIcon className="h-4 w-4" />
            <p>{trad[lang].global.addFilters}</p>
          </button>
        </div>

        {filters && (
          <div className="flex w-full flex-col md:flex-row md:justify-end md:gap-4">
            <div className="mt-4 w-full md:mt-0 md:w-96">
              <label
                htmlFor="select-type"
                className={`w-full text-left text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {trad[lang].global.type}:
              </label>
              <div className="mt-1">
                <select
                  name="select-type"
                  id="select-type"
                  className={`block w-full rounded-md border-myGray text-sm shadow-sm focus:border-primary focus:ring-0 ${
                    darkMode
                      ? "bg-darkQuin text-gray-300"
                      : "bg-myWhite text-smokyBlack"
                  }`}
                  defaultValue={""}
                  onChange={(e) => handleTypeSelect(e)}
                >
                  <option value="">
                    {trad[lang].placeholders.chooseAType}
                  </option>
                  {typesList.map((t) => {
                    return (
                      <option key={t.name} value={t.value}>
                        {lang === "en" ? t.name : t.name_fr}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="mt-4 w-full md:mt-0 md:w-96">
              <label
                htmlFor="select-tags"
                className={`w-full text-left text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {trad[lang].global.tags}:
              </label>
              <div className="mt-1">
                <select
                  name="select-tags"
                  id="select-tags"
                  className={`block w-full rounded-md border-myGray text-sm shadow-sm focus:border-primary focus:ring-0 ${
                    darkMode
                      ? "bg-darkQuin text-gray-300"
                      : "bg-myWhite text-smokyBlack"
                  }`}
                  defaultValue={""}
                  onChange={(e) => handleTagSelect(e)}
                >
                  <option value="">{trad[lang].placeholders.chooseATag}</option>
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
          </div>
        )}
      </div>

      {/*----- PAGE CONTENT -----*/}
      <div
        className={`mb-16 flex w-full flex-col items-center gap-8 md:my-8 md:flex-row md:flex-wrap md:justify-center md:gap-10 ${
          tableView ? "lg:w-[70%]" : "lg:w-3/5"
        }`}
      >
        {tableView ? (
          <>
            {/* RESULTS / Table view */}
            <TableListDisplay lang={lang} lists={lists} darkMode={darkMode} />
          </>
        ) : (
          <>
            {/* RESULTS / Cards view */}
            {lists?.length > 0 ? (
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
          </>
        )}

        {/* PAGINATION */}
        <Pagination
          page={page}
          setPage={setPage}
          total={total}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          pagesToDisplay={pagesToDisplay}
          darkMode={darkMode}
          lang={lang}
        />
      </div>
    </div>
  );
}

export default BrowseLists;
