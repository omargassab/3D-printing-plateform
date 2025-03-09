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
  AreaChart,
  Area,
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
  Printer,
  Settings,
  Truck,
  Store,
} from "lucide-react";

interface AdminDashboardProps {
  stats?: {
    totalRevenue: number;
    totalOrders: number;
    activeDesigners: number;
    activeDropshippers: number;
    pendingPrints: number;
  };
  recentOrders?: Array<{
    id: string;
    customer: string;
    date: string;
    amount: number;
    status: "printing" | "shipped" | "completed" | "cancelled";
  }>;
  topDesigners?: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
    avatar: string;
  }>;
}

const AdminDashboard = ({
  stats = {
    totalRevenue: 28750.65,
    totalOrders: 342,
    activeDesigners: 48,
    activeDropshippers: 32,
    pendingPrints: 25,
  },
  recentOrders = [
    {
      id: "1",
      customer: "Sarah's 3D Store",
      date: "2023-06-15",
      amount: 129.99,
      status: "printing" as const,
    },
    {
      id: "2",
      customer: "Modern Prints Co.",
      date: "2023-06-14",
      amount: 89.99,
      status: "shipped" as const,
    },
    {
      id: "3",
      customer: "Tech Gadgets Shop",
      date: "2023-06-13",
      amount: 159.99,
      status: "completed" as const,
    },
    {
      id: "4",
      customer: "Home Decor Plus",
      date: "2023-06-12",
      amount: 79.99,
      status: "shipped" as const,
    },
    {
      id: "5",
      customer: "Artisan Crafts",
      date: "2023-06-11",
      amount: 49.99,
      status: "cancelled" as const,
    },
  ],
  topDesigners = [
    {
      id: "1",
      name: "Alex Smith",
      sales: 87,
      revenue: 2589.63,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      id: "2",
      name: "Maria Jones",
      sales: 72,
      revenue: 2159.28,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
    {
      id: "3",
      name: "David Chen",
      sales: 65,
      revenue: 1949.35,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  ],
}: AdminDashboardProps) => {
  // Sample data for charts
  const monthlyRevenueData = [
    { name: "Jan", revenue: 4200 },
    { name: "Feb", revenue: 5800 },
    { name: "Mar", revenue: 4800 },
    { name: "Apr", revenue: 6500 },
    { name: "May", revenue: 7800 },
    { name: "Jun", revenue: 9500 },
  ];

  const ordersByTypeData = [
    { name: "Home Decor", value: 35 },
    { name: "Gadgets", value: 25 },
    { name: "Jewelry", value: 15 },
    { name: "Figurines", value: 15 },
    { name: "Other", value: 10 },
  ];

  const userGrowthData = [
    { name: "Jan", designers: 28, dropshippers: 18 },
    { name: "Feb", designers: 32, dropshippers: 22 },
    { name: "Mar", designers: 35, dropshippers: 24 },
    { name: "Apr", designers: 40, dropshippers: 26 },
    { name: "May", designers: 45, dropshippers: 30 },
    { name: "Jun", designers: 48, dropshippers: 32 },
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#f97316", "#10b981", "#6b7280"];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "shipped":
        return "default";
      case "printing":
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
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Platform overview and management
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Reports
            </Button>
            <Button variant="default">
              <Settings className="mr-2 h-4 w-4" /> Platform Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
                <span className="text-green-500 font-medium">+18.2%</span> from
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
                <span className="text-green-500 font-medium">+12.5%</span> from
                last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Designers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDesigners}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">8</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Dropshippers
              </CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.activeDropshippers}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">6</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Prints
              </CardTitle>
              <Printer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPrints}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">12</span> high priority
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyRevenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userGrowthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="designers"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="dropshippers"
                      stroke="#f97316"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Designers and Order Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Performing Designers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topDesigners.map((designer) => (
                  <div key={designer.id} className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={designer.avatar}
                        alt={designer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{designer.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">
                          {designer.sales} sales
                        </span>
                        <span className="font-medium">
                          ${designer.revenue.toFixed(2)}
                        </span>
                      </div>
                      <Progress
                        value={designer.sales / 1}
                        className="h-1 mt-2"
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> View All Designers
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ordersByTypeData}
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
                      {ordersByTypeData.map((entry, index) => (
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

export default AdminDashboard;
