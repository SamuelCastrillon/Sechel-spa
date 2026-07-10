export interface PlatformConfig {
  id: string;
  name: string;
  icon: string;
  snippet: string;
  language: string;
}

export const platforms: PlatformConfig[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    icon: '🤖',
    snippet: `{
  "mcpServers": {
    "sechel": {
      "command": "npx",
      "args": [
        "-y",
        "@gentleman-programming/sechel"
      ],
      "env": {
        "SENCHEL_DB_PATH": "~/.sechel/memory.db"
      }
    }
  }
}`,
    language: 'json',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '🖥️',
    snippet: `{
  "mcpServers": {
    "sechel": {
      "command": "npx",
      "args": [
        "-y",
        "@gentleman-programming/sechel"
      ],
      "env": {
        "SENCHEL_DB_PATH": "~/.sechel/memory.db"
      }
    }
  }
}`,
    language: 'json',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    icon: '⌨️',
    snippet: `{
  "mcpServers": {
    "sechel": {
      "command": "npx",
      "args": [
        "-y",
        "@gentleman-programming/sechel"
      ],
      "env": {
        "SENCHEL_DB_PATH": "~/.sechel/memory.db"
      }
    }
  }
}`,
    language: 'json',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    icon: '✨',
    snippet: `sechel:
  command: npx
  args:
    - -y
    - "@gentleman-programming/sechel"
  env:
    SENCHEL_DB_PATH: "~/.sechel/memory.db"`,
    language: 'yaml',
  },
];
