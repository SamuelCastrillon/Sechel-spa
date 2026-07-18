<script lang="ts">
  import { Cpu, Network, Server, Database } from 'lucide-svelte';

  interface Node {
    label: string;
    title: string;
    desc: string;
  }

  const nodes: Node[] = [
    { label: 'AI Agent', title: 'AI Agent', desc: 'Any MCP-compatible coding agent sends memory requests through the protocol layer.' },
    { label: 'MCP Protocol', title: 'MCP Protocol', desc: 'Standardized Model Context Protocol over HTTP ensuring cross-environment compatibility.' },
    { label: 'Sechel Server', title: 'Sechel Server', desc: 'Your self-hosted memory server deployed on Vercel handling routing and business logic.' },
    { label: 'Turso/libSQL', title: 'Turso/libSQL', desc: 'Persistent SQLite-compatible database in the cloud for low-latency edge storage.' },
  ];

  const icons = [Cpu, Network, Server, Database];
</script>

<section id="how-it-works" class="relative py-20 md:py-28 technical-grid border-b border-fg/20 overflow-hidden">
  <div class="scanline"></div>
  <div class="max-w-6xl mx-auto px-6 space-y-24">
    <!-- Hero Header -->
    <section class="flex flex-col items-start gap-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-2 h-2 bg-primary"></span>
        <span class="font-mono text-xs text-primary uppercase tracking-[0.3em]">System_Documentation</span>
      </div>
      <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none border-l-8 border-primary pl-6">
        How It <br /><span class="text-primary">Works</span>
      </h1>
      <p class="font-mono text-xl md:text-2xl text-fg/80 mt-4 max-w-2xl border-b border-accent/30 pb-4">
        Your agents talk MCP. Sechel remembers.
      </p>
    </section>

    <!-- Diagram Section -->
    <section class="relative group">
      <div class="absolute -top-4 -left-4 text-primary font-mono text-[10px] tracking-widest">ARCHITECTURE_LAYER_01</div>
      <div class="border border-primary/40 p-1 bg-primary/5 group-hover:border-primary transition-colors duration-500">
        <div class="border border-fg/20 bg-bg p-4 md:p-8 overflow-hidden">
          <div class="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700">
            <img
              alt="Architecture Diagram"
              class="w-full h-auto"
              src="/architecture-diagram.png"
            />
          </div>
        </div>
      </div>
      <div class="absolute -bottom-4 -right-4 text-primary font-mono text-[10px] tracking-widest">PROTOCOL_VISUALIZATION</div>
    </section>

    <!-- Component Cards Section -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-fg/20 border border-fg/20">
      {#each nodes as node, i}
        <div class="group bg-bg p-6 md:p-8 hover:bg-accent/10 transition-all duration-300">
          <div class="mb-6 flex justify-between items-start">
            <div class="bg-accent/20 p-3 text-primary">
              <svelte:component this={icons[i]} size={28} />
            </div>
            <span class="font-mono text-[10px] text-fg/40">{String(i + 1).padStart(2, '0')}_{node.label.toUpperCase().replace(/\s+\//, '/').replace(/\s+/g, '_')}</span>
          </div>
          <h3 class="font-headline font-bold text-xl uppercase tracking-tight text-primary mb-4">{node.title}</h3>
          <p class="font-label text-sm text-fg/70 leading-relaxed">{node.desc}</p>
        </div>
      {/each}
    </section>

    <!-- Technical Spec Footnote -->
    <section class="border-t border-fg/20 pt-8 flex flex-wrap gap-12 font-mono text-[10px] uppercase tracking-widest text-fg/40">
      <div class="flex items-center gap-2">
        <span class="text-primary">[STATUS]</span> ONLINE_STABLE
      </div>
      <div class="flex items-center gap-2">
        <span class="text-primary">[ENCRYPTION]</span> TLS_1.3_ENABLED
      </div>
      <div class="flex items-center gap-2">
        <span class="text-primary">[LATENCY]</span> &lt;15ms_AVG
      </div>
    </section>
  </div>
</section>
