<script lang="ts">
  import { footerLinks, socialLinks } from '../data/navigation.ts';
  import { ExternalLink } from 'lucide-svelte';
</script>

<footer class="border-t border-[var(--border)] py-12">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8">
      <div>
        <a href="#top" class="flex items-center gap-2 no-underline text-[var(--foreground)] font-bold text-lg">
          <span class="flex items-center justify-center w-8 h-8 border border-primary bg-[var(--accent)] text-[var(--primary-foreground)] text-xs font-bold">S</span>
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
