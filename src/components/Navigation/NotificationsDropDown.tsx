import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { UserContext } from "../../contexts/UserContext";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import trad from "../../lang/traduction";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NotificationsDropDown() {
  const { notifications, user, getUserNotifications } = useContext(UserContext);
  const { lang, darkMode } = useContext(AppContext);

  // UPDATE NOTIFICATION
  const updateNotification = async (id: number) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/${user.id}/notification/${id}}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      getUserNotifications();
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="relative flex h-7 w-7 items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-gray-100">
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {notifications && notifications.length > 0 && (
            <span className="absolute bottom-0 right-1 rounded-full bg-red-600 p-1 text-center"></span>
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
          className={`absolute right-0 mt-2 w-80 origin-top-right rounded-md shadow-lg ring-0 ring-opacity-5 focus:outline-none md:w-80 ${
            darkMode ? "bg-darkTert" : "bg-myWhite"
          }`}
        >
          <div className="w-full">
            <div
              className={`w-full border-b border-primary px-4 py-2 text-sm text-primary`}
            >
              Notifications :
            </div>
            {notifications && notifications.length > 0 ? (
              notifications.map((notif) => (
                <Menu.Item key={`notif-${notif.id}`}>
                  <div
                    onClick={() => updateNotification(notif.id)}
                    className={classNames(
                      darkMode && !notif.seen
                        ? "font-light text-gray-400"
                        : darkMode && notif.seen
                        ? "font-medium text-gray-300"
                        : notif.seen
                        ? "font-medium text-gray-900"
                        : "font-light text-gray-500",
                      "flex cursor-pointer flex-row items-center justify-between px-4 py-4 text-sm"
                    )}
                  >
                    {lang === "fr" ? notif.message : notif.message_en}
                    {!notif.seen && (
                      <span
                        className={`rounded-full p-1 ${
                          darkMode ? "bg-altSecondary" : "bg-secondary"
                        }`}
                      ></span>
                    )}
                  </div>
                </Menu.Item>
              ))
            ) : (
              <div
                className={`flex w-full flex-row items-center justify-center px-4 py-4 text-center text-sm italic ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {trad[lang].user.noNotifications}
              </div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default NotificationsDropDown;
