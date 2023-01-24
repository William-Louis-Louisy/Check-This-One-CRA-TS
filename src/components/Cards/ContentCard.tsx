import React from "react";
import { Link } from "react-router-dom";

function ContentCard({ data }) {
  return (
    <Link to={`/movieDetails/${data.provider_id}`}>
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
