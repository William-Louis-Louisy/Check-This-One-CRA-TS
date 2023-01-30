import { ClipboardListIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import trad from "../../lang/traduction";

function TvShowCard({ serie, lang, handleAddToList }) {
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
    <div className="relative flex w-full flex-col items-center overflow-hidden rounded-xl py-3 duration-100 md:h-[564px] md:w-60">
      <Link to={`/tvDetails/${serie.id}`} className="">
        <img
          src={
            serie.poster_path
              ? "https://image.tmdb.org/t/p/w500" + serie.poster_path
              : "/src/assets/poster.jpg"
          }
          alt=""
          className="w-4/5 rounded-md duration-200 hover:shadow-xl hover:shadow-smokyBlack/10 md:h-80 md:w-full"
        />
      </Link>

      <h2 className="mt-3 mb-2 w-full text-ellipsis whitespace-nowrap text-center text-lg font-semibold text-myBlack">
        {screenWidth > 400 ? titleLength(serie.name) : serie.name}
      </h2>
      {serie.first_air_date ? (
        <h4 className="text-center text-sm font-extralight">
          {dateFormater(serie.first_air_date)}
        </h4>
      ) : (
        ""
      )}
      <p className="card mt-2 h-[90px] overflow-y-scroll text-ellipsis px-4 text-center text-sm text-myBlack">
        {serie.overview}
      </p>

      <div className="mt-4 mb-2 flex flex-row items-center gap-6 md:absolute md:bottom-1">
        <button
          className="inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={() => handleAddToList(serie)}
          // style={{ display: isAdded ? "none" : "flex" }}
        >
          <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
          {trad[lang].labels.addToAList}
        </button>
      </div>
    </div>
  );
}

export default TvShowCard;
