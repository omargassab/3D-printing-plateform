import { supabase } from "@/lib/supabase";

export interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingMethod: string;
  notes?: string;
  items: {
    designId: string;
    quantity: number;
    price: number;
    dropshipperId?: string;
  }[];
}

export async function createOrder(orderData: OrderData) {
  try {
    // Get current user if logged in
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    console.log("Creating order, authenticated user ID:", userId || "guest");

    // Calculate total amount
    const totalAmount = orderData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Generate order number
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: userId,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        shipping_address: orderData.shippingAddress,
        shipping_city: orderData.shippingCity,
        shipping_state: orderData.shippingState,
        shipping_zip: orderData.shippingZip,
        shipping_method: orderData.shippingMethod,
        notes: orderData.notes,
        total_amount: totalAmount,
        status: "processing",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    for (const item of orderData.items) {
      // Get design details to calculate royalties
      const { data: design, error: designError } = await supabase
        .from("designs")
        .select("*")
        .eq("id", item.designId)
        .single();

      if (designError) throw designError;

      // Calculate royalties and profits
      const designerRoyalty = design.price * 0.7 * item.quantity; // 70% to designer
      const dropshipperProfit = item.dropshipperId
        ? (item.price - design.price) * item.quantity
        : 0;

      // Insert order item
      const { error: itemError } = await supabase.from("order_items").insert({
        order_id: order.id,
        design_id: item.designId,
        dropshipper_id: item.dropshipperId,
        quantity: item.quantity,
        price: item.price,
        cost: design.price,
        designer_royalty: designerRoyalty,
        dropshipper_profit: dropshipperProfit,
      });

      if (itemError) throw itemError;

      // Create notification for designer
      await supabase.from("notifications").insert({
        user_id: design.designer_id,
        title: "New Order",
        message: `Your design "${design.title}" has been ordered.`,
        type: "order",
      });

      // Create notification for dropshipper if applicable
      if (item.dropshipperId) {
        await supabase.from("notifications").insert({
          user_id: item.dropshipperId,
          title: "New Order",
          message: `A product you're selling has been ordered.`,
          type: "order",
        });
      }
    }

    // Create notification for customer if logged in
    if (userId) {
      await supabase.from("notifications").insert({
        user_id: userId,
        title: "Order Confirmed",
        message: `Your order ${orderNumber} has been placed successfully.`,
        type: "order",
      });
    }

    return { success: true, orderNumber };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getCustomerOrders() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items(*, designs(title, design_images(*)))
      `,
      )
      .eq("customer_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform the data
    const formattedOrders = data.map((order) => {
      const items = order.order_items.map((item: any) => {
        const design = item.designs;
        const primaryImage = design.design_images.find(
          (img: any) => img.is_primary,
        ) ||
          design.design_images[0] || {
            image_url: "https://via.placeholder.com/300",
          };

        return {
          id: item.id,
          title: design.title,
          quantity: item.quantity,
          price: item.price,
          imageUrl: primaryImage.image_url,
        };
      });

      return {
        id: order.id,
        orderNumber: order.order_number,
        date: order.created_at,
        status: order.status,
        items: items,
        total: order.total_amount,
        trackingNumber: order.tracking_number,
      };
    });

    return { orders: formattedOrders };
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    throw error;
  }
}

export async function getDesignerOrders() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    // Get all order items for designs by this designer
    const { data, error } = await supabase
      .from("order_items")
      .select(
        `
        *,
        orders(*),
        designs(title)
      `,
      )
      .eq("designs.designer_id", session.user.id);

    if (error) throw error;

    // Group by order
    const orderMap = new Map();

    data.forEach((item: any) => {
      const order = item.orders;
      const orderId = order.id;

      if (!orderMap.has(orderId)) {
        orderMap.set(orderId, {
          id: orderId,
          orderNumber: order.order_number,
          customerName: order.customer_name,
          date: order.created_at,
          status: order.status,
          items: [],
          total: 0,
          royaltyTotal: 0,
          isPaid: false, // This would come from royalty_payments in a real implementation
        });
      }

      const orderData = orderMap.get(orderId);

      // Add item
      orderData.items.push({
        id: item.id,
        title: item.designs.title,
        quantity: item.quantity,
        price: item.price,
        royalty: item.designer_royalty,
      });

      // Update totals
      orderData.total += item.price * item.quantity;
      orderData.royaltyTotal += item.designer_royalty;
    });

    return { orders: Array.from(orderMap.values()) };
  } catch (error) {
    console.error("Error fetching designer orders:", error);
    throw error;
  }
}

export async function getDropshipperOrders() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    // Get all order items for products sold by this dropshipper
    const { data, error } = await supabase
      .from("order_items")
      .select(
        `
        *,
        orders(*),
        designs(title, design_images(*))
      `,
      )
      .eq("dropshipper_id", session.user.id);

    if (error) throw error;

    // Group by order
    const orderMap = new Map();

    data.forEach((item: any) => {
      const order = item.orders;
      const orderId = order.id;

      if (!orderMap.has(orderId)) {
        orderMap.set(orderId, {
          id: orderId,
          orderNumber: order.order_number,
          customerName: order.customer_name,
          customerEmail: order.customer_email,
          date: order.created_at,
          status: order.status,
          items: [],
          total: 0,
          profit: 0,
          shippingAddress: order.shipping_address,
          shippingMethod: order.shipping_method,
          trackingNumber: order.tracking_number,
          storeName: "Your Store", // This would come from a stores table in a real implementation
        });
      }

      const orderData = orderMap.get(orderId);

      // Get primary image
      const design = item.designs;
      const primaryImage = design.design_images.find(
        (img: any) => img.is_primary,
      ) ||
        design.design_images[0] || {
          image_url: "https://via.placeholder.com/300",
        };

      // Add item
      orderData.items.push({
        id: item.id,
        title: design.title,
        quantity: item.quantity,
        price: item.price,
        cost: item.cost,
        designerName: "Designer", // This would come from users table in a real implementation
        imageUrl: primaryImage.image_url,
      });

      // Update totals
      orderData.total += item.price * item.quantity;
      orderData.profit += item.dropshipper_profit;
    });

    return { orders: Array.from(orderMap.values()) };
  } catch (error) {
    console.error("Error fetching dropshipper orders:", error);
    throw error;
  }
}

export async function getAdminOrders() {
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

    // Get all orders
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items(*, designs(title, designer_id, users:designs_designer_id_fkey(first_name, last_name)))
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform the data
    const formattedOrders = data.map((order) => {
      const items = order.order_items.map((item: any) => {
        const design = item.designs;
        return {
          id: item.id,
          title: design.title,
          quantity: item.quantity,
          price: item.price,
          designerName: `${design.users.first_name} ${design.users.last_name}`,
        };
      });

      return {
        id: order.id,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        date: order.created_at,
        status: order.status,
        items: items,
        total: order.total_amount,
        shippingAddress: order.shipping_address,
        shippingMethod: order.shipping_method,
        trackingNumber: order.tracking_number,
      };
    });

    return { orders: formattedOrders };
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    throw error;
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  trackingNumber?: string,
) {
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

    // Update order status
    const updateData: any = { status };
    if (trackingNumber) updateData.tracking_number = trackingNumber;

    const { data, error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", orderId)
      .select("*, order_items(design_id, dropshipper_id)")
      .single();

    if (error) throw error;

    // Create notifications for customer, designers, and dropshippers
    // Get customer ID
    if (data.customer_id) {
      await supabase.from("notifications").insert({
        user_id: data.customer_id,
        title: "Order Update",
        message: `Your order ${data.order_number} status has been updated to ${status}.`,
        type: "order",
      });
    }

    // Notify designers and dropshippers
    const designerIds = new Set();
    const dropshipperIds = new Set();

    data.order_items.forEach((item: any) => {
      if (item.design_id) {
        designerIds.add(item.design_id);
      }
      if (item.dropshipper_id) {
        dropshipperIds.add(item.dropshipper_id);
      }
    });

    // Notify designers
    for (const designerId of designerIds) {
      await supabase.from("notifications").insert({
        user_id: designerId,
        title: "Order Update",
        message: `Order ${data.order_number} status has been updated to ${status}.`,
        type: "order",
      });
    }

    // Notify dropshippers
    for (const dropshipperId of dropshipperIds) {
      await supabase.from("notifications").insert({
        user_id: dropshipperId,
        title: "Order Update",
        message: `Order ${data.order_number} status has been updated to ${status}.`,
        type: "order",
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}
