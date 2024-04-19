import { useContext } from "react";
import trad from "../lang/traduction";
import { AppContext } from "../contexts/AppContext";
import StepsDisplay from "../components/BingeBuddy/StepsDisplay";
import ResultsDisplay from "../components/BingeBuddy/ResultsDisplay";
import BuddyBot from "../components/BingeBuddy/BuddyBot";

function BingeBuddy() {
  const {
    lang,
    darkMode,
    results,
    setResults,
    currentStep,
    setCurrentStep,
    isFinished,
    setIsFinished,
    page,
    setPage,
    totalPages,
    buddyForm,
    setBuddyForm,
  } = useContext(AppContext);

  return (
    <div
      className={`flex h-full min-h-screen flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } py-16 `}
    >
      <div className="relative w-full border-b border-primary px-4 py-5 sm:flex sm:items-center sm:justify-between lg:w-[70%] lg:px-0">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].pageTitles.bingeBuddy}
        </h3>

        {currentStep !== 1 && (
          <img
            id="floating-bot"
            className="absolute right-4 top-1 aspect-square h-16 w-16"
            src="https://ucarecdn.com/8e0be7eb-743d-4b8e-8bb0-dfe9a8f7b4ba/bingeBuddy.png"
            alt=""
          />
        )}
      </div>

      <div className="flex w-full flex-col items-center pb-5 lg:mt-0 lg:w-[70%] lg:px-0">
        <div className="w-full">
          {/* BUDDY BOT */}
          <BuddyBot />

          {/* STEPS */}
          <StepsDisplay
            lang={lang}
            darkMode={darkMode}
            buddyForm={buddyForm}
            setBuddyForm={setBuddyForm}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>

        {/* RESULTS */}
        <ResultsDisplay
          lang={lang}
          darkMode={darkMode}
          results={results}
          setResults={setResults}
          setCurrentStep={setCurrentStep}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          buddyForm={buddyForm}
          setBuddyForm={setBuddyForm}
        />
      </div>
    </div>
  );
}

export default BingeBuddy;
