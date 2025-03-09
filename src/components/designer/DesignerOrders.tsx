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
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Download,
  DollarSign,
} from "lucide-react";

const DesignerOrders = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock orders data
  const orders = [
    {
      id: "ORD-1234",
      customerName: "John Smith",
      date: "2023-06-15",
      status: "processing",
      items: [
        {
          id: "1",
          title: "Geometric Vase Design",
          quantity: 1,
          price: 29.99,
          royalty: 20.99,
        },
      ],
      total: 29.99,
      royaltyTotal: 20.99,
      isPaid: false,
    },
    {
      id: "ORD-1235",
      customerName: "Sarah Johnson",
      date: "2023-06-14",
      status: "shipped",
      items: [
        {
          id: "2",
          title: "Miniature Chess Set",
          quantity: 1,
          price: 49.99,
          royalty: 34.99,
        },
      ],
      total: 49.99,
      royaltyTotal: 34.99,
      isPaid: false,
    },
    {
      id: "ORD-1236",
      customerName: "Michael Brown",
      date: "2023-06-13",
      status: "delivered",
      items: [
        {
          id: "3",
          title: "Smartphone Stand",
          quantity: 2,
          price: 19.99,
          royalty: 13.99,
        },
      ],
      total: 39.98,
      royaltyTotal: 27.98,
      isPaid: true,
      paymentDate: "2023-06-30",
    },
    {
      id: "ORD-1237",
      customerName: "Emily Davis",
      date: "2023-06-10",
      status: "delivered",
      items: [
        {
          id: "4",
          title: "Geometric Earrings",
          quantity: 1,
          price: 34.99,
          royalty: 24.49,
        },
      ],
      total: 34.99,
      royaltyTotal: 24.49,
      isPaid: true,
      paymentDate: "2023-06-30",
    },
    {
      id: "ORD-1238",
      customerName: "Robert Wilson",
      date: "2023-06-12",
      status: "cancelled",
      items: [
        {
          id: "5",
          title: "Desktop Planter",
          quantity: 1,
          price: 24.99,
          royalty: 17.49,
        },
      ],
      total: 24.99,
      royaltyTotal: 17.49,
      isPaid: false,
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
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Calculate total royalties
  const totalRoyalties = filteredOrders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.royaltyTotal, 0);

  // Calculate paid royalties
  const paidRoyalties = filteredOrders
    .filter((order) => order.isPaid)
    .reduce((sum, order) => sum + order.royaltyTotal, 0);

  // Calculate pending royalties
  const pendingRoyalties = filteredOrders
    .filter((order) => !order.isPaid && order.status !== "cancelled")
    .reduce((sum, order) => sum + order.royaltyTotal, 0);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">
            Track orders and royalties for your designs
          </p>
        </div>
      </div>

      {/* Royalty Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Royalties</p>
                <h3 className="text-2xl font-bold">
                  ${totalRoyalties.toFixed(2)}
                </h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid Royalties</p>
                <h3 className="text-2xl font-bold">
                  ${paidRoyalties.toFixed(2)}
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Royalties
                </p>
                <h3 className="text-2xl font-bold">
                  ${pendingRoyalties.toFixed(2)}
                </h3>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending-payment">Pending Payment</TabsTrigger>
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
                              Payment Status
                            </h4>
                            <p className="text-sm">
                              {order.isPaid ? (
                                <span className="text-green-600 font-medium">
                                  Paid on {formatDate(order.paymentDate!)}
                                </span>
                              ) : (
                                <span className="text-amber-600 font-medium">
                                  Pending payment
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="text-sm text-muted-foreground">
                              Order Total: ${order.total.toFixed(2)}
                            </span>
                            <span className="ml-4 font-medium">
                              Your Royalty: ${order.royaltyTotal.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {order.status === "delivered" && (
                              <Button size="sm" variant="outline">
                                <Download className="h-3.5 w-3.5 mr-1" />{" "}
                                Invoice
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

            <TabsContent value="paid">
              <div className="space-y-4">
                {filteredOrders
                  .filter((order) => order.isPaid)
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
                              Payment Status
                            </h4>
                            <p className="text-sm">
                              <span className="text-green-600 font-medium">
                                Paid on {formatDate(order.paymentDate!)}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="text-sm text-muted-foreground">
                              Order Total: ${order.total.toFixed(2)}
                            </span>
                            <span className="ml-4 font-medium">
                              Your Royalty: ${order.royaltyTotal.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-3.5 w-3.5 mr-1" /> Invoice
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="pending-payment">
              <div className="space-y-4">
                {filteredOrders
                  .filter(
                    (order) => !order.isPaid && order.status !== "cancelled",
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
                              Payment Status
                            </h4>
                            <p className="text-sm">
                              <span className="text-amber-600 font-medium">
                                Pending payment
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="text-sm text-muted-foreground">
                              Order Total: ${order.total.toFixed(2)}
                            </span>
                            <span className="ml-4 font-medium">
                              Your Royalty: ${order.royaltyTotal.toFixed(2)}
                            </span>
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

export default DesignerOrders;
