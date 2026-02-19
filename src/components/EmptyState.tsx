import { motion } from 'framer-motion'
import { Sparkles, CheckCheck, Search } from 'lucide-react'
import { Filter } from '../types'

interface Props {
  filter: Filter
  hasSearch: boolean
}

export function EmptyState({ filter, hasSearch }: Props) {
  if (hasSearch) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 gap-3"
      >
        <div className="p-4 rounded-2xl bg-white/5">
          <Search className="w-8 h-8 text-white/20" />
        </div>
        <p className="text-white/30 text-sm">No tasks match your search</p>
      </motion.div>
    )
  }

  if (filter === 'completed') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 gap-3"
      >
        <div className="p-4 rounded-2xl bg-white/5">
          <CheckCheck className="w-8 h-8 text-white/20" />
        </div>
        <p className="text-white/30 text-sm">No completed tasks yet</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 gap-3"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20"
      >
        <Sparkles className="w-8 h-8 text-violet-400" />
      </motion.div>
      <p className="text-white/50 text-sm font-medium">All clear!</p>
      <p className="text-white/25 text-xs">Add a task above to get started</p>
    </motion.div>
  )
}
