import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IUser } from "../../contexts/UserContext";
import trad from "../../lang/traduction";
import { countriesList } from "../../utils/CountriesList";
import { Widget } from "@uploadcare/react-widget";

function EditUserCard({
  lang,
  user,
  refetch,
  darkMode,
}: {
  lang: string;
  user: IUser;
  refetch: () => void;
  darkMode: boolean;
}) {
  // NAVIGATE
  const navigate = useNavigate();

  // PROFILE FORM
  const [profileForm, setProfileForm] = useState({
    country: user.country,
    city: user.city,
    catchline: user.catchline,
    introduction: user.introduction,
    avatar: user.avatar as any,
    username: user.user_name,
  });

  // UPDATE PROFILE
  const updateProfile = async () => {
    if (user.id) {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/update/${user.id}`, {
          username: profileForm.username,
          country: profileForm.country,
          city: profileForm.city,
          catchline: profileForm.catchline,
          introduction: profileForm.introduction,
          avatar: profileForm.avatar,
        });
        toast.success(`${trad[lang].toasts.success.userProfileUpdated}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: darkMode ? "dark" : "light",
        });
        refetch();
      } catch (error) {
        console.error(error);
        toast.error(`${trad[lang].toasts.success.userProfileUpdatedError}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: darkMode ? "dark" : "light",
        });
      }
    } else {
      console.error("No user id");
    }
  };

  return (
    <div
      className={`w-full space-y-8 divide-y divide-gray-200 rounded-md p-8 shadow-lg md:w-1/2 ${
        darkMode ? "bg-darkTert" : "bg-myWhite"
      }`}
    >
      <div
        className={`space-y-4 sm:space-y-5 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        <div className="mb-3">
          <h3
            className={`text-lg font-medium leading-6 ${
              darkMode ? "text-gray-300" : "text-smokyBlack"
            }`}
          >
            {trad[lang].user.editProfile}
          </h3>
        </div>

        {/* AVATAR */}
        <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:pt-5">
          <label htmlFor="photo" className="block text-sm font-medium">
            {trad[lang].user.avatar}
          </label>
          <div className="avatarUpload mt-1 sm:col-span-2 sm:mt-0">
            <Widget
              tabs="file url file camera gdrive instagram"
              imagesOnly={true}
              multiple={false}
              locale={lang === "fr" ? "fr" : "en"}
              publicKey={process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY}
              onChange={(file: any) => {
                setProfileForm({
                  ...profileForm,
                  avatar: file.cdnUrl,
                });
              }}
            />
          </div>
        </div>

        {/* USERNAME */}
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="username"
            className="block text-sm font-medium sm:mt-px sm:pt-2"
          >
            {trad[lang].user.username}
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              defaultValue={user.user_name}
              className={`block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:ring-0 sm:max-w-xs sm:text-sm ${
                darkMode
                  ? "bg-darkQuin focus:border-altSecondary"
                  : "bg-myWhite focus:border-secondary"
              }`}
              onChange={(e) => {
                setProfileForm({
                  ...profileForm,
                  username: e.target.value,
                });
              }}
            />
          </div>
        </div>

        {/* COUNTRY */}
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="country"
            className="block text-sm font-medium sm:mt-px sm:pt-2"
          >
            {trad[lang].user.country}
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              defaultValue={user.country}
              className={`block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:ring-0 sm:max-w-xs sm:text-sm ${
                darkMode
                  ? "bg-darkQuin focus:border-altSecondary"
                  : "bg-myWhite focus:border-secondary"
              }`}
              onChange={(e) => {
                setProfileForm({
                  ...profileForm,
                  country: e.target.value,
                });
              }}
            >
              {countriesList.map((country) => (
                <option key={country.name[lang]}>{country.name[lang]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CITY */}
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="city"
            className="block text-sm font-medium sm:mt-px sm:pt-2"
          >
            {trad[lang].user.city}
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="city"
              id="city"
              autoComplete="address-level2"
              defaultValue={user.city}
              className={`block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:ring-0 sm:max-w-xs sm:text-sm ${
                darkMode
                  ? "bg-darkQuin focus:border-altSecondary"
                  : "bg-myWhite focus:border-secondary"
              }`}
              onChange={(e) => {
                setProfileForm({
                  ...profileForm,
                  city: e.target.value,
                });
              }}
            />
          </div>
        </div>

        {/* CATCHLINE */}
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="catchline"
            className="block text-sm font-medium sm:mt-px sm:pt-2"
          >
            {trad[lang].user.catchline}
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <textarea
              id="catchline"
              name="catchline"
              rows={2}
              className={`card block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:ring-0 sm:text-sm ${
                darkMode
                  ? "bg-darkQuin focus:border-altSecondary"
                  : "bg-myWhite focus:border-secondary"
              }`}
              defaultValue={user.catchline}
              onChange={(e) => {
                setProfileForm({
                  ...profileForm,
                  catchline: e.target.value,
                });
              }}
            />
            <p className="mt-2 text-sm text-gray-400">
              {trad[lang].user.giveUsYourBestQuote}
            </p>
          </div>
        </div>

        {/* INTRODUCTION */}
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="about"
            className="block text-sm font-medium sm:mt-px sm:pt-2"
          >
            {trad[lang].user.introduction}
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <textarea
              id="about"
              name="about"
              rows={3}
              className={`card block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:ring-0 sm:text-sm ${
                darkMode
                  ? "bg-darkQuin focus:border-altSecondary"
                  : "bg-myWhite focus:border-secondary"
              }`}
              defaultValue={user.introduction}
              onChange={(e) => {
                setProfileForm({
                  ...profileForm,
                  introduction: e.target.value,
                });
              }}
            />
            <p className="mt-2 text-sm text-gray-400">
              {trad[lang].user.tellUsAboutYou}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className={`rounded-md border bg-myWhite py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-0 focus:ring-offset-0 ${
              darkMode
                ? "border-altSecondary bg-darkTert text-altSecondary"
                : "border-secondary bg-myWhite text-secondary"
            }`}
            onClick={() => navigate(-1)}
          >
            {trad[lang].user.cancel}
          </button>
          <button
            type="button"
            onClick={() => updateProfile()}
            className={`ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm hover:bg-primary focus:outline-none  focus:ring-0 focus:ring-offset-0 ${
              darkMode
                ? "bg-altSecondary text-darkTert"
                : "bg-secondary text-myWhite"
            }`}
          >
            {trad[lang].user.update}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserCard;
