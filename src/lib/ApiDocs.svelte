<script lang="ts">
  import { Copy, Check, ChevronRight } from 'lucide-svelte';

  let activeTool = $state('mem_save');
  let copied = $state(false);

  const toolCategories = [
    {
      name: 'Memory Tools',
      tools: ['mem_save', 'mem_search', 'mem_get_observation', 'mem_update', 'mem_delete', 'mem_timeline', 'mem_context'],
    },
    {
      name: 'Query Tools',
      tools: ['mem_stats', 'mem_judge', 'mem_compare', 'mem_save_prompt', 'mem_suggest_topic_key'],
    },
    {
      name: 'Management Tools',
      tools: ['mem_session_start', 'mem_session_end', 'mem_session_summary', 'mem_review', 'mem_current_project', 'mem_doctor', 'mem_merge_projects', 'mem_capture_passive'],
    },
  ];

  interface Param {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }

  interface Doc {
    name: string;
    description: string;
    breadcrumbs: string[];
    parameters: Param[];
    returns: { type: string; description: string };
    example: string;
    noSql?: boolean;
  }

  const docs: Record<string, Doc> = {
    mem_save: {
      name: 'mem_save',
      description: 'Save a memory observation to persistent storage. Creates or updates a memory entry with topic-key upsert, 15-minute dedupe window, and automatic conflict surfacing via BM25 candidate ranking.',
      breadcrumbs: ['ROOT', 'MEMORY_TOOLS', 'MEM_SAVE'],
      parameters: [
        { name: 'content', type: 'string', required: true, description: 'The content of the memory observation' },
        { name: 'title', type: 'string', required: true, description: 'Title of the observation' },
        { name: 'type', type: 'string', required: true, description: 'Observation type (bugfix, decision, architecture, discovery, pattern, config, preference, learning)' },
        { name: 'session_id', type: 'string', required: true, description: 'Current session identifier' },
        { name: 'project', type: 'string', required: false, description: 'Project scope for the observation' },
        { name: 'scope', type: 'string', required: false, description: 'Scope — defaults to "project"' },
        { name: 'topic_key', type: 'string', required: false, description: 'Topic key for upsert; if provided, updates existing matching entry instead of inserting' },
        { name: 'tool_name', type: 'string', required: false, description: 'Name of the tool that created this observation' },
      ],
      returns: { type: 'MemoryEntry', description: 'Returns the created or updated memory entry with sync_id, and judgment_required + candidates[] if a BM25 conflict was detected.' },
      example: `{
  "title": "Fixed N+1 query in UserList",
  "content": "Replaced the loop with an eager-loaded join using Prisma's include.",
  "type": "bugfix",
  "session_id": "sess_abc123",
  "project": "sechel-spa",
  "topic_key": "bugfix/userlist-nplus1",
  "scope": "project"
}`,
    },
    mem_search: {
      name: 'mem_search',
      description: 'Full-text search across observations using FTS5 with BM25 ranking. If the query contains "/", a direct topic_key match is also performed. Supports AND (all) and OR (any) match modes.',
      breadcrumbs: ['ROOT', 'MEMORY_TOOLS', 'MEM_SEARCH'],
      parameters: [
        { name: 'query', type: 'string', required: true, description: 'Search query — wrapped in double quotes per word for FTS5 AND semantics' },
        { name: 'type', type: 'string', required: false, description: 'Filter results by observation type' },
        { name: 'project', type: 'string', required: false, description: 'Filter by project (case-insensitive)' },
        { name: 'scope', type: 'string', required: false, description: 'Filter by scope' },
        { name: 'limit', type: 'number', required: false, description: 'Maximum results to return (default 10)' },
        { name: 'match_mode', type: 'string', required: false, description: '"all" (AND, default) or "any" (OR) semantics' },
      ],
      returns: { type: 'Observation[]', description: 'Array of matching observations sorted by BM25 rank (closer to 0 = better match), each with rank score.' },
      example: `{
  "query": "jwt auth middleware",
  "type": "decision",
  "project": "sechel-api",
  "limit": 5,
  "match_mode": "all"
}`,
    },
    mem_get_observation: {
      name: 'mem_get_observation',
      description: 'Retrieve a single observation by its numeric ID. Returns the full observation object or null if not found or soft-deleted.',
      breadcrumbs: ['ROOT', 'MEMORY_TOOLS', 'MEM_GET_OBSERVATION'],
      parameters: [
        { name: 'id', type: 'number', required: true, description: 'Numeric observation ID (primary key)' },
      ],
      returns: { type: 'Observation | null', description: 'Full observation object with all columns, or null if not found or deleted.' },
      example: `{
  "id": 42
}`,
    },
    mem_update: {
      name: 'mem_update',
      description: 'Partial update of an observation. Only supplied fields change; bumps revision_count and recomputes normalized_hash from new content. Re-strips <private> tags.',
      breadcrumbs: ['ROOT', 'MEMORY_TOOLS', 'MEM_UPDATE'],
      parameters: [
        { name: 'id', type: 'number', required: true, description: 'Observation ID to update' },
        { name: 'type', type: 'string', required: false, description: 'New type value' },
        { name: 'title', type: 'string', required: false, description: 'New title' },
        { name: 'content', type: 'string', required: false, description: 'New content (triggers hash recomputation)' },
        { name: 'project', type: 'string', required: false, description: 'New project scope' },
        { name: 'scope', type: 'string', required: false, description: 'New scope' },
        { name: 'topic_key', type: 'string', required: false, description: 'New topic_key' },
      ],
      returns: { type: 'MemoryEntry', description: 'Returns the updated observation with incremented revision_count.' },
      example: `{
  "id": 42,
  "content": "Updated: switched from bcrypt to argon2id for password hashing.",
  "title": "Chose argon2id over bcrypt"
}`,
    },
    mem_delete: {
      name: 'mem_delete',
      description: 'Soft or hard delete an observation. Soft delete sets deleted_at (restorable). Hard delete removes the row and orphans any memory_relations referencing its sync_id.',
      breadcrumbs: ['ROOT', 'MEMORY_TOOLS', 'MEM_DELETE'],
      parameters: [
        { name: 'id', type: 'number', required: true, description: 'Observation ID to delete' },
        { name: 'hard_delete', type: 'boolean', required: false, description: 'If true, permanently delete and orphan relations (default false)' },
      ],
      returns: { type: 'DeleteResult', description: 'Returns success status and whether relations were orphaned.' },
      example: `{
  "id": 42,
  "hard_delete": false
}`,
    },
    mem_timeline: {
      name: 'mem_timeline',
      description: 'Chronological neighborhood of an observation within the same session. Returns the focus entry plus configurable before (older) and after (newer) entries.',
      breadcrumbs: ['ROOT', 'MEMORY_TOOLS', 'MEM_TIMELINE'],
      parameters: [
        { name: 'focus_id', type: 'number', required: true, description: 'The focus observation ID' },
        { name: 'before', type: 'number', required: false, description: 'Number of older entries to return (default 10)' },
        { name: 'after', type: 'number', required: false, description: 'Number of newer entries to return (default 10)' },
      ],
      returns: { type: 'TimelineResult', description: 'Object with focus observation, before[] (older), and after[] (newer) entries.' },
      example: `{
  "focus_id": 42,
  "before": 5,
  "after": 5
}`,
    },
    mem_context: {
      name: 'mem_context',
      description: 'Aggregates recent sessions (up to 5), pinned observations, recent unpinned observations, and recent prompts (up to 10) for the tenant, project, and scope.',
      breadcrumbs: ['ROOT', 'MEMORY_TOOLS', 'MEM_CONTEXT'],
      parameters: [
        { name: 'project', type: 'string', required: false, description: 'Project to scope context to (case-insensitive)' },
        { name: 'scope', type: 'string', required: false, description: 'Scope filter for observations' },
        { name: 'max_context', type: 'number', required: false, description: 'Maximum unpinned observations to return (default 50)' },
      ],
      returns: { type: 'ContextResult', description: 'Object with sessions[], pinned[], recent[], and prompts[] arrays.' },
      example: `{
  "project": "sechel-spa",
  "scope": "project",
  "max_context": 30
}`,
    },
    mem_stats: {
      name: 'mem_stats',
      description: 'Returns counts per table (sessions, observations, user_prompts) and the list of distinct projects ordered by most recent activity, for the current tenant.',
      breadcrumbs: ['ROOT', 'QUERY_TOOLS', 'MEM_STATS'],
      parameters: [],
      returns: { type: 'StatsResult', description: 'Object with session_count, observation_count, prompt_count, and projects[] array.' },
      example: `{
  "session_count": 128,
  "observation_count": 3421,
  "prompt_count": 1890,
  "projects": ["sechel-spa", "sechel-api", "sechel-docs"]
}`,
    },
    mem_judge: {
      name: 'mem_judge',
      description: 'Record a verdict on a pending relation surfaced by mem_save conflict detection. Sets judgment_status to "judged" and stores the reason, evidence, and confidence.',
      breadcrumbs: ['ROOT', 'QUERY_TOOLS', 'MEM_JUDGE'],
      parameters: [
        { name: 'judgment_id', type: 'string', required: true, description: 'The sync_id of the pending memory_relations row' },
        { name: 'relation', type: 'string', required: true, description: 'The relation verdict: related, compatible, scoped, conflicts_with, supersedes, or not_conflict' },
        { name: 'reason', type: 'string', required: false, description: 'Human-readable reason for the verdict' },
        { name: 'evidence', type: 'string', required: false, description: 'Supporting evidence text' },
        { name: 'confidence', type: 'number', required: false, description: 'Confidence level (0.0 to 1.0)' },
      ],
      returns: { type: 'RelationEntry', description: 'Returns the updated memory_relations row with judgment_status set to "judged".' },
      example: `{
  "judgment_id": "rel-a1b2c3d4",
  "relation": "supersedes",
  "reason": "The newer decision explicitly replaces the old approach.",
  "confidence": 0.95
}`,
    },
    mem_compare: {
      name: 'mem_compare',
      description: 'Persist an externally-supplied semantic verdict between two observations directly, bypassing the pending workflow. Creates a judged memory_relations row instantly.',
      breadcrumbs: ['ROOT', 'QUERY_TOOLS', 'MEM_COMPARE'],
      parameters: [
        { name: 'memory_id_a', type: 'number', required: true, description: 'First observation ID (source)' },
        { name: 'memory_id_b', type: 'number', required: true, description: 'Second observation ID (target)' },
        { name: 'relation', type: 'string', required: true, description: 'Semantic relation: related, compatible, scoped, conflicts_with, supersedes, or not_conflict' },
        { name: 'confidence', type: 'number', required: false, description: 'Confidence level (0.0 to 1.0, default 1.0)' },
        { name: 'reasoning', type: 'string', required: false, description: 'Explanation of the relation' },
        { name: 'model', type: 'string', required: false, description: 'Model identifier used for the comparison' },
      ],
      returns: { type: 'RelationEntry | null', description: 'Created relation entry; null if relation is "not_conflict" (no-op).' },
      example: `{
  "memory_id_a": 42,
  "memory_id_b": 17,
  "relation": "conflicts_with",
  "confidence": 0.85,
  "reasoning": "One recommends bcrypt, the other recommends argon2id."
}`,
    },
    mem_save_prompt: {
      name: 'mem_save_prompt',
      description: 'Save a user prompt to persistent memory. Used to record what the user asked so future sessions have context about the user\'s goals and questions.',
      breadcrumbs: ['ROOT', 'QUERY_TOOLS', 'MEM_SAVE_PROMPT'],
      parameters: [
        { name: 'content', type: 'string', required: true, description: 'The prompt content to save' },
        { name: 'session_id', type: 'string', required: true, description: 'Current session identifier' },
        { name: 'project', type: 'string', required: false, description: 'Project scope for the prompt' },
      ],
      returns: { type: 'PromptEntry', description: 'Returns the created prompt entry with id, sync_id, and timestamp.' },
      example: `{
  "content": "How do I set up authentication with JWT in Express?",
  "session_id": "sess_abc123",
  "project": "sechel-api"
}`,
    },
    mem_suggest_topic_key: {
      name: 'mem_suggest_topic_key',
      description: 'Suggest a topic_key from type and title using family heuristics. Pure function — no DB write. Returns a key like "architecture/*", "bug/*", or "decision/*".',
      breadcrumbs: ['ROOT', 'QUERY_TOOLS', 'MEM_SUGGEST_TOPIC_KEY'],
      parameters: [
        { name: 'title', type: 'string', required: true, description: 'The observation title to base the heuristic on' },
        { name: 'type', type: 'string', required: true, description: 'The observation type (architecture, bugfix, decision, etc.)' },
      ],
      returns: { type: 'string', description: 'Suggested topic_key string (e.g., "architecture/auth-model", "bugfix/nplus1-query").' },
      example: `{
  "title": "Chose JWT over session cookies",
  "type": "decision"
}
// Returns: "decision/jwt-over-session-cookies"`,
    },
    mem_session_start: {
      name: 'mem_session_start',
      description: 'Register the start of a new coding session. Creates a session record with id, project, directory, and started_at timestamp.',
      breadcrumbs: ['ROOT', 'MANAGEMENT_TOOLS', 'MEM_SESSION_START'],
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Unique session identifier' },
        { name: 'project', type: 'string', required: true, description: 'Project name for this session' },
        { name: 'directory', type: 'string', required: false, description: 'Working directory path' },
      ],
      returns: { type: 'SessionEntry', description: 'Returns the created session with started_at timestamp.' },
      example: `{
  "id": "sess_abc123",
  "project": "sechel-spa",
  "directory": "/home/user/sechel-spa"
}`,
    },
    mem_session_end: {
      name: 'mem_session_end',
      description: 'Mark a session as ended by setting ended_at timestamp and an optional summary.',
      breadcrumbs: ['ROOT', 'MANAGEMENT_TOOLS', 'MEM_SESSION_END'],
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Session ID to end' },
        { name: 'summary', type: 'string', required: false, description: 'Optional end-of-session summary' },
      ],
      returns: { type: 'SessionEntry', description: 'Returns the updated session with ended_at set.' },
      example: `{
  "id": "sess_abc123",
  "summary": "Implemented JWT auth and wrote unit tests."
}`,
    },
    mem_session_summary: {
      name: 'mem_session_summary',
      description: 'End a session with a comprehensive summary body. Same as mem_session_end but summary is required and typically contains structured sections.',
      breadcrumbs: ['ROOT', 'MANAGEMENT_TOOLS', 'MEM_SESSION_SUMMARY'],
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Session ID to summarize' },
        { name: 'summary', type: 'string', required: true, description: 'Session summary content (can include structured sections)' },
      ],
      returns: { type: 'SessionEntry', description: 'Returns the updated session with ended_at and summary set.' },
      example: `{
  "id": "sess_abc123",
  "summary": "## Goal\\nImplement JWT authentication\\n## Accomplished\\n- Added auth middleware\\n- Wrote tests\\n## Next Steps\\n- Add refresh token rotation"
}`,
    },
    mem_review: {
      name: 'mem_review',
      description: 'Lifecycle review of observations. With action "list", returns observations due for review (review_after <= now). With action "mark_reviewed", resets review_after based on type decay policy.',
      breadcrumbs: ['ROOT', 'MANAGEMENT_TOOLS', 'MEM_REVIEW'],
      parameters: [
        { name: 'action', type: 'string', required: true, description: '"list" to get due observations, "mark_reviewed" to reset one observation\'s review_after' },
        { name: 'id', type: 'number', required: false, description: 'Observation ID (required for mark_reviewed action)' },
        { name: 'limit', type: 'number', required: false, description: 'Maximum results for list action (default 10)' },
        { name: 'project', type: 'string', required: false, description: 'Project filter (case-insensitive)' },
      ],
      returns: { type: 'ReviewResult', description: 'For "list": array of observations due for review. For "mark_reviewed": the updated observation.' },
      example: `{
  "action": "list",
  "project": "sechel-spa",
  "limit": 20
}`,
    },
    mem_current_project: {
      name: 'mem_current_project',
      description: 'Resolve the current project for the authenticated user/tenant. No DB read of cwd; resolves from the tenant\'s most recent project or the explicit project argument.',
      breadcrumbs: ['ROOT', 'MANAGEMENT_TOOLS', 'MEM_CURRENT_PROJECT'],
      parameters: [
        { name: 'project', type: 'string', required: false, description: 'Explicit project name to use instead of auto-detection' },
      ],
      returns: { type: 'ProjectEnvelope', description: 'Detection envelope: { project, project_source, project_path, cwd, available_projects }.' },
      example: `{
  "project": "sechel-spa"
}`,
    },
    mem_doctor: {
      name: 'mem_doctor',
      description: 'Run read-only diagnostics. Returns integrity_check results, row counts per table for the tenant, and orphaned memory_relations. No mutation.',
      breadcrumbs: ['ROOT', 'MANAGEMENT_TOOLS', 'MEM_DOCTOR'],
      parameters: [],
      returns: { type: 'DiagnosticResult', description: 'Object with integrity_check, row_counts (sessions, observations, user_prompts, memory_relations), and orphaned_relations count.' },
      example: `{
  "integrity_check": "ok",
  "row_counts": {
    "sessions": 128,
    "observations": 3421,
    "user_prompts": 1890,
    "memory_relations": 45
  },
  "orphaned_relations": 0
}`,
    },
    mem_merge_projects: {
      name: 'mem_merge_projects',
      description: 'Rename a project across observations, sessions, and user_prompts for the tenant. Normalizes from and to (lowercase + trim), then updates all three tables atomically.',
      breadcrumbs: ['ROOT', 'MANAGEMENT_TOOLS', 'MEM_MERGE_PROJECTS'],
      parameters: [
        { name: 'from', type: 'string', required: true, description: 'Source project name to rename from (case-insensitive)' },
        { name: 'to', type: 'string', required: true, description: 'Target project name to rename to' },
      ],
      returns: { type: 'MergeResult', description: 'Result with affected_rows: { observations, sessions, prompts }.' },
      example: `{
  "from": "old-project-name",
  "to": "new-project-name"
}`,
    },
    mem_capture_passive: {
      name: 'mem_capture_passive',
      description: 'Parse learning sections from text — "## Key Learnings" or "## Aprendizajes Clave" headers — and save each extracted item as a separate observation via AddObservation.',
      breadcrumbs: ['ROOT', 'MANAGEMENT_TOOLS', 'MEM_CAPTURE_PASSIVE'],
      parameters: [
        { name: 'content', type: 'string', required: true, description: 'Text content to parse for learning sections' },
        { name: 'source', type: 'string', required: false, description: 'Source identifier for the extracted learnings' },
        { name: 'session_id', type: 'string', required: false, description: 'Current session identifier' },
        { name: 'project', type: 'string', required: false, description: 'Project scope for the created observations' },
      ],
      returns: { type: 'Observation[]', description: 'Array of created observation entries, one per extracted learning item.' },
      example: `{
  "content": "## Key Learnings\\n- Switched to argon2id for password hashing\\n- Added rate limiting to auth endpoints",
  "source": "code-review",
  "session_id": "sess_abc123",
  "project": "sechel-api"
}`,
    },
  };

  let doc = $derived(docs[activeTool]);

  let activeCategory = $derived(
    toolCategories.find(cat => cat.tools.includes(activeTool)) ?? toolCategories[0]
  );

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(doc.example);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      // fallback
    }
  }
