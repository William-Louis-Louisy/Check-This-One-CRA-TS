import { FaTv, FaYoutube, FaFilm, FaPodcast } from "react-icons/fa";
import trad from "../../lang/traduction";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

function ContentTypeSelect({ open, setOpen, darkMode, lang, setOpenNewList }) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    setOpen(false);
    navigate(`/${type.link}`);
  };

  const types = [
    {
      name: trad[lang].modals.movie,
      icon: FaFilm,
      type: "movie",
      link: "moviesSearch",
    },
    {
      name: trad[lang].modals.tvShow,
      icon: FaTv,
      type: "tv",
      link: "showsSearch",
    },
    {
      name: trad[lang].modals.youtube,
      icon: FaYoutube,
      type: "youtube",
      link: "youtubeSearch",
    },
    {
      name: trad[lang].modals.podcast,
      icon: FaPodcast,
      type: "podcast",
      link: "podcastsSearch",
    },
  ];

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onClose}
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
              className={`relative mt-16 inline-block max-h-[95%] w-full transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6 sm:align-middle ${
                darkMode ? "bg-darkTert" : "bg-myWhite"
              }`}
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className={`font-medium leading-6 text-primary sm:text-lg`}
                  >
                    {trad[lang].modals.whatTypeOfContent}
                  </Dialog.Title>

                  {/* Description */}
                  <p
                    className={`mt-8 text-sm ${
                      darkMode ? "text-gray-300" : "text-smokyBlack"
                    }`}
                  >
                    {trad[lang].modals.selectType}
                  </p>

                  {/* Content */}
                  <div className="my-6 mx-auto grid h-fit w-fit grid-cols-2 grid-rows-2 content-center justify-center gap-4 sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
                    {types.map((type) => (
                      <div
                        key={type.type}
                        onClick={() => handleNavigation(type)}
                        className={`m-0 flex aspect-square w-24 cursor-pointer flex-col items-center justify-around gap-1 rounded-md border-4 border-transparent p-4 font-bold duration-150 hover:border-primary ${
                          darkMode
                            ? "bg-altSecondary text-darkQuin"
                            : "bg-secondary text-myWhite"
                        }`}
                      >
                        <type.icon className="h-7 w-7" />
                        <p>{type.name}</p>
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  <div
                    className={`text-sm italic ${
                      darkMode ? "text-gray-400" : "text-smokyBlack"
                    }`}
                  >
                    {/* Mobile */}
                    <p className="flex lg:hidden">
                      *{trad[lang].modals.typeInfoMobile}
                    </p>

                    {/* Desktop */}
                    <p className="hidden lg:flex">
                      *{trad[lang].modals.typeInfo}
                    </p>
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

export default ContentTypeSelect;
