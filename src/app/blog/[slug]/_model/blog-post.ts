export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  featured: boolean;
  readTime: string;
  content: string[];
  tags: string[];
  coverImage: string;
  authorImage?: string;
  relatedPosts?: RelatedPost[];
}

export interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  coverImage: string;
}
