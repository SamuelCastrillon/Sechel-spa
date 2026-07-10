export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Memory' | 'Query' | 'Context' | 'Tools';
}

export const features: Feature[] = [
  // ── Memory ──────────────────────────────────────────
  {
    id: 'persistent-memory',
    title: 'Persistent Memory',
    description:
      'Save and recall context across AI coding sessions with Engram\'s persistent memory system. No more starting from scratch.',
    icon: '🧠',
    category: 'Memory',
  },
  {
    id: 'smart-upsert',
    title: 'Smart Upsert',
    description:
      'Automatically deduplicate and merge related memories using topic keys and FTS5 search — no manual cleanup needed.',
    icon: '🔄',
    category: 'Memory',
  },
  // ── Query ───────────────────────────────────────────
  {
    id: 'fulltext-search',
    title: 'Full-Text Search',
    description:
      'Search across all stored memories with BM25-ranked results using SQLite FTS5. Fast, relevant, and offline.',
    icon: '🔍',
    category: 'Query',
  },
  {
    id: 'session-timeline',
    title: 'Session Timeline',
    description:
      'Navigate chronological memory history with mem_timeline to understand how decisions evolved over time.',
    icon: '📋',
    category: 'Query',
  },
  // ── Context ─────────────────────────────────────────
  {
    id: 'session-context',
    title: 'Session Context',
    description:
      'Automatically surface relevant recent context at the start of each new coding session via mem_context.',
    icon: '💬',
    category: 'Context',
  },
  {
    id: 'session-summaries',
    title: 'Session Summaries',
    description:
      'Generate structured session summaries with mem_session_summary to preserve progress and next steps between sessions.',
    icon: '📝',
    category: 'Context',
  },
  // ── Tools ───────────────────────────────────────────
  {
    id: 'mcp-integration',
    title: 'MCP Integration',
    description:
      'Seamless Model Context Protocol integration — works with Claude Code, Cursor, OpenCode, and any MCP-compatible agent.',
    icon: '🔧',
    category: 'Tools',
  },
  {
    id: 'tool-registry',
    title: '23 MCP Tools',
    description:
      'A comprehensive suite of 23 tools covering memory operations, search, session management, and system utilities — all at your fingertips.',
    icon: '🧰',
    category: 'Tools',
  },
];
