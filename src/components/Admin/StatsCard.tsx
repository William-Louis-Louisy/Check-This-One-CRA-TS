import {
  HiOutlineViewList,
  HiOutlineHeart,
  HiOutlineUsers,
} from "react-icons/hi";
import trad from "../../lang/traduction";
import { RiMedalLine } from "react-icons/ri";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function StatsCard({
  darkMode,
  lang,
  totalUsers,
  totalLists,
  totalLikes,
  totalBadges,
  dataDisplayed,
  setDataDisplayed,
}: {
  darkMode: boolean;
  lang: string;
  totalUsers: number;
  totalLists: number;
  totalLikes: number;
  totalBadges: number;
  dataDisplayed: number;
  setDataDisplayed: React.Dispatch<React.SetStateAction<number>>;
}) {
  const stats = [
    {
      id: 1,
      name: trad[lang].admin.totalUsers,
      stat: totalUsers,
      icon: HiOutlineUsers,
    },
    {
      id: 2,
      name: trad[lang].admin.totalLists,
      stat: totalLists,
      icon: HiOutlineViewList,
    },
    {
      id: 3,
      name: trad[lang].admin.totalLikes,
      stat: totalLikes,
      icon: HiOutlineHeart,
    },
    {
      id: 4,
      name: trad[lang].admin.totalBadges,
      stat: totalBadges,
      icon: RiMedalLine,
    },
  ];

  return (
    <div className="flex w-full items-center justify-center">
      <dl className="flex flex-col items-center gap-4 lg:w-[70%] lg:flex-row lg:flex-wrap lg:justify-center">
        {stats.map((item) => (
          <div
            key={item.id}
            className={classNames(
              darkMode ? "bg-darkSec text-gray-100" : "bg-myWhite text-myWhite",
              "relative w-72 overflow-hidden rounded-lg px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            )}
          >
            <dt>
              <div className="absolute rounded-md bg-primary p-3">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p
                className={classNames(
                  darkMode ? "text-gray-100" : "text-gray-500",
                  "ml-16 truncate text-sm font-medium text-gray-500"
                )}
              >
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p
                className={classNames(
                  darkMode ? "text-gray-100" : "text-gray-900",
                  "text-2xl font-semibold"
                )}
              >
                {item.stat}
              </p>

              <div
                className={classNames(
                  darkMode ? "bg-darkTert" : "bg-myWhite",
                  dataDisplayed === item.id ? "border-t-2 border-primary" : "",
                  "absolute inset-x-0 bottom-0 px-4 py-4 sm:px-6"
                )}
              >
                <div className="text-sm">
                  <button
                    onClick={() => setDataDisplayed(item.id)}
                    className={classNames(
                      (darkMode && dataDisplayed === item.id) ||
                        dataDisplayed === item.id
                        ? "text-primary"
                        : darkMode
                        ? "text-altSecondary hover:text-altSecondary/40"
                        : "text-secondary hover:text-secondary/40",
                      "font-medium duration-150"
                    )}
                  >
                    {" "}
                    {trad[lang].admin.viewAll}
                    <span className="sr-only"> {item.name} stats</span>
                  </button>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default StatsCard;
