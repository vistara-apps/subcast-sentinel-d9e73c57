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
      className={`p-5 hover:bg-muted/30 hover:shadow-sm transition-all duration-200 animate-slide-in border-l-2 ${
        interaction.alertTriggered 
          ? 'bg-accent/5 border-l-accent shadow-sm' 
          : 'border-l-transparent hover:border-l-border'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Type Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            interaction.alertTriggered ? 'bg-accent/10' : 'bg-muted/50'
          }`}>
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-semibold text-primary">
              {interaction.authorDisplayName}
            </span>
            <span className="text-sm text-primary/60 font-medium">
              @{interaction.authorUsername}
            </span>
            <span className="text-xs text-primary/40 bg-muted/50 px-2 py-0.5 rounded-full">
              FID: {interaction.authorFid}
            </span>
            {interaction.alertTriggered && (
              <div className="flex items-center gap-1 ml-auto">
                <AlertTriangle size={14} className="text-warning" />
                <span className="badge-warning text-xs font-medium">Alert</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`mb-4 ${isDeleted ? 'opacity-60' : ''}`}>
            {isDeleted ? (
              <div className="flex items-center gap-2 text-primary/60 italic bg-muted/30 p-3 rounded-md">
                <Trash2 size={14} />
                <span className="text-sm">This cast has been deleted</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed break-words text-primary/80">
                {interaction.content}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-primary/50">
                <Clock size={12} />
                <span className="font-medium">
                  {formatDistanceToNow(interaction.timestamp, { addSuffix: true })}
                </span>
              </div>
              {interaction.parentCastHash && (
                <span className="badge-secondary text-xs">Reply</span>
              )}
              <span className="badge-secondary capitalize text-xs">
                {interaction.type}
              </span>
            </div>
            <div className="text-xs font-mono text-primary/40 bg-muted/30 px-2 py-1 rounded">
              {interaction.castHash.slice(0, 8)}...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
