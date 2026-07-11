import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const backendURL = "https://finly-software-app-backend.onrender.com";

  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);


  useEffect(() => {
    const stored = localStorage.getItem("token");

    if (stored) {
      setToken(stored);
    }

    setAuthLoading(false);

  }, []);


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

  }, [token]);


  const value = {
    navigate,
    backendURL,
    token,
    setToken,
    authLoading,
    setAuthLoading
  };


  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
