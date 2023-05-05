import axios from "axios";
import trad from "../lang/traduction";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { debounce } from "lodash";

interface SignupForm {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialState: SignupForm = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function SignUp() {
  const navigate = useNavigate();
  const { lang, darkMode } = useContext(AppContext);
  const [signupForm, setSignupForm] = useState<SignupForm>(initialState);
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({
    username: trad[lang].signup.usernameRequired,
    email: trad[lang].signup.emailRequired,
    password: trad[lang].signup.passwordRequired,
    passwordConfirm: trad[lang].signup.passwordConfirmRequired,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // HANDLE INPUT CHANGE
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  //  FORM VALIDATION FUNCTION
  const validateField = async (fieldName: keyof SignupForm) => {
    let errorMessage = "";

    switch (fieldName) {
      case "username":
        if (!signupForm.username) {
          errorMessage = "";
        } else if (
          signupForm.username.length < 5 ||
          signupForm.username.length > 16
        ) {
          errorMessage = trad[lang].signup.usernameLength;
        } else {
          try {
            const usernameResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}/users/check-username-availability`,
              { params: { user_name: signupForm.username } }
            );
            if (!usernameResponse.data.available) {
              errorMessage = trad[lang].signup.usernameAlreadyExists;
            }
          } catch (error) {
            console.error(
              "Erreur lors de la vérification du nom d'utilisateur:",
              error
            );
            errorMessage = trad[lang].signup.verificationError;
          }
        }
        break;
      case "email":
        if (!signupForm.email) {
          errorMessage = "";
        } else {
          const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          if (!emailRegex.test(signupForm.email)) {
            errorMessage = "Le format de l'email est incorrect.";
          } else {
            try {
              const emailResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/users/check-email-availability`,
                { params: { email: signupForm.email } }
              );
              if (!emailResponse.data.available) {
                errorMessage = trad[lang].signup.emailAlreadyExists;
              }
            } catch (error) {
              console.error(
                "Erreur lors de la vérification de l'email:",
                error
              );
              errorMessage = trad[lang].signup.verificationError;
            }
          }
        }
        break;
      case "password":
        if (!signupForm.password) {
          errorMessage = "";
        } else {
          const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+[\]{}|;:'",.<>?`~])[A-Za-z\d!@#$%^&*()-_=+[\]{}|;:'",.<>?`~]{8,}$/;

          if (!passwordRegex.test(signupForm.password)) {
            errorMessage = trad[lang].signup.verifyPassword;
          }
        }
        break;
      case "passwordConfirm":
        if (!signupForm.passwordConfirm) {
          errorMessage = "";
        } else if (signupForm.password !== signupForm.passwordConfirm) {
          errorMessage = trad[lang].signup.passwordConfirmError;
        }
        break;
    }

    setValidationMessages({
      ...validationMessages,
      [fieldName]: errorMessage,
    });

    return errorMessage === "";
  };

