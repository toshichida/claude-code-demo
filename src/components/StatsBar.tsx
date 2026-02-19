import { motion } from 'framer-motion'
import { CheckCircle2, Circle, LayoutList } from 'lucide-react'

interface Props {
  stats: { total: number; active: number; completed: number }
}

export function StatsBar({ stats }: Props) {
  const completionPct = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { icon: LayoutList, label: 'Total', value: stats.total, color: 'text-violet-400', bg: 'bg-violet-500/10' },
        { icon: Circle, label: 'Active', value: stats.active, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { icon: CheckCircle2, label: 'Done', value: stats.completed, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
      ].map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass-card rounded-xl p-3 flex flex-col items-center gap-1.5"
        >
          <div className={`p-1.5 rounded-lg ${s.bg}`}>
            <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
          </div>
          <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
          <div className="text-[10px] text-white/30 uppercase tracking-wider font-medium">{s.label}</div>
        </motion.div>
      ))}

      {stats.total > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-3 glass-card rounded-xl p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/40">Progress</span>
            <span className="text-xs font-semibold text-violet-400">{completionPct}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}
