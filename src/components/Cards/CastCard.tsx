import React from "react";
import Poster from "../../assets/poster.jpg";

function CastCard({
  id,
  name,
  department,
  role,
  imageUrl,
}: {
  id: number;
  name: string;
  department: string;
  role: string;
  imageUrl: string;
}) {
  console.log(id);
  return (
    <li
      key={`content-${id}`}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
    >
      <div className="flex flex-1 flex-col p-3 sm:p-8">
        <img
          className="h-32 w-full flex-shrink-0 rounded-md object-cover sm:mx-auto sm:h-32 sm:w-32 sm:rounded-full sm:object-cover"
          src={imageUrl ? "https://image.tmdb.org/t/p/w500" + imageUrl : Poster}
          alt=""
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{name}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Role</dt>
          <dd className="text-sm text-gray-500">{role}</dd>
          <dt className="sr-only">Department</dt>
          <dd className="mt-3">
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
              {department}
            </span>
          </dd>
        </dl>
      </div>
    </li>
  );
}

export default CastCard;
