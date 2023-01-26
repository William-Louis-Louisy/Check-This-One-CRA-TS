import React from "react";
import { Link } from "react-router-dom";

function ContentCard({ data }) {
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
      <div className="h-80 w-[213px]">
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
              ? "object-contain md:h-80"
              : "rounded-md md:h-80"
          }`}
          alt=""
        />
      </div>
    </a>
  );
}

export default ContentCard;
