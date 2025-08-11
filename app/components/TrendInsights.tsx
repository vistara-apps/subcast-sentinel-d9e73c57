
'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, MessageCircle, Hash, BarChart3, Brain } from 'lucide-react';

interface TrendData {
  id: string;
  topic: string;
  mentions: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  growth: number;
  participants: string[];
}

interface InsightData {
  summary: string;
  keyParticipants: Array<{
    username: string;
    fid: string;
    activity: number;
  }>;
  topTopics: Array<{
    topic: string;
    volume: number;
  }>;
  sentimentOverview: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export function TrendInsights() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'1h' | '6h' | '24h' | '7d'>('24h');

  // Mock data for demonstration
  const mockTrends: TrendData[] = [
    {
      id: '1',
      topic: 'Base ecosystem',
      mentions: 45,
      sentiment: 'positive',
      growth: 23,
      participants: ['alice', 'bob', 'charlie'],
    },
    {
      id: '2',
      topic: 'Mini apps',
      mentions: 32,
      sentiment: 'positive',
      growth: 18,
      participants: ['diana', 'eve'],
    },
    {
      id: '3',
      topic: 'Farcaster protocol',
      mentions: 28,
      sentiment: 'neutral',
      growth: -5,
      participants: ['frank', 'grace', 'henry'],
    },
    {
      id: '4',
      topic: 'OnchainKit integration',
      mentions: 19,
      sentiment: 'positive',
      growth: 34,
      participants: ['alice', 'ivan'],
    },
  ];

  const mockInsights: InsightData = {
    summary: "The Base ecosystem continues to show strong community engagement with increasing discussion around mini apps and OnchainKit integration. Sentiment remains predominantly positive with active participation from key developers.",
    keyParticipants: [
      { username: 'alice', fid: '123', activity: 15 },
      { username: 'bob', fid: '456', activity: 12 },
      { username: 'charlie', fid: '789', activity: 9 },
      { username: 'diana', fid: '111', activity: 8 },
    ],
    topTopics: [
      { topic: 'Base ecosystem', volume: 45 },
      { topic: 'Mini apps', volume: 32 },
      { topic: 'Farcaster protocol', volume: 28 },
      { topic: 'OnchainKit integration', volume: 19 },
    ],
    sentimentOverview: {
      positive: 68,
      negative: 12,
      neutral: 20,
    },
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTrends(mockTrends);
        setInsights(mockInsights);
      } catch (error) {
        console.error('Failed to load trend data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedPeriod]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-primary/60';
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-success/10';
      case 'negative':
        return 'bg-destructive/10';
      default:
        return 'bg-muted/50';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full"></div>
          <p className="text-primary/60">Analyzing interaction trends...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Brain className="w-6 h-6 text-accent" />
            AI Trend Insights
          </h2>
          <p className="text-sm text-primary/60 mt-1">
            AI-powered analysis of monitored interactions
          </p>
        </div>
        
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
          className="input text-sm"
        >
          <option value="1h">Last Hour</option>
          <option value="6h">Last 6 Hours</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
        </select>
      </div>

      {/* AI Summary */}
      {insights && (
        <div className="card bg-accent/5 border-accent/20">
          <div className="flex items-start gap-3 mb-4">
            <Brain className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h3 className="font-semibold text-primary">AI Summary</h3>
              <p className="text-sm text-primary/60 mt-1">
                {insights.summary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Trending Topics */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Trending Topics
        </h3>
        
        <div className="space-y-3">
          {trends.map((trend, index) => (
            <div
              key={trend.id}
              className={`p-4 rounded-md border ${getSentimentBg(trend.sentiment)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary/40">
                    #{index + 1}
                  </span>
                  <span className="font-medium text-primary">
                    {trend.topic}
                  </span>
                  <span className={`badge-secondary ${getSentimentColor(trend.sentiment)}`}>
                    {trend.sentiment}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {trend.mentions}
                  </span>
                  <span className={`flex items-center gap-1 ${
                    trend.growth > 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    <TrendingUp size={14} />
                    {trend.growth > 0 ? '+' : ''}{trend.growth}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-primary/60">
                <Users size={12} />
                <span>
                  {trend.participants.length} participants: {trend.participants.join(', ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Participants */}
      {insights && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            Key Participants
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {insights.keyParticipants.map((participant) => (
              <div
                key={participant.fid}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
              >
                <div>
                  <span className="font-medium text-primary">
                    @{participant.username}
                  </span>
                  <div className="text-xs text-primary/60">
                    FID: {participant.fid}
                  </div>
                </div>
                <div className="text-sm font-medium text-accent">
                  {participant.activity} posts
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sentiment Overview */}
      {insights && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            Sentiment Overview
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-success">Positive</span>
              <span className="text-sm font-medium">{insights.sentimentOverview.positive}%</span>
            </div>
            <div className="w-full bg-muted/50 rounded-full h-2">
              <div
                className="bg-success h-2 rounded-full"
                style={{ width: `${insights.sentimentOverview.positive}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary/60">Neutral</span>
              <span className="text-sm font-medium">{insights.sentimentOverview.neutral}%</span>
            </div>
            <div className="w-full bg-muted/50 rounded-full h-2">
              <div
                className="bg-primary/60 h-2 rounded-full"
                style={{ width: `${insights.sentimentOverview.neutral}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-destructive">Negative</span>
              <span className="text-sm font-medium">{insights.sentimentOverview.negative}%</span>
            </div>
            <div className="w-full bg-muted/50 rounded-full h-2">
              <div
                className="bg-destructive h-2 rounded-full"
                style={{ width: `${insights.sentimentOverview.negative}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
