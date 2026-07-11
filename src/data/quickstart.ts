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
  "mcp": {
    "sechel": {
      "type": "remote",
      "url": "https://your-sechel.vercel.app/api/mcp",
      "enabled": true
    }
  }
}`,
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    icon: 'Sparkles',
    language: 'json',
    snippet: `{
  "mcpServers": {
    "sechel": {
      "url": "https://your-sechel.vercel.app/api/mcp",
      "timeout": 30000
    }
  }
}`,
  },
];
