<script>
  const nodes = [
    { label: 'Agent', title: 'AI Agent', desc: 'Claude Code, Cursor, OpenCode, or any MCP agent' },
    { label: 'Protocol', title: 'MCP over HTTP', desc: 'Standardized Model Context Protocol over Streamable HTTP' },
    { label: 'Server', title: 'Sechel', desc: 'Your self-hosted server on Vercel. Same mem_* API as Engram.' },
    { label: 'DB', title: 'Turso / libSQL', desc: 'Persistent cloud database — SQLite-compatible, fast, serverless.' },
  ];
</script>

<section id="how-it-works" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="text-section">How It Works</h2>
      <p>Your agents talk MCP. Sechel remembers.</p>
    </div>

    <div class="diagram">
      {#each nodes as node, i}
        <div class="diagram-node">
          <div class="diagram-node-label">{node.label}</div>
          <div class="diagram-node-title">{node.title}</div>
        </div>
        {#if i < nodes.length - 1}
          <span class="diagram-arrow">→</span>
        {/if}
      {/each}
    </div>

    <div class="grid-3" style="margin-top: 3rem;">
      {#each nodes as node}
        <div class="card">
          <div class="card-tag" style="align-self: flex-start;">{node.label}</div>
          <h3 class="card-title">{node.title}</h3>
          <p class="card-desc">{node.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
