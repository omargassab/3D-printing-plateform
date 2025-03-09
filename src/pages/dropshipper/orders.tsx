import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DropshipperOrders from "@/components/dropshipper/DropshipperOrders";
import AuthGuard from "@/components/auth/AuthGuard";

const DropshipperOrdersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <DropshipperOrders />
      </main>
      <Footer />
    </div>
  );
};

const DropshipperOrdersWithAuth = () => {
  return (
    <AuthGuard requiredRole="dropshipper">
      <DropshipperOrdersPage />
    </AuthGuard>
  );
};

export default DropshipperOrdersWithAuth;
