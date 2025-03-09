import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthGuard from "@/components/auth/AuthGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
} from "lucide-react";

const DropshipperProductsPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("all");

  // Mock products data
  const products = [
    {
      id: "1",
      title: "Geometric Vase Design",
      designerName: "Alex Smith",
      originalPrice: 29.99,
      yourPrice: 39.99,
      profit: 10.0,
      category: "home-decor",
      imageUrl:
        "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&q=80",
      active: true,
      sales: 12,
    },
    {
      id: "2",
      title: "Miniature Chess Set",
      designerName: "Maria Jones",
      originalPrice: 49.99,
      yourPrice: 69.99,
      profit: 20.0,
      category: "toys",
      imageUrl:
        "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=500&q=80",
      active: true,
      sales: 8,
    },
    {
      id: "3",
      title: "Smartphone Stand",
      designerName: "David Chen",
      originalPrice: 19.99,
      yourPrice: 29.99,
      profit: 10.0,
      category: "gadgets",
      imageUrl:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
      active: true,
      sales: 24,
    },
    {
      id: "4",
      title: "Geometric Earrings",
      designerName: "Sarah Patel",
      originalPrice: 34.99,
      yourPrice: 49.99,
      profit: 15.0,
      category: "jewelry",
      imageUrl:
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&q=80",
      active: false,
      sales: 0,
    },
  ];

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (filterCategory !== "all" && product.category !== filterCategory) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !(
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.designerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Products</h1>
              <p className="text-muted-foreground">
                Manage your dropshipping product catalog
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Product
              </Button>
            </div>
          </div>

          {/* Product Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Products
                    </p>
                    <h3 className="text-2xl font-bold">{products.length}</h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Products
                    </p>
                    <h3 className="text-2xl font-bold">
                      {products.filter((p) => p.active).length}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <h3 className="text-2xl font-bold">
                      {products.reduce((sum, p) => sum + p.sales, 0)}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Products</CardTitle>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10 w-full sm:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      className="border rounded-md p-2 text-sm bg-background"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="home-decor">Home Decor</option>
                      <option value="gadgets">Gadgets</option>
                      <option value="jewelry">Jewelry</option>
                      <option value="toys">Toys</option>
                      <option value="figurines">Figurines</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="all-products">
                <TabsList className="mb-4">
                  <TabsTrigger value="all-products">All Products</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>

                <TabsContent value="all-products">
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No products found</h3>
                      <p className="text-muted-foreground mt-2">
                        {searchQuery
                          ? "Try a different search term"
                          : "No products match the selected filters"}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                          <div className="aspect-square relative">
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                            <Badge
                              className={`absolute top-2 right-2 ${product.active ? "bg-green-500" : "bg-gray-500"}`}
                            >
                              {product.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium truncate">
                              {product.title}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {product.designerName}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Your price:
                                </p>
                                <p className="font-bold">
                                  ${product.yourPrice.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">
                                  Profit:
                                </p>
                                <p className="font-medium text-green-600">
                                  ${product.profit.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm">
                                <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3.5 w-3.5 mr-1" /> View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="active">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts
                      .filter((product) => product.active)
                      .map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                          <div className="aspect-square relative">
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-2 right-2 bg-green-500">
                              Active
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium truncate">
                              {product.title}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {product.designerName}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Your price:
                                </p>
                                <p className="font-bold">
                                  ${product.yourPrice.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">
                                  Profit:
                                </p>
                                <p className="font-medium text-green-600">
                                  ${product.profit.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm">
                                <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3.5 w-3.5 mr-1" /> View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="inactive">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts
                      .filter((product) => !product.active)
                      .map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                          <div className="aspect-square relative">
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-2 right-2 bg-gray-500">
                              Inactive
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium truncate">
                              {product.title}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {product.designerName}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Your price:
                                </p>
                                <p className="font-bold">
                                  ${product.yourPrice.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">
                                  Profit:
                                </p>
                                <p className="font-medium text-green-600">
                                  ${product.profit.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm">
                                <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3.5 w-3.5 mr-1" /> View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const DropshipperProductsWithAuth = () => {
  return (
    <AuthGuard requiredRole="dropshipper">
      <DropshipperProductsPage />
    </AuthGuard>
  );
};

export default DropshipperProductsWithAuth;
