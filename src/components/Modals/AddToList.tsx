import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ClipboardListIcon } from "@heroicons/react/outline";
import trad from "../../lang/traduction";

function AddToList({ open, setOpen, contentToList, contentTitle, lang }) {
  const cancelButtonRef = useRef(null);

  const lists = [
    {
      id: 1,
      name: "My List",
    },
    {
      id: 2,
      name: "My List 2",
    },
    {
      id: 3,
      name: "My List 3",
    },
    {
      id: 4,
      name: "My List 4",
    },
    {
      id: 5,
      name: "My List 5",
    },
    {
      id: 6,
      name: "My List 6",
    },
    {
      id: 7,
      name: "My List 7",
    },
    {
      id: 8,
      name: "My List 8",
    },
    {
      id: 9,
      name: "My List 9",
    },
    {
      id: 10,
      name: "My List 10",
    },
    {
      id: 11,
      name: "My List 11",
    },
    {
      id: 12,
      name: "My List 12",
    },
  ];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
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
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <ClipboardListIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {trad[lang].modals.add} : {contentTitle}
                  </Dialog.Title>
                  <div className="my-4 h-[1px] w-full bg-gray-200"></div>
                  <div className="mt-2">
                    <fieldset>
                      <legend className="w-full text-left text-lg font-medium text-gray-900">
                        {trad[lang].modals.lists} :
                      </legend>
                      <div className="card mt-4 max-h-[208px] divide-y divide-gray-200 overflow-y-scroll border-t border-b border-gray-200">
                        {lists.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="relative flex items-start py-4 "
                          >
                            <div className="min-w-0 flex-1 text-sm">
                              <label
                                htmlFor={`item-${item.id}`}
                                className="select-none font-medium text-gray-700"
                              >
                                {item.name}
                              </label>
                            </div>
                            <div className="ml-3 flex h-5 items-center">
                              <input
                                id={`item-${item.id}`}
                                name={`item-${item.id}`}
                                type="checkbox"
                                className="mr-4 h-4 w-4 rounded border-secondary text-primary focus:ring-primary"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  {trad[lang].modals.add}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  {trad[lang].modals.cancel}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddToList;
