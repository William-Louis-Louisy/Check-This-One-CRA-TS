import axios from "axios";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import trad from "../../lang/traduction";
import LazyImage from "../Common/LazyImage";

function ContentCard({ data, lang, userId, refetch }) {
  // HANLE TYPE
  const handleType = (type) => {
    switch (type) {
      case "movie":
        return "movieDetails";
      case "show":
        return "tvDetails";
      case "youtube":
        return "youtubeDetails";
      default:
        return "movieDetails";
    }
  };

  // CHECK IF DATA.ID EXIST IN SEENCONTENT
  const isSeen = data?.seen_by?.find((item: any) => item.id === userId);
  // HANDLE SEEN CONTENT
  const handleSeen = async () => {
    if (userId) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/content/${data?.id}/seen/${userId}`
        );

        refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // HANDLE CLICK BUTTON
  const handleClick = (e) => {
    e.preventDefault();
    handleSeen();
  };

  return (
    <a
      href={
        data.type === "youtube"
          ? `https://www.youtube.com/watch?v=${data.provider_id_string}}`
          : `/${handleType(data.type)}/${data.provider_id}`
      }
    >
      <div className="relative h-40 w-[106px] md:h-80 md:w-[213px]">
        <LazyImage
          src={
            data.type === "youtube"
              ? data.poster_path
                ? data.poster_path
                : "/src/assets/poster.jpg"
              : data.poster_path
              ? "https://image.tmdb.org/t/p/w500" + data.poster_path
              : "/src/assets/poster.jpg"
          }
          className={`${
            data.type === "youtube"
              ? "h-40 object-contain md:h-80"
              : "h-40 rounded-md md:h-80"
          }`}
          alt=""
        />
        {isSeen ? (
          <button
            className="absolute top-1.5 right-1.5 rounded-md bg-gray-500 bg-opacity-90 px-3 py-1 text-green-500"
            title={trad[lang].global.youHaveSeenIt}
            onClick={handleClick}
          >
            <HiOutlineEye />
          </button>
        ) : (
          <button
            className="absolute top-1.5 right-1.5 rounded-md bg-gray-500 bg-opacity-90 px-3 py-1 text-white"
            title={trad[lang].global.haveYouSeenIt}
            onClick={handleClick}
          >
            <HiOutlineEyeOff />
          </button>
        )}
      </div>
    </a>
  );
}

export default ContentCard;
