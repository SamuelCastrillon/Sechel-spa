'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink as NavLinkData } from '@/modules/presentation/data/navigation';

interface NavLinkProps {
  link: NavLinkData;
  className?: string;
  onClick?: () => void;
}

export default function NavLink({ link, className = '', onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = !link.external && pathname.startsWith(link.href);

  const baseClasses =
    'px-3 py-2 text-sm font-medium transition-colors duration-150 border border-transparent';

  const activeClasses = isActive
    ? 'text-primary border-border bg-surface-container'
    : 'text-on-surface-variant hover:text-foreground hover:border-border/50';

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${activeClasses} ${className}`}
        onClick={onClick}
      >
        {link.label}
        <span className="ml-1 opacity-60">↗</span>
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={`${baseClasses} ${activeClasses} ${className}`}
      onClick={onClick}
    >
      {link.label}
    </Link>
  );
}
