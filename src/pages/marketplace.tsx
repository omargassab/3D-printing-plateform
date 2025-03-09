import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/marketplace/ProductGrid";

const MarketplacePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default MarketplacePage;
