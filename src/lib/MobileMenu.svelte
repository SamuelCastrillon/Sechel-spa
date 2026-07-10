<script>
  let { navLinks = [] } = $props();
  let isOpen = $state(false);

  function toggle() {
    isOpen = !isOpen;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function close() {
    isOpen = false;
    document.body.style.overflow = '';
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') close();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<button class="hamburger" onclick={toggle} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen}>
  <span class="hamburger-line" class:open={isOpen}></span>
</button>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="overlay" onclick={close} role="dialog" aria-modal="true" tabindex="-1">
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
    <div class="menu-panel" onclick={(e) => e.stopPropagation()} role="none">
      {#each navLinks as link}
        {#if link.external}
          <a href={link.href} target="_blank" rel="noopener noreferrer" class="menu-link" onclick={close}>
            {link.label} ↗
          </a>
        {:else}
          <a href={link.href} class="menu-link" onclick={close}>
            {link.label}
          </a>
        {/if}
      {/each}
    </div>
  </div>
{/if}

<style>
  .hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--border);
    background: none;
    cursor: pointer;
    padding: 0.5rem;
    position: relative;
    z-index: 60;
  }

  @media (min-width: 768px) {
    .hamburger {
      display: none;
    }
  }

  .hamburger-line,
  .hamburger-line::before,
  .hamburger-line::after {
    display: block;
    width: 1.25rem;
    height: 1.5px;
    background: var(--foreground);
    transition: transform 0.2s, opacity 0.2s;
  }

  .hamburger-line::before,
  .hamburger-line::after {
    content: '';
    position: absolute;
  }

  .hamburger-line::before {
    transform: translateY(-5px);
  }

  .hamburger-line::after {
    transform: translateY(5px);
  }

  .hamburger-line.open {
    transform: rotate(45deg);
  }

  .hamburger-line.open::before {
    transform: rotate(90deg);
  }

  .hamburger-line.open::after {
    opacity: 0;
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }

  .menu-panel {
    position: absolute;
    right: 0;
    top: 0;
    width: 16rem;
    height: 100%;
    background: var(--background);
    border-left: 1px solid var(--border);
    padding: 6rem 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .menu-link {
    display: block;
    padding: 0.75rem 1rem;
    color: var(--on-surface-variant);
    text-decoration: none;
    font-size: 1rem;
    border: 1px solid transparent;
    transition: color 0.15s;
  }

  .menu-link:hover {
    color: var(--foreground);
    border-color: var(--border);
  }
</style>
