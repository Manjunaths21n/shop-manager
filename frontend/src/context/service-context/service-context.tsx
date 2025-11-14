import React, { createContext, useContext, useMemo } from "react";
import { ItemsServiceLayerLogic } from "../../service-logic/items-service-logic";

export interface IServiceContext {
  itemsService: ItemsServiceLayerLogic;
}

// const serviceUrl = import.meta.env.VITE_API_URL ?? (
const serviceUrl = import.meta.env.MODE === 'development' ? '/api' :
  'http://shop-manager-63k4.onrender.com/api';

const ServiceContext = createContext<IServiceContext | null>(null);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const services = useMemo(() => {
    return {
      itemsService: new ItemsServiceLayerLogic(serviceUrl),
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
