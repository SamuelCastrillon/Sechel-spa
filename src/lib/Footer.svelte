<script lang="ts">
  import { footerLinks, socialLinks } from '../data/navigation.ts';
  import { ExternalLink } from 'lucide-svelte';
</script>

<footer class="border-t border-[var(--border)] py-12">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8">
      <div>
        <a href="#top" class="flex items-center gap-2 no-underline text-[var(--foreground)] font-bold text-lg">
          <span class="flex items-center justify-center w-8 h-8 border border-primary bg-[var(--accent)] text-[var(--primary-foreground)]">
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
          </span>
          <span>Sechel</span>
        </a>
        <p class="text-xs text-[var(--muted-foreground)] mt-2 max-w-[300px]">Serverless MCP memory server for AI coding agents. Open source, self-hosted, MIT licensed.</p>
      </div>

      {#each footerLinks as section}
        <div>
          <h4 class="text-xs uppercase tracking-[0.08em] text-[var(--muted-foreground)] mb-4">{section.title}</h4>
          {#each section.links as link}
            {#if link.external}
              <a href={link.href} target="_blank" rel="noopener noreferrer" class="block text-sm text-[var(--on-surface-variant)] no-underline py-1 transition-colors hover:text-[var(--foreground)]">
                {link.label} <ExternalLink size={10} class="inline ml-0.5" />
              </a>
            {:else}
              <a href={link.href} class="block text-sm text-[var(--on-surface-variant)] no-underline py-1 transition-colors hover:text-[var(--foreground)]">{link.label}</a>
            {/if}
          {/each}
        </div>
      {/each}
    </div>

    <div class="mt-8 pt-6 border-t border-[var(--border)] flex justify-between text-xs text-[var(--muted-foreground)]">
      <span>&copy; {new Date().getFullYear()} Sechel. MIT License.</span>
      <div class="flex gap-4">
        {#each socialLinks as link}
          <a href={link.href} target="_blank" rel="noopener noreferrer" class="text-[var(--muted-foreground)] no-underline text-xs transition-colors hover:text-[var(--foreground)]">
            {link.label}
          </a>
        {/each}
      </div>
    </div>
  </div>
</footer>
