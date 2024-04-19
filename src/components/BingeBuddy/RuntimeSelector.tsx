import { Dispatch, SetStateAction } from "react";
import { IBuddyForm } from "../../contexts/AppContext";
import { runtimes, tv_runtimes } from "../../utils/BingeBuddy";
import trad from "../../lang/traduction";
import AnswerItem from "./AnswerItem";

interface IRuntimeSelectorProps {
  lang: string;
  darkMode: boolean;
  buddyForm: IBuddyForm;
  setBuddyForm: Dispatch<SetStateAction<IBuddyForm>>;
  currentStep: number;
}

function RuntimeSelector({
  lang,
  darkMode,
  buddyForm,
  setBuddyForm,
  currentStep,
}: IRuntimeSelectorProps) {
  const isMovie = currentStep === 6;

  const currentRuntimes = isMovie ? runtimes : tv_runtimes;

  if (currentStep !== 6 && currentStep !== 7) return null;

  return (
    <>
      <h4 className="text-lg font-medium text-primary">
        {trad[lang].bingeBuddy.steps[`step${currentStep}`]}
      </h4>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {currentRuntimes.map((runtime) => (
          <AnswerItem
            key={`${runtime.start_value}-${runtime.end_value}`}
            propertyId={runtime.start_value}
            property={runtime}
            formKey="runtime"
            form={buddyForm}
            setForm={setBuddyForm}
            darkMode={darkMode}
            condition={buddyForm.runtime?.end === runtime.end_value}
            label={runtime[`name_${lang}`]}
          />
        ))}
      </div>
    </>
  );
}

export default RuntimeSelector;
