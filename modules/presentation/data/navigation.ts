export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

export const navLinks: NavLink[] = [
  { href: '/features', label: 'Features' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/quickstart', label: 'Quickstart' },
  { href: '/docs/mem_save', label: 'API Docs' },
  { href: 'https://github.com/gentleman-programming/sechel', label: 'GitHub', external: true },
];

export const footerLinks: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { href: '/features', label: 'Features' },
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/quickstart', label: 'Quickstart' },
      { href: '/docs/mem_save', label: 'API Docs' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: 'https://github.com/gentleman-programming/sechel', label: 'GitHub', external: true },
      { href: 'https://x.com/gentleman_prog', label: 'X / Twitter', external: true },
    ],
  },
];

export const socialLinks: NavLink[] = [
  { href: 'https://github.com/gentleman-programming/sechel', label: 'GitHub', external: true },
  { href: '/docs/mem_save', label: 'Docs' },
  { href: 'https://x.com/gentleman_prog', label: 'X / Twitter', external: true },
];
