import { supabase } from "@/lib/supabase";

export interface DesignUploadData {
  title: string;
  description: string;
  category: string;
  price: number;
  materials: string[];
  fileUrl?: string; // Will be populated after file upload
  thumbnailUrl?: string; // Will be populated after thumbnail upload
  additionalImages?: string[]; // Will be populated after additional images upload
}

export async function uploadDesignFile(file: File) {
  try {
    // Check if bucket exists and create it if needed
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const designsBucketExists = buckets?.some(
        (bucket) => bucket.name === "designs",
      );

      if (!designsBucketExists) {
        console.log("Creating designs bucket");
        await supabase.storage.createBucket("designs", { public: true });
      }
    } catch (err) {
      console.error("Error checking/creating bucket:", err);
    }

    // Create folder path if it doesn't exist
    const folderPath = "design_files";

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("designs")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("designs")
      .getPublicUrl(filePath);

    return { success: true, fileUrl: urlData.publicUrl };
  } catch (error) {
    console.error("Error uploading design file:", error);
    throw error;
  }
}

export async function uploadDesignImage(
  file: File,
  isPrimary: boolean = false,
) {
  try {
    // Check if bucket exists and create it if needed
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const designsBucketExists = buckets?.some(
        (bucket) => bucket.name === "designs",
      );

      if (!designsBucketExists) {
        console.log("Creating designs bucket");
        await supabase.storage.createBucket("designs", { public: true });
      }
    } catch (err) {
      console.error("Error checking/creating bucket:", err);
    }

    // Create folder path if it doesn't exist
    const folderPath = "design_images";

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("designs")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("designs")
      .getPublicUrl(filePath);

    return { success: true, imageUrl: urlData.publicUrl };
  } catch (error) {
    console.error("Error uploading design image:", error);
    throw error;
  }
}

export async function createDesign(designData: DesignUploadData) {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    console.log("Creating design with user ID:", session.user.id);

    // Insert design with explicit designer_id
    const { data: design, error: designError } = await supabase
      .from("designs")
      .insert({
        title: designData.title,
        description: designData.description,
        category: designData.category,
        price: designData.price,
        materials: designData.materials,
        file_url: designData.fileUrl,
        designer_id: session.user.id,
        status: "active",
      })
      .select()
      .single();

    if (designError) {
      console.error("Design insert error:", designError);
      throw designError;
    }

    console.log("Design created successfully:", design.id);

    // Insert primary image
    if (designData.thumbnailUrl) {
      const { error: imageError } = await supabase
        .from("design_images")
        .insert({
          design_id: design.id,
          image_url: designData.thumbnailUrl,
          is_primary: true,
        });

      if (imageError) {
        console.error("Primary image insert error:", imageError);
        throw imageError;
      }
    }

    // Insert additional images
    if (designData.additionalImages && designData.additionalImages.length > 0) {
      const imageInserts = designData.additionalImages.map((imageUrl) => ({
        design_id: design.id,
        image_url: imageUrl,
        is_primary: false,
      }));

      const { error: imagesError } = await supabase
        .from("design_images")
        .insert(imageInserts);

      if (imagesError) {
        console.error("Additional images insert error:", imagesError);
        throw imagesError;
      }
    }

    return { success: true, designId: design.id };
  } catch (error) {
    console.error("Error creating design:", error);
    throw error;
  }
}

