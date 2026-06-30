export type AdminRole = "Super Admin" | "Admin";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
}

export interface AuthSession {
  token: string;
  user: AdminUser;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthContextValue {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasRole: (role: AdminRole) => boolean;
}

export class AuthError extends Error {
  code: "INVALID_CREDENTIALS" | "NETWORK" | "EXPIRED" | "UNAUTHORIZED";
  constructor(code: AuthError["code"], message: string) {
    super(message);
    this.code = code;
    this.name = "AuthError";
  }
}
