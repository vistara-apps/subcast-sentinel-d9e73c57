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
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="animate-spin w-10 h-10 border-3 border-accent/20 border-t-accent rounded-full"></div>
            <div className="absolute inset-0 animate-pulse">
              <div className="w-10 h-10 border-3 border-transparent border-t-accent/40 rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-primary/70 font-medium mb-1">Loading interactions...</p>
            <p className="text-sm text-primary/50">Fetching your latest Farcaster activity</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Filter Bar */}
      <div className="bg-surface border-b border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-primary mb-1">Interaction Feed</h2>
            <p className="text-sm text-primary/60">Monitor your Farcaster interactions in real-time</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-accent text-white' : ''}`}
              title="Toggle filters"
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button 
              onClick={loadInteractions} 
              className="btn-secondary flex items-center gap-2"
              title="Refresh interactions"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="animate-slide-in">
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        )}
      </div>

      {/* Interactions List */}
      <div className="flex-1 overflow-y-auto">
        {filteredInteractions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <MessageCircle size={32} className="text-accent/60" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              {filters.alertsOnly ? 'No alerts yet' : 'No interactions found'}
            </h3>
            <p className="text-sm text-primary/60 leading-relaxed">
              {filters.alertsOnly
                ? 'When important interactions trigger your alerts, they\'ll appear here. Switch to the Alerts tab to get started.'
                : 'Your Farcaster interactions will appear here once they start coming in. Try adjusting your filters or check back in a few minutes.'}
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
