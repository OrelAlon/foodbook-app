import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const googleLogin = async ({ response }) => {
    const res = await axios.post("api/auth/googlelogin", {
      tokenId: response.credential,
    });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    // await axios.post("api/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
