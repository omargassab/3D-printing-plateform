import { supabase } from "@/lib/supabase";

export async function getAdminDashboardStats() {
  try {
    // Get current user and verify admin status
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    // Verify admin status
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("account_type")
      .eq("id", session.user.id)
      .single();

    if (userError) throw userError;
    if (userData.account_type !== "admin") throw new Error("Unauthorized");

    // Get user counts by role
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("account_type");

    if (usersError) throw usersError;

    const userCounts = {
      total: usersData.length,
      designers: usersData.filter((u: any) => u.account_type === "designer")
        .length,
      dropshippers: usersData.filter(
        (u: any) => u.account_type === "dropshipper",
      ).length,
      customers: usersData.filter((u: any) => u.account_type === "customer")
        .length,
      admins: usersData.filter((u: any) => u.account_type === "admin").length,
    };

    // Get design count
    const { data: designsData, error: designsError } = await supabase
      .from("designs")
      .select("id", { count: "exact" });

    if (designsError) throw designsError;

    // Get order counts by status
    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("status, total_amount");

    if (ordersError) throw ordersError;

    const orderCounts = {
      total: ordersData.length,
      processing: ordersData.filter((o: any) => o.status === "processing")
        .length,
      printing: ordersData.filter((o: any) => o.status === "printing").length,
      shipped: ordersData.filter((o: any) => o.status === "shipped").length,
      delivered: ordersData.filter((o: any) => o.status === "delivered").length,
      cancelled: ordersData.filter((o: any) => o.status === "cancelled").length,
    };

    // Calculate total revenue
    const totalRevenue = ordersData.reduce(
      (sum, order: any) => sum + order.total_amount,
      0,
    );

    // Get recent orders
    const { data: recentOrdersData, error: recentOrdersError } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items(count)
      `,
      )
      .order("created_at", { ascending: false })
      .limit(5);

    if (recentOrdersError) throw recentOrdersError;

    const recentOrders = recentOrdersData.map((order: any) => ({
      id: order.id,
      orderNumber: order.order_number,
      customerName: order.customer_name,
      date: order.created_at,
      status: order.status,
      total: order.total_amount,
      itemCount: order.order_items[0]?.count || 0,
    }));

    return {
      userCounts,
      designCount: designsData.length,
      orderCounts,
      totalRevenue,
      recentOrders,
    };
  } catch (error) {
    console.error("Error fetching admin dashboard stats:", error);
    throw error;
  }
}
