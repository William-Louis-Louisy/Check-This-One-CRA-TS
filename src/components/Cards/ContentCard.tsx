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
    <Link to={`/${handleType(data.type)}/${data.provider_id}`}>
      <div className="h-80 w-[213px]">
        <img
          src={
            data.poster_path
              ? "https://image.tmdb.org/t/p/w500" + data.poster_path
              : "/src/assets/poster.jpg"
          }
          className="rounded-md md:h-80"
          alt=""
        />
      </div>
    </Link>
  );
}

export default ContentCard;
