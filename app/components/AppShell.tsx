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
      <header className="bg-surface border-b border-border px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-lg shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary tracking-tight">{title}</h1>
              {subtitle && (
                <p className="text-sm text-primary/70 font-medium mt-0.5">{subtitle}</p>
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
      <footer className="bg-surface border-t border-border px-6 py-4">
        <div className="flex items-center justify-center">
          <p className="text-xs text-primary/60 font-medium">
            Built on Base with MiniKit
          </p>
        </div>
      </footer>
    </div>
  );
}
