import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/api/notifications";

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "order" | "profile" | "system" | "design";
  read: boolean;
  date: Date;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "read" | "date">,
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  refreshNotifications: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {},
  refreshNotifications: async () => {},
});

export function useNotifications() {
  return useContext(NotificationContext);
}

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from Supabase on mount
  useEffect(() => {
    fetchNotifications();

    // Subscribe to realtime notifications
    const subscription = supabase
      .channel("public:notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          // Add new notification to state
          const newNotification: Notification = {
            id: payload.new.id,
            title: payload.new.title,
            message: payload.new.message,
            type: payload.new.type,
            read: payload.new.is_read,
            date: new Date(payload.new.created_at),
          };
          setNotifications((prev) => [newNotification, ...prev]);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          // Update notification in state
          setNotifications((prev) =>
            prev.map((notification) =>
              notification.id === payload.new.id
                ? {
                    ...notification,
                    read: payload.new.is_read,
                    title: payload.new.title,
                    message: payload.new.message,
                  }
                : notification,
            ),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const { notifications: fetchedNotifications } = await getNotifications();
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (
    notification: Omit<Notification, "id" | "read" | "date">,
  ) => {
    // Client-side only notification (not stored in database)
    const newNotification: Notification = {
      ...notification,
      id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      read: false,
      date: new Date(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = async (id: string) => {
    try {
      // If it's a local notification (not from database)
      if (id.startsWith("local-")) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id
              ? { ...notification, read: true }
              : notification,
          ),
        );
        return;
      }

      // Update in database
      await markNotificationAsRead(id);

      // Update in state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Update in database
      await markAllNotificationsAsRead();

      // Update in state
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true })),
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const clearNotifications = () => {
    // This would only clear the local state, not the database
    // In a real implementation, you might want to add an API endpoint to delete notifications
    setNotifications([]);
  };

  const refreshNotifications = async () => {
    await fetchNotifications();
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Export as named export only
export { NotificationProvider };
