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
        <div className="flex border-b border-border bg-surface overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'text-accent bg-accent/5'
                    : 'text-primary/60 hover:text-primary hover:bg-muted/50'
                }`}
              >
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t-full" />
                )}
                <div className="flex items-center gap-1 sm:gap-2">
                  <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="truncate">{tab.label}</span>
                  {tab.id === 'alerts' && alertCount > 0 && (
                    <span className="badge-destructive text-xs ml-1 min-w-fit">
                      {alertCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      }
    >
      <div className="animate-fade-in-up">
        {renderContent()}
      </div>
    </AppShell>
  );
}
