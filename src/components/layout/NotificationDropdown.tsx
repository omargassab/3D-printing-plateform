import React from "react";
import { useNotifications, Notification } from "@/context/NotificationContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, CheckCircle, User, Package, Info, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <Package className="h-4 w-4 text-blue-500" />;
      case "profile":
        return <User className="h-4 w-4 text-green-500" />;
      case "design":
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      case "system":
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-8 text-xs"
            >
              <Check className="h-3 w-3 mr-1" /> Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-4 px-2 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-3 cursor-default ${!notification.read ? "bg-muted/50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3 w-full">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(notification.date)}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
