import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { logout as logoutApi, getCurrentUser } from "@/api/auth";

type User = {
  id?: string;
  name: string;
  email: string;
  role: "designer" | "dropshipper" | "admin" | "customer";
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (session: any, userData: User) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    if (initialized) return;

    // Check localStorage first for faster initial state
    const storedUser = localStorage.getItem("authUser");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth === "true") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log("User authenticated from localStorage:", parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        // Clear invalid data
        localStorage.removeItem("authUser");
        localStorage.removeItem("isAuthenticated");
      }
    }

    const checkSession = async () => {
      try {
        // Get current session from Supabase
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          console.log("Found existing session:", session.user.id);
          // Get user data from our users table
          const { user: currentUser } = await getCurrentUser();

          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
            // Update localStorage
            localStorage.setItem("authUser", JSON.stringify(currentUser));
            localStorage.setItem("isAuthenticated", "true");
            console.log(
              "User authenticated from Supabase session:",
              currentUser,
            );
          }
        } else {
          console.log("No active session found");
          // Clear any stale data
          localStorage.removeItem("authUser");
          localStorage.removeItem("isAuthenticated");
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    checkSession();
  }, [initialized]);

  // Set up auth state change listener
  useEffect(() => {
    if (!initialized) return;

    console.log("Setting up auth state change listener");

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "Auth state changed:",
        event,
        session ? "Session exists" : "No session",
      );

      // Prevent handling the same event multiple times
      if (event === "SIGNED_IN" && session) {
        // Only update if not already authenticated with this user
        if (!isAuthenticated || user?.id !== session.user.id) {
          console.log("Processing SIGNED_IN event");
          // Get user data from our users table
          const { user: currentUser } = await getCurrentUser();

          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
            localStorage.setItem("authUser", JSON.stringify(currentUser));
            localStorage.setItem("isAuthenticated", "true");
            console.log("User signed in:", currentUser);
          }
        } else {
          console.log("Ignoring duplicate SIGNED_IN event");
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("authUser");
        localStorage.removeItem("isAuthenticated");
        console.log("User signed out");
      }
    });

    // Clean up subscription
    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [initialized, isAuthenticated, user]);

  const login = (session: any, userData: User) => {
    console.log("AuthContext login called with user:", userData);
    console.log("Session data:", session);

    // Store auth data in localStorage for persistence
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");

    // Update state
    setUser(userData);
    setIsAuthenticated(true);
    console.log("Auth state updated, isAuthenticated:", true);
  };

  const logout = async () => {
    try {
      console.log("Logout initiated");
      // First clear local state
      setUser(null);
      setIsAuthenticated(false);

      // Clear localStorage
      localStorage.removeItem("authUser");
      localStorage.removeItem("isAuthenticated");

      // Clear cart data
      localStorage.removeItem("cart");
      sessionStorage.removeItem("tempCart");

      // Call API to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      console.log("Logout successful");

      // Force page reload to clear any cached state
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
      // Force reload anyway in case of error
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export as default for Fast Refresh compatibility
export default AuthProvider;
