import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DesignerDesignsPage from "@/components/designer/DesignerDesigns";
import AuthGuard from "@/components/auth/AuthGuard";

const DesignerDesignsPageWrapper = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <DesignerDesignsPage />
      </main>
      <Footer />
    </div>
  );
};

const DesignerDesignsWithAuth = () => {
  return (
    <AuthGuard requiredRole="designer">
      <DesignerDesignsPageWrapper />
    </AuthGuard>
  );
};

export default DesignerDesignsWithAuth;
