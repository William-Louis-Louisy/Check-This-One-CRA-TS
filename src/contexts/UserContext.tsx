import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
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

  // STORE USER IN ASYNC STORAGE
  const storeUser = async (value: IUser) => {
    try {
      await localStorage.setItem("user", JSON.stringify(value));
      setUser(value);
    } catch (error) {
      console.error(error);
      console.error("Error while storing user");
    }
  };

  // GET USER FROM ASYNC STORAGE
  const getUser = async () => {
    try {
      const storedUser = await localStorage.getItem("user");
      if (storedUser && getAccessToken()) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // REFETCH USER FROM DB
  const refetchUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${user.id}`
      );
      if (data) {
        storeUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.id && user?.id !== 0) {
      refetchUser();
    }
  }, [user?.id]);

  // GET USER NOTIFICATIONS
  const getUserNotifications = async () => {
    try {
      if (user && user.id !== 0) {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${user.id}/notifications/unseen`
        );
        setNotifications(data.data.notifications);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getUserNotifications();

      const notificationInterval = setInterval(() => {
        getUserNotifications();
      }, 60000);
      return () => {
        clearInterval(notificationInterval);
      };
    }
  }, [user?.id]);

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
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/logout`);
      toast.success(`${trad[lang].toasts.success.logout}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: darkMode ? "dark" : "light",
      });
      await resetUser();
      window.location.replace("/");
    } catch (error) {
      console.error(error);
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
