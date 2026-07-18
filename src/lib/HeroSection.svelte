<script lang="ts">
  import { Copy, Check, FileText } from 'lucide-svelte';

  let terminalCopied = $state(false);

  async function copyTerminal() {
    const cmds = `npm i -g @sechel-mcp/cli\nsechel`;
    try {
      await navigator.clipboard.writeText(cmds);
      terminalCopied = true;
      setTimeout(() => terminalCopied = false, 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = cmds;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      terminalCopied = true;
      setTimeout(() => terminalCopied = false, 2000);
    }
  }
</script>

<section class="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden border-b border-fg/20">
  <!-- Background Elements -->
  <div class="absolute inset-0 grid-pattern pointer-events-none opacity-40"></div>
  <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"></div>

  <div class="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
    <!-- Badge -->
    <div class="mb-8 border border-primary/30 px-4 py-1 bg-bg flex items-center gap-2">
      <span class="w-2 h-2 bg-primary animate-pulse"></span>
      <span class="font-label text-xs uppercase tracking-widest text-primary/80">Protocol v1.0.4 Online</span>
    </div>

    <!-- Headline -->
    <h1 class="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 max-w-5xl leading-[0.9] break-words hyphens">
      Cloud Memory for Your <span class="text-primary italic">AI Agents</span>
    </h1>

    <!-- Subtitle -->
    <p class="font-label text-lg md:text-xl text-fg/70 max-w-2xl mb-12 tracking-tight break-words">
      Drop-in replacement for Engram. Same <code class="bg-accent/20 text-primary px-1 font-mono">mem_*</code> API, zero agent changes. Self-hosted on Vercel + Turso, Cloudflare Workers, or Docker.
    </p>

    <!-- Terminal Code Block -->
      <div class="w-full max-w-2xl bg-[#121212] border-2 border-accent mb-12 group transition-all hover:border-primary/50 relative overflow-x-auto">
        <!-- Terminal Header -->
      <div class="flex items-center justify-between px-4 py-2 bg-accent/10 border-b border-accent">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 bg-accent/40"></div>
          <div class="w-3 h-3 bg-accent/40"></div>
          <div class="w-3 h-3 bg-accent/40"></div>
        </div>
        <div class="text-[10px] font-mono text-primary uppercase tracking-widest">install &mdash; npm</div>
      </div>
      <!-- Terminal Body -->
      <div class="p-6 md:p-8 font-mono text-primary md:text-base space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-accent/60 opacity-50 w-4">$</span>
          <span>npm i -g @sechel-mcp/cli</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-accent/60 opacity-50 w-4">$</span>
          <span>sechel</span>
        </div>
        <div class="flex items-center gap-3 text-accent/60 text-xs pt-2 border-t border-accent/20 mt-3">
          <span class="text-green-400">✓</span>
          <span>deployed at your-server.vercel.app</span>
        </div>
      </div>
      <div class="border-t border-accent/20 px-4 py-3 flex justify-end">
        <button
          onclick={copyTerminal}
          class="flex items-center gap-2 px-3 py-1 bg-accent/20 hover:bg-primary hover:text-black transition-all text-primary border border-primary/20 text-xs uppercase tracking-widest font-bold cursor-pointer"
        >
          {#if terminalCopied}
            <Check size={14} />
            <span>Copied!</span>
          {:else}
            <Copy size={14} />
            <span>Copy</span>
          {/if}
        </button>
      </div>
    </div>

    <!-- CTA Cluster -->
    <div class="flex flex-col md:flex-row gap-6 items-center mb-16">
      <a
        href="#quickstart"
        class="bg-primary text-black font-headline font-black px-12 py-5 text-xl uppercase tracking-tighter border-2 border-primary no-underline hover:bg-transparent hover:text-primary transition-all duration-200 inline-block"
      >
        Get Started
      </a>
      <a
        href="https://github.com/SamuelCastrillon/Sechel"
        target="_blank"
        rel="noopener noreferrer"
        class="border-2 border-fg/20 text-fg font-headline font-black px-12 py-5 text-xl uppercase tracking-tighter no-underline hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 inline-flex items-center gap-2"
      >
        <FileText size={20} />
        Documentation
      </a>
    </div>

    <!-- Secondary Text -->
    <div class="font-mono text-xs uppercase tracking-[0.3em] text-fg/40 flex flex-wrap justify-center gap-x-8 gap-y-4">
      <span class="flex items-center gap-2"><span class="w-1 h-1 bg-accent"></span> Open source</span>
      <span class="flex items-center gap-2"><span class="w-1 h-1 bg-accent"></span> MIT Licensed</span>
      <span class="flex items-center gap-2"><span class="w-1 h-1 bg-accent"></span> Self-hosted</span>
    </div>
  </div>

  <!-- Abstract Graphic -->
  <div class="absolute bottom-0 right-0 w-96 h-96 opacity-10 pointer-events-none translate-x-20 translate-y-20">
    <div class="w-full h-full border-[20px] border-primary rotate-45"></div>
  </div>
</section>
