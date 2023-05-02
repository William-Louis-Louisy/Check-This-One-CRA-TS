import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export interface IBuddyForm {
  type: string;
  watchProvider: string[];
  language: string;
  genre: number;
  period: { start: string; end: string };
  runtime: { start: number; end: number };
  runtimeTv: { start: number; end: number };
  binge: boolean;
  userLocation: string;
}
export const defaultBuddyForm: IBuddyForm = {
  type: "",
  watchProvider: [],
  language: "",
  genre: 0,
  period: { start: "", end: "" },
  runtime: { start: 0, end: 0 },
  runtimeTv: { start: 0, end: 0 },
  binge: false,
  userLocation: "FR",
};

type AppContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  lang: string;
  storeLang: (value: string) => void;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  storeDarkMode: (value: boolean) => void;
  results: any[];
  setResults: Dispatch<SetStateAction<any[]>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  isFinished: boolean;
  setIsFinished: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  buddyForm: IBuddyForm;
  setBuddyForm: any;
};

export const AppContext = createContext<AppContextType>(null);

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<string>("fr");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(isDarkMode);

  // BINGE BUDDY STATES
  const [buddyForm, setBuddyForm] = useState(defaultBuddyForm);
  const [results, setResults] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
        results,
        setResults,
        currentStep,
        setCurrentStep,
        isFinished,
        setIsFinished,
        page,
        setPage,
        totalPages,
        setTotalPages,
        buddyForm,
        setBuddyForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
