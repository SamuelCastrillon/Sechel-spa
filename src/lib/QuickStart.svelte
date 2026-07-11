<script lang="ts">
  import { Bot, Monitor, Keyboard, Sparkles, Check, Copy, ArrowRight } from 'lucide-svelte';
  import { platforms } from '../data/quickstart.ts';

  let activeTab = $state(platforms[0]?.id ?? '');
  let copied = $state(false);

  const iconMap: Record<string, typeof Bot> = {
    Bot, Monitor, Keyboard, Sparkles,
  };

  let activePlatform = $derived(platforms.find(p => p.id === activeTab) ?? platforms[0]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(activePlatform.snippet.trim());
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = activePlatform.snippet.trim();
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      copied = true;
      setTimeout(() => copied = false, 2000);
    }
  }
</script>

<section id="quickstart" class="relative py-20 md:py-28 border-b border-fg/20">
  <div class="max-w-5xl mx-auto px-6">
    <!-- Header -->
    <header class="mb-16 border-l-4 border-accent pl-6">
      <h1 class="text-6xl md:text-8xl font-black font-headline uppercase tracking-tighter leading-none mb-4">
        Quick Start
      </h1>
      <p class="text-xl md:text-2xl text-primary font-light tracking-tight">
        Connect your agents in minutes
      </p>
    </header>

    <!-- Bento Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Sidebar Navigation -->
      <aside class="lg:col-span-3">
        <div class="flex flex-col border border-fg/20">
          <div class="bg-fg/10 px-4 py-2 border-b border-fg/20">
            <span class="font-label text-[10px] uppercase tracking-[0.2em] text-fg/60">Platform Selection</span>
          </div>
          {#each platforms as platform}
            <button
              onclick={() => activeTab = platform.id}
              class="w-full text-left px-4 py-4 font-headline text-sm font-bold uppercase tracking-widest border-b border-fg/20 transition-all flex justify-between items-center {activeTab === platform.id ? 'bg-accent text-primary' : 'text-fg/60 hover:text-primary hover:bg-accent/20'}"
            >
              {platform.name}
              {#if activeTab === platform.id}
                <ArrowRight size={12} class="transition-transform" />
              {/if}
            </button>
          {/each}
        </div>

        <div class="mt-8 border border-primary/20 p-4 bg-primary/5">
          <p class="font-label text-[10px] uppercase tracking-widest text-primary mb-2">System Status</p>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 animate-pulse"></div>
            <span class="text-xs font-mono text-fg">MCP_NODE_ACTIVE</span>
          </div>
        </div>
      </aside>

      <!-- Content Area -->
      <div class="lg:col-span-9 space-y-8">
        <!-- Step Description -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 flex items-center justify-center border border-accent text-accent font-bold font-mono">01</span>
            <h2 class="text-xl font-bold uppercase tracking-widest">Configuration Update</h2>
          </div>
          <p class="text-fg/80 leading-relaxed max-w-2xl">
            Locate your config file
            <code class="bg-accent/20 px-1 text-primary font-mono">
              {activePlatform.id === 'claude-code' ? '~/.claude.json (user) or .mcp.json (project)' :
               activePlatform.id === 'cursor' ? '~/.cursor/mcp.json (global) or .cursor/mcp.json (project)' :
               activePlatform.id === 'opencode' ? '~/.config/opencode/opencode.json (user) or opencode.json (project)' :
               '~/.gemini/settings.json (user) or .gemini/settings.json (project)'}
            </code>
            . Paste the following block into the
            <code class="bg-accent/20 px-1 text-primary font-mono">
              {activePlatform.id === 'opencode' ? 'mcp' : 'mcpServers'}
            </code>
            object to grant {activePlatform.name} memory persistence.
          </p>
        </div>

        <!-- Terminal Emulator -->
        <div class="relative group">
          <div class="absolute -inset-1 bg-accent/20 blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <div class="relative bg-bg border border-fg/30" style="box-shadow: 0 0 20px rgba(91, 33, 182, 0.15);">
            <!-- Terminal Header -->
            <div class="flex items-center justify-between px-4 py-2 border-b border-fg/20 bg-[#161616]">
              <div class="flex gap-2">
                <div class="w-3 h-3 bg-fg/20"></div>
                <div class="w-3 h-3 bg-fg/20"></div>
                <div class="w-3 h-3 bg-fg/20"></div>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-mono text-[10px] text-fg/40 uppercase tracking-widest">{activePlatform.name.toLowerCase().replace(' ', '_')}_config.{activePlatform.language}</span>
              </div>
            </div>

            <!-- Code Area -->
            <div class="p-6 font-mono text-sm overflow-x-auto">
              <pre class="text-fg"><code>{activePlatform.snippet.trim()}</code></pre>
            </div>

            <!-- Terminal Footer -->
            <div class="border-t border-fg/10 px-4 py-3 flex justify-between items-center">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 bg-green-500"></span>
                <span class="text-[10px] uppercase font-label text-fg/40">Valid JSON structure detected</span>
              </div>
              <button
                onclick={copyCode}
                class="flex items-center gap-2 px-3 py-1 bg-accent text-white text-xs font-bold uppercase tracking-tighter hover:opacity-80 active:opacity-100 transition-all cursor-pointer"
              >
                {#if copied}
                  <Check size={14} />
                  COPIED
                {:else}
                  <Copy size={14} />
                  Copy Config
                {/if}
              </button>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="grid md:grid-cols-2 gap-6 mt-12">
          <div class="border border-fg/10 p-6 hover:border-primary/40 transition-colors">
            <h3 class="font-bold uppercase tracking-widest mb-2 text-primary">2. Restart Agent</h3>
            <p class="text-xs text-fg/60">Reload your IDE or terminal session for the memory server to initialize.</p>
          </div>
          <div class="border border-fg/10 p-6 hover:border-primary/40 transition-colors">
            <h3 class="font-bold uppercase tracking-widest mb-2 text-primary">3. Verify Sync</h3>
            <p class="text-xs text-fg/60">Ask your agent "What was our last project?" to confirm persistent retrieval.</p>
          </div>
        </div>

        <!-- Decorative Asset Block -->
        <div class="relative w-full h-48 border border-fg/10 overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-bg via-transparent to-transparent">
            <div class="text-center">
              <span class="font-label text-[10px] uppercase tracking-[0.5em] text-primary/60">Internal_Protocol_0x77</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
