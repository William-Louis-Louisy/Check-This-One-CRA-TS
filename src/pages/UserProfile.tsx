import React, { useContext } from "react";
import UserCard from "../components/Cards/UserCard";
import { AppContext } from "../contexts/AppContext";
import EditUserCard from "../components/Cards/EditUserCard";
import {
  ChevronDownIcon,
  SearchIcon,
  SortAscendingIcon,
} from "@heroicons/react/solid";
import { UserContext } from "../contexts/UserContext";

function UserProfile() {
  const { lang } = useContext(AppContext);
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center bg-myLightGray">
      <div className="my-8 w-full border-b border-primary pb-5 sm:flex sm:items-center lg:h-[59px] lg:w-[70%]">
        <h3 className="ml-8 text-lg font-medium leading-6 text-primary">
          User profile
        </h3>
      </div>
      <div className="mb-16 flex w-[70%] flex-row items-start justify-between">
        <UserCard user={user} />
        <EditUserCard lang={lang} />
      </div>
    </div>
  );
}

export default UserProfile;
