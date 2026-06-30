import { createContext, useContext, useState, type ReactNode } from "react";

interface CanteenSettings {
  name: string;
  contact: string;
  openingTime: string;
  closingTime: string;
}

interface CanteenContextValue {
  settings: CanteenSettings;
  updateSettings: (s: Partial<CanteenSettings>) => void;
}

const CanteenContext = createContext<CanteenContextValue | undefined>(undefined);

export function CanteenProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<CanteenSettings>({
    name: "Greenleaf Campus Canteen",
    contact: "+91 98765 43210",
    openingTime: "08:00",
    closingTime: "20:00",
  });

  const updateSettings = (s: Partial<CanteenSettings>) =>
    setSettings((prev) => ({ ...prev, ...s }));

  return (
    <CanteenContext.Provider value={{ settings, updateSettings }}>
      {children}
    </CanteenContext.Provider>
  );
}

export function useCanteen(): CanteenContextValue {
  const ctx = useContext(CanteenContext);
  if (!ctx) throw new Error("useCanteen must be used within CanteenProvider");
  return ctx;
}
