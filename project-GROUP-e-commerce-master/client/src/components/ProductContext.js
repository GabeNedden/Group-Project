import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [allWatches, setAllWatches] = useState(null);
  const [status, setStatus] = useState("loading");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log(user);
    setCurrentUser(user);
  }, [isAuthenticated]);

  useEffect(() => {
    fetch("/api/items", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllWatches(res.data);
        setStatus("loaded");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allWatches,
        setAllWatches,
        status,
        setStatus,
        currentUser,
        setCurrentUser,
        isAuthenticated,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
