import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";
import axios from "axios";
import trad from "../lang/traduction";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";
import { clearLegacyAuth } from "../utils/authToken";
import { clearCsrfToken, setCsrfToken } from "../utils/csrfToken";

export interface IUser {
  id: number;
  email: string;
  user_name: string;
  avatar?: string;
  country?: string;
  city?: string;
  introduction?: string;
  catchline?: string;
  role?: "user" | "admin";
  seenContent?: any[];
  seenCount?: number;
}

export interface INotifs {
  id: number;
  message: string;
  message_en: string;
  seen: boolean;
  updated_at?: string;
  user: IUser;
  type?: string;
}

export type UserContextType = {
  user: IUser;
  authReady: boolean;
  setUser: Dispatch<SetStateAction<IUser>>;
  storeUser: (value: IUser) => void;
  logout: () => void;
  refetchUser: () => void;
  getUser: () => void;
  notifications: INotifs[];
  getUserNotifications: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

const anonymousUser: IUser = {
  id: 0,
  email: "",
  user_name: "",
  avatar: "",
  country: "",
  city: "",
  introduction: "",
  catchline: "",
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { lang, darkMode } = useContext(AppContext);
  const [user, setUser] = useState<IUser>(anonymousUser);
  const [authReady, setAuthReady] = useState(false);
  const [notifications, setNotifications] = useState<INotifs[]>([]);
  const userId = user.id;

  const storeUser = useCallback((value: IUser) => {
    setUser(value);
  }, []);

  const getUser = useCallback(async () => {
    // Never trust a cached identity or persist a credential in browser storage.
    clearLegacyAuth();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/session`
      );
      if (data?.user && data?.csrfToken) {
        setCsrfToken(data.csrfToken);
        storeUser(data.user);
      } else {
        clearCsrfToken();
        setUser(anonymousUser);
      }
    } catch {
      // 401 is expected for an anonymous browser.
      clearCsrfToken();
      setUser(anonymousUser);
    } finally {
      setAuthReady(true);
    }
  }, [storeUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const refetchUser = useCallback(async () => {
    try {
      if (!userId) return;
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${userId}`
      );
      if (data?.user) storeUser({ ...user, ...data.user });
    } catch (error) {
      console.error(error);
    }
  }, [userId, user, storeUser]);

  // Server session is authoritative. A partial profile response must not
  // replace the current session's role/email with public defaults.
  const getUserNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${userId}/notifications/unseen`
      );
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId || !authReady) return;
    getUserNotifications();
    const interval = setInterval(getUserNotifications, 60000);
    return () => clearInterval(interval);
  }, [userId, authReady, getUserNotifications]);

  const resetUser = useCallback(() => {
    setUser(anonymousUser);
    setNotifications([]);
    clearCsrfToken();
    clearLegacyAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
      resetUser();
      toast.success(`${trad[lang].toasts.success.logout}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: darkMode ? "dark" : "light",
      });
      window.location.replace("/");
    } catch (error) {
      // HttpOnly cookies cannot be deleted by JavaScript. Do not falsely
      // claim that logout succeeded when server revocation could not be verified.
      console.error("Server-side logout not confirmed", error);
      toast.error(`${trad[lang].toasts.error.logout}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        authReady,
        setUser,
        storeUser,
        logout,
        getUser,
        refetchUser,
        notifications,
        getUserNotifications,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
