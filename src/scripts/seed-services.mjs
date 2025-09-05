import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from the project root
dotenv.config({ path: resolve(__dirname, "../../.env.local") });

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in your .env.local file");
}

// Sample services data
const servicesData = [
  {
    title: "Auto Email Responder",
    description:
      "Intelligent email automation that understands context and crafts personalized responses, reducing response time by 80%.",
    icon: "MdOutlineEmail",
    order: 1,
    active: true,
  },
  {
    title: "Alert System",
    description:
      "Intelligent alert system that monitors your applications and notifies you of any issues in real-time.",
    icon: "AiFillAlert",
    order: 0,
    active: true,
  },
  {
    title: "Document Summarizer",
    description:
      "Advanced AI that processes and summarizes complex documents, extracting key insights and saving hours of manual work.",
    icon: "HiOutlineDocumentText",
    order: 2,
    active: true,
  },
  {
    title: "Data Analysis Agent",
    description:
      "Transform raw data into actionable insights with our AI-powered analytics agents that identify trends and opportunities.",
    icon: "MdAnalytics",
    order: 3,
    active: true,
  },
  {
    title: "Customer Support Bot",
    description:
      "24/7 intelligent customer support that handles inquiries, resolves issues, and escalates when necessary.",
    icon: "FaRobot",
    order: 4,
    active: true,
  },
  {
    title: "Scheduling Assistant",
    description:
      "Smart scheduling that coordinates with multiple calendars, finds optimal meeting times, and sends reminders.",
    icon: "MdOutlineCalendarMonth",
    order: 5,
    active: true,
  },
  {
    title: "Custom AI Development",
    description:
      "Tailored AI solutions designed specifically for your unique business challenges and workflow requirements.",
    icon: "SiOpenai",
    order: 6,
    active: true,
  },
  {
    title: "Code Generation",
    description:
      "AI-powered code generation and assistance for developers, accelerating development cycles and improving code quality.",
    icon: "BsCodeSlash",
    order: 7,
    active: true,
  },
];

async function seedServices() {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    console.log("Connected to MongoDB");
    const database = client.db();
    const servicesCollection = database.collection("services");

    // Clear existing services
    console.log("Clearing existing services...");
    await servicesCollection.deleteMany({});

    // Insert new services
    console.log("Adding new services...");
    await servicesCollection.insertMany(servicesData);

    console.log("Services seeded successfully!");
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding services:", error);
    process.exit(1);
  }
}

seedServices();
