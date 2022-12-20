import React from "react";

function Logo() {
  return (
    <div className="flex -rotate-6 cursor-pointer flex-row duration-300 hover:rotate-0">
      <p className="w-max text-5xl font-black text-secondary">C</p>
      <p className="w-max text-5xl font-black text-primary">T</p>
      <p className="w-max text-5xl font-black text-secondary">O</p>
    </div>
  );
}

export default Logo;
