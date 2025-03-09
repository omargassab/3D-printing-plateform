import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/marketplace/ProductDetail";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // In a real app, you would fetch product data based on the ID
  // For now, we'll just pass the ID to the component

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProductDetail id={id} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
