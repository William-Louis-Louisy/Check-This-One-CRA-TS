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
import LikesModal from "../Modals/LikesModal";
import ActionPannelMobile from "../Common/ActionPannelMobile";

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

function ListDisplay({ list, lang, user, refetch, darkMode }) {
  // PATH NAME
  const location = useLocation();
  const pathName = location.pathname;

  // LIST CREATOR
  const [creator, setCreator] = useState<ICreator>();
  const [creatorModal, setCreatorModal] = useState(false);

  // DELETE LIST MODAL
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState<IListToDelete>();

  // LIKES MODAL
  const [openLikesModal, setOpenLikesModal] = useState(false);

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
          theme: darkMode ? "dark" : "light",
        });
      } catch (error) {
        console.error(error);
        toast.error(`${trad[lang].toasts.listDeletedError}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: darkMode ? "dark" : "light",
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

  // LIST LIKES MANAGEMENT
  const handleLikes = async () => {
    if (user) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/list/${list?.id}/like/${user}`
        );
        refetch();
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

  // CHECK IF USER LIKED THE LIST
  const isLiked = list?.liked_by?.find((userLike) => userLike.id === user);

  return (
    <div
      className={`flex w-full flex-col rounded-md ${
        darkMode ? "bg-darkQuin" : "bg-myWhite"
      } pl-3 pr-3 pb-3 pt-3 shadow-md sm:pt-6 md:mx-4`}
    >
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
                className={`flex flex-row items-center text-sm ${
                  darkMode ? "text-altSecondary" : "text-secondary"
                }`}
              >
                {creator.avatar ? (
                  <img
                    className="mr-2 h-6 w-6 rounded-full object-cover sm:h-8 sm:w-8"
                    src={creator.avatar}
                    alt=""
                  />
                ) : (
                  creator?.user_name && (
                    <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm sm:h-8 sm:w-8 sm:text-base">
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
            <>
              <span className="relative z-0 hidden rounded-md shadow-sm sm:inline-flex">
                <button
                  type="button"
                  onClick={() => openModal(list.id)}
                  className={`relative inline-flex items-center rounded-l-md border ${
                    darkMode
                      ? "border-darkQuin bg-darkTert text-red-400 hover:bg-darkSec"
                      : "border-gray-300 bg-myWhite text-red-600 hover:bg-gray-50"
                  } px-3 py-2 text-sm font-medium focus:z-10 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-transparent sm:px-4`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <Link
                  to={`/listEdition/${list.id}`}
                  className={`relative -ml-px inline-flex items-center rounded-r-md border ${
                    darkMode
                      ? "border-darkQuin bg-darkTert text-altSecondary hover:bg-darkSec"
                      : "border-gray-300 bg-myWhite text-secondary hover:bg-gray-50"
                  } px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-transparent sm:px-4`}
                >
                  <PencilAltIcon className="h-5 w-5" />
                </Link>
              </span>

              <ActionPannelMobile
                link={`/listEdition/${list.id}`}
                action={() => openModal(list.id)}
                linkLabel={trad[lang].labels.editList}
                actionLabel={trad[lang].labels.deleteList}
                linkIcon={<PencilAltIcon className="h-4 w-4" />}
                actionIcon={<TrashIcon className="h-4 w-4 text-red-600" />}
                darkMode={darkMode}
              />
            </>
          )}
        </div>
      </div>
      <p
        className={`my-4 text-sm italic ${
          darkMode ? "text-gray-300" : "text-myBlack"
        } sm:ml-8`}
      >
        "{list.description}"
      </p>

      {/* SLIDER */}
      <Slider
        content={list.content.map((c: any, index: number) => (
          <ContentCard key={`card-${index}`} data={c} />
        ))}
        sliderId={list.id}
        leftButton={
          <ChevronLeftIcon
            className={`h-8 ${
              darkMode ? "text-altSecondary" : "text-secondary"
            }`}
          />
        }
        rightButton={
          <ChevronRightIcon
            className={`h-8 ${
              darkMode ? "text-altSecondary" : "text-secondary"
            }`}
          />
        }
        leftStepValue={200}
        rightStepValue={200}
      />

      {/* SOCIAL */}
      <div className="w-full pt-3 sm:px-4 sm:py-2">
        {/* Likes */}
        <div className="flex flex-row items-center gap-2">
          <button type="button" className="" onClick={() => handleLikes()}>
            <HeartIcon
              className={`h-w-6 w-6 ${
                isLiked ? "text-red-600" : "text-myGray"
              } ${list.liked_by ? "" : "text-red-600"}`}
            />
          </button>
          <button
            className="-mb-[2px]"
            type="button"
            onClick={() => setOpenLikesModal(true)}
          >
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-myBlack"
              }`}
            >
              {list.likes} {trad[lang].global.likes}
            </p>
          </button>
        </div>
      </div>

      {/* CREATOR MODAL */}
      {creator && (
        <CreatorDisplayCard
          open={creatorModal}
          setOpen={setCreatorModal}
          creator={creator}
          lang={lang}
          darkMode={darkMode}
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
        darkMode={darkMode}
      />

      {/* LIKES MODAL */}
      <LikesModal
        lang={lang}
        likes={list.liked_by}
        open={openLikesModal}
        setOpen={setOpenLikesModal}
        darkMode={darkMode}
      />
    </div>
  );
}

export default ListDisplay;
