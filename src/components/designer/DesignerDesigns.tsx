import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const DesignerDesigns = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock designs data
  const designs = [
    {
      id: "1",
      title: "Geometric Vase Design",
      thumbnail:
        "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=300&q=80",
      status: "active",
      sales: 42,
      revenue: 1259.58,
      dateCreated: "2023-03-15",
      category: "Home Decor",
    },
    {
      id: "2",
      title: "Miniature Chess Set",
      thumbnail:
        "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=300&q=80",
      status: "active",
      sales: 38,
      revenue: 1899.62,
      dateCreated: "2023-04-02",
      category: "Toys",
    },
    {
      id: "3",
      title: "Smartphone Stand",
      thumbnail:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80",
      status: "active",
      sales: 35,
      revenue: 699.65,
      dateCreated: "2023-04-18",
      category: "Gadgets",
    },
    {
      id: "4",
      thumbnail:
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&q=80",
      title: "Geometric Earrings",
      status: "pending",
      sales: 0,
      revenue: 0,
      dateCreated: "2023-05-10",
      category: "Jewelry",
    },
    {
      id: "5",
      thumbnail:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&q=80",
      title: "Desktop Planter",
      status: "active",
      sales: 27,
      revenue: 674.73,
      dateCreated: "2023-02-28",
      category: "Home Decor",
    },
    {
      id: "6",
      thumbnail:
        "https://images.unsplash.com/photo-1599423423923-df6974740b19?w=300&q=80",
      title: "Articulated Dragon",
      status: "draft",
      sales: 0,
      revenue: 0,
      dateCreated: "2023-05-22",
      category: "Figurines",
    },
    {
      id: "7",
      thumbnail:
        "https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?w=300&q=80",
      title: "Cable Organizer",
      status: "active",
      sales: 19,
      revenue: 284.81,
      dateCreated: "2023-03-05",
      category: "Gadgets",
    },
    {
      id: "8",
      thumbnail:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80",
      title: "Minimalist Bracelet",
      status: "active",
      sales: 23,
      revenue: 689.77,
      dateCreated: "2023-04-12",
      category: "Jewelry",
    },
  ];

  // Filter designs based on status and search query
  const filteredDesigns = designs.filter((design) => {
    // Filter by status
    if (filterStatus !== "all" && design.status !== filterStatus) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !design.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pending Review
          </Badge>
        );
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Designs</h1>
          <p className="text-muted-foreground">
            Manage and track your design portfolio
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => (window.location.href = "/designer/upload")}>
            <Upload className="mr-2 h-4 w-4" /> Upload New Design
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Design Portfolio</CardTitle>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search designs..."
                  className="pl-10 w-full sm:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="border rounded-md p-2 text-sm bg-background"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Designs</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending Review</option>
                  <option value="draft">Drafts</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border rounded-md overflow-hidden">
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
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredDesigns.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No designs found</h3>
              <p className="text-muted-foreground mt-2">
                {searchQuery
                  ? "Try a different search term"
                  : "Upload your first design to get started"}
              </p>
              {!searchQuery && (
                <Button
                  className="mt-4"
                  onClick={() => (window.location.href = "/designer/upload")}
                >
                  <Plus className="mr-2 h-4 w-4" /> Upload Design
                </Button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDesigns.map((design) => (
                <div
                  key={design.id}
                  className="border rounded-lg overflow-hidden bg-white"
                >
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={design.thumbnail}
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(design.status)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">{design.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {design.category}
                    </p>

                    {design.status === "active" && (
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span>{design.sales} sales</span>
                        <span className="font-medium">
                          ${design.revenue.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(design.dateCreated)}
                      </span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDesigns.map((design) => (
                <div
                  key={design.id}
                  className="flex flex-col sm:flex-row border rounded-lg overflow-hidden bg-white"
                >
                  <div className="sm:w-48 h-48 relative">
                    <img
                      src={design.thumbnail}
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(design.status)}
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">
                            {design.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {design.category}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm mt-2">
                        Uploaded on {formatDate(design.dateCreated)}
                      </p>
                    </div>

                    {design.status === "active" && (
                      <div className="flex justify-between items-center mt-4 border-t pt-4">
                        <div>
                          <span className="text-sm font-medium">
                            Sales: {design.sales}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            Revenue: ${design.revenue.toFixed(2)}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Analytics
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DesignerDesigns;
