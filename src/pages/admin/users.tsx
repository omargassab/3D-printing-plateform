import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminUsers from "@/components/admin/AdminUsers";
import AuthGuard from "@/components/auth/AuthGuard";

const AdminUsersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <AdminUsers />
      </main>
      <Footer />
    </div>
  );
};

const AdminUsersWithAuth = () => {
  return (
    <AuthGuard requiredRole="admin">
      <AdminUsersPage />
    </AuthGuard>
  );
};

export default AdminUsersWithAuth;
