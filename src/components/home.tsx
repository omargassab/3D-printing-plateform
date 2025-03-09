import React from "react";
import Header from "./layout/Header";
import HeroSection from "./home/HeroSection";
import ProductGrid from "./marketplace/ProductGrid";
import Footer from "./layout/Footer";
import { Button } from "./ui/button";
import { ArrowRight, Award, Truck, Users } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We connect designers, manufacturers, and customers in one
                seamless ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Designs</h3>
                <p className="text-gray-600">
                  Curated marketplace featuring high-quality 3D designs from
                  talented creators worldwide
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Reliable Fulfillment
                </h3>
                <p className="text-gray-600">
                  Professional 3D printing, quality control, and fast shipping
                  for all orders
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                <p className="text-gray-600">
                  Join our growing community of designers, dropshippers, and 3D
                  printing enthusiasts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => (window.location.href = "/marketplace")}
              >
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Limited Product Grid */}
            <div className="mb-8">
              <ProductGrid />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your 3D Printing Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you're a designer looking to sell your creations or a
              business seeking unique products, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => {
                  // Check if user is logged in, redirect to appropriate page
                  const user = localStorage.getItem("user");
                  if (user && JSON.parse(user).role === "designer") {
                    window.location.href = "/designer/dashboard";
                  } else {
                    window.location.href = "/signup";
                  }
                }}
              >
                Join as Designer
              </Button>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => (window.location.href = "/marketplace")}
              >
                Explore Marketplace
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
