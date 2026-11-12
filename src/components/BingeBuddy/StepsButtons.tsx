import { Dispatch, SetStateAction } from "react";
import trad from "../../lang/traduction";
import useRecommendations from "../../hooks/useRecommendations";

interface IStepsButtonsProps {
  lang: string;
  darkMode: boolean;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  buddyForm: any;
}

function StepsButtons({
  lang,
  darkMode,
  currentStep,
  buddyForm,
  setCurrentStep,
}: IStepsButtonsProps) {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const { fetchRecommendations } = useRecommendations(apiKey);

  // HANDLE PREVIOUS STEP
  const handlePreviousStep = () => {
    if (currentStep === 7) {
      if (buddyForm.type === "tv") {
        setCurrentStep(5);
      } else if (buddyForm.type === "movie") {
        setCurrentStep(currentStep - 1);
      }
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // HANDLE NEXT STEP
  const handleNextStep = () => {
    if (currentStep === 5) {
      if (buddyForm.type === "movie") {
        setCurrentStep(6);
      } else if (buddyForm.type === "tv") {
        setCurrentStep(7);
      }
    } else if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  // HANDLE BUTTON CLICK
  const handleButtonClick = () => {
    if (
      (currentStep === 6 && buddyForm.type === "movie") ||
      (currentStep === 7 && buddyForm.type === "tv")
    ) {
      fetchRecommendations();
    } else {
      handleNextStep();
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-end gap-4 md:flex-row">
      {/* --*-- */}
      {currentStep !== 1 && (
        <p className="w-fit text-sm text-red-500 md:text-left">
          {trad[lang].bingeBuddy.dontCare}
        </p>
      )}

      <div className="flex w-full flex-row items-center justify-end gap-4 md:w-fit">
        {/* PREVIOUS BTN */}
        {currentStep > 1 && (
          <button
            onClick={handlePreviousStep}
            className={`rounded-md px-4 py-3 ${
              darkMode
                ? "bg-altSecondary text-darkBg"
                : "bg-secondary text-myWhite"
            }`}
          >
            {trad[lang].bingeBuddy.previous}
          </button>
        )}

        {/* NEXT BTN */}
        {currentStep > 0 && (
          <button
            onClick={handleButtonClick}
            disabled={
              (currentStep === 1 && buddyForm.type === "") ||
              (currentStep === 2 && !buddyForm.watchProvider) ||
              (currentStep === 5 && buddyForm.period.start === "")
            }
            className={`rounded-md px-4 py-3 ${
              buddyForm.type !== ""
                ? darkMode
                  ? "bg-altSecondary text-darkBg"
                  : "bg-secondary text-myWhite"
                : "bg-myLightGray text-myGray"
            }`}
          >
            {currentStep === 7
              ? trad[lang].bingeBuddy.finish
              : currentStep === 6 && buddyForm.type === "movie"
              ? trad[lang].bingeBuddy.finish
              : trad[lang].bingeBuddy.next}
          </button>
        )}
      </div>
    </div>
  );
}

export default StepsButtons;
