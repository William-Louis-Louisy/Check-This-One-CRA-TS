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
      className={`relative flex w-[90%] flex-col items-center overflow-hidden rounded-xl px-3 py-3 duration-100 sm:w-full md:h-[564px] md:w-60 ${
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

      <h2 className="mt-3 mb-2 w-full text-ellipsis whitespace-nowrap text-center text-lg font-semibold">
        {screenWidth > 400 ? titleLength(serie.name) : serie.name}
      </h2>
      {serie.first_air_date ? (
        <h4 className="text-center text-sm font-extralight">
          {dateFormater(serie.first_air_date)}
        </h4>
      ) : (
        ""
      )}
      {serie?.overview && (
        <p className="card mt-2 h-[90px] overflow-y-scroll text-ellipsis px-4 text-center text-sm">
          {serie.overview}
        </p>
      )}

      <div className="mt-4 mb-2 flex flex-row items-center gap-6 md:absolute md:bottom-1">
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
          <Link
            to="/login"
            className={`rounded-md border px-4 py-2 shadow-sm ${
              darkMode
                ? "border-altSecondary text-altSecondary"
                : "border-secondary text-secondary"
            }`}
          >
            <p className="text-center text-xs italic">
              {trad[lang].global.loginToAddContentToYourLists}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TvShowCard;
