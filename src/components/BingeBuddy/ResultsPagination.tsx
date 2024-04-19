import { Dispatch, SetStateAction } from "react";
import trad from "../../lang/traduction";
import useRecommendations from "../../hooks/useRecommendations";
import { scrollToTop } from "../../utils/UsefullFunctions";

interface IResultsPaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  darkMode: boolean;
  lang: string;
}

function ResultsPagination({
  page,
  setPage,
  totalPages,
  darkMode,
  lang,
}: IResultsPaginationProps) {
  // HANDLE NEXT PAGE
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      scrollToTop();
    }
  };

  // HANDLE PREVIOUS PAGE
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      scrollToTop();
    }
  };

  if (page === totalPages) return null;

  return (
    <div className="flex w-full flex-row items-center justify-between px-4 lg:w-3/5">
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
        onClick={() => handlePreviousPage()}
      >
        {trad[lang].global.previous}
      </button>

      <span
        className={`${
          darkMode
            ? "bg-darkTert text-altSecondary"
            : "bg-myWhite text-secondary"
        } h-10 border-t border-b px-4 py-2`}
      >
        {page}
      </span>

      {/* Next button */}
      <button
        disabled={page === totalPages}
        className={`${
          (darkMode && page === totalPages) || page === totalPages
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
  );
}

export default ResultsPagination;
