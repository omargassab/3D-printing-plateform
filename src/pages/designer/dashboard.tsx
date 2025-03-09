import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DesignerDashboard from "@/components/designer/DesignerDashboard";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";

const DesignerDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <DesignerDashboard />
      </main>
      <Footer />
    </div>
  );
};

const DesignerDashboardWithAuth = () => {
  return (
    <AuthGuard requiredRole="designer">
      <DesignerDashboardPage />
    </AuthGuard>
  );
};

export default DesignerDashboardWithAuth;
