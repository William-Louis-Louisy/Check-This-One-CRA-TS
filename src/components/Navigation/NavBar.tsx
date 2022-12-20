import Logo from "../Logo";
import LangToggle from "../LangToggle";
import { Link } from "react-router-dom";
import trad from "../../lang/traduction";
import { Fragment, useContext } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { AppContext } from "../../contexts/AppContext";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  const { lang } = useContext(AppContext);
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
                  {/* Current: "border-primary text-gray-900", Default: "border-transparent text-myborder-myGray hover:border-myGray hover:text-myBlack" */}
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-primary px-1 pt-1 text-sm font-medium text-myBlack"
                  >
                    {trad[lang].navbar.home}
                  </Link>
                  <Link
                    to="moviesSearch"
                    className="text-myborder-myGray inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-myGray hover:text-myBlack"
                  >
                    {trad[lang].navbar.movies}
                  </Link>
                  <Link
                    to="showsSearch"
                    className="text-myborder-myGray inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-myGray hover:text-myBlack"
                  >
                    {trad[lang].navbar.tvShows}
                  </Link>
                  <Link
                    to="youtubeSearch"
                    className="text-myborder-myGray inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-myGray hover:text-myBlack"
                  >
                    {trad[lang].navbar.youtube}
                  </Link>
                </div>
              </div>
              {/* <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <SearchIcon
                        className="h-5 w-5 text-myGray"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="placeholder-myGtext-myborder-myGray block w-full rounded-md border border-myGray bg-myWhite py-2 pl-10 pr-3 leading-5 focus:border-secondary focus:placeholder-myGray focus:outline-none focus:ring-1 focus:ring-secondary sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div> */}
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
                <button
                  type="button"
                  className="hover:text-myborder-myGray flex-shrink-0 rounded-full bg-myWhite p-1 text-myGray focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="flex rounded-full bg-myWhite text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://ucarecdn.com/c55e78f8-eccb-4a04-90fc-fa9d00386297/kekw.png"
                        alt=""
                      />
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
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-myWhite py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(
                              active ? "bg-myWhite" : "",
                              "block px-4 py-2 text-sm text-myBlack"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(
                              active ? "bg-myWhite" : "",
                              "block px-4 py-2 text-sm text-myBlack"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(
                              active ? "bg-myWhite" : "",
                              "block px-4 py-2 text-sm text-myBlack"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Language Toggle */}

                <LangToggle />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-primary text-primary", Default: "border-transparent text-myGray hover:bg-myGray hover:border-myGray hover:text-myBlack" */}
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
