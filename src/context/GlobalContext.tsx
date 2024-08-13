"use client";

import { DriverType } from "@/constants/types/driver.types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type GlobalContextType = {
  drivers: DriverType[];
  setDrivers: React.Dispatch<React.SetStateAction<DriverType[]>>;
  locationDrivers: DriverType[];
  setLocationDrivers: React.Dispatch<React.SetStateAction<DriverType[]>>;
  loggedInDriver: DriverType | null;
  setLoggedInDriver: React.Dispatch<React.SetStateAction<DriverType | null>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [drivers, setDrivers] = useState<DriverType[]>([]);
  const [locationDrivers, setLocationDrivers] = useState<DriverType[]>([]);
  const [loggedInDriver, setLoggedInDriver] = useState<DriverType | null>(null);
  useEffect(() => {
    const driverInfo = localStorage.getItem("driverInfo");
    if (driverInfo) {
      setLoggedInDriver(JSON.parse(driverInfo));
    }
  }, []);
  useEffect(() => {
    if (loggedInDriver) {
      localStorage.setItem("driverInfo", JSON.stringify(loggedInDriver));
    }
  }, [loggedInDriver]);
  return (
    <GlobalContext.Provider
      value={{
        drivers,
        setDrivers,
        loggedInDriver,
        setLoggedInDriver,
        setLocationDrivers,
        locationDrivers,
      }}
    >
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
