import React, { createContext, useContext, useMemo } from "react";
import { ItemsServiceLayerLogic } from "../../service-logic/items-service-logic";

export interface IServiceContext {
  itemsService: ItemsServiceLayerLogic;
}

const ServiceContext = createContext<IServiceContext | null>(null);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const services = useMemo(() => {
    return {
      itemsService: new ItemsServiceLayerLogic("http://localhost:4001/api"),
    };
  }, []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const ctx = useContext(ServiceContext);
  if (!ctx) throw new Error("useServices must be used inside ServiceProvider");
  return ctx;
};
