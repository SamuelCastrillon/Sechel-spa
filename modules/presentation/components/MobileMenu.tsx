'use client';

import { useState, useEffect, useCallback } from 'react';
import { navLinks } from '@/modules/presentation/data/navigation';
import NavLink from '@/modules/presentation/components/NavLink';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Close on route change (Escape key or navigation)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        className="flex size-10 items-center justify-center border border-border md:hidden hover:bg-surface-container transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        <div className="flex flex-col gap-1">
          <span
            className={`block h-[1.5px] w-5 bg-foreground transition-transform duration-200 ${isOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-foreground transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-foreground transition-transform duration-200 ${isOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Menu Panel */}
          <nav
            className="relative ml-auto flex w-64 flex-col gap-1 border-l border-border bg-background p-6 pt-20"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                className="block w-full px-4 py-3 text-base"
                onClick={close}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
