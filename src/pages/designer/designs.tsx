import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DesignCard from "@/components/designer/DesignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus, Search, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { getDesignerDesigns, deleteDesign } from "@/api/designs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Design {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  materials: string[];
  status: string;
  createdAt: string;
  thumbnailUrl: string;
  salesCount: number;
  viewCount: number;
}

const DesignerDesignsPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.role === "designer") {
      fetchDesigns();
    }
  }, [isAuthenticated, user]);

  const fetchDesigns = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { designs } = await getDesignerDesigns();
      setDesigns(designs);
      setFilteredDesigns(designs);
    } catch (err: any) {
      console.error("Error fetching designs:", err);
      setError(err.message || "Failed to load designs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterDesigns(searchQuery, activeTab);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterDesigns(searchQuery, value);
  };

  const filterDesigns = (query: string, tab: string) => {
    let filtered = [...designs];

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (design) =>
          design.title.toLowerCase().includes(query.toLowerCase()) ||
          design.description.toLowerCase().includes(query.toLowerCase()),
      );
    }

    // Filter by status
    if (tab !== "all") {
      filtered = filtered.filter((design) => design.status === tab);
    }

    setFilteredDesigns(filtered);
  };

  const handleDeleteClick = (designId: string) => {
    setDesignToDelete(designId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!designToDelete) return;

    try {
      setIsDeleting(true);
      await deleteDesign(designToDelete);
      setDesigns(designs.filter((design) => design.id !== designToDelete));
      setFilteredDesigns(
        filteredDesigns.filter((design) => design.id !== designToDelete),
      );
      setDeleteDialogOpen(false);
    } catch (err: any) {
      console.error("Error deleting design:", err);
      setError(err.message || "Failed to delete design");
    } finally {
      setIsDeleting(false);
      setDesignToDelete(null);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not a designer
  if (!isAuthenticated || user?.role !== "designer") {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must be logged in as a designer to access this page.",
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Designs</h1>
              <p className="text-gray-600 mt-1">
                Manage your 3D design portfolio and track performance
              </p>
            </div>

            <Button
              onClick={() => (window.location.href = "/designer/upload")}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" /> Upload New Design
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full md:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All Designs</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
            </Tabs>

            <form
              onSubmit={handleSearch}
              className="w-full md:w-auto flex items-center"
            >
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search designs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-sm h-80"
                ></div>
              ))}
            </div>
          ) : filteredDesigns.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="mb-4">
                <img
                  src="https://illustrations.popsy.co/gray/graphic-design.svg"
                  alt="No designs"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {searchQuery
                  ? "No designs match your search"
                  : "You haven't uploaded any designs yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? "Try a different search term or clear filters"
                  : "Start sharing your creativity with the world"}
              </p>
              <Button
                onClick={() => (window.location.href = "/designer/upload")}
              >
                Upload Your First Design
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDesigns.map((design) => (
                <DesignCard
                  key={design.id}
                  id={design.id}
                  title={design.title}
                  thumbnailUrl={design.thumbnailUrl}
                  price={design.price}
                  status={design.status}
                  category={design.category}
                  salesCount={design.salesCount}
                  viewCount={design.viewCount}
                  onDelete={() => handleDeleteClick(design.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this design? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default DesignerDesignsPage;
