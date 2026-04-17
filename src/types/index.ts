export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleType: "Founder" | "OG Member" | "Contributor" | "Developer";
  avatar: string;
  bio: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}
