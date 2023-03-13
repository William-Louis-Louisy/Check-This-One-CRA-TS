import { BsCardList, BsTable } from "react-icons/bs";
import trad from "../../lang/traduction";

function ListViewBtnGroup({ state, setState, lang, darkMode }) {
  console.log(darkMode, state);
  return (
    <span className="relative z-0 inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className={`relative inline-flex items-center rounded-l-md border px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-transparent  ${
          (darkMode && !state) || !state
            ? "text-primary"
            : darkMode
            ? "text-altSecondary"
            : "text-secondary"
        } ${
          darkMode
            ? "border-gray-400 bg-darkQuin hover:bg-darkQuar focus:border-gray-400 focus:bg-darkQuar"
            : "border-gray-300 bg-white hover:bg-gray-50 focus:border-gray-300 focus:bg-gray-100"
        }`}
        title={trad[lang].global.cardsList}
        onClick={() => setState(false)}
      >
        <span className="sr-only">{trad[lang].global.cardsList}</span>
        <BsCardList className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`relative -ml-px inline-flex items-center rounded-r-md border px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-transparent  ${
          (darkMode && state) || state
            ? "text-primary"
            : darkMode
            ? "text-altSecondary"
            : "text-secondary"
        } ${
          darkMode
            ? "border-gray-400 bg-darkQuin hover:bg-darkQuar focus:border-gray-400 focus:bg-darkQuar"
            : "border-gray-300 bg-white hover:bg-gray-50 focus:border-gray-300 focus:bg-gray-100"
        }}`}
        title={trad[lang].global.table}
        onClick={() => setState(true)}
      >
        <span className="sr-only">{trad[lang].global.table}</span>
        <BsTable className="h-5 w-5" aria-hidden="true" />
      </button>
    </span>
  );
}

export default ListViewBtnGroup;
