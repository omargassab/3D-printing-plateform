import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Award, TrendingUp } from "lucide-react";

interface Designer {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  rating: number;
  designs: number;
  sales: number;
  bio: string;
  featured: boolean;
}

const DesignersPage = () => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [filteredDesigners, setFilteredDesigners] = useState<Designer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("rating");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch designers
    const fetchDesigners = async () => {
      // In a real app, this would be an API call
      const mockDesigners: Designer[] = [
        {
          id: "1",
          name: "Youssef Ben Ali",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef",
          specialty: "Home Decor",
          rating: 4.8,
          designs: 42,
          sales: 1250,
          bio: "Specializing in minimalist home decor with functional design elements inspired by Tunisian heritage.",
          featured: true,
        },
        {
          id: "2",
          name: "Leila Mansour",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leila",
          specialty: "Toys & Games",
          rating: 4.7,
          designs: 38,
          sales: 980,
          bio: "Creating interactive toys and games that spark imagination and creativity, with a touch of Tunisian culture.",
          featured: true,
        },
        {
          id: "3",
          name: "Karim Trabelsi",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
          specialty: "Gadgets",
          rating: 4.9,
          designs: 56,
          sales: 1420,
          bio: "Innovative gadget designer from Sousse focused on solving everyday problems with elegant solutions.",
          featured: true,
        },
        {
          id: "4",
          name: "Amira Belhaj",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amira",
          specialty: "Jewelry",
          rating: 4.6,
          designs: 29,
          sales: 870,
          bio: "Crafting unique jewelry pieces that blend modern aesthetics with traditional Tunisian techniques and motifs.",
          featured: false,
        },
        {
          id: "5",
          name: "Mehdi Khelifi",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehdi",
          specialty: "Figurines",
          rating: 4.5,
          designs: 34,
          sales: 760,
          bio: "Detailed character figurines inspired by Tunisian folklore, fantasy, and contemporary culture.",
          featured: false,
        },
        {
          id: "6",
          name: "Nour Chaabane",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
          specialty: "Architectural Models",
          rating: 4.9,
          designs: 27,
          sales: 650,
          bio: "Architectural designer from Tunis specializing in detailed scale models of Tunisian historical buildings and modern components.",
          featured: true,
        },
        {
          id: "7",
          name: "Sami Ben Salah",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sami",
          specialty: "Character Design",
          rating: 5.0,
          designs: 48,
          sales: 1580,
          bio: "Award-winning character designer from Sfax with a focus on articulated action figures and Tunisian-inspired characters.",
          featured: true,
        },
        {
          id: "8",
          name: "Yasmine Mejri",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yasmine",
          specialty: "Mechanical Parts",
          rating: 4.8,
          designs: 52,
          sales: 1320,
          bio: "Engineering-focused designer from Monastir creating precision mechanical components and assemblies for local industries.",
          featured: false,
        },
        {
          id: "9",
          name: "Amine Bouazizi",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amine",
          specialty: "Jewelry & Accessories",
          rating: 4.7,
          designs: 31,
          sales: 890,
          bio: "Contemporary jewelry designer from Hammamet with a focus on customizable, modular pieces inspired by Mediterranean aesthetics.",
          featured: false,
        },
        {
          id: "10",
          name: "Fatma Jebali",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatma",
          specialty: "Home Decor",
          rating: 4.9,
          designs: 45,
          sales: 1150,
          bio: "Creating functional home decor with Tunisian-inspired aesthetics, blending traditional patterns with modern minimalism.",
          featured: true,
        },
      ];

      setDesigners(mockDesigners);
      sortDesigners(mockDesigners, sortOption);
      setLoading(false);
    };

    fetchDesigners();
  }, []);

  const sortDesigners = (designersToSort: Designer[], option: string) => {
    let sorted = [...designersToSort];

    switch (option) {
      case "rating":
        sorted = sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "sales":
        sorted = sorted.sort((a, b) => b.sales - a.sales);
        break;
      case "designs":
        sorted = sorted.sort((a, b) => b.designs - a.designs);
        break;
      case "name":
        sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted = sorted.sort((a, b) => b.rating - a.rating);
    }

    setFilteredDesigners(sorted);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      sortDesigners(designers, sortOption);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = designers.filter(
      (designer) =>
        designer.name.toLowerCase().includes(query) ||
        designer.specialty.toLowerCase().includes(query) ||
        designer.bio.toLowerCase().includes(query),
    );

    sortDesigners(results, sortOption);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    sortDesigners(
      filteredDesigners.length > 0 ? filteredDesigners : designers,
      value,
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Top Tunisian Designers</h1>
              <p className="text-gray-600 mt-1">
                Discover and connect with our talented Tunisian 3D designers
              </p>
            </div>

            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search designers..."
                  className="pl-10 pr-4 w-full md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="mb-6">
            <Tabs
              defaultValue="rating"
              value={sortOption}
              onValueChange={handleSortChange}
            >
              <TabsList>
                <TabsTrigger value="rating" className="flex items-center">
                  <Star className="mr-1 h-4 w-4" /> Top Rated
                </TabsTrigger>
                <TabsTrigger value="sales" className="flex items-center">
                  <TrendingUp className="mr-1 h-4 w-4" /> Most Sales
                </TabsTrigger>
                <TabsTrigger value="designs" className="flex items-center">
                  <Award className="mr-1 h-4 w-4" /> Most Designs
                </TabsTrigger>
                <TabsTrigger value="name">Alphabetical</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 h-64"></div>
              ))}
            </div>
          ) : filteredDesigners.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No designers found</h3>
              <p className="text-gray-500 mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDesigners.map((designer) => (
                <div
                  key={designer.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={designer.avatar}
                          alt={designer.name}
                        />
                        <AvatarFallback>
                          {designer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold truncate">
                            {designer.name}
                          </h3>
                          {designer.featured && (
                            <Badge variant="secondary" className="ml-2">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {designer.specialty}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center text-amber-500">
                            <Star className="fill-current h-4 w-4" />
                            <span className="ml-1 font-medium">
                              {designer.rating.toFixed(1)}
                            </span>
                          </div>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            {designer.designs} designs
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            {designer.sales} sales
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                      {designer.bio}
                    </p>

                    <div className="mt-4 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          (window.location.href = `/designers/${designer.id}`)
                        }
                      >
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          (window.location.href = `/marketplace?designer=${designer.id}`)
                        }
                      >
                        View Designs
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DesignersPage;
