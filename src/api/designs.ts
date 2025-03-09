import { supabase } from "@/lib/supabase";

export interface DesignData {
  title: string;
  description: string;
  price: number;
  category: string;
  materials: string[];
}

export async function getDesigns(filters?: {
  category?: string[];
  priceRange?: [number, number];
  designers?: string[];
  materials?: string[];
  searchQuery?: string;
  sortBy?: string;
}) {
  try {
    let query = supabase
      .from("designs")
      .select(
        `
        *,
        users!designs_designer_id_fkey(first_name, last_name),
        design_images(*),
        design_materials(*)
      `,
      )
      .eq("is_active", true);

    // Apply filters
    if (filters) {
      // Category filter
      if (filters.category && filters.category.length > 0) {
        query = query.in("category", filters.category);
      }

      // Price range filter
      if (filters.priceRange) {
        query = query
          .gte("price", filters.priceRange[0])
          .lte("price", filters.priceRange[1]);
      }

      // Designer filter
      if (filters.designers && filters.designers.length > 0) {
        query = query.in("designer_id", filters.designers);
      }

      // Materials filter
      if (filters.materials && filters.materials.length > 0) {
        query = query.or(
          filters.materials
            .map((material) => `design_materials.material.eq.${material}`)
            .join(","),
        );
      }

      // Search query
      if (filters.searchQuery) {
        query = query.or(
          `title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`,
        );
      }
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform the data to match the expected format
    const formattedDesigns = data.map((design) => {
      const primaryImage = design.design_images.find(
        (img: any) => img.is_primary,
      ) ||
        design.design_images[0] || {
          image_url: "https://via.placeholder.com/300",
        };

      const materials = design.design_materials.map((m: any) => m.material);

      return {
        id: design.id,
        title: design.title,
        designerName: `${design.users.first_name} ${design.users.last_name}`,
        price: design.price,
        imageUrl: primaryImage.image_url,
        category: design.category,
        isNew:
          new Date(design.created_at).getTime() >
          Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days
        rating: design.rating || 4.5, // Default rating
        materials: materials,
        description: design.description,
      };
    });

    // Apply sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case "price-low":
          formattedDesigns.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          formattedDesigns.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          formattedDesigns.sort((a, b) => (a.isNew ? -1 : b.isNew ? 1 : 0));
          break;
        case "rating":
          formattedDesigns.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        // 'featured' is default, no sorting needed
      }
    }

    return { designs: formattedDesigns };
  } catch (error) {
    console.error("Error fetching designs:", error);
    throw error;
  }
}

export async function getDesignById(id: string) {
  try {
    const { data, error } = await supabase
      .from("designs")
      .select(
        `
        *,
        users!designs_designer_id_fkey(id, first_name, last_name, email, avatar_url),
        design_images(*),
        design_materials(*)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Design not found");

    const images = data.design_images.map((img: any) => img.image_url);
    const materials = data.design_materials.map((m: any) => m.material);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      designer: {
        id: data.users.id,
        name: `${data.users.first_name} ${data.users.last_name}`,
        email: data.users.email,
        avatar: data.users.avatar_url,
      },
      images: images,
      materials: materials,
      isActive: data.is_active,
      isFeatured: data.is_featured,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error("Error fetching design:", error);
    throw error;
  }
}

export async function createDesign(
  designData: DesignData,
  files: File[],
  images: File[],
) {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    // Insert design
    const { data: design, error: designError } = await supabase
      .from("designs")
      .insert({
        title: designData.title,
        description: designData.description,
        designer_id: session.user.id,
        price: designData.price,
        category: designData.category,
      })
      .select()
      .single();

    if (designError) throw designError;

    // Upload files
    for (const file of files) {
      const filePath = `designs/${design.id}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("design-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Insert file record
      const { error: fileRecordError } = await supabase
        .from("design_files")
        .insert({
          design_id: design.id,
          file_path: filePath,
          file_type: file.type,
          is_primary: files.indexOf(file) === 0, // First file is primary
        });

      if (fileRecordError) throw fileRecordError;
    }

    // Upload images
    for (const image of images) {
      const imagePath = `designs/${design.id}/${image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("design-images")
        .upload(imagePath, image);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("design-images")
        .getPublicUrl(imagePath);

      // Insert image record
      const { error: imageRecordError } = await supabase
        .from("design_images")
        .insert({
          design_id: design.id,
          image_url: publicUrlData.publicUrl,
          is_primary: images.indexOf(image) === 0, // First image is primary
        });

      if (imageRecordError) throw imageRecordError;
    }

    // Insert materials
    for (const material of designData.materials) {
      const { error: materialError } = await supabase
        .from("design_materials")
        .insert({
          design_id: design.id,
          material: material,
        });

      if (materialError) throw materialError;
    }

    return { success: true, designId: design.id };
  } catch (error) {
    console.error("Error creating design:", error);
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

    const { data, error } = await supabase
      .from("designs")
      .select(
        `
        *,
        design_images(*),
        order_items(count)
      `,
      )
      .eq("designer_id", session.user.id);

    if (error) throw error;

    // Transform the data
    const formattedDesigns = data.map((design) => {
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
        category: design.category,
        isActive: design.is_active,
        isFeatured: design.is_featured,
        sales: design.order_items[0]?.count || 0,
        createdAt: design.created_at,
      };
    });

    return { designs: formattedDesigns };
  } catch (error) {
    console.error("Error fetching designer designs:", error);
    throw error;
  }
}
