import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Filter } from '../types'

interface Props {
  filter: Filter
  search: string
  stats: { total: number; active: number; completed: number }
  onFilterChange: (f: Filter) => void
  onSearchChange: (s: string) => void
  onClearCompleted: () => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
]

export function FilterBar({
  filter,
  search,
  stats,
  onFilterChange,
  onSearchChange,
  onClearCompleted,
}: Props) {
  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5 border border-white/10 focus-within:border-violet-500/30 transition-colors">
        <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="flex-1 bg-transparent text-white/80 text-sm focus:outline-none"
        />
        <SlidersHorizontal className="w-4 h-4 text-white/20 flex-shrink-0" />
      </div>

      {/* Filter tabs + stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className="relative px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              {filter === f.value && (
                <motion.div
                  layoutId="filter-active"
                  className="absolute inset-0 bg-violet-600 rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className={`relative z-10 transition-colors ${filter === f.value ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
                {f.label}
                {f.value === 'active' && stats.active > 0 && (
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${filter === f.value ? 'bg-white/20 text-white' : 'bg-white/10 text-white/50'}`}>
                    {stats.active}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        {stats.completed > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClearCompleted}
            className="text-xs text-white/30 hover:text-rose-400 transition-colors px-2 py-1 rounded-lg hover:bg-rose-500/10"
          >
            Clear done ({stats.completed})
          </motion.button>
        )}
      </div>
    </div>
  )
}
