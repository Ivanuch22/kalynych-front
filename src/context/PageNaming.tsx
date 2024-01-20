import { localStorageManager } from "@/services";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

type PageType = {
  pageName: string;
  setPageName: (name: string) => void;
};

const Context = createContext<PageType>({} as PageType);

const PageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageName, setPageName] = useState<string>("");

  return (
    <Context.Provider
      value={{
        pageName,
        setPageName,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default PageContextProvider;

export const usePage = () => useContext(Context);
