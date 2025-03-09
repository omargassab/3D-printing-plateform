import { supabase } from "@/lib/supabase";
import { SignUpData } from "@/components/auth/SignUpForm";

// Simple function to delay execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function registerUser(userData: SignUpData) {
  try {
    console.log("Registering user with email:", userData.email);

    // Step 1: Create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          account_type: userData.accountType,
        },
      },
    });

    if (authError) {
      console.error("Auth signup error:", authError);
      throw authError;
    }

    if (!authData.user) {
      console.error("No user returned from auth signup");
      throw new Error("Failed to create user");
    }

    console.log("Auth user created with ID:", authData.user.id);
    console.log("Session data:", authData.session);

    // Step 2: Create the user profile in the users table
    // Wait a bit to ensure auth is processed
    await delay(1000);

    // Create user profile
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      account_type: userData.accountType,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // We'll continue anyway since the auth user was created
    } else {
      console.log("User profile created successfully");
    }

    // Step 3: Return the user data
    return {
      success: true,
      user: {
        id: authData.user.id,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: userData.accountType,
      },
      session: authData.session,
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    console.log("Login attempt for:", email);

    // Step 1: Sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      throw error;
    }

    if (!data.user) {
      console.error("No user returned from login");
      throw new Error("User not found");
    }

    console.log("User authenticated successfully");
    console.log("Session data:", data.session);

    // Step 2: Get user profile data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    // If profile doesn't exist, create it from auth metadata
    if (userError) {
      console.log("User profile not found, creating from auth metadata");
      const metadata = data.user.user_metadata;

      // Create user profile
      const { data: newUserData, error: insertError } = await supabase
        .from("users")
        .insert({
          id: data.user.id,
          first_name: metadata?.first_name || "",
          last_name: metadata?.last_name || "",
          email: data.user.email || "",
          account_type: metadata?.account_type || "customer",
        })
        .select()
        .single();

      if (insertError) {
        console.error("Error creating user profile:", insertError);
        // Fall back to auth data
        return {
          success: true,
          user: {
            id: data.user.id,
            name:
              `${metadata?.first_name || ""} ${metadata?.last_name || ""}`.trim() ||
              data.user.email?.split("@")[0] ||
              "User",
            email: data.user.email || "",
            role: metadata?.account_type || "customer",
          },
          session: data.session,
        };
      }

      return {
        success: true,
        user: {
          id: newUserData.id,
          name: `${newUserData.first_name} ${newUserData.last_name}`,
          email: newUserData.email,
          role: newUserData.account_type,
        },
        session: data.session,
      };
    }

    // Return user data from profile
    return {
      success: true,
      user: {
        id: userData.id,
        name: `${userData.first_name} ${userData.last_name}`,
        email: userData.email,
        role: userData.account_type,
      },
      session: data.session,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    // Get current session
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) return { user: null };

    // Get user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", sessionData.session.user.id)
      .single();

    if (userError) {
      console.error("Error fetching user profile:", userError);
      return { user: null };
    }

    return {
      user: {
        id: userData.id,
        name: `${userData.first_name} ${userData.last_name}`,
        email: userData.email,
        role: userData.account_type,
        avatar: userData.avatar_url,
      },
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return { user: null };
  }
}
