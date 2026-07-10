<script>
  import { footerLinks, socialLinks } from '../data/navigation.js';
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#top" class="logo" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--foreground); font-weight: 700;">
          <span class="logo-mark">S</span>
          <span>Sechel</span>
        </a>
        <p>Serverless MCP memory server for AI coding agents. Open source, self-hosted, MIT licensed.</p>
      </div>

      {#each footerLinks as section}
        <div>
          <h4>{section.title}</h4>
          {#each section.links as link}
            {#if link.external}
              <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
            {:else}
              <a href={link.href}>{link.label}</a>
            {/if}
          {/each}
        </div>
      {/each}
    </div>

    <div class="footer-bottom">
      <span>&copy; {new Date().getFullYear()} Sechel. MIT License.</span>
      <div style="display: flex; gap: 1rem;">
        {#each socialLinks as link}
          <a href={link.href} target="_blank" rel="noopener noreferrer" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.8rem;">
            {link.label}
          </a>
        {/each}
      </div>
    </div>
  </div>
</footer>
