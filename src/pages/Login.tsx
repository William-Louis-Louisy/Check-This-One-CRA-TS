import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import trad from "../lang/traduction";
import { setCsrfToken } from "../utils/csrfToken";

function Login() {
  const navigate = useNavigate();
  const { lang, darkMode } = useContext(AppContext);
  const { storeUser } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // LOGIN
  const login = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email: loginForm.email,
          password: loginForm.password,
        }
      );
      if (data?.user && data?.csrfToken) {
        setCsrfToken(data.csrfToken);
        await storeUser(data.user);
        navigate("/");
        toast.success(`${trad[lang].toasts.success.login}`, {
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
      toast.error(`${trad[lang].toasts.error.login}`, {
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
      className={`${darkMode ? "bg-darkBg" : "bg-myLightGray"} flex h-screen`}
    >
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2
              className={`mt-6 text-3xl font-extrabold ${
                darkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              {trad[lang].login.title}
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {trad[lang].login.email}
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={`block w-full appearance-none rounded-md border ${
                        darkMode
                          ? "customInput bg-darkQuin text-gray-300 placeholder-gray-300 focus:border-darkTert"
                          : "border-gray-300 bg-myWhite placeholder-gray-400 focus:border-myGray"
                      }  px-3 py-2 shadow-sm focus:border-secondary focus:outline-none focus:ring-0 sm:text-sm`}
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {trad[lang].login.password}
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className={`block w-full appearance-none rounded-md border ${
                        darkMode
                          ? "customInput bg-darkQuin text-gray-300 placeholder-gray-300 focus:border-darkTert"
                          : "border-gray-300 bg-myWhite placeholder-gray-400 focus:border-myGray"
                      }  px-3 py-2 shadow-sm focus:border-secondary focus:outline-none focus:ring-0 sm:text-sm`}
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className={`h-4 w-4 rounded ${
                        darkMode ? "bg-darkQuin" : "bg-myWhite"
                      } border-gray-300 text-secondary focus:ring-0`}
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          rememberMe: e.target.checked,
                        })
                      }
                    />
                    <label
                      htmlFor="remember-me"
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-900"
                      } ml-2`}
                    >
                      {trad[lang].login.rememberMe}
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="/signup"
                      className={`block text-sm font-medium underline-offset-4 hover:underline ${
                        darkMode ? "text-altSecondary" : "text-secondary"
                      }`}
                    >
                      {trad[lang].login.dontHaveAnAccount}
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    className={`flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium ${
                      darkMode
                        ? "bg-altSecondary text-darkBg hover:bg-altSecondary focus:ring-altSecondary"
                        : "bg-secondary text-myWhite hover:bg-secondary focus:ring-0"
                    } shadow-sm focus:outline-none  focus:ring-offset-0`}
                    onClick={() => login()}
                  >
                    {trad[lang].login.submit}
                  </button>
                  <Link to="/forgottenPassword">
                    <p
                      className={`mt-2 block text-sm font-medium underline-offset-4 hover:underline ${
                        darkMode ? "text-altSecondary" : "text-secondary"
                      }`}
                    >
                      {trad[lang].login.forgotPassword}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"
          alt="Background"
        />
      </div>
    </div>
  );
}

export default Login;
