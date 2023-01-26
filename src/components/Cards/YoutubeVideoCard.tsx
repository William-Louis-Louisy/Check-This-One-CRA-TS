import { ClipboardListIcon, EyeIcon } from "@heroicons/react/outline";
import React from "react";
import trad from "../../lang/traduction";

function YoutubeVideoCard({ item, lang, addToList }) {
  return (
    <div className="my-5 flex w-full flex-col gap-3 bg-myWhite shadow-lg lg:w-3/5 lg:min-w-[900px] lg:flex-row lg:gap-0">
      <img
        className="w-full lg:w-1/3"
        src={item.snippet.thumbnails.medium.url}
        alt={item.snippet.title}
      />
      <div className="relative flex w-full flex-col items-start gap-2 px-3 pb-16 lg:w-2/3 lg:py-6 lg:pb-0">
        <p className="w-full truncate text-lg font-semibold text-myBlack">
          {item.snippet.title}
        </p>
        <p className="w-full text-xs text-myBlack">
          {item.snippet.description}
        </p>
        <p className="w-full text-xs italic text-myBlack lg:w-60">
          {trad[lang].labels.publishedOn}{" "}
          {new Date(item.snippet.publishedAt).toLocaleDateString()}
        </p>
        <div className="absolute bottom-3 right-3 flex w-full flex-row items-center justify-end gap-6">
          <a
            href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border-2 border-secondary bg-myWhite px-4 py-2 text-base font-medium text-secondary shadow-sm duration-150 hover:border-transparent hover:bg-primary hover:text-myWhite focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <EyeIcon className="h-5 w-5" aria-hidden="true" />
            {trad[lang].labels.see}
          </a>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => addToList(item)}
          >
            <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
            {trad[lang].labels.addToAList}
          </button>
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideoCard;
