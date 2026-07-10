<script lang="ts">
  import { Brain, RefreshCw, Search, ClipboardList, MessageSquare, Wrench, Toolbox, Shield } from 'lucide-svelte';
  import type { Feature } from '../types';

  let { icon = '', title = '', description = '', category = '' }: Feature = $props();

  const iconMap: Record<string, typeof Brain> = {
    Brain,
    RefreshCw,
    Search,
    ClipboardList,
    MessageSquare,
    Wrench,
    Toolbox,
    Shield,
  };

  let CurrentIcon = $derived(iconMap[icon]);
</script>

<article class="border border-[var(--border)] bg-surface p-6 flex flex-col gap-3">
  <span class="block text-fg">
    {#if CurrentIcon}
      <CurrentIcon size={24} />
    {/if}
  </span>
  <h3 class="font-semibold text-[1.1rem]">{title}</h3>
  <p class="text-sm text-[var(--on-surface-variant)] leading-relaxed">{description}</p>
  <span class="inline-block font-mono text-[0.7rem] uppercase tracking-wider text-primary border border-primary-container px-2 py-0.5 mt-auto self-start">{category}</span>
</article>
