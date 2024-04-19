import trad from "../../lang/traduction";
import { Dispatch, SetStateAction } from "react";
import { languages } from "../../utils/BingeBuddy";
import { IBuddyForm } from "../../contexts/AppContext";
import AnswerItem from "./AnswerItem";

interface ILanguageSelectorProps {
  lang: string;
  darkMode: boolean;
  currentStep: number;
  buddyForm: IBuddyForm;
  setBuddyForm: Dispatch<SetStateAction<IBuddyForm>>;
}

function LanguageSelector({
  lang,
  darkMode,
  buddyForm,
  currentStep,
  setBuddyForm,
}: ILanguageSelectorProps) {
  if (currentStep !== 3) return null;

  return (
    <>
      <h4 className="text-lg font-medium text-primary">
        {trad[lang].bingeBuddy.steps.step3}
      </h4>

      {/* Answer choices */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {languages.map((language) => (
          <AnswerItem
            key={language.value}
            property="language"
            propertyId={language.value}
            label={language[`name_${lang}`]}
            darkMode={darkMode}
            form={buddyForm}
            setForm={setBuddyForm}
            condition={buddyForm.language === language.value}
            formKey="language"
          />
        ))}
      </div>
    </>
  );
}

export default LanguageSelector;
