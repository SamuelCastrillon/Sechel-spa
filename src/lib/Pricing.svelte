<script>
  const plans = [
    {
      name: 'Self-Hosted',
      price: 'Free',
      description: 'MIT licensed. Run your own instance.',
      features: [
        'All 23 MCP tools',
        'Unlimited projects & users per instance',
        'Turso/libSQL database',
        ' Vercel one-click deploy',
      ],
      cta: 'Deploy to Vercel',
      ctaHref: 'https://vercel.com/new',
      featured: true,
    },
    {
      name: 'Managed',
      price: 'Coming Soon',
      description: 'Let us run it for you.',
      features: [
        'Everything in Self-Hosted',
        'Zero infrastructure management',
        'Automatic backups & scaling',
        'Premium support',
      ],
      cta: 'Get notified',
      ctaHref: '#',
      featured: false,
    },
  ];
</script>

<section id="pricing" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="text-section">Pricing</h2>
      <p>Open source, transparent, and built for developers.</p>
    </div>

    <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
      {#each plans as plan}
        <article class="pricing-card" class:featured={plan.featured}>
          <h3 class="pricing-name">{plan.name}</h3>
          <div class="pricing-price">
            <span class="pricing-amount">{plan.price}</span>
          </div>
          <p class="pricing-desc">{plan.description}</p>

          <ul class="pricing-features">
            {#each plan.features as feature}
              <li>{feature}</li>
            {/each}
          </ul>

          <a href={plan.ctaHref} class="btn" class:btn-primary={plan.featured} class:btn-outline={!plan.featured}
            target="_blank" rel="noopener noreferrer">
            {plan.cta}
          </a>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .pricing-card {
    flex: 1;
    min-width: 280px;
    max-width: 380px;
    border: 1px solid var(--border);
    background: var(--surface);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .pricing-card.featured {
    border-color: var(--accent);
    background: var(--card);
  }

  .pricing-name {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted-foreground);
  }

  .pricing-amount {
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .pricing-desc {
    font-size: 0.85rem;
    color: var(--on-surface-variant);
  }

  .pricing-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .pricing-features li {
    font-size: 0.85rem;
    color: var(--on-surface);
    padding-left: 1.25rem;
    position: relative;
  }

  .pricing-features li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--primary);
  }
</style>
