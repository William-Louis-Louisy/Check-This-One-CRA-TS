import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

function DarkModeToggle() {
  const { darkMode, setDarkMode, storeDarkMode } = useContext(AppContext);
  return (
    <div className="ml-6 flex flex-col items-center justify-center rounded-full p-1 shadow-inner">
      {!darkMode ? (
        <button
          onClick={() => {
            setDarkMode(true);
            storeDarkMode(true);
          }}
        >
          <SunIcon className="h-6 w-6 text-primary" />
        </button>
      ) : (
        <button
          onClick={() => {
            setDarkMode(false);
            storeDarkMode(false);
          }}
        >
          <MoonIcon className="h-6 w-6 text-[#fff6cc]" />
        </button>
      )}
    </div>
  );
}

export default DarkModeToggle;
