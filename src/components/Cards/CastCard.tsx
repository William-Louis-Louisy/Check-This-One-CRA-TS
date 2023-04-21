import React from "react";
import Poster from "../../assets/avatar-ph.png";

function CastCard({
  id,
  name,
  department,
  role,
  imageUrl,
  darkMode,
}: {
  id: number;
  name: string;
  department: string;
  role: string;
  imageUrl: string;
  darkMode: boolean;
}) {
  return (
    <li
      className={`col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg ${
        darkMode ? "bg-darkQuin" : "bg-white"
      } text-center shadow`}
    >
      <div className="flex flex-1 flex-col p-3 sm:p-8">
        <img
          className="h-32 w-full flex-shrink-0 rounded-md object-cover shadow-inner sm:mx-auto sm:h-32 sm:w-32 sm:rounded-full sm:object-cover"
          src={imageUrl ? "https://image.tmdb.org/t/p/w500" + imageUrl : Poster}
          alt=""
        />
        <h3
          className={`mt-6 text-sm font-medium ${
            darkMode ? "text-gray-300" : "text-gray-900"
          } `}
        >
          {name}
        </h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Role</dt>
          <dd
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } text-gray-500`}
          >
            {role}
          </dd>
          <dt className="sr-only">Department</dt>
          <dd className="mt-3">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                darkMode
                  ? "bg-darkTert text-gray-300"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {department}
            </span>
          </dd>
        </dl>
      </div>
    </li>
  );
}

export default CastCard;
