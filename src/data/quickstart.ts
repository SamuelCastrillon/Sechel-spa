import type { Platform } from '../types';

export const platforms: Platform[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    icon: 'Bot',
    language: 'json',
    snippet: `{
  "mcpServers": {
    "sechel": {
      "url": "https://your-sechel.vercel.app/api/mcp"
    }
  }
}`,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: 'Monitor',
    language: 'json',
    snippet: `{
  "mcpServers": {
    "sechel": {
      "url": "https://your-sechel.vercel.app/api/mcp"
    }
  }
}`,
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    icon: 'Keyboard',
    language: 'json',
    snippet: `{
  "mcpServers": {
    "sechel": {
      "url": "https://your-sechel.vercel.app/api/mcp"
    }
  }
}`,
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    icon: 'Sparkles',
    language: 'yaml',
    snippet: `sechel:
  url: "https://your-sechel.vercel.app/api/mcp"`,
  },
];
