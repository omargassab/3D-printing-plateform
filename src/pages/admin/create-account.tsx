import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminAccount from "@/components/auth/AdminAccount";

const CreateAdminAccountPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <AdminAccount />
      </main>
      <Footer />
    </div>
  );
};

export default CreateAdminAccountPage;
