import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test database connection
    await dbConnect();

    // Get connection status
    const connectionState = mongoose.connection.readyState;
    let connectionStatus;

    switch (connectionState) {
      case 0:
        connectionStatus = "Disconnected";
        break;
      case 1:
        connectionStatus = "Connected";
        break;
      case 2:
        connectionStatus = "Connecting";
        break;
      case 3:
        connectionStatus = "Disconnecting";
        break;
      default:
        connectionStatus = "Unknown";
    }

    // Get environment variables (redacted for security)
    const mongoUri = process.env.MONGODB_URI
      ? process.env.MONGODB_URI.replace(
          /(mongodb(\+srv)?:\/\/[^:]+):([^@]+)@/,
          "$1:****@"
        )
      : "Not defined";

    return NextResponse.json({
      status: "success",
      connection: {
        status: connectionStatus,
        readyState: connectionState,
      },
      environment: {
        mongodbUri: mongoUri,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    console.error("Database connection test failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
