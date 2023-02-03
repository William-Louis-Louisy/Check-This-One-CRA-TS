import { useContext } from "react";
import trad from "../lang/traduction";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

function Home() {
  const { lang } = useContext(AppContext);
  const { user } = useContext(UserContext);

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-myLightGray">
      {/* Hero section */}
      <div className="relative w-full md:my-16">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0 shadow-2xl">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Cinema theater"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-myWhite">
                  {trad[lang].home.title1}
                </span>
                <span className="block text-primary/75">
                  {trad[lang].home.title2}
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-primary/75 sm:max-w-3xl">
                {trad[lang].home.subtitle}
              </p>
              {!user?.user_name && (
                <div className="mt-8 flex w-full flex-col items-center">
                  <Link
                    to="/signup"
                    className="rounded-md bg-secondary px-4 py-3 text-myWhite"
                  >
                    {trad[lang].home.signUpNow}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    // SAVE THIS FOR LATER

    // <div className="relative flex h-[calc(100vh-64px)] flex-col items-center bg-myLightGray text-myBlack">
    //   <div className="h-1/3 w-full bg-background bg-cover" />
    //   <p className="absolute top-1/3 text-6xl font-smokyBlack text-primary">
    //     HELLO WORLD
    //   </p>
    //   <div className="h-2/3 w-full"></div>
    // </div>
  );
}

export default Home;
