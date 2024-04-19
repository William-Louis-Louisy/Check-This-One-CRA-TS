import React, { Dispatch, SetStateAction } from "react";
import { IBuddyForm } from "../../contexts/AppContext";
import RuntimeSelector from "./RuntimeSelector";
import DateRangeSelector from "./DateRangeSelector";
import GenreSelector from "./GenreSelector";
import LanguageSelector from "./LanguageSelector";
import ProviderSelector from "./ProviderSelector";
import TypeSelector from "./TypeSelector";
import StepsButtons from "./StepsButtons";

interface IStepsDisplayProps {
  lang: string;
  darkMode: boolean;
  buddyForm: IBuddyForm;
  setBuddyForm: Dispatch<SetStateAction<IBuddyForm>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

function StepsDisplay({
  lang,
  darkMode,
  buddyForm,
  setBuddyForm,
  currentStep,
  setCurrentStep,
}: IStepsDisplayProps) {
  if (currentStep === 0) return null;

  return (
    <div
      className={`flex flex-col items-center gap-6 px-4 pt-9 pb-4 lg:my-0 lg:rounded-md ${
        darkMode ? "bg-darkQuar" : "bg-myWhite"
      }`}
    >
      <TypeSelector
        lang={lang}
        darkMode={darkMode}
        buddyForm={buddyForm}
        currentStep={currentStep}
        setBuddyForm={setBuddyForm}
      />

      <ProviderSelector
        lang={lang}
        darkMode={darkMode}
        buddyForm={buddyForm}
        currentStep={currentStep}
        setBuddyForm={setBuddyForm}
      />

      <LanguageSelector
        lang={lang}
        darkMode={darkMode}
        buddyForm={buddyForm}
        currentStep={currentStep}
        setBuddyForm={setBuddyForm}
      />

      <GenreSelector
        lang={lang}
        darkMode={darkMode}
        buddyForm={buddyForm}
        currentStep={currentStep}
        setBuddyForm={setBuddyForm}
      />

      <DateRangeSelector
        lang={lang}
        darkMode={darkMode}
        currentStep={currentStep}
      />

      <RuntimeSelector
        lang={lang}
        darkMode={darkMode}
        buddyForm={buddyForm}
        setBuddyForm={setBuddyForm}
        currentStep={currentStep}
      />

      <StepsButtons
        lang={lang}
        darkMode={darkMode}
        buddyForm={buddyForm}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}

export default StepsDisplay;
