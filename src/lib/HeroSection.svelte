<script>
  import CodeSnippet from './CodeSnippet.svelte';
</script>

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Cloud Memory<br />for Your AI Agents</h1>
      <p class="hero-subtitle">
        Drop-in replacement for Engram. Same <code>mem_*</code> API, zero agent changes.
        Self-hosted on Vercel + Turso. Open source, MIT licensed.
      </p>

      <div class="hero-snippet">
        <CodeSnippet
          label="Quick install"
          code="npx @gentleman-programming/sechel"
          lang="bash"
        />
      </div>

      <div class="hero-actions">
        <a href="#quickstart" class="btn btn-primary">Get Started</a>
        <a href="https://github.com/SamuelCastrillon/Sechel" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          View on GitHub
        </a>
      </div>

      <p class="hero-meta">Open source &middot; MIT &middot; Self-hosted</p>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 6rem 0 4rem;
    border-bottom: 1px solid var(--border);
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 1.25rem;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: var(--on-surface-variant);
    line-height: 1.7;
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  .hero-subtitle code {
    font-family: var(--font-mono);
    color: var(--primary);
    font-size: 0.9em;
  }

  .hero-snippet {
    max-width: 500px;
    margin: 0 auto 2rem;
  }

  .hero-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .hero-meta {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--muted-foreground);
    letter-spacing: 0.05em;
  }
</style>
