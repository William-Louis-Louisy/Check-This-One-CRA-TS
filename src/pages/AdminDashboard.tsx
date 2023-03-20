import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LikesTable from "../components/Admin/LikesTable";
import ListsTable from "../components/Admin/ListsTable";
import StatsCard from "../components/Admin/StatsCard";
import UsersTable from "../components/Admin/UsersTable";
import { AppContext } from "../contexts/AppContext";
import trad from "../lang/traduction";

function AdminDashboard() {
  const { lang, darkMode } = useContext(AppContext);
  const [users, setUsers] = useState();
  const [usersCount, setUsersCount] = useState(0);
  const [lists, setLists] = useState();
  const [listsCount, setListsCount] = useState(0);
  const [likes, setLikes] = useState();
  const [dataDisplayed, setDataDisplayed] = useState(2);

  // GET USERS
  const getTotalUsers = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/getAll`
      );
      setUsers(data.data.users);
      setUsersCount(data.data.users.length);
    } catch (error) {
      console.error(error);
    }
  };

  // GET LISTS
  const getTotalLists = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/lists/getAll`
      );
      setLists(data.data.lists);
      setListsCount(data.data.lists.length);
    } catch (error) {
      console.error(error);
    }
  };

  // GET LIKES
  const getTotalLikes = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/lists/getTotalLikes`
      );
      setLikes(data.data.total_likes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalUsers();
    getTotalLists();
    getTotalLikes();
  }, []);

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center ${
        darkMode ? "bg-darkBg text-gray-300" : "bg-myLightGray text-smokyBlack"
      } py-16`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="my-8 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-center lg:w-[70%]">
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].navbar.adminDashboard}
        </h3>
      </div>

      {/*----- PAGE CONTENT -----*/}
      {/* STATS CARD */}
      {users && lists && likes && (
        <StatsCard
          darkMode={darkMode}
          lang={lang}
          totalUsers={usersCount}
          totalLists={listsCount}
          totalLikes={likes}
          dataDisplayed={dataDisplayed}
          setDataDisplayed={setDataDisplayed}
        />
      )}

      {/* USERS */}
      {users && dataDisplayed === 1 && (
        <UsersTable
          lang={lang}
          darkMode={darkMode}
          users={users}
          getTotalUsers={getTotalUsers}
        />
      )}

      {/* LISTS */}
      {lists && dataDisplayed === 2 && (
        <ListsTable
          lang={lang}
          darkMode={darkMode}
          lists={lists}
          getTotalLists={getTotalLists}
        />
      )}

      {/* LIKES */}
      {likes && dataDisplayed === 3 && (
        <LikesTable lang={lang} darkMode={darkMode} lists={lists} />
      )}
    </div>
  );
}

export default AdminDashboard;
