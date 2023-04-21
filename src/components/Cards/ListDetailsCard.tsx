import React from "react";
import trad from "../../lang/traduction";
import CircularProgressBar from "../Common/CircularProgressBar";

function ListDetailsCard({ lang, darkMode, list, loggedUser }) {
  return (
    <div
      className={`details-parent mb-8 mt-4 w-full p-4 lg:w-[70%] lg:rounded-md ${
        darkMode ? "bg-darkTert" : "bg-myWhite"
      }`}
    >
      {/* Description */}
      <div className="details-div1">
        {" "}
        <div className="flex flex-col items-start">
          <span className="text-primary">{trad[lang].labels.description}:</span>
          <span
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-300" : "text-smokyBlack"
            }`}
          >
            {list.description}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="details-div2">
        {list.tags && list.tags.length > 0 && (
          <div className="flex flex-col items-start">
            <span className="text-primary">{trad[lang].labels.tags}:</span>
            <div className="mt-1 flex flex-row flex-wrap items-center gap-2">
              {list.tags &&
                list.tags.length > 0 &&
                list.tags.map((tag: any, index: number) => (
                  <div
                    key={tag.name}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 ${
                      darkMode
                        ? "bg-darkSec text-gray-300"
                        : "bg-myLightGray text-smokyBlack"
                    }`}
                  >
                    <span className="text-sm">
                      {lang === "en" ? tag.name : tag.name_fr}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Likes */}
      <div className="details-div3">
        {list.liked_by && list.liked_by.length > 0 && (
          <div className="flex flex-col items-start">
            <span className="text-primary">{trad[lang].labels.likes}:</span>
            <div className="card mt-1 flex max-h-32 flex-row flex-wrap items-center gap-3">
              {list.liked_by.map((user: any, index: number) => (
                <div
                  key={user.id}
                  className={`flex flex-row items-center gap-1 rounded-l-full rounded-r-full pr-3 text-sm ${
                    darkMode
                      ? "bg-darkSec text-gray-300"
                      : "bg-myLightGray text-smokyBlack"
                  }`}
                >
                  {user.avatar ? (
                    <img
                      className="h-6 w-6 rounded-full object-cover sm:h-8 sm:w-8"
                      src={user.avatar}
                      alt=""
                    />
                  ) : (
                    user.user_name && (
                      <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm sm:h-8 sm:w-8 sm:text-base">
                        <p className="text-center text-xl text-myWhite">
                          {user.user_name[0].toUpperCase()}
                        </p>
                      </div>
                    )
                  )}
                  <span className="text-sm">{user.user_name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="details-div4">
        {list && loggedUser && loggedUser.id !== 0 && (
          <div className="flex flex-col items-start">
            <span className="text-primary">
              {trad[lang].labels.levelOfProgressOnThisList}:
            </span>

            <div className="mt-2 flex w-full items-center justify-center">
              <div
                className={`flex w-full items-center justify-center rounded-md p-3 ${
                  darkMode ? "bg-darkBg" : "bg-myLightGray"
                }`}
              >
                <CircularProgressBar
                  progress={list.completionPercentage}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListDetailsCard;
