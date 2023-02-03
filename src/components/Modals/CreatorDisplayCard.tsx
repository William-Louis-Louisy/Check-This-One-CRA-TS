import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import trad from "../../lang/traduction";
import { Link } from "react-router-dom";

function CreatorDisplayCard({ open, setOpen, creator, lang }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-myWhite px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-myWhite text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* CREATOR CARD */}
              <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-myWhite text-center">
                <div className="flex flex-1 flex-col p-8">
                  <img
                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                    src={creator.avatar}
                    alt=""
                  />
                  <h3 className="mt-2 font-bold text-primary">
                    {creator.user_name}
                  </h3>
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">{trad[lang].user.location}</dt>
                    <dd className="">
                      <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-primary">
                        {creator.city}, {creator.country}
                      </span>
                    </dd>
                    <dt className="sr-only">{trad[lang].user.catchline}</dt>
                    <dd className="mt-3 text-sm italic text-gray-600">
                      "{creator.catchline}"
                    </dd>

                    <dt className="sr-only">{trad[lang].user.introduction}</dt>
                    <dd className="mt-3 text-sm text-gray-500">
                      {creator.introduction}
                    </dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex">
                    <div className="flex w-0 flex-1">
                      <Link
                        to={`/browseLists/${creator.id}`}
                        onClick={() => setOpen(false)}
                        className="group relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-secondary duration-150 hover:text-primary"
                      >
                        <span className="ml-3">
                          {trad[lang].labels.seeMyLists}
                        </span>
                        <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-secondary duration-150 group-hover:bg-orange-50 group-hover:text-primary">
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
