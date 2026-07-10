export interface ToolParam {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface Tool {
  name: string;
  description: string;
  category: string;
  parameters: ToolParam[];
  returns: string;
  example: string;
}

export const toolsCategoryOrder: string[] = [
  'Memory',
  'Session',
  'Utility',
  'System',
];

export const tools: Tool[] = [
  // ══════════════════════════════════════════════════════
  // Memory Tools (10)
  // ══════════════════════════════════════════════════════
  {
    name: 'mem_save',
    description: 'Save a memory observation. Upserts by topic_key, dedupes within 15 minutes, and surfaces pending conflicts.',
    category: 'Memory',
    parameters: [
      { name: 'title', type: 'string', description: 'Short, searchable title for the observation', required: true },
      { name: 'content', type: 'string', description: 'Structured content describing what was learned', required: true },
      { name: 'type', type: 'string', description: 'Observation type (bugfix, decision, architecture, etc.)', required: false },
      { name: 'topic_key', type: 'string', description: 'Stable key for upsert deduplication', required: false },
    ],
    returns: 'Observation record with id, title, content, and metadata.',
    example: `mem_save(
  title: "Fixed N+1 query in UserList",
  type: "bugfix",
  topic_key: "performance/user-list"
)`,

  },
  {
    name: 'mem_search',
    description: 'Search memories using FTS5 full-text search with BM25 ranking. Supports all/any match modes.',
    category: 'Memory',
    parameters: [
      { name: 'query', type: 'string', description: 'Search keywords to match against observation content', required: true },
      { name: 'type', type: 'string', description: 'Filter by observation type', required: false },
      { name: 'limit', type: 'integer', description: 'Maximum number of results to return (default: 10)', required: false },
      { name: 'match_mode', type: 'string', description: 'all | any (default: all)', required: false },
    ],
    returns: 'Ranked array of matching observations with id, title, type, and content snippet.',
    example: `mem_search(query: "N+1 query UserList", limit: 5)`,
  },
  {
    name: 'mem_context',
    description: 'Get recent memory context from previous sessions — shows recent sessions, pinned observations, and recent unpinned entries.',
    category: 'Memory',
    parameters: [
      { name: 'project', type: 'string', description: 'Filter by project name', required: false },
      { name: 'scope', type: 'string', description: 'project | personal (default: project)', required: false },
      { name: 'max_context', type: 'integer', description: 'Maximum entries to return (default: 50)', required: false },
    ],
    returns: 'Structured context: recent sessions, pinned observations, recent unpinned, and recent prompts.',
    example: `mem_context(scope: "project", max_context: 20)`,
  },
  {
    name: 'mem_get_observation',
    description: 'Retrieve the full, untruncated content of a specific observation by its ID.',
    category: 'Memory',
    parameters: [
      { name: 'id', type: 'integer', description: 'Observation ID to retrieve', required: true },
    ],
    returns: 'Complete observation record with all fields and full content text.',
    example: `mem_get_observation(id: 42)`,
  },
  {
    name: 'mem_update',
    description: 'Update an existing observation by ID. Only provided fields are changed — other fields remain untouched.',
    category: 'Memory',
    parameters: [
      { name: 'id', type: 'integer', description: 'Observation ID to update', required: true },
      { name: 'title', type: 'string', description: 'New title', required: false },
      { name: 'content', type: 'string', description: 'New content', required: false },
      { name: 'type', type: 'string', description: 'New type', required: false },
    ],
    returns: 'Updated observation record.',
    example: `mem_update(id: 42, content: "Updated analysis with new findings")`,
  },
  {
    name: 'mem_delete',
    description: 'Delete an observation by ID. Supports soft delete (default) by setting deleted_at, or hard delete with orphan cleanup.',
    category: 'Memory',
    parameters: [
      { name: 'id', type: 'integer', description: 'Observation ID to delete', required: true },
      { name: 'hard_delete', type: 'boolean', description: 'Permanently remove from database (default: false)', required: false },
    ],
    returns: 'Confirmation of deletion with the deleted observation ID.',
    example: `mem_delete(id: 42)`,
  },
  {
    name: 'mem_timeline',
    description: 'Get the chronological neighborhood of an observation within the same session. Returns focus, before, and after entries.',
    category: 'Memory',
    parameters: [
      { name: 'focus_id', type: 'integer', description: 'The central observation ID', required: true },
      { name: 'before', type: 'integer', description: 'Entries before focus (default: 10)', required: false },
      { name: 'after', type: 'integer', description: 'Entries after focus (default: 10)', required: false },
    ],
    returns: 'Timeline object with focus, before[], and after[] entries ordered by recency.',
    example: `mem_timeline(focus_id: 42, before: 5, after: 5)`,
  },
  {
    name: 'mem_stats',
    description: 'Get counts, project list, and storage stats for the current Engram tenant.',
    category: 'Memory',
    parameters: [],
    returns: 'Stats object with total observations, observations by type, project list, and storage metrics.',
    example: `mem_stats()`,
  },
  {
    name: 'mem_doctor',
    description: 'Run read-only operational diagnostics on the memory store. Returns structured counts and surface issues.',
    category: 'Memory',
    parameters: [
      { name: 'check', type: 'string', description: 'Specific diagnostic check to run', required: false },
      { name: 'project', type: 'string', description: 'Scope diagnostics to a project', required: false },
    ],
    returns: 'Diagnostics report with section counts, orphaned records, and integrity warnings.',
    example: `mem_doctor()`,
  },
  {
    name: 'mem_review',
    description: 'Review observation lifecycle state. List observations past their review date, or mark an observation as reviewed to reset its timer.',
    category: 'Memory',
    parameters: [
      { name: 'action', type: 'string', description: 'list | mark_reviewed', required: true },
      { name: 'id', type: 'integer', description: 'Observation ID (required for mark_reviewed)', required: false },
      { name: 'limit', type: 'integer', description: 'Maximum results (default: 10)', required: false },
      { name: 'project', type: 'string', description: 'Filter by project', required: false },
    ],
    returns: 'List of observations needing review, or confirmation of mark_reviewed action.',
    example: `mem_review(action: "list", limit: 20)`,
  },

  // ══════════════════════════════════════════════════════
  // Session Tools (4)
  // ══════════════════════════════════════════════════════
  {
    name: 'mem_session_start',
    description: 'Register the start of a new coding session. Call this at the beginning of a session to track activity.',
    category: 'Session',
    parameters: [
      { name: 'id', type: 'string', description: 'Unique session identifier', required: true },
      { name: 'project', type: 'string', description: 'Project name for the session', required: true },
      { name: 'directory', type: 'string', description: 'Working directory (default: "unknown")', required: false },
    ],
    returns: 'Session record with id, start time, and project.',
    example: `mem_session_start(id: "sess-abc123", project: "my-app")`,
  },
  {
    name: 'mem_session_end',
    description: 'Mark a coding session as completed with an optional summary.',
    category: 'Session',
    parameters: [
      { name: 'id', type: 'string', description: 'Session ID to close', required: true },
      { name: 'summary', type: 'string', description: 'Optional end-of-session summary', required: false },
    ],
    returns: 'Confirmation with session duration and summary.',
    example: `mem_session_end(id: "sess-abc123", summary: "Completed auth feature")`,
  },
  {
    name: 'mem_session_summary',
    description: 'Save a comprehensive end-of-session summary. Call this when a session ends or when significant work is complete.',
    category: 'Session',
    parameters: [
      { name: 'id', type: 'string', description: 'Session ID', required: true },
      { name: 'summary', type: 'string', description: 'Structured markdown summary', required: false },
    ],
    returns: 'Confirmation with the saved summary record.',
    example: `mem_session_summary(id: "sess-abc123")`,
  },
  {
    name: 'mem_save_prompt',
    description: 'Save a user prompt to persistent memory for context preservation across sessions.',
    category: 'Session',
    parameters: [
      { name: 'content', type: 'string', description: 'The user prompt text', required: true },
      { name: 'session_id', type: 'string', description: 'Session ID this prompt belongs to', required: true },
      { name: 'project', type: 'string', description: 'Project name', required: false },
    ],
    returns: 'Prompt record with id, content, and timestamp.',
    example: `mem_save_prompt(content: "How do I implement auth?", session_id: "sess-abc123")`,
  },

  // ══════════════════════════════════════════════════════
  // Utility Tools (6)
  // ══════════════════════════════════════════════════════
  {
    name: 'mem_pin',
    description: 'Pin an observation so it appears at the top of memory context. Pinned state is local to this device.',
    category: 'Utility',
    parameters: [
      { name: 'id', type: 'integer', description: 'Observation ID to pin', required: true },
    ],
    returns: 'Confirmation with the pinned observation ID.',
    example: `mem_pin(id: 42)`,
  },
  {
    name: 'mem_unpin',
    description: 'Unpin an observation so it returns to normal recency ordering. Pinned state is local.',
    category: 'Utility',
    parameters: [
      { name: 'id', type: 'integer', description: 'Observation ID to unpin', required: true },
    ],
    returns: 'Confirmation with the unpinned observation ID.',
    example: `mem_unpin(id: 42)`,
  },
  {
    name: 'mem_compare',
    description: 'Record a semantic verdict between two observations. Persists relations like supersedes, conflicts_with, or compatible.',
    category: 'Utility',
    parameters: [
      { name: 'memory_id_a', type: 'integer', description: 'First observation ID', required: true },
      { name: 'memory_id_b', type: 'integer', description: 'Second observation ID', required: true },
      { name: 'relation', type: 'string', description: 'related | compatible | scoped | conflicts_with | supersedes | not_conflict', required: true },
      { name: 'confidence', type: 'number', description: 'Confidence score 0-1 (default: 1)', required: false },
    ],
    returns: 'Verdict record with relation and confidence.',
    example: `mem_compare(memory_id_a: 1, memory_id_b: 2, relation: "supersedes")`,
  },
  {
    name: 'mem_judge',
    description: 'Record a verdict on a pending memory conflict surfaced by mem_save.',
    category: 'Utility',
    parameters: [
      { name: 'judgment_id', type: 'string', description: 'Conflict judgment ID', required: true },
      { name: 'relation', type: 'string', description: 'related | compatible | scoped | conflicts_with | supersedes | not_conflict', required: true },
      { name: 'reason', type: 'string', description: 'Explanation for the judgment', required: false },
    ],
    returns: 'Judgment record with resolution status.',
    example: `mem_judge(judgment_id: "jgt-abc", relation: "supersedes", reason: "New design replaces old approach")`,
  },
  {
    name: 'mem_capture_passive',
    description: 'Extract and save structured learnings from text output. Parses "## Key Learnings" sections from any content.',
    category: 'Utility',
    parameters: [
      { name: 'content', type: 'string', description: 'Text content with "## Key Learnings" sections', required: true },
      { name: 'session_id', type: 'string', description: 'Session ID for attribution', required: false },
      { name: 'project', type: 'string', description: 'Project name', required: false },
      { name: 'source', type: 'string', description: 'Source label for the content', required: false },
    ],
    returns: 'Array of extracted learning observations.',
    example: `mem_capture_passive(content: "## Key Learnings\\n- Found the root cause...")`,
  },
  {
    name: 'mem_suggest_topic_key',
    description: 'Suggest a stable topic_key for memory upserts. Use before mem_save when you want evolving topics to update a single observation.',
    category: 'Utility',
    parameters: [
      { name: 'title', type: 'string', description: 'Observation title to suggest a key for', required: true },
      { name: 'type', type: 'string', description: 'Observation type', required: false },
    ],
    returns: 'Suggested topic_key string for consistent upsert behavior.',
    example: `mem_suggest_topic_key(title: "Fixed N+1 query", type: "bugfix")`,
  },

  // ══════════════════════════════════════════════════════
  // System Tools (3)
  // ══════════════════════════════════════════════════════
  {
    name: 'mem_merge_projects',
    description: 'Rename a project across all observations, sessions, and user_prompts tables — useful for project restructuring.',
    category: 'System',
    parameters: [
      { name: 'from', type: 'string', description: 'Current project name', required: true },
      { name: 'to', type: 'string', description: 'New project name', required: true },
    ],
    returns: 'Confirmation with counts of renamed records.',
    example: `mem_merge_projects(from: "old-name", to: "new-name")`,
  },
  {
    name: 'ping',
    description: 'Health check endpoint — verifies the MCP server is responsive and returns server info.',
    category: 'System',
    parameters: [],
    returns: 'Server status object with version, uptime, and connection info.',
    example: `ping()`,
  },
  {
    name: 'tools/list',
    description: 'List all available MCP tools with their descriptions and parameter schemas.',
    category: 'System',
    parameters: [],
    returns: 'Array of tool definitions with name, description, and input_schema for each.',
    example: `tools/list()`,
  },
];
