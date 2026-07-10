<script>
  let { icon = '', title = '', description = '', category = '' } = $props();
</script>

<article class="card">
  <span class="card-icon">{icon}</span>
  <h3 class="card-title">{title}</h3>
  <p class="card-desc">{description}</p>
  <span class="card-tag">{category}</span>
</article>
