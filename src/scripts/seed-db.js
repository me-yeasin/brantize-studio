/**
 * Database seeding script for Brandtize Studio
 *
 * Usage:
 * - npm run db:seed
 */

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
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();

    // Clear existing collections
    await db.collection("blogposts").deleteMany({});
    await db.collection("projects").deleteMany({});

    // Insert sample blog posts
    const blogPosts = [
      {
        title: "How to Create Engaging Brand Experiences",
        slug: "how-to-create-engaging-brand-experiences",
        content:
          "# Creating Engaging Brand Experiences\n\nIn today's competitive market, creating memorable brand experiences is crucial...",
        excerpt:
          "Learn the secrets to creating memorable brand experiences that resonate with your audience.",
        coverImage: "/images/blogs/brand-experiences.jpg",
        author: {
          name: "Jane Smith",
          image: "/images/authors/jane-smith.jpg",
        },
        categories: ["Branding", "Marketing"],
        tags: ["brand experience", "customer engagement", "marketing strategy"],
        publishedAt: new Date("2025-08-15"),
        updatedAt: new Date("2025-08-15"),
        featured: true,
      },
      {
        title: "The Impact of Color Psychology in Web Design",
        slug: "impact-of-color-psychology-in-web-design",
        content:
          "# Color Psychology in Web Design\n\nColors have a profound impact on how users perceive your website...",
        excerpt:
          "Discover how color choices influence user perception and behavior on your website.",
        coverImage: "/images/blogs/color-psychology.jpg",
        author: {
          name: "Michael Brown",
          image: "/images/authors/michael-brown.jpg",
        },
        categories: ["Web Design", "UX/UI"],
        tags: ["color theory", "web design", "user experience", "psychology"],
        publishedAt: new Date("2025-08-10"),
        updatedAt: new Date("2025-08-12"),
        featured: false,
      },
    ];

    const blogResult = await db.collection("blogposts").insertMany(blogPosts);
    console.log(`${blogResult.insertedCount} blog posts inserted`);

    // Insert sample projects
    const projects = [
      {
        title: "E-commerce Redesign for Fashion Brand",
        slug: "ecommerce-redesign-fashion-brand",
        description:
          "Complete redesign of an e-commerce platform for a premium fashion brand, focusing on user experience and conversion optimization.",
        excerpt:
          "A UX-focused redesign that increased conversion rates by 35% for a leading fashion retailer.",
        coverImage: "/images/projects/fashion-ecommerce.jpg",
        gallery: [
          "/images/projects/fashion-ecommerce-1.jpg",
          "/images/projects/fashion-ecommerce-2.jpg",
          "/images/projects/fashion-ecommerce-3.jpg",
        ],
        client: "StyleHouse Apparel",
        technologies: ["Next.js", "Tailwind CSS", "Shopify API", "Stripe"],
        features: [
          "Responsive design",
          "Advanced filtering",
          "Quick view",
          "AR try-on",
          "Personalized recommendations",
        ],
        process: [
          {
            title: "Research",
            description:
              "Conducted user interviews and competitive analysis to identify pain points and opportunities.",
            image: "/images/projects/fashion-ecommerce-research.jpg",
          },
          {
            title: "Wireframing",
            description:
              "Created low and high-fidelity wireframes focusing on the user journey.",
            image: "/images/projects/fashion-ecommerce-wireframes.jpg",
          },
          {
            title: "Development",
            description:
              "Built a custom Next.js front-end integrated with Shopify back-end.",
            image: "/images/projects/fashion-ecommerce-development.jpg",
          },
        ],
        results: [
          {
            title: "Conversion Rate",
            value: "+35%",
            icon: "/icons/chart-up.svg",
          },
          {
            title: "Average Order Value",
            value: "+20%",
            icon: "/icons/shopping-bag.svg",
          },
          {
            title: "Time on Site",
            value: "+45%",
            icon: "/icons/clock.svg",
          },
        ],
        testimonial: {
          content:
            "Brandtize Studio transformed our online presence. The new site not only looks beautiful but has significantly increased our online sales.",
          author: "Sarah Johnson",
          position: "CMO, StyleHouse Apparel",
          image: "/images/testimonials/sarah-johnson.jpg",
        },
        publishedAt: new Date("2025-07-20"),
        updatedAt: new Date("2025-08-01"),
        featured: true,
      },
      {
        title: "Mobile App for Fitness Startup",
        slug: "mobile-app-fitness-startup",
        description:
          "A comprehensive fitness mobile application with workout tracking, nutrition planning, and community features.",
        excerpt:
          "A user-friendly fitness app that helped a startup acquire 50,000 users in the first quarter.",
        coverImage: "/images/projects/fitness-app.jpg",
        gallery: [
          "/images/projects/fitness-app-1.jpg",
          "/images/projects/fitness-app-2.jpg",
          "/images/projects/fitness-app-3.jpg",
        ],
        client: "FitTrack",
        technologies: ["React Native", "Firebase", "Node.js", "Stripe"],
        features: [
          "Workout tracking",
          "Nutrition planning",
          "Progress analytics",
          "Community forums",
          "Coach integration",
        ],
        process: [
          {
            title: "User Research",
            description:
              "Surveyed target audience to understand fitness goals and app preferences.",
            image: "/images/projects/fitness-app-research.jpg",
          },
          {
            title: "Prototyping",
            description:
              "Created interactive prototypes for user testing and feature validation.",
            image: "/images/projects/fitness-app-prototype.jpg",
          },
          {
            title: "Development",
            description:
              "Built a cross-platform app with React Native and real-time features via Firebase.",
            image: "/images/projects/fitness-app-development.jpg",
          },
        ],
        results: [
          {
            title: "User Acquisition",
            value: "50,000+",
            icon: "/icons/users.svg",
          },
          {
            title: "User Retention",
            value: "85%",
            icon: "/icons/repeat.svg",
          },
          {
            title: "App Store Rating",
            value: "4.8/5",
            icon: "/icons/star.svg",
          },
        ],
        testimonial: {
          content:
            "Working with Brandtize Studio was a game-changer for our startup. Their approach to UX and intuitive design helped us stand out in a crowded market.",
          author: "James Chen",
          position: "Founder, FitTrack",
          image: "/images/testimonials/james-chen.jpg",
        },
        publishedAt: new Date("2025-06-15"),
        updatedAt: new Date("2025-07-10"),
        featured: true,
      },
    ];

    const projectResult = await db.collection("projects").insertMany(projects);
    console.log(`${projectResult.insertedCount} projects inserted`);

    console.log("Database seeding completed successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

seedDatabase().catch(console.error);
