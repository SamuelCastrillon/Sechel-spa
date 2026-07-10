import type { Metadata } from 'next';
import './globals.css';
import PresentationLayout from '@/modules/presentation/components/PresentationLayout';

export const metadata: Metadata = {
  title: {
    template: '%s | Sechel',
    default: 'Sechel — Serverless MCP Memory Server for AI Coding Agents',
  },
  description:
    'Sechel is a serverless MCP memory server for AI coding agents. Persistent, searchable, and session-aware memory across Claude Code, Cursor, OpenCode, and more.',
  openGraph: {
    title: 'Sechel — MCP Memory Server',
    description:
      'Serverless MCP memory server for AI coding agents. Persistent, searchable, session-aware.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <PresentationLayout>{children}</PresentationLayout>
      </body>
    </html>
  );
}
