<script lang="ts">
  import { Copy, Check } from 'lucide-svelte';

  let { code = '', language = 'bash' }: { code: string; language?: string } = $props();

  let copied = $state(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch {
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

<div class="w-full">
  <div class="flex items-center justify-between px-4 py-2 bg-black border border-[var(--border)] border-b-0 text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-mono">
    <span>{language}</span>
    <button
      class="bg-transparent border px-2 py-0.5 text-xs cursor-pointer font-mono transition-all duration-150 hover:text-[var(--foreground)] hover:border-[var(--foreground)] {copied ? 'text-[var(--tertiary)] border-[var(--tertiary)]' : 'text-[var(--muted-foreground)] border-[var(--border)]'}"
      onclick={copy}
    >
      {#if copied}
        <Check size={12} />
      {:else}
        <Copy size={12} />
      {/if}
    </button>
  </div>
  <pre class="bg-black border border-[var(--border)] p-4 m-0 overflow-x-auto whitespace-pre font-mono text-sm leading-relaxed text-fg"><code>{code}</code></pre>
</div>
