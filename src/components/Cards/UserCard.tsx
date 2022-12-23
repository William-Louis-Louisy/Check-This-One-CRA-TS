import React from "react";

function UserCard() {
  return (
    <div className="m-8 flex w-full max-w-[668px] flex-row items-center rounded-md p-4 shadow-md lg:w-1/2">
      <img
        className="mx-4 h-32 w-32 rounded-full object-cover"
        src="https://focus.telerama.fr/2022/09/27/0/0/1280/720/1200/0/60/0/00a77b2_1664272535142-telerama-000388-059.jpg/webp"
        alt=""
      />

      <div className="flex h-full w-full flex-col px-4">
        <h3 className="text-center text-2xl font-bold text-primary">
          John Doe
        </h3>
        {/* EMAIL */}
        <div className="flex flex-row items-center justify-between text-primary">
          <p>Email :</p>
          <p>admin@admin.fr</p>
        </div>
        {/* COUNTRY */}
        <div className="flex flex-row items-center justify-between text-primary">
          <p>Country :</p>
          <p>France</p>
        </div>
        {/* CITY */}
        <div className="flex flex-row items-center justify-between text-primary">
          <p>City :</p>
          <p>Lyon</p>
        </div>
        {/* CATCHLINE */}
        <div className="flex flex-row items-center justify-between text-primary">
          <p>Catchline :</p>
          <p>"Ne laisse jamais personne savoir ce que tu penses."</p>
        </div>
        {/* INTRODUCTION */}
        <div className="flex flex-row items-center justify-between text-primary">
          <p>Introduction :</p>
          <p>admin@admin.fr</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
