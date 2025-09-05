import dbConnect from "@/lib/mongoose";
import Subscription from "@/models/Subscription";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const subscriptions = await Subscription.find({}).sort({ createdAt: -1 });
    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return NextResponse.json(
        { error: "Email already subscribed", alreadySubscribed: true },
        { status: 400 }
      );
    }

    // Create new subscription
    const newSubscription = await Subscription.create({ email });

    return NextResponse.json({
      message: "Subscription successful",
      subscription: newSubscription,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
