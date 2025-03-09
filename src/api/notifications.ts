import { supabase } from "@/lib/supabase";
import { Notification } from "@/context/NotificationContext";

export async function getNotifications() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform the data
    const notifications: Notification[] = data.map((notification: any) => ({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      read: notification.is_read,
      date: new Date(notification.created_at),
    }));

    return { notifications };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { notifications: [] };
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId)
      .eq("user_id", session.user.id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

export async function markAllNotificationsAsRead() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", session.user.id)
      .eq("is_read", false);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
}

export async function createNotification(
  userId: string,
  notification: Omit<Notification, "id" | "read" | "date">,
) {
  try {
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      is_read: false,
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}
