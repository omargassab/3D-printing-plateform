import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  HelpCircle,
  FileText,
  MessageCircle,
  Book,
  ShoppingCart,
  Printer,
  Truck,
} from "lucide-react";

const HelpPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions and learn how to get the most out
              of our 3D printing marketplace
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for help articles..."
                  className="pl-10 py-6 text-lg"
                />
              </div>
            </div>
          </div>

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold">Getting Started</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Learn the basics of our platform and how to create your
                  account
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="text-primary hover:underline cursor-pointer">
                    Creating an account
                  </li>
                  <li className="text-primary hover:underline cursor-pointer">
                    Setting up your profile
                  </li>
                  <li className="text-primary hover:underline cursor-pointer">
                    Platform overview
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  View All Articles
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Book className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold">For Designers</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Everything you need to know about selling your 3D designs
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="text-primary hover:underline cursor-pointer">
                    Uploading designs
                  </li>
                  <li className="text-primary hover:underline cursor-pointer">
                    Setting prices
                  </li>
                  <li className="text-primary hover:underline cursor-pointer">
                    Getting paid
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  View All Articles
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold">For Dropshippers</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Learn how to resell 3D printed products without inventory
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="text-primary hover:underline cursor-pointer">
                    Setting up your store
                  </li>
                  <li className="text-primary hover:underline cursor-pointer">
                    Managing orders
                  </li>
                  <li className="text-primary hover:underline cursor-pointer">
                    Customizing products
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  View All Articles
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Popular Help Topics */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Popular Help Topics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Printer className="h-5 w-5 mr-2 text-primary" />
                    3D Printing Materials
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn about the different materials we offer for 3D printing
                  </p>
                  <ul className="space-y-2">
                    <li className="text-primary hover:underline cursor-pointer">
                      PLA vs. PETG: Which to choose?
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Working with resin prints
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Material properties comparison
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Material-specific design guidelines
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-primary" />
                    Orders & Shipping
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Information about ordering, shipping, and delivery
                  </p>
                  <ul className="space-y-2">
                    <li className="text-primary hover:underline cursor-pointer">
                      Tracking your order
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Shipping options and timeframes
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      International shipping information
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Returns and exchanges
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                    Account & Billing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Manage your account settings and payment information
                  </p>
                  <ul className="space-y-2">
                    <li className="text-primary hover:underline cursor-pointer">
                      Updating your payment methods
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Subscription management
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Invoice and receipt access
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Account security best practices
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                    Troubleshooting
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Solutions for common issues and technical problems
                  </p>
                  <ul className="space-y-2">
                    <li className="text-primary hover:underline cursor-pointer">
                      File upload errors
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Payment processing issues
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Order status not updating
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      Website accessibility problems
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Contact Support */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is ready to
              assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/contact")}
                className="flex-1 max-w-xs mx-auto"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/faq")}
                className="flex-1 max-w-xs mx-auto"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                View FAQ
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;
