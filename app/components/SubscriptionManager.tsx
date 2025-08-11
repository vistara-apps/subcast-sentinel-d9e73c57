
'use client';

import { useState } from 'react';
import { Crown, Check, Zap, Users, BarChart3, Bell } from 'lucide-react';

interface SubscriptionTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  limitations?: string[];
  popular?: boolean;
}

export function SubscriptionManager() {
  const [currentTier, setCurrentTier] = useState<'free' | 'pro' | 'enterprise'>('free');

  const tiers: SubscriptionTier[] = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started with basic monitoring',
      features: [
        'Monitor up to 5 keywords',
        'Monitor up to 3 users',
        'Basic interaction feed',
        'Email notifications',
        '24-hour interaction history',
      ],
      limitations: [
        'Limited to 100 interactions per day',
        'No trend analysis',
        'No deleted cast recovery beyond 24h',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$5/mo',
      description: 'Advanced monitoring with AI insights',
      features: [
        'Monitor unlimited keywords',
        'Monitor unlimited users',
        'AI-powered trend spotting',
        'Real-time push notifications',
        '30-day interaction history',
        'Advanced sentiment analysis',
        'Custom alert rules',
        'Export functionality',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'High-volume monitoring for teams and organizations',
      features: [
        'Everything in Pro',
        'Unlimited interaction history',
        'Team collaboration tools',
        'API access',
        'Custom integrations',
        'Dedicated support',
        'Advanced analytics dashboard',
        'White-label options',
      ],
    },
  ];

  const currentTierData = tiers.find(tier => tier.id === currentTier);

  const handleUpgrade = (tierId: string) => {
    // Mock upgrade flow
    console.log(`Upgrading to ${tierId}`);
    // In a real app, this would integrate with payment processing
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary">Subscription Management</h2>
          <p className="text-sm text-primary/60 mt-1">
            Manage your subscription and billing preferences
          </p>
        </div>
        <Crown className="w-6 h-6 text-accent" />
      </div>

      {/* Current Plan */}
      <div className="card bg-accent/5 border-accent/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-primary">Current Plan</h3>
            <p className="text-sm text-primary/60">
              You are currently on the {currentTierData?.name} plan
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-accent">
              {currentTierData?.price}
            </div>
            {currentTier !== 'free' && (
              <div className="text-xs text-primary/60">per month</div>
            )}
          </div>
        </div>

        {/* Current Plan Features */}
        <div className="space-y-2">
          <h4 className="font-medium text-primary">Your current features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentTierData?.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check size={14} className="text-success" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {currentTierData?.limitations && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-primary">Limitations:</h4>
            <div className="space-y-1">
              {currentTierData.limitations.map((limitation, index) => (
                <div key={index} className="text-xs text-primary/60">
                  • {limitation}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subscription Tiers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Available Plans</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`card relative ${
                tier.popular
                  ? 'border-accent bg-accent/5'
                  : currentTier === tier.id
                  ? 'border-success bg-success/5'
                  : 'border-border'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="badge-primary px-3 py-1">Most Popular</span>
                </div>
              )}

              {currentTier === tier.id && (
                <div className="absolute -top-3 right-4">
                  <span className="badge-success px-3 py-1">Current</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-primary">{tier.name}</h4>
                  <div className="text-3xl font-bold text-accent mt-2">
                    {tier.price}
                    {tier.id !== 'free' && tier.id !== 'enterprise' && (
                      <span className="text-sm text-primary/60">/month</span>
                    )}
                  </div>
                  <p className="text-sm text-primary/60 mt-2">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  {currentTier === tier.id ? (
                    <div className="text-center text-sm text-success font-medium">
                      ✓ Active Plan
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(tier.id)}
                      className={`w-full ${
                        tier.popular ? 'btn-primary' : 'btn-secondary'
                      }`}
                    >
                      {tier.id === 'free' ? 'Downgrade' : 'Upgrade'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent" />
          Current Usage
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-md">
            <div className="text-2xl font-bold text-accent">3</div>
            <div className="text-xs text-primary/60">Keywords Monitored</div>
            <div className="text-xs text-primary/40">5 max</div>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-md">
            <div className="text-2xl font-bold text-accent">2</div>
            <div className="text-xs text-primary/60">Users Monitored</div>
            <div className="text-xs text-primary/40">3 max</div>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-md">
            <div className="text-2xl font-bold text-accent">45</div>
            <div className="text-xs text-primary/60">Interactions Today</div>
            <div className="text-xs text-primary/40">100 max</div>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-md">
            <div className="text-2xl font-bold text-accent">2</div>
            <div className="text-xs text-primary/60">Active Alerts</div>
            <div className="text-xs text-primary/40">Unlimited</div>
          </div>
        </div>
      </div>
    </div>
  );
}
