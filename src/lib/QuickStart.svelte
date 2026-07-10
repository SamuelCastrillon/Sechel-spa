<script>
  import { platforms } from '../data/quickstart.js';
  import CodeSnippet from './CodeSnippet.svelte';

  let activeTab = $state(platforms[0]?.id ?? '');
</script>

<section id="quickstart" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="text-section">Quick Start</h2>
      <p>Connect your agents in minutes. One config, any platform.</p>
    </div>

    <div style="max-width: 700px; margin: 0 auto;">
      <div class="tabs">
        {#each platforms as platform}
          <button
            class="tab"
            class:active={activeTab === platform.id}
            onclick={() => activeTab = platform.id}
          >
            {platform.icon} {platform.name}
          </button>
        {/each}
      </div>

      {#each platforms as platform}
        {#if activeTab === platform.id}
          <div style="border: 1px solid var(--border); border-top: none;">
            <CodeSnippet
              label={`${platform.name} config`}
              code={platform.snippet.trim()}
              lang={platform.language}
            />
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>
