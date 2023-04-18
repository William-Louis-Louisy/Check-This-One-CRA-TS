import { Fragment, useState } from "react";
import trad from "../../lang/traduction";
import ShareButtons from "../Lists/ShareButtons";
import { Dialog, Transition } from "@headlessui/react";

function ShareModal({ lang, open, setOpen, darkMode, qrCode, listData }) {
  const shareUrl = `https://checkthisone.vercel.app/listDetails/${listData.id}`;
  const title = listData.title;
  const [showQrCode, setShowQrCode] = useState(false);

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
              className={`relative inline-block w-full transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle ${
                darkMode ? "bg-darkTert" : "bg-myWhite"
              }`}
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className={`font-medium leading-6 sm:text-lg ${
                      darkMode ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    {trad[lang].modals.shareAList}
                  </Dialog.Title>

                  {/* QR CODE */}
                  {showQrCode && (
                    <>
                      <div className="my-8 flex flex-col items-center justify-center">
                        <img
                          src={qrCode}
                          alt="qr code"
                          className="rounded-md"
                        />
                        <p
                          className={`mt-8 text-sm italic ${
                            darkMode ? "text-gray-300" : "text-gray-900"
                          }`}
                        >
                          {trad[lang].modals.qrExplanations}
                        </p>
                      </div>

                      {/* DIVIDER */}
                      <div
                        className={`mb-8 h-px w-full ${
                          darkMode ? "bg-gray-300" : "bg-gray-900"
                        }`}
                      ></div>
                    </>
                  )}

                  {/* SHARE BUTTONS */}
                  <ShareButtons
                    url={shareUrl}
                    title={title}
                    darkMode={darkMode}
                    showQrCode={showQrCode}
                    setShowQrCode={setShowQrCode}
                    lang={lang}
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 sm:text-sm ${
                    darkMode
                      ? "bg-altSecondary text-darkTert"
                      : "bg-secondary text-myWhite"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {trad[lang].modals.close}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ShareModal;