</script>

<section id="apidocs" class="border-b border-[var(--border)]">
  <div class="max-w-[1200px] mx-auto px-6 py-16">
    <header class="mb-12 border-l-4 border-[var(--accent)] pl-6">
      <h2 class="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter leading-none mb-4">
        API Docs
      </h2>
      <p class="text-xl md:text-2xl text-primary font-light tracking-tight">
        Memory tools reference
      </p>
    </header>

    <!-- Mobile: category + tool pills -->
    <div class="lg:hidden mb-8 space-y-3">
      <div class="flex flex-wrap gap-2">
        {#each toolCategories as category}
          <button
            class="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all {activeCategory.name === category.name ? 'bg-accent text-primary border-accent' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-accent/50'}"
            onclick={() => {
              if (!category.tools.includes(activeTool)) {
                activeTool = category.tools[0];
              }
            }}
          >
            {category.name}
          </button>
        {/each}
      </div>
      <hr class="border-[var(--border)]" />
      <div class="flex flex-wrap gap-1.5">
        {#each activeCategory.tools as tool}
          <button
            class="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all {activeTool === tool ? 'bg-accent text-primary border-accent' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-accent/50'}"
            onclick={() => (activeTool = tool)}
          >
            {tool}
          </button>
        {/each}
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <aside class="hidden lg:block xl:w-[300px] lg:w-[240px] flex-shrink-0">
        <div class="border border-[var(--border)]">
          {#each toolCategories as category}
            <div>
              <div class="bg-[var(--muted)] px-4 py-2 border-b border-[var(--border)]">
                <span class="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{category.name}</span>
              </div>
              {#each category.tools as tool}
                <button
                  class="w-full text-left px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest border-b border-[var(--border)] flex justify-between items-center group transition-all {activeTool === tool ? 'bg-accent text-primary' : 'text-[var(--muted-foreground)] hover:bg-accent/20 hover:text-primary'}"
                  onclick={() => (activeTool = tool)}
                >
                  {tool}
                  {#if activeTool === tool}
                    <ChevronRight size={12} class="flex-shrink-0" />
                  {/if}
                </button>
              {/each}
            </div>
          {/each}
        </div>
      </aside>

      <div class="flex-1 min-w-0 space-y-8">
        <nav class="flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider">
          {#each doc.breadcrumbs as crumb, i}
            {#if i > 0}
              <ChevronRight size={10} class="text-[var(--outline)]" />
            {/if}
            <span class={i === doc.breadcrumbs.length - 1 ? 'text-primary' : ''}>{crumb}</span>
          {/each}
        </nav>

        <div class="space-y-2">
          <h3 class="text-3xl font-bold font-mono uppercase tracking-tight">{doc.name}</h3>
          <p class="text-[var(--on-surface-variant)] leading-relaxed max-w-2xl">
            {doc.description}
          </p>
        </div>

        {#if doc.parameters.length > 0}
          <!-- Mobile: card layout -->
          <div class="block lg:hidden border border-[var(--border)] divide-y divide-[var(--border)]">
            {#each doc.parameters as param}
              <div class="p-4 space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-mono text-xs text-primary font-bold">{param.name}</span>
                  <span class="font-mono text-[10px] text-[var(--foreground)]">{param.type}</span>
                  {#if param.required}
                    <span class="text-[10px] uppercase font-bold text-[var(--destructive)]">Required</span>
                  {:else}
                    <span class="text-[10px] uppercase text-[var(--muted-foreground)]">Optional</span>
                  {/if}
                </div>
                <p class="text-xs text-[var(--on-surface-variant)]">{param.description}</p>
              </div>
            {/each}
          </div>
          <!-- Desktop: table layout -->
          <div class="hidden lg:block border border-[var(--border)]">
            <div class="bg-[var(--muted)] px-4 py-2 border-b border-[var(--border)]">
              <span class="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Parameters</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--border)]">
                    <th class="text-left px-4 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Name</th>
                    <th class="text-left px-4 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Type</th>
                    <th class="text-left px-4 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Required</th>
                    <th class="text-left px-4 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {#each doc.parameters as param}
                    <tr class="border-b border-[var(--border)] last:border-b-0">
                      <td class="px-4 py-3 font-mono text-xs text-primary">{param.name}</td>
                      <td class="px-4 py-3 font-mono text-xs text-[var(--foreground)]">{param.type}</td>
                      <td class="px-4 py-3">
                        {#if param.required}
                          <span class="text-[10px] uppercase font-bold text-[var(--destructive)]">Required</span>
                        {:else}
                          <span class="text-[10px] uppercase text-[var(--muted-foreground)]">Optional</span>
                        {/if}
                      </td>
                      <td class="px-4 py-3 text-xs text-[var(--on-surface-variant)]">{param.description}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {:else}
          <div class="border border-[var(--border)] p-4">
            <div class="flex items-start gap-3">
              <span class="text-[10px] uppercase tracking-[0.2em] font-label text-[var(--muted-foreground)]">Parameters</span>
              <span class="text-xs text-[var(--on-surface-variant)] italic">This tool has no parameters.</span>
            </div>
          </div>
        {/if}

        <div class="border border-[var(--border)] p-4">
          <div class="flex items-start gap-3">
            <span class="text-[10px] uppercase tracking-[0.2em] font-label text-[var(--muted-foreground)] flex-shrink-0 w-16">Returns</span>
            <div>
              <span class="font-mono text-xs text-[var(--tertiary)]">{doc.returns.type}</span>
              <p class="text-xs text-[var(--on-surface-variant)] mt-1">{doc.returns.description}</p>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Usage Example</h4>
          <div class="relative group">
            <div class="absolute -inset-1 bg-accent/20 blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div class="relative bg-[var(--background)] border border-[var(--border)]">
              <div class="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--surface)]">
                <div class="flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-[var(--muted-foreground)]/20"></div>
                  <div class="w-3 h-3 rounded-full bg-[var(--muted-foreground)]/20"></div>
                  <div class="w-3 h-3 rounded-full bg-[var(--muted-foreground)]/20"></div>
                </div>
                <span class="font-mono text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest">request.json</span>
              </div>
              <pre class="p-4 m-0 overflow-x-auto font-mono text-sm leading-relaxed text-[var(--foreground)]"><code>{doc.example}</code></pre>
              <div class="border-t border-[var(--border)] px-4 py-3 flex justify-between items-center">
                <span class="text-[10px] uppercase font-label text-[var(--muted-foreground)]">JSON-RPC 2.0 Request</span>
                <button
                  class="flex items-center gap-2 px-3 py-1 bg-accent text-white text-xs font-bold uppercase tracking-tighter hover:opacity-80 active:opacity-100 transition-all"
                  onclick={copyCode}
                >
                  {#if copied}
                    <Check size={12} /> Copied
                  {:else}
                    <Copy size={12} /> Copy
                  {/if}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
