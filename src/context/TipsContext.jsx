import React, { createContext, useContext, useEffect, useState } from "react";

export const TipsContext = createContext();

const TipsProvider = ({ children }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://garden-server-eight.vercel.app/browsetips")
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading tips:", error);
      });
  }, []);

  return (
    <TipsContext.Provider value={{ tips, loading }}>
      {children}
    </TipsContext.Provider>
  );
};

export default TipsProvider;

export const useTips = () => useContext(TipsContext);
