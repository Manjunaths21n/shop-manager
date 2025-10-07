import React, { createContext, useContext, useMemo } from "react";
import { ItemsServiceLayerLogic } from "../../service-logic/items-service-logic";

export interface IServiceContext {
  itemsService: ItemsServiceLayerLogic;
}

const serviceUrl = import.meta.env.VITE_API_URL ?? (
  import.meta.env.MODE === 'development' ?
  'https://redesigned-happiness-7v56994jwprqh7r5-4001.app.github.dev/api':
    // 'http://localhost:4000/api' :
    'https://shop-manager-63k4.onrender.com/api'
);

const ServiceContext = createContext<IServiceContext | null>(null);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const services = useMemo(() => {
    return {
      itemsService: new ItemsServiceLayerLogic('/api'),
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
