import React from "react";
import { IBuddyForm } from "../../contexts/AppContext";

interface IAnswerItemProps {
  property: any;
  propertyId: any;
  label: string;
  darkMode: boolean;
  form: IBuddyForm;
  formKey: string;
  setForm: React.Dispatch<React.SetStateAction<IBuddyForm>>;
  picture?: string;
  condition: boolean;
}

function AnswerItem({
  property,
  propertyId,
  label,
  darkMode,
  form,
  setForm,
  picture,
  condition,
  formKey,
}: IAnswerItemProps) {
  // Handle providers selection
  const handleProviders = () => {
    const newProviders = form.watchProvider.includes(propertyId)
      ? form.watchProvider.filter((p) => p !== propertyId)
      : [...form.watchProvider, propertyId];

    setForm({
      ...form,
      watchProvider: newProviders,
    });
  };

  // Handle genres selection
  const handleGenres = () => {
    const newGenres = form.genre.includes(propertyId)
      ? form.genre.filter((g) => g !== propertyId)
      : [...form.genre, propertyId];

    setForm({
      ...form,
      genre: newGenres,
    });
  };

  // Handle selected answer
  const handleAnswer = () => {
    if (formKey === "watchProvider") {
      handleProviders();
    } else if (formKey === "genre") {
      handleGenres();
    } else if (formKey === "runtime") {
      // Add more conditions here
      setForm({
        ...form,
        runtime: {
          start: property.start_value,
          end: property.end_value,
        },
      });
    } else {
      setForm({
        ...form,
        [formKey]: propertyId,
      });
    }
  };

  return (
    <div
      onClick={handleAnswer}
      className={`flex aspect-square cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-md p-4 text-center text-sm ${
        !picture ? "h-24 w-24" : "h-32 w-32"
      } ${
        condition
          ? darkMode
            ? "shadow-selected bg-darkSec text-primary"
            : "bg-myLightGray text-primary"
          : darkMode
          ? "bg-darkSec text-altSecondary"
          : "bg-myLightGray text-secondary"
      }`}
    >
      {picture && (
        <img
          key={`provider-${propertyId}`}
          src={"https://image.tmdb.org/t/p/w500" + picture}
          className={`h-10 rounded-md ${
            condition && "border-2 border-primary"
          }`}
          alt={property.provider_name}
        />
      )}
      {property.icon && <property.icon className="h-5 w-5 lg:h-7 lg:w-7" />}
      <p>{label}</p>
    </div>
  );
}

export default AnswerItem;
