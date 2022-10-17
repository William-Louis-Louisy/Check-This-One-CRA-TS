import React from "react";

function Home() {
  return (
    <div className="relative flex h-[calc(100vh-64px)] flex-col items-center bg-myLightGray text-myBlack">
      <div className="h-1/3 w-full bg-background bg-cover" />
      <p className="absolute top-1/3 text-6xl font-black text-primary">
        HELLO WORLD
      </p>
      <div className="h-2/3 w-full"></div>
    </div>
  );
}

export default Home;
