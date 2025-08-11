
'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageCircle, Trash2, Clock, User, Filter, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NotificationItem } from './NotificationItem';
import { FilterBar } from './FilterBar';

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

interface InteractionFeedProps {
  onAlertCountChange: (count: number) => void;
}

export function InteractionFeed({ onAlertCountChange }: InteractionFeedProps) {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'cast' | 'reply' | 'mention' | 'recast',
    showDeleted: true,
    alertsOnly: false,
  });

  // Mock data for demonstration
  const mockInteractions: Interaction[] = [
    {
      id: '1',
      castHash: '0x123...',
      authorFid: '123',
      authorUsername: 'alice',
      authorDisplayName: 'Alice Dev',
      content: 'Just shipped a new feature for @farcaster integration! 🚀',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isDeleted: false,
      type: 'cast',
      alertTriggered: true,
    },
    {
      id: '2',
      castHash: '0x456...',
      authorFid: '456',
      authorUsername: 'bob',
      authorDisplayName: 'Bob Builder',
      content: 'This is amazing! How did you implement the real-time monitoring?',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      isDeleted: false,
      parentCastHash: '0x123...',
      type: 'reply',
      alertTriggered: true,
    },
    {
      id: '3',
      castHash: '0x789...',
      authorFid: '789',
      authorUsername: 'charlie',
      authorDisplayName: 'Charlie Chain',
      content: '[DELETED CAST]',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      isDeleted: true,
      type: 'mention',
      alertTriggered: false,
    },
    {
      id: '4',
      castHash: '0xabc...',
      authorFid: '111',
      authorUsername: 'diana',
      authorDisplayName: 'Diana Defi',
      content: 'Base ecosystem is growing so fast! Love seeing these mini apps.',
      timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
      isDeleted: false,
      type: 'cast',
      alertTriggered: false,
    },
  ];

  const loadInteractions = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInteractions(mockInteractions);
      
      // Count alerts
      const alertCount = mockInteractions.filter(i => i.alertTriggered).length;
      onAlertCountChange(alertCount);
    } catch (error) {
      console.error('Failed to load interactions:', error);
    } finally {
      setLoading(false);
    }
  }, [onAlertCountChange]);

  useEffect(() => {
    loadInteractions();
  }, [loadInteractions]);

  const filteredInteractions = interactions.filter(interaction => {
    if (filters.type !== 'all' && interaction.type !== filters.type) {
      return false;
    }
    if (!filters.showDeleted && interaction.isDeleted) {
      return false;
    }
    if (filters.alertsOnly && !interaction.alertTriggered) {
      return false;
    }
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reply':
        return <MessageCircle size={16} className="text-accent" />;
      case 'mention':
        return <User size={16} className="text-success" />;
      case 'recast':
        return <RefreshCw size={16} className="text-warning" />;
      default:
        return <MessageCircle size={16} className="text-primary/60" />;
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full"></div>
          <p className="text-primary/60">Loading interactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Filter Bar */}
      <div className="bg-surface border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Interaction Feed</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary ${showFilters ? 'bg-accent text-white' : ''}`}
            >
              <Filter size={16} />
            </button>
            <button onClick={loadInteractions} className="btn-secondary">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
        
        {showFilters && (
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
          />
        )}
      </div>

      {/* Interactions List */}
      <div className="flex-1 overflow-y-auto">
        {filteredInteractions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MessageCircle size={48} className="text-primary/30 mb-4" />
            <h3 className="text-lg font-medium text-primary/60 mb-2">
              No interactions found
            </h3>
            <p className="text-sm text-primary/40">
              {filters.alertsOnly
                ? 'No alert-triggering interactions match your filters.'
                : 'Try adjusting your filters or check back later.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredInteractions.map(interaction => (
              <NotificationItem
                key={interaction.id}
                interaction={interaction}
                icon={getTypeIcon(interaction.type)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
