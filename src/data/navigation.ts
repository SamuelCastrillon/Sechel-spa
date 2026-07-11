import type { NavLink } from '../types';

export const navLinks: NavLink[] = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#quickstart', label: 'Quickstart' },
  { href: '#apidocs', label: 'API Docs' },
  { href: 'https://github.com/SamuelCastrillon/Sechel', label: 'GitHub', external: true },
];

export const footerLinks: { title: string; links: NavLink[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '#features', label: 'Features' },
      { href: '#how-it-works', label: 'How It Works' },
      { href: '#quickstart', label: 'Quickstart' },
      { href: '#apidocs', label: 'API Docs' },
    ],
  },
  {
    title: 'Owner',
    links: [
      { href: 'https://github.com/SamuelCastrillon', label: 'GitHub', external: true },
      { href: 'https://x.com/SamuelC52055', label: 'X / Twitter', external: true },
      { href: 'https://www.linkedin.com/in/samuel-castrill%C3%B3n/', label: 'LinkedIn', external: true },
    ],
  },
];

export const socialLinks: { href: string; label: string; external?: boolean }[] = [
  { href: 'https://github.com/SamuelCastrillon', label: 'GitHub', external: true },
  { href: 'https://x.com/SamuelC52055', label: 'X / Twitter', external: true },
  { href: 'https://www.linkedin.com/in/samuel-castrill%C3%B3n/', label: 'LinkedIn', external: true },
];
