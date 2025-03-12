import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Grid, List, SlidersHorizontal, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  title: string;
  designerName: string;
  price: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  rating?: number;
}

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  designers: string[];
  materials: string[];
}

interface ProductGridProps {
  initialProducts?: Product[];
  className?: string;
}

const ProductGrid = ({
  initialProducts = [],
  className = "",
}: ProductGridProps) => {
  // Check for search query in URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlSearchQuery = urlParams.get("search") || "";

  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    designers: [],
    materials: [],
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>(urlSearchQuery);
  const productsPerPage = 8;

  // Initialize products and apply search if URL has search parameter
  useEffect(() => {
    if (products.length > 0) {
      console.log(
        `Initializing filtered products with ${products.length} products`,
      );
      setFilteredProducts(sortProducts(products, sortOption));
      setLoading(false);

      // Apply search if URL has search parameter
      if (urlSearchQuery) {
        handleSearch(urlSearchQuery);
      }
    }
  }, [products, urlSearchQuery]); // Update when products or URL search query changes

  // Initialize with mock products if none provided
  useEffect(() => {
    setLoading(false);
  }, []);

  // Mock products data if none provided - only run once on component mount
  useEffect(() => {
    if (initialProducts.length === 0) {
      console.log("Initializing mock products");
      const mockProducts: Product[] = [
        {
          id: "1",
          title: "Geometric Vase Design",
          designerName: "Youssef Ben Ali",
          price: 89.99,
          imageUrl:
            "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&q=80",
          category: "home-decor",
          isNew: true,
          rating: 4.8,
        },
        {
          id: "2",
          title: "Miniature Chess Set",
          designerName: "Leila Mansour",
          price: 149.99,
          imageUrl:
            "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=500&q=80",
          category: "toys",
          rating: 4.5,
        },
        {
          id: "3",
          title: "Smartphone Stand",
          designerName: "Mohamed Trabelsi",
          price: 59.99,
          imageUrl:
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
          category: "gadgets",
          isNew: true,
          rating: 4.2,
        },
        {
          id: "4",
          title: "Geometric Earrings",
          designerName: "Amira Belhaj",
          price: 104.99,
          imageUrl:
            "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&q=80",
          category: "jewelry",
          rating: 4.7,
        },
        {
          id: "5",
          title: "Desktop Planter",
          designerName: "Mehdi Khelifi",
          price: 74.99,
          imageUrl:
            "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
          category: "home-decor",
          rating: 4.4,
        },
        {
          id: "6",
          title: "Articulated Dragon",
          designerName: "Youssef Ben Ali",
          price: 119.99,
          imageUrl:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80",
          category: "figurines",
          rating: 4.9,
        },
        {
          id: "7",
          title: "Cable Organizer",
          designerName: "Nizar Chaabane",
          price: 44.99,
          imageUrl:
            "https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?w=500&q=80",
          category: "gadgets",
          rating: 4.1,
        },
        {
          id: "8",
          title: "Minimalist Bracelet",
          designerName: "Amira Belhaj",
          price: 89.99,
          imageUrl:
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
          category: "jewelry",
          isNew: true,
          rating: 4.6,
        },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts); // Initialize filtered products directly
    } else if (initialProducts.length > 0) {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts); // Initialize filtered products directly
    }
    setLoading(false);
  }, []); // Empty dependency array to run only once

  const handleFilterChange = (filters: FilterOptions) => {
    console.log("Filter change called with:", filters);

    // Make sure products are loaded before filtering
    if (products.length === 0) {
      console.log("No products to filter yet");
      return;
    }

    // Store the current filters in state
    setCurrentFilters(filters);

    let filtered = [...products];

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1],
    );

    // Filter by designers
    if (filters.designers.length > 0) {
      filtered = filtered.filter((product) => {
        const designerId = product.designerName
          .toLowerCase()
          .replace(/\s+/g, "-");
        return filters.designers.includes(designerId);
      });
    }

    // Apply sorting
    filtered = sortProducts(filtered, sortOption);

    // Reset to first page when filters change
    setCurrentPage(1);
    console.log(`Filtered products: ${filtered.length}`);
    setFilteredProducts(filtered);
  };

  // Function to handle search queries
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);

    if (!query.trim()) {
      // If search is empty, reset to filtered products based on current filters
      handleFilterChange({
        categories: [],
        priceRange: [0, 1000],
        designers: [],
        materials: [],
      });
      return;
    }

    const searchLower = query.toLowerCase();
    const searchResults = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchLower) ||
        product.designerName.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    });

    console.log(`Found ${searchResults.length} results for "${query}"`);

    // Apply current sort to search results
    const sortedResults = sortProducts(searchResults, sortOption);
    setFilteredProducts(sortedResults);
    setCurrentPage(1);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);

    // First apply the current filters to get the base filtered products
    let filtered = [...products];

    // Apply current filters
    if (currentFilters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        currentFilters.categories.includes(product.category),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= currentFilters.priceRange[0] &&
        product.price <= currentFilters.priceRange[1],
    );

    // Filter by designers
    if (currentFilters.designers.length > 0) {
      filtered = filtered.filter((product) => {
        const designerId = product.designerName
          .toLowerCase()
          .replace(/\s+/g, "-");
        return currentFilters.designers.includes(designerId);
      });
    }

    // Then apply the new sort to the filtered products
    const sorted = sortProducts(filtered, option);
    setFilteredProducts(sorted);
  };

  const sortProducts = (productsToSort: Product[], option: string) => {
    switch (option) {
      case "price-low":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "newest":
        return [...productsToSort].sort((a, b) =>
          a.isNew ? -1 : b.isNew ? 1 : 0,
        );
      case "rating":
        return [...productsToSort].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0),
        );
      case "featured":
      default:
        return productsToSort;
    }
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Controls */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold mr-2">Marketplace</h1>
                <span className="text-muted-foreground">
                  ({filteredProducts.length} products)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Search Bar */}
                <div className="w-full sm:w-auto">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch(searchQuery);
                    }}
                    className="relative w-full flex items-center"
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search for 3D designs..."
                      className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-primary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>

                {/* Sort Options */}
                <div className="hidden sm:block">
                  <Tabs
                    defaultValue="featured"
                    value={sortOption}
                    onValueChange={handleSortChange}
                    className="w-full max-w-[600px]"
                  >
                    <TabsList className="w-full justify-start flex-wrap">
                      <TabsTrigger value="featured">Featured</TabsTrigger>
                      <TabsTrigger value="newest">Newest</TabsTrigger>
                      <TabsTrigger value="price-low">
                        Price: Low to High
                      </TabsTrigger>
                      <TabsTrigger value="price-high">
                        Price: High to Low
                      </TabsTrigger>
                      <TabsTrigger value="rating">Top Rated</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Mobile Sort Dropdown */}
                <div className="sm:hidden">
                  <select
                    className="border rounded-md p-2 bg-background"
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex border rounded-md overflow-hidden ml-auto">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden"
                  onClick={toggleMobileFilters}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="md:hidden mb-6">
                <FilterSidebar
                  onFilterChange={handleFilterChange}
                  className="max-w-full border rounded-lg shadow-sm"
                />
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 rounded-lg h-[350px]"
                  ></div>
                ))}
              </div>
            ) : (
              <>
                {/* No Results */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No products found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your filters to find what you're looking
                      for.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Grid View */}
                    {viewMode === "grid" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts
                          .slice(
                            (currentPage - 1) * productsPerPage,
                            currentPage * productsPerPage,
                          )
                          .map((product) => (
                            <ProductCard
                              key={product.id}
                              id={product.id}
                              title={product.title}
                              designerName={product.designerName}
                              price={product.price}
                              imageUrl={product.imageUrl}
                              category={product.category}
                              isNew={product.isNew}
                              rating={product.rating}
                              onViewDetails={() =>
                                (window.location.href = `/product/${product.id}`)
                              }
                            />
                          ))}
                      </div>
                    )}

                    {/* List View */}
                    {viewMode === "list" && (
                      <div className="space-y-4">
                        {filteredProducts
                          .slice(
                            (currentPage - 1) * productsPerPage,
                            currentPage * productsPerPage,
                          )
                          .map((product) => (
                            <div
                              key={product.id}
                              className="flex flex-col sm:flex-row border rounded-lg overflow-hidden bg-white"
                            >
                              <div className="sm:w-48 h-48">
                                <img
                                  src={product.imageUrl}
                                  alt={product.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 p-4 flex flex-col justify-between">
                                <div>
                                  <h3 className="text-lg font-medium">
                                    {product.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {product.designerName}
                                  </p>
                                  {product.rating && (
                                    <div className="text-sm text-amber-500 mt-1">
                                      ★ {product.rating.toFixed(1)}
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                  <span className="font-bold text-lg">
                                    {product.price.toFixed(2)} TND
                                  </span>
                                  <div className="space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        (window.location.href = `/product/${product.id}`)
                                      }
                                    >
                                      View Details
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        const product = filteredProducts.find(
                                          (p) => p.id === product.id,
                                        );
                                        if (product) {
                                          addItem({
                                            id: product.id,
                                            title: product.title,
                                            price: product.price,
                                            imageUrl: product.imageUrl,
                                            designerName: product.designerName,
                                          });
                                        }
                                      }}
                                    >
                                      Add to Cart
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    &lt;
                  </Button>

                  {/* Generate page buttons */}
                  {Array.from(
                    {
                      length: Math.min(
                        5,
                        Math.ceil(filteredProducts.length / productsPerPage),
                      ),
                    },
                    (_, i) => {
                      // For simplicity, show first 5 pages
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="icon"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    },
                  )}

                  {/* Show ellipsis if there are more pages */}
                  {Math.ceil(filteredProducts.length / productsPerPage) > 5 && (
                    <span className="mx-1">...</span>
                  )}

                  {/* Show last page if there are more than 5 pages */}
                  {Math.ceil(filteredProducts.length / productsPerPage) > 5 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setCurrentPage(
                          Math.ceil(filteredProducts.length / productsPerPage),
                        )
                      }
                    >
                      {Math.ceil(filteredProducts.length / productsPerPage)}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    disabled={
                      currentPage ===
                      Math.ceil(filteredProducts.length / productsPerPage)
                    }
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(filteredProducts.length / productsPerPage),
                        ),
                      )
                    }
                  >
                    &gt;
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
