<script>
  import { features } from '../data/features.js';
  import FeatureCard from './FeatureCard.svelte';
</script>

<section id="features" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="text-section">Features</h2>
      <p>Everything your AI agents need for persistent memory.</p>
    </div>

    <div class="grid-3">
      {#each features as feature (feature.id)}
        <FeatureCard {...feature} />
      {/each}
    </div>
  </div>
</section>
