import { supabase } from "@/lib/supabase";

export async function getUsers() {
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

    // Get all users
    const { data, error } = await supabase.from("users").select("*");

    if (error) throw error;

    // Transform the data
    const formattedUsers = data.map((user) => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.account_type,
      status: "active", // This would come from a status field in a real implementation
      joinDate: user.created_at,
      avatar:
        user.avatar_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name}`,
    }));

    return { users: formattedUsers };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function updateUserStatus(userId: string, status: string) {
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

    // In a real implementation, you would update a status field
    // For now, we'll just return success
    return { success: true };
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
}

export async function updateUserProfile(profileData: {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarFile?: File;
}) {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    const updates: any = {};

    if (profileData.firstName) updates.first_name = profileData.firstName;
    if (profileData.lastName) updates.last_name = profileData.lastName;
    if (profileData.bio) updates.bio = profileData.bio;

    // Upload avatar if provided
    if (profileData.avatarFile) {
      const fileName = `${session.user.id}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, profileData.avatarFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      updates.avatar_url = publicUrlData.publicUrl;
    }

    // Update profile
    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", session.user.id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function getUserProfile() {
  try {
    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      role: data.account_type,
      avatar: data.avatar_url,
      bio: data.bio || "",
      joinDate: new Date(data.created_at).toLocaleDateString(),
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
