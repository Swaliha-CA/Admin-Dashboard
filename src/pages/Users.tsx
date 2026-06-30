import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "Staff" | "Customer";
  status: "Active" | "Suspended";
  lastLogin: string;
}

const seed: UserRow[] = [
  { id: "1", name: "Aarav Sharma", email: "aarav@canteen.io", phone: "+91 90000 11111", role: "Admin", status: "Active", lastLogin: "2 min ago" },
  { id: "2", name: "Diya Mehta", email: "diya@canteen.io", phone: "+91 90000 22222", role: "Staff", status: "Active", lastLogin: "15 min ago" },
  { id: "3", name: "Rohan Iyer", email: "rohan@students.edu", phone: "+91 90000 33333", role: "Customer", status: "Active", lastLogin: "1 h ago" },
  { id: "4", name: "Priya Nair", email: "priya@students.edu", phone: "+91 90000 44444", role: "Customer", status: "Suspended", lastLogin: "3 d ago" },
  { id: "5", name: "Ishaan Verma", email: "ishaan@canteen.io", phone: "+91 90000 55555", role: "Staff", status: "Active", lastLogin: "30 min ago" },
];

const initials = (n: string) =>
  n.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

export function UsersPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<"All" | UserRow["role"]>("All");

  const filtered = seed.filter(
    (u) =>
      (role === "All" || u.role === role) &&
      (u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage admin, staff and customer accounts." />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email"
            className="rounded-2xl bg-card pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["All", "Admin", "Staff", "Customer"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                role === r
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <Button className="rounded-2xl">
          <UserPlus className="mr-1.5 h-4 w-4" /> Invite user
        </Button>
      </div>

      <Card className="overflow-hidden border-border shadow-soft">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.id} className="transition-colors hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-gradient-primary text-xs font-semibold text-primary-foreground">
                            {initials(u.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded-full">
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell className="text-muted-foreground">{u.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={u.status === "Active" ? "default" : "destructive"}
                        className="rounded-full"
                      >
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.lastLogin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
