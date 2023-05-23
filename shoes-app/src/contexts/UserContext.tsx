import { createContext, useState } from "react";

type ContextType = {
  updateData: (data: Record<string, any>) => void;
  data: Record<string, any>;
}

export const UserContext = createContext<ContextType>({
  updateData: (data: Record<string, any>) => {},
  data: {},
});

const UserContextProvider = ({ children }: any) => {
  const [data, setData] = useState<Record<string, any>>({});

  const updateData = (newData: Record<string, any>) => {
    setData(newData);
  }

  return (
    <UserContext.Provider value={{ data, updateData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;