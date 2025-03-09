import mongoose from "mongoose";

// Use import.meta.env for Vite instead of process.env
const MONGODB_URI =
  import.meta.env.VITE_MONGODB_URI || "mongodb://localhost:27017/3dprintmarket";

// Mock connection for browser environment
let mockConnection = null;

async function connectToDatabase() {
  // In browser environment, return a mock connection
  if (typeof window !== "undefined") {
    console.log("Browser environment detected, using mock MongoDB connection");

    // If we don't have a mock connection yet, create one
    if (!mockConnection) {
      mockConnection = {
        // Mock methods and properties that might be used
        models: {
          User: {
            findOne: async () => null,
            create: async (data) => ({ ...data, _id: "mock-id-" + Date.now() }),
          },
        },
        model: () => ({
          findOne: async () => null,
          save: async () => ({}),
        }),
      };
    }

    return mockConnection;
  }

  // This code won't run in the browser, but we keep it for server-side use
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default connectToDatabase;
