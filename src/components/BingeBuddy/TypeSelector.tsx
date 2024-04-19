import React, { Dispatch, SetStateAction } from "react";
import { FaFilm, FaTv } from "react-icons/fa";
import trad from "../../lang/traduction";
import { IBuddyForm } from "../../contexts/AppContext";
import AnswerItem from "./AnswerItem";

interface ITypeSelectorProps {
  lang: string;
  darkMode: boolean;
  currentStep: number;
  buddyForm: IBuddyForm;
  setBuddyForm: Dispatch<SetStateAction<IBuddyForm>>;
}

function TypeSelector({
  lang,
  darkMode,
  buddyForm,
  currentStep,
  setBuddyForm,
}: ITypeSelectorProps) {
  const types = [
    {
      name: trad[lang].modals.movie,
      icon: FaFilm,
      type: "movie",
      link: "moviesSearch",
    },
    {
      name: trad[lang].modals.tvShow,
      icon: FaTv,
      type: "tv",
      link: "showsSearch",
    },
  ];

  if (currentStep !== 1) return null;

  return (
    <>
      <h4 className="text-lg font-medium text-primary">
        {trad[lang].bingeBuddy.steps.step1}
      </h4>

      {/* Answer choices */}
      <div className="flex flex-row items-center justify-center gap-4">
        {types.map((type) => (
          <AnswerItem
            key={type.type}
            property={type}
            propertyId={type.type}
            label={type.name}
            form={buddyForm}
            setForm={setBuddyForm}
            formKey="type"
            darkMode={darkMode}
            condition={buddyForm.type === type.type}
          />
        ))}
      </div>
    </>
  );
}

export default TypeSelector;
