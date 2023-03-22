import axios from "axios";
import trad from "../lang/traduction";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import { SearchIcon } from "@heroicons/react/solid";
import ListDisplay from "../components/Lists/ListDisplay";
import ListViewBtnGroup from "../components/Common/ListViewBtnGroup";
import TableListDisplay from "../components/Lists/TableListDisplay";

function UserLists() {
  const { lang, darkMode } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [lists, setLists] = useState([]);
  const [total, setTotal] = useState(0);
  const [tableView, setTableView] = useState(false);
  const [page, setPage] = useState(1);

  // GET LISTS BY USER ID
  const getLists = async () => {
    if (user?.id) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/lists/getByUserId/${user?.id}?page=${page}&limit=10&paginate=true`
        );
        setLists(data.data.results);
        setTotal(data.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getLists();
  }, [user, page]);

  if (!user?.id) {
    return <div>Vous devez être connecté pour accéder à cette page</div>;
  }

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
          {trad[lang].navbar.myLists}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {/* SEARCH BAR */}
          {/* <div className="flex w-full items-center justify-center sm:px-2 md:w-[400px] lg:justify-end">
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
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="my-5 flex w-4/5 flex-col items-end lg:my-2 lg:w-[70%] lg:pr-2">
        <div className="flex w-full flex-row items-center justify-between">
          {/* List view buttons */}
          <ListViewBtnGroup
            state={tableView}
            setState={setTableView}
            lang={lang}
            darkMode={darkMode}
          />
        </div>
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
          </>
        )}

        {/* PAGINATION */}
        {total > 1 && (
          <div className="flex w-full flex-row items-center justify-around">
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
                  ? "bg-darkTert text-gray-300"
                  : "bg-myWhite text-myBlack"
              } border-t border-b border-myGray px-4 py-2`}
            >
              {page}
            </span>
            <button
              disabled={page === total}
              className={`${
                (darkMode && page === total) || page === total
                  ? "cursor-not-allowed text-gray-300"
                  : darkMode
                  ? "text-altSecondary hover:text-primary"
                  : "text-secondary hover:text-primary"
              } ${
                darkMode ? "bg-darkTert" : "bg-myWhite"
              } rounded-r-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0`}
              onClick={() => setPage(page + 1)}
            >
              {trad[lang].global.next}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLists;
