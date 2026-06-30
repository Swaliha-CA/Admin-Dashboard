import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  Users,
  BarChart3,
  UserCircle2,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const items: NavItem[] = [
  { to: "/", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/orders", label: "Orders", Icon: ShoppingBag },
  { to: "/menu", label: "Menu", Icon: Utensils },
  { to: "/users", label: "Users", Icon: Users },
  { to: "/analytics", label: "Analytics", Icon: BarChart3 },
  { to: "/profile", label: "Profile", Icon: UserCircle2 },
];

export function BottomNavigation() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:bottom-6"
    >
      <ul
        className="pointer-events-auto flex max-w-fit items-stretch gap-0.5 overflow-x-auto rounded-3xl border border-border/60 bg-card/70 p-1.5 shadow-glass backdrop-blur-xl supports-[backdrop-filter]:bg-card/55"
      >
        {items.map(({ to, label, Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
          return (
            <li key={to}>
              <Link
                to={to}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2 text-[11px] font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "bg-gradient-primary text-primary-foreground shadow-elevated"
                    : "text-muted-foreground hover:-translate-y-0.5 hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    active ? "scale-110" : "group-hover:scale-110",
                  )}
                  aria-hidden="true"
                />
                <span className={cn("hidden sm:block", active && "font-semibold")}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
