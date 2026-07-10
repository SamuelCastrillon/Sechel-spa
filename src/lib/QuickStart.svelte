<script lang="ts">
  import { Bot, Monitor, Keyboard, Sparkles } from 'lucide-svelte';
  import { platforms } from '../data/quickstart.ts';
  import CodeSnippet from './CodeSnippet.svelte';

  let activeTab = $state(platforms[0]?.id ?? '');

  const iconMap: Record<string, typeof Bot> = {
    Bot,
    Monitor,
    Keyboard,
    Sparkles,
  };
</script>

<section id="quickstart" class="py-20 border-b border-[var(--border)]">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">Quick Start</h2>
      <p class="mt-3 max-w-[600px] mx-auto text-[var(--on-surface-variant)]">Connect your agents in minutes. One config, any platform.</p>
    </div>

    <div class="max-w-[700px] mx-auto">
      <div class="flex border-b border-[var(--border)]">
        {#each platforms as platform}
          {@const CurrentIcon = iconMap[platform.icon]}
          <button
            class="px-5 py-3 font-mono text-xs cursor-pointer border border-transparent border-b-0 bg-transparent text-[var(--muted-foreground)] transition-all hover:text-[var(--foreground)]"
            class:text-[var(--foreground)]={activeTab === platform.id}
            class:border-[var(--border)]={activeTab === platform.id}
            class:bg-black={activeTab === platform.id}
            onclick={() => activeTab = platform.id}
          >
            {#if CurrentIcon}
              <span class="inline-flex items-center gap-1.5">
                <CurrentIcon size={14} />
                {platform.name}
              </span>
            {:else}
              {platform.name}
            {/if}
          </button>
        {/each}
      </div>

      {#each platforms as platform}
        {#if activeTab === platform.id}
          <div class="border border-[var(--border)] border-t-0">
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
