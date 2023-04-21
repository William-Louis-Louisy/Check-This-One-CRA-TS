import axios from "axios";
import trad from "../lang/traduction";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import ListDisplay from "../components/Lists/ListDisplay";
import ListViewBtnGroup from "../components/Common/ListViewBtnGroup";
import TableListDisplay from "../components/Lists/TableListDisplay";
import PageLoader from "../components/Common/PageLoader";

function UserLists() {
  const { lang, darkMode } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [total, setTotal] = useState(0);
  const [tableView, setTableView] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesToDisplay, setPagesToDisplay] = useState([]);

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
      } finally {
        setLoading(false);
      }
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

  useEffect(() => {
    getLists();
    handlePageToDisplay();
  }, [user, page, total]);

  // if (!user?.id) {
  //   return <div>Vous devez être connecté pour accéder à cette page</div>;
  // }

  if (loading) return <PageLoader lang={lang} darkMode={darkMode} />;

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } pt-16`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="mt-8 w-full border-b border-primary px-4 sm:flex sm:items-center sm:justify-between sm:pb-5 lg:w-[70%] lg:px-0">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].navbar.myLists}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4"></div>
      </div>

      <div className="my-5 flex w-full flex-col items-end px-4 lg:my-2 lg:w-[70%] lg:px-0 lg:pr-2">
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
          <div className="flex w-full flex-row items-center justify-between">
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
              onClick={handlePrevPage}
            >
              {trad[lang].global.previous}
            </button>

            <div className="flex h-10 flex-row items-center overflow-x-hidden">
              {pagesToDisplay?.map((pageNb: number, i) => (
                <span
                  key={`page-${pageNb}`}
                  onClick={() => setPage(pageNb)}
                  className={`${
                    (darkMode && page === pageNb) || page === pageNb
                      ? "border-primary text-primary"
                      : darkMode
                      ? "bg-darkTert text-altSecondary"
                      : "bg-myWhite text-secondary"
                  } h-10 cursor-pointer border-t border-b px-4 py-2 duration-150 hover:text-primary`}
                >
                  {pageNb}
                </span>
              ))}
            </div>

            {/* Next button */}
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
              onClick={handleNextPage}
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
