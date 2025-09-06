import mongoose from "mongoose";

// Enable mongoose debugging to get more detailed logs
mongoose.set("debug", process.env.NODE_ENV === "development");

export function logMongoDBStatus() {
  const readyState = mongoose.connection.readyState;
  const states = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  console.log(
    `MongoDB Connection Status: ${
      states[readyState as keyof typeof states] || "Unknown"
    }`
  );

  if (readyState !== 1) {
    console.log("MongoDB connection details:");
    console.log(`Host: ${mongoose.connection.host || "Not connected"}`);
    console.log(`Port: ${mongoose.connection.port || "Not connected"}`);
    console.log(
      `Database Name: ${mongoose.connection.name || "Not connected"}`
    );
  }
}

export function setupMongooseDebugging() {
  mongoose.connection.on("connecting", () => {
    console.log("MongoDB: Connecting to database...");
  });

  mongoose.connection.on("connected", () => {
    console.log("MongoDB: Successfully connected to database");
  });

  mongoose.connection.on("disconnecting", () => {
    console.log("MongoDB: Disconnecting from database...");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB: Disconnected from database");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB Connection Error:", err);
  });
}
