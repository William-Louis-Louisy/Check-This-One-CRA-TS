import { TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import React from "react";
import trad from "../../lang/traduction";
import { typeToIcon } from "../../utils/TypeToIcon";

function ListsTable({
  lang,
  darkMode,
  lists,
  getTotalLists,
}: {
  lang: string;
  darkMode: boolean;
  lists: any;
  getTotalLists: () => void;
}) {
  return (
    <div className="mt-8 w-full overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg lg:w-[70%]">
      <table
        className={`min-w-full divide-y ${
          darkMode ? "divide-darkSec" : "divide-gray-300"
        }`}
      >
        <thead className={`${darkMode ? "bg-darkSec" : "bg-gray-50"}`}>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6"
            >
              {trad[lang].labels.name}
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-primary sm:table-cell"
            >
              {trad[lang].labels.description}
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-primary"
            >
              {trad[lang].labels.type}
            </th>
            <th
              scope="col"
              className="hidden whitespace-nowrap px-3 py-3.5 text-center text-sm font-semibold text-primary sm:table-cell"
            >
              {trad[lang].labels.itemsNb}
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-primary"
            >
              {trad[lang].labels.likes}
            </th>
            {/* <th
          scope="col"
          className="px-3 py-3.5 text-center text-sm font-semibold text-altRed"
        >
          {trad[lang].listEdition.delete}
        </th> */}
          </tr>
        </thead>
        <tbody
          className={`divide-y ${
            darkMode
              ? "divide-gray-500 bg-darkQuin text-gray-300"
              : "divide-gray-200 bg-white text-gray-500"
          }`}
        >
          {lists.map((list) => (
            <tr key={list.id} className="table-row">
              <td
                className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ${
                  darkMode ? "text-altSecondary" : "text-secondary"
                }`}
              >
                {list.title}
              </td>
              <td className="hidden max-w-lg truncate px-3 py-4 text-sm sm:table-cell">
                {list.description}
              </td>
              <td className="flex justify-center whitespace-nowrap px-3 py-4 text-center text-sm">
                {typeToIcon(list.type)}
              </td>
              <td className="hidden whitespace-nowrap px-3 py-4 text-center text-sm sm:table-cell">
                {list.content.length}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm">
                {list.likes}
              </td>
              {/* <td className="flex items-center justify-center whitespace-nowrap px-3 py-4 text-center text-sm text-altRed">
            <button onClick={() => deleteUser(user.id)}>
              <TrashIcon className="h-6 w-6" />
            </button>
          </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListsTable;
