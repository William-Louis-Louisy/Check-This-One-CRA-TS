import { Dispatch, SetStateAction } from "react";
import { IBuddyForm } from "../../contexts/AppContext";
import trad from "../../lang/traduction";
import { handleLang } from "../../utils/RequestLanguageHandler";
import useGenres from "../../hooks/useGenres";
import AnswerItem from "./AnswerItem";

interface IGenreSelectorProps {
  lang: string;
  darkMode: boolean;
  currentStep: number;
  buddyForm: IBuddyForm;
  setBuddyForm: Dispatch<SetStateAction<IBuddyForm>>;
}

function GenreSelector({
  lang,
  darkMode,
  buddyForm,
  currentStep,
  setBuddyForm,
}: IGenreSelectorProps) {
  const { genres, isLoading } = useGenres(
    buddyForm.type,
    process.env.REACT_APP_TMDB_API_KEY,
    handleLang
  );

  if (currentStep !== 4) return null;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* STEP 4 */}
      {/* Step Question */}
      <h4 className="text-lg font-medium text-primary">
        {trad[lang].bingeBuddy.steps.step4}
      </h4>

      {/* Answer choices */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {genres?.map((genre) => (
          <AnswerItem
            key={genre.id}
            propertyId={genre.id}
            property={genre.name}
            formKey="genre"
            form={buddyForm}
            setForm={setBuddyForm}
            darkMode={darkMode}
            condition={buddyForm.genre.includes(genre.id)}
            label={genre.name}
          />
        ))}
      </div>
    </>
  );
}

export default GenreSelector;
