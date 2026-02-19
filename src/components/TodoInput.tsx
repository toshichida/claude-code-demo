import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Tag } from 'lucide-react'
import { Priority } from '../types'

interface Props {
  onAdd: (text: string, priority: Priority, category: string) => void
}

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10' },
  { value: 'medium', label: 'Medium', color: 'text-amber-400 border-amber-400/40 bg-amber-400/10' },
  { value: 'high', label: 'High', color: 'text-rose-400 border-rose-400/40 bg-rose-400/10' },
]

const CATEGORIES = ['Work', 'Personal', 'Health', 'Shopping', 'Ideas']

export function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState('Personal')
  const [showOptions, setShowOptions] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, priority, category)
    setText('')
    setShowOptions(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-4 glow-purple"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10 focus-within:border-violet-500/50 transition-colors">
            <Plus className="w-5 h-5 text-violet-400 flex-shrink-0" />
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              onFocus={() => setShowOptions(true)}
              placeholder="Add a new task..."
              className="flex-1 bg-transparent text-white text-sm focus:outline-none"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow flex-shrink-0"
          >
            Add
          </motion.button>
        </div>

        {showOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 flex flex-wrap gap-2 items-center"
          >
            <div className="flex items-center gap-1">
              {PRIORITIES.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                    priority === p.value
                      ? p.color + ' opacity-100'
                      : 'text-white/40 border-white/10 bg-white/5 opacity-60 hover:opacity-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-white/30" />
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                    category === c
                      ? 'text-violet-400 border-violet-400/40 bg-violet-400/10'
                      : 'text-white/40 border-white/10 bg-white/5 hover:text-white/70'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
