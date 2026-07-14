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
      "url": "https://cortextmcp.vercel.app/api/mcp",
      "headers": {
        "Authorization": "Bearer <your-token>"
      }
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
      "url": "https://cortextmcp.vercel.app/api/mcp",
      "headers": {
        "Authorization": "Bearer <your-token>"
      }
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
      "url": "https://cortextmcp.vercel.app/api/mcp",
      "enabled": true,
      "headers": {
        "Authorization": "Bearer <your-token>"
      }
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
      "url": "https://cortextmcp.vercel.app/api/mcp",
      "headers": {
        "Authorization": "Bearer <your-token>"
      },
      "timeout": 30000
    }
  }
}`,
  },
];