  // POST DATA
  const postData = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          user_name: signupForm.username,
          email: signupForm.email,
          password: signupForm.password,
        }
      );
      if (data) {
        toast.success(`${trad[lang].toasts.success.signup}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: darkMode ? "dark" : "light",
        });
        navigate("/login");
      } else {
        console.error("Error creating account!");
      }
    } catch (error) {
      console.error(error);
      toast.error(`${trad[lang].toasts.error.signup}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  useEffect(() => {
    const isValidUsername = !validationMessages.username;
    const isValidEmail = !validationMessages.email;
    const isValidPassword = !validationMessages.password;
    const isValidPasswordConfirm = !validationMessages.passwordConfirm;

    setIsFormValid(
      isValidUsername &&
        isValidEmail &&
        isValidPassword &&
        isValidPasswordConfirm
    );
  }, [validationMessages]);

  // HANDLE KEYUP
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLInputElement;
    debouncedValidation(name as keyof SignupForm);
  };

  // Debounced validation function
  const debouncedValidation = debounce((fieldName: keyof SignupForm) => {
    validateField(fieldName);
  }, 300); // Adjust the debounce time (in ms) as needed

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    const isValidUsername = await validateField("username");
    const isValidEmail = await validateField("email");
    const isValidPassword = await validateField("password");
    const isValidPasswordConfirm = await validateField("passwordConfirm");

    if (
      isValidUsername &&
      isValidEmail &&
      isValidPassword &&
      isValidPasswordConfirm
    ) {
      // Post data
      postData();
    }
  };

  return (
    <div
      className={`flex h-screen ${darkMode ? "bg-darkBg" : "bg-myLightGray"}`}
    >
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2
              className={`mt-6 text-3xl font-extrabold ${
                darkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              {trad[lang].signup.title}
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <div className="space-y-6">
                {/* USERNAME */}
                <div>
                  <label
                    htmlFor="username"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {trad[lang].signup.username}
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      id="username"
                      name="username"
                      value={signupForm.username}
                      type="text"
                      autoComplete="username"
                      required
                      minLength={5}
                      maxLength={16}
                      className={`block w-full appearance-none rounded-md border ${
                        darkMode
                          ? "customInput bg-darkQuin text-gray-300 placeholder-gray-300 focus:border-altSecondary"
                          : "border-gray-300 bg-myWhite placeholder-gray-400 focus:border-secondary"
                      }  px-3 py-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm`}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyUp}
                    />
                    {validationMessages.username && (
                      <p
                        className={`mt-1 flex gap-1 text-xs ${
                          signupForm.username ? "text-red-500" : "text-gray-400"
                        }`}
                      >
                        {validationMessages.username}
                      </p>
                    )}
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {trad[lang].signup.email}
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      id="email"
                      name="email"
                      value={signupForm.email}
                      type="email"
                      autoComplete="email"
                      required
                      className={`block w-full appearance-none rounded-md border ${
                        darkMode
                          ? "customInput bg-darkQuin text-gray-300 placeholder-gray-300 focus:border-altSecondary"
                          : "border-gray-300 bg-myWhite placeholder-gray-400 focus:border-secondary"
                      }  px-3 py-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm`}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyUp}
                    />
                    {validationMessages.email && (
                      <p
                        className={`mt-1 flex gap-1 text-xs ${
                          signupForm.email ? "text-red-500" : "text-gray-400"
                        }`}
                      >
                        {validationMessages.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-1">
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
                      value={signupForm.password}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className={`block w-full appearance-none rounded-md border ${
                        darkMode
                          ? "customInput bg-darkQuin text-gray-300 placeholder-gray-300 focus:border-altSecondary"
                          : "border-gray-300 bg-myWhite placeholder-gray-400 focus:border-secondary"
                      }  px-3 py-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm`}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyUp}
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
                    {validationMessages.password && (
                      <p
                        className={`mt-1 flex gap-1 text-xs ${
                          signupForm.password ? "text-red-500" : "text-gray-400"
                        }`}
                      >
                        {validationMessages.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="space-y-1">
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
                      value={signupForm.passwordConfirm}
                      type={showPasswordConfirm ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className={`block w-full appearance-none rounded-md border ${
                        darkMode
                          ? "customInput bg-darkQuin text-gray-300 placeholder-gray-300 focus:border-altSecondary"
                          : "border-gray-300 bg-myWhite placeholder-gray-400 focus:border-secondary"
                      }  px-3 py-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm`}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyUp}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
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
                    {validationMessages.passwordConfirm && (
                      <p
                        className={`mt-1 flex gap-1 text-xs ${
                          signupForm.passwordConfirm
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {validationMessages.passwordConfirm}
                      </p>
                    )}
                  </div>
                </div>

                {/* ALREADY HAVE AN ACCOUNT */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="/login"
                      className={`font-medium hover:text-primary ${
                        darkMode ? " text-altSecondary" : "text-secondary"
                      }`}
                    >
                      {trad[lang].signup.alreadyHaveAnAccount}
                    </a>
                  </div>
                </div>

                {/* SIGN UP BUTTON */}
                <div>
                  <button
                    type="button"
                    disabled={!isFormValid}
                    onClick={() => handleSubmit()}
                    className={`flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm hover:bg-primary focus:outline-none focus:ring-offset-0 ${
                      (darkMode && !isFormValid) || !isFormValid
                        ? "cursor-not-allowed bg-gray-400 text-myWhite hover:bg-gray-400 focus:ring-0"
                        : darkMode
                        ? "cursor-pointer bg-altSecondary text-darkBg hover:bg-primary focus:ring-0"
                        : "cursor-pointer bg-secondary text-myWhite hover:bg-primary focus:ring-0"
                    }`}
                  >
                    {trad[lang].signup.submit}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

export default SignUp;
