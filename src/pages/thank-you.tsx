import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string;
    customerName: string;
    email: string;
    total: number;
  } | null>(null);

  useEffect(() => {
    // Get order details from location state or localStorage
    if (location.state?.orderDetails) {
      setOrderDetails(location.state.orderDetails);
    } else {
      // If no state, check localStorage for recent order
      const recentOrder = localStorage.getItem("recentOrder");
      if (recentOrder) {
        try {
          setOrderDetails(JSON.parse(recentOrder));
        } catch (error) {
          console.error("Error parsing recent order:", error);
          navigate("/");
        }
      } else {
        // No order details found, redirect to home
        navigate("/");
      }
    }
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-8 px-6 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold">Thank You for Your Order!</h1>
            <p className="mt-2 text-lg opacity-90">
              Your order has been received and is being processed.
            </p>
          </div>

          {orderDetails && (
            <div className="p-8">
              <div className="mb-8 border rounded-lg p-6 bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-medium">{orderDetails.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{orderDetails.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{orderDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">
                      {orderDetails.total.toFixed(2)} TND
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8 border rounded-lg p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Shipping Information
                  </h3>
                  <p className="text-gray-600 mt-1">
                    You will receive a confirmation email with tracking details
                    once your order ships. Estimated delivery time is 5-7
                    business days.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  If you have any questions about your order, please contact our
                  customer support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate("/marketplace")}
                    className="flex items-center"
                  >
                    Continue Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/profile")}
                  >
                    View My Orders
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
