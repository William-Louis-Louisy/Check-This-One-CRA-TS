import trad from "../lang/traduction";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import axios from "axios";

export interface IUser {
  id: number;
  email: string;
  user_name: string;
  avatar?: string;
  country?: string;
  city?: string;
  introduction?: string;
  catchline?: string;
}

export type UserContextType = {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  storeUser: (value: IUser) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({
    id: 0,
    email: "",
    user_name: "",
  });

  // STORE USER IN ASYNC STORAGE
  const storeUser = async (value: IUser) => {
    try {
      await localStorage.setItem("user", JSON.stringify(value));
      setUser(value);
      console.log("User stored");
    } catch (error) {
      console.error(error);
      console.error("Error while storing user");
    }
  };

  // GET USER FROM ASYNC STORAGE
  useEffect(() => {
    const getUser = async () => {
      try {
        setUser(JSON.parse(await localStorage.getItem("user")));
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  // LOGOUT
  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/logout`);
    setUser({
      id: 0,
      email: "",
      user_name: "",
    });
    await localStorage.clear();
    window.location.replace("/");
  };

  console.log("user", user);

  return (
    <UserContext.Provider value={{ user, setUser, storeUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
