import React from "react";
import { Link } from "react-router-dom";
import trad from "../../lang/traduction";

function TopRatedUserCard({ img, name, likes_nb, lang, user_id }) {
  return (
    <Link to={`/browseLists/${user_id}`}>
      <div className="topRated flex h-40 w-60 flex-col items-center rounded-md sm:h-80 sm:w-60">
        <div className="flex h-full w-full flex-col items-center gap-2 rounded-md  bg-white bg-opacity-70 p-2 duration-300 hover:bg-opacity-50 sm:gap-6 sm:p-6">
          {img ? (
            <img
              src={img}
              alt={`${name}-avatar`}
              className="h-16 w-16 rounded-full object-cover sm:h-32 sm:w-32"
            />
          ) : (
            name && (
              <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-secondary sm:h-32 sm:w-32">
                <p className="text-center text-3xl text-myWhite sm:text-6xl">
                  {name[0].toUpperCase()}
                </p>
              </div>
            )
          )}

          <div className="flex flex-col items-center rounded-md bg-white py-3 px-4 font-medium shadow-sm sm:gap-3 sm:font-semibold">
            <span className="text-sm uppercase text-primary underline underline-offset-4 sm:text-base">
              {name}
            </span>

            <div className="text-sm text-black sm:text-base">
              <span className="font-semibold text-primary">{likes_nb}</span>{" "}
              <span>{trad[lang].home.accumulatedLikes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TopRatedUserCard;
