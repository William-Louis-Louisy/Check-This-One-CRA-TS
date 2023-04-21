import React from "react";
import trad from "../../lang/traduction";

function BadgesTable({ lang, darkMode, badges }) {
  return (
    <div className="mt-4 w-full overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg lg:w-[70%]">
      <table
        className={`min-w-full divide-y ${
          darkMode ? "divide-darkSec" : "divide-gray-300"
        }`}
      >
        <thead className={`${darkMode ? "bg-darkSec" : "bg-gray-50"}`}>
          <tr>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-primary"
            >
              {trad[lang].labels.icon}
            </th>
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
          </tr>
        </thead>
        <tbody
          className={`divide-y ${
            darkMode
              ? "divide-gray-500 bg-darkQuin text-gray-300"
              : "divide-gray-200 bg-white text-gray-500"
          }`}
        >
          {badges.map((badge) => (
            <tr key={badge.id} className="table-row">
              <td className="flex justify-center whitespace-nowrap px-3 py-4 text-center text-sm">
                <img
                  src={badge.icon}
                  alt={badge.name_en}
                  className="h-16 w-16"
                />
              </td>
              <td
                className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6`}
              >
                {lang === "fr" ? badge.name : badge.name_en}
              </td>
              <td className="hidden max-w-lg truncate px-3 py-4 text-sm sm:table-cell">
                {lang === "fr" ? badge.description : badge.description_en}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BadgesTable;
