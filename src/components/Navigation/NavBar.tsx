import Logo from "../Logo";
import LangToggle from "../LangToggle";
import trad from "../../lang/traduction";
import { Fragment, useContext } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { UserContext } from "../../contexts/UserContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  const location = useLocation();
  const pathname = location.pathname;

  // CONTEXT IMPORTS
  const { lang } = useContext(AppContext);
  const { user, logout } = useContext(UserContext);

  // TABS STATE
  const tabs = [
    { name: trad[lang].navbar.home, link: "/", current: pathname === "/" },
    {
      name: trad[lang].navbar.movies,
      link: "moviesSearch",
      current: pathname === "/moviesSearch",
    },
    {
      name: trad[lang].navbar.tvShows,
      link: "showsSearch",
      current: pathname === "/showsSearch",
    },
    {
      name: trad[lang].navbar.youtube,
      link: "youtubeSearch",
      current: pathname === "/youtubeSearch",
    },
    {
      name: trad[lang].navbar.browseLists,
      link: "browseLists",
      current: pathname === "/browseLists",
    },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow-xl">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Logo />
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {tabs.map((tab, index) => (
                    <Link
                      key={index}
                      to={tab.link}
                      className={classNames(
                        tab.current
                          ? "border-primary text-primary"
                          : "text-myborder-myGray border-transparent hover:border-secondary hover:text-secondary",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium duration-150"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="hover:text-myborder-myGray inline-flex items-center justify-center rounded-md p-2 text-myGray hover:bg-myWhite focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {user?.user_name && (
                  <button
                    type="button"
                    className="hover:text-myborder-myGray flex-shrink-0 rounded-full bg-myWhite p-1 text-myGray focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                )}

                {/* Profile dropdown */}
                {user && user.email !== "" ? (
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-myWhite text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        {user?.avatar ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user?.avatar}
                            alt=""
                          />
                        ) : (
                          user?.user_name && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                              <p className="text-center text-2xl text-white">
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
                      <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-myWhite py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/userProfile"
                              className={classNames(
                                active ? "bg-myWhite" : "",
                                "block px-4 py-2 text-sm text-myBlack"
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
                                active ? "bg-myWhite" : "",
                                "block px-4 py-2 text-sm text-myBlack"
                              )}
                            >
                              {trad[lang].navbar.myLists}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => logout()}
                              className={classNames(
                                active ? "bg-myWhite" : "",
                                "block px-4 py-2 text-sm text-myBlack"
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
                      "block px-4 py-2 text-sm text-myBlack"
                    )}
                  >
                    {trad[lang].navbar.login}
                  </Link>
                )}

                {/* Language Toggle */}

                <LangToggle />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pt-2 pb-3">
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-primary bg-myWhite py-2 pl-3 pr-4 text-base font-medium text-primary"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-myGray hover:border-myGray hover:bg-myGray hover:text-myBlack"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-myGray hover:border-myGray hover:bg-myGray hover:text-myBlack"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-myGray hover:border-myGray hover:bg-myGray hover:text-myBlack"
              >
                Calendar
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-myBlack">
                    Tom Cook
                  </div>
                  <div className="text-myborder-myGray text-sm font-medium">
                    tom@example.com
                  </div>
                </div>
                <button
                  type="button"
                  className="hover:text-myborder-myGray ml-auto flex-shrink-0 rounded-full bg-myWhite p-1 text-myGray focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="text-myborder-myGray block px-4 py-2 text-base font-medium hover:bg-myWhite hover:text-myBlack"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="text-myborder-myGray block px-4 py-2 text-base font-medium hover:bg-myWhite hover:text-myBlack"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="text-myborder-myGray block px-4 py-2 text-base font-medium hover:bg-myWhite hover:text-myBlack"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;
