import React from "react";
import trad from "../../lang/traduction";
import { typeToIcon } from "../../utils/TypeToIcon";

function TableListDisplay({ lang, lists, darkMode }) {
  return (
    <div className="w-full overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6"
            >
              {trad[lang].labels.name}
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-primary"
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
              className="whitespace-nowrap px-3 py-3.5 text-center text-sm font-semibold text-primary"
            >
              {trad[lang].labels.itemsNb}
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-primary"
            >
              {trad[lang].labels.likes}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {lists.map((list) => (
            <tr key={list.email}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-secondary sm:pl-6">
                {list.title}
              </td>
              <td className="max-w-lg truncate px-3 py-4 text-sm text-gray-500">
                {list.description}
              </td>
              <td className="flex justify-center whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                {typeToIcon(list.type)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                {list.content.length}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                {list.likes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableListDisplay;
