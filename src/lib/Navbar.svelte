<script lang="ts">
  import { Terminal } from 'lucide-svelte';
  import { navLinks } from '../data/navigation.ts';
  import MobileMenu from './MobileMenu.svelte';
</script>

<nav class="bg-bg text-primary font-headline uppercase tracking-tighter text-sm font-bold fixed top-0 z-50 w-full border-b border-fg/20 flex justify-between items-center px-6 py-4">
  <div class="flex items-center gap-8">
    <a href="#top" class="font-display text-xl font-black tracking-widest text-primary border-b border-primary no-underline leading-none pb-0.5 flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
        <rect x="4" y="4" width="16" height="16" rx="0" stroke="currentColor" stroke-width="1.5" />
        <rect x="7" y="7" width="10" height="10" rx="0" stroke="currentColor" stroke-width="1" opacity="0.6" />
        <line x1="4" y1="8" x2="2" y2="8" stroke="currentColor" stroke-width="1" />
        <line x1="4" y1="12" x2="2" y2="12" stroke="currentColor" stroke-width="1" />
        <line x1="4" y1="16" x2="2" y2="16" stroke="currentColor" stroke-width="1" />
        <line x1="20" y1="8" x2="22" y2="8" stroke="currentColor" stroke-width="1" />
        <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1" />
        <line x1="20" y1="16" x2="22" y2="16" stroke="currentColor" stroke-width="1" />
        <line x1="8" y1="4" x2="8" y2="2" stroke="currentColor" stroke-width="1" />
        <line x1="12" y1="4" x2="12" y2="2" stroke="currentColor" stroke-width="1" />
        <line x1="16" y1="4" x2="16" y2="2" stroke="currentColor" stroke-width="1" />
        <line x1="8" y1="20" x2="8" y2="22" stroke="currentColor" stroke-width="1" />
        <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="1" />
        <line x1="16" y1="20" x2="16" y2="22" stroke="currentColor" stroke-width="1" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
      </svg>
      SECHEL_v0.2
    </a>
    <div class="hidden md:flex items-center gap-6">
      {#each navLinks as link}
        {#if link.external}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            class="text-fg hover:text-primary hover:bg-accent/20 transition-colors duration-100 px-2 py-1 no-underline"
          >
            {link.label}
          </a>
        {:else}
          <a
            href={link.href}
            class="text-fg hover:text-primary hover:bg-accent/20 transition-colors duration-100 px-2 py-1 no-underline"
          >
            {link.label}
          </a>
        {/if}
      {/each}
    </div>
  </div>
  <div class="flex items-center gap-4">
    <button class="hover:bg-accent/20 transition-colors duration-100 p-2 flex items-center justify-center cursor-pointer text-fg hover:text-primary">
      <Terminal size={18} />
    </button>
    <MobileMenu {navLinks} />
  </div>
</nav>
