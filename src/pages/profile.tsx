import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Settings,
  CreditCard,
  ShoppingBag,
  Heart,
  LogOut,
  Bell,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "customer",
    avatar: "",
    joinDate: "January 2023",
    bio: "3D designer specializing in functional home decor and gadget accessories. Passionate about creating beautiful yet practical designs.",
  });

  useEffect(() => {
    if (isAuthenticated && authUser) {
      setUser({
        name: authUser.name || "",
        email: authUser.email || "",
        role: authUser.role || "customer",
        avatar:
          authUser.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.name}`,
        joinDate: "January 2023", // This would come from the user data in a real app
        bio: "3D designer specializing in functional home decor and gadget accessories. Passionate about creating beautiful yet practical designs.", // This would come from the user data in a real app
      });
    }
  }, [authUser, isAuthenticated]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
    }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        user={{
          name: user.name,
          email: user.email,
          role: user.role as any,
          avatar: user.avatar,
        }}
      />

      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="md:w-1/4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-bold">{user.name}</h2>
                      <p className="text-muted-foreground">{user.email}</p>
                      <Badge className="mt-2" variant="outline">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        Member since {user.joinDate}
                      </p>
                    </div>

                    <Separator className="my-4" />

                    <nav className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <a href="#profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <a href="#orders" className="flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Orders
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <a href="#favorites" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4" />
                          Favorites
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <a href="#payment" className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Payment Methods
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <a href="#notifications" className="flex items-center">
                          <Bell className="mr-2 h-4 w-4" />
                          Notifications
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <a href="#settings" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </a>
                      </Button>

                      <Separator className="my-4" />

                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        asChild
                      >
                        <a href="/login" className="flex items-center">
                          <LogOut className="mr-2 h-4 w-4" />
                          Log Out
                        </a>
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="md:w-3/4">
                <Tabs defaultValue="profile">
                  <TabsList className="mb-6">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="designs">My Designs</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Profile Information</CardTitle>
                          <CardDescription>
                            Manage your personal information
                          </CardDescription>
                        </div>
                        {!isEditing && (
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                          >
                            Edit Profile
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent>
                        {isEditing ? (
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="bio">Bio</Label>
                              <Input
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="flex justify-end space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                              >
                                Cancel
                              </Button>
                              <Button type="submit">Save Changes</Button>
                            </div>
                          </form>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Full Name
                              </h3>
                              <p>{user.name}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Email
                              </h3>
                              <p>{user.email}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Bio
                              </h3>
                              <p>{user.bio}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Account Type
                              </h3>
                              <p>
                                {user.role.charAt(0).toUpperCase() +
                                  user.role.slice(1)}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {user.role === "designer" && (
                      <Card className="mt-6">
                        <CardHeader>
                          <CardTitle>Designer Statistics</CardTitle>
                          <CardDescription>
                            Your performance on the platform
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Total Designs
                              </h3>
                              <p className="text-2xl font-bold">24</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Total Sales
                              </h3>
                              <p className="text-2xl font-bold">187</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Total Earnings
                              </h3>
                              <p className="text-2xl font-bold">$4,582.50</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="orders">
                    <Card>
                      <CardHeader>
                        <CardTitle>Order History</CardTitle>
                        <CardDescription>View your past orders</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[1, 2, 3].map((order) => (
                            <div key={order} className="border rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <div>
                                  <h3 className="font-medium">
                                    Order #{order}00
                                    {Math.floor(Math.random() * 100)}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    Placed on {new Date().toLocaleDateString()}
                                  </p>
                                </div>
                                <Badge>
                                  {
                                    ["Delivered", "Shipped", "Processing"][
                                      order - 1
                                    ]
                                  }
                                </Badge>
                              </div>
                              <Separator className="my-2" />
                              <div className="flex justify-between items-center">
                                <p>Total: ${(order * 29.99).toFixed(2)}</p>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="designs">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>My Designs</CardTitle>
                          <CardDescription>
                            Manage your uploaded designs
                          </CardDescription>
                        </div>
                        <Button
                          onClick={() =>
                            (window.location.href = "/designer/upload")
                          }
                        >
                          Upload New Design
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[1, 2, 3, 4, 5, 6].map((design) => (
                            <div
                              key={design}
                              className="border rounded-lg overflow-hidden"
                            >
                              <div className="aspect-square bg-gray-100">
                                <img
                                  src={`https://images.unsplash.com/photo-158178334230${design}-f792dbdd27c5?w=300&q=80`}
                                  alt={`Design ${design}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-3">
                                <h3 className="font-medium truncate">
                                  Design Name {design}
                                </h3>
                                <div className="flex justify-between items-center mt-2">
                                  <p className="text-sm text-muted-foreground">
                                    {Math.floor(Math.random() * 50)} sales
                                  </p>
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>
                          Manage your account preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-2">
                              Notification Preferences
                            </h3>
                            <div className="space-y-2">
                              {[
                                "Email notifications for new orders",
                                "Email notifications for comments",
                                "Marketing emails and promotions",
                                "Platform updates and news",
                              ].map((pref, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between"
                                >
                                  <Label htmlFor={`pref-${i}`}>{pref}</Label>
                                  <input
                                    type="checkbox"
                                    id={`pref-${i}`}
                                    defaultChecked={i < 2}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-lg font-medium mb-2">
                              Password
                            </h3>
                            <Button variant="outline">Change Password</Button>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-lg font-medium mb-2 text-red-600">
                              Danger Zone
                            </h3>
                            <Button variant="destructive">
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ProfilePageWithAuth = () => {
  return (
    <AuthGuard>
      <ProfilePage />
    </AuthGuard>
  );
};

export default ProfilePageWithAuth;
