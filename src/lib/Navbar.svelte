<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';
  import { navLinks } from '../data/navigation.ts';
  import MobileMenu from './MobileMenu.svelte';
</script>

<header class="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
  <div class="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
    <a href="#top" class="flex items-center gap-2 no-underline text-[var(--foreground)] font-bold text-lg tracking-tight">
      <span class="flex items-center justify-center w-8 h-8 border border-primary bg-[var(--accent)] text-[var(--primary-foreground)] text-xs font-bold">S</span>
      <span>Sechel</span>
    </a>

    <nav class="hidden md:flex items-center gap-1">
      {#each navLinks as link}
        {#if link.external}
          <a href={link.href} target="_blank" rel="noopener noreferrer" class="px-3 py-2 text-sm text-[var(--on-surface-variant)] no-underline transition-colors border border-transparent hover:text-[var(--foreground)] hover:border-[var(--border)]">
            {link.label}
            <ExternalLink size={12} class="inline ml-0.5" />
          </a>
        {:else}
          <a href={link.href} class="px-3 py-2 text-sm text-[var(--on-surface-variant)] no-underline transition-colors border border-transparent hover:text-[var(--foreground)] hover:border-[var(--border)]">
            {link.label}
          </a>
        {/if}
      {/each}
    </nav>

    <MobileMenu {navLinks} />
  </div>
</header>
