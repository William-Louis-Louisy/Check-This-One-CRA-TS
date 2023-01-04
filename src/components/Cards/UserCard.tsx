import React from "react";
import { IUser } from "../../contexts/UserContext";

function UserCard({ user, avatar }: { user: IUser; avatar: string }) {
  return (
    <div className="w-full space-y-8 divide-y divide-gray-200 rounded-md bg-white p-8 shadow-lg md:w-1/2">
      <div className="space-y-4 divide-y divide-gray-200 sm:space-y-4">
        {/* AVATAR */}
        <div className="mb-6 flex flex-row items-center justify-center gap-4 md:mb-0">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src={avatar}
            alt=""
          />
          <div className="w-full">
            <h3 className="text-left text-lg font-medium leading-6 text-gray-900">
              {user.user_name}
            </h3>
          </div>
        </div>

        {/* COUNTRY */}
        <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 ">
          <label
            htmlFor="country"
            className="block pt-2 text-sm font-medium text-gray-700 sm:mt-px"
          >
            Country
          </label>
          <div className="mt-1">
            <p
              id="country"
              className="block w-full max-w-lg sm:max-w-xs sm:text-sm"
            >
              {user.country}
            </p>
          </div>
        </div>

        {/* CITY */}
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 ">
          <label
            htmlFor="city"
            className="block pt-2 text-sm font-medium text-gray-700 sm:mt-px"
          >
            City
          </label>
          <div className="mt-1">
            <p
              id="country"
              className="block w-full max-w-lg sm:max-w-xs sm:text-sm"
            >
              {user.city}
            </p>
          </div>
        </div>

        {/* INTRODUCTION */}
        <div className="flex flex-col sm:gap-1 ">
          <label
            htmlFor="about"
            className="block pt-2 text-sm font-medium text-gray-700 sm:mt-px"
          >
            Catchline
          </label>
          <p id="about" className="ml-6 max-w-[320px] text-sm italic">
            {user.catchline}
          </p>
        </div>

        {/* INTRODUCTION */}
        <div className="flex flex-col sm:gap-1 ">
          <label
            htmlFor="about"
            className="block pt-2 text-sm font-medium text-gray-700 sm:mt-px"
          >
            About
          </label>
          <p id="about" className="ml-6 max-w-[320px] text-sm italic">
            {user.introduction}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
