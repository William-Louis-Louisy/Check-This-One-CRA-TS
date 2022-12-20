import React from "react";

function YoutubeChannelCard({ item }) {
  return (
    <div className="my-5 flex w-full flex-col gap-3 bg-myWhite p-3 shadow-lg md:w-fit md:flex-row md:items-center md:rounded-3xl lg:w-3/5 lg:min-w-[900px]">
      <img
        className="w-24 rounded-full"
        src={item.snippet.thumbnails.default.url}
        alt={item.snippet.title}
      />
      <div className="flex w-full flex-col items-start gap-2">
        <p className="text-lg font-semibold text-myBlack">
          {item.snippet.title}
        </p>
        <p className="w-full text-xs text-myBlack">
          {item.snippet.description}
        </p>
      </div>
    </div>
  );
}

export default YoutubeChannelCard;
