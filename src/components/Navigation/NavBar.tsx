import {
  FaTv,
  FaYoutube,
  FaFilm,
  FaPodcast,
  FaList,
  FaHome,
  FaSignInAlt,
} from "react-icons/fa";
import Logo from "../Logo";
import LangToggle from "../LangToggle";
import trad from "../../lang/traduction";
import { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { UserContext } from "../../contexts/UserContext";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import DarkModeToggle from "../Common/DarkModeToggle";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  const location = useLocation();
  const pathname = location.pathname;

  // CONTEXT IMPORTS
  const { lang, darkMode } = useContext(AppContext);
  const { user, logout } = useContext(UserContext);

  // TABS STATE
  const tabs = [
    {
      name: trad[lang].navbar.home,
      link: "/",
      current: pathname === "/",
      icon: <FaHome className="mr-2 h-4 w-4" />,
    },
    {
      name: trad[lang].navbar.movies,
      link: "moviesSearch",
      current: pathname === "/moviesSearch",
      icon: <FaFilm className="mr-2 h-4 w-4" />,
    },
    {
      name: trad[lang].navbar.tvShows,
      link: "showsSearch",
      current: pathname === "/showsSearch",
      icon: <FaTv className="mr-2 h-4 w-4" />,
    },
    {
      name: trad[lang].navbar.youtube,
      link: "youtubeSearch",
      current: pathname === "/youtubeSearch",
      icon: <FaYoutube className="mr-2 h-4 w-4" />,
    },
    // {
    //   name: trad[lang].navbar.podcasts,
    //   link: "podcastsSearch",
    //   current: pathname === "/podcastsSearch",
    //   icon: <FaPodcast className="mr-2 h-4 w-4" />,
    // },
    {
      name: trad[lang].navbar.browseLists,
      link: "browseLists",
      current: pathname === "/browseLists",
      icon: <FaList className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <Disclosure
      as="nav"
      className={`fixed z-[50] w-full ${
        darkMode ? "bg-darkTert" : "bg-myWhite"
      } shadow-xl`}
    >
      {({ open }) => (
        <>
          <div className="flex flex-row items-center justify-between px-2 sm:px-4 md:justify-center lg:px-8">
            <div className="flex h-16 w-full justify-between md:w-4/5">
              <div className="flex px-2 lg:px-0">
                <Link to="/" className="flex flex-shrink-0 items-center">
                  <Logo />
                </Link>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {tabs.map((tab, index) => (
                    <Link
                      key={index}
                      to={tab.link}
                      className={classNames(
                        tab.current
                          ? "border-primary text-primary hover:border-primary hover:text-primary"
                          : "border-transparent",
                        darkMode && !tab.current
                          ? "text-altSecondary hover:border-altSecondary hover:text-altSecondary"
                          : "border-transparent text-secondary hover:border-secondary hover:text-secondary",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium duration-150"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.icon} {tab.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="items-center justify-center rounded-md p-2 text-myGray hover:inline-flex focus:outline-none focus:ring-inset focus:ring-transparent">
                  <span className="sr-only">
                    {trad[lang].navbar.openMainMenu}
                  </span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {/* {user?.user_name && (
                  <button
                    type="button"
                    className="hover:flex-shrink-0 rounded-full bg-myWhite p-1 text-myGray focus:outline-none  focus:ring-0 focus:ring-offset-0"
                  >
                    <span className="sr-only">
                      {trad[lang].navbar.viewNotifications}
                    </span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                )} */}

                {/* Profile dropdown */}
                {user && user.email !== "" ? (
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-myWhite text-sm focus:outline-none  focus:ring-0 focus:ring-offset-0">
                        <span className="sr-only">
                          {trad[lang].navbar.openUserMenu}
                        </span>
                        {user?.avatar ? (
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={user?.avatar}
                            alt=""
                          />
                        ) : (
                          user?.user_name && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                              <p className="text-center text-2xl text-myWhite">
                                {user?.user_name[0].toUpperCase()}
                              </p>
                            </div>
                          )
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className={`absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md ${
                          darkMode ? "bg-darkTert" : "bg-myWhite"
                        } py-1 shadow-lg ring-1 ring-smokyBlack ring-opacity-5 focus:outline-none`}
                      >
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/userProfile"
                              className={classNames(
                                darkMode ? "text-gray-300" : "text-myBlack",
                                "block px-4 py-2 text-sm hover:text-primary"
                              )}
                            >
                              {trad[lang].navbar.myProfile}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/userLists"
                              className={classNames(
                                darkMode ? "text-gray-300" : "text-myBlack",
                                "block px-4 py-2 text-sm hover:text-primary"
                              )}
                            >
                              {trad[lang].navbar.myLists}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/userLikedLists"
                              className={classNames(
                                darkMode ? "text-gray-300" : "text-myBlack",
                                "block px-4 py-2 text-sm hover:text-primary"
                              )}
                            >
                              {trad[lang].navbar.userLikedLists}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => logout()}
                              className={classNames(
                                darkMode ? "text-gray-300" : "text-myBlack",
                                "block px-4 py-2 text-sm hover:text-primary"
                              )}
                            >
                              {trad[lang].navbar.logout}
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    to="/login"
                    className={classNames(
                      darkMode ? "text-altSecondary" : "text-secondary",
                      "block px-4 py-2 text-sm underline-offset-4 hover:underline"
                    )}
                  >
                    {trad[lang].navbar.login}
                  </Link>
                )}

                {/* Language Toggle */}
                <LangToggle />

                {/* Theme Toggle */}
                <DarkModeToggle />
              </div>
            </div>
          </div>

          {/* MOBILE - MAIN MENU */}
          <Disclosure.Panel
            className={`absolute z-50 h-screen w-full lg:hidden ${
              darkMode ? "bg-darkTert" : "bg-myWhite"
            }`}
          >
            {/* MOBILE - NAVIGATION */}
            <div className="space-y-1 pt-2 pb-3">
              <Disclosure.Button
                as="a"
                href="/"
                className={classNames(
                  pathname === "/"
                    ? "border-primary text-primary"
                    : "border-transparent text-myGray",
                  "flex flex-row items-center border-l-4 py-4 pl-3 pr-4 text-base font-medium"
                )}
              >
                <FaHome className="mr-2 h-4 w-4" /> {trad[lang].navbar.home}
              </Disclosure.Button>
              {tabs.slice(1).map((t, i) => (
                <Disclosure.Button
                  as="a"
                  key={i}
                  href={`/${t.link}`}
                  className={classNames(
                    t.current
                      ? "border-primary text-primary"
                      : "border-transparent text-myGray",
                    "flex flex-row items-center border-l-4 py-4 pl-3 pr-4 text-base font-medium"
                  )}
                >
                  {t.icon} {t.name}
                </Disclosure.Button>
              ))}
            </div>

            {/* MOBILE - USER MENU */}
            {user && user?.user_name && user?.id ? (
              <div
                className={`border-t border-myGray pt-4 pb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                <div className="flex items-center px-4">
                  {/* Username and Avatar */}
                  <Disclosure.Button
                    as="a"
                    href="/userProfile"
                    className="flex flex-row items-center text-base font-medium"
                  >
                    <div className="flex-shrink-0">
                      {user?.avatar ? (
                        <img
                          className="h-6 w-6 rounded-full object-cover"
                          src={user?.avatar}
                          alt=""
                        />
                      ) : (
                        user?.user_name && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
                            <p className="text-center text-xl text-myWhite">
                              {user?.user_name[0].toUpperCase()}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium">
                        {user?.user_name}
                      </div>
                    </div>
                  </Disclosure.Button>

                  {/* Notification Bell */}
                  {/* <button
                    type="button"
                    className="hover:ml-auto flex-shrink-0 rounded-full bg-myWhite p-1 text-myGray focus:outline-none  focus:ring-0 focus:ring-offset-0"
                  >
                    <span className="sr-only">
                      {trad[lang].navbar.viewNotifications}
                    </span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="/userLists"
                    className="block px-4 py-2 text-base font-medium"
                  >
                    {trad[lang].navbar.myLists}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/userLikedLists"
                    className="block px-4 py-2 text-base font-medium"
                  >
                    {trad[lang].navbar.userLikedLists}
                  </Disclosure.Button>
                  <Disclosure.Button
                    className="block px-4 py-2 text-base font-medium"
                    onClick={() => logout()}
                  >
                    {trad[lang].navbar.logout}
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 pb-3">
                <Disclosure.Button
                  as="a"
                  href="/login"
                  className={`flex flex-row items-center px-4 py-2 text-base font-medium ${
                    darkMode ? "text-altSecondary" : "text-secondary"
                  }`}
                >
                  <FaSignInAlt className="mr-2 h-4 w-4" />
                  {trad[lang].navbar.login}
                </Disclosure.Button>
              </div>
            )}
            {/* Language Toggle */}
            <div className="mt-6 flex w-full flex-row items-center justify-end gap-3 pr-5">
              <LangToggle />
              <DarkModeToggle />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;
