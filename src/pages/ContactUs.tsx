import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import trad from "../lang/traduction";
import axios from "axios";
import { toast } from "react-toastify";
import LazyImage from "../components/Common/LazyImage";

interface IContactForm {
  email: string;
  subject: string;
  message: string;
}

const initialContactForm: IContactForm = {
  email: "",
  subject: "",
  message: "",
};

function ContactUs() {
  // CONTEXT IMPORTS
  const { lang, darkMode } = useContext(AppContext);

  // STATES
  const [contactForm, setContactForm] = useState(initialContactForm);

  // SUBMIT CONTACT FORM
  const postContactForm = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/contact`,
        {
          email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message,
        }
      );
      if (data) {
        toast.success(`${trad[lang].toasts.success.messageSent}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: darkMode ? "dark" : "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`${trad[lang].toasts.error.messageSentError}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  return (
    <div
      className={`flex min-h-[calc(100vh-64px)] flex-col items-center pt-16 md:flex-row-reverse md:pt-0 ${
        darkMode ? "bg-darkBg" : "bg-myLightGray"
      }`}
    >
      {/* Contact Image */}
      <div className="md:min-h-screen md:w-1/2">
        <LazyImage
          className="h-56 w-full object-cover md:h-screen"
          src="https://ucarecdn.com/16bf9976-9035-486e-a510-ee3de2dd99e3/contactus.png"
          alt=""
        />
      </div>

      {/* Contact Form */}
      <div className="flex min-h-screen flex-col items-center py-16 px-4 sm:py-24 sm:px-6 md:w-1/2 md:px-8 md:py-32">
        <div className="md:pr-8">
          <div className="mx-auto max-w-md sm:max-w-lg md:mx-0">
            <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              {trad[lang].contact.title}
            </h2>
            <p
              className={`mt-4 text-lg sm:mt-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {trad[lang].contact.subtitle}
            </p>
            <div className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {trad[lang].contact.email}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    autoComplete="email"
                    onChange={(e) => {
                      setContactForm({
                        ...contactForm,
                        email: e.target.value,
                      });
                    }}
                    className={`customInput block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-transparent sm:text-sm ${
                      darkMode
                        ? "bg-darkQuin text-gray-300 focus:border-darkTert"
                        : "bg-myWhite focus:border-myGray"
                    }`}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {trad[lang].contact.subject}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    maxLength={50}
                    name="subject"
                    id="subject"
                    autoComplete="subject"
                    onChange={(e) => {
                      setContactForm({
                        ...contactForm,
                        subject: e.target.value,
                      });
                    }}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-transparent sm:text-sm ${
                      darkMode
                        ? "bg-darkQuin text-gray-300 focus:border-darkTert"
                        : "bg-myWhite focus:border-myGray"
                    }`}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="how-can-we-help"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {trad[lang].contact.message}
                  </label>
                  <span
                    id="how-can-we-help-description"
                    className={`text-sm text-gray-500 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {trad[lang].contact.maxLength}
                  </span>
                </div>
                <div className="mt-1">
                  <textarea
                    id="how-can-we-help"
                    name="how-can-we-help"
                    aria-describedby="how-can-we-help-description"
                    maxLength={500}
                    rows={4}
                    onChange={(e) => {
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      });
                    }}
                    className={`block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-transparent sm:text-sm ${
                      darkMode
                        ? "bg-darkQuin text-gray-300 focus:border-darkTert"
                        : "bg-myWhite focus:border-myGray"
                    }`}
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="text-right sm:col-span-2">
                <button
                  type="button"
                  onClick={() => postContactForm()}
                  className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm duration-150 hover:bg-primary focus:outline-none focus:ring-0 focus:ring-offset-0 ${
                    darkMode
                      ? "bg-altSecondary text-darkBg"
                      : "bg-secondary text-myWhite"
                  }`}
                >
                  {trad[lang].contact.send}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
