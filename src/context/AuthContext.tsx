import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { verifyToken } from "@/lib/auth";
import { logout as logoutApi } from "@/api/auth";

type User = {
  name: string;
  email: string;
  role: "designer" | "dropshipper" | "admin" | "customer";
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        // Verify token
        const payload = verifyToken(token);
        if (payload) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
          console.log("User authenticated from localStorage:", userData);
        } else {
          // Token is invalid or expired
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    logoutApi();
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
