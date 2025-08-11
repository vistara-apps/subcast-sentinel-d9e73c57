
'use client';

import { useState, useCallback } from 'react';
import { Plus, X, Bell, User, Hash, Trash2, Edit } from 'lucide-react';
import { AlertConfigForm } from './AlertConfigForm';

interface MonitoredKeyword {
  id: string;
  keyword: string;
  enabled: boolean;
  matchCount: number;
}

interface MonitoredUser {
  id: string;
  username: string;
  fid: string;
  enabled: boolean;
  interactionCount: number;
}

export function AlertSetup() {
  const [keywords, setKeywords] = useState<MonitoredKeyword[]>([
    { id: '1', keyword: 'farcaster', enabled: true, matchCount: 12 },
    { id: '2', keyword: 'base', enabled: true, matchCount: 8 },
    { id: '3', keyword: 'miniapp', enabled: false, matchCount: 3 },
  ]);

  const [users, setUsers] = useState<MonitoredUser[]>([
    { id: '1', username: 'alice', fid: '123', enabled: true, interactionCount: 5 },
    { id: '2', username: 'bob', fid: '456', enabled: true, interactionCount: 3 },
  ]);

  const [showKeywordForm, setShowKeywordForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<MonitoredKeyword | null>(null);
  const [editingUser, setEditingUser] = useState<MonitoredUser | null>(null);

  const addKeyword = useCallback((keyword: string) => {
    const newKeyword: MonitoredKeyword = {
      id: Date.now().toString(),
      keyword: keyword.toLowerCase(),
      enabled: true,
      matchCount: 0,
    };
    setKeywords(prev => [...prev, newKeyword]);
    setShowKeywordForm(false);
  }, []);

  const addUser = useCallback((username: string, fid: string) => {
    const newUser: MonitoredUser = {
      id: Date.now().toString(),
      username: username.toLowerCase(),
      fid,
      enabled: true,
      interactionCount: 0,
    };
    setUsers(prev => [...prev, newUser]);
    setShowUserForm(false);
  }, []);

  const toggleKeyword = useCallback((id: string) => {
    setKeywords(prev =>
      prev.map(k => k.id === id ? { ...k, enabled: !k.enabled } : k)
    );
  }, []);

  const toggleUser = useCallback((id: string) => {
    setUsers(prev =>
      prev.map(u => u.id === id ? { ...u, enabled: !u.enabled } : u)
    );
  }, []);

  const removeKeyword = useCallback((id: string) => {
    setKeywords(prev => prev.filter(k => k.id !== id));
  }, []);

  const removeUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary">Alert Configuration</h2>
          <p className="text-sm text-primary/60 mt-1">
            Set up keywords and users to monitor for real-time alerts
          </p>
        </div>
        <Bell className="w-6 h-6 text-accent" />
      </div>

      {/* Monitored Keywords */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Hash className="w-5 h-5 text-accent" />
            Monitored Keywords
          </h3>
          <button
            onClick={() => setShowKeywordForm(true)}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <Plus size={16} />
            Add Keyword
          </button>
        </div>

        {keywords.length === 0 ? (
          <div className="text-center py-8 text-primary/60">
            <Hash className="w-12 h-12 mx-auto mb-2 text-primary/30" />
            <p>No keywords monitored yet</p>
            <p className="text-sm">Add keywords to get alerted when they're mentioned</p>
          </div>
        ) : (
          <div className="space-y-2">
            {keywords.map(keyword => (
              <div
                key={keyword.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleKeyword(keyword.id)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      keyword.enabled
                        ? 'bg-accent border-accent text-white'
                        : 'border-border'
                    }`}
                  >
                    {keyword.enabled && <span className="text-xs">✓</span>}
                  </button>
                  <div>
                    <span className={`font-medium ${
                      keyword.enabled ? 'text-primary' : 'text-primary/40'
                    }`}>
                      #{keyword.keyword}
                    </span>
                    <div className="text-xs text-primary/60">
                      {keyword.matchCount} matches
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingKeyword(keyword)}
                    className="text-primary/60 hover:text-accent"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => removeKeyword(keyword.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Monitored Users */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-accent" />
            Monitored Users
          </h3>
          <button
            onClick={() => setShowUserForm(true)}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <Plus size={16} />
            Add User
          </button>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-8 text-primary/60">
            <User className="w-12 h-12 mx-auto mb-2 text-primary/30" />
            <p>No users monitored yet</p>
            <p className="text-sm">Add users to get alerted about their activity</p>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map(user => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleUser(user.id)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      user.enabled
                        ? 'bg-accent border-accent text-white'
                        : 'border-border'
                    }`}
                  >
                    {user.enabled && <span className="text-xs">✓</span>}
                  </button>
                  <div>
                    <span className={`font-medium ${
                      user.enabled ? 'text-primary' : 'text-primary/40'
                    }`}>
                      @{user.username}
                    </span>
                    <div className="text-xs text-primary/60">
                      FID: {user.fid} • {user.interactionCount} interactions
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-primary/60 hover:text-accent"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => removeUser(user.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert Config Forms */}
      {showKeywordForm && (
        <AlertConfigForm
          type="keyword"
          onSubmit={(data) => addKeyword(data.keyword!)}
          onCancel={() => setShowKeywordForm(false)}
        />
      )}

      {showUserForm && (
        <AlertConfigForm
          type="user"
          onSubmit={(data) => addUser(data.username!, data.fid!)}
          onCancel={() => setShowUserForm(false)}
        />
      )}

      {editingKeyword && (
        <AlertConfigForm
          type="keyword"
          initialData={{ keyword: editingKeyword.keyword }}
          onSubmit={(data) => {
            setKeywords(prev =>
              prev.map(k =>
                k.id === editingKeyword.id
                  ? { ...k, keyword: data.keyword! }
                  : k
              )
            );
            setEditingKeyword(null);
          }}
          onCancel={() => setEditingKeyword(null)}
        />
      )}

      {editingUser && (
        <AlertConfigForm
          type="user"
          initialData={{ username: editingUser.username, fid: editingUser.fid }}
          onSubmit={(data) => {
            setUsers(prev =>
              prev.map(u =>
                u.id === editingUser.id
                  ? { ...u, username: data.username!, fid: data.fid! }
                  : u
              )
            );
            setEditingUser(null);
          }}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}
