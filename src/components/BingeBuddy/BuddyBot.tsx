import { useContext } from "react";
import trad from "../../lang/traduction";
import { AppContext } from "../../contexts/AppContext";

function BuddyBot() {
  const { lang, darkMode, currentStep, isFinished } = useContext(AppContext);
  return (
    <>
      {!isFinished && currentStep === 1 ? (
        <div className="my-4 flex w-full flex-row items-center justify-between px-4">
          {/* DESCRIPTION */}
          <p className={`${darkMode ? "text-gray-300" : "text-smokyBlack"}`}>
            {trad[lang].bingeBuddy.description}
          </p>

          {/* BOT */}
          <img
            id="floating-bot"
            className="aspect-square w-1/3 lg:h-40 lg:w-40"
            src="https://ucarecdn.com/8e0be7eb-743d-4b8e-8bb0-dfe9a8f7b4ba/bingeBuddy.png"
            alt=""
          />
        </div>
      ) : null}

      {isFinished && (
        <div className="flex w-full flex-row items-center gap-4 p-3 md:px-0 md:py-4">
          {/* DESCRIPTION */}
          <div
            className={`${
              darkMode ? "text-gray-300" : "text-smokyBlack"
            } flex flex-col gap-1`}
          >
            <p className="font-semibold">{trad[lang].bingeBuddy.results}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default BuddyBot;
