import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Pencil, Check, X } from 'lucide-react'
import { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const PRIORITY_COLORS = {
  low: { dot: 'bg-emerald-400', badge: 'text-emerald-400/70 bg-emerald-400/10' },
  medium: { dot: 'bg-amber-400', badge: 'text-amber-400/70 bg-amber-400/10' },
  high: { dot: 'bg-rose-400', badge: 'text-rose-400/70 bg-rose-400/10' },
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [hovered, setHovered] = useState(false)

  const handleEdit = () => {
    onEdit(todo.id, editText)
    setEditing(false)
  }

  const handleEditCancel = () => {
    setEditText(todo.text)
    setEditing(false)
  }

  const colors = PRIORITY_COLORS[todo.priority]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card rounded-xl px-4 py-3.5 todo-item group"
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className="flex-shrink-0 relative"
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              todo.completed
                ? 'bg-gradient-to-br from-violet-500 to-indigo-500 border-transparent shadow-lg shadow-violet-500/30'
                : 'border-white/20 hover:border-violet-400/60'
            }`}
          >
            <AnimatePresence>
              {todo.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>

        {/* Priority dot */}
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot} ${todo.completed ? 'opacity-30' : ''}`} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              autoFocus
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleEdit()
                if (e.key === 'Escape') handleEditCancel()
              }}
              className="w-full bg-white/10 text-white text-sm rounded-lg px-2 py-1 border border-violet-500/40 focus:outline-none"
            />
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-sm transition-all duration-200 ${
                  todo.completed
                    ? 'line-through text-white/30'
                    : 'text-white/85'
                }`}
              >
                {todo.text}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge} ${todo.completed ? 'opacity-40' : ''}`}>
                {todo.category}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <AnimatePresence>
          {(hovered || editing) && !todo.completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 flex-shrink-0"
            >
              {editing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="p-1.5 rounded-lg bg-white/5 text-white/30 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => onDelete(todo.id)}
          className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${
            hovered
              ? 'text-rose-400 bg-rose-500/10 opacity-100'
              : 'text-white/20 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}
