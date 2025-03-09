import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";

const CheckoutPage = () => {
  const { items, totalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(true);

  // Force load from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log("Checkout directly loading from localStorage:", parsedCart);
        // If we have items in localStorage but not in context, reload the page
        if (items.length === 0 && parsedCart.length > 0) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error parsing cart in checkout:", error);
      }
    }
  }, [items]);

  // No redirects, just show empty cart UI if needed
  const cartIsEmpty = items.length === 0;

  // Log cart items for debugging
  console.log("Checkout page cart items:", items);

  if (cartIsEmpty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
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
    </div>
  );
};

export default CheckoutPage;
