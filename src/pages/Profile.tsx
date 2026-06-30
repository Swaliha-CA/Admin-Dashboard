import { useNavigate } from "react-router-dom";
import { LogOut, Mail, Shield, Building2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/auth/useAuth";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your account details and preferences." />

      <Card className="border-border shadow-soft">
        <CardContent className="flex flex-col items-center gap-4 p-8 sm:flex-row sm:items-start">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-gradient-primary text-2xl font-semibold text-primary-foreground">
              {user?.avatar ?? "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-xl font-semibold text-foreground">{user?.name ?? "Admin"}</div>
            <div className="mt-0.5 text-sm text-muted-foreground">{user?.email ?? "admin@canteen.io"}</div>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge variant="secondary" className="rounded-full">
                <Shield className="mr-1 h-3 w-3" />
                {user?.role ?? "Admin"}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                <Building2 className="mr-1 h-3 w-3" />
                Campus Canteen
              </Badge>
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="rounded-2xl"
          >
            <LogOut className="mr-1.5 h-4 w-4" /> Sign out
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-border shadow-soft">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Mail className="h-4 w-4 text-primary" /> Contact
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {user?.email ?? "admin@canteen.io"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-soft">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Shield className="h-4 w-4 text-primary" /> Security
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage password, two-factor authentication and active sessions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
