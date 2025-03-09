import React from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface ProductCardProps {
  id?: string;
  title?: string;
  designerName?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  isNew?: boolean;
  rating?: number;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  onFavorite?: () => void;
}

const ProductCard = ({
  id = "1",
  title = "3D Printed Vase Design",
  designerName = "Jane Designer",
  price = 29.99,
  imageUrl = "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&q=80",
  category = "Home Decor",
  isNew = false,
  rating = 4.5,
  onAddToCart = () => {},
  onViewDetails = () => (window.location.href = `/product/${id}`),
  onFavorite = () => console.log("Favorite clicked"),
}: ProductCardProps) => {
  // Product data for cart
  const product = {
    id,
    title,
    price,
    imageUrl,
    designerName,
  };
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden bg-white">
        <div className="relative">
          <div className="overflow-hidden aspect-square">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          {isNew && (
            <Badge
              variant="secondary"
              className="absolute top-2 left-2 bg-blue-500 text-white"
            >
              New
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
            onClick={onFavorite}
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </Button>
        </div>

        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-medium line-clamp-1">
              {title}
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">{designerName}</p>
        </CardHeader>

        <CardContent className="p-4 pt-2 flex-grow">
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="bg-gray-100 text-xs">
              {category}
            </Badge>
            {rating && (
              <div className="text-xs text-amber-500 flex items-center ml-2">
                ★ {rating.toFixed(1)}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="font-semibold">${price.toFixed(2)}</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={onViewDetails}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <AddToCartButton
              product={product}
              size="sm"
              className="rounded-full"
              text="Add"
              onAddToCart={onAddToCart}
            />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
