import React from "react";

function ContentCard({ data }) {
  return (
    <>
      <img
        src={
          data.poster_path
            ? "https://image.tmdb.org/t/p/w500" + data.poster_path
            : "/src/assets/poster.jpg"
        }
        className="rounded-md md:h-80"
        alt=""
      />
    </>
  );
}

export default ContentCard;
