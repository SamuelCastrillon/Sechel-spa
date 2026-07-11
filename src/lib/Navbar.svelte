<script lang="ts">
  import { Terminal } from 'lucide-svelte';
  import { navLinks } from '../data/navigation.ts';
  import MobileMenu from './MobileMenu.svelte';
</script>

<nav class="bg-bg text-primary font-headline uppercase tracking-tighter text-sm font-bold fixed top-0 z-50 w-full border-b border-fg/20 flex justify-between items-center px-6 py-4">
  <div class="flex items-center gap-8">
    <a href="#top" class="font-display text-xl font-black tracking-widest text-primary border-b border-primary no-underline leading-none pb-0.5">
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
