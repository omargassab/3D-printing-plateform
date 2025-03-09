import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CheckoutPage = () => {
  const { items, totalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Force load from localStorage and sessionStorage on component mount
  useEffect(() => {
    // First check localStorage
    const savedCart = localStorage.getItem("cart");
    // Then check sessionStorage as backup
    const tempCart = sessionStorage.getItem("tempCart");

    let parsedCart = [];
    let cartSource = null;

    // Try localStorage first
    if (savedCart) {
      try {
        parsedCart = JSON.parse(savedCart);
        cartSource = "localStorage";
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }

    // If localStorage failed or was empty, try sessionStorage
    if ((!parsedCart || parsedCart.length === 0) && tempCart) {
      try {
        parsedCart = JSON.parse(tempCart);
        cartSource = "sessionStorage";
        // Restore to localStorage
        localStorage.setItem("cart", tempCart);
      } catch (error) {
        console.error("Error parsing cart from sessionStorage:", error);
      }
    }

    console.log(`Checkout loading from ${cartSource}:`, parsedCart);

    // Don't force reload to prevent refresh loops
    if (items.length === 0 && parsedCart && parsedCart.length > 0) {
      console.log("Items in storage but not in context - not forcing reload");
      // Just clear the temp storage
      sessionStorage.removeItem("tempCart");
    }

    // Clear temp cart after successful load
    sessionStorage.removeItem("tempCart");
    setIsLoading(false);
  }, [items]);

  // No redirects, just show empty cart UI if needed
  const cartIsEmpty = items.length === 0;

  // Log cart items for debugging
  console.log("Checkout page cart items:", items);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartIsEmpty) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart before proceeding to checkout
            </p>
            <Button onClick={() => (window.location.href = "/marketplace")}>
              Browse Marketplace
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12 px-4">
        {showCheckout ? (
          <CheckoutForm onBack={() => setShowCheckout(false)} />
        ) : (
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Your Cart</h1>
              <p className="text-muted-foreground mt-1">
                Review your items before checkout
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.designerName}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm">Quantity: {item.quantity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={() => setShowCheckout(true)}>
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/marketplace")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
