import { ClipboardListIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import trad from "../../lang/traduction";
import Poster from "../../assets/poster.jpg";

function TvShowCard({ serie, lang, handleAddToList, darkMode, user }) {
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  // CUT TITLES LENGTH IF TOO LONG
  const titleLength = (title) => {
    if (title.length > 20) {
      return title.slice(0, 20) + "...";
    } else {
      return title;
    }
  };

  // GET SCREEN WIDTH
  const screenWidth = window.innerWidth;

  return (
    <div
      className={`flex w-[90%] flex-col items-center overflow-hidden rounded-xl px-3 py-3 duration-100 sm:w-full md:w-60 ${
        darkMode ? "text-gray-300" : "text-smokyBlack"
      }`}
    >
      <Link
        to={`/tvDetails/${serie.id}`}
        className="flex w-4/5 flex-col items-center sm:w-full"
      >
        <img
          src={
            serie.poster_path
              ? "https://image.tmdb.org/t/p/w500" + serie.poster_path
              : Poster
          }
          alt=""
          className="w-4/5 rounded-md duration-200 hover:shadow-xl hover:shadow-smokyBlack/10 md:h-80 md:w-full"
        />
      </Link>

      <h2 className="mt-3 mb-2 w-full text-ellipsis whitespace-nowrap text-center text-sm font-semibold">
        {screenWidth > 400 ? titleLength(serie.name) : serie.name}
      </h2>
      {serie.first_air_date ? (
        <h4 className="text-center text-xs font-extralight italic">
          {dateFormater(serie.first_air_date)}
        </h4>
      ) : (
        ""
      )}

      <div className="mt-3 mb-2 flex flex-row items-center gap-6">
        {user?.id ? (
          <button
            className={`inline-flex items-center gap-2 rounded-md border border-transparent ${
              darkMode
                ? "bg-altSecondary text-darkBg"
                : "bg-secondary text-myWhite"
            } px-4 py-2 text-base font-medium shadow-sm duration-150 hover:bg-primary focus:outline-none  focus:ring-0 focus:ring-offset-0`}
            onClick={() => handleAddToList(serie)}
          >
            <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
            {trad[lang].labels.addToAList}
          </button>
        ) : (
          <button
            className={`inline-flex items-center gap-2 rounded-md border border-transparent ${
              darkMode ? "bg-gray-500 text-darkSec" : "bg-gray-400 text-myWhite"
            } cursor-not-allowed px-4 py-2 text-base font-medium shadow-sm  focus:outline-none focus:ring-0 focus:ring-offset-0`}
            disabled
            title={trad[lang].global.loginToAddContentToYourLists}
          >
            <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
            {trad[lang].labels.addToAList}
          </button>
        )}
      </div>
    </div>
  );
}

export default TvShowCard;
