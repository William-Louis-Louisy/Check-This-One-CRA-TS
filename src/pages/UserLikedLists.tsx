import axios from "axios";
import trad from "../lang/traduction";
import { AppContext } from "../contexts/AppContext";
import { SearchIcon } from "@heroicons/react/solid";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import ListDisplay from "../components/Lists/ListDisplay";

function UserLikedLists() {
  const { lang, darkMode } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [lists, setLists] = useState([]);

  // GET LISTS LIKED BY USER
  const getLists = async () => {
    if (user?.id) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${user?.id}/lists`
        );
        setLists(data.data.lists);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getLists();
  }, [user]);

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center ${
        darkMode ? "bg-darkBg text-gray-300" : "bg-myLightGray text-smokyBlack"
      } pt-16`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="my-8 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%]">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].navbar.userLikedLists}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {/* SEARCH BAR */}
          {/* <div className="flex w-[90%] items-center justify-center px-2 md:w-[400px] lg:justify-end">
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
              className="placeholder-myGtext-myborder-myGray block w-full rounded-md border border-myGray bg-myWhite py-2 pl-10 pr-3 leading-5 focus:border-myGray focus:placeholder-myGray focus:outline-none focus:ring-0 sm:text-sm"
              placeholder={trad[lang].placeholders.searchLists}
              type="text"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
      </div> */}
        </div>
      </div>

      {/*----- PAGE CONTENT -----*/}
      <div className="flex w-full flex-col items-center gap-8 sm:my-12 md:flex-row md:flex-wrap md:justify-center md:gap-10 lg:w-3/5 lg:min-w-[900px]">
        {/* RESULTS */}
        {lists && lists.length > 0 ? (
          lists.map((list: any) => (
            <ListDisplay
              key={`list-${list.id}`}
              list={list}
              user={user.id}
              lang={lang}
              darkMode={darkMode}
              refetch={getLists}
            />
          ))
        ) : (
          <p>{trad[lang].global.noLists}</p>
        )}
      </div>
    </div>
  );
}

export default UserLikedLists;