export async function getDesigns(
  options: {
    category?: string;
    priceRange?: [number, number];
    designerId?: string;
    searchQuery?: string;
    sortBy?: string;
    limit?: number;
    offset?: number;
  } = {},
) {
  try {
    let query = supabase
      .from("designs")
      .select(
        `
        *,
        design_images(*),
        users!designs_designer_id_fkey(first_name, last_name)
      `,
      )
      .eq("status", "active");

    // Apply filters
    if (options.category) {
      query = query.eq("category", options.category);
    }

    if (options.priceRange) {
      query = query
        .gte("price", options.priceRange[0])
        .lte("price", options.priceRange[1]);
    }

    if (options.designerId) {
      query = query.eq("designer_id", options.designerId);
    }

    if (options.searchQuery) {
      query = query.or(
        `title.ilike.%${options.searchQuery}%,description.ilike.%${options.searchQuery}%`,
      );
    }

    // Apply sorting
    if (options.sortBy) {
      switch (options.sortBy) {
        case "price-low":
          query = query.order("price", { ascending: true });
          break;
        case "price-high":
          query = query.order("price", { ascending: false });
          break;
        case "newest":
          query = query.order("created_at", { ascending: false });
          break;
        case "rating":
          query = query.order("average_rating", { ascending: false });
          break;
        default:
          query = query.order("created_at", { ascending: false });
      }
    } else {
      query = query.order("created_at", { ascending: false });
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 20) - 1,
      );
    }

    const { data, error, count } = await query;

    if (error) throw error;

    // Format the data
    const formattedDesigns = data.map((design) => {
      const primaryImage = design.design_images.find((img) => img.is_primary) ||
        design.design_images[0] || {
          image_url: "https://via.placeholder.com/300",
        };

      return {
        id: design.id,
        title: design.title,
        description: design.description,
        price: design.price,
        category: design.category,
        materials: design.materials,
        thumbnailUrl: primaryImage.image_url,
        designerName: `${design.users.first_name} ${design.users.last_name}`,
        designerId: design.designer_id,
        createdAt: design.created_at,
        rating: design.average_rating || 0,
        salesCount: design.sales_count || 0,
      };
    });

    return { designs: formattedDesigns, count };
  } catch (error) {
    console.error("Error fetching designs:", error);
    throw error;
  }
}

export async function getDesignDetails(designId: string) {
  try {
    // Get design with images
    const { data, error } = await supabase
      .from("designs")
      .select(
        `
        *,
        design_images(*),
        users!designs_designer_id_fkey(first_name, last_name)
      `,
      )
      .eq("id", designId)
      .single();

    if (error) throw error;

    // Format the data
    const primaryImage = data.design_images.find((img) => img.is_primary) ||
      data.design_images[0] || { image_url: "https://via.placeholder.com/300" };

    const additionalImages = data.design_images
      .filter((img) => !img.is_primary)
      .map((img) => img.image_url);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      materials: data.materials,
      status: data.status,
      createdAt: data.created_at,
      fileUrl: data.file_url,
      thumbnailUrl: primaryImage.image_url,
      additionalImages,
      designerName: `${data.users.first_name} ${data.users.last_name}`,
      designerId: data.designer_id,
      salesCount: data.sales_count || 0,
      viewCount: data.view_count || 0,
      rating: data.average_rating || 0,
    };
  } catch (error) {
    console.error("Error fetching design details:", error);
    throw error;
  }
}

export async function getDesignerDesigns() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    // Get designs with their images
    const { data, error } = await supabase
      .from("designs")
      .select(
        `
        *,
        design_images(*)
      `,
      )
      .eq("designer_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Format the data
    const formattedDesigns = data.map((design) => {
      const primaryImage = design.design_images.find((img) => img.is_primary) ||
        design.design_images[0] || {
          image_url: "https://via.placeholder.com/300",
        };

      return {
        id: design.id,
        title: design.title,
        description: design.description,
        price: design.price,
        category: design.category,
        materials: design.materials,
        status: design.status,
        createdAt: design.created_at,
        thumbnailUrl: primaryImage.image_url,
        salesCount: design.sales_count || 0,
        viewCount: design.view_count || 0,
      };
    });

    return { designs: formattedDesigns };
  } catch (error) {
    console.error("Error fetching designer designs:", error);
    throw error;
  }
}

export async function deleteDesign(designId: string) {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    // Verify ownership
    const { data: designCheck, error: checkError } = await supabase
      .from("designs")
      .select("designer_id")
      .eq("id", designId)
      .single();

    if (checkError) throw checkError;
    if (designCheck.designer_id !== session.user.id)
      throw new Error("Unauthorized");

    // Delete design (images will be deleted via cascade)
    const { error: deleteError } = await supabase
      .from("designs")
      .delete()
      .eq("id", designId);

    if (deleteError) throw deleteError;

    return { success: true };
  } catch (error) {
    console.error("Error deleting design:", error);
    throw error;
  }
}
