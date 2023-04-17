import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserCard from "../components/Cards/UserCard";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import EditUserCard from "../components/Cards/EditUserCard";
import trad from "../lang/traduction";
import PageLoader from "../components/Common/PageLoader";
import _ from "lodash";
import { IBadge } from "../types/Badges";

export interface IUserStats {
  listCount: number;
  moviesListCount: number;
  showsListCount: number;
  podcastsListCount: number;
  youtubesListCount: number;
  mixedListCount: number;
  likesCount: number;
}

function UserProfile() {
  const { lang, darkMode } = useContext(AppContext);
  const { user, refetchUser } = useContext(UserContext);
  const [badges, setBadges] = useState<IBadge[]>();
  const [userStats, setUserStats] = useState<IUserStats>();

  // GET USER BADGES
  const getUserBadges = async () => {
    try {
      if (user) {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${user.id}/badges`
        );
        setBadges(data.data.badges);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Get user stats
  const getUserStats = async () => {
    try {
      if (user) {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${user.id}/stats`
        );
        setUserStats(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedGetUserBadges = _.debounce(getUserBadges, 1000);
  const debouncedGetUserStats = _.debounce(getUserStats, 1000);

  useEffect(() => {
    debouncedGetUserBadges();
    debouncedGetUserStats();
  }, [user]);

  if (user.id === 0) {
    return <PageLoader lang={lang} darkMode={darkMode} />;
  }

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } pt-16`}
    >
      <div className="my-8 w-full border-b border-primary pb-5 sm:flex sm:items-center lg:h-[59px] lg:w-[70%]">
        <h3 className="ml-8 text-lg font-medium leading-6 text-primary">
          {trad[lang].navbar.myProfile}
        </h3>
      </div>
      <div className="mb-16 flex w-full flex-col items-center gap-4  lg:w-[70%] lg:flex-row lg:items-start lg:justify-between">
        <UserCard
          user={user}
          avatar={user.avatar}
          darkMode={darkMode}
          lang={lang}
          badges={badges}
          userStats={userStats}
        />
        <EditUserCard
          lang={lang}
          user={user}
          darkMode={darkMode}
          refetch={refetchUser}
        />
      </div>
    </div>
  );
}

export default UserProfile;
