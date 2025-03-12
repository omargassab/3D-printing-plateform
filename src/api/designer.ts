import { supabase } from "@/lib/supabase";

export async function getDesignerDashboardStats() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    // Get design count
    const { data: designsData, error: designsError } = await supabase
      .from("designs")
      .select("id", { count: "exact" })
      .eq("designer_id", session.user.id);

    if (designsError) throw designsError;

    // Get active design count
    const { data: activeDesignsData, error: activeDesignsError } =
      await supabase
        .from("designs")
        .select("id", { count: "exact" })
        .eq("designer_id", session.user.id)
        .eq("status", "active");

    if (activeDesignsError) throw activeDesignsError;

    // Get order items and calculate total sales and revenue
    const { data: orderItemsData, error: orderItemsError } = await supabase
      .from("order_items")
      .select("quantity, designer_royalty")
      .in(
        "design_id",
        designsData.map((d: any) => d.id),
      );

    if (orderItemsError) throw orderItemsError;

    const totalSales = orderItemsData
      ? orderItemsData.reduce((sum, item) => sum + item.quantity, 0)
      : 0;
    const totalRevenue = orderItemsData
      ? orderItemsData.reduce((sum, item) => sum + item.designer_royalty, 0)
      : 0;

    // Get recent designs
    const { data: recentDesignsData, error: recentDesignsError } =
      await supabase
        .from("designs")
        .select(
          `
        *,
        design_images(*)
      `,
        )
        .eq("designer_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(5);

    if (recentDesignsError) throw recentDesignsError;

    const recentDesigns = recentDesignsData.map((design: any) => {
      const primaryImage = design.design_images.find(
        (img: any) => img.is_primary,
      ) ||
        design.design_images[0] || {
          image_url: "https://via.placeholder.com/300",
        };

      return {
        id: design.id,
        title: design.title,
        price: design.price,
        imageUrl: primaryImage.image_url,
        createdAt: design.created_at,
      };
    });

    return {
      totalDesigns: designsData.length,
      activeDesigns: activeDesignsData.length,
      totalSales,
      totalRevenue,
      recentDesigns,
    };
  } catch (error) {
    console.error("Error fetching designer dashboard stats:", error);
    throw error;
  }
}
