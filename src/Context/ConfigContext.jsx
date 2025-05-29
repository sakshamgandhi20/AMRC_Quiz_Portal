import React, { createContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const docRef = doc(db, "config", "quizSettings");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setConfig(docSnap.data());
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
