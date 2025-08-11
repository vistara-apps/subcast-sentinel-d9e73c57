
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
  useViewProfile,
  useNotification,
} from '@coinbase/onchainkit/minikit';
import { AppShell } from './components/AppShell';
import { InteractionFeed } from './components/InteractionFeed';
import { AlertSetup } from './components/AlertSetup';
import { TrendInsights } from './components/TrendInsights';
import { SubscriptionManager } from './components/SubscriptionManager';
import { Bell, TrendingUp, Settings, User } from 'lucide-react';

type TabType = 'feed' | 'alerts' | 'trends' | 'settings';

export default function SubcastSentinel() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [frameAdded, setFrameAdded] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const close = useClose();
  const viewProfile = useViewProfile();
  const sendNotification = useNotification();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
    if (frameAdded) {
      await sendNotification({
        title: 'Subcast Sentinel Added! 🎉',
        body: 'You can now monitor Farcaster interactions in real-time.',
      });
    }
  }, [addFrame, sendNotification]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="btn-primary text-sm px-3 py-1"
        >
          Save Frame
        </button>
      );
    }
    return null;
  }, [context, handleAddFrame]);

  const tabs = [
    { id: 'feed' as TabType, label: 'Feed', icon: Bell },
    { id: 'alerts' as TabType, label: 'Alerts', icon: Settings },
    { id: 'trends' as TabType, label: 'Trends', icon: TrendingUp },
    { id: 'settings' as TabType, label: 'Settings', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <InteractionFeed onAlertCountChange={setAlertCount} />;
      case 'alerts':
        return <AlertSetup />;
      case 'trends':
        return <TrendInsights />;
      case 'settings':
        return <SubscriptionManager />;
      default:
        return <InteractionFeed onAlertCountChange={setAlertCount} />;
    }
  };

  return (
    <AppShell
      title="Subcast Sentinel"
      subtitle="Never miss a critical conversation"
      headerActions={
        <div className="flex items-center gap-2">
          {saveFrameButton}
          <button
            onClick={viewProfile}
            className="text-accent hover:text-accent/80 transition-colors"
            title="View Profile"
          >
            <User size={20} />
          </button>
          <button
            onClick={close}
            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      }
      navigation={
        <div className="flex border-b border-border bg-surface">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-accent border-b-2 border-accent bg-accent/5'
                    : 'text-primary/60 hover:text-primary hover:bg-muted/50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
                {tab.id === 'alerts' && alertCount > 0 && (
                  <span className="badge-destructive text-xs ml-1">
                    {alertCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      }
    >
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </AppShell>
  );
}
