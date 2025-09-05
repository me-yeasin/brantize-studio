# MongoDB Setup Guide for Brandtize Studio

This guide explains how MongoDB is integrated into the Brandtize Studio project.

## Configuration

MongoDB connection is configured in the `.env.local` file. For local development, it uses:

```
MONGODB_URI=mongodb://localhost:27017/brandtize-studio
```

For production, you should use a MongoDB Atlas URI or other MongoDB service:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/brandtize-studio?retryWrites=true&w=majority
```

## Connection Utilities

The project has two MongoDB connection utilities:

1. **Direct MongoDB Client** (`src/lib/mongodb.ts`): Uses the native MongoDB driver
2. **Mongoose Connection** (`src/lib/mongoose.ts`): Uses Mongoose for schema-based modeling

## Models

### BlogPost Model

The `BlogPost` model is defined in `src/models/BlogPost.ts` with the following schema:

- `title`: String (required)
- `slug`: String (required, unique)
- `content`: String (required)
- `excerpt`: String (required)
- `coverImage`: String (required)
- `author`: Object with name and image
- `categories`: Array of strings
- `tags`: Array of strings
- `publishedAt`: Date
- `updatedAt`: Date
- `featured`: Boolean

### Project Model

The `Project` model is defined in `src/models/Project.ts` with the following schema:

- `title`: String (required)
- `slug`: String (required, unique)
- `description`: String (required)
- `excerpt`: String (required)
- `coverImage`: String (required)
- `gallery`: Array of strings
- `client`: String (required)
- `technologies`: Array of strings
- `features`: Array of strings
- `process`: Array of objects with title, description, and optional image
- `results`: Array of objects with title, value, and optional icon
- `testimonial`: Object with content, author, position, and optional image
- `publishedAt`: Date
- `updatedAt`: Date
- `featured`: Boolean

## API Routes

### Blogs API

`GET /api/blogs`

Query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `featured`: Filter featured blogs (true/false)

### Projects API

`GET /api/projects`

Query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `featured`: Filter featured projects (true/false)

## Local Development

For local development, you need to have MongoDB installed and running. You can download MongoDB Community Edition from [MongoDB's official website](https://www.mongodb.com/try/download/community).

Start MongoDB locally:

```bash
mongod --dbpath /path/to/data/directory
```

## Using MongoDB in Components

To use MongoDB in your components, import the mongoose connection utility and the relevant model:

```typescript
import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";

// Inside an async function
await dbConnect();
const blogs = await BlogPost.find().sort({ publishedAt: -1 }).limit(10);
```
