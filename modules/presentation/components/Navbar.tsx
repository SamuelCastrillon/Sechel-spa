import Link from 'next/link';
import { navLinks } from '@/modules/presentation/data/navigation';
import NavLink from '@/modules/presentation/components/NavLink';
import MobileMenu from '@/modules/presentation/components/MobileMenu';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          <span className="flex size-8 items-center justify-center border border-primary bg-accent text-sm font-bold text-primary-foreground">
            S
          </span>
          <span>Sechel</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <MobileMenu />
      </div>
    </header>
  );
}
