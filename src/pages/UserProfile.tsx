import React, { useContext } from "react";
import UserCard from "../components/Cards/UserCard";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import EditUserCard from "../components/Cards/EditUserCard";
import trad from "../lang/traduction";

function UserProfile() {
  const { lang } = useContext(AppContext);
  const { user, refetchUser } = useContext(UserContext);

  if (user.id === 0) {
    return <div>loading</div>;
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-myLightGray">
      <div className="my-8 w-full border-b border-primary pb-5 sm:flex sm:items-center lg:h-[59px] lg:w-[70%]">
        <h3 className="ml-8 text-lg font-medium leading-6 text-primary">
          {trad[lang].navbar.myProfile}
        </h3>
      </div>
      <div className="mb-16 flex w-full flex-col items-center gap-4  lg:w-[70%] lg:flex-row lg:items-start lg:justify-between">
        <UserCard user={user} avatar={user.avatar} />
        <EditUserCard lang={lang} user={user} refetch={refetchUser} />
      </div>
    </div>
  );
}

export default UserProfile;
