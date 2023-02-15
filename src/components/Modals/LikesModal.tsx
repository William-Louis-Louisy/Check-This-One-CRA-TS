import { Fragment } from "react";
import trad from "../../lang/traduction";
import { XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

function LikesModal({ likes, lang, open, setOpen, darkMode }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      {likes && (
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex min-h-screen items-center justify-center px-4 py-10 text-center sm:block sm:p-0">
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
                className={`relative inline-block max-h-[60vh] w-full transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle ${
                  darkMode ? "bg-darkTert" : " bg-myWhite"
                }`}
              >
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none  focus:ring-transparent focus:ring-offset-0"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex w-full">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="w-full text-lg font-semibold leading-6 text-primary"
                    >
                      {trad[lang].global.likes}
                    </Dialog.Title>
                    <div
                      className={`mt-6 w-full ${
                        darkMode ? "text-gray-300" : "text-smokyBlack"
                      }`}
                    >
                      <div className="flex w-full flex-row items-center justify-between">
                        <span className="text-medium text-sm uppercase">
                          {trad[lang].global.likedBy}
                        </span>

                        {likes && (
                          <span
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {likes.length} {trad[lang].global.likes}
                          </span>
                        )}
                      </div>
                      <div className="my-2 h-[1px] w-full bg-myGray"></div>
                      <div
                        className={`card mt-3 flex max-h-52 w-full flex-col gap-4 overflow-y-scroll py-2 pr-0 ${
                          darkMode ? "bg-darkQuar" : "bg-myWhite"
                        }`}
                      >
                        {likes.map((like) => (
                          <div
                            key={`userLike-${like.id}`}
                            className="flex w-full flex-row items-center space-x-3 px-2"
                          >
                            {like?.avatar ? (
                              <img
                                className="inline-block h-10 w-10 rounded-full object-cover"
                                src={like.avatar}
                                alt=""
                              />
                            ) : (
                              like?.user_name && (
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                                  <p className="text-center text-xl text-myWhite">
                                    {like?.user_name[0].toUpperCase()}
                                  </p>
                                </div>
                              )
                            )}

                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium sm:text-base">
                                  {like.user_name}
                                </h3>
                                <Link
                                  to={`/browseLists/${like.id}`}
                                  className={`rounded-md px-2 py-1 ${
                                    darkMode
                                      ? "bg-altSecondary text-darkQuar"
                                      : "bg-secondary text-white"
                                  }`}
                                >
                                  {trad[lang].global.seeProfile}
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      )}
    </Transition.Root>
  );
}

export default LikesModal;
