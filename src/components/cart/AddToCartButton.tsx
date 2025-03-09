import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    designerName: string;
  };
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  text?: string;
  onAddToCart?: () => void;
}

const AddToCartButton = ({
  product,
  variant = "default",
  size = "default",
  className = "",
  showIcon = true,
  text = "Add to Cart",
  onAddToCart,
}: AddToCartButtonProps) => {
  const { addItem } = useCart();

  const handleClick = () => {
    // Add item to cart using context
    // This will automatically update localStorage via the useEffect in CartContext
    addItem(product);

    // Call optional callback
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
      {text}
    </Button>
  );
};

export default AddToCartButton;
