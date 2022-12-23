import React from "react";
import UserCard from "../components/Cards/UserCard";

function UserProfile() {
  return (
    <div>
      <h1 className="my-4 text-center text-3xl font-bold text-primary">
        User Profile
      </h1>
      <UserCard />
    </div>
  );
}

export default UserProfile;
