import { IUser } from "../../contexts/UserContext";
import trad from "../../lang/traduction";
import { IUserStats } from "../../pages/UserProfile";
import { IBadge } from "../../types/Badges";
import StatCard from "./StatCard";

function UserCard({
  user,
  darkMode,
  lang,
  badges,
  userStats,
}: {
  user: IUser;
  avatar: string;
  darkMode: boolean;
  lang: string;
  badges: IBadge[];
  userStats: IUserStats;
}) {
  return (
    <div
      className={`w-full rounded-md shadow-lg md:w-1/2 ${
        darkMode ? "bg-darkTert" : "bg-myWhite"
      }`}
    >
      <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg text-center">
        <div className="flex flex-1 flex-col p-8">
          {user.avatar ? (
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover"
              src={user.avatar}
              alt=""
            />
          ) : (
            user?.user_name && (
              <div className="mx-auto flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                <p className="text-center text-6xl text-myWhite">
                  {user?.user_name[0].toUpperCase()}
                </p>
              </div>
            )
          )}
          <h3 className="mt-2 font-bold text-primary">{user.user_name}</h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">{trad[lang].user.location}</dt>
            <dd className="">
              {user.city && user.country && (
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    darkMode
                      ? "bg-darkSec text-primary"
                      : "bg-orange-50 text-primary"
                  }`}
                >
                  {user.city}, {user.country}
                </span>
              )}
            </dd>

            <dt className="sr-only">{trad[lang].user.catchline}</dt>
            {user.catchline && (
              <dd
                className={`mt-3 text-sm italic ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                "{user.catchline}"
              </dd>
            )}

            <dt className="sr-only">{trad[lang].user.introduction}</dt>
            {user.introduction && (
              <dd
                className={`mt-3 text-sm italic ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {user.introduction}
              </dd>
            )}

            <dt className="mt-3 text-primary">{trad[lang].user.badges}</dt>
            {badges && badges.length > 0 ? (
              <dd
                className={`mt-3 flex flex-row flex-wrap items-start justify-center gap-4 text-sm italic ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {badges.map((badge) => {
                  return (
                    <div
                      key={`badge-${badge.id}`}
                      className="flex min-h-full w-[96px] cursor-help flex-col items-center justify-start"
                      title={
                        lang === "fr" ? badge.description : badge.description_en
                      }
                    >
                      <img
                        className="h-14 w-14 rounded-full object-cover shadow-md"
                        src={badge.icon}
                        alt={badge.name_en}
                      />
                      <span className="mt-2 text-xs">
                        {lang === "fr" ? badge.name : badge.name_en}
                      </span>
                    </div>
                  );
                })}
              </dd>
            ) : (
              <span
                className={`mt-2 text-sm italic ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {trad[lang].user.noBadgesUnlockedYet}
              </span>
            )}
          </dl>
        </div>
      </div>

      {/* STATS */}
      {userStats && (
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 p-4">
          {userStats.listCount > 0 && (
            <StatCard
              data={userStats.listCount}
              label={trad[lang].user.lists}
              darkMode={darkMode}
            />
          )}

          {userStats.moviesListCount > 0 && (
            <StatCard
              data={userStats.moviesListCount}
              label={trad[lang].user.moviesLists}
              darkMode={darkMode}
            />
          )}

          {userStats.showsListCount > 0 && (
            <StatCard
              data={userStats.showsListCount}
              label={trad[lang].user.showsLists}
              darkMode={darkMode}
            />
          )}

          {userStats.podcastsListCount > 0 && (
            <StatCard
              data={userStats.podcastsListCount}
              label={trad[lang].user.podcastsLists}
              darkMode={darkMode}
            />
          )}

          {userStats.youtubesListCount > 0 && (
            <StatCard
              data={userStats.youtubesListCount}
              label={trad[lang].user.youtubeLists}
              darkMode={darkMode}
            />
          )}

          {userStats.mixedListCount > 0 && (
            <StatCard
              data={userStats.mixedListCount}
              label={trad[lang].user.mixedLists}
              darkMode={darkMode}
            />
          )}

          {userStats.likesCount > 0 && (
            <StatCard
              data={userStats.likesCount}
              label={trad[lang].user.likes}
              darkMode={darkMode}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default UserCard;
