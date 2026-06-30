import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { authService } from "./authService";
import type { AdminRole, AdminUser, AuthContextValue, LoginCredentials } from "./authTypes";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const expiryTimer = useRef<number | null>(null);

  const clearExpiryTimer = useCallback(() => {
    if (expiryTimer.current !== null) {
      window.clearTimeout(expiryTimer.current);
      expiryTimer.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearExpiryTimer();
    authService.signOut();
    setUser(null);
  }, [clearExpiryTimer]);

  const scheduleExpiry = useCallback(
    (expiresAt: number) => {
      clearExpiryTimer();
      const delay = Math.max(0, expiresAt - Date.now());
      expiryTimer.current = window.setTimeout(() => {
        logout();
      }, delay);
    },
    [clearExpiryTimer, logout],
  );

  useEffect(() => {
    const session = authService.restore();
    if (session) {
      setUser(session.user);
      scheduleExpiry(session.expiresAt);
    }
    setIsLoading(false);
    return clearExpiryTimer;
  }, [scheduleExpiry, clearExpiryTimer]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const session = await authService.authenticate(credentials);
      setUser(session.user);
      scheduleExpiry(session.expiresAt);
    },
    [scheduleExpiry],
  );

  const hasRole = useCallback(
    (role: AdminRole) => {
      if (!user) return false;
      if (user.role === "Super Admin") return true;
      return user.role === role;
    },
    [user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
      hasRole,
    }),
    [user, isLoading, login, logout, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
