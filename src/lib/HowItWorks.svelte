<script lang="ts">
  interface Node {
    label: string;
    title: string;
    desc: string;
  }

  const nodes: Node[] = [
    { label: 'Agent', title: 'AI Agent', desc: 'Claude Code, Cursor, OpenCode, or any MCP agent' },
    { label: 'Protocol', title: 'MCP over HTTP', desc: 'Standardized Model Context Protocol over Streamable HTTP' },
    { label: 'Server', title: 'Sechel', desc: 'Your self-hosted server on Vercel. Same mem_* API as Engram.' },
    { label: 'DB', title: 'Turso / libSQL', desc: 'Persistent cloud database — SQLite-compatible, fast, serverless.' },
  ];
</script>

<section id="how-it-works" class="py-20 border-b border-[var(--border)]">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">How It Works</h2>
      <p class="mt-3 max-w-[600px] mx-auto text-[var(--on-surface-variant)]">Your agents talk MCP. Sechel remembers.</p>
    </div>

    <div class="flex items-center justify-center gap-2 flex-wrap py-12 flex-col md:flex-row">
      {#each nodes as node, i}
        <div class="border border-[var(--accent)] bg-[var(--card)] p-4 text-center min-w-[120px]">
          <div class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-primary mb-1">{node.label}</div>
          <div class="font-semibold text-[0.9rem]">{node.title}</div>
        </div>
        {#if i < nodes.length - 1}
          <span class="text-[var(--accent)] text-2xl font-mono md:rotate-0 rotate-90 inline-block">→</span>
        {/if}
      {/each}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {#each nodes as node}
        <div class="border border-[var(--border)] bg-[var(--surface)] p-6 flex flex-col gap-3">
          <span class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-primary border border-[var(--accent)] px-2 py-0.5 self-start">{node.label}</span>
          <h3 class="font-semibold text-[1.1rem]">{node.title}</h3>
          <p class="text-[0.9rem] text-[var(--on-surface-variant)] leading-relaxed">{node.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
