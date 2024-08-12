"use client";

import { DriverType } from "@/constants/types/driver.types";
import { createContext, ReactNode, useContext, useState } from "react";

type GlobalContextType = {
  drivers: DriverType[];
  setDrivers: React.Dispatch<React.SetStateAction<DriverType[]>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [drivers, setDrivers] = useState<DriverType[]>([]);
  return (
    <GlobalContext.Provider value={{ drivers, setDrivers }}>
      {children}
    </GlobalContext.Provider>
  );
}
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "GlobalContext should be used within GlobalContextProvider"
    );
  }
  return context;
};
