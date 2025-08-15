export type Project = {
  slug: string;
  title: string;
  category: 'User Experience' | 'Learning Design' | 'Hackathons' | 'Coding Projects';
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
  };
};
