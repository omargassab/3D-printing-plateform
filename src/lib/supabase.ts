import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

console.log("Initializing Supabase client with:");
console.log("URL:", supabaseUrl ? "URL exists" : "URL missing");
console.log("Key:", supabaseAnonKey ? "Key exists" : "Key missing");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Test the connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log(
    "Supabase auth state changed:",
    event,
    session ? "Session exists" : "No session",
  );
});

// Verify the client is working
supabase.auth.getSession().then(({ data, error }) => {
  console.log(
    "Initial session check:",
    data.session ? "Session exists" : "No session",
    error ? `Error: ${error.message}` : "No error",
  );
});
