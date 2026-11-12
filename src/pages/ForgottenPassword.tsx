import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { MailIcon } from "@heroicons/react/outline";
import trad from "../lang/traduction";
import axios from "axios";
import { toast } from "react-toastify";

function ForgottenPassword() {
  const { lang, darkMode } = useContext(AppContext);

  const [mail, setMail] = useState("");

  const sendResetMail = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset-password`,
        {
          email: mail,
          lang: lang,
        }
      );
      if (response) {
        toast.success(`${trad[lang].toasts.success.emailSent}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: darkMode ? "dark" : "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`${trad[lang].toasts.error.emailSentError}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } flex h-screen flex-col items-center justify-center`}
    >
      <div className="flex flex-col items-start gap-4 px-4">
        {/* Title */}
        <h1 className="mb-16 text-3xl font-bold text-primary">
          {trad[lang].login.forgotPassword}
        </h1>

        {/* Decription */}
        <p
          className={`max-w-[456px] text-sm font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {trad[lang].login.passwordReset}
        </p>

        {/* Form */}
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
          {/* Input */}
          <div className="relative mt-1 w-full rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className={`block w-full appearance-none rounded-md border ${
                darkMode
                  ? "customInput bg-darkQuin text-gray-300 placeholder-gray-300 focus:border-darkTert"
                  : "border-gray-300 bg-myWhite placeholder-gray-400 focus:border-myGray"
              }  py-2 pl-10 pr-3 shadow-sm focus:border-secondary focus:outline-none focus:ring-0 sm:max-w-xs sm:text-sm`}
              placeholder={trad[lang].placeholders.enterYourMail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={sendResetMail}
            className={`flex justify-center rounded-md border border-transparent py-2 px-8 text-sm font-medium ${
              darkMode
                ? "bg-altSecondary text-darkBg hover:bg-altSecondary focus:ring-altSecondary"
                : "bg-secondary text-myWhite hover:bg-secondary focus:ring-0"
            } max-w-[120px] shadow-sm focus:outline-none focus:ring-offset-0`}
          >
            {trad[lang].global.send}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgottenPassword;
