import React from "react";
import {
  IoLogoTwitter,
  IoLogoWhatsapp,
  IoQrCodeOutline,
  IoClipboardOutline,
} from "react-icons/io5";
import { SiMessenger, SiFacebook, SiReddit } from "react-icons/si";
import { toast } from "react-toastify";
import trad from "../../lang/traduction";

function ShareButtons({
  url,
  title,
  darkMode,
  showQrCode,
  setShowQrCode,
  lang,
}) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const messengerShareUrl = `fb-messenger://share/?link=${encodedUrl}&app_id=${process.env.REACT_APP_MESSENGER_API_KEY}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;

  const openPopup = (shareUrl) => {
    window.open(shareUrl, "_blank", "width=600, height=400");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(trad[lang].modals.copyToClipboardSuccess, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: darkMode ? "dark" : "light",
      });
    } catch (err) {
      toast.error(trad[lang].modals.copyToClipboardError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  return (
    <div className="my-8 flex w-full flex-row flex-wrap items-center justify-center gap-6 text-3xl">
      {/* FACEBOOK */}
      <button
        title="Facebook"
        onClick={(e) => {
          e.preventDefault();
          openPopup(facebookShareUrl);
        }}
      >
        <SiFacebook
          className={`duration-150 hover:text-primary ${
            darkMode ? "text-altSecondary" : "text-secondary"
          }`}
        />
      </button>

      {/* MESSENGER */}
      <button
        title="Messenger"
        className={`duration-150 hover:text-primary ${
          darkMode ? "text-altSecondary" : "text-secondary"
        }`}
        onClick={(e) => {
          e.preventDefault();
          openPopup(messengerShareUrl);
        }}
      >
        <SiMessenger />
      </button>

      {/* TWITTER */}
      <button
        title="Twitter"
        className={`duration-150 hover:text-primary ${
          darkMode ? "text-altSecondary" : "text-secondary"
        }`}
        onClick={(e) => {
          e.preventDefault();
          openPopup(twitterShareUrl);
        }}
      >
        <IoLogoTwitter />
      </button>

      {/* WHATSAPP */}
      <button
        title="Whatsapp"
        className={`duration-150 hover:text-primary ${
          darkMode ? "text-altSecondary" : "text-secondary"
        }`}
        onClick={(e) => {
          e.preventDefault();
          openPopup(whatsappShareUrl);
        }}
      >
        <IoLogoWhatsapp />
      </button>

      {/* REDDIT */}
      <button
        title="Reddit"
        className={`duration-150 hover:text-primary ${
          darkMode ? "text-altSecondary" : "text-secondary"
        }`}
        onClick={(e) => {
          e.preventDefault();
          openPopup(redditShareUrl);
        }}
      >
        <SiReddit
          className={`duration-150 hover:text-primary ${
            darkMode ? "text-altSecondary" : "text-secondary"
          }`}
        />
      </button>

      {/* QR CODE */}
      <button
        title="QR Code"
        className={`duration-150 hover:text-primary ${
          darkMode ? "text-altSecondary" : "text-secondary"
        }`}
        onClick={() => setShowQrCode(!showQrCode)}
      >
        <IoQrCodeOutline />
      </button>

      {/* CLIPBOARD */}
      <button
        title={trad[lang].modals.copyToClipboard}
        className={`duration-150 hover:text-primary ${
          darkMode ? "text-altSecondary" : "text-secondary"
        }`}
        onClick={copyToClipboard}
      >
        <IoClipboardOutline />
      </button>
    </div>
  );
}

export default ShareButtons;
