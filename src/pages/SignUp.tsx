import trad from "../lang/traduction";
import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

function SignUp() {
  const { lang } = useContext(AppContext);
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

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
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          username: e.target.value,
                        })
                      }
                    />
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
                  <div className="mt-1">
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
                    />
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
                  <div className="mt-1">
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
                    />
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
                    />
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
                    className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
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
