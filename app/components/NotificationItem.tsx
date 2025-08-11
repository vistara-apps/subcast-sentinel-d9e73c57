
'use client';

import type { ReactNode } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Clock, AlertTriangle } from 'lucide-react';

interface Interaction {
  id: string;
  castHash: string;
  authorFid: string;
  authorUsername: string;
  authorDisplayName: string;
  content: string;
  timestamp: Date;
  isDeleted: boolean;
  parentCastHash?: string;
  type: 'cast' | 'reply' | 'mention' | 'recast';
  alertTriggered: boolean;
}

interface NotificationItemProps {
  interaction: Interaction;
  icon?: ReactNode;
  variant?: 'default' | 'deleted';
}

export function NotificationItem({
  interaction,
  icon,
  variant = 'default',
}: NotificationItemProps) {
  const isDeleted = interaction.isDeleted || variant === 'deleted';

  return (
    <div
      className={`p-4 hover:bg-muted/50 transition-colors animate-slide-in ${
        interaction.alertTriggered ? 'bg-accent/5 border-l-4 border-accent' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div className="flex-shrink-0 mt-1">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-primary">
              {interaction.authorDisplayName}
            </span>
            <span className="text-sm text-primary/60">
              @{interaction.authorUsername}
            </span>
            <span className="text-xs text-primary/40">
              FID: {interaction.authorFid}
            </span>
            {interaction.alertTriggered && (
              <div className="flex items-center gap-1">
                <AlertTriangle size={14} className="text-warning" />
                <span className="badge-warning text-xs">Alert</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`mb-2 ${isDeleted ? 'opacity-60' : ''}`}>
            {isDeleted ? (
              <div className="flex items-center gap-2 text-primary/60 italic">
                <Trash2 size={14} />
                <span className="text-sm">This cast has been deleted</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed break-words">
                {interaction.content}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-primary/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>
                  {formatDistanceToNow(interaction.timestamp, { addSuffix: true })}
                </span>
              </div>
              {interaction.parentCastHash && (
                <span className="badge-secondary">Reply</span>
              )}
              <span className="badge-secondary capitalize">
                {interaction.type}
              </span>
            </div>
            <div className="text-xs font-mono">
              {interaction.castHash.slice(0, 8)}...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
