import React from "react";
import { Link } from "react-router-dom";

function SmallContentCard({ data }) {
  // HANLE TYPE
  const handleType = (type) => {
    switch (type) {
      case "movie":
        return "movieDetails";
      case "show":
        return "tvDetails";
      case "youtube":
        return "youtubeDetails";
      default:
        return "movieDetails";
    }
  };

  return (
    <a
      href={
        data.type === "youtube"
          ? `https://www.youtube.com/watch?v=${data.provider_id_string}}`
          : `/${handleType(data.type)}/${data.provider_id}`
      }
    >
      <div className="h-40 w-[106px] md:h-48 md:max-w-[192px]">
        <img
          src={
            data.type === "youtube"
              ? data.poster_path
                ? data.poster_path
                : "/src/assets/poster.jpg"
              : data.poster_path
              ? "https://image.tmdb.org/t/p/w500" + data.poster_path
              : "/src/assets/poster.jpg"
          }
          className={`${
            data.type === "youtube"
              ? "h-40 object-contain md:h-48"
              : "h-40 rounded-md md:h-48"
          }`}
          alt=""
        />
      </div>
    </a>
  );
}

export default SmallContentCard;
