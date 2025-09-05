export interface Post {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  completedDate: string;
  duration: string;
  industry: string;
  tags: string[];
  challenge: string;
  solution: string;
  implementation: string;
  technologies: string[];
  team: string[];
  client: string;
  live?: string; // Optional URL to the live project
  features: Feature[];
  process: Feature[];
  gallery: string[];
  results: Result[];
  testimonial: Testimonial;
  relatedProjects: RelatedProject[];
  coverImage: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Result {
  value: number;
  label: string;
}

interface Testimonial {
  content: string;
  author: string;
  position: string;
  initials: string;
}

interface RelatedProject {
  title: string;
  description: string;
  image: string;
}
