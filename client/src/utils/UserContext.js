import { createContext, useState, useEffect } from "react";
import UserApi from "../api/UserApi";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserApi.fetchUser()
      .then(({ data }) => {
        let avatar = data.avatar;
        if (avatar === null || avatar === "0")
          avatar =
            "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360";
        if (data.theme === null)
          setUser({ ...user, ...data, avatar, theme: "bg-regal-blue" });
        else setUser({ ...user, ...data, avatar });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const setTheme = (theme) => {
    setUser({ ...user, theme: theme });
  };

  const refetchUser = () => {
    UserApi.fetchUser()
      .then(({ data }) => {
        let avatar = data.avatar;
        if (avatar === null || avatar === "0")
          avatar =
            "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360";
        if (data.theme === null)
          setUser({ ...user, ...data, avatar, theme: "bg-regal-blue" });
        else setUser({ ...user, ...data, avatar });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setTheme, logout, refetchUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
