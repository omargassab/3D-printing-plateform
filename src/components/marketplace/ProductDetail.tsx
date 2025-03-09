import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface ProductDetailProps {
  id?: string;
  title?: string;
  designerName?: string;
  price?: number;
  images?: string[];
  description?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  materials?: string[];
  dimensions?: { width: number; height: number; depth: number };
  printTime?: number;
  isCustomizable?: boolean;
  onAddToCart?: () => void;
}

// Product catalog for the entire marketplace
const productCatalog = [
  {
    id: "1",
    title: "Geometric Vase Design",
    designerName: "Alex Smith",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80",
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80&fit=crop&auto=format&dpr=2",
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80&fit=crop&auto=format&dpr=2",
    ],
    description:
      "This elegant geometric vase features a modern design with intricate patterns that catch the light beautifully. Perfect for displaying flowers or as a standalone decorative piece in any contemporary home.",
    category: "Home Decor",
    rating: 4.8,
    reviewCount: 24,
    materials: ["PLA", "PETG", "Resin"],
    dimensions: { width: 10, height: 20, depth: 10 },
    printTime: 8,
    isCustomizable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&q=80",
  },
  {
    id: "2",
    title: "Miniature Chess Set",
    designerName: "Maria Jones",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&q=80",
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&q=80&fit=crop&auto=format&dpr=2",
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&q=80&fit=crop&auto=format&dpr=2",
    ],
    description:
      "A beautifully crafted miniature chess set with detailed pieces. Perfect for travel or as a decorative item for chess enthusiasts. Each piece is carefully designed for both aesthetics and functionality.",
    category: "Toys",
    rating: 4.5,
    reviewCount: 18,
    materials: ["PLA", "Resin"],
    dimensions: { width: 15, height: 2, depth: 15 },
    printTime: 12,
    isCustomizable: false,
    imageUrl:
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=500&q=80",
  },
  {
    id: "3",
    title: "Smartphone Stand",
    designerName: "David Chen",
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80&fit=crop&auto=format&dpr=2",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80&fit=crop&auto=format&dpr=2",
    ],
    description:
      "A practical and stylish smartphone stand that holds your device at the perfect viewing angle. Great for video calls, watching content, or following recipes in the kitchen.",
    category: "Gadgets",
    rating: 4.2,
    reviewCount: 32,
    materials: ["PLA", "PETG", "ABS"],
    dimensions: { width: 8, height: 12, depth: 8 },
    printTime: 4,
    isCustomizable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
  },
  {
    id: "4",
    title: "Geometric Earrings",
    designerName: "Sarah Patel",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80&fit=crop&auto=format&dpr=2",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80&fit=crop&auto=format&dpr=2",
    ],
    description:
      "Elegant geometric earrings that make a statement. These lightweight earrings combine modern design with comfortable wearability, perfect for both casual and formal occasions.",
    category: "Jewelry",
    rating: 4.7,
    reviewCount: 15,
    materials: ["Resin", "Nylon"],
    dimensions: { width: 2, height: 5, depth: 0.5 },
    printTime: 3,
    isCustomizable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&q=80",
  },
  {
    id: "5",
    title: "Desktop Planter",
    designerName: "James Wilson",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80&fit=crop&auto=format&dpr=2",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80&fit=crop&auto=format&dpr=2",
    ],
    description:
      "A stylish desktop planter perfect for small succulents or air plants. Adds a touch of nature to your workspace or home office. Features a water reservoir for easy plant maintenance.",
    category: "Home Decor",
    rating: 4.4,
    reviewCount: 22,
    materials: ["PLA", "PETG"],
    dimensions: { width: 8, height: 10, depth: 8 },
    printTime: 6,
    isCustomizable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
  },
  {
    id: "6",
    title: "Articulated Dragon",
    designerName: "Alex Smith",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&q=80",
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&q=80&fit=crop&auto=format&dpr=2",
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&q=80&fit=crop&auto=format&dpr=2",
    ],
    description:
      "An impressive articulated dragon figure with movable joints. This detailed model is perfect for display or play, featuring intricate scales and realistic design elements.",
    category: "Figurines",
    rating: 4.9,
    reviewCount: 28,
    materials: ["PLA", "PETG", "Resin"],
    dimensions: { width: 15, height: 10, depth: 25 },
    printTime: 14,
    isCustomizable: false,
    imageUrl:
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80",
  },
  {
    id: "7",
    title: "Cable Organizer",
    designerName: "David Chen",
    price: 14.99,
    images: [
      "https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?w=800&q=80",
      "https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?w=800&q=80&fit=crop&auto=format&dpr=2",
      "https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?w=800&q=80&fit=crop&auto=format&dpr=2",
    ],
    description:
      "A practical cable organizer to keep your desk tidy and cables neatly arranged. This simple solution prevents tangling and makes it easy to identify and access different cables.",
    category: "Gadgets",
    rating: 4.1,
    reviewCount: 19,
    materials: ["PLA", "ABS"],
    dimensions: { width: 5, height: 2, depth: 5 },
    printTime: 3,
    isCustomizable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?w=500&q=80",
  },
  {
    id: "8",
    title: "Minimalist Bracelet",
    designerName: "Sarah Patel",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80&fit=crop&auto=format&dpr=2",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80&fit=crop&auto=format&dpr=2",
    ],
    description:
      "A sleek minimalist bracelet with a modern design. Lightweight and comfortable for everyday wear, this bracelet adds a subtle touch of style to any outfit.",
    category: "Jewelry",
    rating: 4.6,
    reviewCount: 12,
    materials: ["Nylon", "Resin"],
    dimensions: { width: 6, height: 1, depth: 6 },
    printTime: 2,
    isCustomizable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
  },
];

