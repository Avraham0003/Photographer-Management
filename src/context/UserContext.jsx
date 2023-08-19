import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState(null);


  useEffect(() => {
    if (cookies.token) {
      const authUser = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_SERVER_URL+"/users/auth",
            {
              headers: {
                Authorization: cookies.token,
              },
            }
          );
          const data = await response.data;

          if (!data.success) {
            removeCookie("token");
            throw new Error(`${data.message} : ${data.error}`);
          }

          setUserData(data.user);
          setIsLogged(true);
          setUserID(data.user._id);
        } catch (error) {
          setIsLogged(false);
        }
      };

      authUser();
    }
  }, [cookies]);


  const login = async(user_email, user_password) => {
    try {
      setUserData({ user_email, user_password });
      const response = await axios.post(import.meta.env.VITE_SERVER_URL+`/users/login`,{user_email,user_password});
      setCookie('token',response.data.token, { path: "/", maxAge: 10800 });
      setIsLogged(true);
      toast.success('התחברת בהצלחה');
    } catch (error) {
      toast.error(error.message);
    }
      
  }

  const logout = ()=>{
    removeCookie('token',{ path: "/" });
    setIsLogged(false);
    setUserData(null);
    setUserID(null);
    toast.info('התנתקת בהצלחה');

  }

  return (
    <UserContext.Provider value={{ userData, login, logout, isLogged, userID }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;