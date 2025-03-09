import { supabase } from "@/lib/supabase";

export async function getDropshipperProducts() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("dropshipper_products")
      .select(
        `
        *,
        designs(*, users:designs_designer_id_fkey(first_name, last_name), design_images(*))
      `,
      )
      .eq("dropshipper_id", session.user.id);

    if (error) throw error;

    // Transform the data
    const formattedProducts = data.map((product) => {
      const design = product.designs;
      const primaryImage = design.design_images.find(
        (img: any) => img.is_primary,
      ) ||
        design.design_images[0] || {
          image_url: "https://via.placeholder.com/300",
        };

      return {
        id: product.id,
        title: design.title,
        designerName: `${design.users.first_name} ${design.users.last_name}`,
        originalPrice: design.price,
        yourPrice: product.price,
        profit: product.price - design.price,
        category: design.category,
        imageUrl: primaryImage.image_url,
        active: product.is_active,
        sales: 0, // This would come from order_items in a real implementation
      };
    });

    return { products: formattedProducts };
  } catch (error) {
    console.error("Error fetching dropshipper products:", error);
    throw error;
  }
}

export async function addDropshipperProduct(designId: string, price: number) {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    // Verify user is a dropshipper
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("account_type")
      .eq("id", session.user.id)
      .single();

    if (userError) throw userError;
    if (userData.account_type !== "dropshipper")
      throw new Error("Unauthorized");

    // Insert product
    const { data, error } = await supabase
      .from("dropshipper_products")
      .insert({
        dropshipper_id: session.user.id,
        design_id: designId,
        price: price,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, productId: data.id };
  } catch (error) {
    console.error("Error adding dropshipper product:", error);
    throw error;
  }
}

export async function updateDropshipperProduct(
  productId: string,
  updates: { price?: number; isActive?: boolean },
) {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    const updateData: any = {};
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.isActive !== undefined) updateData.is_active = updates.isActive;

    const { error } = await supabase
      .from("dropshipper_products")
      .update(updateData)
      .eq("id", productId)
      .eq("dropshipper_id", session.user.id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error updating dropshipper product:", error);
    throw error;
  }
}

export async function getDropshipperDashboardStats() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    // Get product count
    const { data: productsData, error: productsError } = await supabase
      .from("dropshipper_products")
      .select("id", { count: "exact" })
      .eq("dropshipper_id", session.user.id);

    if (productsError) throw productsError;

    // Get active product count
    const { data: activeProductsData, error: activeProductsError } =
      await supabase
        .from("dropshipper_products")
        .select("id", { count: "exact" })
        .eq("dropshipper_id", session.user.id)
        .eq("is_active", true);

    if (activeProductsError) throw activeProductsError;

    // Get order items and calculate total sales and profit
    const { data: orderItemsData, error: orderItemsError } = await supabase
      .from("order_items")
      .select("quantity, dropshipper_profit")
      .eq("dropshipper_id", session.user.id);

    if (orderItemsError) throw orderItemsError;

    const totalSales = orderItemsData.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalProfit = orderItemsData.reduce(
      (sum, item) => sum + item.dropshipper_profit,
      0,
    );

    return {
      totalProducts: productsData.length,
      activeProducts: activeProductsData.length,
      totalSales,
      totalProfit,
    };
  } catch (error) {
    console.error("Error fetching dropshipper dashboard stats:", error);
    throw error;
  }
}
