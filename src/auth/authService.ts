import { AuthError, type AdminUser, type AuthSession, type LoginCredentials } from "./authTypes";

const STORAGE_KEY = "cc-auth-session";
const SESSION_MS_DEFAULT = 1000 * 60 * 60 * 24; // 24h
const SESSION_MS_REMEMBER = 1000 * 60 * 60 * 24 * 7; // 7d

interface AdminCredential {
  user: AdminUser;
  password: string;
}

// Provisioned admin directory. In a real deployment this lives behind an API;
// the frontend only ever sees a signed token in response to authenticate().
const ADMIN_DIRECTORY: readonly AdminCredential[] = [
  {
    password: "super12345",
    user: {
      id: "u_super_01",
      name: "Aarav Mehta",
      email: "superadmin@canteen.edu",
      role: "Super Admin",
      avatar: "AM",
    },
  },
  {
    password: "admin12345",
    user: {
      id: "u_admin_01",
      name: "Priya Sharma",
      email: "admin@canteen.edu",
      role: "Admin",
      avatar: "PS",
    },
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function generateToken(): string {
  const bytes = new Uint8Array(24);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function readStorage(): AuthSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.token || !parsed.user || typeof parsed.expiresAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStorage(session: AuthSession, remember: boolean): void {
  const serialised = JSON.stringify(session);
  if (remember) {
    window.localStorage.setItem(STORAGE_KEY, serialised);
    window.sessionStorage.removeItem(STORAGE_KEY);
  } else {
    window.sessionStorage.setItem(STORAGE_KEY, serialised);
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function clearStorage(): void {
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export const authService = {
  async authenticate(credentials: LoginCredentials): Promise<AuthSession> {
    await delay(650);
    const email = credentials.email.trim().toLowerCase();
    const record = ADMIN_DIRECTORY.find((entry) => entry.user.email.toLowerCase() === email);
    if (!record || record.password !== credentials.password) {
      throw new AuthError("INVALID_CREDENTIALS", "Incorrect email or password.");
    }
    const lifetime = credentials.rememberMe ? SESSION_MS_REMEMBER : SESSION_MS_DEFAULT;
    const session: AuthSession = {
      token: generateToken(),
      user: record.user,
      expiresAt: Date.now() + lifetime,
    };
    writeStorage(session, credentials.rememberMe);
    return session;
  },

  restore(): AuthSession | null {
    const session = readStorage();
    if (!session) return null;
    if (session.expiresAt <= Date.now()) {
      clearStorage();
      return null;
    }
    return session;
  },

  signOut(): void {
    clearStorage();
  },
};
