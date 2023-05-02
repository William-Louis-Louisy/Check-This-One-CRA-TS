import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import trad from "../lang/traduction";
import { AppContext } from "../contexts/AppContext";
import { ExclamationIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

function ResetPassword() {
  const { lang, darkMode } = useContext(AppContext);
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const resetPassword = async () => {
    // Check password format
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage(trad[lang].signup.verifyPassword);
      return;
    }

    // Check if password and passwordConfirm are the same
    if (password !== passwordConfirm) {
      setMessage(trad[lang].signup.passwordConfirmError);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset-password/confirm`,
        {
          token: token,
          password: password,
        }
      );

      setMessage(trad[lang].toasts.success.passwordReset);
    } catch (error) {
      setMessage(trad[lang].toasts.error.passwordResetError);
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } flex h-screen flex-col items-center justify-center`}
    >
      <div className="flex flex-col items-start gap-4 px-4 lg:w-1/3">
        {/* Title */}
        <h1 className="mb-8 text-3xl font-bold text-primary">
          {trad[lang].pageTitles.resetPassword}
        </h1>

        {/* Form */}
        <div className="flex w-full flex-col items-center gap-4">
          {/* Input */}
          <div className="relative mt-1 flex w-full flex-col items-start gap-4 rounded-md shadow-sm">
            {/* PASSWORD */}
            <div className="w-full space-y-1">
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {trad[lang].signup.password}
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder={trad[lang].placeholders.enterNewPassword}
                  required
                  className={`block w-full appearance-none rounded-md border ${
                    darkMode
                      ? "customInput bg-darkQuin text-gray-300 placeholder-gray-300 focus:border-altSecondary"
                      : "border-gray-300 bg-myWhite placeholder-gray-400 focus:border-secondary"
                  }  px-3 py-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-2 top-[19px] inline-flex -translate-y-1/2 items-center rounded-full p-1 duration-150 hover:text-primary ${
                    darkMode
                      ? "bg-darkQuin text-altSecondary"
                      : "bg-myWhite text-secondary"
                  }`}
                >
                  {showPassword ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="w-full space-y-1">
              <label
                htmlFor="confirm-password"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {trad[lang].signup.confirmPassword}
              </label>
              <div className="relative mt-1">
                <input
                  id="confirm-password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  type={showPasswordConfirm ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder={trad[lang].placeholders.confirmNewPassword}
                  required
                  className={`block w-full appearance-none rounded-md border ${
                    darkMode
                      ? "customInput bg-darkQuin text-gray-300 placeholder-gray-300 focus:border-altSecondary"
                      : "border-gray-300 bg-myWhite placeholder-gray-400 focus:border-secondary"
                  }  px-3 py-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm`}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className={`absolute right-2 top-[19px] inline-flex -translate-y-1/2 items-center rounded-full p-1 duration-150 hover:text-primary ${
                    darkMode
                      ? "bg-darkQuin text-altSecondary"
                      : "bg-myWhite text-secondary"
                  }`}
                >
                  {showPasswordConfirm ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={resetPassword}
            className={`flex justify-center rounded-md border border-transparent py-2 px-8 text-sm font-medium ${
              darkMode
                ? "bg-altSecondary text-darkBg hover:bg-altSecondary focus:ring-altSecondary"
                : "bg-secondary text-myWhite hover:bg-secondary focus:ring-0"
            } max-w-[120px] shadow-sm focus:outline-none focus:ring-offset-0`}
          >
            {trad[lang].global.send}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`w-full rounded-md p-4 ${
              darkMode
                ? "bg-darkQuar text-yellow-400"
                : "bg-myWhite text-yellow-600"
            }`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium0 text-sm">{message}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
