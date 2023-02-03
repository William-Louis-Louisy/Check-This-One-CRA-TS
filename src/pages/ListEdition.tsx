import { EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentCard from "../components/Cards/ContentCard";
import SmallContentCard from "../components/Cards/SmallContentCard";
import DeleteConfirmation from "../components/Modals/DeleteConfirmation";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import trad from "../lang/traduction";
import { IList } from "../types/List";
import { Switch } from "@headlessui/react";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface IElementToDelete {
  id: number;
}

interface INewListForm {
  title: string;
  description: string;
  privacy: string;
}

function ListEdition() {
  // GET LIST ID FROM URL
  const listId = useParams();
  // GET LANG FROM CONTEXT
  const { lang } = useContext(AppContext);
  // GET USER FROM CONTEXT
  const { user } = useContext(UserContext);
  // GET SCREEN HEIGHT
  const screenHeight = window.innerHeight;

  const navigate = useNavigate();

  // LIST
  const [list, setList] = useState<IList>();
  // MODAL STATE
  const [open, setOpen] = useState(false);
  // ELEMENT TO DELETE
  const [elementToDelete, setElementToDelete] = useState<IElementToDelete>();

  // HANDLE PRIVACY SWITCH SATE
  const handlePrivacySwitch = (state) => {
    switch (state) {
      case "public":
        return true;
      case "private":
        return false;
      default:
        return true;
    }
  };

  const handlePrivacySwitchState = (state) => {
    switch (state) {
      case true:
        return "public";
      case false:
        return "private";
      default:
        return "public";
    }
  };
  // PRIVACY SWITCH STATE
  const [privacy, setPrivacy] = useState(handlePrivacySwitch(list?.privacy));

  // GET LIST BY ID
  const getListById = async () => {
    if (listId) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/list/getById/${listId.listId}`
        );
        setList(data.data.list);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getListById();
  }, [listId]);

  // EDITION FORM
  const [newListForm, setNewListForm] = useState<INewListForm>();

  // DELETE AN ELEMENT FROM A LIST
  const deleteElement = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/${listId.listId}/content/${id}`
      );
      getListById();
    } catch (error) {
      console.error(error);
    }
  };

  // OPEN MODAL
  const openModal = (id) => {
    setElementToDelete(id);
    setOpen(true);
  };
  useEffect(() => {
    setNewListForm({
      title: list?.title,
      description: list?.description,
      privacy: handlePrivacySwitchState(privacy),
    });
  }, [list, privacy]);

  // UPDATE LIST
  const updateList = async () => {
    if (newListForm) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/list/update/${listId.listId}`,
          newListForm
        );
        getListById();
        toast.success(`${trad[lang].toasts.success.listUpdated}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        navigate(-1);
      } catch (error) {
        console.error(error);
        toast.error(`${trad[lang].toasts.success.listUpdatedError}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    }
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-64px)] w-full flex-col items-center bg-myLightGray">
      {/*----- PAGE HEADING -----*/}
      <div className="my-8 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%]">
        {/* TITLE */}
        <h3 className="text-2xl font-medium leading-6 text-primary">
          {trad[lang].listEdition.title}: "{list?.title}"
        </h3>
      </div>

      {/*----- EDITION FORM -----*/}
      <div className="flex flex-row items-start justify-between lg:w-[70%]">
        {/* LIST INFO */}
        <div className="flex w-2/5 flex-col gap-6">
          {/* List privacy */}
          <Switch.Group as="div" className="flex items-center justify-between">
            <span className="flex flex-grow flex-col">
              <Switch.Label
                as="span"
                className="text-sm font-medium text-gray-900"
                passive
              >
                {trad[lang].listEdition.privacy}
              </Switch.Label>
              <Switch.Description as="span" className="text-sm text-gray-500">
                {trad[lang].listEdition.editPrivacy}
              </Switch.Description>
            </span>
            <span
              className={classNames(
                privacy ? "text-green-600" : "text-red-600",
                "mr-2 text-sm font-medium"
              )}
            >
              {privacy
                ? trad[lang].listEdition.public
                : trad[lang].listEdition.private}
            </span>
            <Switch
              checked={privacy}
              onChange={setPrivacy}
              className={classNames(
                privacy ? "bg-green-600" : "bg-red-600",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  privacy ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none flex h-5 w-5 transform items-center justify-center rounded-full bg-myWhite shadow ring-0 transition duration-200 ease-in-out"
                )}
              >
                {privacy ? (
                  <EyeIcon className="h-3 w-3 text-green-600" />
                ) : (
                  <EyeOffIcon className="h-3 w-3 text-red-600" />
                )}
              </span>
            </Switch>
          </Switch.Group>

          {/* List title */}
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="listTitle"
              className="w-full text-left text-sm font-medium text-gray-700"
            >
              {trad[lang].listEdition.name}:
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="listTitle"
                id="listTitle"
                defaultValue={list?.title}
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
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="description"
              className="w-full text-left text-sm font-medium text-gray-700"
            >
              {trad[lang].listEdition.description}:
            </label>
            <div className="mt-1">
              <textarea
                rows={4}
                name="description"
                id="description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                defaultValue={list?.description}
                onChange={(e) =>
                  setNewListForm({
                    ...newListForm,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Buttons row */}
          <div className="flex w-full flex-row justify-end gap-3">
            {/* Cancel button */}
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-secondary px-4 py-2 text-sm font-medium text-secondary shadow-sm duration-150 hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
              onClick={() => navigate(-1)}
            >
              {trad[lang].listEdition.cancel}
            </button>

            {/* Save button */}
            <button
              type="button"
              className="hover:bg-primaryDark inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-myWhite shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
              onClick={() => {
                updateList();
              }}
            >
              {trad[lang].listEdition.save}
            </button>
          </div>
        </div>
        {/* LIST CONTENTS */}
        <div className="flex w-1/2 flex-col items-center gap-1">
          <label
            htmlFor="content"
            className="w-full text-left text-sm font-medium text-gray-700"
          >
            {trad[lang].listEdition.deleteElement}:
          </label>
          <div
            className={`card mt-1 flex h-[calc(100vh*0.70)] w-full flex-wrap gap-8 overflow-y-scroll rounded-md border border-gray-300 p-4 shadow-inner`}
          >
            {list?.content.map((c) => {
              return (
                <div key={c.id} className="flex flex-col items-center gap-3">
                  <SmallContentCard data={c} />
                  <button
                    type="button"
                    onClick={() => openModal(c.id)}
                    className="relative flex w-full flex-row items-center justify-center gap-2 rounded-md border border-gray-300 bg-myWhite px-4 py-2 text-sm text-red-600 duration-300 hover:border-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />{" "}
                    {trad[lang].listEdition.delete}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <DeleteConfirmation
        open={open}
        setOpen={setOpen}
        action={deleteElement}
        elementToDelete={elementToDelete}
        label={trad[lang].listEdition.deleteAnElement}
        description={trad[lang].listEdition.deleteElementConfirmation}
        cancelLabel={trad[lang].listEdition.cancel}
        confirmLabel={trad[lang].listEdition.delete}
      />
    </div>
  );
}

export default ListEdition;
