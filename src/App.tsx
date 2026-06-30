import { ThemeProvider } from "@/context/ThemeContext";
import { CanteenProvider } from "@/context/CanteenContext";
import { MenuProvider } from "@/context/MenuContext";
import { AuthProvider } from "@/auth/AuthProvider";
import { AppRoutes } from "@/routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CanteenProvider>
          <MenuProvider>
            <AppRoutes />
            <Toaster />
          </MenuProvider>
        </CanteenProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
