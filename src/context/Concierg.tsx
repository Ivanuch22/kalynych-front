import { localStorageManager } from "@/services";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

type ConciergType = {
  userId: number | null;
  userName: string;
  // setUserId: (value: number | null) => void;
  handleSetUserName: (name: string) => void;
  handleSetUserId: (value: null | number) => void;
};

const Context = createContext<ConciergType>({} as ConciergType);

const ConciergContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");

  const handleSetUserId = (id: number | null) => {
    localStorageManager.setItem("Concierg_User_Id", id);
    setUserId(id);
  };

  const handleSetUserName = (name: string) => {
    localStorageManager.setItem("Concierg_User_Name", name);
    setUserName(name);
  };

  useEffect(() => {
    const id = localStorageManager.getItem("Concierg_User_Id");
    const name = localStorageManager.getItem("Concierg_User_Name");
    if (id) {
      setUserId(+id);
    }

    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        userId,
        userName,
        handleSetUserName,
        handleSetUserId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ConciergContextProvider;

export const useConcierg = () => useContext(Context);
