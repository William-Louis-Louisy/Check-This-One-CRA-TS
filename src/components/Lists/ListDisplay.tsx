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
    <div className="flex w-full flex-col rounded-md bg-myWhite pl-3 pr-3 pb-3 pt-6 shadow-md md:mx-4">
      {/* HEADING */}
      <div className="flex flex-row items-center justify-between sm:ml-6 sm:mr-3">
        {/* Title */}
        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <div>{typeToIcon(list.type)}</div>
          <h4 className="truncate text-base text-primary">{list.title}</h4>
        </div>

        {/* Creator */}
        <div className="flex flex-col items-center gap-3 md:flex-row">
          {pathName !== "/userLists" && creator && (
            <span className="flex flex-row items-center gap-3">
              <button
                onClick={() => setCreatorModal(true)}
                className="flex flex-row items-center text-sm text-secondary"
              >
                {creator.avatar ? (
                  <img
                    className="mr-2 h-8 w-8 rounded-full object-cover"
                    src={creator.avatar}
                    alt=""
                  />
                ) : (
                  creator?.user_name && (
                    <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                      <p className="text-center text-xl text-myWhite">
                        {creator?.user_name[0].toUpperCase()}
                      </p>
                    </div>
                  )
                )}

                {creator.user_name}
              </button>
            </span>
          )}

          {/* Creator action pannel */}
          {user === list.creator_id && pathName === "/userLists" && (
            <span className="relative z-0 inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => openModal(list.id)}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-myWhite px-3 py-2 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-transparent sm:px-4"
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
              <Link
                to={`/listEdition/${list.id}`}
                className="relative -ml-px inline-flex items-center border border-gray-300 bg-myWhite px-3 py-2 text-sm font-medium text-secondary hover:bg-gray-50 focus:z-10 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-transparent sm:px-4"
              >
                <PencilAltIcon className="h-5 w-5" />
              </Link>
              <button
                type="button"
                className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-myWhite px-3 py-2 text-sm font-medium text-secondary hover:bg-gray-50 focus:z-10 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-transparent sm:px-4"
              >
                <HeartIcon className="text-myRed h-5 w-5" />
              </button>
            </span>
          )}
        </div>
      </div>
      <p className="my-4 text-sm italic text-myBlack sm:ml-8">
        "{list.description}"
      </p>

      {/* SLIDER */}
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

      {/* CREATOR MODAL */}
      {creator && (
        <CreatorDisplayCard
          open={creatorModal}
          setOpen={setCreatorModal}
          creator={creator}
          lang={lang}
        />
      )}

      {/* DELETE CONFIRMATION MODAL */}
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
