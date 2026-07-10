export interface Feature {
  id: string;
  icon: string; // Lucide icon name, e.g. 'Brain'
  title: string;
  description: string;
  category: string;
}

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface QuickStartStep {
  icon: string; // Lucide icon name
  name: string;
  description: string;
  code: string;
  language: string;
}

export interface Platform {
  id: string;
  icon: string; // Lucide icon name
  name: string;
  language: string;
  snippet: string;
}
