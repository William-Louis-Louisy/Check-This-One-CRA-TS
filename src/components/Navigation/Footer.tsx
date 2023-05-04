import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { SiDiscord, SiTwitter, SiInstagram } from "react-icons/si";
import trad from "../../lang/traduction";

function Footer() {
  // CONTEXT IMPORTS
  const { lang, darkMode } = useContext(AppContext);

  // DATA
  const navigation = {
    main: [
      { name: trad[lang].footer.about, href: "/aboutUs" },
      { name: trad[lang].footer.contact, href: "/contactUs" },
    ],
    social: [
      {
        name: "Twitter",
        href: "https://twitter.com/checkthisoneCTO",
        icon: <SiTwitter />,
      },
      {
        name: "Discord",
        href: "https://discord.gg/TWzE8cywbF",
        icon: <SiDiscord />,
      },
    ],
  };

  return (
    <footer className={`${darkMode ? "bg-darkTert" : "bg-myWhite"}`}>
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                className={`text-base ${
                  darkMode ? "text-altSecondary" : "text-secondary"
                }`}
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? "text-altSecondary" : "text-secondary"}`}
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2023 221B-BakerScript.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
