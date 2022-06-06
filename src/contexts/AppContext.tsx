import axios from "axios";
import trad from "../lang/traduction";
import { useToasts } from "react-toast-notifications";
import { createContext, SetStateAction, useEffect, useState } from "react";

export const AppContext: any = createContext(null);

const AppProvider = ({ children }) => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<string>("fr");

  /* Headers contenant le token JWT */

  const storeLang = async (value: any) => {
    try {
      await localStorage.setItem("lang", value);
      setLang(value);
    } catch (error) {
      console.error(error);
      addToast(trad[lang].global.error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // Récupère la langue stocker dans l'async storage
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
