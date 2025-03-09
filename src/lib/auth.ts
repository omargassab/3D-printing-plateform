import { IUser } from "../models/User";

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || "fallback_secret_key";

// Simple JWT implementation for browser environment
export function generateToken(user: Partial<IUser>) {
  const payload = {
    id: user._id,
    email: user.email,
    accountType: user.accountType,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days expiration
  };

  // Base64 encode the payload
  const encodedPayload = btoa(JSON.stringify(payload));

  // Create a simple signature (not secure for production)
  const signature = btoa(encodedPayload + JWT_SECRET);

  // Return the token in JWT format
  return `${encodedPayload}.${signature}`;
}

export function verifyToken(token: string) {
  try {
    const [encodedPayload, signature] = token.split(".");

    // Verify signature
    if (btoa(encodedPayload + JWT_SECRET) !== signature) {
      return null;
    }

    // Decode payload
    const payload = JSON.parse(atob(encodedPayload));

    // Check expiration
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export function hashPassword(password: string): string {
  // In a real app, you would use bcrypt or similar
  // For demo purposes, we're using a simple browser-compatible hash
  // DO NOT use this in production
  return btoa(password);
}

export function comparePassword(
  password: string,
  hashedPassword: string,
): boolean {
  // Again, in a real app, use bcrypt.compare
  return btoa(password) === hashedPassword;
}
