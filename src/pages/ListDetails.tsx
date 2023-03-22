import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentCard from "../components/Cards/ContentCard";
import PageLoader from "../components/Common/PageLoader";
import Slider from "../components/Common/Slider";
import CreatorDisplayCard from "../components/Modals/CreatorDisplayCard";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import trad from "../lang/traduction";
import { ICreator, IList } from "../types/List";
import { typeToIcon } from "../utils/TypeToIcon";

function ListDetails() {
  const { id } = useParams();
  const [list, setList] = useState<IList>();
  const [creator, setCreator] = useState<ICreator>();
  const [creatorModal, setCreatorModal] = useState(false);

  // GET LANG FROM CONTEXT
  const { lang, darkMode } = useContext(AppContext);
  const { user, refetchUser } = useContext(UserContext);

  // GET LIST BY ID
  const getListById = async () => {
    if (id) {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/list/getById/${id}`
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
      <div className="mt-8 w-4/5 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between lg:w-[70%]">
        {/* TITLE */}
        <div className="flex flex-row items-center gap-2 text-primary sm:gap-4">
          <div>{typeToIcon(list.type)}</div>
          <h3 className="text-lg font-medium leading-6">{list.title}</h3>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <span className="flex flex-row items-center gap-3">
            <button
              onClick={() => setCreatorModal(true)}
              className={`flex flex-row items-center text-sm ${
                darkMode ? "text-altSecondary" : "text-secondary"
              }`}
            >
              {creator?.avatar ? (
                <img
                  className="mr-2 h-6 w-6 rounded-full object-cover sm:h-8 sm:w-8"
                  src={creator?.avatar}
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

              {creator?.user_name}
            </button>
          </span>
        </div>
      </div>

      <div className="mt-4 w-full lg:w-[70%]">
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
      <div className="flex w-full flex-col items-start justify-between lg:w-[70%] lg:flex-row">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 p-4 lg:w-2/5">
          {/* Description */}
          <div className="flex flex-col items-start">
            <span className="text-primary">
              {trad[lang].labels.description}:
            </span>
            <span
              className={`mt-1 text-sm ${
                darkMode ? "text-gray-300" : "text-smokyBlack"
              }`}
            >
              {list.description}
            </span>
          </div>

          <div className="h-px w-full bg-gray-300"></div>

          {/* Tags */}
          <div className="flex flex-col items-start">
            <span className="text-primary">{trad[lang].labels.tags}:</span>
            <div className="mt-1 flex flex-row flex-wrap items-center gap-2">
              {list.tags &&
                list.tags.length > 0 &&
                list.tags.map((tag: any, index: number) => (
                  <div
                    key={tag.name}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 ${
                      darkMode
                        ? "bg-darkSec text-gray-300"
                        : "bg-myWhite text-smokyBlack"
                    }`}
                  >
                    <span className="text-sm">
                      {lang === "en" ? tag.name : tag.name_fr}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-4 lg:w-2/5">
          <div className="flex flex-col items-start">
            <span className="text-primary">{trad[lang].labels.likes}:</span>
            <div className="card mt-1 flex max-h-32 flex-row flex-wrap items-center gap-3">
              {list.liked_by.map((user: any, index: number) => (
                <div
                  key={user.id}
                  className={`flex flex-row items-center gap-1 rounded-l-full rounded-r-full pr-3 text-sm ${
                    darkMode
                      ? "bg-darkSec text-gray-300"
                      : "bg-myWhite text-smokyBlack"
                  }`}
                >
                  {user.avatar ? (
                    <img
                      className="h-6 w-6 rounded-full object-cover sm:h-8 sm:w-8"
                      src={user.avatar}
                      alt=""
                    />
                  ) : (
                    user.user_name && (
                      <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm sm:h-8 sm:w-8 sm:text-base">
                        <p className="text-center text-xl text-myWhite">
                          {user.user_name[0].toUpperCase()}
                        </p>
                      </div>
                    )
                  )}
                  <span className="text-sm">{user.user_name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}

export default ListDetails;
