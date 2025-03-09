import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Printer,
} from "lucide-react";

const AdminOrders = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock orders data
  const orders = [
    {
      id: "ORD-1234",
      customerName: "John Smith",
      customerEmail: "john@example.com",
      date: "2023-06-15",
      status: "processing",
      items: [
        {
          id: "1",
          title: "Geometric Vase Design",
          quantity: 1,
          price: 29.99,
          designerName: "Alex Smith",
        },
      ],
      total: 29.99,
      shippingAddress: "123 Main St, Anytown, AN 12345",
      shippingMethod: "Standard",
    },
    {
      id: "ORD-1235",
      customerName: "Sarah Johnson",
      customerEmail: "sarah@example.com",
      date: "2023-06-14",
      status: "printing",
      items: [
        {
          id: "2",
          title: "Miniature Chess Set",
          quantity: 1,
          price: 49.99,
          designerName: "Maria Jones",
        },
      ],
      total: 49.99,
      shippingAddress: "456 Oak Ave, Somewhere, SM 67890",
      shippingMethod: "Express",
    },
    {
      id: "ORD-1236",
      customerName: "Michael Brown",
      customerEmail: "michael@example.com",
      date: "2023-06-13",
      status: "shipped",
      items: [
        {
          id: "3",
          title: "Smartphone Stand",
          quantity: 2,
          price: 19.99,
          designerName: "David Chen",
        },
      ],
      total: 39.98,
      shippingAddress: "789 Pine Rd, Elsewhere, EL 54321",
      shippingMethod: "Standard",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-1237",
      customerName: "Emily Davis",
      customerEmail: "emily@example.com",
      date: "2023-06-10",
      status: "delivered",
      items: [
        {
          id: "4",
          title: "Geometric Earrings",
          quantity: 1,
          price: 34.99,
          designerName: "Sarah Patel",
        },
        {
          id: "8",
          title: "Minimalist Bracelet",
          quantity: 1,
          price: 29.99,
          designerName: "Sarah Patel",
        },
      ],
      total: 64.98,
      shippingAddress: "101 Maple St, Nowhere, NW 13579",
      shippingMethod: "Express",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-1238",
      customerName: "Robert Wilson",
      customerEmail: "robert@example.com",
      date: "2023-06-12",
      status: "cancelled",
      items: [
        {
          id: "5",
          title: "Desktop Planter",
          quantity: 1,
          price: 24.99,
          designerName: "James Wilson",
        },
      ],
      total: 24.99,
      shippingAddress: "202 Cedar Ln, Anyplace, AP 24680",
      shippingMethod: "Standard",
    },
  ];

  // Filter orders based on status and search query
  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (filterStatus !== "all" && order.status !== filterStatus) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !(
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            <Clock className="mr-1 h-3 w-3" /> Processing
          </Badge>
        );
      case "printing":
        return (
          <Badge
            variant="outline"
            className="text-purple-500 border-purple-500"
          >
            <Printer className="mr-1 h-3 w-3" /> Printing
          </Badge>
        );
      case "shipped":
        return (
          <Badge
            variant="outline"
            className="text-orange-500 border-orange-500"
          >
            <Truck className="mr-1 h-3 w-3" /> Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="mr-1 h-3 w-3" /> Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" /> Cancelled
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
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">
            Process and track customer orders
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Orders</CardTitle>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
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
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="printing">Printing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all-orders">
            <TabsList className="mb-4">
              <TabsTrigger value="all-orders">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
            </TabsList>

            <TabsContent value="all-orders">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No orders found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchQuery
                      ? "Try a different search term"
                      : "No orders match the selected filters"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg overflow-hidden bg-white"
                    >
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.date)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(order.status)}
                            <Button variant="outline" size="sm" className="h-8">
                              <Eye className="h-3.5 w-3.5 mr-1" /> View
                            </Button>
                          </div>
                        </div>

                        <Separator className="my-2" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Customer
                            </h4>
                            <p className="text-sm">{order.customerName}</p>
                            <p className="text-sm">{order.customerEmail}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Items
                            </h4>
                            {order.items.map((item) => (
                              <div key={item.id} className="text-sm">
                                {item.quantity}x {item.title}
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Shipping
                            </h4>
                            <p className="text-sm">{order.shippingMethod}</p>
                            {order.trackingNumber && (
                              <p className="text-sm">
                                Tracking: {order.trackingNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="font-medium">
                            Total: ${order.total.toFixed(2)}
                          </div>
                          <div className="flex gap-2">
                            {order.status === "processing" && (
                              <Button size="sm" variant="outline">
                                <Printer className="h-3.5 w-3.5 mr-1" /> Start
                                Printing
                              </Button>
                            )}
                            {order.status === "printing" && (
                              <Button size="sm" variant="outline">
                                <Package className="h-3.5 w-3.5 mr-1" /> Mark
                                Packed
                              </Button>
                            )}
                            {(order.status === "processing" ||
                              order.status === "printing") && (
                              <Button size="sm" variant="outline">
                                <Truck className="h-3.5 w-3.5 mr-1" /> Ship
                                Order
                              </Button>
                            )}
                            {order.status === "shipped" && (
                              <Button size="sm" variant="outline">
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                Mark Delivered
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending">
              <div className="space-y-4">
                {filteredOrders
                  .filter(
                    (order) =>
                      order.status === "processing" ||
                      order.status === "printing",
                  )
                  .map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg overflow-hidden bg-white"
                    >
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.date)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(order.status)}
                            <Button variant="outline" size="sm" className="h-8">
                              <Eye className="h-3.5 w-3.5 mr-1" /> View
                            </Button>
                          </div>
                        </div>

                        <Separator className="my-2" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Customer
                            </h4>
                            <p className="text-sm">{order.customerName}</p>
                            <p className="text-sm">{order.customerEmail}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Items
                            </h4>
                            {order.items.map((item) => (
                              <div key={item.id} className="text-sm">
                                {item.quantity}x {item.title}
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Shipping
                            </h4>
                            <p className="text-sm">{order.shippingMethod}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="font-medium">
                            Total: ${order.total.toFixed(2)}
                          </div>
                          <div className="flex gap-2">
                            {order.status === "processing" && (
                              <Button size="sm" variant="outline">
                                <Printer className="h-3.5 w-3.5 mr-1" /> Start
                                Printing
                              </Button>
                            )}
                            {order.status === "printing" && (
                              <Button size="sm" variant="outline">
                                <Package className="h-3.5 w-3.5 mr-1" /> Mark
                                Packed
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Truck className="h-3.5 w-3.5 mr-1" /> Ship Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="fulfilled">
              <div className="space-y-4">
                {filteredOrders
                  .filter(
                    (order) =>
                      order.status === "shipped" ||
                      order.status === "delivered",
                  )
                  .map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg overflow-hidden bg-white"
                    >
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.date)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(order.status)}
                            <Button variant="outline" size="sm" className="h-8">
                              <Eye className="h-3.5 w-3.5 mr-1" /> View
                            </Button>
                          </div>
                        </div>

                        <Separator className="my-2" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Customer
                            </h4>
                            <p className="text-sm">{order.customerName}</p>
                            <p className="text-sm">{order.customerEmail}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Items
                            </h4>
                            {order.items.map((item) => (
                              <div key={item.id} className="text-sm">
                                {item.quantity}x {item.title}
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Shipping
                            </h4>
                            <p className="text-sm">{order.shippingMethod}</p>
                            {order.trackingNumber && (
                              <p className="text-sm">
                                Tracking: {order.trackingNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="font-medium">
                            Total: ${order.total.toFixed(2)}
                          </div>
                          <div className="flex gap-2">
                            {order.status === "shipped" && (
                              <Button size="sm" variant="outline">
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                Mark Delivered
                              </Button>
                            )}
                          </div>
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

export default AdminOrders;
