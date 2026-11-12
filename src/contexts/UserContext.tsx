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
import { clearAccessToken, getAccessToken } from "../utils/authToken";

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
  setUser: Dispatch<SetStateAction<IUser>>;
  storeUser: (value: IUser) => void;
  logout: () => void;
  refetchUser: () => void;
  getUser: () => void;
  notifications: INotifs[];
  getUserNotifications: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { lang, darkMode } = useContext(AppContext);

  const storedUser = (getAccessToken() && JSON.parse(localStorage.getItem("user") || "null")) || {
    id: 0,
    email: "",
    user_name: "",
    avatar: "",
    country: "",
    city: "",
    introduction: "",
    catchline: "",
  };

  const [user, setUser] = useState<IUser>(storedUser);
  const [notifications, setNotifications] = useState<INotifs[]>();
  const userId = user?.id;

  // STORE USER IN ASYNC STORAGE
  const storeUser = useCallback(async (value: IUser) => {
    try {
      await localStorage.setItem("user", JSON.stringify(value));
      setUser(value);
    } catch (error) {
      console.error(error);
      console.error("Error while storing user");
    }
  }, []);

  // GET USER FROM ASYNC STORAGE
  const getUser = useCallback(async () => {
    try {
      const storedUser = await localStorage.getItem("user");
      if (storedUser && getAccessToken()) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    getUser();
  }, [getUser]);

  // REFETCH USER FROM DB
  const refetchUser = useCallback(async () => {
    try {
      if (!userId) return;
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${userId}`
      );
      if (data) {
        await storeUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId, storeUser]);

  useEffect(() => {
    if (userId) {
      refetchUser();
    }
  }, [userId, refetchUser]);

  // GET USER NOTIFICATIONS
  const getUserNotifications = useCallback(async () => {
    try {
      if (userId) {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${userId}/notifications/unseen`
        );
        setNotifications(data.data.notifications);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUserNotifications();

      const notificationInterval = setInterval(() => {
        getUserNotifications();
      }, 60000);
      return () => {
        clearInterval(notificationInterval);
      };
    }
  }, [userId, getUserNotifications]);

  // RESET USER
  const resetUser = () => {
    setUser({
      id: 0,
      email: "",
      user_name: "",
      avatar: "",
      country: "",
      city: "",
      introduction: "",
      catchline: "",
    });
    localStorage.removeItem("user");
    clearAccessToken();
  };

  // LOGOUT
  const logout = async () => {
    let serverRevoked = false;
    try {
      // Revocation must be enforced by the backend, not only by removing local state.
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
      serverRevoked = true;
    } catch (error) {
      // Always erase local credentials; a failed request only means that
      // remote revocation cannot be confirmed.
      console.error("Server-side session revocation was not confirmed", error);
    } finally {
      resetUser();
      setNotifications([]);
    }

    if (serverRevoked) {
      toast.success(`${trad[lang].toasts.success.logout}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: darkMode ? "dark" : "light",
      });
      window.location.replace("/");
    } else {
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
