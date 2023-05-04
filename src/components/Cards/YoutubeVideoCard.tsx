import he from "he";
import { ClipboardListIcon, PlayIcon } from "@heroicons/react/outline";
import trad from "../../lang/traduction";

function YoutubeVideoCard({ item, lang, addToList, darkMode, user }) {
  return (
    <div
      className={`my-4 flex w-full flex-col shadow-lg lg:h-44 lg:w-3/5 lg:min-w-[900px] lg:flex-row ${
        darkMode ? "bg-darkQuin text-gray-300" : "bg-myWhite text-smokyBlack"
      }`}
    >
      {/* THUMBNAILS */}
      <img
        className="aspect-video"
        src={item.snippet.thumbnails.medium.url}
        alt={item.snippet.title}
      />

      {/* CONTENT */}
      <div className="flex h-full w-full flex-col justify-between lg:w-full">
        {/* INFORMATIONS */}
        <div className="w-full py-2 px-3">
          <p className="w-full truncate font-semibold">
            {he.decode(item.snippet.title)}
          </p>
          <p className="w-full text-xs italic lg:w-60">
            {trad[lang].labels.publishedOn}{" "}
            {new Date(item.snippet.publishedAt).toLocaleDateString()}
          </p>
        </div>

        {/* BUTTONS */}
        <div
          className={`flex w-full flex-row items-center border-t ${
            darkMode ? "border-gray-500" : "border-gray-300"
          }`}
        >
          <a
            href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex w-1/2 items-center justify-center gap-2 border-r px-4 py-2 text-sm font-medium shadow-sm duration-150 hover:text-primary focus:outline-none focus:ring-0 focus:ring-offset-0 lg:text-base ${
              darkMode
                ? "border-gray-500 text-altSecondary"
                : "border-gray-300 text-secondary"
            }`}
          >
            <PlayIcon className="h-5 w-5" aria-hidden="true" />
            {trad[lang].labels.see}
          </a>

          {user && user.id !== 0 ? (
            <button
              type="button"
              className={`inline-flex w-1/2 items-center justify-center gap-2 px-4 py-2 text-sm font-medium shadow-sm duration-150 hover:text-primary focus:outline-none focus:ring-0 focus:ring-offset-0 lg:text-base ${
                darkMode ? "text-altSecondary" : "text-secondary"
              }`}
              onClick={() => addToList(item)}
            >
              <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
              {trad[lang].labels.addToAList}
            </button>
          ) : (
            <button
              type="button"
              className={`inline-flex w-1/2 cursor-not-allowed items-center justify-center gap-2 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-0 focus:ring-offset-0 lg:text-base ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
              disabled
              title={trad[lang].global.loginToAddContentToYourLists}
            >
              <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
              {trad[lang].labels.addToAList}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideoCard;
