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
    title: 'Community',
    links: [
      { href: 'https://github.com/SamuelCastrillon/Sechel', label: 'GitHub', external: true },
      { href: 'https://x.com/gentleman_prog', label: 'X / Twitter', external: true },
    ],
  },
];

export const socialLinks: { href: string; label: string; external?: boolean }[] = [
  { href: 'https://github.com/SamuelCastrillon/Sechel', label: 'GitHub', external: true },
  { href: '#features', label: 'Features' },
  { href: 'https://x.com/gentleman_prog', label: 'X / Twitter', external: true },
];
