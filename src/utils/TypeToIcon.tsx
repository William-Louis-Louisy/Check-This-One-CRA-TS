import {
  IoTvSharp,
  IoFilmOutline,
  IoLogoYoutube,
  IoListSharp,
} from "react-icons/io5";
import { RiMedalLine, RiInformationLine, RiAlertLine } from "react-icons/ri";
import { MdOutlinePodcasts } from "react-icons/md";

export const typeToIcon = (type) => {
  switch (type) {
    case "movie":
      return <IoFilmOutline className="h-6 w-6" title="Movies" />;
    case "show":
      return <IoTvSharp className="h-6 w-6" title="TV Shows" />;
    case "youtube":
      return <IoLogoYoutube className="h-6 w-6" title="Youtube videos" />;
    case "podcast":
      return <MdOutlinePodcasts className="h-6 w-6" title="Podcasts" />;
    default:
      return <IoListSharp className="h-6 w-6" title="Mixed" />;
  }
};

export const notifTypeToIcon = (type) => {
  switch (type) {
    case "badge":
      return <RiMedalLine className="h-6 w-6" title="Badge" />;
    case "information":
      return <RiInformationLine className="h-6 w-6" title="Information" />;
    default:
      return <RiAlertLine className="h-6 w-6" title="Alert" />;
  }
};
