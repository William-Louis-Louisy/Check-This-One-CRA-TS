import _ from "lodash";
import axios from "axios";
import { Link } from "react-router-dom";
import trad from "../../lang/traduction";
import { IBadge } from "../../types/Badges";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

function CreatorDisplayCard({ open, setOpen, creator, lang, darkMode }) {
  const [badges, setBadges] = useState<IBadge[]>();
  const [showBadges, setShowBadges] = useState(false);

  // GET USER BADGES
  const getUserBadges = async () => {
    try {
      if (creator) {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${creator.id}/badges`
        );
        setBadges(data.data.badges);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedGetUserBadges = _.debounce(getUserBadges, 1000);

  useEffect(() => {
    debouncedGetUserBadges();
  }, [creator]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex min-h-screen flex-col items-center justify-end pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={`fixed inset-0 bg-opacity-75 transition-opacity ${
                darkMode ? "bg-gray-900" : "bg-gray-500"
              }`}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`relative inline-block max-h-[95%] w-full transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle ${
                darkMode ? "bg-darkTert" : "bg-myWhite"
              }`}
            >
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* CREATOR CARD */}
              <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg text-center">
                <div className="card flex flex-col p-8">
                  {creator.avatar ? (
                    <img
                      className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover"
                      src={creator.avatar}
                      alt=""
                    />
                  ) : (
                    creator?.user_name && (
                      <div className="mx-auto flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                        <p className="text-center text-6xl text-myWhite">
                          {creator?.user_name[0].toUpperCase()}
                        </p>
                      </div>
                    )
                  )}
                  <div className="card max-h-72 overflow-y-scroll">
                    <h3 className="mt-2 font-bold text-primary">
                      {creator.user_name}
                    </h3>
                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                      <dt className="sr-only">{trad[lang].user.location}</dt>
                      {creator.city && creator.country && (
                        <dd className="">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              darkMode
                                ? "bg-darkSec text-primary"
                                : "bg-orange-50 text-primary"
                            }`}
                          >
                            {creator.city}, {creator.country}
                          </span>
                        </dd>
                      )}

                      <dt className="sr-only">{trad[lang].user.catchline}</dt>
                      {creator.catchline && (
                        <dd
                          className={`mt-3 text-sm italic ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          "{creator.catchline}"
                        </dd>
                      )}

                      <dt className="sr-only">
                        {trad[lang].user.introduction}
                      </dt>
                      {creator.introduction && (
                        <dd
                          className={`mt-3 text-sm italic ${
                            darkMode ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {creator.introduction}
                        </dd>
                      )}

                      <dt
                        className="mt-3 flex cursor-pointer flex-row items-center justify-center gap-2 text-primary"
                        onClick={() => setShowBadges(!showBadges)}
                      >
                        {trad[lang].user.badges}{" "}
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium duration-150 ${
                            darkMode ? "bg-darkSec" : "bg-orange-100"
                          }`}
                        >
                          {badges?.length}
                        </span>
                        {showBadges ? (
                          <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4" />
                        )}
                      </dt>
                      {showBadges &&
                        (badges && badges.length > 0 ? (
                          <dd
                            className={`mt-3 flex flex-row flex-wrap items-start justify-center gap-4 text-sm italic ${
                              darkMode ? "text-gray-300" : "text-gray-500"
                            }`}
                          >
                            {badges.map((badge) => {
                              return (
                                <div
                                  key={`badge-${badge.id}`}
                                  className="flex min-h-full w-[96px] cursor-help flex-col items-center justify-start"
                                  title={
                                    lang === "fr"
                                      ? badge.description
                                      : badge.description_en
                                  }
                                >
                                  <img
                                    className="h-14 w-14 rounded-full object-cover shadow-md"
                                    src={badge.icon}
                                    alt={badge.name_en}
                                  />
                                  <span className="mt-2 text-xs">
                                    {lang === "fr" ? badge.name : badge.name_en}
                                  </span>
                                </div>
                              );
                            })}
                          </dd>
                        ) : (
                          <span
                            className={`mt-2 text-sm italic ${
                              darkMode ? "text-gray-300" : "text-gray-500"
                            }`}
                          >
                            {trad[lang].user.noBadgesUnlockedYet}
                          </span>
                        ))}
                    </dl>
                  </div>
                </div>
                <div>
                  <div className="-mt-px flex">
                    <div className="flex w-0 flex-1">
                      <Link
                        to={`/browseLists/${creator.id}`}
                        onClick={() => setOpen(false)}
                        className={`group relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium duration-150 hover:text-primary ${
                          darkMode ? "text-altSecondary" : "text-secondary"
                        }`}
                      >
                        <span className="ml-3">
                          {trad[lang].labels.seeMyLists}
                        </span>
                        <span
                          className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium duration-150 group-hover:bg-orange-50 group-hover:text-primary ${
                            darkMode
                              ? "bg-darkSec text-altSecondary"
                              : "bg-blue-100 text-secondary"
                          }`}
                        >
                          {creator.publicListsCount}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default CreatorDisplayCard;
