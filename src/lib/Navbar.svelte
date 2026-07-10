<script>
  import { navLinks } from '../data/navigation.js';
  import MobileMenu from './MobileMenu.svelte';
</script>

<header class="navbar">
  <div class="container navbar-inner">
    <a href="#top" class="logo">
      <span class="logo-mark">S</span>
      <span class="logo-text">Sechel</span>
    </a>

    <nav class="nav-desktop">
      {#each navLinks as link}
        {#if link.external}
          <a href={link.href} target="_blank" rel="noopener noreferrer" class="nav-link">
            {link.label}
            <span class="external-icon">↗</span>
          </a>
        {:else}
          <a href={link.href} class="nav-link">
            {link.label}
          </a>
        {/if}
      {/each}
    </nav>

    <MobileMenu {navLinks} />
  </div>
</header>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 40;
    border-bottom: 1px solid var(--border);
    background: color-mix(in srgb, var(--background) 95%, transparent);
    backdrop-filter: blur(8px);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--foreground);
    font-weight: 700;
    font-size: 1.125rem;
    letter-spacing: -0.02em;
  }

  .logo-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--primary);
    background: var(--accent);
    color: var(--primary-foreground);
    font-size: 0.75rem;
    font-weight: 700;
  }

  .nav-desktop {
    display: none;
    align-items: center;
    gap: 0.25rem;
  }

  @media (min-width: 768px) {
    .nav-desktop {
      display: flex;
    }
  }

  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: var(--on-surface-variant);
    text-decoration: none;
    transition: color 0.15s;
    border: 1px solid transparent;
  }

  .nav-link:hover {
    color: var(--foreground);
    border-color: var(--border);
  }

  .external-icon {
    font-size: 0.7rem;
    margin-left: 0.2rem;
  }
</style>
