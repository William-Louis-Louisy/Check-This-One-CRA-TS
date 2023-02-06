import axios from "axios";
import trad from "../lang/traduction";
import { AppContext } from "../contexts/AppContext";
import { useContext, useState, useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const { lang } = useContext(AppContext);
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // VERIFY USERNAME LENGTH
  function isValidUsername(username: string): boolean {
    return username.length > 1 && username.length < 5;
  }
  const handleUsernameChange = (username: string) => {
    if (isValidUsername(username)) {
      setFormErrors({ ...formErrors, username: true });
    } else {
      setFormErrors({ ...formErrors, username: false });
    }
  };

  // VERIFY EMAIL FORMAT
  function isValidEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleEmailChange = (email: string) => {
    if (email.length > 3 && !isValidEmail(email)) {
      setFormErrors({ ...formErrors, email: true });
    } else {
      setFormErrors({ ...formErrors, email: false });
    }
  };

  // VERIFY PASSWORD LENGTH AND USAGE OF NUMBERS AND AT LEAST A CAPITAL LETTER
  function isValidPassword(password: string): boolean {
    const re = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return re.test(password);
  }
  const handlePasswordChange = (password: string) => {
    if (password.length > 1 && !isValidPassword(password)) {
      setFormErrors({ ...formErrors, password: true });
    } else {
      setFormErrors({ ...formErrors, password: false });
    }
  };

  // VERIFY PASSWORD CONFIRMATION
  function isValidPasswordConfirm(password: string): boolean {
    return password === signupForm.password;
  }
  const handlePasswordConfirmChange = (passwordConfirm: string) => {
    if (
      passwordConfirm.length > 3 &&
      !isValidPasswordConfirm(passwordConfirm)
    ) {
      setFormErrors({ ...formErrors, passwordConfirm: true });
    } else {
      setFormErrors({ ...formErrors, passwordConfirm: false });
    }
  };

  // VERIFY IF ALL FIELDS ARE VALID
  const handleFormValidation = () => {
    if (signupForm.username.length < 5 || signupForm.username.length > 16) {
      setIsFormValid(true);
    }
    if (!isValidEmail(signupForm.email)) {
      setIsFormValid(true);
    }
    if (!isValidPassword(signupForm.password)) {
      setIsFormValid(true);
    }
    if (!isValidPasswordConfirm(signupForm.passwordConfirm)) {
      setIsFormValid(true);
    }
  };

  useEffect(() => {
    handleFormValidation();
  }, [signupForm]);

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
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        navigate("/login");
      } else {
        console.error("Error creating account!");
      }
    } catch (error) {
      console.error(error);
      toast.error(`${trad[lang].toasts.error.signup}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
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
                    className="block text-sm font-medium text-gray-700"
                  >
                    {trad[lang].signup.username}
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      minLength={5}
                      maxLength={16}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          username: e.target.value,
                        })
                      }
                      onBlur={() => handleUsernameChange(signupForm.username)}
                    />
                    {formErrors.username && (
                      <div className="pointer-events-none absolute top-2.5 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    {formErrors.username && (
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="username-error"
                      >
                        {trad[lang].signup.usernameLength}
                      </p>
                    )}
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {trad[lang].signup.email}
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          email: e.target.value,
                        })
                      }
                      onBlur={() => handleEmailChange(signupForm.email)}
                    />
                    {formErrors.email && (
                      <div className="pointer-events-none absolute top-2.5 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    {formErrors.email && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {trad[lang].signup.verifyEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {trad[lang].signup.password}
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          password: e.target.value,
                        })
                      }
                      onBlur={() => handlePasswordChange(signupForm.password)}
                    />
                    {formErrors.password && (
                      <div className="pointer-events-none absolute top-2.5 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    {formErrors.password && (
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="password-error"
                      >
                        {trad[lang].signup.verifyPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="space-y-1">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {trad[lang].signup.confirmPassword}
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          passwordConfirm: e.target.value,
                        })
                      }
                      onBlur={() =>
                        handlePasswordConfirmChange(signupForm.passwordConfirm)
                      }
                    />
                    {formErrors.passwordConfirm && (
                      <div className="pointer-events-none absolute top-2.5 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    {formErrors.passwordConfirm && (
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="password-error"
                      >
                        {trad[lang].signup.verifyPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* ALREADY HAVE AN ACCOUNT */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="/login"
                      className="font-medium text-secondary hover:text-secondary"
                    >
                      {trad[lang].signup.alreadyHaveAnAccount}
                    </a>
                  </div>
                </div>

                {/* SIGN UP BUTTON */}
                <div>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    onClick={() => postData()}
                    className={`${
                      !isFormValid
                        ? "cursor-not-allowed bg-gray-200 text-myBlack focus:ring-gray-200"
                        : "bg-secondary text-myWhite hover:bg-secondary focus:ring-secondary"
                    }, flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
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
