import { CircularProgress } from "@mui/material";
import React from "react";
import trad from "../../lang/traduction";

function PageLoader({ lang, darkMode }: { lang: string; darkMode: boolean }) {
  return (
    <div
      className={`flex h-screen w-full items-center justify-center py-16 ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      }`}
    >
      <div className="flex animate-pulse flex-col items-center gap-2 ">
        <CircularProgress />
        <p className="font-bold uppercase text-secondary">
          {trad[lang].global.loading}
        </p>
      </div>
    </div>
  );
}

export default PageLoader;
