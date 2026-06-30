import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/common/Spinner";
import { ProtectedAppShell } from "@/auth/ProtectedAppShell";

const DashboardPage = lazy(() => import("@/pages/Dashboard").then((m) => ({ default: m.DashboardPage })));
const OrdersPage = lazy(() => import("@/pages/Orders").then((m) => ({ default: m.OrdersPage })));
const MenuPage = lazy(() => import("@/pages/MenuPerformance").then((m) => ({ default: m.MenuPage })));
const PaymentsPage = lazy(() => import("@/pages/Payments").then((m) => ({ default: m.PaymentsPage })));
const RevenueAnalyticsPage = lazy(() => import("@/pages/RevenueAnalytics").then((m) => ({ default: m.RevenueAnalyticsPage })));
const UsersPage = lazy(() => import("@/pages/Users").then((m) => ({ default: m.UsersPage })));
const ProfilePage = lazy(() => import("@/pages/Profile").then((m) => ({ default: m.ProfilePage })));
const NotFoundPage = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFoundPage })));
const LoginPage = lazy(() => import("@/pages/auth/Login").then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPassword").then((m) => ({ default: m.ForgotPasswordPage })));

function PageFallback() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <Spinner />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<ProtectedAppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/analytics" element={<RevenueAnalyticsPage />} />
          <Route path="/revenue" element={<Navigate to="/analytics" replace />} />
          <Route path="/inventory" element={<Navigate to="/" replace />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
