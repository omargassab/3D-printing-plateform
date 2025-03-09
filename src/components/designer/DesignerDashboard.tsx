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
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowUpRight,
  Download,
  Upload,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  FileText,
  AlertCircle,
  Plus,
} from "lucide-react";

interface DesignerDashboardProps {
  designerName?: string;
  stats?: {
    totalEarnings: number;
    totalSales: number;
    totalDesigns: number;
    pendingOrders: number;
  };
  recentSales?: Array<{
    id: string;
    product: string;
    date: string;
    amount: number;
    status: "completed" | "processing" | "refunded";
  }>;
  topDesigns?: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
    thumbnail: string;
  }>;
}

const DesignerDashboard = ({
  designerName = "Alex Smith",
  stats = {
    totalEarnings: 4582.5,
    totalSales: 187,
    totalDesigns: 24,
    pendingOrders: 5,
  },
  recentSales = [
    {
      id: "1",
      product: "Geometric Vase Design",
      date: "2023-06-15",
      amount: 29.99,
      status: "completed" as const,
    },
    {
      id: "2",
      product: "Miniature Chess Set",
      date: "2023-06-14",
      amount: 49.99,
      status: "completed" as const,
    },
    {
      id: "3",
      product: "Smartphone Stand",
      date: "2023-06-13",
      amount: 19.99,
      status: "processing" as const,
    },
    {
      id: "4",
      product: "Geometric Earrings",
      date: "2023-06-12",
      amount: 34.99,
      status: "completed" as const,
    },
    {
      id: "5",
      product: "Desktop Planter",
      date: "2023-06-11",
      amount: 24.99,
      status: "refunded" as const,
    },
  ],
  topDesigns = [
    {
      id: "1",
      name: "Geometric Vase Design",
      sales: 42,
      revenue: 1259.58,
      thumbnail:
        "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=200&q=80",
    },
    {
      id: "2",
      name: "Miniature Chess Set",
      sales: 38,
      revenue: 1899.62,
      thumbnail:
        "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=200&q=80",
    },
    {
      id: "3",
      name: "Smartphone Stand",
      sales: 35,
      revenue: 699.65,
      thumbnail:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&q=80",
    },
  ],
}: DesignerDashboardProps) => {
  // Sample data for charts
  const salesData = [
    { name: "Jan", sales: 12 },
    { name: "Feb", sales: 19 },
    { name: "Mar", sales: 15 },
    { name: "Apr", sales: 22 },
    { name: "May", sales: 28 },
    { name: "Jun", sales: 35 },
  ];

  const revenueData = [
    { name: "Jan", revenue: 320 },
    { name: "Feb", revenue: 450 },
    { name: "Mar", revenue: 380 },
    { name: "Apr", revenue: 520 },
    { name: "May", revenue: 650 },
    { name: "Jun", revenue: 820 },
  ];

  const categoryData = [
    { name: "Home Decor", value: 45 },
    { name: "Gadgets", value: 25 },
    { name: "Jewelry", value: 15 },
    { name: "Toys", value: 10 },
    { name: "Other", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Designer Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {designerName}
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button>
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
            <Button variant="default">
              <Upload className="mr-2 h-4 w-4" /> Upload New Design
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">+12.5%</span> from
                last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSales}</div>
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
                Total Designs
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDesigns}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">{stats.totalDesigns - 3}</span>{" "}
                active listings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Orders
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">3</span> require attention
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
                    <Tooltip />
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
                    <Tooltip />
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

        {/* Top Designs and Recent Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Performing Designs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topDesigns.map((design) => (
                  <div key={design.id} className="flex items-center">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                      <img
                        src={design.thumbnail}
                        alt={design.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{design.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">
                          {design.sales} sales
                        </span>
                        <span className="font-medium">
                          ${design.revenue.toFixed(2)}
                        </span>
                      </div>
                      <Progress
                        value={design.sales / 0.5}
                        className="h-1 mt-2"
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add New Design
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2">Product</th>
                    <th className="text-left font-medium p-2">Date</th>
                    <th className="text-left font-medium p-2">Amount</th>
                    <th className="text-left font-medium p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => (
                    <tr key={sale.id} className="border-b">
                      <td className="p-2">{sale.product}</td>
                      <td className="p-2">{formatDate(sale.date)}</td>
                      <td className="p-2">${sale.amount.toFixed(2)}</td>
                      <td className="p-2">
                        <Badge
                          variant={
                            sale.status === "completed"
                              ? "default"
                              : sale.status === "processing"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {sale.status.charAt(0).toUpperCase() +
                            sale.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Sales
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DesignerDashboard;
