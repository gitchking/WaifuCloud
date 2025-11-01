export interface Website {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  category: string;
  tags: string[];
  featured: boolean;
  popular: boolean;
  clicks: number;
  rating: number;
  dateAdded: string;
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}