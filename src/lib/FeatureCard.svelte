<script lang="ts">
  import { Brain, RefreshCw, Search, ClipboardList, MessageSquare, Wrench, Toolbox, Shield } from 'lucide-svelte';
  import type { Feature } from '../types';

  let {
    icon = '', title = '', description = '', category = '', index = 0,
  }: Feature & { index: number } = $props();

  const iconMap: Record<string, typeof Brain> = {
    Brain, RefreshCw, Search, ClipboardList, MessageSquare, Wrench, Toolbox, Shield,
  };

  let CurrentIcon = $derived(iconMap[icon]);

  let step = $derived(String(index + 1).padStart(2, '0'));
</script>

<div class="group bg-bg p-6 md:p-8 hover:bg-accent/10 transition-all duration-300 flex flex-col">
  <div class="mb-6 flex justify-between items-start">
    <div class="bg-accent/20 p-3 text-primary">
      {#if CurrentIcon}
        <CurrentIcon size={28} />
      {/if}
    </div>
    <span class="font-mono text-[10px] text-fg/40">{step}_{category.toUpperCase()}</span>
  </div>
  <h3 class="font-headline font-bold text-lg uppercase tracking-tight text-primary mb-4">{title}</h3>
  <p class="font-label text-sm text-fg/70 leading-relaxed">{description}</p>
</div>
