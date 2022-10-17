import { useContext, useState } from "react";
import { Switch } from "@headlessui/react";
import { AppContext } from "../contexts/AppContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function LangToggle() {
  const [enabled, setEnabled] = useState(false);
  const { lang, storeLang } = useContext(AppContext);

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch.Label as="span" className="mr-3">
        <span className="text-sm font-medium text-myWhite">
          {lang === "en" ? "EN" : "FR"}
        </span>
      </Switch.Label>
      <Switch
        checked={enabled}
        onChange={(value) => {
          setEnabled(value);
          storeLang(value ? "en" : "fr");
        }}
        className={classNames(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-myGray transition-colors duration-300 ease-in-out"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            lang === "en"
              ? "translate-x-5 bg-english"
              : "translate-x-0 bg-french",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-cover shadow ring-0 transition duration-300 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}

export default LangToggle;
