// src/context/DataContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface DataContextProps {
  data: any[]; // Replace 'any' with your data type
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any[]>([]); // Replace 'any' with your data type

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextProps => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
