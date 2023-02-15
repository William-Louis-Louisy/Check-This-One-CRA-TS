import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type AppContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  lang: string;
  storeLang: (value: string) => void;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  storeDarkMode: (value: boolean) => void;
};

export const AppContext = createContext<AppContextType>(null);

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<string>("fr");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(isDarkMode);

  // CHECK IF DARK MODE IS ENABLED IN BROWSER
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    // LISTEN FOR CHANGES IN DARK MODE
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // STOCK LANG IN ASYNC STORAGE
  const storeLang = async (value: string) => {
    try {
      await localStorage.setItem("lang", value);
      setLang(value);
    } catch (error) {
      console.error(error);
      console.error("Erreur lors du changement de langue");
    }
  };

  // STOCK DARK MODE IN ASYNC STORAGE
  const storeDarkMode = async (value: boolean) => {
    try {
      await localStorage.setItem("darkMode", JSON.stringify(value));
      setDarkMode(value);
    } catch (error) {
      console.error(error);
    }
  };

  // GET LANG FROM ASYNC STORAGE
  useEffect(() => {
    const getLang = async () => {
      try {
        const storedLang = await localStorage.getItem("lang");
        storedLang && setLang(storedLang);
      } catch (error) {
        console.error(error);
      }
    };
    getLang();
  }, []);

  // GET DARK MODE FROM ASYNC STORAGE
  useEffect(() => {
    const getDarkMode = async () => {
      try {
        const storedDarkMode = await localStorage.getItem("darkMode");
        storedDarkMode && setDarkMode(JSON.parse(storedDarkMode));
      } catch (error) {
        console.error(error);
      }
    };
    getDarkMode();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        lang,
        storeLang,
        darkMode,
        setDarkMode,
        storeDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
