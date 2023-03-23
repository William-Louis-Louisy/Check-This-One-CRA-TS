import React from "react";
import trad from "../../lang/traduction";

function Pagination({
  page,
  setPage,
  total,
  handleNextPage,
  handlePrevPage,
  pagesToDisplay,
  darkMode,
  lang,
}) {
  return (
    <>
      {total > 1 && (
        <div className="flex w-full flex-row items-center justify-between">
          {/* Previous button */}
          <button
            disabled={page === 1}
            className={`${
              (darkMode && page === 1) || page === 1
                ? "cursor-not-allowed text-gray-300"
                : darkMode
                ? "text-altSecondary hover:text-primary"
                : "text-secondary hover:text-primary"
            } ${
              darkMode ? "bg-darkTert" : "bg-myWhite"
            } rounded-l-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0`}
            onClick={() => handlePrevPage()}
          >
            {trad[lang].global.previous}
          </button>

          <div className="flex h-10 flex-row items-center overflow-x-hidden">
            {pagesToDisplay?.map((pageNb: number, i) => (
              <span
                key={`page-${i}`}
                onClick={() => setPage(pageNb)}
                className={`${
                  (darkMode && page === pageNb) || page === pageNb
                    ? "border-primary text-primary"
                    : darkMode
                    ? "bg-darkTert text-altSecondary"
                    : "bg-myWhite text-secondary"
                } h-10 cursor-pointer border-t border-b px-4 py-2 duration-150 hover:text-primary`}
              >
                {pageNb}
              </span>
            ))}
          </div>

          {/* Next button */}
          <button
            disabled={page === total}
            className={`${
              (darkMode && page === total) || page === total
                ? "cursor-not-allowed text-gray-300"
                : darkMode
                ? "text-altSecondary hover:text-primary"
                : "text-secondary hover:text-primary"
            } ${
              darkMode ? "bg-darkTert" : "bg-myWhite"
            } rounded-r-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0`}
            onClick={() => handleNextPage()}
          >
            {trad[lang].global.next}
          </button>
        </div>
      )}
    </>
  );
}

export default Pagination;
