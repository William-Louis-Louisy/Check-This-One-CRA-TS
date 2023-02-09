import React from "react";
import trad from "../../lang/traduction";

function TopRatedUserCard({ img, name, lists_nb, likes_nb, lang }) {
  return (
    <div className="topRated flex h-40 w-60 flex-col items-center rounded-md sm:h-80 sm:w-60">
      <div className="flex h-full w-full flex-col items-center gap-2 rounded-md  bg-white bg-opacity-70 p-2 sm:gap-6 sm:p-6">
        <img
          src={img}
          alt={`${name}-avatar`}
          className="h-16 w-16 rounded-full object-cover sm:h-32 sm:w-32"
        />

        <div className="flex flex-col items-center font-medium sm:gap-3 sm:font-semibold">
          <span className="text-sm text-black sm:text-base">{name}</span>
          <div className="text-sm text-black sm:text-base">
            <span className="font-semibold text-primary">{lists_nb}</span>{" "}
            <span>{trad[lang].home.lists}</span>
          </div>
          <div className="text-sm text-black sm:text-base">
            <span className="font-semibold text-primary">{likes_nb}</span>{" "}
            <span>{trad[lang].home.accumulatedLikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopRatedUserCard;
