import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import trad from "../lang/traduction";

function Error404() {
  const { lang } = useContext(AppContext);
  return (
    <div
      className="h-screen bg-cover bg-top py-16 sm:bg-top"
      style={{
        backgroundImage:
          'url("https://ucarecdn.com/7d432c76-2ac4-4f37-8964-643115529778/danieljensenUDleHDOhBZ8unsplash.jpg")',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p className="text-sm font-semibold uppercase tracking-wide text-smokyBlack text-opacity-50">
          {trad[lang].global.errorFourOFour}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          {trad[lang].global.youreLost}
        </h1>
        <p className="mt-2 text-lg font-medium text-smokyBlack text-opacity-50">
          {trad[lang].global.errorFourOFourMessage}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-myWhite duration-150 sm:hover:bg-primary"
          >
            {trad[lang].global.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error404;
