import he from "he";
import { ClipboardListIcon, PlayIcon } from "@heroicons/react/outline";
import trad from "../../lang/traduction";

function YoutubeVideoCard({ item, lang, addToList, darkMode, user }) {
  return (
    <div
      className={`my-5 flex w-full flex-col gap-3 shadow-lg lg:w-3/5 lg:min-w-[900px] lg:flex-row lg:gap-0 ${
        darkMode ? "bg-darkQuin text-gray-300" : "bg-myWhite text-smokyBlack"
      }`}
    >
      <img
        className="w-full lg:w-1/3"
        src={item.snippet.thumbnails.medium.url}
        alt={item.snippet.title}
      />
      <div className="relative flex w-full flex-col items-start gap-2 px-3 pb-16 lg:w-2/3 lg:py-6 lg:pb-0">
        <p className="w-full truncate text-lg font-semibold">
          {he.decode(item.snippet.title)}
        </p>
        <p className="max-h-16 w-full truncate text-xs">
          {item.snippet.description}
        </p>
        <p className="w-full text-xs italic lg:w-60">
          {trad[lang].labels.publishedOn}{" "}
          {new Date(item.snippet.publishedAt).toLocaleDateString()}
        </p>
        <div className="absolute bottom-3 right-3 flex w-full flex-row items-center justify-end gap-6">
          <a
            href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-md border-2 px-4 py-2 text-base font-medium shadow-sm duration-150 hover:border-primary hover:text-primary focus:outline-none focus:ring-0 focus:ring-offset-0 ${
              darkMode
                ? "border-altSecondary bg-darkQuin text-altSecondary"
                : "border-secondary bg-myWhite text-secondary"
            }`}
          >
            <PlayIcon className="h-5 w-5" aria-hidden="true" />
            {trad[lang].labels.see}
          </a>

          {user && user.id !== 0 ? (
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-0 focus:ring-offset-0 ${
                darkMode
                  ? "bg-altSecondary text-darkQuin"
                  : "bg-secondary text-myWhite"
              }`}
              onClick={() => addToList(item)}
            >
              <ClipboardListIcon className="h-5 w-5" aria-hidden="true" />
              {trad[lang].labels.addToAList}
            </button>
          ) : (
            <button
              type="button"
              className={`inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-0 focus:ring-offset-0 ${
                darkMode
                  ? "bg-gray-500 text-darkSec"
                  : "bg-gray-400 text-myWhite"
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
