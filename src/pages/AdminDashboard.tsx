import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LikesTable from "../components/Admin/LikesTable";
import ListsTable from "../components/Admin/ListsTable";
import StatsCard from "../components/Admin/StatsCard";
import UsersTable from "../components/Admin/UsersTable";
import { AppContext } from "../contexts/AppContext";
import trad from "../lang/traduction";
import BadgesTable from "../components/Admin/BadgesTable";
import { toast } from "react-toastify";
import BadgeCreation from "../components/Admin/BadgeCreation";

function AdminDashboard() {
  const { lang, darkMode } = useContext(AppContext);
  const [users, setUsers] = useState();
  const [lists, setLists] = useState();
  const [likes, setLikes] = useState();
  const [badges, setBadges] = useState();
  const [usersCount, setUsersCount] = useState(0);
  const [listsCount, setListsCount] = useState(0);
  const [badgesCount, setBadgesCount] = useState(0);
  const [dataDisplayed, setDataDisplayed] = useState(2);
  const [badgeModal, setBadgeModal] = useState(false);

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

  // GET BADGES
  const getTotalBadges = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/badges`);
      setBadges(data.data.badges);
      setBadgesCount(data.data.badges.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalUsers();
    getTotalLists();
    getTotalLikes();
    getTotalBadges();
  }, []);

  // CHECK BADGES FOR ALL USERS
  const badgesVerification = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/check-badges`
      );
      if (data.status === 200) {
        toast.success(`${trad[lang].toasts.success.badgesVerification}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: darkMode ? "dark" : "light",
        });
      }

      if (data.status === 400) {
        toast.error(`${trad[lang].toasts.errors.badgesVerificationError}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: darkMode ? "dark" : "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          totalBadges={badgesCount}
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

      {/* BADGES */}
      {badges && dataDisplayed === 4 && (
        <>
          <div className="mt-8 flex w-full flex-row items-center justify-end gap-4 lg:w-[70%]">
            {/* Launch global badges verification */}
            <button
              onClick={() => badgesVerification()}
              className={`flex flex-row items-center justify-center rounded-md px-4 py-2 text-sm duration-150 hover:bg-primary md:text-base ${
                darkMode
                  ? "bg-altSecondary text-darkBg"
                  : "bg-secondary text-myWhite"
              }`}
            >
              {trad[lang].labels.launchBadgesChecking}
            </button>

            {/* Create new badge */}
            <button
              onClick={() => setBadgeModal(true)}
              className={`flex flex-row items-center justify-center rounded-md px-4 py-2 text-sm duration-150 hover:bg-primary md:text-base ${
                darkMode
                  ? "bg-altSecondary text-darkBg"
                  : "bg-secondary text-myWhite"
              }`}
            >
              {trad[lang].labels.createNewBadge}
            </button>
          </div>
          <BadgesTable lang={lang} darkMode={darkMode} badges={badges} />
        </>
      )}

      {/* BADGE MODAL */}
      {badgeModal && (
        <BadgeCreation
          lang={lang}
          darkMode={darkMode}
          open={badgeModal}
          setOpen={setBadgeModal}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
