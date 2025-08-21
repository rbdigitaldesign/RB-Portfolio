
export type Project = {
  slug: string;
  title: string;
  category: 'User Experience' | 'Learning Design' | 'Hackathons' | 'Coding Projects' | 'Publications';
  summary: string;
  tags: string[];
  coverImage: string;
  gallery: string[];
  overview: string;
  problem: string;
  process: string;
  outcomes: string;
  role: string;
  year: number;
  duration: string;
  team: string;
  tools: string[];
  links?: {
    live?: string;
    github?: string;
    page?: string;
  };
};

export interface Post {
  id?: string; // Document ID from Firestore
  slug: string;
  title: string;
  summary: string;
  content?: string; // For legacy markdown
  contentHtml?: string; // For new rich text content
  author: string;
  publishedDate: string;
  tags: string[];
  coverImage: string;
  series?: string;
}
