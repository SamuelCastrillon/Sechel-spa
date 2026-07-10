import Link from 'next/link';
import { footerLinks, socialLinks } from '@/modules/presentation/data/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
            >
              <span className="flex size-8 items-center justify-center border border-primary bg-accent text-sm font-bold text-primary-foreground">
                S
              </span>
              <span>Sechel</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-on-surface-variant">
              Serverless MCP memory server for AI coding agents. Persistent,
              searchable, and session-aware memory across all your tools.
            </p>
          </div>

          {/* Link Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/70 hover:text-primary transition-colors"
                      >
                        {link.label}
                        <span className="ml-1 opacity-60">↗</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-on-surface-variant">
            &copy; {year} Sechel. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
                <span className="ml-1 opacity-60">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
