import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipboardListIcon } from "@heroicons/react/outline";
import trad from "../../lang/traduction";
import axios from "axios";

interface ISelectedList {
  id: number;
}

function AddToList({
  open,
  setOpen,
  contentToList,
  contentTitle,
  lang,
  user,
  openNewList,
  setOpenNewList,
  lists,
}) {
  const cancelButtonRef = useRef(null);
  const [selectedList, setSelectedList] = useState<ISelectedList[]>([]);

  // HANDLE CONTENT TYPE
  const handleContentType = (content) => {
    if (content?.release_date) return "movie";
    if (content?.first_air_date) return "show";
    if (content?.etag) return "youtube";
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedList([]);
  };

  // FOR EACH LIST, ADD CONTENT TO LIST
  const handleAddContentToList = async (listId) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/${listId}/content`, {
        provider_id: contentToList.id,
        title: contentTitle,
        poster_path: contentToList.poster_path,
        type: handleContentType(contentToList),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLE ADD CONTENT TO LIST
  const handleAddContent = () => {
    if (selectedList.length === 0) return;
    if (selectedList.length === 1) {
      handleAddContentToList(selectedList[0]);
    }
    if (selectedList.length > 1) {
      selectedList.forEach((list) => {
        handleAddContentToList(list);
      });
    }
    handleClose();
  };

  useEffect(() => {
    if (openNewList) {
      setOpen(false);
    }
  }, [openNewList]);

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
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-myWhite px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <ClipboardListIcon
                    className="h-6 w-6 text-myWhite"
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
                      <div className="flex w-full flex-row items-center justify-between">
                        <legend className="w-full text-left text-lg font-medium text-gray-900">
                          {trad[lang].modals.lists} :
                        </legend>
                        <button
                          onClick={() => {
                            setOpen(false);
                            setOpenNewList(!openNewList);
                          }}
                          className="whitespace-nowrap rounded-md border border-secondary bg-myWhite px-4 py-2 text-base text-secondary duration-150 hover:border-primary hover:text-primary"
                        >
                          {trad[lang].modals.createNewList}
                        </button>
                      </div>

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
                                {item.title}
                              </label>
                            </div>
                            <div className="ml-3 flex h-5 items-center">
                              <input
                                id={`item-${item.id}`}
                                name={`item-${item.id}`}
                                type="checkbox"
                                className="mr-4 h-4 w-4 rounded border-secondary text-primary focus:ring-primary"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedList([
                                      ...selectedList,
                                      item?.id,
                                    ]);
                                  } else {
                                    setSelectedList(
                                      selectedList.filter(
                                        (selectedItem) =>
                                          selectedItem !== item?.id
                                      )
                                    );
                                  }
                                }}
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
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-myWhite shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  onClick={() => handleAddContent()}
                >
                  {trad[lang].modals.add}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-myWhite px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  onClick={() => handleClose()}
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
