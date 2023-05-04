import trad from "../../lang/traduction";
import { RiMedalLine } from "react-icons/ri";
import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Widget } from "@uploadcare/react-widget";
import { IBadge } from "../../types/Badges";

const defaultBadgeForm: IBadge = {
  icon: "",
  name: "",
  name_en: "",
  description: "",
  description_en: "",
};

function BadgeCreation({
  lang,
  darkMode,
  open,
  setOpen,
}: {
  lang: string;
  darkMode: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const cancelButtonRef = useRef(null);
  const [badgeForm, setBadgeForm] = useState(defaultBadgeForm);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
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
              <div>
                <div className="mx-auto hidden h-12 w-12 items-center justify-center rounded-full bg-primary sm:flex">
                  <RiMedalLine
                    className={`h-6 w-6 ${
                      darkMode ? "text-darkQuin" : "text-myWhite"
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={`mt-3 text-center sm:mt-5 ${
                    darkMode ? "text-gray-300" : "text-gray-900"
                  }`}
                >
                  <Dialog.Title
                    as="h3"
                    className={`font-medium leading-6 sm:text-lg`}
                  >
                    {trad[lang].labels.badgeCreation}
                  </Dialog.Title>

                  <div className="my-4 flex w-full flex-col items-end gap-2">
                    {/* ICON */}
                    <div className="w-full sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="photo"
                        className="block text-left text-sm font-medium"
                      >
                        {trad[lang].labels.icon}
                      </label>
                      <div className="avatarUpload mt-1 sm:col-span-2 sm:mt-0">
                        <Widget
                          tabs="file url"
                          imagesOnly={true}
                          multiple={false}
                          locale={lang === "fr" ? "fr" : "en"}
                          publicKey={
                            process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY
                          }
                          onChange={(file: any) => {
                            setBadgeForm({
                              ...badgeForm,
                              icon: file.cdnUrl,
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* NAME */}
                    <div className="w-full sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="name"
                        className="block text-left text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        {trad[lang].labels.name}
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          defaultValue={badgeForm.name}
                          className={`block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:ring-0 sm:max-w-xs sm:text-sm ${
                            darkMode
                              ? "bg-darkQuin focus:border-altSecondary"
                              : "bg-myWhite focus:border-secondary"
                          }`}
                          onChange={(e) => {
                            setBadgeForm({
                              ...badgeForm,
                              name: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* NAME EN */}
                    <div className="w-full sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="name_en"
                        className="block text-left text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        {trad[lang].labels.name} (english)
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="name_en"
                          id="name_en"
                          autoComplete="name_en"
                          defaultValue={badgeForm.name_en}
                          className={`block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:ring-0 sm:max-w-xs sm:text-sm ${
                            darkMode
                              ? "bg-darkQuin focus:border-altSecondary"
                              : "bg-myWhite focus:border-secondary"
                          }`}
                          onChange={(e) => {
                            setBadgeForm({
                              ...badgeForm,
                              name_en: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="w-full sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="description"
                        className="block text-left text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        {trad[lang].labels.description}
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="description"
                          id="description"
                          autoComplete="description"
                          defaultValue={badgeForm.description}
                          className={`block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:ring-0 sm:max-w-xs sm:text-sm ${
                            darkMode
                              ? "bg-darkQuin focus:border-altSecondary"
                              : "bg-myWhite focus:border-secondary"
                          }`}
                          onChange={(e) => {
                            setBadgeForm({
                              ...badgeForm,
                              description: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* DESCRIPTION EN */}
                    <div className="w-full sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      <label
                        htmlFor="description_en"
                        className="block text-left text-sm font-medium sm:mt-px sm:pt-2"
                      >
                        {trad[lang].labels.description} (english)
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="description_en"
                          id="description_en"
                          autoComplete="description_en"
                          defaultValue={badgeForm.description_en}
                          className={`block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:ring-0 sm:max-w-xs sm:text-sm ${
                            darkMode
                              ? "bg-darkQuin focus:border-altSecondary"
                              : "bg-myWhite focus:border-secondary"
                          }`}
                          onChange={(e) => {
                            setBadgeForm({
                              ...badgeForm,
                              description_en: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm hover:bg-primary focus:outline-none  focus:ring-0 focus:ring-offset-0 sm:col-start-2 sm:text-base ${
                    darkMode
                      ? "bg-altSecondary text-darkTert"
                      : "bg-secondary text-myWhite"
                  }`}
                >
                  {trad[lang].modals.add}
                </button>
                <button
                  type="button"
                  className={`mt-3 inline-flex w-full justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none  focus:ring-0 focus:ring-offset-0 sm:col-start-1 sm:mt-0 sm:text-base ${
                    darkMode
                      ? "border-altSecondary bg-darkTert text-altSecondary hover:bg-darkSec"
                      : "border-secondary bg-myWhite text-secondary hover:bg-gray-100"
                  }`}
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

export default BadgeCreation;
