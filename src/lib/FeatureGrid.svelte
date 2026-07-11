<script lang="ts">
  import { features } from '../data/features.ts';
  import FeatureCard from './FeatureCard.svelte';
</script>

<section id="features" class="relative py-20 md:py-28 technical-grid border-b border-fg/20">
  <div class="max-w-6xl mx-auto px-6">
    <!-- Header -->
    <div class="mb-16">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-2 h-2 bg-primary"></span>
        <span class="font-mono text-xs text-primary uppercase tracking-[0.3em]">System_Features</span>
      </div>
      <h2 class="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none border-l-8 border-primary pl-6 mb-4">
        Features
      </h2>
      <p class="font-mono text-lg md:text-xl text-fg/80 max-w-2xl border-b border-accent/30 pb-4">
        Everything your AI agents need for persistent memory.
      </p>
    </div>

    <!-- Card Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-fg/20 border border-fg/20">
      {#each features as feature, i (feature.id)}
        <FeatureCard {...feature} index={i} />
      {/each}
    </div>
  </div>
</section>
