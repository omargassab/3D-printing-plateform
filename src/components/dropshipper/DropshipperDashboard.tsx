import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ArrowUpRight,
  Download,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  FileText,
  AlertCircle,
  Plus,
  Package,
  Store,
  Truck,
} from "lucide-react";

interface DropshipperDashboardProps {
  dropshipperName?: string;
  stats?: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    pendingShipments: number;
  };
  recentOrders?: Array<{
    id: string;
    customer: string;
    date: string;
    amount: number;
    status: "shipped" | "processing" | "delivered" | "cancelled";
  }>;
  topProducts?: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
    thumbnail: string;
  }>;
}

const DropshipperDashboard = ({
  dropshipperName = "Sarah's 3D Store",
  stats = {
    totalRevenue: 8750.25,
    totalOrders: 142,
    totalProducts: 38,
    pendingShipments: 12,
  },
  recentOrders = [
    {
      id: "1",
      customer: "John Smith",
      date: "2023-06-15",
      amount: 79.99,
      status: "shipped" as const,
    },
    {
      id: "2",
      customer: "Emily Johnson",
      date: "2023-06-14",
      amount: 129.99,
      status: "processing" as const,
    },
    {
      id: "3",
      customer: "Michael Brown",
      date: "2023-06-13",
      amount: 49.99,
      status: "delivered" as const,
    },
    {
      id: "4",
      customer: "Jessica Williams",
      date: "2023-06-12",
      amount: 89.99,
      status: "shipped" as const,
    },
    {
      id: "5",
      customer: "David Miller",
      date: "2023-06-11",
      amount: 59.99,
      status: "cancelled" as const,
    },
  ],
  topProducts = [
    {
      id: "1",
      name: "Geometric Vase Collection",
      sales: 32,
      revenue: 959.68,
      thumbnail:
        "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=200&q=80",
    },
    {
      id: "2",
      name: "Premium Chess Set",
      sales: 28,
      revenue: 1399.72,
      thumbnail:
        "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=200&q=80",
    },
    {
      id: "3",
      name: "Smartphone Accessories Bundle",
      sales: 25,
      revenue: 499.75,
      thumbnail:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&q=80",
    },
  ],
}: DropshipperDashboardProps) => {
  // Sample data for charts
  const salesData = [
    { name: "Jan", sales: 8 },
    { name: "Feb", sales: 12 },
    { name: "Mar", sales: 18 },
    { name: "Apr", sales: 15 },
    { name: "May", sales: 22 },
    { name: "Jun", sales: 30 },
  ];

  const revenueData = [
    { name: "Jan", revenue: 420 },
    { name: "Feb", revenue: 650 },
    { name: "Mar", revenue: 980 },
    { name: "Apr", revenue: 820 },
    { name: "May", revenue: 1250 },
    { name: "Jun", revenue: 1650 },
  ];

  const orderStatusData = [
    { name: "Delivered", value: 65 },
    { name: "Shipped", value: 20 },
    { name: "Processing", value: 10 },
    { name: "Cancelled", value: 5 },
  ];

  const COLORS = ["#4ade80", "#3b82f6", "#f97316", "#ef4444"];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success";
      case "shipped":
        return "default";
      case "processing":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dropshipper Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {dropshipperName}
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
            <Button variant="default">
              <Store className="mr-2 h-4 w-4" /> Manage Store
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">+15.3%</span> from
                last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">+22.8%</span> from
                last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">5</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Shipments
              </CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingShipments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">4</span> require attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products and Order Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">
                          {product.sales} orders
                        </span>
                        <span className="font-medium">
                          ${product.revenue.toFixed(2)}
                        </span>
                      </div>
                      <Progress
                        value={product.sales / 0.4}
                        className="h-1 mt-2"
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add New Product
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2">Order ID</th>
                    <th className="text-left font-medium p-2">Customer</th>
                    <th className="text-left font-medium p-2">Date</th>
                    <th className="text-left font-medium p-2">Amount</th>
                    <th className="text-left font-medium p-2">Status</th>
                    <th className="text-left font-medium p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-2">#{order.id}</td>
                      <td className="p-2">{order.customer}</td>
                      <td className="p-2">{formatDate(order.date)}</td>
                      <td className="p-2">${order.amount.toFixed(2)}</td>
                      <td className="p-2">
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DropshipperDashboard;
