import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminOrders from "@/components/admin/AdminOrders";
import AuthGuard from "@/components/auth/AuthGuard";

const AdminOrdersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <AdminOrders />
      </main>
      <Footer />
    </div>
  );
};

const AdminOrdersWithAuth = () => {
  return (
    <AuthGuard requiredRole="admin">
      <AdminOrdersPage />
    </AuthGuard>
  );
};

export default AdminOrdersWithAuth;
