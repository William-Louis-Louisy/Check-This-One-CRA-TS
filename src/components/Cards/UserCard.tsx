import React from "react";
import { IUser } from "../../contexts/UserContext";

function UserCard({ user }: { user: IUser }) {
  return (
    <div className="sha space-y-8 divide-y divide-gray-200 rounded-md bg-white p-8 shadow-lg">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          {/* AVATAR */}
          <div className="flex flex-row items-center justify-center gap-4">
            <img
              className="h-20 w-20 rounded-full object-cover"
              src="https://focus.telerama.fr/2022/09/27/0/0/1280/720/1200/0/60/0/00a77b2_1664272535142-telerama-000388-059.jpg/webp"
              alt=""
            />
            <div className="w-full">
              <h3 className="text-left text-lg font-medium leading-6 text-gray-900">
                John Doe
              </h3>
            </div>
          </div>

          {/* COUNTRY */}
          <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:pt-5">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Country
            </label>
            <div className="mt-1">
              <p
                id="country"
                className="block w-full max-w-lg sm:max-w-xs sm:text-sm"
              >
                United States
              </p>
            </div>
          </div>

          {/* CITY */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 sm:mt-px "
            >
              City
            </label>
            <div className="mt-1">
              <p
                id="country"
                className="block w-full max-w-lg sm:max-w-xs sm:text-sm"
              >
                Lyon
              </p>
            </div>
          </div>

          {/* INTRODUCTION */}
          <div className="flex flex-col sm:gap-1 sm:pt-5">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 sm:mt-px"
            >
              Catchline
            </label>
            <p id="about" className="ml-6 max-w-[320px] text-sm italic">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          {/* INTRODUCTION */}
          <div className="flex flex-col sm:gap-1 sm:pt-5">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 sm:mt-px"
            >
              About
            </label>
            <p id="about" className="ml-6 max-w-[320px] text-sm italic">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
