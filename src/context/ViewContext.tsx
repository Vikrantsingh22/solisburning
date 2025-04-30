"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ViewContextType = {
  activeView: string;
  setActiveView: (view: string) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [activeView, setActiveView] = useState("Dashboard"); // default view

  return (
    <ViewContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = (): ViewContextType => {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView must be used within a ViewProvider");
  return context;
};
