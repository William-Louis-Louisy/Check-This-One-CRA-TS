// import axios from "axios";
import trad from "../lang/traduction";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

type AppContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  lang: string;
  storeLang: (value: string) => void;
};

export const AppContext = createContext<AppContextType>(null);

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<string>("fr");

  // STOCK LANG IN ASYNC STORAGE
  const storeLang = async (value: string) => {
    try {
      await localStorage.setItem("lang", value);
      setLang(value);
      console.log("Langue changée en " + value);
    } catch (error) {
      console.error(error);
      console.error("Erreur lors du changement de langue");
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

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        lang,
        storeLang,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
