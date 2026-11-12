import { Fragment } from "react";
import trad from "../../lang/traduction";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function LikesTable({ lang, darkMode, lists }) {
  return (
    <div className="mt-8 w-full overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg lg:w-[70%]">
      <table className="min-w-full">
        <thead
          className={`text-primary ${darkMode ? "bg-darkSec" : "bg-gray-50"}`}
        >
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
            >
              {trad[lang].labels.name}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {lists
            .filter((list) => list.liked_by.length > 0)
            .map((list) => (
              <Fragment key={list.id}>
                <tr
                  className={classNames(
                    darkMode ? "border-gray-400" : "border-gray-300",
                    "border-t border-gray-200"
                  )}
                >
                  <th
                    colSpan={5}
                    scope="colgroup"
                    className={`px-4 py-2 text-left text-sm font-semibold sm:px-6 ${
                      darkMode
                        ? "bg-darkQuar text-gray-300"
                        : "bg-gray-50 text-gray-900"
                    }}`}
                  >
                    {list.title}
                  </th>
                </tr>
                {list.liked_by.map((user) => (
                  <tr
                    key={user.email}
                    className={classNames(
                      darkMode
                        ? "border-gray-400 bg-darkQuin text-altSecondary"
                        : "border-gray-300 bg-myWhite text-secondary",
                      "border-t"
                    )}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {user.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatar}
                              alt=""
                            />
                          ) : (
                            user?.user_name && (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                                <p className="text-center text-2xl text-myWhite">
                                  {user?.user_name[0].toUpperCase()}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{user.user_name}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default LikesTable;
