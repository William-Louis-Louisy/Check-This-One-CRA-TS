import trad from "../../lang/traduction";
import { Dispatch, SetStateAction } from "react";
import { IBuddyForm } from "../../contexts/AppContext";
import useWatchProviders from "../../hooks/useWatchProviders";
import { handleLang } from "../../utils/RequestLanguageHandler";
import { watchRegionsFr } from "../../utils/WatchProviderRegions";
import AnswerItem from "./AnswerItem";

interface IProviderSelectorProps {
  lang: string;
  darkMode: boolean;
  currentStep: number;
  buddyForm: IBuddyForm;
  setBuddyForm: Dispatch<SetStateAction<IBuddyForm>>;
}

function ProviderSelector({
  lang,
  darkMode,
  buddyForm,
  currentStep,
  setBuddyForm,
}: IProviderSelectorProps) {
  const { providers, isLoading } = useWatchProviders(
    buddyForm.type,
    buddyForm.userLocation,
    process.env.REACT_APP_TMDB_API_KEY,
    handleLang
  );

  if (currentStep !== 2) return null;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h4 className="w-full font-medium text-primary md:text-center">
        {trad[lang].bingeBuddy.steps.step2}
      </h4>

      <select
        id="location"
        name="location"
        className={`mt-1 block w-full rounded-md lg:w-1/2 ${
          darkMode ? "bg-darkQuin text-gray-300" : "bg-white text-smokyBlack"
        } border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-0 sm:text-sm`}
        defaultValue={lang === "fr" ? "FR" : "US"}
        onChange={(e) =>
          setBuddyForm({
            ...buddyForm,
            userLocation: e.target.value,
          })
        }
      >
        {watchRegionsFr.map((region) => (
          <option key={region.iso_3166_1} value={region.iso_3166_1}>
            {lang === "fr" ? region.native_name : region.english_name}
          </option>
        ))}
      </select>

      <h4 className="font-medium text-primary">
        {trad[lang].bingeBuddy.steps.step2bis}
      </h4>

      {/* Answer choices */}
      <div className="card flex w-full flex-row gap-4 overflow-y-hidden overflow-x-scroll md:max-h-80 md:flex-wrap md:items-center md:justify-center md:overflow-auto">
        {providers.map((provider) => {
          return (
            <AnswerItem
              key={`provider-${provider.provider_id}`}
              property={provider}
              propertyId={provider.provider_id}
              form={buddyForm}
              setForm={setBuddyForm}
              formKey="watchProvider"
              darkMode={darkMode}
              condition={buddyForm.watchProvider.includes(provider.provider_id)}
              picture={provider.logo_path}
              label={provider.provider_name}
            />
          );
        })}
      </div>
    </>
  );
}

export default ProviderSelector;
