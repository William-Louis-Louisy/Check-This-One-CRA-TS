import {
  IoTvSharp,
  IoFilmOutline,
  IoLogoYoutube,
  IoListSharp,
} from "react-icons/io5";

export const typeToIcon = (type) => {
  switch (type) {
    case "movie":
      return <IoFilmOutline className="h-6 w-6 text-primary" />;
    case "show":
      return <IoTvSharp className="h-6 w-6 text-primary" />;
    case "youtube":
      return <IoLogoYoutube className="h-6 w-6 text-primary" />;
    default:
      return <IoListSharp className="h-6 w-6 text-primary" />;
  }
};
