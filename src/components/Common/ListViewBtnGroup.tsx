import { BsCardList, BsTable } from "react-icons/bs";
import trad from "../../lang/traduction";

function ListViewBtnGroup({ state, setState, lang }) {
  return (
    <span className="relative z-0 inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-transparent ${
          state === false ? "text-primary" : "text-secondary"
        }`}
        title={trad[lang].global.cardsList}
        onClick={() => setState(false)}
      >
        <span className="sr-only">{trad[lang].global.cardsList}</span>
        <BsCardList className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-transparent ${
          state === true ? "text-primary" : "text-secondary"
        }`}
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
