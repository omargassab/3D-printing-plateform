import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useNotifications } from "@/context/NotificationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Truck, CheckCircle2 } from "lucide-react";
import { createOrder } from "@/api/orders";
import { supabase } from "@/lib/supabase";

interface CheckoutFormProps {
  onBack: () => void;
}

const CheckoutForm = ({ onBack }: CheckoutFormProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const { addNotification } = useNotifications();
  // Store items in local state to prevent issues when cart is cleared
  const [orderItems, setOrderItems] = useState(items);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
    saveInfo: true,
  });
  const [formStep, setFormStep] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update orderItems when items change (before order completion)
  useEffect(() => {
    if (!orderComplete) {
      setOrderItems(items);
    }
  }, [items, orderComplete]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (
      formData.phone &&
      !/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Generate a local order number for guest users
      const localOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

      // Prepare order data for API
      const orderData = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingState: formData.state,
        shippingZip: formData.zipCode,
        shippingMethod: "standard",
        notes: formData.notes,
        items: items.map((item) => ({
          designId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      // Always use the API to create the order, regardless of authentication status
      let result;
      try {
        // Create the order using the API
        result = await createOrder(orderData);
        console.log("Order created successfully:", result);
      } catch (error) {
        console.error("Error creating order with API:", error);
        // Fallback to local order number if API fails
        result = { success: true, orderNumber: localOrderNumber };
        console.log("Fallback to local order:", orderData);
      }

      if (result.success) {
        // Store items before clearing cart
        setOrderItems([...items]);
        setOrderNumber(result.orderNumber);
        setOrderComplete(true);

        // Clear cart after order is complete
        clearCart();
        localStorage.removeItem("cart");
        sessionStorage.removeItem("tempCart");

        // Add notification
        addNotification({
          title: "Order Confirmed",
          message: `Your order ${result.orderNumber} has been placed successfully.`,
          type: "order",
        });

        // Save order details to localStorage for thank you page
        const orderDetails = {
          orderNumber: result.orderNumber,
          customerName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          total: orderItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          ),
        };
        localStorage.setItem("recentOrder", JSON.stringify(orderDetails));

        // Navigate to thank you page
        window.location.href = "/thank-you";
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Your order has been placed successfully
          </p>
        </div>

        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
          <p className="font-medium">
            Order Number: <span className="text-primary">{orderNumber}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Please keep this number for your reference
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-medium">Order Summary</h2>
          <div className="space-y-2">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.quantity} × {item.title}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>
                $
                {orderItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-medium">Delivery Information</h2>
          <div className="space-y-1 text-sm">
            <p>
              {formData.firstName} {formData.lastName}
            </p>
            <p>{formData.address}</p>
            <p>
              {formData.city}, {formData.state} {formData.zipCode}
            </p>
            <p>{formData.phone}</p>
            <p>{formData.email}</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-blue-50 rounded-lg mb-6">
          <Truck className="h-5 w-5 text-blue-500 mr-2" />
          <div>
            <p className="font-medium">Cash on Delivery</p>
            <p className="text-sm text-muted-foreground">
              Payment will be collected upon delivery
            </p>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => (window.location.href = "/thank-you")}
        >
          View Order Details
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-muted-foreground mt-1">
          Complete your order with Cash on Delivery
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Order Summary</h2>
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.quantity} × {item.title}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Delivery Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name*</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name*</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number*</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address*</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City*</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province*</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? "border-red-500" : ""}
              />
              {errors.state && (
                <p className="text-xs text-red-500">{errors.state}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP/Postal Code*</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={errors.zipCode ? "border-red-500" : ""}
            />
            {errors.zipCode && (
              <p className="text-xs text-red-500">{errors.zipCode}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Special instructions for delivery"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="saveInfo"
              checked={formData.saveInfo}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  saveInfo: checked as boolean,
                }))
              }
            />
            <Label
              htmlFor="saveInfo"
              className="text-sm font-normal cursor-pointer"
            >
              Save this information for next time
            </Label>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-muted-foreground">
                Payment will be collected upon delivery
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
