import React from "react";
import trad from "../../lang/traduction";

function PodcastCard({
  item,
  darkMode,
  handleAddToList,
  lang,
  id,
  href,
  img,
  title,
}: {
  item: any;
  darkMode: boolean;
  handleAddToList: Function;
  lang: string;
  id: string;
  href: string;
  img: string;
  title: string;
}) {
  return (
    <div
      key={id}
      className={`flex w-[170px] flex-col gap-2 rounded-md rounded-b-md text-center shadow-md duration-150 ${
        darkMode
          ? "bg-darkTert text-gray-300 shadow-gray-900"
          : "bg-myWhite text-smokyBlack shadow-gray-300"
      }`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img src={img} alt={title} className="rounded-t-md" />
      </a>

      <div className="flex h-full flex-col items-center justify-between gap-2 pb-4">
        <span className="max-h-12 overflow-hidden px-2">{title}</span>

        <button
          className={`w-fit rounded-md px-3 py-2 text-sm ${
            darkMode
              ? "bg-altSecondary text-darkTert"
              : "bg-secondary text-myWhite"
          }`}
          onClick={() => handleAddToList(item)}
        >
          {trad[lang].labels.addToAList}
        </button>
      </div>
    </div>
  );
}

export default PodcastCard;
