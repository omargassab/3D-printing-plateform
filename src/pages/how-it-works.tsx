import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Upload, ShoppingBag, Printer, Truck, CheckCircle } from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Our platform connects designers, dropshippers, and customers in a
              seamless ecosystem for 3D printed products.
            </p>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Process</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From design to delivery, we handle the entire process to ensure
                quality products and happy customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Design Upload</h3>
                <p className="text-gray-600">
                  Designers upload their 3D models to our platform and set
                  pricing and customization options.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Printer className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Production</h3>
                <p className="text-gray-600">
                  When an order is placed, we print the design with high-quality
                  materials and strict quality control.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Delivery</h3>
                <p className="text-gray-600">
                  We package and ship the finished product directly to the
                  customer with your branding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Designers */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80"
                  alt="Designer working on 3D model"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">For Designers</h2>
                <p className="text-lg mb-6">
                  Focus on what you do best - creating amazing 3D designs. We
                  handle the printing, fulfillment, and customer service so you
                  can scale your business without the overhead.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <p>Upload your designs and set your prices</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <p>Earn royalties on every sale</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <p>No inventory or equipment needed</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <p>Build your brand and following</p>
                  </div>
                </div>

                <Button
                  className="mt-8"
                  onClick={() => (window.location.href = "/signup")}
                >
                  <Upload className="mr-2 h-4 w-4" /> Join as Designer
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* For Dropshippers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="Dropshipper managing online store"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">For Dropshippers</h2>
                <p className="text-lg mb-6">
                  Launch your own 3D print store without inventory or production
                  concerns. Select products from our marketplace, set your
                  margins, and we'll handle the rest.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <p>Zero inventory investment</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <p>White-label shipping with your branding</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <p>Set your own prices and profit margins</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <p>Automated order processing</p>
                  </div>
                </div>

                <Button
                  className="mt-8"
                  onClick={() => (window.location.href = "/signup")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Start Dropshipping
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What materials do you use for printing?
                </h3>
                <p className="text-gray-600">
                  We offer a variety of materials including PLA, PETG, ABS,
                  Resin, and Nylon. Each material has different properties
                  suitable for different applications and designs.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  How long does production and shipping take?
                </h3>
                <p className="text-gray-600">
                  Production typically takes 2-5 business days depending on the
                  complexity of the design and current order volume. Shipping
                  times vary by location, but we offer standard (5-7 days) and
                  express (2-3 days) options.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What commission do designers earn?
                </h3>
                <p className="text-gray-600">
                  Designers earn 70% of the base price they set for their
                  designs. For example, if you set a base price of $20, you'll
                  earn $14 for each sale, regardless of any additional markup
                  added by dropshippers.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Can I sell designs from other platforms?
                </h3>
                <p className="text-gray-600">
                  Yes, as long as you own the rights to the design or have
                  permission to sell it. You must have the legal right to
                  distribute and commercialize any design you upload to our
                  platform.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  How do returns and refunds work?
                </h3>
                <p className="text-gray-600">
                  We offer a 30-day return policy for items that are defective
                  or damaged during shipping. Custom or personalized items
                  cannot be returned unless there is a defect. Refunds are
                  processed within 5-7 business days.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg mb-4">Still have questions?</p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our growing community of designers and dropshippers today and
              start earning with 3D printing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => (window.location.href = "/signup")}
              >
                Create an Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => (window.location.href = "/marketplace")}
              >
                Browse Marketplace
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
