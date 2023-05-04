import React from "react";
import trad from "../../lang/traduction";
import { IUser } from "../../contexts/UserContext";
import { ClipboardListIcon } from "@heroicons/react/outline";

function PodcastCard({
  item,
  darkMode,
  handleAddToList,
  lang,
  id,
  href,
  img,
  title,
  user,
}: {
  item: any;
  darkMode: boolean;
  handleAddToList: Function;
  lang: string;
  id: string;
  href: string;
  img: string;
  title: string;
  user: IUser;
}) {
  return (
    <div
      key={id}
      className={`flex w-full text-center shadow-md duration-150 md:w-[170px] md:flex-col md:gap-2 md:rounded-md md:rounded-b-md ${
        darkMode
          ? "bg-darkTert text-gray-300 shadow-gray-900"
          : "bg-myWhite text-smokyBlack shadow-gray-300"
      }`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img src={img} alt={title} className="max-h-[170px] md:rounded-t-md" />
      </a>

      <div className="flex h-full w-full flex-col items-center justify-between gap-2 pt-2 md:pt-0">
        <span className="max-h-12 overflow-hidden px-2">{title}</span>

        {user && user.id !== 0 ? (
          <button
            className={`flex w-full items-center justify-center gap-2 border-t px-3 py-2 text-sm duration-150 hover:text-primary ${
              darkMode
                ? "border-gray-500 text-altSecondary"
                : "border-gray-300 text-secondary"
            }`}
            onClick={() => handleAddToList(item)}
          >
            <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
            {trad[lang].labels.addToAList}
          </button>
        ) : (
          <button
            className={`flex w-full cursor-not-allowed items-center justify-center gap-2 border-t px-3 py-2 text-sm ${
              darkMode
                ? "border-gray-500 text-gray-500"
                : "border-gray-300 text-gray-400"
            }`}
            onClick={() => handleAddToList(item)}
            disabled
            title={trad[lang].global.loginToAddContentToYourLists}
          >
            <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
            {trad[lang].labels.addToAList}
          </button>
        )}
      </div>
    </div>
  );
}

export default PodcastCard;
