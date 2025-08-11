
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AlertConfigFormProps {
  type: 'keyword' | 'user';
  initialData?: {
    keyword?: string;
    username?: string;
    fid?: string;
  };
  onSubmit: (data: {
    keyword?: string;
    username?: string;
    fid?: string;
  }) => void;
  onCancel: () => void;
}

export function AlertConfigForm({
  type,
  initialData,
  onSubmit,
  onCancel,
}: AlertConfigFormProps) {
  const [keyword, setKeyword] = useState(initialData?.keyword || '');
  const [username, setUsername] = useState(initialData?.username || '');
  const [fid, setFid] = useState(initialData?.fid || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'keyword') {
      if (!keyword.trim()) return;
      onSubmit({ keyword: keyword.trim() });
    } else {
      if (!username.trim() || !fid.trim()) return;
      onSubmit({ username: username.trim(), fid: fid.trim() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg border shadow-lg max-w-md w-full animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold">
            {initialData ? 'Edit' : 'Add'} {type === 'keyword' ? 'Keyword' : 'User'}
          </h3>
          <button
            onClick={onCancel}
            className="text-primary/60 hover:text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {type === 'keyword' ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                Keyword
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., farcaster, base, miniapp"
                className="input w-full"
                autoFocus
                required
              />
              <p className="text-xs text-primary/60">
                Enter a keyword to monitor in cast content
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., alice, bob"
                  className="input w-full"
                  autoFocus
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">
                  Farcaster ID (FID)
                </label>
                <input
                  type="text"
                  value={fid}
                  onChange={(e) => setFid(e.target.value)}
                  placeholder="e.g., 123456"
                  className="input w-full"
                  required
                />
                <p className="text-xs text-primary/60">
                  The user's unique Farcaster ID
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">
              {initialData ? 'Update' : 'Add'} {type === 'keyword' ? 'Keyword' : 'User'}
            </button>
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
