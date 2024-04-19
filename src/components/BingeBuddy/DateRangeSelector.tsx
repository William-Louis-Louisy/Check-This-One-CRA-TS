import React from "react";
import trad from "../../lang/traduction";
import PeriodInputs from "../Common/PeriodInputs";

interface IDateRangeSelectorProps {
  lang: string;
  darkMode: boolean;
  currentStep: number;
}

function DateRangeSelector({
  lang,
  darkMode,
  currentStep,
}: IDateRangeSelectorProps) {
  if (currentStep !== 5) return null;

  return (
    <>
      {/* STEP 5 */}
      {/* Step Question */}
      <h4 className="text-lg font-medium text-primary">
        {trad[lang].bingeBuddy.steps.step5}
      </h4>

      {/* Answer choices */}
      <PeriodInputs
        lang={lang}
        darkMode={darkMode}
        initialMin={1950}
        initialMax={new Date().getFullYear()}
        min={1950}
        max={new Date().getFullYear()}
      />
    </>
  );
}

export default DateRangeSelector;
