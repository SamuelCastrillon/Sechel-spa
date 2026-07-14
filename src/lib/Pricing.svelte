<script lang="ts">
  interface Plan {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    ctaHref: string;
    featured: boolean;
  }

  const plans: Plan[] = [
    {
      name: 'Self-Hosted',
      price: 'Free',
      description: 'MIT licensed. Run your own instance.',
      features: [
        'All 25 MCP tools',
        'Unlimited projects & users per instance',
        'Turso/libSQL database',
        'Vercel, Cloudflare Workers, or Docker deploy',
      ],
      cta: 'Deploy Now',
      ctaHref: '#quickstart',
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

<section id="pricing" class="py-20 border-b border-[var(--border)]">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">Pricing</h2>
      <p class="mt-3 max-w-[600px] mx-auto text-[var(--on-surface-variant)]">Open source, transparent, and built for developers.</p>
    </div>

    <div class="flex gap-6 justify-center flex-wrap">
      {#each plans as plan}
        <article
          class="flex-1 min-w-[280px] max-w-[380px] border border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col gap-4"
          class:border-[var(--accent)]={plan.featured}
          class:bg-[var(--card)]={plan.featured}
        >
          <h3 class="text-sm uppercase tracking-[0.08em] text-[var(--muted-foreground)]">{plan.name}</h3>
          <div>
            <span class="text-4xl font-extrabold tracking-tight">{plan.price}</span>
          </div>
          <p class="text-xs text-[var(--on-surface-variant)]">{plan.description}</p>

          <ul class="list-none flex flex-col gap-2 flex-1">
            {#each plan.features as feature}
              <li class="text-xs text-[var(--on-surface)] pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-primary">{feature}</li>
            {/each}
          </ul>

          <a
            href={plan.ctaHref}
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold no-underline cursor-pointer transition-all"
            class:bg-primary={plan.featured}
            class:text-[var(--primary-foreground)]={plan.featured}
            class:hover:bg-[#c7aaff]={plan.featured}
            class:bg-transparent={!plan.featured}
            class:text-[var(--foreground)]={!plan.featured}
            class:border={!plan.featured}
            class:border-[var(--border)]={!plan.featured}
            class:hover:border-[var(--foreground)]={!plan.featured}
            target="_blank"
            rel="noopener noreferrer"
          >
            {plan.cta}
          </a>
        </article>
      {/each}
    </div>
  </div>
</section>
