import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Mail,
  User,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminUsers = () => {
  const [filterRole, setFilterRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock users data
  const users = [
    {
      id: "1",
      name: "John Designer",
      email: "designer@example.com",
      role: "designer",
      status: "active",
      joinDate: "2023-01-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      designs: 12,
      sales: 156,
      revenue: 4250.75,
    },
    {
      id: "2",
      name: "Sarah Dropshipper",
      email: "dropshipper@example.com",
      role: "dropshipper",
      status: "active",
      joinDate: "2023-02-20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      orders: 87,
      revenue: 3120.5,
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      joinDate: "2022-12-01",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    },
    {
      id: "4",
      name: "Regular Customer",
      email: "customer@example.com",
      role: "customer",
      status: "active",
      joinDate: "2023-03-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Customer",
      orders: 5,
      totalSpent: 245.85,
    },
    {
      id: "5",
      name: "Michael Designer",
      email: "michael@example.com",
      role: "designer",
      status: "inactive",
      joinDate: "2023-01-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      designs: 3,
      sales: 28,
      revenue: 750.25,
    },
    {
      id: "6",
      name: "Emily Dropshipper",
      email: "emily@example.com",
      role: "dropshipper",
      status: "pending",
      joinDate: "2023-04-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
  ];

  // Filter users based on role and search query
  const filteredUsers = users.filter((user) => {
    // Filter by role
    if (filterRole !== "all" && user.role !== filterRole) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !(
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-500">
            Inactive
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pending
          </Badge>
        );
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
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage designers, dropshippers, and customers
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Users</CardTitle>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
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
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All Users</option>
                  <option value="designer">Designers</option>
                  <option value="dropshipper">Dropshippers</option>
                  <option value="customer">Customers</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all-users">
            <TabsList className="mb-4">
              <TabsTrigger value="all-users">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all-users">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No users found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchQuery
                      ? "Try a different search term"
                      : "No users match the selected filters"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="border rounded-lg overflow-hidden bg-white"
                    >
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                            {getStatusBadge(user.status)}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Joined: {formatDate(user.joinDate)}
                            </span>
                          </div>

                          {user.role === "designer" && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                Designs: {user.designs}
                              </span>
                              <span className="text-sm ml-4">
                                Sales: {user.sales}
                              </span>
                              <span className="text-sm ml-4">
                                Revenue: ${user.revenue?.toFixed(2)}
                              </span>
                            </div>
                          )}

                          {user.role === "dropshipper" && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                Orders: {user.orders}
                              </span>
                              {user.revenue && (
                                <span className="text-sm ml-4">
                                  Revenue: ${user.revenue.toFixed(2)}
                                </span>
                              )}
                            </div>
                          )}

                          {user.role === "customer" && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                Orders: {user.orders}
                              </span>
                              {user.totalSpent && (
                                <span className="text-sm ml-4">
                                  Total Spent: ${user.totalSpent.toFixed(2)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-3.5 w-3.5 mr-1" /> Contact
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          {user.status === "active" ? (
                            <Button variant="outline" size="sm">
                              <Lock className="h-3.5 w-3.5 mr-1" /> Deactivate
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Unlock className="h-3.5 w-3.5 mr-1" /> Activate
                            </Button>
                          )}
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="active">
              <div className="space-y-4">
                {filteredUsers
                  .filter((user) => user.status === "active")
                  .map((user) => (
                    <div
                      key={user.id}
                      className="border rounded-lg overflow-hidden bg-white"
                    >
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                            {getStatusBadge(user.status)}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Joined: {formatDate(user.joinDate)}
                            </span>
                          </div>

                          {user.role === "designer" && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                Designs: {user.designs}
                              </span>
                              <span className="text-sm ml-4">
                                Sales: {user.sales}
                              </span>
                              <span className="text-sm ml-4">
                                Revenue: ${user.revenue?.toFixed(2)}
                              </span>
                            </div>
                          )}

                          {user.role === "dropshipper" && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                Orders: {user.orders}
                              </span>
                              {user.revenue && (
                                <span className="text-sm ml-4">
                                  Revenue: ${user.revenue.toFixed(2)}
                                </span>
                              )}
                            </div>
                          )}

                          {user.role === "customer" && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                Orders: {user.orders}
                              </span>
                              {user.totalSpent && (
                                <span className="text-sm ml-4">
                                  Total Spent: ${user.totalSpent.toFixed(2)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-3.5 w-3.5 mr-1" /> Contact
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Lock className="h-3.5 w-3.5 mr-1" /> Deactivate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="inactive">
              <div className="space-y-4">
                {filteredUsers
                  .filter((user) => user.status === "inactive")
                  .map((user) => (
                    <div
                      key={user.id}
                      className="border rounded-lg overflow-hidden bg-white"
                    >
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                            {getStatusBadge(user.status)}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Joined: {formatDate(user.joinDate)}
                            </span>
                          </div>

                          {user.role === "designer" && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                Designs: {user.designs}
                              </span>
                              <span className="text-sm ml-4">
                                Sales: {user.sales}
                              </span>
                              <span className="text-sm ml-4">
                                Revenue: ${user.revenue?.toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-3.5 w-3.5 mr-1" /> Contact
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Unlock className="h-3.5 w-3.5 mr-1" /> Activate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="space-y-4">
                {filteredUsers
                  .filter((user) => user.status === "pending")
                  .map((user) => (
                    <div
                      key={user.id}
                      className="border rounded-lg overflow-hidden bg-white"
                    >
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                            {getStatusBadge(user.status)}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Joined: {formatDate(user.joinDate)}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-3.5 w-3.5 mr-1" /> Contact
                          </Button>
                          <Button variant="outline" size="sm">
                            <User className="h-3.5 w-3.5 mr-1" /> Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <Unlock className="h-3.5 w-3.5 mr-1" /> Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-3.5 w-3.5 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
