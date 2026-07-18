import type { Feature } from '../types';

export const features: Feature[] = [
  {
    id: 'persistent-memory',
    title: 'Persistent Memory',
    description: 'Save and recall context across AI coding sessions. No more starting from scratch.',
    icon: 'Brain',
    category: 'Memory',
  },
  {
    id: 'smart-upsert',
    title: 'Smart Upsert',
    description: 'Automatically deduplicate and merge related memories using topic keys and FTS5 search.',
    icon: 'RefreshCw',
    category: 'Memory',
  },
  {
    id: 'fulltext-search',
    title: 'Full-Text Search',
    description: 'Search across all stored memories with BM25-ranked results using SQLite FTS5.',
    icon: 'Search',
    category: 'Query',
  },
  {
    id: 'session-timeline',
    title: 'Session Timeline',
    description: 'Navigate chronological memory history to understand how decisions evolved over time.',
    icon: 'ClipboardList',
    category: 'Query',
  },
  {
    id: 'session-context',
    title: 'Session Context',
    description: 'Automatically surface relevant recent context at the start of each new coding session.',
    icon: 'MessageSquare',
    category: 'Context',
  },
  {
    id: 'mcp-integration',
    title: 'MCP Native',
    description: 'Seamless Model Context Protocol — works with Claude Code, Cursor, OpenCode, and more.',
    icon: 'Wrench',
    category: 'Tools',
  },
  {
    id: '25-tools',
    title: '25 MCP Tools',
    description: '25 tools covering memory, search, session management, and system utilities.',
    icon: 'Toolbox',
    category: 'Tools',
  },
  {
    id: 'self-hosted',
    title: 'Self-Hosted',
    description: 'MIT licensed. Deploy on Vercel + Turso, Cloudflare Workers, or Docker. Full control of your data.',
    icon: 'Shield',
    category: 'Deploy',
  },
];
