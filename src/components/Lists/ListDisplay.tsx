import axios from "axios";
import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import Slider from "../Common/Slider";
import ContentCard from "../Cards/ContentCard";
import { typeToIcon } from "../../utils/TypeToIcon";
import { toast } from "react-toastify";
import trad from "../../lang/traduction";
import { Link, useLocation } from "react-router-dom";
import CreatorDisplayCard from "../Modals/CreatorDisplayCard";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import { UserContext } from "../../contexts/UserContext";

interface ICreator {
  avatar: string;
  catchline: string;
  city: string;
  country: string;
  email: string;
  introduction: string;
  user_name: string;
}

interface IListToDelete {
  id: number;
}

function ListDisplay({ list, lang, user, refetch }) {
  // PATH NAME
  const location = useLocation();
  const pathName = location.pathname;

  // LIST CREATOR
  const [creator, setCreator] = useState<ICreator>();
  const [creatorModal, setCreatorModal] = useState(false);

  // DELETE LIST MODAL
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState<IListToDelete>();

  // HANDLE DELETE LIST
  const handleDeleteList = async () => {
    if (user) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/list/${list?.id}`);
        toast.success(`${trad[lang].toasts.success.listDeleted}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      } catch (error) {
        console.error(error);
        toast.error(`${trad[lang].toasts.listDeletedError}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      } finally {
        refetch();
      }
    }
  };

  // GET USER BY ID
  const getUserById = async () => {
    if (list) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${list?.creator_id}`
        );
        setCreator(data.data.user);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getUserById();
  }, [list]);

  // OPEN MODAL
  const openModal = (id: IListToDelete) => {
    setListToDelete(id);
    setOpenDeleteModal(true);
  };

  return (
    <div className="mx-4 flex w-full flex-col rounded-md bg-myWhite pl-3 pr-3 pb-3 pt-6 shadow-md">
      <div className="ml-6 mr-3 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <div>{typeToIcon(list.type)}</div>
          <h4 className="text-base text-primary">{list.title}</h4>
        </div>

        <div className="flex flex-row items-center gap-3">
          {creator && (
            <span className="flex flex-row items-center gap-3">
              <button
                onClick={() => setCreatorModal(true)}
                className="flex flex-row items-center text-sm text-secondary"
              >
                <img
                  className="mr-2 h-8 w-8 rounded-full"
                  src={creator.avatar}
                  alt=""
                />
                {creator.user_name}
              </button>
            </span>
          )}

          {user === list.creator_id && pathName === "/userLists" && (
            <span className="relative z-0 inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => openModal(list.id)}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
              <Link
                to={`/listEdition/${list.id}`}
                className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <PencilAltIcon className="h-5 w-5" />
              </Link>
              <button
                type="button"
                className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <HeartIcon className="text-myRed h-5 w-5" />
              </button>
            </span>
          )}
        </div>
      </div>
      <p className="my-4 ml-8 text-sm italic text-myBlack">
        "{list.description}"
      </p>
      <Slider
        content={list.content.map((c: any, index: number) => (
          <ContentCard key={`card-${index}`} data={c} />
        ))}
        sliderId={list.id}
        leftButton={<ChevronLeftIcon className="h-8" />}
        rightButton={<ChevronRightIcon className="h-8" />}
        leftStepValue={200}
        rightStepValue={200}
      />
      {creator && (
        <CreatorDisplayCard
          open={creatorModal}
          setOpen={setCreatorModal}
          creator={creator}
          lang={lang}
        />
      )}

      {/* MODAL */}
      <DeleteConfirmation
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        action={handleDeleteList}
        elementToDelete={listToDelete}
        label={trad[lang].listEdition.deleteList}
        description={trad[lang].listEdition.deleteListConfirmation}
        cancelLabel={trad[lang].listEdition.cancel}
        confirmLabel={trad[lang].listEdition.delete}
      />
    </div>
  );
}

export default ListDisplay;
