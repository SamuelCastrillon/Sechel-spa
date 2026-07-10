<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import type { NavLink } from '../types';

  let { navLinks = [] }: { navLinks: NavLink[] } = $props();
  let isOpen = $state(false);

  function toggle() {
    isOpen = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function close() {
    isOpen = false;
    document.body.style.overflow = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<button
  class="flex md:hidden items-center justify-center w-10 h-10 border border-[var(--border)] bg-none cursor-pointer p-2 relative z-60"
  onclick={toggle}
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
  aria-expanded={isOpen}
>
  <span
    class="block w-5 h-[1.5px] bg-[var(--foreground)] relative transition-all duration-200
      before:content-[''] before:absolute before:w-5 before:h-[1.5px] before:bg-[var(--foreground)] before:transition-all before:duration-200
      after:content-[''] after:absolute after:w-5 after:h-[1.5px] after:bg-[var(--foreground)] after:transition-all after:duration-200
      {isOpen ? 'rotate-45 before:rotate-90 after:opacity-0' : 'before:-translate-y-[5px] after:translate-y-[5px]'}"
  ></span>
</button>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
    onclick={close}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
    <div
      class="absolute right-0 top-0 w-64 h-full bg-[var(--background)] border-l border-[var(--border)] pt-24 px-6 pb-8 flex flex-col gap-1"
      transition:slide={{ duration: 200 }}
      onclick={(e) => e.stopPropagation()}
      role="none"
    >
      {#each navLinks as link}
        {#if link.external}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-[var(--on-surface-variant)] no-underline text-base border border-transparent transition-colors hover:text-[var(--foreground)] hover:border-[var(--border)]"
            onclick={close}
          >
            {link.label}
            <ExternalLink size={12} class="inline ml-0.5" />
          </a>
        {:else}
          <a
            href={link.href}
            class="block px-4 py-3 text-[var(--on-surface-variant)] no-underline text-base border border-transparent transition-colors hover:text-[var(--foreground)] hover:border-[var(--border)]"
            onclick={close}
          >
            {link.label}
          </a>
        {/if}
      {/each}
    </div>
  </div>
{/if}
