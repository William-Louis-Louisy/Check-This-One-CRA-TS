import {
  IoTvSharp,
  IoFilmOutline,
  IoLogoYoutube,
  IoListSharp,
} from "react-icons/io5";

export const typeToIcon = (type) => {
  switch (type) {
    case "movie":
      return <IoFilmOutline className="h-6 w-6 text-primary" title="Movies" />;
    case "show":
      return <IoTvSharp className="h-6 w-6 text-primary" title="TV Shows" />;
    case "youtube":
      return (
        <IoLogoYoutube
          className="h-6 w-6 text-primary"
          title="Youtube videos"
        />
      );
    default:
      return <IoListSharp className="h-6 w-6 text-primary" title="Mixed" />;
  }
};
