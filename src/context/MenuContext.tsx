import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { menuItems as seed } from "@/data/menuPerformance";
import type { MenuItem } from "@/types";

export type MenuDraft = Omit<MenuItem, "id" | "quantitySold" | "revenue" | "averageDailySales">;

interface MenuContextValue {
  items: MenuItem[];
  addItem: (draft: MenuDraft) => MenuItem;
  updateItem: (id: string, patch: Partial<MenuDraft>) => void;
  removeItem: (id: string) => void;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

let counter = seed.length;
const nextId = () => {
  counter += 1;
  return `M${String(counter).padStart(2, "0")}`;
};

export function MenuProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(seed);

  const addItem = useCallback((draft: MenuDraft): MenuItem => {
    const created: MenuItem = {
      id: nextId(),
      quantitySold: 0,
      revenue: 0,
      averageDailySales: 0,
      ...draft,
    };
    setItems((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<MenuDraft>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const value = useMemo<MenuContextValue>(
    () => ({ items, addItem, updateItem, removeItem }),
    [items, addItem, updateItem, removeItem],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
}
