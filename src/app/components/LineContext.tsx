import { createContext, useContext, useState } from "react";

type LineContexttype = {
  setTag1Position: (pos: DOMRect) => void;
  setTag2Position: (pos: DOMRect) => void;
  tag1Position: DOMRect | null;
  tag2Position: DOMRect | null;
}

const LineContext = createContext<LineContexttype | undefined>(undefined);

export const useLineContext = () => {
  const context = useContext(LineContext);
  if (!context) {
    throw new Error('useLineContext must be used within LineProvider');
  }
  return context;
};

export const LineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tag1Position, setTag1Position] = useState<DOMRect | null>(null);
  const [tag2Position, setTag2Position] = useState<DOMRect | null>(null);

  return (
    <LineContext.Provider value={{ tag1Position, tag2Position, setTag1Position, setTag2Position }}>
      {children}
    </LineContext.Provider>
  );
};