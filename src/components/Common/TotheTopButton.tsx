import { ArrowUpIcon } from "@heroicons/react/outline";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import trad from "../../lang/traduction";

function TotheTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode, lang } = useContext(AppContext);

  const checkScrollPosition = () => {
    const oneThirdOfPage = window.innerHeight / 3;
    if (window.pageYOffset > oneThirdOfPage) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          title={trad[lang].global.goToTheTop}
          className={`fixed bottom-4 right-4 rounded-full p-2 ${
            darkMode
              ? "bg-altSecondary text-darkBg"
              : "bg-secondary text-myLightGray"
          }`}
          onClick={scrollToTop}
        >
          <ArrowUpIcon className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
      )}
    </>
  );
}

export default TotheTopButton;
