import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AuthGuard from "@/components/auth/AuthGuard";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
};

const AdminDashboardWithAuth = () => {
  return (
    <AuthGuard requiredRole="admin">
      <AdminDashboardPage />
    </AuthGuard>
  );
};

export default AdminDashboardWithAuth;
