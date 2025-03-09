import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CartDrawer from "../cart/CartDrawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Bell,
  LogOut,
  Settings,
  Palette,
  Store,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

interface HeaderProps {
  className?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: "designer" | "dropshipper" | "admin" | "customer";
  };
  cartItemCount?: number;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onMenuToggle?: () => void;
}

const Header = ({
  className,
  user: propUser,
  cartItemCount = 0,
  notificationCount = 0,
  onSearch = () => {},
  onMenuToggle = () => {},
}: HeaderProps) => {
  const { user: authUser, isAuthenticated, logout } = useAuth();

  // Use provided user prop if available, otherwise use auth context user or default guest
  const user = propUser || authUser || null;
  const isGuest = !isAuthenticated || !user;
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    // Redirect to marketplace with search query
    window.location.href = `/marketplace?search=${encodeURIComponent(searchQuery)}`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuToggle();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm",
        className,
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <a href="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary flex items-center">
              <span className="text-3xl mr-1">🖨️</span> 3D Print Market
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/marketplace"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Marketplace
                </NavigationMenuLink>
              </NavigationMenuItem>

              {user?.role === "designer" && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Designer Portal</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink
                          href="/designer/dashboard"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary"
                        >
                          <div className="text-sm font-medium">Dashboard</div>
                          <div className="text-xs text-muted-foreground">
                            View your sales and analytics
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/designer/designs"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary"
                        >
                          <div className="text-sm font-medium">My Designs</div>
                          <div className="text-xs text-muted-foreground">
                            Manage your design portfolio
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/designer/upload"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary"
                        >
                          <div className="text-sm font-medium">
                            Upload Design
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Add a new 3D design to sell
                          </div>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              {user?.role === "dropshipper" && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    Dropshipper Portal
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[220px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink
                          href="/dropshipper/dashboard"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary"
                        >
                          <div className="text-sm font-medium">Dashboard</div>
                          <div className="text-xs text-muted-foreground">
                            View your store performance
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/dropshipper/products"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary"
                        >
                          <div className="text-sm font-medium">My Products</div>
                          <div className="text-xs text-muted-foreground">
                            Manage your product catalog
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/dropshipper/orders"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary"
                        >
                          <div className="text-sm font-medium">Orders</div>
                          <div className="text-xs text-muted-foreground">
                            Track customer orders
                          </div>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              {user?.role === "admin" && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink
                          href="/admin/dashboard"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary"
                        >
                          <div className="text-sm font-medium">Dashboard</div>
                          <div className="text-xs text-muted-foreground">
                            Platform overview
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/admin/orders"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary"
                        >
                          <div className="text-sm font-medium">Orders</div>
                          <div className="text-xs text-muted-foreground">
                            Manage fulfillment
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/admin/users"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary"
                        >
                          <div className="text-sm font-medium">Users</div>
                          <div className="text-xs text-muted-foreground">
                            Manage designers and dropshippers
                          </div>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full flex items-center"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for 3D designs..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          {/* Cart */}
          <CartDrawer />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          {isGuest ? (
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/login")}
            >
              Sign In
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "user"}`
                      }
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => (window.location.href = "/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>

                {user?.role === "designer" && (
                  <DropdownMenuItem
                    onClick={() =>
                      (window.location.href = "/designer/dashboard")
                    }
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    <span>My Designs</span>
                  </DropdownMenuItem>
                )}

                {user?.role === "dropshipper" && (
                  <DropdownMenuItem
                    onClick={() =>
                      (window.location.href = "/dropshipper/dashboard")
                    }
                  >
                    <Store className="mr-2 h-4 w-4" />
                    <span>My Store</span>
                  </DropdownMenuItem>
                )}

                {user?.role === "admin" && (
                  <DropdownMenuItem
                    onClick={() => (window.location.href = "/admin/dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Search - Shown below header on mobile */}
      <div className="md:hidden px-4 py-2 border-t border-gray-200">
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full flex items-center"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for 3D designs..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
            <a
              href="/marketplace"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
            >
              Marketplace
            </a>

            {user?.role === "designer" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-2 text-sm font-medium">
                  <span>Designer Portal</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 space-y-2">
                  <a
                    href="/designer/dashboard"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/designer/designs"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    My Designs
                  </a>
                  <a
                    href="/designer/upload"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    Upload Design
                  </a>
                </div>
              </div>
            )}

            {user?.role === "dropshipper" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-2 text-sm font-medium">
                  <span>Dropshipper Portal</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 space-y-2">
                  <a
                    href="/dropshipper/dashboard"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/dropshipper/products"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    My Products
                  </a>
                  <a
                    href="/dropshipper/orders"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    Orders
                  </a>
                </div>
              </div>
            )}

            {user?.role === "admin" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-2 text-sm font-medium">
                  <span>Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 space-y-2">
                  <a
                    href="/admin/dashboard"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/admin/orders"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    Orders
                  </a>
                  <a
                    href="/admin/users"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    Users
                  </a>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
