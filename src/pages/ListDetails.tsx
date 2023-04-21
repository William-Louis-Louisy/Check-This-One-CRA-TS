import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentCard from "../components/Cards/ContentCard";
import PageLoader from "../components/Common/PageLoader";
import Slider from "../components/Common/Slider";
import CreatorDisplayCard from "../components/Modals/CreatorDisplayCard";
import ShareModal from "../components/Modals/ShareModal";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import trad from "../lang/traduction";
import { ICreator, IList } from "../types/List";
import { typeToIcon } from "../utils/TypeToIcon";
import CircularProgressBar from "../components/Common/CircularProgressBar";
import ListDetailsCard from "../components/Cards/ListDetailsCard";

function ListDetails() {
  // GET LANG FROM CONTEXT
  const { user } = useContext(UserContext);
  const { lang, darkMode } = useContext(AppContext);
  const { id } = useParams();
  const [list, setList] = useState<IList>();
  const [creator, setCreator] = useState<ICreator>();
  const [creatorModal, setCreatorModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  // GET LIST BY ID
  const getListById = async () => {
    if (id) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/list/getById/${id}/user/${user?.id}`
        );
        setList(data.data.list);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getListById();
  }, [id]);

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

  if (!list && !creator) {
    return <PageLoader lang={lang} darkMode={darkMode} />;
  }

  return (
    <div
      className={`flex h-full min-h-screen w-full flex-col items-center ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      } pt-16`}
    >
      {/*----- PAGE HEADING -----*/}
      <div className="mt-5 mb-4 flex w-full flex-col-reverse gap-4 border-b border-primary px-4 pb-3 sm:mt-8 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-0 sm:pb-5 lg:w-[70%]">
        {/* TITLE */}
        <div className="flex flex-row items-center gap-2 text-primary sm:gap-4">
          <div>{typeToIcon(list.type)}</div>
          <h3 className="text-lg font-medium leading-6">{list.title}</h3>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <span className="flex flex-row items-center justify-end gap-3">
            {/* SHARE BUTTON */}
            <button
              type="button"
              className="flex flex-row items-center gap-2"
              onClick={() => setOpenShareModal(true)}
            >
              <ShareIcon
                className={`h-6 w-6 duration-150 hover:text-primary ${
                  darkMode ? "text-altSecondary" : "text-secondary"
                }`}
              />
            </button>

            {/* CREATOR CARD */}
            <button
              onClick={() => setCreatorModal(true)}
              className={`flex flex-row items-center text-sm ${
                darkMode ? "text-altSecondary" : "text-secondary"
              }`}
            >
              {creator?.avatar ? (
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={creator?.avatar}
                  alt=""
                />
              ) : (
                creator?.user_name && (
                  <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm sm:text-base">
                    <p className="text-center text-xl text-myWhite">
                      {creator?.user_name[0].toUpperCase()}
                    </p>
                  </div>
                )
              )}
            </button>
          </span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-0 lg:w-[70%]">
        {/* SLIDER */}
        <Slider
          content={list.content.map((c: any, index: number) => (
            <ContentCard
              key={`card-${index}`}
              data={c}
              lang={lang}
              userId={user?.id}
              refetch={getListById}
            />
          ))}
          sliderId={list.id.toString()}
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
      </div>

      {/*----- LIST DETAILS -----*/}
      <ListDetailsCard
        lang={lang}
        darkMode={darkMode}
        list={list}
        loggedUser={user}
      />

      {/*----- MODALS -----*/}
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

      {/* SHARE MODAL */}
      <ShareModal
        lang={lang}
        open={openShareModal}
        setOpen={setOpenShareModal}
        darkMode={darkMode}
        qrCode={list.qrCodeDataURL}
        listData={list}
      />
    </div>
  );
}

export default ListDetails;
