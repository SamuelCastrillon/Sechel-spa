<script lang="ts">
  import { features } from '../data/features.ts';
  import FeatureCard from './FeatureCard.svelte';
</script>

<section id="features" class="py-20 border-b border-[var(--border)]">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">Features</h2>
      <p class="mt-3 max-w-[600px] mx-auto text-[var(--on-surface-variant)]">Everything your AI agents need for persistent memory.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each features as feature (feature.id)}
        <FeatureCard {...feature} />
      {/each}
    </div>
  </div>
</section>
