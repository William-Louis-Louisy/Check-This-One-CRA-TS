import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ActionPannelMobile({
  link,
  action,
  linkLabel,
  actionLabel,
  linkIcon,
  actionIcon,
  darkMode,
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`flex items-center rounded-full duration-150 hover:text-primary focus:outline-none focus:ring-transparent ${
            darkMode ? "text-altSecondary" : "text-secondary"
          }`}
        >
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
          className={`absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            darkMode ? "bg-darkSec text-gray-300" : "bg-white text-smokyBlack"
          }`}
        >
          <div className="py-1">
            {/* LINK */}
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={link}
                  className={classNames(
                    "flex flex-row items-center gap-3 px-4 py-2 text-sm"
                  )}
                >
                  {linkIcon} {linkLabel}
                </Link>
              )}
            </Menu.Item>

            {/* ACTION */}
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={action}
                  className={classNames(
                    "flex flex-row items-center gap-3 px-4 py-2 text-sm"
                  )}
                >
                  {actionIcon} {actionLabel}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ActionPannelMobile;
