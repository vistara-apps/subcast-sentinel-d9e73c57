
'use client';

interface FilterBarProps {
  filters: {
    type: 'all' | 'cast' | 'reply' | 'mention' | 'recast';
    showDeleted: boolean;
    alertsOnly: boolean;
  };
  onFiltersChange: (filters: FilterBarProps['filters']) => void;
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'cast', label: 'Casts' },
    { value: 'reply', label: 'Replies' },
    { value: 'mention', label: 'Mentions' },
    { value: 'recast', label: 'Recasts' },
  ];

  return (
    <div className="animate-slide-in space-y-4 p-4 bg-muted/50 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Interaction Type
          </label>
          <select
            value={filters.type}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                type: e.target.value as typeof filters.type,
              })
            }
            className="input w-full text-sm"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-primary">Options</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.showDeleted}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    showDeleted: e.target.checked,
                  })
                }
                className="rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-sm text-primary">Show deleted casts</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.alertsOnly}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    alertsOnly: e.target.checked,
                  })
                }
                className="rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-sm text-primary">Alerts only</span>
            </label>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Quick Stats</label>
          <div className="text-xs text-primary/60 space-y-1">
            <div>Total interactions: 4</div>
            <div>Active alerts: 2</div>
            <div>Deleted casts: 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
