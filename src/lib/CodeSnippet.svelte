<script>
  let { label = '', code = '', lang = 'bash' } = $props();

  let copied = $state(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      copied = true;
      setTimeout(() => copied = false, 2000);
    }
  }
</script>

<div class="code-block-wrapper">
  <div class="code-block-header">
    <span>{label}</span>
    <button class="copy-btn" class:copied onclick={copy}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  </div>
  <pre class="code-block"><code>{code}</code></pre>
</div>

<style>
  .code-block-wrapper {
    width: 100%;
  }

  .code-block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background: #000;
    border: 1px solid var(--border);
    border-bottom: none;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted-foreground);
    font-family: var(--font-mono);
  }

  .code-block {
    background: #000;
    border: 1px solid var(--border);
    padding: 1rem;
    margin: 0;
    overflow-x: auto;
    white-space: pre;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.6;
    color: #e7e0ec;
  }

  .copy-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--muted-foreground);
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
    cursor: pointer;
    font-family: var(--font-mono);
    transition: all 0.15s;
  }

  .copy-btn:hover {
    color: var(--foreground);
    border-color: var(--foreground);
  }

  .copy-btn.copied {
    color: var(--tertiary);
    border-color: var(--tertiary);
  }
</style>
