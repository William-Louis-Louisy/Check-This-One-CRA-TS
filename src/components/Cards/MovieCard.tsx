import { ClipboardListIcon, FolderAddIcon } from "@heroicons/react/outline";
import React from "react";
import trad from "../../lang/traduction";

function MovieCard({ movie, lang }) {
  // FORMAT DATE
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  // DELETE MOVIE
  const handleDelete = (movieId) => {
    console.log("delete", movieId);
  };

  // ADD MOVIE
  const handlePost = () => {
    console.log("post");
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
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "/src/assets/poster.jpg"
        }
        alt=""
        className="w-4/5 rounded-md md:h-80 md:w-full"
      />
      <h2 className="mt-3 mb-2 w-full text-ellipsis whitespace-nowrap text-center text-lg font-semibold text-myBlack">
        {screenWidth > 400 ? titleLength(movie.title) : movie.title}
      </h2>
      {movie.release_date ? (
        <h4 className="text-center text-sm font-extralight">
          {dateFormater(movie.release_date)}
        </h4>
      ) : (
        ""
      )}
      <p className="card mt-2 h-[90px] overflow-y-scroll text-ellipsis px-4 text-center text-sm text-myBlack">
        {movie.overview}
      </p>

      <div className="mt-4 mb-2 flex flex-row items-center gap-6 md:absolute md:bottom-1">
        <button
          className="inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={() => handlePost()}
          // style={{ display: isAdded ? "none" : "flex" }}
        >
          <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
          {trad[lang].labels.addToAList}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
