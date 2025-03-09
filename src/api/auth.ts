// import connectToDatabase from "../lib/mongodb";
// import User from "../models/User";
import { generateToken, hashPassword } from "../lib/auth";
import { SignUpData } from "@/components/auth/SignUpForm";

export async function registerUser(userData: SignUpData) {
  try {
    // Mock user registration in browser environment
    // await connectToDatabase();

    // Check if user already exists in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = storedUsers.find(
      (user) => user.email === userData.email,
    );

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = hashPassword(userData.password);

    // Create new user
    const newUser = {
      _id: "user_" + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      accountType: userData.accountType,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to localStorage
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Generate JWT token
    const token = generateToken(newUser);

    // Store token and user data in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.accountType,
      }),
    );

    return {
      success: true,
      user: {
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.accountType,
      },
      token,
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    // Mock login in browser environment
    // await connectToDatabase();

    // Find user in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = storedUsers.find((user) => user.email === email);

    if (!user) {
      // For demo purposes, create a mock user if email contains specific roles
      if (
        email.includes("designer") ||
        email.includes("dropshipper") ||
        email.includes("admin")
      ) {
        const role = email.includes("designer")
          ? "designer"
          : email.includes("dropshipper")
            ? "dropshipper"
            : "admin";

        const mockUser = {
          _id: "mock_" + Date.now(),
          firstName: role.charAt(0).toUpperCase() + role.slice(1),
          lastName: "User",
          email: email,
          password: hashPassword(password),
          accountType: role,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Save mock user
        storedUsers.push(mockUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        // Generate token
        const token = generateToken(mockUser);

        // Store user data in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: `${mockUser.firstName} ${mockUser.lastName}`,
            email: mockUser.email,
            role: mockUser.accountType,
          }),
        );

        // Use this mock user
        return {
          success: true,
          user: {
            name: `${mockUser.firstName} ${mockUser.lastName}`,
            email: mockUser.email,
            role: mockUser.accountType,
          },
          token,
        };
      }

      throw new Error("User not found");
    }

    // Check password
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = generateToken(user);

    // Store token in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.accountType,
      }),
    );

    return {
      success: true,
      user: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.accountType,
      },
      token,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}
