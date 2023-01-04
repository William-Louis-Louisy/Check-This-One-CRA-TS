import axios from "axios";
import trad from "../../lang/traduction";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipboardListIcon, XIcon } from "@heroicons/react/outline";
import { tagsList } from "../../utils/TagsList";
import { log } from "console";

function CreateListForm({
  openNewList,
  setOpenNewList,
  lang,
  user,
  open,
  setOpen,
}) {
  const cancelButtonRef = useRef(null);
  const [newListForm, setNewListForm] = useState({
    title: "",
    description: "",
    tags: [],
  });

  // ON CLOSE MODAL
  const onClose = () => {
    setOpenNewList(false);
    setOpen(true);
  };

  // POST NEW LIST
  const postNewList = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/list/create/${user?.id}`,
        newListForm
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagSelect = (e) => {
    const selectedTag = tagsList.find((tag) => tag.name === e.target.value);
    console.log("selectedTag", selectedTag);

    setNewListForm({
      ...newListForm,
      tags: [...newListForm.tags, selectedTag],
    });
  };

  console.log(newListForm);

  return (
    <Transition.Root show={openNewList} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onClose}
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
                    Cérer une nouvelle liste
                  </Dialog.Title>
                  <div className="mt-2">
                    <fieldset>
                      {/* NEW LIST FORM */}
                      <div className="mt-4 flex flex-col gap-4 border border-gray-200 p-4">
                        {/* List title */}
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="listTitle"
                            className="w-full text-left text-sm font-medium text-gray-700"
                          >
                            Name:
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="listTitle"
                              id="listTitle"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              onChange={(e) =>
                                setNewListForm({
                                  ...newListForm,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        {/* List description */}
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="description"
                            className="w-full text-left text-sm font-medium text-gray-700"
                          >
                            Description:
                          </label>
                          <div className="mt-1">
                            <textarea
                              rows={4}
                              name="description"
                              id="description"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={""}
                              onChange={(e) =>
                                setNewListForm({
                                  ...newListForm,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        {/* Tag select */}
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="select"
                            className="w-full text-left text-sm font-medium text-gray-700"
                          >
                            Tags:
                          </label>
                          <div className="mt-1">
                            <select
                              name="select"
                              id="select"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              defaultValue={""}
                              onChange={(e) => handleTagSelect(e)}
                            >
                              {tagsList.map((tag) => {
                                return (
                                  <option key={tag.name} value={tag.name}>
                                    {lang === "en" ? tag.name : tag.name_fr}
                                  </option>
                                );
                              })}
                            </select>
                          </div>

                          {newListForm.tags && newListForm.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {newListForm.tags.map((tag) => {
                                return (
                                  <div
                                    key={tag.name}
                                    className="flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1"
                                  >
                                    <span className="text-sm">
                                      {lang === "en" ? tag.name : tag.name_fr}
                                    </span>
                                    <button
                                      type="button"
                                      className="text-gray-400 hover:text-gray-500"
                                      onClick={() => {
                                        setNewListForm({
                                          ...newListForm,
                                          tags: newListForm.tags.filter(
                                            (item) => item !== tag
                                          ),
                                        });
                                      }}
                                    >
                                      <XIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  onClick={() => postNewList()}
                >
                  {trad[lang].modals.add}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  onClick={() => setOpenNewList(false)}
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

export default CreateListForm;
