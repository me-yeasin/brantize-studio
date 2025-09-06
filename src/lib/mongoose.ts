import mongoose from "mongoose";
import { logMongoDBStatus, setupMongooseDebugging } from "./db-debug";

const MONGODB_URI = process.env.MONGODB_URI;

// Set up debugging for development environment
if (process.env.NODE_ENV === "development") {
  setupMongooseDebugging();
}

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface CachedMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cached = global as typeof global & { mongoose?: CachedMongoose };

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.mongoose?.conn) {
    if (process.env.NODE_ENV === "development") {
      logMongoDBStatus(); // Log the current connection status
    }
    return cached.mongoose.conn;
  }

  if (!cached.mongoose?.promise) {
    const options = {
      autoIndex: true,
      connectTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Socket timeout
      serverSelectionTimeoutMS: 60000, // Give the server more time to respond
      // The deprecated options are removed
    };

    cached.mongoose!.promise = mongoose
      .connect(MONGODB_URI!, options)
      .then((mongoose) => {
        console.log("Connected to MongoDB");
        if (process.env.NODE_ENV === "development") {
          logMongoDBStatus(); // Log the connection status after connecting
        }
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }

  try {
    cached.mongoose!.conn = await cached.mongoose!.promise;
    return cached.mongoose!.conn;
  } catch (error) {
    console.error("Failed to establish MongoDB connection:", error);
    throw error;
  }
}

export default dbConnect;
