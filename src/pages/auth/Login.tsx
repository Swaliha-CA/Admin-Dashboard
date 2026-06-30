import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Sprout } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/common/Spinner";
import { FeedbackAlert } from "@/components/common/FeedbackAlert";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/auth/useAuth";
import { AuthError } from "@/auth/authTypes";

const schema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid college email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FieldErrors = Partial<Record<"email" | "password", string>>;

interface LocationState {
  from?: string;
}

export function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as LocationState | null)?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "email" || key === "password") next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await login({ email: parsed.data.email, password: parsed.data.password, rememberMe: remember });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      if (error instanceof AuthError) {
        setFormError(error.message);
      } else {
        setFormError("We couldn't reach the authentication service. Check your connection and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--primary)/12%,transparent_55%)]" />
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-12 lg:flex-row lg:gap-16">
        <section className="hidden w-full max-w-md flex-col gap-6 lg:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Sprout className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Campus Canteen</p>
              <h2 className="text-2xl font-semibold">Admin Console</h2>
            </div>
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">
            Run the canteen like clockwork.
          </h1>
          <p className="text-base text-muted-foreground">
            Track live orders, monitor revenue, manage the menu and keep payments reconciled — all from a single
            secure dashboard built for college operations teams.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              "Realtime order pipeline and KPIs",
              "Daily, weekly and monthly revenue trends",
              "Role-based access for Admins and Super Admins",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <Card className="w-full max-w-md border-border/60 shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Sprout className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Campus Canteen</p>
                <p className="text-sm font-semibold">Admin Console</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">Sign in to your account</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your credentials to access the admin dashboard.
              </p>
            </div>

            {formError ? (
              <div className="mb-4">
                <FeedbackAlert variant="error" title="Sign in failed" description={formError} />
              </div>
            ) : null}

            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">College email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="admin@canteen.edu"
                    className="pl-9"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={submitting}
                    required
                  />
                </div>
                {errors.email ? (
                  <p id="email-error" className="text-xs text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-primary hover:underline focus:outline-none focus-visible:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="pl-9 pr-10"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    disabled={submitting}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    tabIndex={0}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password ? (
                  <p id="password-error" className="text-xs text-destructive">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(value) => setRemember(value === true)}
                  disabled={submitting}
                />
                <Label htmlFor="remember" className="cursor-pointer text-sm font-normal text-muted-foreground">
                  Keep me signed in for 7 days
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Spinner size="sm" label="Signing in..." className="text-primary-foreground" /> : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 p-3 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Demo credentials</p>
              <p className="mt-1">Super Admin — superadmin@canteen.edu / super12345</p>
              <p>Admin — admin@canteen.edu / admin12345</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
