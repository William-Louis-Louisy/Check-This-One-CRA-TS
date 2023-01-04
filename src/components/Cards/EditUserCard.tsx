import axios from "axios";
import React, { useState } from "react";
import { IUser } from "../../contexts/UserContext";
import { countriesList } from "../../utils/CountriesList";

function EditUserCard({
  lang,
  user,
  refetch,
}: {
  lang: string;
  user: IUser;
  refetch: () => void;
}) {
  const [profileForm, setProfileForm] = useState({
    country: user.country,
    city: user.city,
    catchline: user.catchline,
    introduction: user.introduction,
    avatar: user.avatar as any,
  });

  // GET BASE64 FUNCTION
  const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // HANDLE FILE SELECTION
  const fileSelectedHandler = async (event: any) => {
    const base_string = [getBase64(event.target.files[0])];
    const logo = await Promise.all(base_string);
    const fileTmp = {
      base64: logo[0],
    };
    setProfileForm({ ...profileForm, avatar: fileTmp.base64 });
  };

  // UPDATE PROFILE
  const updateProfile = async () => {
    if (user.id) {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}/update/${user.id}`,
          {
            country: profileForm.country,
            city: profileForm.city,
            catchline: profileForm.catchline,
            introduction: profileForm.introduction,
            avatar: profileForm.avatar,
          }
        );
        if (data) {
          console.log("Profile updated");
          console.log("PAR LA !!", data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        refetch();
      }
    } else {
      console.error("No user id");
    }
  };

  return (
    <div className="space-y-8 divide-y divide-gray-200 rounded-md bg-white p-8 shadow-lg">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit profile
            </h3>
          </div>

          {/* AVATAR */}
          <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:pt-5">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Photo
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex items-center">
                <input
                  type="file"
                  onChange={(e) => fileSelectedHandler(e)}
                  className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                />
              </div>
            </div>
          </div>

          {/* COUNTRY */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Country
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                defaultValue={user.country}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
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
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              City
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                defaultValue={user.city}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
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
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Catchline
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <textarea
                id="about"
                name="about"
                rows={2}
                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                defaultValue={user.catchline}
                onChange={(e) => {
                  setProfileForm({
                    ...profileForm,
                    catchline: e.target.value,
                  });
                }}
              />
              <p className="mt-2 text-sm text-gray-500">
                Give us your best quote.
              </p>
            </div>
          </div>

          {/* INTRODUCTION */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Introduction
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                defaultValue={user.introduction}
                onChange={(e) => {
                  setProfileForm({
                    ...profileForm,
                    introduction: e.target.value,
                  });
                }}
              />
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => updateProfile()}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserCard;
