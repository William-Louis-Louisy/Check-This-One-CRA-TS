import axios from "axios";
import { useContext } from "react";
import trad from "../lang/traduction";
import { useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import { notifTypeToIcon } from "../utils/TypeToIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Notifications() {
  // GET USER ID FROM PARAMS
  const userId = useParams();

  // GET LANG FROM CONTEXT
  const { lang, darkMode } = useContext(AppContext);

  // GET USER FROM CONTEXT
  const { notifications, getUserNotifications } = useContext(UserContext);

  // UPDATE NOTIFICATION
  const updateNotification = async (id: number) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/${userId.id}/notification/${id}}`
      );
      if (res.status === 200) {
        console.log("updated");
      }
    } catch (error) {
      console.error(error);
    } finally {
      getUserNotifications();
    }
  };

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } pt-16`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="mt-8 w-full border-b border-primary px-4 pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%] lg:px-0">
        {/* TITLE */}
        <h3 className="text-lg font-medium leading-6 text-primary">
          {trad[lang].pageTitles.notifications}
        </h3>
      </div>

      <div className="w-full lg:w-[70%]">
        {/*----- NOTIFICATIONS -----*/}
        {notifications && notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              onClick={() => updateNotification(notif.id)}
              key={`notif-${notif.id}`}
              className="w-full"
            >
              <div
                className={classNames(
                  darkMode && !notif.seen
                    ? "font-light text-gray-400 hover:bg-darkTert"
                    : darkMode && notif.seen
                    ? "font-medium text-gray-300 hover:bg-darkTert"
                    : notif.seen
                    ? "font-medium text-gray-900 hover:bg-gray-50"
                    : "font-light text-gray-500 hover:bg-gray-50",
                  "flex w-full cursor-pointer flex-row items-center justify-between px-4 py-5 text-sm duration-150"
                )}
              >
                <div className="flex w-full flex-row items-center">
                  <div className="flex h-10 w-10 items-center justify-center">
                    {notifTypeToIcon(notif.type)}
                  </div>
                  <div className="max-w-[calc(100%-80px)]">
                    {lang === "fr" ? notif.message : notif.message_en}
                  </div>
                </div>

                {!notif.seen && (
                  <span
                    className={`rounded-full p-1 ${
                      darkMode ? "bg-altSecondary" : "bg-secondary"
                    }`}
                  ></span>
                )}
              </div>
            </div>
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
    </div>
  );
}

export default Notifications;
