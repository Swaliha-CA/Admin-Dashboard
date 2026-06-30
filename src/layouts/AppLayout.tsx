import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

const titles: Record<string, { title: string; subtitle?: string }> = {
  "/": { title: "Dashboard" },
  "/orders": { title: "Orders", subtitle: "Track and manage today's orders" },
  "/menu": { title: "Menu", subtitle: "Manage items, availability and pricing" },
  
  "/users": { title: "Users", subtitle: "Staff and customer accounts" },
  "/analytics": { title: "Analytics", subtitle: "Revenue, trends and insights" },
  "/payments": { title: "Payments", subtitle: "Transactions and settlements" },
  
  "/profile": { title: "Profile", subtitle: "Your account and preferences" },
};

export function AppLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const meta = titles[pathname] ?? { title: "Dashboard" };

  return (
    <div className="min-h-screen bg-background pb-32 text-foreground">
      <TopBar pageTitle={meta.title} pageSubtitle={meta.subtitle} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <BottomNavigation />
    </div>
  );
}
