
'use client';

import type { ReactNode } from 'react';
import { Shield } from 'lucide-react';

interface AppShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  headerActions?: ReactNode;
  navigation?: ReactNode;
}

export function AppShell({
  title,
  subtitle,
  children,
  headerActions,
  navigation,
}: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Header */}
      <header className="bg-surface border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-accent rounded-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">{title}</h1>
              {subtitle && (
                <p className="text-sm text-primary/60">{subtitle}</p>
              )}
            </div>
          </div>
          {headerActions}
        </div>
      </header>

      {/* Navigation */}
      {navigation && (
        <nav className="bg-surface">
          {navigation}
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border px-4 py-3">
        <div className="flex items-center justify-center">
          <p className="text-xs text-primary/60">
            Built on Base with MiniKit
          </p>
        </div>
      </footer>
    </div>
  );
}
