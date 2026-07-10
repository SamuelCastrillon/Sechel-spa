<script lang="ts">
  import CodeSnippet from './CodeSnippet.svelte';
</script>

<section class="py-24 md:py-32 border-b border-[var(--border)]">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="max-w-[800px] mx-auto text-center">
      <h1 class="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-5">Cloud Memory<br />for Your AI Agents</h1>
      <p class="text-[clamp(1rem,2vw,1.2rem)] text-[var(--on-surface-variant)] leading-relaxed max-w-[600px] mx-auto mb-8">
        Drop-in replacement for Engram. Same <code class="font-mono text-primary text-[0.9em]">mem_*</code> API, zero agent changes.
        Self-hosted on Vercel + Turso. Open source, MIT licensed.
      </p>

      <div class="max-w-[500px] mx-auto mb-8">
        <CodeSnippet
          label="Quick install"
          code="npx @gentleman-programming/sechel"
          lang="bash"
        />
      </div>

      <div class="flex gap-3 justify-center flex-wrap mb-6">
        <a href="#quickstart" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-[var(--primary-foreground)] text-sm font-semibold no-underline cursor-pointer transition-all hover:bg-[#c7aaff]">
          Get Started
        </a>
        <a href="https://github.com/SamuelCastrillon/Sechel" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-[var(--foreground)] text-sm font-semibold no-underline cursor-pointer border border-[var(--border)] transition-all hover:border-[var(--foreground)]">
          View on GitHub
        </a>
      </div>

      <p class="font-mono text-xs text-[var(--muted-foreground)] tracking-[0.05em]">Open source &middot; MIT &middot; Self-hosted</p>
    </div>
  </div>
</section>
