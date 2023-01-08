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
  refetchUser: () => void;
  getUser: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [avatar, setAvatar] = useState<string>("");
  const [user, setUser] = useState<IUser>({
    id: 0,
    email: "",
    user_name: "",
    avatar: "",
    country: "",
    city: "",
    introduction: "",
    catchline: "",
  });

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
      setUser(JSON.parse(await localStorage.getItem("user")));
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
    if (user.id) {
      refetchUser();
    }
  }, []);

  // LOGOUT
  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/logout`);
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
    await localStorage.clear();
    window.location.replace("/");
  };

  // GET AVATAR FROM DB AND STORE IT IN ASYNC STORAGE
  // const getAvatar = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/avatar/${user.id}`
  //     );
  //     if (data) {
  //       // Format avatar to base64
  //       const avatarBase64 = `data:image/jpeg;base64,${data.avatar}`;
  //       // Store avatar in async storage
  //       await localStorage.setItem("userAvatar", avatarBase64);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   if (user?.id) {
  //     getAvatar();
  //   }
  // }, [user?.id]);

  // GET AVATAR FROM ASYNC STORAGE

  // const getAvatarFromStorage = async () => {
  //   try {
  //     const storedAvatar = await localStorage.getItem("userAvatar");
  //     if (storedAvatar) {
  //       setAvatar(storedAvatar);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   getAvatarFromStorage();
  // }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        storeUser,
        logout,
        getUser,
        refetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