// Function to get related products based on current product ID
const getRelatedProducts = (currentId: string) => {
  // Find the current product
  const currentProduct = productCatalog.find((p) => p.id === currentId);
  if (!currentProduct) return [];

  // Get products in the same category
  const sameCategory = productCatalog.filter(
    (p) => p.id !== currentId && p.category === currentProduct.category,
  );

  // Get products by the same designer
  const sameDesigner = productCatalog.filter(
    (p) =>
      p.id !== currentId &&
      p.designerName === currentProduct.designerName &&
      p.category !== currentProduct.category,
  );

  // Combine and limit to 4 products
  const related = [...sameCategory, ...sameDesigner];
  return related.slice(0, 4);
};

// Function to get product details by ID
const getProductById = (productId: string) => {
  return productCatalog.find((p) => p.id === productId) || productCatalog[0];
};

const ProductDetail = ({
  id = "1",
  title,
  designerName,
  price,
  images,
  description,
  category,
  rating,
  reviewCount,
  materials,
  dimensions,
  printTime,
  isCustomizable,
  onAddToCart = () => {},
}: ProductDetailProps) => {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Load product details based on ID
  const [productDetails, setProductDetails] = useState(getProductById(id));

  useEffect(() => {
    // Update product details when ID changes
    setProductDetails(getProductById(id));
  }, [id]);

  // Use provided props or fall back to product details
  const productTitle = title || productDetails.title;
  const productDesignerName = designerName || productDetails.designerName;
  const productPrice = price || productDetails.price;
  const productImages = images || productDetails.images;
  const productDescription = description || productDetails.description;
  const productCategory = category || productDetails.category;
  const productRating = rating || productDetails.rating;
  const productReviewCount = reviewCount || productDetails.reviewCount;
  const productMaterials = materials || productDetails.materials;
  const productDimensions = dimensions || productDetails.dimensions;
  const productPrintTime = printTime || productDetails.printTime;
  const productIsCustomizable =
    isCustomizable !== undefined
      ? isCustomizable
      : productDetails.isCustomizable;

  const [selectedMaterial, setSelectedMaterial] = useState(productMaterials[0]);
  const [selectedColor, setSelectedColor] = useState("White");

  // Product data for cart
  const product = {
    id,
    title: productTitle,
    price: productPrice,
    imageUrl: productImages[0],
    designerName: productDesignerName,
  };

  const colors = ["White", "Black", "Blue", "Green", "Red"];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-white">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={productImages[selectedImage]}
                alt={productTitle}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === index ? "border-primary" : "border-transparent"}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${productTitle} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Badge variant="outline" className="mr-2">
                  {productCategory}
                </Badge>
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(productRating) ? "fill-amber-500" : "fill-gray-200"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {productRating} ({productReviewCount} reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">{productTitle}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                Designed by {productDesignerName}
              </p>
              <p className="text-2xl font-semibold mb-6">
                ${productPrice.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6">{productDescription}</p>
            </div>

            <Separator className="my-6" />

            {/* Customization Options */}
            <div className="space-y-6">
              {/* Material Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">Material</h3>
                <div className="flex flex-wrap gap-2">
                  {productMaterials.map((material) => (
                    <Button
                      key={material}
                      variant={
                        selectedMaterial === material ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedMaterial(material)}
                    >
                      {material}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color ? "border-primary" : "border-transparent"}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center w-32">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="mx-2 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <AddToCartButton
                  product={product}
                  size="lg"
                  className="flex-1"
                  onAddToCart={onAddToCart}
                />
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Specs */}
            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-gray-500" />
                  <span>
                    Dimensions: {productDimensions.width}cm ×{" "}
                    {productDimensions.height}cm × {productDimensions.depth}cm
                  </span>
                </div>
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Print Time: ~{productPrintTime} hours</span>
                </div>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="mt-8 space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">Free shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">Quality Guarantee</p>
                  <p className="text-sm text-gray-600">
                    Satisfaction guaranteed
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-gray-600">30 day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <div className="prose max-w-none">
                <p>{productDescription}</p>
                <p>
                  This product is designed to be both functional and
                  aesthetically pleasing, making it a perfect addition to any
                  modern home. The geometric patterns create interesting shadows
                  when placed near a light source.
                </p>
                <h3>Features:</h3>
                <ul>
                  <li>Modern geometric design</li>
                  <li>Available in multiple materials and colors</li>
                  <li>Lightweight yet durable</li>
                  <li>Perfect size for desks, shelves, or tables</li>
                  <li>Makes an excellent gift</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Product Specifications
                  </h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Dimensions</td>
                        <td className="py-2">
                          {productDimensions.width}cm ×{" "}
                          {productDimensions.height}cm ×{" "}
                          {productDimensions.depth}cm
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Weight</td>
                        <td className="py-2">150g (varies by material)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Materials</td>
                        <td className="py-2">{productMaterials.join(", ")}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Print Time</td>
                        <td className="py-2">~{productPrintTime} hours</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Customizable</td>
                        <td className="py-2">
                          {productIsCustomizable ? "Yes" : "No"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Material Properties
                  </h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">PLA</td>
                        <td className="py-2">
                          Biodegradable, rigid, good for detailed prints
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">PETG</td>
                        <td className="py-2">
                          Durable, water-resistant, flexible
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Resin</td>
                        <td className="py-2">
                          Smooth finish, highly detailed, more brittle
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(productRating) ? "fill-amber-500" : "fill-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {productRating} out of 5 ({productReviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "fill-amber-500" : "fill-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">Beautiful Design</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      by Jane D. on May 15, 2023
                    </p>
                    <p>
                      This vase is absolutely stunning! The geometric patterns
                      catch the light beautifully and it's the perfect size for
                      my desk. I ordered it in white PLA and the print quality
                      is excellent.
                    </p>
                  </div>

                  <div className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-amber-500" : "fill-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">Great Quality</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      by Michael T. on April 3, 2023
                    </p>
                    <p>
                      I'm very impressed with the quality of this print. The
                      design is unique and modern, and it looks great on my
                      bookshelf. I would have given 5 stars but shipping took a
                      bit longer than expected.
                    </p>
                  </div>

                  <div className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "fill-amber-500" : "fill-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">Perfect Gift</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      by Sarah L. on March 22, 2023
                    </p>
                    <p>
                      I bought this as a gift for my design-loving friend and
                      she absolutely loved it! The blue PETG material has a
                      beautiful translucent quality. Will definitely be ordering
                      more items from this designer.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="py-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Shipping Information
                  </h3>
                  <p>We offer the following shipping options:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Standard Shipping (5-7 business days): $4.99</li>
                    <li>Express Shipping (2-3 business days): $9.99</li>
                    <li>Free standard shipping on all orders over $50</li>
                  </ul>
                  <p className="mt-3">
                    Please note that shipping times may vary based on your
                    location and the current order volume. All items are printed
                    on demand after your order is placed.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Return Policy</h3>
                  <p>
                    We want you to be completely satisfied with your purchase.
                    If for any reason you're not happy with your order, we offer
                    a 30-day return policy under the following conditions:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Items must be returned in their original condition</li>
                    <li>
                      Custom or personalized items cannot be returned unless
                      there is a defect
                    </li>
                    <li>Buyer is responsible for return shipping costs</li>
                    <li>
                      Refunds will be processed within 5-7 business days after
                      we receive the returned item
                    </li>
                  </ul>
                  <p className="mt-3">
                    To initiate a return, please contact our customer support
                    team with your order number and reason for return.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getRelatedProducts(id).map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden bg-white"
              >
                <div className="aspect-square">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate">{product.title}</h3>
                  <p className="text-sm text-gray-600">
                    {product.designerName}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        (window.location.href = `/product/${product.id}`)
                      }
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
